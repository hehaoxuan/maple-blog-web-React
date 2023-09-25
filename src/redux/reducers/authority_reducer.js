// export default count_reducer
// 两个参数 分别是之前的状态(preState)和动作对象(action)
import { AUTHORITY,DELETE } from '../const'
const initState = false
export default function authorityReducer(preState = initState,action){ //赋予初始值
    const {type,data} = action
    switch(type){
        case AUTHORITY:
            // 认证用户是否为root权限
        return data
        case DELETE:
            // 认证用户是否为root权限
        return false
        default:
        return preState
    }
}
