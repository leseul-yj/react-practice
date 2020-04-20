import React, { Component } from 'react'
import {CountConsumer} from '../../CounterStore.js'
export default class CountBtn extends Component {
  render() {
    // 使用 CountConsumer 来接受count
    // 注意 CountConsumer 的children必须是一个方法，这个方法的一个参数
    return (
      <CountConsumer>
        {
          ({onIncrementCount,onDecrementCount}) => {
            const handler = this.props.type === "increment" ? onIncrementCount : onDecrementCount
            return <button onClick={handler}>{this.props.children}</button>
          }
        }
      </CountConsumer>
    )
  }
}
