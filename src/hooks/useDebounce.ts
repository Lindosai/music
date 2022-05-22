import { useEffect, useRef, MutableRefObject } from 'react';

const useDebounce = (fn: () => void, ms: number = 30, deps: any[] = []) => {
  let timeout: MutableRefObject<any> | null = useRef();

  const cancel = () => {
    timeout && timeout.current && clearTimeout();
    timeout = null;
  };

  useEffect(() => {
    timeout && timeout.current && clearTimeout(timeout.current);
    if (timeout) timeout.current = setTimeout(fn, ms);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [cancel];
};

export default useDebounce;
