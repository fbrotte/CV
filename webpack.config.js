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
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // enable CSS Modules
                    modules: true,
                  }
                }
              ]
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
            }
  ]},

  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  
  optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  plugins: [
      new VueLoaderPlugin(),

      new MiniCssExtractPlugin({
          filename: 'style.css'
        }),
  ]
}

module.exports = config



