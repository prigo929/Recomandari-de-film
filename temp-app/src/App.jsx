// Contribuție: Alin P. - Arhitectură state management, integrare cache și logică decizională

import { useState } from "react";
import { fetchMovieData } from "./api/omdb";
import {
  getRottenTomatoesScore,
  getRecommendationMessage,
} from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCachedVersion, setIsCachedVersion] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    setMovieData(null);
    setRecommendation("");

    try {
      // 1. Verificăm dacă avem datele în LocalStorage (Provocarea Cache)
      const cachedData = getMovieFromCache(searchTerm);
      if (cachedData) {
        console.log("Date încărcate din CACHE");
        setIsCachedVersion(true);
        processAndSetData(cachedData);
        setLoading(false);
        return;
      }

      // 2. Dacă nu e în cache, facem fetch la OMDb API
      console.log("Date încărcate de la API");
      setIsCachedVersion(false);
      const data = await fetchMovieData(searchTerm);

      // 3. Salvăm în cache pentru căutările viitoare
      saveMovieToCache(searchTerm, data);

      // 4. Procesăm datele pentru UI
      processAndSetData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const processAndSetData = (data) => {
    setMovieData(data);
    const score = getRottenTomatoesScore(data.Ratings);
    setRecommendation(getRecommendationMessage(score));
  };

  return (
    <div>
      <h1>Recomandări de Film</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Introdu numele unui film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Se caută..." : "Caută"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movieData && (
        <div>
          {/* Indicator pentru prof că funcționează sistemul de caching */}
          {isCachedVersion && (
            <small style={{ color: "green" }}>
              ⚡ Încărcat instant din Cache
            </small>
          )}

          <h2>Titlu: {movieData.Title}</h2>
          <img
            src={movieData.Poster}
            alt={`Poster pentru ${movieData.Title}`}
          />
          <p>An: {movieData.Year}</p>
          <p>Evaluare: {movieData.Rated}</p>
          <p>Durata: {movieData.Runtime}</p>
          <p>Descriere: {movieData.Plot}</p>

          <div
            style={{
              padding: "10px",
              marginTop: "20px",
              border: "2px solid black",
            }}
          >
            <h3>Decizie Sistem:</h3>
            <p>
              <strong>{recommendation}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
