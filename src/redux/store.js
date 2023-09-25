// 该文件用于暴露store对象 整个文件只有一个
import { createStore,applyMiddleware,combineReducers} from 'redux';
// 创建store
// 引入为count服务的reducer
import authority from './reducers/authority_reducer'
import login from './reducers/login_reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
//使用中间件 调用函数

const allReducers = combineReducers({
    login,authority
})

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))

