import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider
} from 'react-redux';
import store from './store';
//统一每个浏览器的默认样式
import 'normalize.css/normalize.css';
import './index.css';
import App from './App.jsx';
import {Router} from 'react-router-dom';

ReactDOM.render(<Provider store={store} ><Router> <App /> </Router></Provider>,document.getElementById('root'))