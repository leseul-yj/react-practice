import React from 'react';
import {connect} from 'react-redux';
import s from './App.less';
import Header from '../common/Header';
import Tool from './nav/tool';
import FGNumber from './nav/FGNumber';
import Module from './module';

import ChatList from './list/chatList'
import DepartDate from './departDate';
import MyAvatar from './nav/avatar';
import Setting from './setting';
import ChatPlane from './chatPlane';
import {Router} from 'react-router-dom';
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
        <div className={s.divchatList}>
          <Router>
            <ChatList></ChatList>
          </Router>
        </div>
        <div className={s.chatModule}>
          <ChatPlane title="系统客服"></ChatPlane>
          {/* <Setting></Setting>
          <DepartDate></DepartDate> */}
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
