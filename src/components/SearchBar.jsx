import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch, isDarkMode }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 3) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
          setSuggestions(data.Search.slice(0, 5));
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Eroare API Sugestii:", error);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setShowDropdown(false);
    onSearch(title); 
  };

  return (
    <section className="w-full max-w-3xl mx-auto mb-10" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 relative">
        <label htmlFor="movie-search" className="sr-only">Caută un film</label>
        
        <div className="relative w-full">
          <input
            id="movie-search"
            type="text"
            value={query}
            onChange={handleInputChange} 
            onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
            placeholder="Ex: The Matrix, Interstellar..."
            className={`w-full py-5 px-10 text-2xl font-medium text-center rounded-full border-2 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all shadow-2xl ${
              isDarkMode 
                ? "bg-slate-800 border-slate-500 text-white placeholder-slate-400" 
                : "bg-white border-slate-400 text-slate-900 placeholder-slate-500"
            }`}
            required
            autoComplete="off"
          />

          {showDropdown && (
            <ul className={`absolute z-50 w-full mt-4 rounded-3xl overflow-hidden shadow-2xl border-2 ${
              isDarkMode ? "bg-slate-800 border-slate-600 divide-slate-700" : "bg-white border-slate-300 divide-slate-200"
            } divide-y`}>
              {suggestions.map((movie) => (
                <li 
                  key={movie.imdbID}
                  onMouseDown={() => handleSuggestionClick(movie.Title)}
                  className={`flex items-center gap-5 p-4 cursor-pointer transition-colors ${
                    isDarkMode ? "hover:bg-slate-700 text-slate-200" : "hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60?text=+"} 
                    alt="poster" 
                    className="w-12 h-16 object-cover rounded-md shadow-sm border border-slate-500"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xl">{movie.Title}</span>
                    <span className={`text-base font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{movie.Year}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Am inlocuit gradientul defect cu culori solide sigure: bg-blue-600 */}
        <button 
          type="submit"
          className="px-16 py-5 text-xl bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-500 hover:scale-105 shadow-lg shadow-blue-500/30 transition-all duration-300 cursor-pointer border border-blue-400"
        >
          Caută Filmul
        </button>
      </form>
    </section>
  );
}