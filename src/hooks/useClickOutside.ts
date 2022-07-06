import { useState, useEffect, useCallback, RefObject } from "react";

const useClickOutside = (ele: RefObject<HTMLElement>) => {
  const [outside, setOutside] = useState(false);

  const handler = useCallback((e: MouseEvent) => {
    const inside = ele.current && ele.current.contains(e.target as Node);
    setOutside(!inside);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return outside;
};

export default useClickOutside;
