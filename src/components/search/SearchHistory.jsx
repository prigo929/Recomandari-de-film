export default function SearchHistory({ recentSearches, onHistoryClick, isDarkMode }) {
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    <div className="w-full mt-4 flex flex-col items-center animate-in fade-in duration-500">
      
      {/* AM MODIFICAT AICI: Fără opacity-50, am folosit text-slate-400 (Dark) și text-slate-600 (Light) */}
      <span className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Căutări recente
      </span>
      
      <div className="flex flex-wrap justify-center gap-2">
        {recentSearches.map((term, index) => (
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
            <span className="truncate max-w-[100px] sm:max-w-[180px]">
              {term}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}