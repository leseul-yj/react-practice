import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
//统一每个浏览器的默认样式
import 'normalize.css/normalize.css';
import App from './App.jsx';

ReactDOM.render(<App />,document.getElementById('root'))