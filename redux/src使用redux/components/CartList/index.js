import React,{Component} from 'react'

import {increment, decrement} from '../../actions/cart'
export default class CartList extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }
  getState = ()=>{
    this.setState({
      list: this.props.store.getState().cart
    })  
  }
  componentDidMount() {
    this.getState();
    this.props.store.subscribe(this.getState)
  }
  render() {
    const {list} = this.state;
    console.log(list)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>商品名称</th>
              <th>价格</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={()=>{
                        this.props.store.dispatch(decrement(item.id))
                      }}>-</button>
                      <span>{item.mount}</span>
                      <button onClick={
                        ()=>{
                          this.props.store.dispatch(increment(item.id))
                        }
                      }>+</button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    )
  }
}
