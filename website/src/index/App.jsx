import React from 'react';
import {connect} from 'react-redux';
import s from './App.less';
import Header from '../common/Header';
import Tool from './tool';
import DepartDate from './departDate';
import MyAvatar from './avatar';
import Setting from './setting';
import Submit from './submit';
function App(props) {
  return (
    <div className={s.containerWrap}>
      <div className={s.navWrap}>
        <Header> </Header>
        <MyAvatar></MyAvatar>
        <Tool></Tool>
      </div>
      <div className={s.chatWrap}>
        <Setting></Setting>

        <DepartDate></DepartDate>
        <Submit></Submit>
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
