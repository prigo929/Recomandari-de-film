import { useState, useEffect } from 'react';

export function useSearchHistory() {
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('cineverdict_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cineverdict_history', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      return [searchTerm, ...filtered].slice(0, 3); // Păstrăm ultimele 3 căutări
    });
  };

  return { recentSearches, addToHistory };
}