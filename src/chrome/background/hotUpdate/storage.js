import Rx from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import localforage from 'localforage';

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

const FS_SIZE = 10*1024*1024;

const saveByFileSystem = (codeContainer) => {
  return new Promise((resolve, reject) => {
    const onInitFs = (grantedBytes) => {
      console.log('we were granted ', grantedBytes, 'bytes');
      window.requestFileSystem(window.PERSISTENT, grantedBytes, (fs) => {
        console.log('Opened file system: ' + fs.name);
        const createFile = (dirEntry) => {
          const writeFileSource = Rx.Observable.from(Object.keys(codeContainer))
          .flatMap((module) => {
            console.log(module);
            return Rx.Observable.fromPromise(new Promise((fsResolve, fsReject) => {
              dirEntry.getFile(`${module}.js`, { create: true }, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwriteend = function(e) {
                    console.log(`${module}文件写入成功`);
                    fsResolve({ status: 0, moduleName: module });
                  };

                  fileWriter.onerror = function(e) {
                    console.log(`${module}文件写入失败，${e.toString()}`);
                    fsReject();
                  };

                  const jsBlob = new Blob([codeContainer[module]], { type: 'application/javascript' });
                  fileWriter.write(jsBlob);
                })
              }, (err) => {
                console.log(err);
              });
            })).catch((err) => {
              return Rx.Observable.of({ status: -1, moduleName: module});
            })
          });

          writeFileSource.subscribe(
              (res) => {
                if (res.status === 0) {
                  console.log('write file next');
                } else {
                  console.log('write file fail');
                }
              },
              (err) => {},
              () => {
                // console.log('热更新所有代码写入完成');
                resolve();
              }
          )
        };

        fs.root.getDirectory('js', { create: false, exclusive: false }, (dirEntry) => {
          createFile(dirEntry);
        }, (err) => {
          console.log(err);
          fs.root.getDirectory('js', { create: true, exclusive: false }, (dirEntry) => {
            createFile(dirEntry);
          }, (err) => {
            console.log(err);
            reject()
          })
        });
      }, (err) => {
        console.log(err);
        reject()
      });
    };

    const onErr = (err) => {
      console.log(err);
      reject();
    };

    if (navigator.webkitPersistentStorage) {
      navigator.webkitPersistentStorage.requestQuota(FS_SIZE, onInitFs, onErr);
    } else if (window.webkitStorageInfo.requestQuota) {
      window.webkitStorageInfo.requestQuota(window.PERSISTENT, FS_SIZE, onInitFs, onErr);
    }
  });
};

const getByFileSystem = (moduleName) => {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(window.PERSISTENT, FS_SIZE, (fs) => {
      fs.root.getDirectory('js', { create: false, exclusive: false }, (dirEntry) => {
        dirEntry.getFile(`${moduleName}.js`, { create: false }, (fileEntry) => {
          fileEntry.file((file) => {
            let reader = new FileReader();
            reader.onload = () => {
              console.log(`获取${moduleName}模块成功`);
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject({ code: -3, errObj: reader.error });
            };
            reader.readAsText(file);
          }, (err) => {
            reject({ code: -3, errObj: err });
          })
        }, (err) => {
          console.log(`${moduleName}模块不存在`);
          reject({ code: -2, msg: `${moduleName}模块不存在` });
        })
      }, (err) => {
        console.log('js 目录不存在');
        reject({ code: -2, msg: 'js 目录不存在' });
      })
    }, (err) => {
       reject({ code: -1, msg: 'fileSystem 请求失败' });
    });
  })
};

const saveByIDB = (codeContainer) => {
  return new Promise((resolve, reject) => {
    const writeFileSource = Rx.Observable.from(Object.keys(codeContainer))
    .flatMap((module) => {
      return Rx.Observable.fromPromise(localforage.setItem(module, codeContainer[module]).then((res) => {
        return Promise.resolve({ status: 0, moduleName: module });
      }, (err) => {
        return Promise.reject();
      })).catch((err) => {
        return Rx.Observable.of({ status: -1, moduleName: module});
      })
    });

    writeFileSource.subscribe(
        (res) => {
          if (res.status === 0) {
            // console.log('write file next');
          } else {
            // console.log('write file fail');
          }
        },
        (err) => {},
        () => {
          // console.log('热更新所有代码写入完成');
          resolve();
        }
    )
  });
};

const getByIDB = (moduleName) => {
  return localforage.getItem(moduleName).then((code) => {
    if (code !== null) {
      return Promise.resolve(code);
    }
    return Promise.reject({ code: -2, msg: `${moduleName}模块不存在` })
  }).catch((err) => {
    console.log(err);
    return Promise.reject({ code: -1, msg: `${moduleName}模块获取失败` });
  });
};

class codeStorage {
  constructor() {
    console.log('new code storage instant');
  }
  static saveCode(codeContainer) {
    return saveByIDB(codeContainer);
    // if (navigator.webkitPersistentStorage || window.webkitStorageInfo) {
    //   // file system 存储到本地文件
    //   return saveByFileSystem(codeContainer);
    // }
  }
  static getCode(moduleName) {
    return getByIDB(moduleName);
    // if (navigator.webkitPersistentStorage || window.webkitStorageInfo) {
    //   // 从 file system 获取代码
    //   return getByFileSystem(moduleName);
    // }
  }
}

export default codeStorage;