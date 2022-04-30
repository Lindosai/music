const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'async', // 同步 or 异步，这里是异步
      minSize: 20000, // 如果模块大小小于这个值，则不会被分割 20k
      minRemainingSize: 0, // 最小可保存大小，开发模式下为 0，其他情况下等于 minSize，一般不用手动配置
      minChunks: 1, // 如果模块被引用次数小于这个值，则不会被分割
      maxAsyncRequests: 30, // 异步模块，一次最多被加载的次数
      maxInitialRequests: 30, // 入口模块最多被加载的次数
      enforceSizeThreshold: 50000, // 强制分割的大小阈值 50k
      cacheGroups: { // 缓存组
        // 打包第三方库
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配第三方库文件
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
        },
        // 打包公共模块
        default: {
          minChunks: 2, // 被超过两个模块引用，才会被打包
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
        },
      },
    },
  }
});
