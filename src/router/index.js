import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: ()=>import(/* webpackChunkName: "home" */ '../view/home.vue')  //js文件根据命名打包
      component:r => require.ensure( [], () => r (require('../view/home.vue')),'home'), //js文件根据命名打包
      // component: resolve => require(['../view/home.vue'], resolve), //默认命名
    }
  ]
})
