// Contribuție: Alin P. - Integrare What's on? API (GitHub: pierrevano/whatson-api)

const BASE_URL = "https://whatson-api.onrender.com";

/**
 * Normalizăm datele de la What's on? API pentru a fi compatibile cu structura existentă a aplicației.
 */
const normalizeMovieData = (item) => {
  if (!item) return null;

  // Extragem scorul Rotten Tomatoes (preferăm Critics, apoi Users)
  // În noua structură API, acestea sunt direct pe obiect
  const rtScore = item.rotten_tomatoes?.critics_rating || item.rotten_tomatoes?.users_rating;
  
  return {
    Title: item.title,
    Year: item.release_date ? item.release_date.substring(0, 4) : (item.year || "N/A"),
    Rated: item.certification || "N/A",
    Runtime: item.runtime ? `${item.runtime} min` : "N/A",
    Genre: item.genres ? item.genres.join(", ") : "N/A",
    Plot: item.overview || "Sinopsisul nu este disponibil.",
    // Imaginea este în câmpul 'image'
    Poster: item.image || "N/A",
    imdbID: item.imdbId || item.tmdbId || item.id,
    Ratings: [
      { 
        Source: "Rotten Tomatoes", 
        Value: rtScore ? `${rtScore}%` : "N/A" 
      },
      {
        Source: "IMDb",
        Value: item.imdb_rating ? `${item.imdb_rating}/10` : "N/A"
      }
    ],
    Response: "True"
  };
};

export const fetchMovieData = async (title) => {
  try {
    // Căutăm filmul folosind parametrul title
    const res = await fetch(`${BASE_URL}/?title=${encodeURIComponent(title)}&item_type=movie`);
    const data = await res.json();

    // API-ul returnează rezultatele într-un obiect cu cheia 'results'
    const results = data.results || [];
    
    if (results.length === 0) {
      throw new Error("Filmul nu a fost găsit.");
    }

    // Luăm primul rezultat
    let movie = results[0];

    // Dacă datele sunt incomplete (ex: lipsește sinopsisul), facem un apel la detaliu
    if (!movie.overview || !movie.runtime) {
        // Observație: ID-ul din 'results' este de obicei cel de TMDb
        const detailRes = await fetch(`${BASE_URL}/movie/${movie.id}`);
        const detailData = await detailRes.json();
        movie = { ...movie, ...detailData };
    }

    return normalizeMovieData(movie);
  } catch (error) {
    console.error("Eroare la fetchMovieData (Whatson):", error.message);
    throw error;
  }
};

/**
 * Funcție pentru sugestii de autocompletare
 */
export const fetchSuggestions = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/?title=${encodeURIComponent(query)}&item_type=movie`);
    const data = await res.json();
    
    const results = data.results || [];
    
    return results.slice(0, 5).map(m => ({
      Title: m.title,
      Year: m.release_date ? m.release_date.substring(0, 4) : (m.year || "N/A"),
      Poster: m.image || "N/A",
      imdbID: m.id
    }));
  } catch (error) {
    console.error("Eroare la sugestii Whatson:", error);
    return [];
  }
};
