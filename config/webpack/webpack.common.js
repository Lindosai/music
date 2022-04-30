const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: '/src/index.tsx'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../public/index.html'),
      filename: 'index.html'
    })
  ]
};