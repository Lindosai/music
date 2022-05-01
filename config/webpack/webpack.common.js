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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src/'),
      'assets': path.resolve(__dirname, '../../assets/'),
      'components': path.resolve(__dirname, '../../components/'),
      'mocks': path.resolve(__dirname, '../../mocks/'),
      'paegs': path.resolve(__dirname, '../../paegs/'),
      'router': path.resolve(__dirname, '../../router/'),
      'services': path.resolve(__dirname, '../../services/'),
      'store': path.resolve(__dirname, '../../store/'),
    }
  }
};