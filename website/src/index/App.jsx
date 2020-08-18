import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from '../common/Header';
import Journey from './journey';
import DepartDate from './departDate';
import HighSpeedRail from './highSpeedRail';
import Setting from './setting';
import Submit from './submit';
function App(props) {
  return (
    <div>
      <Header> </Header>
      <Setting></Setting>
      <Journey></Journey>
      <DepartDate></DepartDate>
      <Submit></Submit>
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
