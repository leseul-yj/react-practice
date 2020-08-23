import React from 'react'
import s from './avatar.less';
import {Avatar} from 'antd';
export default function MyAvatar(props) {
  return (
    <div className={s.avatarWrap}>
      <Avatar size={80} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <p className={s.nameTxt}>Alisa Yang</p>
      <p>79645550@qq.com</p>
    </div>
  )
}