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
    // Fundal întunecat forțat: min-h-screen, bg-slate-950, w-full
    <main className="min-h-screen w-full bg-slate-950 text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500 selection:text-white">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
          Cine
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Verdict
          </span>
        </h1>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
          Descoperă instantaneu dacă un film merită vizionat, bazat pe scorurile
          criticilor și ale publicului.
        </p>
      </div>

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

      {error && (
        <div
          className="max-w-2xl mx-auto bg-rose-900/40 border border-rose-500/50 text-rose-300 p-5 rounded-xl shadow-lg mt-8 text-center backdrop-blur-sm"
          role="alert"
        >
          <p className="font-bold text-lg mb-1">Eroare de sistem</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && movieData && (
        <div className="mt-12 transition-all duration-700 ease-out opacity-100 translate-y-0 max-w-4xl mx-auto">
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
    </main>
  );
}

export default App;
