const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/index.js')
  },
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    port: 9000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ('js/[name].js')
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
          'style-loader', 
          'css-loader'
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}