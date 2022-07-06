import React, { memo } from 'react';
import PlayHeader from './c-cpns/play-header';
import PlayList from './c-cpns/play-list';
import LyricPanel from './c-cpns/lyric-panel';
import { PanelWrapper } from './style';

export default memo(function HYAppPlayList() {
  return (
    <PanelWrapper>
      <PlayHeader />
      <div className="main">
        <img className="image" src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg" alt="" />
        <PlayList />
        <LyricPanel />
      </div>
    </PanelWrapper>
  )
});
