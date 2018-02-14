var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

var baseWebpackConfig = require('./webpack.base.conf');
var config = require('../../config');
var utils = require('../utils');

var env;
if (process.env.NODE_ENV === 'testing') {
  env = require('../config/test.env');
} else if (process.env.NODE_ENV === 'release-production') {
  env = config.build.releaseEnv;
} else {
  env = config.build.env
}

var prodConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: false })
  },
  devtool: config.build.productionSourceMap ? '#cheap-module-source-map' : false,
  plugins: [
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
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].css')
    // }),
    new OptimizeCSSPlugin(),
    // new webpack.HashedModuleIdsPlugin(), // 保证每次 build 后 vendor.js 的哈希不变
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // })
  ],
};

var webpackBuildConfig = merge(baseWebpackConfig, prodConfig, {
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsContentScriptPublicPath,
    filename: utils.assetsPath('js/content-scripts/[name].js'),
    chunkFilename: utils.assetsPath('js/content-scripts/[name].bundle.js'),
  },
});
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackBuildConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackBuildConfig;