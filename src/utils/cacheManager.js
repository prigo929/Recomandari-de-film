// Contribuție: Alin P. - Mecanism de Cache cu expirare (stale-while-revalidate pattern)

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 de ore

export const getMovieFromCache = (title) => {
  const cacheKey = `movie_${title.toLowerCase().trim()}`;
  const cachedItem = localStorage.getItem(cacheKey);

  if (!cachedItem) return null;

  const { data, timestamp } = JSON.parse(cachedItem);
  const now = Date.now();

  // Verifică expirarea memoriei cache
  if (now - timestamp > CACHE_TTL_MS) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return data;
};

export const saveMovieToCache = (title, data) => {
  const cacheKey = `movie_${title.toLowerCase().trim()}`;
  const cacheData = {
    data: data,
    timestamp: Date.now(),
  };

  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};
