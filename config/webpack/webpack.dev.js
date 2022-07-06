const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    open: true,
    port: 8000,
    hot: true,
    client: {
      logging: 'warn',
      overlay: true
    },
    historyApiFallback: true, // 解决单页面路由跳转 404 问题
  },
});
