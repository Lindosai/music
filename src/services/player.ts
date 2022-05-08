import request from './axios';

export function getSongDetail(ids: number[]) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  });
};

export function getLyric(id: number) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  });
};

export function getSimiPlaylist(id: number) {
  return request({
    url: '/simi/playlist',
    params: {
      id
    }
  });
};

export function getSimiSong(id: number) {
  return request({
    url: '/simi/song',
    params: {
      id
    }
  });
};
