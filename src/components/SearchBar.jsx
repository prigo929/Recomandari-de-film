import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch, isDarkMode }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef(null);
  // REFERINȚĂ NOUĂ: Ne ajută să blocăm deschiderea listei după o selecție
  const ignoreAutoSearch = useRef(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    // Dacă utilizatorul tastează manual, permitem deschiderea listei
    ignoreAutoSearch.current = false;
    
    if (val.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 3) return;
    
    // Dacă schimbarea a venit din selecția unui film (click pe listă), oprim execuția aici
    if (ignoreAutoSearch.current) {
      ignoreAutoSearch.current = false; // Resetăm pentru următoarea tastare
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
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (title) => {
    // Activăm "blocajul" înainte să schimbăm textul
    ignoreAutoSearch.current = true; 
    setQuery(title);
    setShowDropdown(false);
    onSearch(title); 
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        
        <div className="relative w-full">
          <input
            id="movie-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            // Dacă dăm click din nou pe bară, lista se redeschide
            onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
            placeholder="Ex: The Matrix, Interstellar..."
            className={`
              w-full py-5 px-8 text-xl font-medium text-center rounded-full border-2 
              outline-none transition-all duration-300 shadow-xl
              
              /* Culorile de bază */
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
        
        <button 
          type="submit" 
          className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase tracking-tight rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95 border border-blue-400/50"
        >
          Caută Filmul
        </button>
      </form>
    </section>
  );
}