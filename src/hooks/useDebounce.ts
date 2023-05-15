import { useRef } from 'react';

// const DEBOUNCE_TIMEOUT_SEC = 0.5;
// export default function useDebounce(callback: () => void, ms = DEBOUNCE_TIMEOUT_SEC) {
//   useEffect(() => {
//     const debounceTimeout = window.setTimeout(callback, ms * 1000);
//     return () => clearTimeout(debounceTimeout);
//   }, [callback]);
// }

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
