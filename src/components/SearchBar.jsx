import { useState, useEffect, useRef } from 'react';
import { TOP_MOVIES } from '../utils/constants';
import { useSearchHistory } from '../hooks/useSearchHistory';
import SuggestionsDropdown from './SuggestionsDropdown';
import SearchHistory from './SearchHistory';

/**
 * Componenta SearchBar - Motorul de căutare al aplicației.
 * @param {Function} onSearch - Funcție apelată când se confirmă o căutare.
 * @param {boolean} isDarkMode - Dacă tema întunecată este activă.
 */
export default function SearchBar({ onSearch, isDarkMode }) {
  /**
   * Stările componentei (State):
   * query: Textul pe care îl scrie utilizatorul în input.
   * suggestions: Lista de filme sugerate de API în timp ce scriem.
   * showDropdown: Vizibilitatea listei de sugestii.
   * availableMovies: Listă locală pentru funcția "Surprinde-mă".
   */
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [availableMovies, setAvailableMovies] = useState(TOP_MOVIES);
  
  // Custom Hook pentru a gestiona istoricul căutărilor salvat în LocalStorage.
  const { recentSearches, addToHistory } = useSearchHistory();
  
  // useRef ne ajută să păstrăm referințe către elemente DOM sau valori persistente care nu declanșează re-randări.
  const dropdownRef = useRef(null);
  const ignoreAutoSearch = useRef(false);

  /**
   * Se execută la fiecare literă tastată.
   */
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    ignoreAutoSearch.current = false;
    
    // Dacă avem mai puțin de 3 litere, ascundem sugestiile.
    if (val.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  /**
   * useEffect pentru Auto-Sugestii.
   * Se declanșează de fiecare dată când se schimbă 'query'.
   */
  useEffect(() => {
    // Nu căutăm dacă avem sub 3 caractere.
    if (query.trim().length < 3) return;
    
    // Evităm căutarea automată dacă tocmai am dat click pe o sugestie sau istoric.
    if (ignoreAutoSearch.current) {
      ignoreAutoSearch.current = false; 
      return;
    }
    
    /**
     * DEBOUNCING: Așteptăm 400ms după ce utilizatorul s-a oprit din tastat
     * pentru a nu bombarda API-ul cu cereri inutile la fiecare literă.
     */
    const timeoutId = setTimeout(async () => {
      try {
        const key = import.meta.env.VITE_OMDB_API_KEY;
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${key}`);
        const data = await res.json();
        
        if (data.Response === "True") {
          // Păstrăm doar primele 5 rezultate pentru a nu aglomera ecranul.
          setSuggestions(data.Search.slice(0, 5));
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch (err) { 
        console.error("Eroare API Sugestii:", err); 
      }
    }, 400);

    // Funcția de curățare (cleanup): anulează timeout-ul dacă 'query' se schimbă înainte să treacă cele 400ms.
    return () => clearTimeout(timeoutId);
  }, [query]);

  /**
   * Închide dropdown-ul dacă se dă click în afara lui.
   */
  useEffect(() => {
    const close = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /**
   * Gestionarea trimiterii formularului (Enter sau buton Caută).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
      addToHistory(query);
      setShowDropdown(false);
    }
  };

  /**
   * Când se alege un film din lista de sugestii.
   */
  const handleSuggestionClick = (title) => {
    ignoreAutoSearch.current = true; // Spunem aplicației să nu mai caute sugestii pentru acest titlu.
    setQuery(title);
    setShowDropdown(false);
    onSearch(title); 
    addToHistory(title);
  };

  /**
   * Funcția "Surprinde-mă" - Alege un film la întâmplare dintr-o listă predefinită.
   */
  const handleSurpriseMe = () => {
    let pool = availableMovies;
    if (pool.length === 0) pool = TOP_MOVIES;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomMovie = pool[randomIndex];

    // Eliminăm filmul ales pentru a nu-l repeta imediat.
    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMovies(newPool);

    ignoreAutoSearch.current = true;
    setQuery(randomMovie);
    setShowDropdown(false);
    onSearch(randomMovie);
    addToHistory(randomMovie);
  };

  /**
   * Când se dă click pe un element din istoricul căutărilor.
   */
  const handleHistoryClick = (historyItem) => {
    ignoreAutoSearch.current = true;
    setQuery(historyItem);
    onSearch(historyItem);
    addToHistory(historyItem);
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
        
        <div className="relative w-full">
          <input
            id="movie-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
            placeholder="Ex: The Matrix, Interstellar..."
            className={`
              w-full py-5 px-8 text-xl font-medium text-center rounded-full border-2 
              outline-none transition-all duration-300 shadow-xl
              
              ${isDarkMode 
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" 
                : "bg-white border-gray-200 text-slate-900 placeholder-slate-400"
              }
              
              hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]
              focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(6,182,212,0.7)]
            `}
            required
            autoComplete="off"
          />

          {/* Componenta care afișează lista de sugestii sub input */}
          {showDropdown && (
            <SuggestionsDropdown 
              suggestions={suggestions} 
              onSuggestionClick={handleSuggestionClick} 
              isDarkMode={isDarkMode} 
            />
          )}
        </div>
        
        {/* Butoanele de Acțiune */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            type="submit" 
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase tracking-tight rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95 border border-blue-400/50 w-full sm:w-auto"
          >
            Caută Filmul
          </button>
          
          <button 
            type="button"
            onClick={handleSurpriseMe}
            className={`
              flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase tracking-tight rounded-full transition-all duration-300 active:scale-95 border-2 w-full sm:w-auto
              ${isDarkMode 
                ? "bg-slate-800 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]" 
                : "bg-white border-cyan-400 text-cyan-600 shadow-sm hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              }
            `}
          >
            <span className="text-xl">🎲</span> Surprinde-mă
          </button>
        </div>

        {/* Secțiunea de Istoric afișată sub butoane */}
        <SearchHistory 
          recentSearches={recentSearches} 
          onHistoryClick={handleHistoryClick} 
          isDarkMode={isDarkMode} 
        />

      </form>
    </section>
  );
}