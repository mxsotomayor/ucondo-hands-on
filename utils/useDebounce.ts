import React from "react";

export const useDebouncer = (delay = 400) => {
  const timer = React.useRef<number>(0);

  const caller = React.useCallback(
    (cb: (data?: unknown) => void) => {
      clearInterval(timer.current);
      timer.current = setTimeout(() => {
        cb();
      }, delay);
    },
    [delay]
  );

  return caller;
};
