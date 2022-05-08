const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js']
  },
  devServer: {
    open: true,
    port: 8000,
    hot: true,
    client: {
      logging: 'warn',
      overlay: true
    },
    historyApiFallback: true, // 解决单页面路由跳转 404 问题
  }
});
