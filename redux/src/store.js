// createStore 是redux提供的创建store的方法
import {createStore} from 'redux'

// 引入合并后的reducer
import rootReducers from './reducers'

//createStore中必须有方法 就是有reducer 如果有多个reducer 用combineReducers合并后导出
export default createStore(rootReducers)