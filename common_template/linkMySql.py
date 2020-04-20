"""
Routes and views for the flask application.
"""

from flask import g, json
from math import floor, ceil
import os, sys
import re
import mysql.connector
from math import floor, ceil
from datetime import datetime, timedelta
import time
import logging

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, builtin_datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, builtin_date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONEncoder.default(self, obj)

class linkDB:
    _is_global_write_pattern = re.compile(
        r"(insert\s+(ignore\s+)?into|update|alter|replace\s+into|delete\s+from)\s+([^\s]+\.)?`?(?P<table_name>[^\s\(`]+)"
    )
    _beopdoengine_replicating_tables = [
        'locate_map', 'mongo_instance', 'p_role_group', 'p_role_group_user',
        'p_role_permission', 'project', 'project_cluster', 'cluster_config', 'reportemail_project', 'reportemail_user',
        'role', 'role_function', 'role_project', 'token', 'user', 'user_data_manager',
        'user_proj', 'user_role', 'project_properties', 'management', 'management_files',
        'op_records', 'testfiles', 'version'
    ]
    _diagnosis_replicating_tables = [
        'diagnosis_entity', 'diagnosis_entity_fault',
        'diagnosis_entity_fault_old', 'diagnosis_entity_old',
        'diagnosis_equip_weight', 'diagnosis_enum', 'diagnosis_fault',
        'diagnosis_fault_old', 'diagnosis_fault_old_zh', 'diagnosis_fault_zh',
        'diagnosispush', 'diagnosisruncheck', 'diagnosis_task',
        'diagnosis_task_operation', 'temp_analysis_description', 'temp_analysis_description_report',
        'unitconversion',
    ]
    def __init__(self):
        pass

    @classmethod
    def get_db(self, db_name):
        db = None
        config = {
            'host': 'localhost',
            'user': 'root',
            'password': '123456',
            'port': 3306,
            'database': db_name,
            'charset': 'utf8'
        }
        user = 'root'
        password = '123456'
        host = 'localhost'
        #pool_name = app.config.get("MYSQL_SERVER_READ_POOLNAME")
        pool_size = None
        database = 'testfiles'
        connection_info = \
            "user=%s, password=%s, host=%s, pool_size=%s, database=%s, db_name=%s" % \
            (user, password, host, pool_size, database, db_name)
        
        try:
            if pool_size:
                db = mysql.connector.connect(**config)
            else:
                db = mysql.connector.connect(user=user, password=password, host=host, database=database)
        except Exception:
            logging.error("Failed to get connection with %s!", connection_info, exc_info=True, stack_info=True)
            if db is not None:
                db.close()
            return None

        try:
            db.set_database(db_name)
            return db
        except Exception:
            logging.error("Failed to set database with %s!", connection_info, exc_info=True, stack_info=True)
            if db is not None:
                db.set_database(app.config['DATABASE'])
                db.close()
            return None

    def release_db(self, db, cur):
        if cur is not None:
            cur.close()
        if db is not None:
            db.close()

    def is_global_write(self, db_name, query):
        if not db_name or not query:
            return False
        db_name = db_name.strip().lower()
        if db_name == 'workflow':
            return True
        query = query.strip().lower()

        match = linkDB._is_global_write_pattern.match(query)
        if match is None:
            return False
        table_name = match.group("table_name")
        if db_name == 'beopdoengine':
            if table_name in linkDB._beopdoengine_replicating_tables:
                return True
        elif db_name == 'diagnosis':
            if table_name in linkDB._diagnosis_replicating_tables:
                return True
        return False

    def op_db_query(self, dbName, strQuery, parameter=(), one=False, dictionary=False):
        db = None
        cur = None
        rv = []
        try:
            db = self.get_db(dbName)
            if db is None:
                logging.error('Failed to get connection for: %s, %s', dbName, strQuery, stack_info=True)
                return rv
            cur = db.cursor(dictionary=dictionary)
            if len(parameter) > 0:
                cur.execute(strQuery, parameter)
            else:
                cur.execute(strQuery)
            rv = cur.fetchall()
            db.commit()
        except Exception:
            logging.error('Failed to query %s with %s!', dbName, strQuery, exc_info=True, stack_info=True)
        finally:
            self.release_db(db, cur)
            return (rv[0] if rv else []) if one else rv

    def op_db_query_one(self, dbName, strQuery, parameter=(), dictionary=False):
        return self.op_db_query(dbName, strQuery, parameter, True, dictionary)
        
    def op_db_update_with_id(self, dbName, strQuery, parameter=()):
        logging.debug("%s:%s:%s", dbName, strQuery, parameter)
        main_db = self.get_db(dbName)
        rv = self._op_db_update_with_id(main_db, strQuery, parameter)

        if rv != -1:
            if self.is_global_write(dbName, strQuery):
                logging.debug(
                    "In global write list. Executing on other global DBs...")
                other_global_cluster_names = self.get_other_global_cluster_names(
                )
                for cluster_name in other_global_cluster_names:
                    self._enqueue_cross_cluster_write_action({
                        'type':
                        'normal',
                        'cluster_name':
                        cluster_name,
                        'db_name':
                        dbName,
                        'sql':
                        strQuery,
                        'parameter':
                        parameter
                    })

        return rv

    def op_db_update(self, dbName, strQuery, parameter=()):
        logging.debug("%s:%s:%s", dbName, strQuery, parameter)
        main_db = self.get_db(dbName)
        rv = self._exec_db_update(main_db, strQuery, parameter, False)

        if rv:
            if self.is_global_write(dbName, strQuery):
                logging.debug(
                    "In global write list. Executing on other global DBs...")
                other_global_cluster_names = self.get_other_global_cluster_names(
                )
                for cluster_name in other_global_cluster_names:
                    self._enqueue_cross_cluster_write_action({
                        'type':
                        'normal',
                        'cluster_name':
                        cluster_name,
                        'db_name':
                        dbName,
                        'sql':
                        strQuery,
                        'parameter':
                        parameter
                    })
            else:
                logging.debug("Not in global write list.")
        return rv
    def _exec_db_update(self, db, strQuery, parameters, is_multi_update):
        if db is None:
            return False

        cur = None

        try:
            cur = db.cursor()
            if is_multi_update:
                for param in parameters:
                    if len(param) > 0:
                        cur.execute(strQuery, param)
                    else:
                        cur.execute(strQuery)
            else:
                if len(parameters) > 0:
                    cur.execute(strQuery, parameters)
                else:
                    cur.execute(strQuery)
            db.commit()
            return True
        except Exception:
            logging.error(
                'mysql error occured when execute: %s.',
                strQuery,
                exc_info=True,
                stack_info=True)
            return False
        finally:
            self.release_db(db, cur)
    def _op_db_update_with_id(self, db, strQuery, parameter):
        if db is None:
            return False
        cur = None
        new_id = -1
        try:
            cur = db.cursor()
            if len(parameter) > 0:
                cur.execute(strQuery, parameter)
            else:
                cur.execute(strQuery)
            new_id = cur.lastrowid
            db.commit()
        except Exception:
            logging.error(
                'mysql error occured when execute: %s.',
                strQuery,
                exc_info=True,
                stack_info=True)
        finally:
            self.release_db(db, cur)
            return new_id        
