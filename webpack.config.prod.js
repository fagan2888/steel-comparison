const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: [
    '@babel/polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from: 'public',
      to: 'public'
    }]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),

    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        progress: true
      }
    }),

    // new ExtractTextPlugin('explorer.css'), // replaced by MiniCssExtractPlugin
    new MiniCssExtractPlugin({   // replaces ExtractTextPlugin
      filename: "[name].css",
      chunkFilename: "[id].css",
    }), 

    new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'staging.html'), filename: 'staging.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{loader: 'babel-loader'}],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'}],
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'url-loader?limit=10000&mimetype=application/font-woff'}],
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'url-loader?limit=10000&mimetype=application/font-woff'}],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'url-loader?limit=10000&mimetype=application/octet-stream'}],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'file-loader'}],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}],
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
};
