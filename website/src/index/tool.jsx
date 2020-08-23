import React from 'react';
import s from './tool.less';
import {AudioOutlined,BellOutlined,PoweroffOutlined} from '@ant-design/icons';
export default function Tool(props) {
  return (
    <div className={s.tooWrap}>
      <div className={s.box}>
        <div className={s.item}>
          <BellOutlined />
        </div>
        <div className={s.item}>
          <AudioOutlined />
        </div>
        <div className={s.item}>
          <PoweroffOutlined />
        </div>
      </div>
    </div>
  )
}

