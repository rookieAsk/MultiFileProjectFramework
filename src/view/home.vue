<template>
  <div id="home">
    <p>dddddddd</p>
    <br>
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
        console.log('1111111111')
        throw (err)
      })
    }
  },
  created() {
    this.getWeather();
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
  @import "~scss/home.scss";
</style>
