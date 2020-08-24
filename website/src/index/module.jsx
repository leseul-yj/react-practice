import React from 'react';
import s from './module.less';
import {TeamOutlined,MessageOutlined,SettingOutlined,UserOutlined,UserDeleteOutlined} from '@ant-design/icons';
export default function Module(props) {
  return (
    <div className={s.moduleWrap}>
        <div className={s.item}>
            <MessageOutlined className={s.icon} style={{ fontSize: '30px', color: '#4d76fd' }} />
            <div>最近消息</div>
        </div>
        <div className={s.item}>
            <UserOutlined className={s.icon}  style={{ fontSize: '30px', color: '#4d76fd' }} />
            <div>好友</div>
        </div>
        <div className={s.item}>
            <TeamOutlined className={s.icon}  style={{ fontSize: '30px', color: '#4d76fd' }} />
            <div>群组</div>
        </div>
        <div className={s.item}>
            <UserDeleteOutlined className={s.icon}  style={{ fontSize: '30px', color: '#4d76fd' }} />
            <div>黑名单</div>
        </div>
    </div>
  )
}