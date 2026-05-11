export default function SuggestionsDropdown({ suggestions, onSuggestionClick, isDarkMode }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className={`absolute z-50 w-full mt-3 rounded-3xl shadow-2xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
      isDarkMode ? "bg-slate-800 border-slate-700 divide-slate-700" : "bg-white border-gray-100 divide-gray-100"
    }`}>
      {suggestions.map((m) => (
        <li key={m.imdbID} onMouseDown={() => onSuggestionClick(m.Title)}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
              isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-cyan-50 text-slate-900"
            }`}>
          <img src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/40"} className="w-10 h-14 object-cover rounded shadow-sm border border-slate-500/30" alt="Poster" />
          <div className="text-left flex flex-col">
            <span className="font-bold text-lg leading-tight">{m.Title}</span>
            <span className="font-medium text-sm opacity-50">{m.Year}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}