export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(func, delay = 1000) {
  let timer = null, pre = 0;

  return function(...args) {
    const now = Date.now(), remaining = (now - pre) - delay;

    if (remaining >= 0) {
      // 根据上一次执行时间 previous 判断是否立即执行
      pre = now;
      func.call(this, ...args);
    } else if (!timer) {
      // 间隔时间到执行
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        pre = Date.now();
        func.call(this, ...args);
      }, delay);
    }
  };
}
