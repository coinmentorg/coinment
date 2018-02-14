const util = {};

// localStorage
util.getStorage = (key) => {
  if(window.localStorage){
    return window.localStorage.getItem(key);
  } else {
    console.log('不支持 localstorage');
    return null;
  }
};
util.setStorage = (key, val) => {
  if(window.localStorage){
    return window.localStorage.setItem(key, val);
  } else {
    console.log('不支持 localstorage');
    return null;
  }
};
util.removeStorage = (key) => {
  if(window.localStorage){
    return window.localStorage.removeItem(key);
  } else {
    console.log('不支持 localstorage');
    return null;
  }
};

export default util;
