import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ClassNames } from '@emotion/react';
import { formatMinuteSecond } from '@/utils/format-utils';
import { PlayListWrapper } from './style';

export default memo(function PlayList() {
  const { playList, currentSongIndex } = useSelector((state: any) => ({
    playList: state.getIn(["player", "playList"]),
    currentSongIndex: state.getIn(["player", "currentSongIndex"])
  }), shallowEqual);

  return (
    <PlayListWrapper>
      {
        playList.map((item: any, index: any) => {
          return (
            <ClassNames key={item.id}>
              {({ cx, css }) => (
                <div className={cx("play-item", { "active": currentSongIndex === index })}>
                  <div className="left">{item.name}</div>
                  <div className="right">
                    <span className="singer">{item.ar[0].name}</span>
                    <span className="duration">{formatMinuteSecond(item.dt)}</span>
                    <span className="sprite_playlist link"></span>
                  </div>
                </div>
              )}
            </ClassNames>
          )
        })
      }
    </PlayListWrapper>
  )
})
