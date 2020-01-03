const path = require('path'); //node的path模块
const merge = require('webpack-merge');// 允许连接数组并合并对象，而不是覆盖组合
const webpackConfig = require('./webpack.config');
const DIST_PATH = path.resolve(__dirname,'../dist'); // dist路径

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',// 指定开发者打包模式
  devServer:{ // 开发服务
    hot:true, // 热更新
    contentBase:DIST_PATH,//热更新指向文件
    host: '0.0.0.0', // 域名 服务外部可访问
    useLocalIp:true,
    port:8000, //服务端口号
    https: false, // https:{type:Boolean}
    // open: process.platform === 'win32',
    open: true,
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
  module:{ // 模块解析
    rules:[
      { // css/scss
        test:/\.(css|scss|sass)$/,
        use: [
          {
            loader:'style-loader'
          },
          {
            loader:'css-loader'
          },
          {
            loader:'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("autoprefixer") /*自动添加前缀*/
              ]
            }
          }
        ],
      }
    ]
  }
})