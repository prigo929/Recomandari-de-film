// Contribuție: Alin P. - Logică de rețea și integrare OMDb API

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovieData = async (title) => {
  try {
    const response = await fetch(
      `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`,
    );
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Filmul nu a fost găsit.");
    }

    return data;
  } catch (error) {
    console.error("Eroare la fetchMovieData:", error.message);
    throw error;
  }
};
