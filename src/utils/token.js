// 保存进硬盘的key名字
const TOKENKEY = "heimatoken";

// 保存token
export function setToken(key) {
    return window.localStorage.setItem(TOKENKEY, key)
}
// 获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
// 删除token
export function remove() {
    return window.localStorage.removeItem(TOKENKEY)
}