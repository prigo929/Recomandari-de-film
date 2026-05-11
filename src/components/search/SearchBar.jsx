import { useState, useEffect, useRef } from 'react';
import { TOP_MOVIES } from '../../utils/constants';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useMovieAutocomplete } from '../../hooks/useMovieAutocomplete';
import SuggestionsDropdown from './SuggestionsDropdown';
import SearchHistory from './SearchHistory';
import ActionButtons from './ActionButtons';

export default function SearchBar({ onSearch, isDarkMode }) {
  // Importăm curat toată logica din cele două Hook-uri personalizate
  const { recentSearches, addToHistory } = useSearchHistory();
  const { query, handleInputChange, setQueryAndSkipSearch, suggestions, showDropdown, setShowDropdown } = useMovieAutocomplete();
  
  const [availableMovies, setAvailableMovies] = useState(TOP_MOVIES);
  const dropdownRef = useRef(null);

  // Închidem lista de sugestii dacă dăm click în afara ei
  useEffect(() => {
    const close = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [setShowDropdown]);

  // Funcția principală care execută căutarea
  const executeSearch = (searchTerm) => {
    onSearch(searchTerm);
    addToHistory(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      executeSearch(query);
      setShowDropdown(false);
    }
  };

  const handleSuggestionOrHistoryClick = (title) => {
    setQueryAndSkipSearch(title);
    executeSearch(title);
  };

  const handleSurpriseMe = () => {
    let pool = availableMovies;
    if (pool.length === 0) pool = TOP_MOVIES;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomMovie = pool[randomIndex];

    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMovies(newPool);

    setQueryAndSkipSearch(randomMovie);
    executeSearch(randomMovie);
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
        
        {/* Zona BAREI DE CĂUTARE */}
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

          {showDropdown && (
            <SuggestionsDropdown 
              suggestions={suggestions} 
              onSuggestionClick={handleSuggestionOrHistoryClick} 
              isDarkMode={isDarkMode} 
            />
          )}
        </div>
        
        {/* Butoanele: "Caută" și "Surprinde-mă" */}
        <ActionButtons 
          onSurpriseMe={handleSurpriseMe} 
          isDarkMode={isDarkMode} 
        />

        {/* Istoricul Căutărilor */}
        <SearchHistory 
          recentSearches={recentSearches} 
          onHistoryClick={handleSuggestionOrHistoryClick} 
          isDarkMode={isDarkMode} 
        />

      </form>
    </section>
  );
}