import Vue from "vue"
import login from "../view/login/login.vue"
import index from "../view/index/index.vue"

import overview from "@/view/index/overview/overview.vue"
import user from "@/view/index/user/user.vue"
import Question from "@/view/index/Question/Question.vue"
import Companies from "@/view/index/Companies/Companies.vue"
import Subject from "@/view/index/Subject/Subject.vue"

// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/login',
      component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/index',
      component: index, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      children: [
        { path: 'overview', component: overview },
        { path: 'user', component: user },
        { path: 'Question', component: Question },
        { path: 'Companies', component: Companies },
        { path: 'Subject', component: Subject },
      ]
    }

  ]
})
export default router