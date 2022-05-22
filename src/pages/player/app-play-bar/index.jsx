import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import { getPlayUrl, formatMinuteSecond } from '@/utils/format-utils';
import message from '@/components/message';
// import AppPlayPanel from '../app-play-panel'

import { 
  getSongDetailAction, 
  changeCurrentLyricIndexAction,
  changePlaySequenceAction,
  changePlaySongAction
} from '../store/actionCreators';

import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';

export default memo(function AppPlaybar() {
  // props and state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // redux hooks
  const dispatch = useDispatch();
  const {
    currentSong,
    currentLyrics,
    currentLyricIndex,
    playList,
    playSequence
  } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong']),
    currentLyrics: state.getIn(['player', 'currentLyrics']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    playList: state.getIn(['player', 'playList']),
    playSequence: state.getIn(['player', 'playSequence'])
  }), shallowEqual);

  // other hooks
  const audioRef = useRef();

  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
    setDuration(currentSong.dt);
  }, [currentSong]);

  // 其他业务
  const play = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(err => {
      setIsPlaying(false);
    });
  }, [isPlaying]);

  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging && duration) {
      setCurrentTime(currentTime);
      setProgress((currentTime * 1000) / duration * 100);
    }

    const lrcLength = currentLyrics.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = currentLyrics[i].time;
      if (currentTime * 1000 < lrcTime) break;
    }
    const finalIndex = i - 1;
    if (finalIndex !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(finalIndex));
      currentLyrics[finalIndex].content && message.info({
        message: currentLyrics[finalIndex].content,
        duration: 0,
      });
    }
  };

  const timeEnded = useCallback(() => {
    if (playSequence === 2 || playList.length === 1) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changePlaySongAction(1));
    }
  }, [dispatch]);

  const sliderChange = useCallback((value) => {
    const newProgress = value.target.value;
    const newTime = newProgress / 100.0 * duration / 1000;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
    setIsChanging(true);
  }, [duration]);

  const sliderAfterChange = useCallback(() => {
    !isPlaying && play(); 
    setIsChanging(false);
  }, [isPlaying, play]);

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev" onClick={e => dispatch(changePlaySongAction(-1))}></button>
          <button className="sprite_playbar btn play" onClick={e => play()}></button>
          <button className="sprite_playbar btn next" onClick={e => dispatch(changePlaySongAction(1))}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34" alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                onChange={sliderChange}
                onChangeCommitted={sliderAfterChange}
                color="error"
              />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime * 1000)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={playSequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button
              className="sprite_playbar btn playlist" 
              onClick={e => setShowPanel(!showPanel)}
            >
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={timeEnded} />
      {/* {showPanel && <AppPlayPanel />} */}
    </PlaybarWrapper>
  )
})
