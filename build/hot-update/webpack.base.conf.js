var path = require('path');
var fs = require('fs');
// happy pack optimize
var HappyPack = require('happypack');
var os = require('os');

var config = require('../../config');
var utils = require('../utils');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
var vueLoaderConfig = require('../vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '../..', dir);
}

const hotModules = fs.readdirSync(path.resolve(__dirname, '../../src/chrome/hotmodule-entries/'));
const entries = {};
hotModules.map(moduleName => {
  if (moduleName !== 'getModule.js' && moduleName !== 'entryNames.js') {
    entries[`${moduleName.split('.js')[0]}.entry`] = `./src/chrome/hotmodule-entries/${moduleName}`;
  }
});

// 在需要热更新的模块中添加或删除第三方库需要在此处修改

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV.match('production')
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  externals: {
    jquery: '$',
    vue: 'Vue',
    'vue-resource': 'VueResource',
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
            name: utils.assetsPath('img/[name].[ext]')
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
    })
  ],
};
