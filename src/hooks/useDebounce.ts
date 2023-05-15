import { useRef } from 'react';

export default function useDebounce(delay = 500) {
  const timerId = useRef<null | number>(null);

  const debounce = (callback: () => void) => {
    if (typeof timerId.current === 'number') {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    timerId.current = window.setTimeout(callback, delay);
  };

  return debounce;
}
