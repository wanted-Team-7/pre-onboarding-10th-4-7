import { useEffect, useState } from 'react';

const useInfiniteScroll = ({ onScrollEnd }: { onScrollEnd: () => Promise<void> }) => {
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsEnd(true);
      if (onScrollEnd) await onScrollEnd();
      setIsEnd(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isEnd };
};

export default useInfiniteScroll;
