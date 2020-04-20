import React from 'react'
import {render} from 'react-dom'

import App from './app';

import {BrowserRouter as Router, Route} from 'react-router-dom';
//最顶级 最外层才有router，route就不是
render(
  <Router>
    <Route component={App} path="/"/>
  </Router>,
  document.querySelector("#root")
)