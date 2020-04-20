import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Energy from './Energy.js'
export default class Meters extends Component {
  render() {
    return (
      <div>
        <Link to="/meters/1?energy=gas">能耗</Link>
        <Link to={{
          pathname: 'meters/2',
          state: {
            from: "算法"
          }
        }}>费用</Link>
        {/* 这里type也可以换成id */}
        
      </div>
    )
  }
}
