import React, { memo } from 'react';
import TopBanner from './c-cpns/top-banner';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RankingList from './c-cpns/ranking-list';
import UserLogin from './c-cpns/user-login';
import SettleSinger from './c-cpns/settle-singer';
import HotRadio from './c-cpns/hot-radio';
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style';

export default memo(function Recommend() {
  return (
    <RecommendWraper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotRadio />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
});
