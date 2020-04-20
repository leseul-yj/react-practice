import React, { Component } from 'react'
import {Button} from '../../component'
export default class Energy extends Component {
  // backHome=()=>{
  //   // this.props.history.push('/overview');
  //   this.props.history.push({
  //     pathname: '/overview',// 不能写成‘./overview’不然只会返回二级
  //     state: {
  //       type: this.props.match.params.id
  //     }
  //   })
  // }
  render() {
    console.log(this.props);
    return (
      <div>
        类型{this.props.match.params.id}
        {/* <button onClick={this.backHome}>返回首页</button> */}
        <Button></Button>
      </div>
    )
  }
}


