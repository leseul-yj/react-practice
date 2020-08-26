import React from 'react'
import s from './avatar.less';
import {Avatar} from 'antd';
export default function MyAvatar(props) {
  return (
    <div className={s.avatarWrap}>
      <Avatar size={80} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598377271379&di=bd4a4f0c7b285a2668e2ed1d7a482137&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0" />
      <p className={s.nameTxt}>Alisa Yang</p>
      <p>79645550@qq.com</p>
    </div>
  )
}