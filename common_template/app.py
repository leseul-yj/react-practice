
# server.py
from flask import Flask, render_template,request
from flask import jsonify
from flask import make_response
from linkMySql import*
import time

app = Flask(__name__, static_folder="static/public", template_folder="static")
@app.route("/")
def index():
    return render_template("index.html")
 
@app.route("/hello")
def hello():
    data = request
    return "Hello World!"
 
@app.route('/analysis/startWorkspaceDataGenPieChart', methods=['POST'])
def startWorkspaceDataGenPieChart():
    """
    获取项目的实时数据
    payload:
    {
        "dsItemIds": <str> 或者 [<str>, <str>, ...]     # 数据源ID列表
    }
    数据源ID通常是"@<projid>|<pointname>"格式例如（@717|A318）或DataSourceAdditional表的ObjectId。
    注意：此处的pointname可以是原始点、现场点、虚拟点、计算点
    注意：可以将不同项目的数据一次取出
    注意：当dsItemIds是一个字符串时，接口会当成是只有一个数据源的数据源列表
    :return:
    正常情况，返回：
    {
        "dsItemList": [
            {"dsItemId": <str>, "data": <str>},
            {"dsItemId": <str>, "data": <str>},
            ...
        ]
    }
    当dsItemIds未提供或类型不正确时，会返回：
    {"error": "historyData", "msg": "no history data"}
    注意：数据来源为beopdoengine.rtdata_xxx和beopdatabuffer.rtdata_xxx
    注意：当数据源掉线时，获取的是最后一次更新的数据
    注意：当数据源ID格式无效时，该数据源不会在结果中出现
    注意：当数据源ID格式有效但指向一个从来不曾存在的点位时，该数据源的"data"字段为字符串Null
    """
    data = request.get_json()
    return do_startWorkspaceDataGenPieChart(data)


def do_startWorkspaceDataGenPieChart(data):
    import copy
    dataSouceId = data.get('dataSourceId')
    originalItemVarIdList = data.get('dsItemIds', [])
    itemVarIdList = originalItemVarIdList

    if not isinstance(itemVarIdList, list):
        itemVarIdList = [itemVarIdList] if isinstance(itemVarIdList, str) else []
    if itemVarIdList is None:
        itemVarIdList = []

    arrRealtime = []

    preFilterInfo = isAllCloudPointName(itemVarIdList)
    if preFilterInfo is not None and len(preFilterInfo) >= 2:  # all new cloud points and only one project
        projId = preFilterInfo[0]
        pointNameList = preFilterInfo[1]
        try:
            rt = get_realtime_data_from_rt_and_buffer(projId, pointNameList)
            rt_dic = {x.get('name'): x.get('value') for x in rt}
            for index, input_name in enumerate(pointNameList):
                real_name = pointNameList[index]
                pvalue = rt_dic.get(real_name)
                arrRealtime.append(dict(dsItemId=itemVarIdList[index], data=pvalue))
        except Exception:
            logging.error('Cannot get realtime data! itemVarIdList=%s, preFilterInfo=%s, projId=%s, pointNameList=%s',
                          itemVarIdList, preFilterInfo, projId, pointNameList, exc_info=True, stack_info=True)

        if arrRealtime:
            # Fetching value from cache may break the order of the output. Re-sort it before return
            arrRealtime.sort(key=lambda rt_data: originalItemVarIdList.index(rt_data.get('dsItemId')))
            return json.dumps({'dsItemList': arrRealtime})
        else:
            return json.dumps({'error': 'historyData', 'msg': 'no history data'})

    return jsonify(data = rt)


def isAllCloudPointName(itemVarIdList):
    cps = {}
    projId = None
    for item in itemVarIdList:
        if item[0] == '@':
            arrs = item[1:].rsplit('|', 1)
            if len(arrs) == 2:
                projId = arrs[0]
                ptName = arrs[1]
                if cps.get(projId) is None:
                    cps[projId] = [ptName]
                else:
                    cps[projId].append(ptName)
        else:
            return None
    if len(cps.keys()) == 1:
        return (projId, cps[projId])

    return None

def get_realtime_data_from_rt_and_buffer(projId, pointList):
    data = getDataFromRTAndBufferByProj(projId, pointList)
    dj = []
    for k, v in data.items():
        rtName = k
        dj.append(dict(name=rtName, value=v))

    return dj
    
def getDataFromRTAndBufferByProj(projId, pointList=None):
    rt = {}
    try:
        # dbname = 'testfiles'
        # tableName = 'rtdata_%s' % (projId,)
        # tableName_vpoint = 'rtdata_%s_vpoint' % (projId,)
        rtTableName = 'rtdata_850'
        real_dbname = 'testfiles'
        if pointList:
            pointListInSql = str(pointList).replace('[', '').replace(']', '')
            # q = 'select pointname, pointvalue from %s where pointname in (%s) union all ' \
            #     'select pointname, pointvalue from %s where pointname in (%s)' % (
            #         tableName, pointListInSql, tableName_vpoint, pointListInSql)
            real_q = 'select pointname, pointvalue from %s where pointname in (%s)' % (
                        rtTableName, pointListInSql)
        else:
            # q = 'select pointname, pointvalue from %s union all select pointname, pointvalue from %s' % (
            #     tableName, tableName_vpoint)
            real_q = 'select pointname, pointvalue from %s' % (rtTableName,)
        #rvQuery = linkDB().op_db_query(dbname, q, ())
        rvQuery = linkDB().op_db_query(real_dbname, real_q, ())
        rt = {x[0]: x[1] for x in rvQuery}
        # real_rt = linkDB().op_db_query(real_dbname, real_q, ())
        # rt.update({x[0]: x[1] for x in real_rt})
        lowerKeys = [x.lower() for x in rt.keys()]
        if pointList:
            for pt in pointList:
                if pt.lower() not in lowerKeys:
                    rt[pt] = 'Null'
    except Exception:
        logging.error('Unhandled exception! Locals: %s', locals(), exc_info=True, stack_info=True)
    return rt

if __name__ == "__main__":
    app.run(port= 5000, use_reloader=False, threaded=True, debug=True)