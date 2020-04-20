const path = require('path');
let webpack = require('webpack');
module.exports = {
  // 使用环境 开发环境development 生产环境 production
  mode: 'development',
  // 入口文件
  entry: {
    main: './src/main.js'
  },
  // 出口文件配置
  output: {
    // 打包路径
    path: path.resolve(__dirname, './dist'),
    // 打包文件名称[name].js 根据入口文件自动生成
    filename: "[name].js"
  },
  // 模块 如css的解析 图片转换
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        }
      ]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, 
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: "url-loader"
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        babelrc: true,
      }
    }]
  },
  // 插件 用于生产环境
  plugins: [],
  // webpack服务配置 给予webpack-dev-server
  devServer: {
    // 设置目录结构
    contentBase: path.resolve(__dirname, './dist'),
    // 服务端压缩是否开启
    compress: true,
    port: 4587,
    proxy: { // agent cross-domain interface
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};