// Contribuție: Alin P. - Logică de rețea și integrare TMDb API (înlocuire OMDb)

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Funcție helper pentru a extrage certificarea (Rating-ul) dintr-o listă complexă de rezultate TMDb.
 */
const getCertification = (releaseResults) => {
  if (!releaseResults) return "N/A";
  
  // Încercăm să găsim rating-ul din SUA (cel mai comun standard: R, PG-13, etc.)
  const usRelease = releaseResults.find(r => r.iso_3166_1 === 'US');
  if (usRelease) {
    const cert = usRelease.release_dates.find(d => d.certification !== "")?.certification;
    if (cert) return cert;
  }
  
  // Dacă nu găsim SUA, căutăm orice altă certificare disponibilă
  for (const r of releaseResults) {
    const cert = r.release_dates.find(d => d.certification !== "")?.certification;
    if (cert) return cert;
  }
  
  return "N/A";
};

/**
 * Normalizăm datele de la TMDb pentru a fi compatibile cu structura existentă a aplicației (OMDb style).
 */
const normalizeMovieData = (tmdbData) => {
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
        Value: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) + "%" : "N/A" 
      }
    ],
    Response: "True"
  };
};

export const fetchMovieData = async (title) => {
  try {
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

    // Pas 2: Preluăm detaliile complete
    const detailsRes = await fetch(
      `${BASE_URL}/movie/${movieId}?append_to_response=release_dates&language=ro-RO`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      }
    );
    let detailsData = await detailsRes.json();

    // FALLBACK: Dacă nu există sinopsis în Română, îl descărcăm pe cel în Engleză
    if (!detailsData.overview || detailsData.overview.trim() === "") {
      const enRes = await fetch(
        `${BASE_URL}/movie/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: 'application/json'
          }
        }
      );
      const enData = await enRes.json();
      detailsData.overview = enData.overview;
    }

    return normalizeMovieData(detailsData);
  } catch (error) {
    console.error("Eroare la fetchMovieData (TMDb):", error.message);
    throw error;
  }
};

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
