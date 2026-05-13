// Contribuție: Alin P. - Logică de rețea și integrare OMDb API

/**
 * Preluăm cheia API din variabilele de mediu.
 * Folosim import.meta.env (specific Vite) pentru a nu expune cheia direct în cod.
 */
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

/**
 * URL-ul de bază pentru OMDb API.
 */
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Funcție asincronă pentru a prelua datele unui film după titlu.
 * @param {string} title - Titlul filmului căutat.
 * @returns {Promise<Object>} - Datele filmului returnate de API.
 */
export const fetchMovieData = async (title) => {
  try {
    /**
     * Efectuăm cererea HTTP către API.
     * encodeURIComponent(title) - Transformă caracterele speciale (ca spațiile) într-un format valid pentru URL.
     */
    const response = await fetch(
      `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`,
    );

    /**
     * Transformăm răspunsul brut în format JSON (obiect JavaScript).
     */
    const data = await response.json();

    /**
     * OMDb API returnează uneori status 200 chiar dacă nu găsește filmul, 
     * dar include proprietatea Response: "False".
     */
    if (data.Response === "False") {
      throw new Error(data.Error || "Filmul nu a fost găsit.");
    }

    return data;
  } catch (error) {
    /**
     * Capturăm și afișăm erorile (de rețea sau de API) în consolă.
     */
    console.error("Eroare la fetchMovieData:", error.message);
    throw error; // Re-aruncăm eroarea pentru a fi gestionată și în UI (ex: afișare mesaj eroare).
  }
};
