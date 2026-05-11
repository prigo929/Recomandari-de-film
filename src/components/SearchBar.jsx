import { useState, useEffect, useRef } from 'react';

const TOP_MOVIES = [
  "Interstellar", "The Matrix", "Inception", "The Dark Knight", 
  "Parasite", "Whiplash", "The Prestige", "Gladiator", 
  "Project Hail Mary", "Fight Club", "Goodfellas", "Pulp Fiction", 
  "Forrest Gump", "The Shawshank Redemption", "Spirited Away", 
  "Spider-Man: Into the Spider-Verse", "The Silence of the Lambs"
];

export default function SearchBar({ onSearch, isDarkMode }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [availableMovies, setAvailableMovies] = useState(TOP_MOVIES);
  
  // NOU: Starea pentru Istoric (îl citim din localStorage la prima încărcare)
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('cineverdict_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const dropdownRef = useRef(null);
  const ignoreAutoSearch = useRef(false);

  // NOU: Salvăm istoricul în localStorage ori de câte ori se modifică
  useEffect(() => {
    localStorage.setItem('cineverdict_history', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Funcție ajutătoare care adaugă un film în istoric (max 3 elemente, fără duplicate)
  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;
    setRecentSearches(prev => {
      // Eliminăm filmul dacă există deja, ca să îl punem pe prima poziție
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      // Păstrăm doar ultimele 3 căutări
      return [searchTerm, ...filtered].slice(0, 3);
    });
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    ignoreAutoSearch.current = false;
    
    if (val.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 3) return;
    
    if (ignoreAutoSearch.current) {
      ignoreAutoSearch.current = false; 
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      try {
        const key = import.meta.env.VITE_OMDB_API_KEY;
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${key}`);
        const data = await res.json();
        
        if (data.Response === "True") {
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

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const close = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
      addToHistory(query); // Adăugăm în istoric
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (title) => {
    ignoreAutoSearch.current = true; 
    setQuery(title);
    setShowDropdown(false);
    onSearch(title); 
    addToHistory(title); // Adăugăm în istoric
  };

  const handleSurpriseMe = () => {
    let pool = availableMovies;
    if (pool.length === 0) pool = TOP_MOVIES;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomMovie = pool[randomIndex];

    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMovies(newPool);

    ignoreAutoSearch.current = true;
    setQuery(randomMovie);
    setShowDropdown(false);
    onSearch(randomMovie);
    addToHistory(randomMovie); // Adăugăm în istoric
  };

  // Funcție pentru când dăm click pe o "pastilă" din istoric
  const handleHistoryClick = (historyItem) => {
    ignoreAutoSearch.current = true;
    setQuery(historyItem);
    onSearch(historyItem);
    addToHistory(historyItem); // Îl punem din nou pe prima poziție
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
        
        {/* Container Input + Dropdown */}
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

          {/* Dropdown Sugestii */}
          {showDropdown && (
            <ul className={`absolute z-50 w-full mt-3 rounded-3xl shadow-2xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
              isDarkMode ? "bg-slate-800 border-slate-700 divide-slate-700" : "bg-white border-gray-100 divide-gray-100"
            }`}>
              {suggestions.map((m) => (
                <li key={m.imdbID} onMouseDown={() => handleSuggestionClick(m.Title)}
                    className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                      isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-cyan-50 text-slate-900"
                    }`}>
                  <img src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/40"} className="w-10 h-14 object-cover rounded shadow-sm border border-slate-500/30" alt="Poster" />
                  <div className="text-left flex flex-col">
                    <span className="font-bold text-lg leading-tight">{m.Title}</span>
                    <span className="font-medium text-sm opacity-50">{m.Year}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Butoane Principale */}
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

        {/* NOU: Secțiunea de Istoric (Apare doar dacă ai căutat cel puțin un film) */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full animate-in fade-in duration-500">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Căutări recente:
            </span>
            {recentSearches.map((term, index) => (
              <button 
                key={`${term}-${index}`}
                type="button"
                onClick={() => handleHistoryClick(term)}
                className={`
                  px-4 py-1.5 text-sm font-bold rounded-full border transition-all active:scale-95
                  ${isDarkMode 
                    ? "bg-slate-800/50 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400" 
                    : "bg-white border-gray-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-600 shadow-sm"
                  }
                `}
              >
                {term}
              </button>
            ))}
          </div>
        )}

      </form>
    </section>
  );
}