import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 组件computed内获取状态 this.$store.state.vux.active,需retrun或
// import {mapState} from 'vuex';
// computed: {
//   ...mapState({
//     active: state => state.vux.active
//   })
// }
// 组件内改变状态 this.$store.commit('uploadActive',num)
// 组件内调用actions this.$store.dispatch('showFooter',6)
// 组件内获取 this.$store.getters.uploadActive

// 状态监听
const store = new Vuex.Store({})
// 注册模块
store.registerModule('vux', {
  // state存储变量状态
  state: {
    alarmInfoQueryFlag:false,//告警弹窗遮罩层和弹窗控制
    alarmInfoType:1,
    showRightVideo:false, //右侧视频弹窗控制
  },
  // mutation是对 state 进行修改,第二个参数是可选参数，用于调用该 mutations 方法的时候传参
  mutations: {
    // 告警弹窗遮罩层和弹窗控制
    updateAlarmFlag(state,flag){
      state.alarmInfoQueryFlag = flag;
    },
    // 右侧视频弹窗控制
    updateRightVideo(state,flag){
      state.showRightVideo = flag;
    },
    updateAlarmInfoType(state,type){
      state.alarmInfoType = type;
    }
  },
  // Getter实时监听state值的变化(最新状态),是一个纯函数，用于接收state 参数。返回你需要取的值,可传二个参数,不改变state
  getters: {
    // uploadActive (state) {
    //   return state.url + '2'
    // }
  },
  // action处理数据,异步调用,返回给 mutation,从而对 state 进行修改。可传二个参数
  actions: {
    // showFooter(context,num) {
    //   context.commit('uploadActive',num);
    // }
  },
  moudles: {}
})
//  出口
export default store

