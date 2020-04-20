// createContext是react提供的一个跨组件传值的方法
import React,{Component,createContext} from 'react'
import {render} from 'react-dom'

import App from './app';
import {CounterProvider} from './CounterStore'

render(
  <CounterProvider>
    <App />
  </CounterProvider>,
  document.querySelector("#root")
)