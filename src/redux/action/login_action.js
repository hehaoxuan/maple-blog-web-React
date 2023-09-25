import {ISLOGIN} from '../const'

export const changeLogin = loginData=>({
    type:ISLOGIN,
    data:loginData
})