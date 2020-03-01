import axios from "axios"

import { getToken } from "@/utils/token.js"

const CompaniesRequery = axios.create({
    baseURL:process.env.VUE_APP_URL
})
// 设置请求拦截
CompaniesRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 获取学科列表
export function CompaniesList(params) {
    return CompaniesRequery({
        url: '/enterprise/list',
        params
    })
}

// 请求禁用或启动学科状态
export function CompaniesStatus(data) {
    return CompaniesRequery({
        url: '/enterprise/status',
        method:"post",
        data
    })
}

// 删除学科
export function CompaniesRemove(data) {
    return CompaniesRequery({
        url: '/enterprise/remove',
        method:"post",
        data
    })
}
// 新增学科
export function CompaniesAdd(data) {
    return CompaniesRequery({
        url: '/enterprise/add',
        method:"post",
        data
    })
}

// 编辑学科
export function CompaniesEdit(data) {
    return CompaniesRequery({
        url: '/enterprise/edit',
        method:"post",
        data
    })
}
