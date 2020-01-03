const webpack = require('webpack');
const constant = require('./constant'); // 引入常量文件
const path = require('path'); //node的path模块
const htmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const vueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader是webpack的加载器，允许以组件的格式创作Vue组件
const DIST_PATH = path.resolve(__dirname,'../dist'); // dist路径
const SRC_PATH = path.resolve(__dirname,'../src'); // src路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
// 入口js文件
  entry:path.resolve(__dirname,'../src/main.js'),
// 打包后输出文件
  output:{
    filename:"static/js/[name].[hash:5].js", //entry输出文件名，[name]为entry.key
    path: DIST_PATH, //输出路径
    // chunkFilename:"static/js/[name].[hash:5].js", //除entry外的单独输出js文件输出名，[name]为require.ensure
    // publicPath:"/", //静态文件引用路径，最好为根路径
  },
// 别名
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { // 使用示例  @import "~scss/home.scss"
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'scss': resolve('src/assets/scss'),
      "img": path.join(__dirname, "..", "src", "assets", "images") // 注意：静态资源通过src，不能这么设置
    }
  },
// 模块解析
  module:{
    rules:[
      // 图片
      {
        test:/.(jpg|bmp|eps|gif|mif|miff|png|tif|tiff|svg|svgz|wmf|jpe|jpeg|dib|ico|tga|cut|pic)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:20000,
            outputPath:'static/images',
            publicPath:'../static/images',
            name:'[name].[hash:5].[ext]'
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
            name:'[name].[hash:5].[ext]'
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
            name:'[name].[hash:5].[ext]'
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
            name:'[name].[hash:5].[ext]'
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
            name:'[name].[hash:5].[ext]'
          }
        }]
      },
      // js
      {
        test:/(\.jsx|\.js)$/,
        loader:'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'] //router动态import需要
        },
        include: SRC_PATH,
        exclude: /node_modules/
      },
      // vue
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      }
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
    new webpack.DefinePlugin({ // 定义全局变量
      CONSTANT: JSON.stringify(constant)
    })
  ],
}