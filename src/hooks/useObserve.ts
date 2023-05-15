import { useCallback, useEffect, useRef } from 'react';

export default function useObserve<T extends HTMLElement>(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const observerTarget = useRef<T>(null);

  const obsCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        callback();
      });
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(obsCallback, options);
    observer.observe(observerTarget.current as Element);
    return () => {
      observer.disconnect();
    };
  }, [obsCallback, options]);

  return { observerTarget };
}
