import React from 'react';
import s from './FGNumber.less';
import {Progress} from 'antd';
export default function FGNumber(props) {
  return (
    <div className={s.friendNumWrap}>
        <div>
            <span>好友</span>
            <Progress percent={60} strokeColor={{
                '0%': '#4d76fd',
                '100%': '#4d76fd',
         }}/>
        </div>
        <div>
            <span>群组</span>
            <Progress percent={50}  strokeColor={{
                '0%': '#4d76fd',
                '100%': '#4d76fd',
         }}/>   
        </div>
    </div>
  )
}