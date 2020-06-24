import Vue from 'vue'
import store from '../vuex/store'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

 const router = new VueRouter({
   mode: 'hash',
   routes: [
    {
      path: "/",
      name: "corpus",
      component: (resolve) => {
        require(["@/pages/corpus/corpus.vue"], resolve);
      },
      meta: {
        navShow: true,      // 表示此路由需要显示底部导航栏
        cname: '语料库',
        keepAlive: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: (resolve) => {
        require(["@/pages/login/login.vue"], resolve);
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/taskManagement',
      name: 'taskManagement',
      component: (resolve) => {
        require(["@/pages/taskManagement/taskManagement.vue"], resolve);
      },
      meta: {
        navShow: true,      // 表示此路由需要显示底部导航栏
        cname: '任务管理',
        keepAlive: true
      }
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      component: (resolve) => {
        require(["@/pages/userManagement/userManagement.vue"], resolve);
      },
      meta: {
        navShow: true,      // 表示此路由需要显示底部导航栏
        cname: '用户管理',
        keepAlive: true
      }
    },
  


  ]
})


/**
 * 登录钩子函数
 * to 即将要进入的目标 路由对象
 * from 当前导航正要离开的路由
 * next 一定要调用该方法来 resolve 这个钩子
 * next() 进行管道中的下一个钩子 如果全部钩子执行完了，则状态就是 confirmed （确认的）
 */
router.beforeEach((to, from, next) => {

  if(to.meta.requireAuth){ // 判断该路由是否需要登录权限
    if(store.state.sessionToken){ // 通过vuex state获取当前的token是否存在
      next();
    }else{
      next({
        path: '/login',  // 跳转到登录页面
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，用于登录成功后回到登录前页面
      });
    }
  }else{
    next();
  }
})



export default router;