import axios from "axios"
import { getToken } from "@/utils/token.js"
//因为每次请求都要携带相同的基地址和token 所以为了节约代码 用下面的方法
// 这里是用了axios的create方法克隆一个对象把重复的代码写在里面 赋值给indexRequery 
let indexRequry = axios.create({
    baseURL: process.env.VUE_APP_URL
})
// 请求拦截器 谁发送就拦截谁
indexRequry.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    // window.console.log(config);
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export function info() {
    return indexRequry({
        url: '/info',
        method:'get'
    })
}
export function logout() {
    return indexRequry({
        url: '/logout',
        method:'get'
    })
}