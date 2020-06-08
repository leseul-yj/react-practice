import React from 'react';
import {connect} from 'react-redux';
import './App.css';

function App(props) {

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
