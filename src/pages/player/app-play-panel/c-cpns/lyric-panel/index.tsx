import React, { memo, useRef, useEffect, useState, MutableRefObject } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ClassNames } from '@emotion/react';
import { scrollTo } from '@/utils/ui-helper';
import { throttle } from '@/utils/handle-event';
import { PannelWrapper } from './style';

export default memo(function LyricPanel() {
  const { currentLyrics, currentLyricIndex } = useSelector((state: any) => ({
    currentLyrics: state.getIn(["player", "currentLyrics"]),
    currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
  }), shallowEqual);

  const panelRef: MutableRefObject<HTMLDivElement> = useRef();

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    panelRef.current.addEventListener('scroll', throttle(() => {
      setIsScroll(true);
      setTimeout(() => {
        setIsScroll(false);
      }, 500);
    }, 500));
  }, [panelRef]);

  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
    !isScroll && scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300);
  }, [currentLyricIndex]);

  return (
    <PannelWrapper ref={panelRef}>
      <div className="lrc-content">
        {
          currentLyrics.map((item: any, index: any) => {
            return (
              <ClassNames key={item.time}>
                {({cx, css}) => (
                  <div className={cx("lrc-item", { "active": index === currentLyricIndex })}>
                    {item.content}
                  </div>
                )}
              </ClassNames>
            )
          })
        }
      </div>
    </PannelWrapper>
  )
})
