import React from 'react';
import s from './chatList.less';
import {List,Avatar,Input} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import {Link,Route} from "react-router-dom";

import ChatPlane from '../chatPlane';

const {Search} = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const data = [];


export default function ChatList(props) {
  return (
    <div className={s.chatListWrap}>
      <div className={s.searchWrap}>
        <Search
          placeholder='input search text'
          onSearch={value => console.log(value)}
          style={{width: "90%"}}
        />
      </div>
      <div className={s.listWrap}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <Link to={'/' + item.userId} >
              <List.Item style={{padding: "15px",cursor: "pointer",borderBottom: "1px solid #f0f0f0;"}}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  )
}

