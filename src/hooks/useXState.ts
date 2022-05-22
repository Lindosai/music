import { useState, useEffect, useRef, MutableRefObject } from 'react';

const useXState = (initState: any) => {
  const [state, setState] = useState(initState);
  const isUpdate: MutableRefObject<any> = useRef();

  const setXState = (state: any, cb: () => void) => {
    setState((pre: any) => {
      isUpdate.current = cb;
      return typeof state === 'function' ? state(pre) : state;
    });
  };

  useEffect(() => {
    isUpdate.current && isUpdate.current();
  });

  return [state, setXState];
};

export default useXState;
