import React from 'react';

import {Menu,Dropdown,Button,message,Tooltip} from 'antd';
import {DownOutlined,UserOutlined,ToolOutlined} from '@ant-design/icons';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button',e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click',e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      关闭通知
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      关闭声音
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      退出登陆
    </Menu.Item>
  </Menu>
);


export default function Setting(props) {
  return (
    <div id="components-dropdown-demo-dropdown-button">
      <Dropdown overlay={menu}>
        <Button>
          Set <ToolOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}