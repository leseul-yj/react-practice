// createContext是react提供的一个跨组件传值的方法
import React,{Component,createContext} from 'react'
import {render} from 'react-dom'

import App from './app';

render(
    <App />,
  document.querySelector("#root")
)