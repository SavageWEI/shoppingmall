export function debounce(func, delay) {
  let timer = null

  return function (...args) {  
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行func
    if(timer) clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

export function formatDate(date, fmt) {
  // 获取年份
  // y+ -> 1个or多个y
  // y* -> 0个or多个y
  // y？ -> 0个 or 1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 获取其他时间内容
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 保证时间一定有两位 如str = 4 return 04 如str = 04 返回 04 如str = 004 返回 04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


