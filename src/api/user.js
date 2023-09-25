import axios from 'axios'
const server = 'http://localhost:8081/user'

const getvcode = async (params) => {
    return await axios({
        method: 'post',
        url: server + '/vcode',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            ...params
        },
    }).then(res => res.data)
}

const register = async (params) => {
    return await axios({
        method: 'post',
        url: server + '/register',
        data: params,
    }).then(res => res.data)
}

const changePassword = async (params) => {
    return await axios({
        method: 'post',
        url: server + '/changePassword',
        data: params,
    }).then(res => res.data)
}

const login = async (params) => {
    return await axios({
        method: 'post',
        url: server + '/login',
        data: params,
    }).then(res => res.data)
}


export {
    getvcode,
    register,
    changePassword,
    login
}
