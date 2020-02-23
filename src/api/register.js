import axios from "axios"

// 发送手机验证码
export function cell(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data,
        withCredentials: true
    })
}

// 发送注册请求
export function reg(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/register',
        method: 'post',
        data,
        withCredentials: true
    })
}