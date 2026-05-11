/**
 * Componenta SearchHistory - Afișează o listă de butoane cu ultimele căutări salvate.
 * @param {Array} recentSearches - Listă de string-uri cu titlurile căutate.
 * @param {Function} onHistoryClick - Funcție apelată când se dă click pe un element din istoric.
 * @param {boolean} isDarkMode - Indicator pentru tema vizuală.
 */
export default function SearchHistory({ recentSearches, onHistoryClick, isDarkMode }) {
  // Dacă nu avem căutări în istoric, nu afișăm nimic.
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full animate-in fade-in duration-500">
      <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Căutări recente:
      </span>
      
      {/* 
          Iterăm prin lista de căutări recente (recentSearches).
          Folosim .map() pentru a transforma fiecare termen într-un buton.
      */}
      {recentSearches.map((term, index) => (
        <button 
          key={`${term}-${index}`} // Fiecare element din listă are nevoie de o cheie unică în React.
          type="button"
          onClick={() => onHistoryClick(term)} // Re-executăm căutarea pentru acel film.
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
  );
}