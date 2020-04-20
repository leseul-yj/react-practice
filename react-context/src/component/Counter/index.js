import React,{Component} from 'react'
import {CountConsumer} from '../../CounterStore.js'
export default class Counter extends Component {
  render() {
    return (
      <CountConsumer>
        {
          //解构value
          ({count}) => {
            return <span>{count}</span>
          }
        }
      </CountConsumer>
    )
  }
}
