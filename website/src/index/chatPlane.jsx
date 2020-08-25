import React from 'react';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Avatar } from 'antd';
import s from './chatPlane.less';
export default function ChatPlane(props){
    console.log(props)
    return (
        <div className={s.chatPlaneWrap}>
            <div className={s.chatPlaneHeader}>
                {props.title}
            </div>
            <div className={s.chatPlaneBody}>

            </div>
            <div className={s.chatPlaneFooter}>
                <div className={s.chatTool}></div>
                <div className={s.chatTextArea}></div>
            </div>
        </div>
    )
};

