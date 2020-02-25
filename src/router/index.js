import Vue from "vue"
import login from "../view/login/login.vue"
import index from "../view/index/index.vue"

import overview from "@/view/index/overview/overview.vue"
import user from "@/view/index/user/user.vue"
import Question from "@/view/index/Question/Question.vue"
import Companies from "@/view/index/Companies/Companies.vue"
import Subject from "@/view/index/Subject/Subject.vue"

// 导入进度条插件
import NProgress from "nprogress"
import "nprogress/nprogress.css"
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

// 导航守卫
// 当路由的路径发生变化的时候 就执行 这两个钩子  一个是改变前执行的回调  一个是路由改变后的回调
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 在路径改变前开启进度条
  NProgress.start();
  // 一定要写  这个next()是出去的方法
  next();
})

router.afterEach(() => {
  // 在改变路径之后关闭进度条
  NProgress.done();
  // to and from are both route objects.
})
export default router