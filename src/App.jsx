// Contribuție: Alin P. - Setup arhitectură React și gestionare stare globală

import { useState, useEffect } from "react";
import { fetchMovieData } from "./api/omdb";
import { getRottenTomatoesScore, getRecommendationMessage } from "./utils/scoreEvaluator";
import { getMovieFromCache, saveMovieToCache } from "./utils/cacheManager";
import SearchBar from "./components/search/SearchBar";
import MovieCard from "./components/movie/MovieCard";
import SkeletonCard from "./components/movie/SkeletonCard";

/**
 * Componenta App - Rădăcina aplicației.
 * Aici gestionăm starea globală (datele filmului, încărcarea, erorile și tema).
 */
export default function App() {
  /**
   * Stările aplicației (useState):
   * movieData - obiectul cu detaliile filmului de la API.
   * recommendation - verdictul calculat (good/bad/neutral).
   * score - procentajul Rotten Tomatoes.
   * loading - indicator de progres (true în timpul apelului API).
   * error - mesaj de eroare dacă filmul nu e găsit.
   * isCached - indică dacă datele vin din memoria locală (performanță).
   */
  const [movieData, setMovieData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCached, setIsCached] = useState(false);
  
  // Tema Dark/Light salvată în browser pentru a persista după refresh.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('cineverdict_theme');
    // Default: Dark Mode (true) dacă nu există nimic salvat.
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  /**
   * useEffect - Se execută ori de câte ori isDarkMode se schimbă.
   * Salvăm alegerea utilizatorului în LocalStorage.
   */
  useEffect(() => {
    localStorage.setItem('cineverdict_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  /**
   * handleSearch - Funcție asincronă care coordonează fluxul de date:
   * 1. Caută în Cache (LocalStorage).
   * 2. Dacă nu există, face cerere la API (OMDb).
   * 3. Procesează datele și actualizează interfața.
   */
  const handleSearch = async (query) => {
    setLoading(true); 
    setError(""); 
    setMovieData(null); 
    setIsCached(false); 
    setScore(null);
    
    try {
      // Pasul 1: Verificare Cache
      const cached = getMovieFromCache(query);
      if (cached) {
        setIsCached(true);
        processAndSetData(cached);
        setLoading(false);
        return;
      }

      // Pasul 2: Apel API real
      const data = await fetchMovieData(query);
      
      // Pasul 3: Salvare în Cache pentru data viitoare
      saveMovieToCache(query, data);
      processAndSetData(data);
    } catch (err) { 
      // Gestionarea erorilor de rețea sau API.
      setError(err.message); 
    }
    setLoading(false);
  };

  /**
   * processAndSetData - Centralizează logica de procesare a datelor.
   * Extrage scorul și generează mesajul de recomandare.
   */
  const processAndSetData = (data) => {
    setMovieData(data);
    const computedScore = getRottenTomatoesScore(data.Ratings);
    setScore(computedScore);
    setRecommendation(getRecommendationMessage(computedScore));
  };

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 py-12 px-4 ${isDarkMode ? "bg-slate-950 text-white" : "bg-[#f4ece1] text-[#1c1917]"}`}>
      
      {/* Zona pentru schimbarea temei */}
      <div className="max-w-5xl mx-auto flex justify-end mb-12">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className={`
            flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold 
            border-2 transition-all duration-300 active:scale-95 outline-none select-none
            ${isDarkMode 
              ? "bg-slate-800 border-slate-600 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.05)] hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(250,204,21,0.15)]" 
              : "bg-white border-gray-300 text-slate-700 shadow-sm hover:border-gray-400 hover:shadow-md"
            }
          `}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Titlul aplicației și Logo-ul animat */}
      <div className="text-center mb-16">
        <h1 
          onClick={() => window.location.reload()}
          className="text-7xl font-black mb-4 tracking-tighter uppercase italic drop-shadow-sm flex items-center justify-center gap-1 cursor-pointer hover:scale-[1.02] transition-transform duration-300 active:scale-95 select-none"
        >
          Cine<span className="text-cyan-500 not-italic">Verdict</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
               className="w-14 h-14 md:w-16 md:h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse">
            <path d="M13 10h7l-9 13v-9h-7l9-13z"/>
          </svg>
        </h1>
        <p className="text-xl opacity-60 font-medium select-none">Verdictul criticilor, direct pe ecranul tău.</p>
      </div>

      {/* Componenta de Căutare */}
      <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />

      {/* Secțiunea de Afișare Rezultate */}
      <section className="mt-16 max-w-4xl mx-auto min-h-[400px]">
        {/**
         * Redare Condițională:
         * 1. loading - arătăm scheletul de încărcare.
         * 2. error - arătăm eroarea.
         * 3. movieData - arătăm cardul cu filmul.
         */}
        {loading ? <SkeletonCard isDarkMode={isDarkMode} /> : 
         error ? <div className="p-8 bg-red-500/10 border-2 border-red-500 text-red-500 rounded-3xl text-center font-bold text-xl">{error}</div> :
         movieData && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             {/* Notificare vizuală dacă filmul a fost servit din cache */}
             {isCached && (
               <div className="text-right mb-4">
                 <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500/10 text-cyan-500 rounded-full font-black text-xs uppercase tracking-widest border border-cyan-500/30 shadow-sm select-none">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                     <path d="M13 10h7l-9 13v-9h-7l9-13z"/>
                   </svg>
                   Din Cache
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