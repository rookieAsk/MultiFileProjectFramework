const merge = require('webpack-merge');
const constant = require('./constant'); // 引入常量文件
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path'); //node的path模块
const DIST_PATH = path.resolve(__dirname, '../dist'); // dist路径
// const extractTextPlugin = require('extract-text-webpack-plugin'); // 抽离 CSS 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用于提取css到文件中
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin'); // 用于压缩css代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除文件
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',// 指定开发者打包模式压缩js代码
  devtool: '#source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
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
                require("autoprefixer") /*自动添加前缀*/
              ]
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:5].css',
      chunkFilename: 'static/css/[name].[hash:5].css'
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: true, // 是否生成css的.map文件, 调试使用
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dist/static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ]),
    new CleanWebpackPlugin(), // 删除文件 保留新文件
    new FileManagerWebpackPlugin ({  // 需要在 plugins 数组里添加
      onEnd: {
         delete: [
            './dist/dist.zip', // 删除之前已经存在的压缩包
          ],
         archive: [
            {source: './dist', destination: './dist/dist.zip'},
          ]
      }
    })
  ]
})