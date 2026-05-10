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
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <label htmlFor="movie-search" className="sr-only">Caută un film</label>
        
        {/* Input stilizat Dark Mode cu efecte de focus */}
        <input
          id="movie-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută un film (ex: The Matrix, Interstellar)..."
          className="w-full py-4 pl-6 pr-36 text-gray-200 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg transition-all"
          required
        />
        
        {/* Buton cu Gradient și Glow Effect */}
        <button 
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] cursor-pointer"
        >
          Caută
        </button>
      </form>
    </section>
  );
}