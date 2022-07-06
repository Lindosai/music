const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: '/src/index.tsx',
  },
  output: {
    filename: '[name].[chunkhash:10].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:10][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            // maxSize 大于 30 * 1024，asset/resource
            // maxSize 小于 30 * 1024，asset/inline
            maxSize: 30 * 1024
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:10][ext][query]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        generator: {
          filename: 'jsons/[name].[contenthash:10][ext][query]'
        }
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
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
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