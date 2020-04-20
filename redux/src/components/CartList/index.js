import React,{Component} from 'react'
import {connect} from 'react-redux'
import {increment,decrement} from '../../actions/cart';

class CartList extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }


  render() {
    const {list} = this.props;
    console.log(this.props)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th><th>商品名称</th><th>价格</th><th>数量</th>
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
                      <button onClick={this.props.decrement.bind(this,item.id)}>-</button>
                      <span>{item.mount}</span>
                      <button onClick={this.props.increment.bind(this,item.id)}>+</button>
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
const mapStateToProps = (state,ownProps) => {
  return {
    list: state.cart
  }
}
// 第一种方式
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     add: (id) => {
//       dispatch(increment(id))
//     },
//     reduce:(id)=>{
//       dispatch(decrement(id))
//     }
//   }
// }
// 
// export default connect(mapStateToProps, mapDispatchToProps)(CartList)
// 第二种方式 直接写入需要监听的方法
export default connect(mapStateToProps,{increment, decrement})(CartList)
