import React, { Component } from 'react'
import {Counter, CountBtn} from './component'
export default class App extends Component {
  render() {
    return (
      <div>
        <CountBtn type="decrement">-</CountBtn>
        <Counter />
        <CountBtn type="increment">+</CountBtn>
      </div>
    )
  }
}
