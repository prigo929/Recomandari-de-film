// Contribuție: Cosmin P. - Interfață istoric căutări

/**
 * Componenta SearchHistory - Afișează o listă de butoane cu ultimele filme căutate.
 * @param {Array} recentSearches - Lista de termeni salvată în LocalStorage.
 */
export default function SearchHistory({ recentSearches, onHistoryClick, isDarkMode }) {
  // Modelul "Short-circuit": Dacă lista e goală, oprim randarea componentei imediat.
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    /**
     * animate-in fade-in: Clasă utilitară pentru a face istoricul să apară cu o animație line.
     */
    <div className="w-full mt-4 flex flex-col items-center animate-in fade-in duration-500">
      
      <span className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Căutări recente
      </span>
      
      <div className="flex flex-wrap justify-center gap-2">
        {/**
         * Iterăm prin lista de căutări folosind .map().
         * Este obligatoriu să oferim un "key" unic (aici folosim indexul) pentru ca React 
         * să poată urmări eficient elementele listei.
         */
        recentSearches.map((term, index) => (
          <button
            key={index}
            onClick={() => onHistoryClick(term)}
            title={term} 
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95
              ${isDarkMode 
                ? "bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-cyan-500/50" 
                : "bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-200 hover:border-cyan-300 shadow-sm"
              }
            `}
          >
            <span className="opacity-60 text-xs">🕒</span>
            {/* truncate: Dacă titlul e prea lung, adaugă automat puncte-puncte (...). */}
            <span className="truncate max-w-[100px] sm:max-w-[180px]">
              {term}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}