import { useState } from "react";
import { fetchMovieData } from "./api/omdb";
import { getRottenTomatoesScore, getRecommendationMessage } from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import SkeletonCard from "./components/SkeletonCard";

export default function App() {
  const [movieData, setMovieData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCached, setIsCached] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSearch = async (query) => {
    setLoading(true); 
    setError(""); 
    setMovieData(null); 
    setIsCached(false); 
    setScore(null);
    
    try {
      const cached = getMovieFromCache(query);
      if (cached) {
        setIsCached(true);
        processAndSetData(cached);
        setLoading(false);
        return;
      }
      const data = await fetchMovieData(query);
      saveMovieToCache(query, data);
      processAndSetData(data);
    } catch (err) { 
      setError(err.message); 
    }
    setLoading(false);
  };

  const processAndSetData = (data) => {
    setMovieData(data);
    const computedScore = getRottenTomatoesScore(data.Ratings);
    setScore(computedScore);
    setRecommendation(getRecommendationMessage(computedScore));
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 py-12 px-4 ${isDarkMode ? "bg-slate-950 text-white" : "bg-[#fdfbf7] text-slate-900"}`}>
      
      {/* Container Buton Temă */}
      <div className="max-w-5xl mx-auto flex justify-end mb-12">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className={`
            flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold 
            border-2 transition-all duration-300 active:scale-95 outline-none
            ${isDarkMode 
              ? "bg-slate-800 border-slate-600 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.05)] hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(250,204,21,0.15)]" 
              : "bg-white border-gray-300 text-slate-700 shadow-sm hover:border-gray-400 hover:shadow-md"
            }
          `}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-7xl font-black mb-4 tracking-tighter uppercase italic drop-shadow-sm flex items-center justify-center gap-1">
          Cine<span className="text-cyan-500 not-italic">Verdict</span>
          {/* Logo Fulger Cyan */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
               className="w-14 h-14 md:w-16 md:h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse">
            <path d="M13 10h7l-9 13v-9h-7l9-13z"/>
          </svg>
        </h1>
        <p className="text-xl opacity-60 font-medium">Verdictul criticilor, direct pe ecranul tău.</p>
      </div>

      <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />

      <section className="mt-16 max-w-4xl mx-auto min-h-[400px]">
        {loading ? <SkeletonCard isDarkMode={isDarkMode} /> : 
         error ? <div className="p-8 bg-red-500/10 border-2 border-red-500 text-red-500 rounded-3xl text-center font-bold text-xl">{error}</div> :
         movieData && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             {isCached && (
               <div className="text-right mb-4">
                 <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-500 rounded-full font-black text-xs uppercase tracking-widest border border-cyan-500/30 shadow-sm">
                   ⚡ Din Cache
                 </span>
               </div>
             )}
             <MovieCard movie={movieData} recommendation={recommendation} score={score} isDarkMode={isDarkMode} />
           </div>
         )}
      </section>
    </main>
  );
}