import React from 'react';
import s from './chatList.less';
export default function ChatList(props) {
  return (
    <div className={s.chatListWrap}>
      <div className={s.searchWrap}></div>
      <div className={s.listWrap}></div>
    </div>
  )
}