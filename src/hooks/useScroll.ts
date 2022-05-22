/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useState } from 'react';

const useScroll = (scrollRef: MutableRefObject<any>) => {
  const [pos, setPos] = useState([0, 0]);

  const handleScroll = () => {
    setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollRight]);
  };

  useEffect(() => {
    scrollRef.current.addEventListener('scroll', handleScroll, false);
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false);
    }
  }, []);

  return pos;
};

export default useScroll;
