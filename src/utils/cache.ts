interface SearchDataType {
  q: string;
  result: string[];
  qty: number;
  total: number;
  page: number;
  limit: number;
}

export const getCache = async (key: string) => {
  const cacheStorage = await caches.open('search');
  const cacheResponse = await cacheStorage.match(key);
  if (cacheResponse) {
    const cacheData = await cacheResponse.json();
    if (cacheData.expire > new Date().getTime()) {
      return cacheData.value;
    }
    cacheStorage.delete(key);
  }
};

export const setCache = async (key: string, value: SearchDataType, expireTime: number) => {
  const cacheStorage = await caches.open('search');
  const cacheData = new Response(
    JSON.stringify({ value, expire: new Date().getTime() + expireTime })
  );
  await cacheStorage.put(key, cacheData);
};
