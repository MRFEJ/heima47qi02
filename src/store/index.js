import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //数据
        username: '',
        avatar: '',
    },
    mutations: {
        //改数据的方法
        changeUsername(state,val) {
            state.username=val
        },
        changeAvatar(state,val) {
            state.avatar=val
        }
    },
})
export default store