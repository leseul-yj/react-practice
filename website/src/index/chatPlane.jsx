import React from 'react';
import {HashRouter as Router,Route,Switch,Link,withRouter} from 'react-router-dom';
import {Breadcrumb,Avatar} from 'antd';
import {SmileOutlined,CameraOutlined,PaperClipOutlined} from '@ant-design/icons';

import s from './chatPlane.less';
export default function ChatPlane(props) {
    console.log(props)
    return (
        <div className={s.chatPlaneWrap}>
            <div className={s.chatPlaneHeader}>
                <Avatar src={props.avatar}></Avatar>
                {props.title}
            </div>
            <div className={s.chatPlaneBody}>

            </div>
            <div className={s.chatPlaneFooter}>
                <div className={s.chatTool}>
                    <span>
                        <SmileOutlined style={{fontSize: "26px"}} />
                    </span>
                    <span>
                        <CameraOutlined style={{fontSize: "26px"}} />
                    </span>
                    <span>
                        <PaperClipOutlined style={{fontSize: "26px"}} />
                    </span>
                </div>
                <div className={s.chatTextArea} contentEditable="true">

                </div>
            </div>
        </div>
    )
};

