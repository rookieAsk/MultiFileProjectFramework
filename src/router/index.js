import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // component: ()=>import(/* webpackChunkName: "home" */ '../view/home.vue')  //js文件根据命名打包
      // component:r => require.ensure( [], () => r (require('../view/home.vue')),'home'), //js文件根据命名打包
      // component: resolve => require(['../view/home.vue'], resolve), //默认命名
    }
  ]
})
