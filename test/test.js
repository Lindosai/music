function instantiate(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const v = constructor.apply(obj, args);
  return isPrimitive(v) ? obj : v;
}

function instantiate(constructor, ...args) {
  const F = function () { };
  F.prototype = constructor.prototype;
  const f = new F();
  const v = constructor.apply(f, args);
  return isPrimitive(v) ? obj : v;
}

function instantiate(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const v = constructor.apply(obj, args);
  return isPrimitive(v) ? obj : v;
}

Function.prototype.create = function (o) {
  const F = function () { };
  F.ptototype = o;
  return new F();
}

Function.prototype.call = function (context, ...args) {
  context = context ?? window;
  context.fn = this;
  const v = context.fn(...args);
  delete context.fn;
  return v;
}

Function.prototype.apply = function (context, args) {
  context = context ?? window;
  context.fn = this;
  let v;
  if (args && args.length) {
    v = context.fn(...args);
  } else {
    v = context.fn();
  }
  delete context.fn;
  return v;
}

Function.prototype.bind = function (context) {
  context = context ?? window;
  const that = this;
  return function (...args) {
    that.apply(context, args);
  }
}

function debounce(fn, delay = 2000) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

function throttle(fn, delay = 2000) {
  let pre = Date.now(), timer = null;
  return function (...args) {
    const now = Date.now();
    if (now - pre > delay) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        pre = Date.now();
        clearTimeout(timer);
        timer = null;
      }, delay);
    } else if (timer === null) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        pre = Date.now();
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  }
}

function formatDate(time, fmt) {
  const date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear().slice(4 - RegExp.$1.length));
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (const k of o) {
    const str = o[k];
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).slice(str.length));
    }
  }

  return fmt;
}

(function (window) {
  const PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected';
  
  function Promise(executor) {
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];

    function resolve(value) {
      if (self.status !== PENDING) return;
      self.satus = RESOLVED;
      self.data = value;
      if (self.callbacks) {
        setTimeout(() => {
          self.callbacks.forEach(({ onResolved }) => {
            onResolved(self.data);
          });
        });
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) return;
      self.data = reason;
      if (self.callbacks) {
        setTimeout(() => {
          self.callbacks.forEach(({ onRejected }) => {
            onRejected(self.data);
          }); 
        });
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    return new Promise((resolve, reject) => {
      const handle = cb => {
        try {
          const result = cb(self.data);
          result.then(resolve, reject);
        } catch (error) {
          reject(error);
        }
      }

      if (self.status === RESOLVED) {
        setTimeout(() => {
          cb(onResolved); 
        });
      } else if (self.satus === REJECTED) {
        setTimeout(() => {
          cb(onRejected); 
        });
      } else {
        self.callbacks.push({
          onResolved() {
            handle(onResolved);
          },
          onRejected() {
            handle(onRejected);
          }
        })
      }
    });
  }

  Promise.prototype.catch = function (onRejected) {
    const self = this;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    return new Promise((resolve, reject) => {
      const handle = reason => {
        reject(reason);
      }

      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved() {},
          onRejected() {
            handle(onRejected);
          }
        })
      } else {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  }

  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let index = 0;
      promises.forEach((promise, i) => {
        promise.then(result => {
          results[i] = result;
          if (++index === promises.length) resolve(results);
        }, reject);
      });
    });
  }

  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject);
      })
    });
  }

  Promise.resolveDelay = function (value, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, delay);
    });
  }

  Promise.rejectDelay = function (reason, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason);
      }, delay);
    });
  }

  window.Promise = Promise;
})(window);

function promisify(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) return reject(err);
        resolve(values);
      });
      Reflect.apply(original, this, args);
    });
  }
}
