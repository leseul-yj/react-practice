import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

const initalState = {
  from: "北京",
  to: "上海",
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,//是否城市交换
  cityData: null, // 异步加载城市数据
  isLoadingCityData: false, // 城市数据的状态
  isDateSelectorVisible: false, // 是否加载时间控件
  highSpeed: false, //是否选择了只看动车
}
export default createStore(
  combineReducers(reducers),
  initalState,
  applyMiddleware(thunk)
);
