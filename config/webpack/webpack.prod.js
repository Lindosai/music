const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    vendors: ['react']
  },
  module: {
    rules: [
      {
        test: /style.(j|t)s$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              execute: true,
              postcssOptions: (loaderContext) => {
                return {
                  parser: 'postcss-js',
                  plugins: [
                    require('cssnano')(),
                    require('autoprefixer')(),
                    require('postcss-import')({ root: loaderContext.resourcePath })
                  ]
                };
              },
            }
          },
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:10].css',
      chunkFilename: '[id].[contenthash:10].css',
    }),
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
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配第三方库文件
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
        },
        // 打包公共模块
        common: {
          minChunks: 2, // 被超过两个模块引用，才会被打包
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
        },
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints:'warning',
    // 入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
});
