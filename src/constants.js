/**
 * Created by jasonzx on 16/9/26.
 */

// 一些常量
// TODO: 上线前修改至线上接口
//
let API_HOST = 'https://api.x.xmt.cn';
let ACCOUNT_HOST = 'https://sso.xmt.cn';
// 开发用
// let API_HOST = 'https://api.x.195.xmt.cn';
// let ACCOUNT_HOST = 'https://sso.195.xmt.cn';

// let API_HOST = 'https://tapi.x.xmt.cn';
// let ACCOUNT_HOST = 'https://tsso.xmt.cn';

// 体验用
// let API_HOST = 'https://dev.api.195.xmt.cn';
// let ACCOUNT_HOST = 'https://dev.sso.195.xmt.cn';

// let API_HOST = 'http://192.168.1.183:10932';
// let ACCOUNT_HOST = 'http://192.168.1.183:10934';

if(!process.env.NODE_ENV.match('production')){
  API_HOST = '';
  ACCOUNT_HOST = '/sso';
}

const CALENDAR_URL = 'https://calendar.xmt.cn/';
const HOTARTICLE_API = 'https://article.xmt.cn/';
const SEARCH_URL = 'http://search.xmt.cn/';
const EXTENSION_API = 'https://x.xmt.cn/user/#/appcenter';
const PLAT_SYNC_HREF = 'https://x.xmt.cn/sync/';
const PROFILE_API = 'https://x.xmt.cn/user/';
// const PROFILE_API = 'http://apps.195.xmt.cn/profile.html';
const MATERIAL_API = 'https://x.xmt.cn/user/#/material/photo'; //素材中心
const SXL_URL = 'https://x.xmt.cn/sxl/index.html';
const SXL_LOGIN = 'https://www.sxl.cn/r/v1/users/xmt_users/login';

const UPLOAD_IMG_API = 'https://x.xmt.cn/uploadImg/index.html';
// const  UPLOAD_IMG_API = 'http://richstore.azber.com/uploadImg/upload_img.html';
const STYLE_CENTER_URL = 'https://x.xmt.cn/styleCenter/';



// const PLAT_SYNC_HREF = 'http://apps.test.xmt.cn/sync.html';
// const CALENDAR_URL = 'http://apps.test.xmt.cn/calendar.html';
// const HOTARTICLE_API = 'http://apps.test.xmt.cn/hotCenter.html';
// const EXTENSION_API = 'http://apps.test.xmt.cn/appCenter.html';
// const PROFILE_API = 'http://apps.test.xmt.cn/profile.html';

// const PLAT_SYNC_HREF = 'http://x.195.xmt.cn/sync/';
// const CALENDAR_URL = 'http://calendar.195.xmt.cn/';
// const HOTARTICLE_API = 'http://article.195.xmt.cn/';
// const PROFILE_API = 'http://x.195.xmt.cn/profile/';
// const EXTENSION_API = 'http://x.195.xmt.cn/profile/#/appcenter';

const Constants = {
  titles: {
    ACCOUNT: '帐号管理',
    ADD_ACCOUNT: '添加帐号',
    CLASS: '新媒体课堂',
    DOWNLOAD: 'App下载'
  },
  urls: {
    ACCOUNT_HOST: ACCOUNT_HOST,
    API_HOST: API_HOST,
    CALENDAR_URL: CALENDAR_URL,
    HOTARTICLE_API: HOTARTICLE_API,
    SEARCH_URL: SEARCH_URL,
    PAIBAN_HREF: 'http://paiban.xmt.cn',
    MORE_PLATFORM_HREF: 'https://wj.qq.com/s/918898/5579',
    PLAT_SYNC_HREF: PLAT_SYNC_HREF,
    WEB_LOGIN: ACCOUNT_HOST,
    SXL_URL: SXL_URL,
    SXL_LOGIN: SXL_LOGIN,
    PROFILE: PROFILE_API,
    EXTENSION_API: EXTENSION_API,
    MATERIAL_API: MATERIAL_API,
    PLATFORM_WX: 'https://mp.weixin.qq.com',
    PLATFORM_TA: 'https://mp.weixin.qq.com',
    PLATFORM_TT: 'https://mp.toutiao.com/',
    PLATFORM_OP: 'https://mp.yidianzixun.com',
    PLATFORM_QE: 'https://om.qq.com/',
    PLATFORM_WB: 'https://weibo.com/',
    PLATFORM_BJ: 'http://baijiahao.baidu.com/',
    PLATFROM_UC: 'http://mp.uc.cn/',
    PLATFROM_ZH: 'https://www.zhihu.com/',
    PLATFROM_WY: 'http://mp.163.com/',
    PLATFROM_SH: 'https://mp.sohu.com/',
    SOOGIF_SEARCH_GIF: API_HOST+'/api/sogif/image/search',
    SOOGIF_GET_COLUMN: API_HOST+'/api/sogif/column/list',
    SOOGIF_GET_GIF_LIST: API_HOST+'/api/sogif/column/image/list',
    IMAGE_SEARCH: API_HOST+'/api/openimage/search',  // key
    IMAGE_GET_CATEGORY: API_HOST+'/api/openimage/categories',
    IMAGE_BY_CATEGORY: API_HOST+'/api/openimage/category',  // category; page; size
    TEXT_LINK: API_HOST + '/system/option',
    DESKTOP_GET_DATA: API_HOST+'/api/super/desktop/account',
    DOC_IMPORT: API_HOST+'/api/word2html',
    COLLECT_STYLE: API_HOST+'/api/style_collect/add',  // method=POST content tag
    GET_COLLECTED_STYLE: API_HOST+'/api/style_collect/list',  // size page
    DELETE_STYLE: API_HOST+'/api/style_collect/delete ',  // method=POST
    SAVE_STYLE: API_HOST+'/api/style_collect/update/', // +id, method=POST
    MESSAGE_GET: API_HOST+'/api/notify/list',
    MESSAGE_GET_UNREADCOUNT: API_HOST+'/api/notify/new_count',
    MESSAGE_GET_NEW: API_HOST+'/api/notify/list/new',
    MESSAGE_READ: API_HOST+'/api/notify/read',
    UPLOAD_IMG_API: UPLOAD_IMG_API,
    STYLE_CENTER_URL: STYLE_CENTER_URL,
  },
  STORAGE_USERS_KEY: 'xmt-extension-users',
  STORAGE_CONFIG_KEY: 'xmt-extension-config',
  STORAGE_BIND_HINT_KEY: 'xmt-should-show-bind-hint',

  DESKTOP: {
    CUSTOM_HEADER: 'X-Xmt-Header',
    GET_FOLLOWER_URL: 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&f=json',
    GET_HEADLINE_URL: 'https://mp.weixin.qq.com/cgi-bin/masssendpage?t=mass/list&action=history&begin=0&count=10&lang=zh_CN&f=json',
    ACCOUNT_STATUS: {
      EXPIRED: 0,
      ACTIVE: 1
    },
    CARD_STATUS: {
      DEFAULT: 0,
      QRCODE: 1,
      IMGCODE: 2,
      WRONGPWD: 3
    }
  },

  SYNC: {
    CUSTOM_HEADER_AID: 'X-Xmt-Sync-Header-Aid',
    CUSTOM_HEADER_ACTION: 'X-Xmt-Sync-Header-Action',
    CUSTOM_HEADER_PLAT: 'X-Xmt-Sync-Header-Plat',
    CUSTOM_HEADER_Referer: 'X-Xmt-Sync-Header-Referer',
    ERR_REPORT_URL: API_HOST + '/api/multiplatform/user/report_error',
  }
};

export default Constants;

