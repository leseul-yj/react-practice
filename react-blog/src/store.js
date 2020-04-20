import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combineReducer from './reducers'

export default createStore(combineReducer, applyMiddleware(thunk));