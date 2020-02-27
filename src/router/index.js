import Vue from "vue"
import login from "../view/login/login.vue"
import index from "../view/index/index.vue"

import overview from "@/view/index/overview/overview.vue"
import user from "@/view/index/user/user.vue"
import Question from "@/view/index/Question/Question.vue"
import Companies from "@/view/index/Companies/Companies.vue"
import Subject from "@/view/index/Subject/Subject.vue"

// 单独淡入message
import { Message } from 'element-ui';

// 导入vuex
import store from "@/store/index.js"
// 导入info请求的文件
import { info } from "@/api/index.js"

// 导入token文件
import { removeToken } from "@/utils/token"
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
      component: login, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: { title: "登录" }
    },
    {
      path: '/index',
      component: index, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: { title: "首页" },
      children: [
        {
          path: 'overview', component: overview, meta: { title: "数据概览" },
        },
        {
          path: 'user', component: user, meta: { title: "用户列表" },
        },
        {
          path: 'Question', component: Question, meta: { title: "题库列表" },
        },
        {
          path: 'Companies', component: Companies, meta: { title: "企业列表" },
        },
        {
          path: 'Subject', component: Subject, meta: { title: "学科列表" },
        },
      ]
    },
    {
      path: '/',
      redirect: '/login'
    }

  ]
})

let whileArr = ["/login", "/news"]
// 导航守卫
// 当路由的路径发生变化的时候 就执行 这两个钩子  一个是改变前执行的回调  一个是路由改变后的回调
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 在路径改变前开启进度条
  NProgress.start();
  if (whileArr.includes(to.path)) {
    // 一定要写  这个next()是出去的方法
    next();
  } else {
    info().then(res => {
      if (res.data.code == 200) {
        // 保存用户名和头像进vuex
        store.commit('changeUsername', res.data.data.username);
        store.commit('changeAvatar', process.env.VUE_APP_URL + "/" +res.data.data.avatar);

        next();
      } else if (res.data.code == 206) {
        Message.error('登录异常,请重新登录!');
        removeToken();
        // 关闭进度条
        NProgress.done();

        next('/login')
      }
    })
  }
})

router.afterEach((to) => {
  // window.console.log(to);
  document.title = to.meta.title
  // 在改变路径之后关闭进度条
  NProgress.done();
  // to and from are both route objects.
})
export default router