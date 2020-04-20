import actionType from './actionType'

export const increment = (id) => {
  console.log(id)
  return {
    type: actionType.CART_AMOUNT_INCREMENT,
    payload: {
      id
    }
  }

}
// actionCreator
export const decrement = (id) => {
  return {
    type: actionType.CART_AMOUNT_DECREMENT,
    payload: {
      id
    }
  }
}

