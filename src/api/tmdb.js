// Contribuție: Alin P. - Logică de rețea și integrare TMDb API (înlocuire OMDb)

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Normalizăm datele de la TMDb pentru a fi compatibile cu structura existentă a aplicației (OMDb style).
 */
const normalizeMovieData = (tmdbData) => {
  return {
    Title: tmdbData.title,
    Year: tmdbData.release_date ? tmdbData.release_date.substring(0, 4) : "N/A",
    Rated: tmdbData.release_dates?.results?.find(r => r.iso_3166_1 === 'US')?.release_dates?.[0]?.certification || "N/A",
    Runtime: tmdbData.runtime ? `${tmdbData.runtime} min` : "N/A",
    Genre: tmdbData.genres ? tmdbData.genres.map(g => g.name).join(", ") : "N/A",
    Plot: tmdbData.overview,
    Poster: tmdbData.poster_path ? `${IMAGE_BASE_URL}${tmdbData.poster_path}` : "N/A",
    imdbID: tmdbData.imdb_id || tmdbData.id,
    // Simulăm structura de Ratings pentru a păstra compatibilitatea cu scoreEvaluator.js
    Ratings: [
      { 
        Source: "Rotten Tomatoes", 
        Value: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) + "%" : "N/A" 
      }
    ],
    Response: "True"
  };
};

export const fetchMovieData = async (title) => {
  try {
    // Pas 1: Căutăm filmul pentru a obține ID-ul
    const searchRes = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=ro-RO&page=1`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      }
    );
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      throw new Error("Filmul nu a fost găsit.");
    }

    const movieId = searchData.results[0].id;

    // Pas 2: Preluăm detaliile complete (runtime, genres, certifications)
    const detailsRes = await fetch(
      `${BASE_URL}/movie/${movieId}?append_to_response=release_dates&language=ro-RO`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      }
    );
    const detailsData = await detailsRes.json();

    return normalizeMovieData(detailsData);
  } catch (error) {
    console.error("Eroare la fetchMovieData (TMDb):", error.message);
    throw error;
  }
};

/**
 * Funcție pentru sugestii de autocompletare
 */
export const fetchSuggestions = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=ro-RO&page=1`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      }
    );
    const data = await res.json();
    
    // Normalizăm sugestiile pentru a fi compatibile cu UI-ul existent
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
