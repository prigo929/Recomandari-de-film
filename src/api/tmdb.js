// Contribuție: Alin P. - Logică de rețea hibridă (TMDb pentru date + Whatson pentru Rating RT)

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const WHATS_ON_BASE_URL = "https://whatson-api.onrender.com";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Funcție helper pentru a extrage certificarea (Rating-ul) dintr-o listă complexă de rezultate TMDb.
 */
const getCertification = (releaseResults) => {
  if (!releaseResults) return "N/A";
  const usRelease = releaseResults.find(r => r.iso_3166_1 === 'US');
  if (usRelease) {
    const cert = usRelease.release_dates.find(d => d.certification !== "")?.certification;
    if (cert) return cert;
  }
  for (const r of releaseResults) {
    const cert = r.release_dates.find(d => d.certification !== "")?.certification;
    if (cert) return cert;
  }
  return "N/A";
};

/**
 * Normalizăm datele de la TMDb pentru a fi compatibile cu structura existentă a aplicației.
 * @param {Object} tmdbData - Datele de la TMDb.
 * @param {number|null} rtScore - Scorul Rotten Tomatoes preluat de la What's on? API.
 */
const normalizeMovieData = (tmdbData, rtScore = null) => {
  return {
    Title: tmdbData.title,
    Year: tmdbData.release_date ? tmdbData.release_date.substring(0, 4) : "N/A",
    Rated: getCertification(tmdbData.release_dates?.results),
    Runtime: tmdbData.runtime ? `${tmdbData.runtime} min` : "N/A",
    Genre: tmdbData.genres ? tmdbData.genres.map(g => g.name).join(", ") : "N/A",
    Plot: tmdbData.overview || "Sinopsisul nu este disponibil pentru acest film.",
    Poster: tmdbData.poster_path ? `${IMAGE_BASE_URL}${tmdbData.poster_path}` : "N/A",
    imdbID: tmdbData.imdb_id || tmdbData.id,
    Ratings: [
      { 
        Source: "Rotten Tomatoes", 
        // Dacă Whatson a returnat un scor, îl folosim. Altfel fallback la media TMDb.
        Value: rtScore !== null ? `${rtScore}%` : (tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) + "%" : "N/A")
      },
      {
        Source: "TMDb",
        Value: tmdbData.vote_average ? `${tmdbData.vote_average}/10` : "N/A"
      }
    ],
    Response: "True"
  };
};

/**
 * fetchMovieData - Funcția hibridă principală.
 * Folosește TMDb pentru detalii bogate și What's on? API pentru scorul criticilor.
 */
export const fetchMovieData = async (title) => {
  try {
    // 1. Căutăm filmul pe TMDb
    const searchRes = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=ro-RO&page=1`,
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, accept: 'application/json' } }
    );
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) throw new Error("Filmul nu a fost găsit.");
    const movieId = searchData.results[0].id;

    // 2. Preluăm detaliile complete de la TMDb
    const detailsRes = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=release_dates&language=ro-RO`,
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, accept: 'application/json' } }
    );
    let detailsData = await detailsRes.json();

    // Fallback pentru sinopsis dacă RO lipsește
    if (!detailsData.overview || detailsData.overview.trim() === "") {
      const enRes = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, accept: 'application/json' }
      });
      const enData = await enRes.json();
      detailsData.overview = enData.overview;
    }

    // 3. APEL HIBRID: Preluăm scorul Rotten Tomatoes de la What's on? API
    let rtScore = null;
    try {
      // Încercăm să folosim IMDb ID pentru precizie maximă
      const whatsonQuery = detailsData.imdb_id ? `imdbId=${detailsData.imdb_id}` : `title=${encodeURIComponent(detailsData.title)}`;
      const whatsonRes = await fetch(`${WHATS_ON_BASE_URL}/?${whatsonQuery}&item_type=movie`);
      const whatsonData = await whatsonRes.json();
      
      const results = whatsonData.results || [];
      if (results.length > 0) {
        // Luăm critics_rating dacă există, altfel users_rating
        rtScore = results[0].rotten_tomatoes?.critics_rating || results[0].rotten_tomatoes?.users_rating || null;
      }
    } catch (e) {
      console.warn("Nu s-a putut prelua scorul RT de la What's on API:", e);
    }

    return normalizeMovieData(detailsData, rtScore);
  } catch (error) {
    console.error("Eroare la fetchMovieData (Hybrid):", error.message);
    throw error;
  }
};

export const fetchSuggestions = async (query) => {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=ro-RO&page=1`,
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, accept: 'application/json' } }
    );
    const data = await res.json();
    return (data.results || []).slice(0, 5).map(m => ({
      Title: m.title,
      Year: m.release_date ? m.release_date.substring(0, 4) : "N/A",
      Poster: m.poster_path ? `${IMAGE_BASE_URL}${m.poster_path}` : "N/A",
      imdbID: m.id
    }));
  } catch (error) {
    console.error("Eroare la sugestii TMDb:", error);
    return [];
  }
};
