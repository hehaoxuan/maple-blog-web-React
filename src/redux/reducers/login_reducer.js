import {ISLOGIN} from '../const'

const initState = false
export default function loginReducer(preState = initState,action){
    const {type,data} = action
    switch(type){
        case ISLOGIN:
            return data
        default:
            return preState
    }
}