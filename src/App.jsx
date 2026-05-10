// Contribuție:
// Alin P. (Membrul 1) - Arhitectură state management, integrare cache și logică decizională API
// Membrul 2 - UI/UX (Dark Theme), integrare componente Tailwind CSS și validare W3C

import { useState } from "react";
import { fetchMovieData } from "./api/omdb";
import { getRottenTomatoesScore, getRecommendationMessage } from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";

import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movieData, setMovieData] = useState(null);
  const [recommendation, setRecommendation] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCachedVersion, setIsCachedVersion] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setMovieData(null);
    setRecommendation(null);
    setIsCachedVersion(false);

    try {
      const cachedData = getMovieFromCache(query);
      if (cachedData) {
        setIsCachedVersion(true);
        processAndSetData(cachedData);
        setLoading(false);
        return;
      }

      const data = await fetchMovieData(query);
      saveMovieToCache(query, data);
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
          Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Verdict</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
          Descoperă instantaneu dacă un film merită vizionat, bazat pe scorurile criticilor și ale publicului.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="text-center mt-12">
          <div className="inline-block w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-cyan-400 font-bold text-xl animate-pulse">
            Se analizează arhivele...
          </p>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto bg-rose-900/40 border border-rose-500/50 text-rose-300 p-5 rounded-xl shadow-lg mt-8 text-center backdrop-blur-sm" role="alert">
          <p className="font-bold text-lg mb-1">Eroare de sistem</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && movieData && (
        <div className="mt-12 transition-all duration-700 ease-out opacity-100 translate-y-0 max-w-4xl mx-auto">
          {isCachedVersion && (
            <div className="mb-6 flex justify-end animate-fade-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-slate-800 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/30">
                <span className="mr-2 text-base">⚡</span> Instant din Cache
              </span>
            </div>
          )}
          
          <MovieCard movie={movieData} recommendation={recommendation} />
        </div>
      )}
    </main>
  );
}