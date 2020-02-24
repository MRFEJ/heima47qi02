import axios from "axios"
import {getToken} from "@/utils/token.js"
let indexRequry = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        token: getToken()
    }
})
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