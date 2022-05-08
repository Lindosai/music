import request from './axios';

interface IParams {
  limit: number,
  cat?: number,
  type?: number,
  area?: number,
  initial?: number
}

export function getArtistList(area: number, type: number, initial: number): Promise<any> {
  let url: string = '/artist/list';
  let params: IParams;
  if (area === -1 && type === 1) {
    url = '/top/artists';
  } else {
    if (area === -1) {
      params = {
        limit: 100,
        cat: 5001
      };
    } else {
      params = {
        limit: 100,
        type,
        area,
        initial
      };
    }
  }

  console.log('url:', url, 'params:', params);

  return request({
    url,
    params
  });
};
