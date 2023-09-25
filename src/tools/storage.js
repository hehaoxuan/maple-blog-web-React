// 1、存储loalStorage
const loalStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

// 2、获取localStorage
const loalStorageGet = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
}

// 3、删除localStorage
const loalStorageRemove = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
}

// 4、存储sessionStorage
const sessionStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value);
}

// 5、获取seesionStorage
const sessionStorageGet = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
}

// 6、删除sessionStorage
const sessionStorageRemove = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
}

// 1、设置cookie 键名 值 过期时间(天)
const setCookie = (key, value, expire) => {
  const d = new Date()
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};

// 2、读取cookie
const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split('; ');
  let cookieValue = '';
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split('=');
    if (temp[0] === key) {
      cookieValue = temp[1];
      break
    }
  }
  return cookieValue
};

// 3、删除cookie
const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
}

export {
  loalStorageSet,
  loalStorageGet,
  loalStorageRemove,
  sessionStorageSet,
  sessionStorageGet,
  sessionStorageRemove,
  setCookie,
  getCookie,
  delCookie
}
