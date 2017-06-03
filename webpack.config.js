const { resolve } = require('path');
const webpack = require('webpack');
const inProduction = (process.env.NODE_ENV === 'production');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'sticky-header': './sticky-header.js',
    'polyfill': 'classlist-polyfill',
  },
  output: {
    filename: '[name].js',
    // the output bundle
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    library: 'sticky-header',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  context: resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js'],
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: function () {
                  return [
                    require('autoprefixer'),
                  ];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                url: false,
                outputStyle: 'expanded',
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
