import Rx from 'rxjs'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import getHotUpdateCode from './getHotUpdateCode';
import CodeStorage from './storage';
import releaseModuleList from './moduleList.json';
import util from '../../../utils/util';
// import dataCount from '../dataCount';

const MODULE_LIST_KEY = 'xmt-module-file-list';
const HOT_VERSION_KEY = 'xmt-hot-update-version';

let entryList = {};
let codeContainer = {};

class HotUpdate {
  constructor() {
    HotUpdate.update();
    HotUpdate.checkUpdate();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.operation === 'hotUpdate') {
        if (message.action === 'getModule') {
          HotUpdate.getModule(message.moduleName).then((code) => {
            chrome.tabs.executeScript(sender.tab.id, {
              code: code,
            });
            sendResponse({ status: 0 });
          }, (err) => {
            sendResponse({ status: -1, msg: '模块不存在' });
          });
        } else if (message.action === 'check') {
          // 主动检查热更新
          const curVer = util.getStorage(HOT_VERSION_KEY);
          getHotUpdateCode.getVer(curVer).then((version) => {
            if (!curVer || curVer !== version) {
              HotUpdate.update().then(() => {
                util.setStorage(HOT_VERSION_KEY, version);
                // dataCount({ type: 'action', name: 'hotupdate-update-done' });
              });
            }
          }, undefined);
        }
      }
      return true;
    });
  }
  static checkUpdate() {
    const curVer = util.getStorage(HOT_VERSION_KEY);
    getHotUpdateCode.getVer(curVer).then((version) => {
      if (!curVer || curVer !== version) {
        HotUpdate.update().then(() => {
          util.setStorage(HOT_VERSION_KEY, version);
          // dataCount({ type: 'action', name: 'hotupdate-update-done' });
        }, () => {
          console.log('更新失败');
        });
      }
    }, undefined);
    setTimeout(() => {
      HotUpdate.checkUpdate();
    }, 1000*60*10);
  }
  static update() {
    return new Promise((resolve, reject) => {
      codeContainer = {};
      entryList = {};
      getHotUpdateCode.getWholeList().then((res) => {
        entryList = res;
        const getModulesSource = Rx.Observable.from(Object.keys(entryList))
        .flatMap((module) => {
          let moduleList;
          const lsModuleList = JSON.parse(util.getStorage(MODULE_LIST_KEY));
          moduleList = lsModuleList || releaseModuleList;
          const moduleFileName = entryList[module].split('/').slice(-1)[0].split('.js')[0];
          if (!moduleList || !moduleList[module] || moduleFileName !== moduleList[module]) {
            return Rx.Observable.fromPromise(
                getHotUpdateCode.getModule(entryList[module]).then((res) => {
                  return { status: 0, moduleName: module, code: res };
                })
            ).catch((err) => {
              return Rx.Observable.of({ status: -1, moduleName: module, err: err });
            })
          } else {
            return Rx.Observable.of({ status: -2, moduleName: module })
          }
        });
        getModulesSource.subscribe(
            (res) => {
              if (res.status === 0) {
                codeContainer[res.moduleName] = res.code;
              }
            },
            (err) => {},
            () => {
              if (Object.keys(codeContainer).length > 0) {
                CodeStorage.saveCode(codeContainer).then(() => {
                  const newModuleList = {};
                  Object.keys(entryList).map(module => {
                    newModuleList[module] = entryList[module].split('/').slice(-1)[0].split('.js')[0];
                  });
                  util.setStorage(MODULE_LIST_KEY, JSON.stringify(newModuleList));
                  resolve();
                }, () => {
                  console.log('code save failed');
                  reject();
                });
              } else {
                resolve();
              }
            }
        )
      }, (err) => {
        if (err.base_resp) {
          console.log(err.msg);
        }
        reject();
      });
    });
  }
  static getModule(moduleName) {
    return new Promise((resolve, reject) => {
      CodeStorage.getCode(moduleName).then((fileContent) => {
        resolve(fileContent);
      }, (storageErr) => {
        console.log(storageErr);
        // dataCount({ type: 'action', name: 'hotupdate-get-from-db-fail', moduleName: moduleName });
        // 获取失败？
        if (!entryList || !entryList[moduleName]) {
          reject();
        } else {
          getHotUpdateCode.getModule(entryList[moduleName]).then((res) => {
            resolve(res);
            let singleCodeContainer = {};
            singleCodeContainer[moduleName] = res;
            CodeStorage.saveCode(singleCodeContainer);
          }, () => {
            reject();
          });
        }
      });
    });
  }
}

export default HotUpdate;
