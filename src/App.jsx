// Contribuție: Alin P. - Setup arhitectură React și gestionare stare globală

import { useState, useEffect } from "react";
import { fetchMovieData } from "./api/omdb";
import { getRottenTomatoesScore, getRecommendationMessage } from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";
import SearchBar from "./components/search/SearchBar";
import MovieCard from "./components/movie/MovieCard";
import SkeletonCard from "./components/movie/SkeletonCard";

export default function App() {
  const [movieData, setMovieData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCached, setIsCached] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('cineverdict_theme');
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem('cineverdict_theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSearch = async (title) => {
    setLoading(true);
    setError("");
    setMovieData(null);
    setRecommendation(null);
    setScore(null);
    setIsCached(false);

    try {
      const cached = getMovieFromCache(title);
      if (cached) {
        setMovieData(cached);
        const rtScore = getRottenTomatoesScore(cached);
        setScore(rtScore);
        setRecommendation(getRecommendationMessage(rtScore));
        setIsCached(true);
        setLoading(false);
        return;
      }

      const data = await fetchMovieData(title);
      
      if (data.Response === "True") {
        setMovieData(data);
        saveMovieToCache(title, data);
        
        const rtScore = getRottenTomatoesScore(data);
        setScore(rtScore);
        setRecommendation(getRecommendationMessage(rtScore));
      } else {
        setError(data.Error || "Filmul nu a fost găsit.");
      }
    } catch (err) {
      setError("A apărut o eroare la conectarea cu serverul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-white ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* BUTON SCHIMBARE TEMĂ */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-95 transition-all shadow-xl group"
        title={isDarkMode ? "Lumina" : "Întuneric"}
      >
        <span className="text-2xl group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          {isDarkMode ? "☀️" : "🌙"}
        </span>
      </button>

      <main className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center min-h-screen">
        
        {/* HEADER */}
        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.2em]">
            Proiect Web - 13
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Verdict</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-60 max-w-xl mx-auto leading-relaxed">
            Află instant dacă merită să vezi un film folosind scorurile oficiale Rotten Tomatoes.
          </p>
        </header>

        {/* SEARCH BAR */}
        <div className="w-full mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
        </div>

        {/* REZULTAT (Card sau Skeleton) */}
        <section className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-700">
          {loading && <SkeletonCard isDarkMode={isDarkMode} />}
          
          {error && (
            <div className="p-8 rounded-[2.5rem] bg-rose-500/10 border-2 border-rose-500/20 text-rose-400 text-center font-bold text-xl shadow-2xl animate-in shake duration-500">
              <span className="text-3xl block mb-2">⚠️</span> {error}
            </div>
          )}

          {movieData && !loading && (
            <div className="relative">
              {isCached && (
                <div className="absolute -top-4 -right-4 z-10 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-bounce">
                  Din Cache
                </div>
              )}
              <MovieCard 
                movie={movieData} 
                recommendation={recommendation} 
                score={score} 
                isDarkMode={isDarkMode} 
              />
            </div>
          )}
        </section>

      </main>
    </div>
  );
}