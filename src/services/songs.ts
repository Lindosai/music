import request from './axios';

export function getSongCategory() {
  return request({
    url: '/playlist/catlist'
  });
};

export function getSongCategoryList(cat: string = '全部', offset: number = 0, limit: number = 35) {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset
    }
  });
};
