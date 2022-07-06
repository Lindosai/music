export function getSizeImage(imgUrl: string, size: number): string {
  return `${imgUrl}?param=${size}x${size}`;
}

export function getCount(count: number): string {
  if (count < 0) return '';
  if (count < 10000) {
    return count + '';
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
}

export function getPlayUrl(id: number): string {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function formatDate(time: string | number | Date, fmt: string): string {
  const date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }

  interface IRegExpObj {
    [k: string]: number
  };

  const o: IRegExpObj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str: string): string {
  return ('00' + str).substring(str.length);
};

export function formatMonthDay(time: string | number | Date): string {
  return formatDate(time, 'MM月dd日');
}

export function formatMinuteSecond(time: string | number | Date): string {
  return formatDate(time, 'mm:ss');
}
