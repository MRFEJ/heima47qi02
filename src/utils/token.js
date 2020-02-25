// 保存进硬盘的key名字  TOKENKEY是常量用大写字母
const TOKENKEY = "heimatoken2";

// 保存token
export function setToken(key) {
    return window.localStorage.setItem(TOKENKEY, key)
}
// 获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
// 删除token
export function removeToken() {
    return window.localStorage.removeItem(TOKENKEY)
}