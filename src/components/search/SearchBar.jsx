// Contribuție: Cosmin P. - Motor de căutare principal și UI search

import { useState, useEffect, useRef } from 'react';
import { TOP_MOVIES } from '../../utils/constants';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useMovieAutocomplete } from '../../hooks/useMovieAutocomplete';
import SuggestionsDropdown from './SuggestionsDropdown';
import SearchHistory from './SearchHistory';
import ActionButtons from './ActionButtons';

/**
 * Componenta SearchBar - "Creierul" interacțiunii utilizatorului cu aplicația.
 * Coordonează căutarea, autocompletarea și istoricul.
 */
export default function SearchBar({ onSearch, isDarkMode }) {
  /**
   * Folosim Custom Hooks pentru a menține SearchBar curat.
   * Logică extrasă: 
   * - useSearchHistory: gestiunea listei de căutări recente.
   * - useMovieAutocomplete: comunicarea cu API-ul pentru sugestii pe măsură ce scrii.
   */
  const { recentSearches, addToHistory } = useSearchHistory();
  const { 
    query, 
    handleInputChange, 
    setQueryAndSkipSearch, 
    setQueryAndFetchSilent, 
    suggestions, 
    showDropdown, 
    setShowDropdown 
  } = useMovieAutocomplete();
  
  // O listă locală de filme pentru funcția "Surprinde-mă".
  const [availableMovies, setAvailableMovies] = useState(TOP_MOVIES);
  
  /**
   * useRef - Creează o "referință" către un element din pagină.
   * O folosim aici pentru a detecta dacă utilizatorul dă click în afara barei de căutare.
   */
  const dropdownRef = useRef(null);

  /**
   * useEffect pentru închiderea automată a listei de sugestii.
   * Adăugăm un "event listener" global (pe tot documentul).
   */
  useEffect(() => {
    const close = (e) => { 
      // Dacă dăm click și acel click NU este în interiorul dropdownRef, închidem lista.
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    // Funcția de "cleanup": eliminăm ascultătorul când componenta este distrusă.
    return () => document.removeEventListener("mousedown", close);
  }, [setShowDropdown]);

  /**
   * executeSearch - Centralizează pornirea unei căutări:
   * 1. Trimite cererea la App.jsx (prin onSearch).
   * 2. Salvează termenul în istoricul LocalStorage.
   */
  const executeSearch = (searchTerm) => {
    onSearch(searchTerm);
    addToHistory(searchTerm);
  };

  /**
   * handleSubmit - Se declanșează la apăsarea tastei Enter sau a butonului de tip "submit".
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenim reîncărcarea paginii (comportamentul implicit al browserului).
    if (query.trim() !== '') {
      executeSearch(query);
      setShowDropdown(false);
    }
  };

  /**
   * Gestionăm cazul în care utilizatorul dă click pe o sugestie sau pe un item din istoric.
   */
  const handleSuggestionOrHistoryClick = (title) => {
    setQueryAndSkipSearch(title); // Punem textul în bară dar oprim căutarea automată de sugestii.
    executeSearch(title);
  };

  /**
   * handleSurpriseMe - Alege un film aleatoriu din lista de constante.
   */
  const handleSurpriseMe = () => {
    let pool = availableMovies;
    if (pool.length === 0) pool = TOP_MOVIES; // Resetăm dacă am terminat lista.

    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomMovie = pool[randomIndex];

    // Eliminăm filmul ales din pool pentru a nu-l repeta imediat.
    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMovies(newPool);

    /**
     * setQueryAndFetchSilent: Aduce datele în memorie "în spate",
     * fără a afișa lista de sugestii vizual.
     */
    setQueryAndFetchSilent(randomMovie);
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
            // Deschidem lista de sugestii când utilizatorul dă click în bară.
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

          {/* Afișarea condiționată a meniului de sugestii (autocomplete). */}
          {showDropdown && (
            <SuggestionsDropdown 
              suggestions={suggestions} 
              onSuggestionClick={handleSuggestionOrHistoryClick} 
              isDarkMode={isDarkMode} 
            />
          )}
        </div>
        
        {/* Butoanele de acțiune (compozate ca piesă separată). */}
        <ActionButtons 
          onSurpriseMe={handleSurpriseMe} 
          isDarkMode={isDarkMode} 
        />

        {/* Istoricul Căutărilor (vizibil doar dacă există date salvate). */}
        <SearchHistory 
          recentSearches={recentSearches} 
          onHistoryClick={handleSuggestionOrHistoryClick} 
          isDarkMode={isDarkMode} 
        />

      </form>
    </section>
  );
}