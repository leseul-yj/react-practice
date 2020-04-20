import React from 'react';
import ReactDOM, {render}from 'react-dom';
import classNames from 'classnames';
import "./index.css";
import App from './app';
//创建组件的第一种方式，使用尖头函数，但是这个组件名首字母大写
const createApp = (props) => {
  return (
    <div>
      {/* 注释的用法 */}
      <h2>{props.title}</h2>
      <h2>{props.content}</h2>
    </div>
  )
}
const app1 = createApp({
  title: "我超级好看",
  content: "我超级棒"
});

//创建组件的第二种方式 类组件
class App2 extends React.Component {
  render(){
    return (<div>
      <h1 style={{color:"#fff000"}}>{this.props.title}</h1>
      <p className="classStyle">{this.props.content}</p>
      <p className={classNames('a','d',{'b':true,'c':false})}>动态添加不懂的className使用第三方包 classnames</p>
      
    </div>)
  }
}
const app2 = new App2({
  title: "我超级好看",
  content: "我超级棒"
}).render();

render(
  <App/>,
  document.querySelector("#root")
)

// 在react16以前回使用这种方式
// React.createClass({
//   render(){
//     return <p>React16使用的方式</p>
//   }
// })