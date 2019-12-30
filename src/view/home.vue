<template>
  <div id="home">
    <p>dddddddd</p>
    <br>
    <span><p>{{message}}</p></span>
    <span><p>{{message}}</p></span>
    <span><p>{{message}}</p></span>

    <span><p>{{message}}</p></span>
    <span><p>{{message}}</p></span>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: "222222222222"
    };
  },
  filters: {},
  watch: {},
  computed: {},
  methods: {
    // 获取天气数据--调用中国天气网api
    getWeather(){
      axios.get('https://www.tianqiapi.com/api/?version=v6&appid=56962779&appsecret=odhFe6G4').then((res)=>{
        console.log(res)
        let tempData ={};
        tempData = {"info":res.data.wea,"temp":res.data.tem.split('℃')[0]};
        // this.message = res.data.humidity.split('%')[0];
      }).catch(function(err){
        throw (err)
      })
    }
  },
  created() {
    this.getWeather();
    // 寻找模块对应的文件
    // resolve: {
    //   extensions: ['.js', '.vue', '.json'], //去掉文件后缀
    //   alias: { // 别名
    //     'vue$': 'vue/dist/vue.esm.js',
    //     '@src':resolve('src'),
    //     // 'styles':resolve('src/assets/styles')
    //     // 注意： 静态资源通过src，不能这么设置
    //     "@assets": path.join(__dirname, "..", "src", "assets")
    //   }
    // },

    // let locationUrl = window.location.protocol +'//'+window.location.hostname;
    // console.log(window.location.hostname, window.location.protocol,locationUrl)
    // axios.get(locationUrl+'/test/get').then(res => {  
    //   console.log(res);
    // });
    // axios.post(locationUrl+'/test/post').then(res => {  
    //   console.log(res);
    // });
    
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
  $color:yellow;
  #home{
    background-image: linear-gradient(to right, red , yellow);
    background: red;
    opacity: 0.2;
  }
</style>
