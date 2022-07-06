export function debounce(func: () => void, delay: number = 500) {
  let timer: NodeJS.Timeout | null = null;
  return function(...args: any) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(func: () => void, delay: number = 1000) {
  let timer: NodeJS.Timeout | null = null, pre: number = 0;
  return function(...args: any) {
    const now: number = Date.now(), remaining: number = (now - pre) - delay;
    if (remaining >= 0) {
      // 立即执行
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
