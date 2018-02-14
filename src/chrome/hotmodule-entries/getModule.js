if (__webpack_public_path__.length < 2) {
  __webpack_public_path__ = `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/`;
}

export default (moduleName, backup, needDomReady) => {
  if (process.env.NODE_ENV === 'release-production') {
    chrome.runtime.sendMessage({ operation: 'hotUpdate', action: 'getModule', moduleName: moduleName }, (res) => {
      if (res.status === 0) {
      } else {
        // 执行插件内打包的代码
        if (typeof backup === 'function') {
          console.log(`${moduleName}模块 backup`);
          chrome.extension.sendRequest({ operation: 'dataCount', options: { type: 'action', name: 'hotupdate-get-module-fail', moduleName: moduleName } });
          if (needDomReady) {
            if (document.readyState === 'interactive' || document.readyState === 'complete') {
              backup();
            } else {
              document.addEventListener('DOMContentLoaded', () => {
                backup()
              })
            }
          } else {
            backup();
          }
        }
      }
    });
  } else {
    if (typeof backup === 'function') {
      backup()
    }
  }
};