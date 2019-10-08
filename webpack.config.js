const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const PostCSSSafeParser = require('postcss-safe-parser');

const getConfig = (env = {}, argv = {}) => {
  const isProduction = argv.mode === 'production';
  const config = {
    entry: {
      index: './src/sticky-header.js'
    },
    mode: isProduction ? 'production' : 'development',
    output: {
      filename: '[name].js',
      // the output bundle
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.js']
    },
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          sourceMap: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: [
              'advanced',
              {
                autoprefixer: {
                  add: true,
                  remove: true
                },
                discardComments: {
                  removeAll: true
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                parser: PostCSSSafeParser,
                sourcemap: true
              }
            ]
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/,
          options: {
            emitWarning: true,
            formatter: require('eslint/lib/cli-engine/formatters/stylish')
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  sourceMap: true
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({}),
      new CleanWebpackPlugin({ verbose: true }),
      new StyleLintPlugin({
        failOnError: false,
        emitErrors: false, // warnings produce better console output
        quiet: false
      })
    ]
  };

  return config;
};

module.exports = getConfig;
