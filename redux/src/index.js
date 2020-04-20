// createContext是react提供的一个跨组件传值的方法
import React,{Component,createContext} from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'
import App from './app';
import store from './store'

window.store = store;//方便测试
render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.querySelector("#root")
)