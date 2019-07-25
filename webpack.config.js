const path                      = require('path')
const webpack                   = require('webpack')
const VueLoaderPlugin           = require('vue-loader/lib/plugin')
const TerserJSPlugin            = require('terser-webpack-plugin')
const MiniCssExtractPlugin      = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin        = require('clean-webpack-plugin')
const ManifestPlugin            = require('webpack-manifest-plugin')

const dev = process.env.NODE_ENV === 'dev'

let config = {

  entry: './src/main.ts',
  
  devServer: {
    noInfo: dev
  },

  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: './src/style/',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'sass-loader'
          ]
        },
            {
              test: /\.js?$/,
              loader: 'babel-loader',
              exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
              )
            },
            {
              test: /\.ts$/,
              loader:'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
              test:/\.vue$/,
              loader:'vue-loader',
            },
  ]},


  optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new VueLoaderPlugin(),
  ]
}

module.exports = config



