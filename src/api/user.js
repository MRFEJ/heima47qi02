import axios from "axios"

import { getToken } from "@/utils/token.js"

const userRequery = axios.create({
    baseURL:process.env.VUE_APP_URL
})
// 设置请求拦截
userRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 获取用户列表
export function userList(params) {
    return userRequery({
        url: '/user/list',
        params
    })
}

// 请求禁用或启动用户状态
export function userStatus(data) {
    return userRequery({
        url: '/user/status',
        method:"post",
        data
    })
}

// 删除用户
export function userRemove(data) {
    return userRequery({
        url: '/user/remove',
        method:"post",
        data
    })
}
// 新增用户
export function userAdd(data) {
    return userRequery({
        url: '/user/add',
        method:"post",
        data
    })
}

// 编辑用户
export function userEdit(data) {
    return userRequery({
        url: '/user/edit',
        method:"post",
        data
    })
}
