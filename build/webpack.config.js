const webpack = require('webpack');
const path = require('path'); //node的path模块
const glob = require('glob'); //node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
const htmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const vueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader是webpack的加载器，允许以组件的格式创作Vue组件
const DIST_PATH = path.resolve(__dirname,'../dist'); // dist路径
// const SRC_PATH = path.resolve(__dirname,'../src'); // src路径
const PUBLIC_PATH = path.resolve(__dirname,'../public'); // public路径
const extractTextPlugin = require('extract-text-webpack-plugin'); // 抽离 CSS 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除文件
// import 'babel-polyfill'

module.exports = {
  mode: 'development',// 指定开发者打包模式
// 入口js文件
  entry:path.resolve(__dirname,'../src/main.js'),
// 打包后输出文件
  output:{
    path: DIST_PATH,
    filename:'main.[hash:5].js'
  },
// 开发服务
  devServer:{
    hot:true, // 热更新
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
// 模块解析
  module:{
    rules:[
      // 图片
      {
        test:/.(jpg|bmp|eps|gif|mif|miff|png|tif|tiff|svg|wmf|jpe|jpeg|dib|ico|tga|cut|pic)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:2048,
            outputPath:'static/images',
            publicPath:'../static/images',
            name:'[hash:5].[ext]'
          }
        }]
      },
      // 视频
      {
        test:/\.(avi|asf|wmv|avs|flv|mov|3gp|mp4|mpg|mpeg|dat|ogm|vob|rm|rmvb|ts|tp|ifo|nsv)$/,
        use:[{
          loader:'file-loader',
          options:{
            outputPath:'static/video',
            publicPath:'../static/video',
            name:'[hash:5].[ext]'
          }
        }]
      },
      // 音频
      {
        test:/\.(mp3|aac|wav|wma|cda|flac|m4a|mid|mka|mp2|mpa|mpc|ape|ofr|ogg|ra|wv|tta|ac3|dts)$/,
        use:[{
          loader:'file-loader',
          options:{
            outputPath:'static/audio',
            publicPath:'../static/audio',
            name:'[hash:5].[ext]'
          }
        }]
      },
      // 文字
      {
        test:/\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/,
        use:[{
          loader:'file-loader',
          options:{
            limit: 10000,
            outputPath:'static/font',
            publicPath:'../static/font',
            name:'[hash:5].[ext]'
          }
        }]
      },
      // 文档
      {
        test:/\.(exe|rar|zip|iso|doc|ppt|xls|xlsx|wps|txt|lrc|docx|pdf)$/,
        use:[{
          loader:'file-loader',
          options:{
            outputPath:'static/doc',
            publicPath:'../static/doc',
            name:'[hash:5].[ext]'
          }
        }]
      },
      // js
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude: /node_modules/
      },
      // css/scss
      {
        test:/\.(scss|sass|css)$/,
        loader:extractTextPlugin.extract({
          use:[
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('dart-sass')
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require("autoprefixer") /*css自动添加前缀*/
                ]
              }
            },
            // {
            //   loader: 'css-hot-loader'
            // }
          ]
        })
      },
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:{
          loaders:{
            css:extractTextPlugin.extract({
              fallback:'vue-style-loader',
              use:'css-loader'
            })
          }
        }
      },
    ]
  },
  stats:'minimal', // { children: false } 屏蔽输出，errors-only 发生误时输出，minimal 发生错误或有新的编辑时输出
// 插件
  plugins:[ 
    new htmlWebpackPlugin({
      filename:DIST_PATH+'/index.html', //输出
      title:'titleName', //index.html的title内容
      template:path.resolve(__dirname,'../public/index.html'), //选择编译的html文件
      inject:true, // 含有true,false,body,head,默认为true，script位于html的底部 ，false为不引入script
      hash:true, //是否添加hash
      // chunks:['main'] //按需引入js文件，不要加后缀.js，如果不设置，默认引入所有的js文件，可以入全局js文件
      minfy:{
        collapseWhitespace:true,
      } //压缩html文件
    }),
    new vueLoaderPlugin(),
    new extractTextPlugin({
      filename:'[name].[hash:5].css',
      allChunks:true,
      ignoreOrder:false, //禁用顺序检查,默认为false
      // disable:false // 禁用插件
    }),
    new CleanWebpackPlugin()// 删除文件 保留新文件
  ],
}