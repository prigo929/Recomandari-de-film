// Autor: Membrul 2 (UI/UX)
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto mb-10">
      {/* Container flex pentru a preveni suprapunerea */}
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center w-full bg-slate-800 border border-slate-700 rounded-full shadow-lg p-1 focus-within:ring-2 focus-within:ring-cyan-500 transition-all"
      >
        <label htmlFor="movie-search" className="sr-only">Caută un film</label>
        
        {/* Input care ocupă tot spațiul rămas (flex-1) */}
        <input
          id="movie-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută un film (ex: The Matrix, Interstellar)..."
          className="flex-1 bg-transparent text-gray-200 px-6 py-3 focus:outline-none"
          required
        />
        
        {/* Buton fixat în dreapta */}
        <button 
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer whitespace-nowrap"
        >
          Caută
        </button>
      </form>
    </section>
  );
}