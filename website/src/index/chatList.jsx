import React from 'react';
import s from './chatList.less';
import {List,Avatar,Input} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import {Link,Route} from "react-router-dom";

import ChatPlane from './chatPlane';

const {Search} = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const data = [
  {
    title: '系统客服',
    userId: '10000',
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "Welcome to Forward"
  },
  {
    title: '新的好友',
    userId: '10001',
    avatar: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1027245443,3552957153&fm=26&gp=0.jpg",
    description: "没有好友消息通知"
  },
  {
    title: 'Alisa',
    userId: '10002',
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598351867553&di=8af9a4a5a868ae864d1a4f94cd62b3ab&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F23%2F20151223175222_5kuj4.jpeg",
    description: "Ant Design, a design language for background applications"
  },
  {
    title: 'Justin',
    userId: '10003',
    avatar: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2383244993,2312176529&fm=26&gp=0.jpg",
    description: "Ant Design, a design language for background applications"
  },
  {
    title: '李白',
    userId: '10004',
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598351789017&di=a7b06768c6417a9ac214fe6b0c59c00d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Da9714efaaf86c91708035231f93c70c6%2Fddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg",
    description: "一剑霜寒十四洲"
  },
  {
    title: '干将',
    userId: '10005',
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598351789017&di=dda1d6f4585eaec89db3926165e137f9&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0",
    description: "历史记载胜者，并一道埋葬血色"
  },
  {
    title: '李信',
    userId: '10006',
    avatar: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2811375664,2687366628&fm=26&gp=0.jpg",
    description: "昨夜的星辰辉映太古的缘起"
  },
  {
    title: 'Jennifer',
    userId: '10007',
    avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1416536552,3950553019&fm=26&gp=0.jpg",
    description: "SKIPPING OPTIONAL DEPENDENCY"
  },
  {
    title: 'Amy',
    userId: '10008',
    avatar: "https://ss2.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1416536552,3950553019&fm=26&gp=0.jpg",
    description: "No repository field"
  },
];


export default function ChatList(props) {
  return (
    <div className={s.chatListWrap}>
      <div className={s.searchWrap}>
        <Search
          placeholder="input search text"
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

