const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const DIST_PATH = path.resolve(__dirname,'../dist');
const SRC_PATH = path.resolve(__dirname,'../src');
const PUBLIC_PATH = path.resolve(__dirname,'../public');

// 获取src下所有的js文件打包
const entryFiles  = {};
// const files = glob.sync(SRC_PATH+'/**/*.js')
const files = glob.sync(path.join(SRC_PATH,'/**/*.js'));
files.forEach(function(file,index){
  let subKey = file.match(/src\/(\S*)\.js/)[1];
  entryFiles[subKey] = file;
})
// 获取pulic下的所有的html文件打包
const publicAll  = [];
const publicFiles = glob.sync(path.join(PUBLIC_PATH,'/**/*.html'));
publicFiles.forEach(function(file,index){
  let htmlName = file.match(/\/public\/(\S*)\.html/)[1];
  let htmlPlugin = new htmlWebpackPlugin({
    filename:DIST_PATH+'/'+htmlName+'.html', //输出
    title:htmlName, //index.html的title内容
    // template:path.resolve(__dirname,'../index.html'), //选择编译的html文件
    template:path.resolve(__dirname,'../public/'+htmlName+'.html'), //选择编译的html文件
    inject:true, // 含有true,false,body,head,默认为true，script位于html的底部 ，false为不引入script
    hash:true, //是否添加hash
    chunks:[htmlName] //按需引入js文件，不要加后缀.js，如果不设置，默认引入所有的js文件，可以入全局js文件
    // minfy:true //压缩html文件
  })
  publicAll.push(htmlPlugin)
})

module.exports = {
  // 入口js文件
  // entry:path.resolve(__dirname,'../src/index.js'), //单文件入口-方式一
  // entry:[ path.resolve(__dirname,'../src/index.js') ], //多文件入口 -方式二
  // entry:{
  //   index:SRC_PATH+'/index.js'
  // }, //多文件入口 -方式三
  entry:entryFiles,
  // 打包后输出文件
  output:{
    path: DIST_PATH,
    // filename:'index.js'
    filename:'[name].[chunkhash:5].js'
  },
  // 模块解析
  module:{

  },
  // 开发服务
  devServer:{
    hot:true,
    contentBase:DIST_PATH,//热更新指向文件
    host: '0.0.0.0', // 域名 服务外部可访问
    useLocalIp:true,
    port:8000, //服务端口号
    https: false, // https:{type:Boolean}
    open: process.platform === 'win32',
    // 启动或保存的信息将会被隐藏
    noInfo: false,
    // historyApiFallback: true,
    // 页面报404时返回的页面，可设置为 historyApiFallback: true, 默认为index.html，或
    // historyApiFallback: {
    //   rewrites: [
        // { from: /^\/$/, to: '/views/landing.html' },
        // { from: /^\/subpage/, to: '/views/subpage.html' },
        // { from: /./, to: '/views/404.html' }
    //   ]
    // },
    // historyApiFallback:false,
    proxy: { // 将请求服务器地址印射为/api, 配置多个代理
      '/api': {
        target: 'http://220.248.3.42:8088',  // 接口域名 正式地址
        // target: 'http://10.8.171.66:8088',  // 接口域名 测试地址
        changeOrigin: true,  //是否跨域，实际无影响
        secure: false,  // 如果是https接口，需要配置这个参数，当代理某些https服务报错时用
        pathRewrite: {
          '^/api': ''   //正则匹配/api，将/api重写为空
        }
      },
      '/api2': {
        target: '<other_url>'
      }
    },
    // moke接口
    before: function (app) {
      // `app` 是一个 express 实例
      app.get('/test/get', function(req,res){
        res.json({ success: 200 , data: 'response getData' });
      });
      app.post('/test/post', function(req,res){
        res.json({ success: 200 , data: 'response postData' });
      })
    }
  },
  // 插件
  plugins:publicAll
  // plugins:[
  //   new htmlWebpackPlugin({
  //     filename:DIST_PATH+'/index.html', //输出
  //     title:'测试', //index.html的title内容
  //     // template:path.resolve(__dirname,'../index.html'), //选择编译的html文件
  //     template:path.resolve(__dirname,'../public/index.html'), //选择编译的html文件
  //     inject:true, // 含有true,false,body,head,默认为true，script位于html的底部 ，false为不引入script
  //     hash:true, //是否添加hash
  //     chunks:['index'] //按需引入js文件，不要加后缀.js，如果不设置，默认引入所有的js文件，可以入全局js文件
  //     // minfy:true //压缩html文件
  //   }),
  //   new htmlWebpackPlugin({
  //     filename:DIST_PATH+'/test.html', //输出
  //     title:'测试2', //index.html的title内容
  //     // template:path.resolve(__dirname,'../index.html'), //选择编译的html文件
  //     template:path.resolve(__dirname,'../public/test.html'), //选择编译的html文件
  //     inject:true, // 含有true,false,body,head,默认为true，script位于html的底部 ，false为不引入script
  //     hash:true, //是否添加hash
  //     chunks:['test2']
  //     // minfy:true //压缩html文件
  //   })
  // ]
}