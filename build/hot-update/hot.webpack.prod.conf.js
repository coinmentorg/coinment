const path = require('path');
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// happy pack optimize
const HappyPack = require('happypack');
const os = require('os');

const config = require('../../config');
const utils = require('../utils');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const vueLoaderConfig = require('../vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '../..', dir);
}

let env;
if (process.env.NODE_ENV === 'testing') {
  env = require('../config/test.env');
} else if (process.env.NODE_ENV === 'release-production') {
  env = config.build.releaseEnv;
} else {
  env = config.build.env
}

const entries = {
  test: './src/chrome/content-scripts/comment-viewer/test.js',
};

const webpackBuildConfig = {
  entry: entries,
  devtool: config.build.productionSourceMap ? '#cheap-module-source-map' : false,
  output: {
    path: config.build.hotAssetsRoot,
    publicPath: config.build.assetsHotModulePublicPath,
    filename: utils.assetsPath('js/content-scripts/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/content-scripts/[name].[id].[chunkhash].js'),
  },
  externals: {
    jquery: '$',
    vue: 'Vue',
    axios: 'axios',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, "../../src"),
      path.resolve(__dirname, "../../chrome"),
      'node_modules'
    ],
    alias: {
      'chrome': path.resolve(__dirname, '../../chrome'),
      'assets': path.resolve(__dirname, '../../src/assets'),
      'components': path.resolve(__dirname, '../../src/components'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'HappyPack/loader?id=content-vueHappy',
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'HappyPack/loader?id=content-jsHappy',
        },
        include: [resolve('src'), resolve('chrome'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[ext]')
          }
        }
      },
    ].concat(utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: false }))
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
      id: 'content-jsHappy',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        cacheDirectory: true,
      }]
    }),
    new HappyPack({
      id: 'content-vueHappy',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'vue-loader',
        options: vueLoaderConfig,
      }]
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new OptimizeCSSPlugin(),
  ],
};

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackBuildConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackBuildConfig;
