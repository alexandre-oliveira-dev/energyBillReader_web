import {useCallback, useRef} from "react";

//@ts-ignore
export const useDebounce = (callback, delay) => {
    const timer = useRef(null);
    
    const debouncedFunction = useCallback(
      //@ts-ignore
      (...args) => {
          if (timer.current) {
              clearTimeout(timer.current);
            }
            
            //@ts-ignore
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
};
