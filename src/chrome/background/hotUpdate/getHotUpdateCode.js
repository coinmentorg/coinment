import $ from 'jquery';
import CONSTANTS from '../../../constants';
import config from '../../../configs';

export default {
  getWholeList: () => {
    return $.ajax(`${CONSTANTS.urls.API_HOST}/api/hot_update/entry?extver=${config.version}`, {
      type: 'GET',
      dataType: 'json',
    }).then((res) => {
      if (res.base_resp.ret === 0) {
        if (res.entry.length === 0) {
          return Promise.reject(res);
        } else {
          const moduleList = {};
          res.entry.map((entry) => {
            moduleList[entry.name] = entry.url;
          });
          return Promise.resolve(moduleList);
        }
      }
      return Promise.reject(res);
    }, (err) => {
      return Promise.reject(err);
    });
  },
  getModule: (moduleUrl) => {
    return $.ajax(moduleUrl, {
      type: 'GET',
      dataType: 'html',
    }).then((res) => {
      return Promise.resolve(res);
    }, (err) => {
      return Promise.reject(err);
    })
  },
  getVer: (curVer) => {
    // 加上当前版本号用于统计覆盖率
    return $.ajax(`${CONSTANTS.urls.API_HOST}/api/hot_update/version?extver=${config.version}&curver=${curVer || ''}`, {
      type: 'GET',
      dataType: 'json',
    }).then((res) => {
      if (res.base_resp.ret === 0) {
        return Promise.resolve(res.version);
      }
      return Promise.reject(res);
    }, (err) => {
      return Promise.reject(err);
    })
  },
}
