import request from './axios';

export function getTopBanner() {
  return request({
    url: '/banner'
  });
};

export function getHotRecommend() {
  return request({
    url: '/personalized'
  });
};

export function getNewAlbum(limit: number, offset: number) {
  return request({
    url: '/top/album',
    params: {
      limit,
      offset
    }
  });
};

export function getTopList(idx: number) {
  return request({
    url: '/top/list',
    params: {
      idx
    }
  });
};

export function getArtistList(limit: number, cat: string) {
  return request({
    url: '/artist/list',
    params: {
      cat,
      limit
    }
  });
};
