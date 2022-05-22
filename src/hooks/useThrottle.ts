import { useState, useRef, useEffect, MutableRefObject } from 'react';

const useThrottle = (fn: () => void, ms: number = 30, deps: any[] = []) => {
  const [time, setTime] = useState(0);
  const pre: MutableRefObject<number> = useRef(0);

  const cancel = () => {
    setTime(0);
  }

  useEffect(() => {
    const now = Date.now();
    if (now - pre.current > time) {
      fn();
      pre.current = now;
    }
  });

  return [cancel];
};

export default useThrottle;
