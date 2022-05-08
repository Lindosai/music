import request from './axios';

export function getDjRadioCatelist() {
  return request({
    url: '/dj/catelist'
  });
};

export function getDjRadioRecommend(type: string) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type
    }
  });
};

export function getDjRadios(cateId: number, limit: number, offset: number) {
  return request({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  });
};
