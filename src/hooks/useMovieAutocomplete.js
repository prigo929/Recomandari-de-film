// Contribuție: Cosmin P. - Logică pentru autocompletare filme

import { useState, useEffect, useRef } from 'react';
import { fetchSuggestions } from '../api/tmdb';

export function useMovieAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const ignoreAutoSearch = useRef(false);
  const silentFetch = useRef(false); // Flag pentru căutările "tăcute" din fundal

  // Folosită când dai click pe Istoric: pune textul, șterge sugestiile și ignoră API-ul
  const setQueryAndSkipSearch = (newQuery) => {
    ignoreAutoSearch.current = true;
    setQuery(newQuery);
    setSuggestions([]); 
    setShowDropdown(false);
  };

  // Folosită de butonul Surprinde-mă: caută la API, dar NU deschide vizual lista
  const setQueryAndFetchSilent = (newQuery) => {
    ignoreAutoSearch.current = false;
    silentFetch.current = true; // Activăm modul tăcut
    setQuery(newQuery);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    ignoreAutoSearch.current = false;
    silentFetch.current = false; // La tastare manuală, dezactivăm modul tăcut
    setShowDropdown(false);

    if (val.trim().length < 3) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (query.trim().length < 3) return;
    
    if (ignoreAutoSearch.current) {
      ignoreAutoSearch.current = false; 
      return;
    }
    
    let isActive = true;
    
    const timeoutId = setTimeout(async () => {
      try {
        const results = await fetchSuggestions(query);
        
        if (!isActive) return;

        if (results.length > 0) {
          setSuggestions(results);
          
          // Dacă NU suntem pe modul tăcut, arată dropdown-ul
          if (!silentFetch.current) {
            setShowDropdown(true); 
          }
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
        
        // Resetăm modul tăcut după prima execuție pentru ca viitoarele tastări să funcționeze normal
        silentFetch.current = false;
        
      } catch (err) { 
        if (isActive) console.error("Eroare API Sugestii:", err); 
      }
    }, 400);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return {
    query,
    handleInputChange,
    setQueryAndSkipSearch,
    setQueryAndFetchSilent,
    suggestions,
    showDropdown,
    setShowDropdown 
  };
}