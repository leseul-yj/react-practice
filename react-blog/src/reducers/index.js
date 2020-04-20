//合并reducers的方法
import { combineReducers }  from 'redux';

import blog from './blog';


// 合并reducer不可以这个写，此时的cart只是一个function 而不能得到数据
// export default ()=>{
//   cart
// }

export default combineReducers({
  blog
})