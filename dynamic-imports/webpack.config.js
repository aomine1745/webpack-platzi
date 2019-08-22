const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/index.js'),
    contacto: path.resolve(__dirname, 'src/pages/contacto.js')
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ('js/[name].js'),
    publicPath: 'dist/',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|webp|woff|eot|ttf|svg|mp4|webm)$/,
        use:  {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    })
  ]
}