import {createStore} from 'redux'
import rootReducers from './reducers'

//createStore中必须有方法 就是有reducer
export default createStore(rootReducers)