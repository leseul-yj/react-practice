import React from 'react';
import {connect} from 'react-redux';
import s from './App.less';
import Header from '../common/Header';
import Tool from './tool';
import FGNumber from './FGNumber';
import Module from './module';

import ChatList from 'chatList'
import DepartDate from './departDate';
import MyAvatar from './avatar';
import Setting from './setting';
import Submit from './chatList';

function App(props) {
  return (
    <div className={s.containerWrap}>
      <div className={s.navWrap}>
        <Header> </Header>
        <MyAvatar></MyAvatar>
        <Tool></Tool>
        <FGNumber></FGNumber>
        <Module></Module>
      </div>
      <div className={s.chatWrap}>
        <div className={s.divhatList}>
          <ChatList></ChatList>
        </div>
        <div className={s.chatModule}>
          <Setting></Setting>
          <DepartDate></DepartDate>
          <Submit></Submit>
        </div>

      </div>

    </div>
  )
}
const mapStateToProps = (state,ownProps) => {
  return {
    prop: state.prop
  }
}
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    dispatch1: () => {
      dispatch()
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
