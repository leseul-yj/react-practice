//初始化数据  一般在reducer弄
import actionType from '../actions/actionType'
const initState = [{
  id:1,
  title: 'Apple',
  price: 8888,
  mount: 10
},{
  id:2,
  title: "Mac",
  price: 200,
  mount: 100
}];

export default (state = initState,action) => {
  console.log(action)
  switch(action.type) {
    case actionType.CART_AMOUNT_INCREMENT:
    return state.map(item => {
      if(item.id === action.payload.id){
        item.mount +=1
      }
      return item
    });
    case actionType.CART_AMOUNT_DECREMENT:
      return state.map(item => {
        if(item.id === action.payload.id) {
          item.mount -= 1
        }
        return item
      });
    default:
      return state
  }
}