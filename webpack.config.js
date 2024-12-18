const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    mode: 'development', 
  entry:{
    googleApi: "./src/googleApi.js",
    app:"./src/main.js",
  }, 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'], 
      },
      {
        test:/\.js$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
      },
      {
        test:/\.css$/i,
        use:["style-loader","css-loader"]
      }
    ],
  },
  devServer:{
    static:{
        directory:path.join(__dirname, "dist")
    },
    compress:true,
    hot:true,
    open:true,
    port:8080
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:{
        useShortDoctype:true,
        collapseWhitespace:false
      }
    }),
    new DotenvWebpackPlugin(),
  ],

};

console.log("hello")