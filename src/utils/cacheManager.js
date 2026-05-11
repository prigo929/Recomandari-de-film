// Contribuție: Alin P. - Mecanism de Cache cu expirare (stale-while-revalidate pattern)

/**
 * TTL (Time To Live) - Durata de viață a datelor în cache.
 * Am setat 24 de ore (calculate în milisecunde).
 */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * getMovieFromCache - Încearcă să preia datele unui film din LocalStorage.
 * @param {string} title - Titlul filmului.
 * @returns {Object|null} - Datele filmului sau null dacă nu există/au expirat.
 */
export const getMovieFromCache = (title) => {
  // Generăm o cheie unică bazată pe titlu (curățat de spații și litere mari).
  const cacheKey = `movie_${title.toLowerCase().trim()}`;
  const cachedItem = localStorage.getItem(cacheKey);

  // Dacă nu am găsit nimic în memoria browserului, returnăm null.
  if (!cachedItem) return null;

  // Extragem datele și momentul în care au fost salvate (timestamp).
  const { data, timestamp } = JSON.parse(cachedItem);
  const now = Date.now();

  /**
   * Logica de expirare:
   * Dacă timpul scurs de la salvare până acum este mai mare decât limita (TTL),
   * ștergem datele vechi și returnăm null pentru a forța o nouă căutare la API.
   */
  if (now - timestamp > CACHE_TTL_MS) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  // Dacă datele sunt încă valide, le returnăm.
  return data;
};

/**
 * saveMovieToCache - Salvează datele primite de la API în LocalStorage.
 * @param {string} title - Titlul filmului (folosit pentru cheie).
 * @param {Object} data - Obiectul complet cu datele filmului.
 */
export const saveMovieToCache = (title, data) => {
  const cacheKey = `movie_${title.toLowerCase().trim()}`;
  
  // Creăm un obiect care include atât datele, cât și momentul salvării.
  const cacheData = {
    data: data,
    timestamp: Date.now(),
  };

  // Salvăm obiectul sub formă de text JSON.
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};
