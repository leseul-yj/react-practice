// createContext是react提供的一个跨组件传值的方法
import React,{Component,createContext} from 'react'
import {render} from 'react-dom'
// createContext 这个方法是一个对象，里面有Provider和Consumer
console.log(createContext())
//在提供者里面设置共享值
//在consumer中接受值
//consumer中需要使用方法
const {
  Provider,
  Consumer
} = createContext();
// 封装一个基本的Provider 因为直接使用Provider，不方便管理状态
class CounterProvider extends Component {
  constructor() {
    super();
    // 这里的状态是共享的，任何CounterProvider的后代组件都可以获取值
    this.state = {
      count: 100
    }
  }
  // 这里的方法也会继续通过Provider
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  decrementCount = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    //这里必须有value，这个value可以传任何数据
    return <Provider value={
      {
        count: this.state.count,
        onIncrementCount: this.incrementCount,
        onDecrementCount: this.decrementCount,
      }
    }>
      {this.props.children}
    </Provider>
  }
}
class CountBtn extends Component {
  render() {
    // 使用Consumer来接受count
    // 注意 Consumer的children必须是一个方法，这个方法的一个参数
    return (
      <Consumer>
        {
          ({onIncrementCount,onDecrementCount}) => {
            const handler = this.props.type === "increment" ? onIncrementCount : onDecrementCount
            return <button onClick={handler}>{this.props.children}</button>
          }
        }
      </Consumer>
    )
  }
}
class Counter extends Component {
  render() {
    return (
      <Consumer>
        {
          //解构value
          ({count}) => {
            return <span>{count}</span>
          }
        }
      </Consumer>
    )
  }
}
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

render(
  <CounterProvider>
    <App />
  </CounterProvider>,
  document.querySelector("#root")
)