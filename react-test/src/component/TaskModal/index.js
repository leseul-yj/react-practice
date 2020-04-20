import React,{Component} from 'react';
import classNames from 'classnames';
import './index.css';

export default class TaskModal extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    }
  }
  handleClick = () => {
    //不能使用 this.state.isActive= !this.state.isActive
    //修改state只能使用setState setState有两个参数
    //合成事件中是异步的
    //第一种方法
    // this.setState({
    //   isActive: !this.state.isActive
    // })
    //第二种方法
    this.setState((prevState) => {
      console.log("setState内部的isActive",this.state.isActive);
      return {
        isActive: !prevState.isActive
      }
    },() => {
      console.log("回调结果",this.state.isActive);
    })
    console.log("setState外部的isActive",this.state.isActive);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick} className={classNames({"active": this.state.isActive})}>任务</button>
      </div>
    )
  }
}
