import { useState } from "react";
import { fetchMovieData } from "./api/omdb";
import { getRottenTomatoesScore, getRecommendationMessage } from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import SkeletonCard from "./components/SkeletonCard";

/**
 * App.jsx - Componenta rădăcină (Root) a aplicației.
 * Aici gestionăm starea globală (datele filmului, eroarea, tema) și logica principală.
 */
export default function App() {
  /**
   * Folosim useState pentru a stoca date care se pot schimba și care trebuie să 
   * declanșeze o actualizare a interfeței (Re-render).
   */
  const [movieData, setMovieData] = useState(null); // Datele brute ale filmului de la API.
  const [recommendation, setRecommendation] = useState(null); // Mesajul de verdict (Good/Bad).
  const [score, setScore] = useState(null); // Scorul numeric extras.
  const [loading, setLoading] = useState(false); // Indicator pentru starea de încărcare.
  const [error, setError] = useState(""); // Mesajul de eroare în caz de eșec.
  const [isCached, setIsCached] = useState(false); // Dacă datele vin din memoria locală.
  const [isDarkMode, setIsDarkMode] = useState(true); // Controlul temei vizuale.

  /**
   * handleSearch - Funcția principală apelată la căutarea unui film.
   * Este o funcție asincronă deoarece așteptăm răspunsuri de la rețea.
   */
  const handleSearch = async (query) => {
    setLoading(true); // Începe încărcarea.
    setError(""); // Resetăm erorile vechi.
    setMovieData(null); // Resetăm filmul vechi.
    setIsCached(false); 
    setScore(null);
    
    try {
      // 1. Verificăm mai întâi dacă avem filmul în cache (LocalStorage).
      const cached = getMovieFromCache(query);
      if (cached) {
        setIsCached(true);
        processAndSetData(cached);
        setLoading(false);
        return; // Dacă am găsit în cache, ne oprim aici (nu mai apelăm API-ul).
      }

      // 2. Dacă nu e în cache, apelăm API-ul extern OMDb.
      const data = await fetchMovieData(query);
      
      // 3. Salvăm datele noi în cache pentru viitor.
      saveMovieToCache(query, data);
      
      // 4. Procesăm datele pentru a fi afișate.
      processAndSetData(data);
    } catch (err) { 
      // Capturăm orice eroare (ex: lipsă internet, film negăsit).
      setError(err.message); 
    }
    setLoading(false); // Finalizăm încărcarea.
  };

  /**
   * processAndSetData - Organizează datele pentru a fi consumate de componentele UI.
   */
  const processAndSetData = (data) => {
    setMovieData(data);
    const computedScore = getRottenTomatoesScore(data.Ratings);
    setScore(computedScore);
    setRecommendation(getRecommendationMessage(computedScore));
  };

  return (
    /**
     * Aplicația este învelită într-un element <main> care își schimbă stilul 
     * în funcție de variabila isDarkMode.
     */
    <main 
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 py-12 px-4 ${
        isDarkMode 
          ? "bg-slate-950 text-white" 
          : "bg-[#f4ece1] text-[#1c1917]" 
      }`}>
      
      {/* Secțiunea de Switch pentru Temă (Light/Dark) */}
      <div className="max-w-5xl mx-auto flex justify-end mb-12">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className={`
            flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold 
            border-2 transition-all duration-300 active:scale-95 outline-none
            ${isDarkMode 
              ? "bg-slate-800 border-slate-600 text-yellow-400" 
              : "bg-white border-gray-300 text-slate-700"
            }
          `}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Titlul Aplicației */}
      <div className="text-center mb-16">
        <h1 
          onClick={() => window.location.reload()}
          className="text-7xl font-black mb-4 tracking-tighter uppercase italic cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
          Cine<span className="text-cyan-500 not-italic">Verdict</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
               className="w-14 h-14 md:w-16 md:h-16 text-cyan-400 inline-block ml-2 animate-pulse">
            <path d="M13 10h7l-9 13v-9h-7l9-13z"/>
          </svg>
        </h1>
        <p className="text-xl opacity-60 font-medium">Verdictul criticilor, direct pe ecranul tău.</p>
      </div>

      {/* Bara de Căutare */}
      <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />

      {/* Secțiunea de Afișare Rezultate (Randare Condițională) */}
      <section className="mt-16 max-w-4xl mx-auto min-h-[400px]">
        {/* 1. Dacă se încarcă, arătăm un "Skeleton" (placeholder animat) */}
        {loading ? <SkeletonCard isDarkMode={isDarkMode} /> : 
         
         /* 2. Dacă avem o eroare, afișăm mesajul de eroare */
         error ? <div className="p-8 bg-red-500/10 border-2 border-red-500 text-red-500 rounded-3xl text-center font-bold text-xl">{error}</div> :
         
         /* 3. Dacă avem date despre film, afișăm Cardul Filmului */
         movieData && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             {/* Notificare dacă datele sunt preluat rapid din cache */}
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