import { useState, useEffect } from 'react';

/**
 * useSearchHistory - Un "Custom Hook" pentru a gestiona istoricul căutărilor.
 * În React, hook-urile personalizate ne permit să extragem logica reutilizabilă din componente.
 * Această funcție salvează căutările în memoria browserului (LocalStorage) pentru a persista și după refresh.
 */
export function useSearchHistory() {
  /**
   * Inițializăm starea 'recentSearches'.
   * Folosim o funcție de inițializare care verifică LocalStorage la prima încărcare a paginii.
   */
  const [recentSearches, setRecentSearches] = useState(() => {
    // Încercăm să citim istoricul salvat sub cheia 'cineverdict_history'.
    const saved = localStorage.getItem('cineverdict_history');
    
    // Deoarece LocalStorage stochează doar text, transformăm textul JSON înapoi într-un array JavaScript.
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * useEffect se declanșează de fiecare dată când lista 'recentSearches' se schimbă.
   * Acesta actualizează LocalStorage pentru ca datele să rămână salvate.
   */
  useEffect(() => {
    // Transformăm array-ul în text JSON pentru a putea fi salvat în LocalStorage.
    localStorage.setItem('cineverdict_history', JSON.stringify(recentSearches));
  }, [recentSearches]);

  /**
   * addToHistory - Adaugă un nou termen de căutare în listă.
   * @param {string} searchTerm - Numele filmului căutat.
   */
  const addToHistory = (searchTerm) => {
    // Verificăm dacă termenul este gol.
    if (!searchTerm.trim()) return;

    setRecentSearches(prev => {
      // 1. Eliminăm termenul dacă există deja în listă (pentru a-l pune la început).
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      
      // 2. Punem noul termen în fața listei (folosind operatorul spread '...').
      // 3. .slice(0, 3) se asigură că păstrăm doar cele mai recente 3 căutări.
      return [searchTerm, ...filtered].slice(0, 3);
    });
  };

  /**
   * Returnăm starea și funcția de adăugare pentru a fi folosite în componente (ex: SearchBar).
   */
  return { recentSearches, addToHistory };
}