import { useState, useEffect, useRef } from 'react';

export function useMovieAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const ignoreAutoSearch = useRef(false);

  // Funcție folosită când dăm click pe o sugestie, istoric sau butonul "Surprinde-mă"
  // Schimbă textul din input, dar îi spune aplicației să NU mai caute la API (pentru că deja avem filmul exact).
  const setQueryAndSkipSearch = (newQuery) => {
    ignoreAutoSearch.current = true;
    setQuery(newQuery);
    setShowDropdown(false);
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

  return {
    query,
    handleInputChange,
    setQueryAndSkipSearch,
    suggestions,
    showDropdown,
    setShowDropdown
  };
}