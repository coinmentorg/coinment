'use strict';
require('shelljs/global')
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
var appWebpackConfig = require('./webpack.prod.conf')
var contentScriptWebpackConfig = require('./hot-update/webpack.prod.conf')
var hotWebpackConfig = require('./hot-update/hot.webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

// ../chrome/hotmodule-entries/entryNames.js 由于 commonJS 与 es6 modules 的冲突，先复制到这里
const ENTRY_NAMES = {
  'test': '@MODULE_test',
};

rm(config.build.hotAssetsRoot, err => {
  if (err) throw err;
  rm(assetsPath, err => {
    if (err) throw err
    console.log('编译 content-script');
    webpack(contentScriptWebpackConfig, function(err, stats) {
      const postBuild = () => {
        console.log('copying');
        mkdir('dist/static/js/libs');
        console.log('copy jquery')
        cp('node_modules/jquery/dist/jquery.min.js', path.join(assetsPath, 'js/libs/jquery.js'));
        console.log('copy vue')
        cp('node_modules/vue/dist/vue.min.js', path.join(assetsPath, 'js/libs/vue.js'));
        console.log('copy axios')
        cp('node_modules/axios/dist/axios.min.js', path.join(assetsPath, 'js/libs/axios.js'));
        console.log('copy img')
        mkdir('dist/static/img');
        cp('src/chrome/img/plugin-icons/*', path.join(assetsPath,'img'));
        console.log('copy manifest')
        cp('src/chrome/manifest.json', config.build.assetsRoot);
        webpack(appWebpackConfig, function (err, stats) {
          spinner.stop();
          if (err) throw err;
          process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n');

          console.log(chalk.cyan('  Build complete.\n'));
          console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
          ));
        });
      };
      if (process.env.NODE_ENV === 'release-production') {
        webpack(hotWebpackConfig, function(err, stats){
          console.log('生成 module list');
          const generatedModules = fs.readdirSync(path.resolve(__dirname, '../hot-dist/static/js/content-scripts/'));
          const generatedModuleList = {};
          Object.keys(ENTRY_NAMES).map(moduleName => {
            for (let i = 0; i < generatedModules.length; i++) {
              if (generatedModules[i].indexOf(moduleName) > -1) {
                generatedModuleList[moduleName] = generatedModules[i];
                break;
              }
            }
          });
          fs.writeFile('src/chrome/background/hotUpdate/moduleList.json', JSON.stringify(generatedModuleList));
          postBuild()
        });
      } else {
        postBuild();
      }
    });
  })
})
