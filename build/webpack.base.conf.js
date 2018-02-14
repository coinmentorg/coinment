'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// happy pack optimize
var HappyPack = require('happypack')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const entries = {
  app: './src/main.js',
  background: './src/chrome/background/main.js',
};

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV.match('production')
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../chrome"),
      'node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'HappyPack/loader?id=vueHappy',
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'HappyPack/loader?id=jsHappy',
        },
        include: [resolve('src'), resolve('chrome'), resolve('test')]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'vue-html-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    // happypack
    new HappyPack({
      id: 'jsHappy',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        cacheDirectory: true,
      }]
    }),
    new HappyPack({
      id: 'vueHappy',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'vue-loader',
        options: vueLoaderConfig,
      }]
    })
  ],
};
