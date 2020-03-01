import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //数据
        username: '',
        avatar: '',
        Role:'',
    },
    mutations: {
        //改数据的方法
        changeUsername(state,val) {
            state.username=val
        },
        changeAvatar(state,val) {
            state.avatar=val
        },
        changeRole(state,val) {
            state.Role=val
        }

    },
})
export default store