import axios from "axios"

import { getToken } from "@/utils/token.js"

const subjectRequery = axios.create({
    baseURL:process.env.VUE_APP_URL
})
// 设置请求拦截
subjectRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 获取学科列表
export function subjectList(params) {
    return subjectRequery({
        url: '/subject/list',
        params
    })
}

// 请求禁用或启动学科状态
export function subjectStatus(data) {
    return subjectRequery({
        url: '/subject/status',
        method:"post",
        data
    })
}

// 删除学科
export function subjectRemove(data) {
    return subjectRequery({
        url: '/subject/remove',
        method:"post",
        data
    })
}
// 新增学科
export function subjectAdd(data) {
    return subjectRequery({
        url: '/subject/add',
        method:"post",
        data
    })
}

// 编辑学科
export function subjectEdit(data) {
    return subjectRequery({
        url: '/subject/edit',
        method:"post",
        data
    })
}


