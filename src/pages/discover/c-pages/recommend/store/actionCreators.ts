import * as actionTypes from './constants';

import { 
  getTopBanner,
  getHotRecommend,
  getNewAlbum,
  getTopList,
  getArtistList
} from '@/services/recommend';

const changeBannerAction = (res: any) => ({
  type: actionTypes.CHANGE_TOP_BNNAER,
  banners: res.banners
});

const changeRecommendAction = (res: any) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  recommends: res.result
});

const changeNewAlbumAction = (res: any) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbum: res.albums
});

const changeUpListAction = (res: any) => ({
  type: actionTypes.CHANGE_UP_LIST,
  topUpList: res.playlist
});

const changeNewListAction = (res: any) => ({
  type: actionTypes.CHANGE_NEW_LIST,
  topNewList: res.playlist
});

const changeOriginListAction = (res: any) => ({
  type: actionTypes.CHANGE_ORIGIN_LIST,
  topOriginList: res.playlist
});

const changeSettleSingsAction = (res: any) => ({
  type: actionTypes.CHANGE_SETTLE_SONGER,
  settleSings: res.artists
});


export const getBanner = () => {
  return (dispatch: any) => {
    getTopBanner().then(res => {
      dispatch(changeBannerAction(res));
    });
  };
};

export const getRecommend = () => {
  return (dispatch: any) => {
    getHotRecommend().then(res => {
      dispatch(changeRecommendAction(res));
    });
  };
};;

export const getAlbum = () => {
  return (dispatch: (arg0: { type: string; newAlbum: any; }) => void) => {
    getNewAlbum(10, 0).then(res => {
      dispatch(changeNewAlbumAction(res));
    });
  };
};

export const getTopData = (idx: number) => {
  return (dispatch: any) => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeNewListAction(res));
          break;
        case 2:
          dispatch(changeOriginListAction(res));
          break;
        case 3:
          dispatch(changeUpListAction(res));
          break;
        default:
          console.log('其他数据处理');
      }
    });
  };
};

export const getSettleSingers = () => {
  return (dispath: (arg0: { type: string; settleSings: any; }) => void) => {
    getArtistList(5, '5001').then(res => {
      dispath(changeSettleSingsAction(res));
    });
  };
};
