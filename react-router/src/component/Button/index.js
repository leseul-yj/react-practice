import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Button extends Component {
  backHome = () => {
    // this.props.history.push('/overview');
    this.props.history.push({
      pathname: '/overview',// 不能写成‘./overview’不然只会返回二级
      state: {
        type: this.props.match.params.id
      }
    })
  }
  render() {
    return (
      <button onClick={this.backHome}>
        返回首页
      </button>
    )
  }
}

export default withRouter(Button)