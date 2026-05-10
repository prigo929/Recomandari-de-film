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
  
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // Fundal personalizat: #fdfbf7 este un alb cald, perfect pentru ochi
  const themeClasses = isDarkMode 
    ? "bg-[#0f172a] text-white" 
    : "bg-[#fdfbf7] text-[#292524]";

  return (
    <main className={`min-h-screen transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 font-sans w-full ${themeClasses}`}>
      
      <div className="max-w-5xl mx-auto flex justify-end mb-8">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`px-6 py-2.5 rounded-full font-bold shadow-lg transition-all border-2 ${
            isDarkMode 
              ? "bg-slate-800 text-yellow-400 border-slate-600 hover:border-yellow-400" 
              // Butonul de schimbat tema adaptat și el la culori mai calde
              : "bg-white text-[#57534e] border-[#e7e5e4] hover:border-[#a8a29e]"
          }`}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tight drop-shadow-xl">
          <span className={isDarkMode ? "text-white" : "text-shadow-blue-950"}>Cine</span>
          <span className="text-cyan-400">Verdict</span>
        </h1>
        <p className={`text-xl font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-[#57534e]'}`}>
          Descoperă instantaneu dacă un film merită vizionat, bazat pe scorurile criticilor.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />

      {loading && (
        <div className="text-center mt-12">
          <div className="inline-block w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-cyan-500 font-bold text-xl animate-pulse">Se analizează arhivele...</p>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto bg-red-900/80 border border-red-500 text-white p-6 rounded-3xl shadow-xl mt-8 text-center" role="alert">
          <p className="font-bold text-xl mb-2">Eroare de sistem</p>
          <p className="text-lg">{error}</p>
        </div>
      )}

      {!loading && movieData && (
        <div className="mt-16 max-w-4xl mx-auto">
          {isCachedVersion && (
            <div className="mb-6 flex justify-end">
              <span className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-black tracking-wider uppercase shadow-lg border-2 ${
                isDarkMode ? "bg-slate-800 text-cyan-400 border-cyan-500/50" : "bg-cyan-50 text-cyan-800 border-cyan-300"
              }`}>
                <span className="mr-2 text-lg">⚡</span> Instant din Cache
              </span>
            </div>
          )}
          
          <MovieCard movie={movieData} recommendation={recommendation} isDarkMode={isDarkMode} />
        </div>
      )}
    </main>
  );
}