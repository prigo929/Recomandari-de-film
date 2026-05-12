// Contribuție: Cosmin P. - Meniu sugestii în timp real

import { useState } from 'react';

export default function SuggestionsDropdown({ suggestions, onSuggestionClick, isDarkMode }) {
  // Stare care ține minte ID-urile filmelor ale căror postere au dat eroare
  const [failedImages, setFailedImages] = useState({});

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className={`absolute z-50 w-full mt-3 rounded-3xl shadow-2xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
      isDarkMode ? "bg-slate-800 border-slate-700 divide-slate-700" : "bg-white border-gray-100 divide-gray-100"
    }`}>
      {suggestions.map((m) => {
        // Dacă API-ul zice N/A SAU dacă imaginea a dat eroare la încărcare
        const isPosterMissing = m.Poster === "N/A" || failedImages[m.imdbID];

        return (
          <li key={m.imdbID} onMouseDown={() => onSuggestionClick(m.Title)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-cyan-50 text-slate-900"
              }`}>
            
            {isPosterMissing ? (
              // Ceva reprezentativ și simplu pentru spațiul mic (40x56 px)
              <div className={`w-10 h-14 flex-shrink-0 flex items-center justify-center rounded shadow-sm border border-slate-500/30 text-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-200/50'}`} title="Poster indisponibil">
                🎬
              </div>
            ) : (
              // Imaginea reală, cu onError setat
              <img 
                src={m.Poster} 
                onError={() => setFailedImages(prev => ({ ...prev, [m.imdbID]: true }))}
                className="w-10 h-14 object-cover rounded shadow-sm border border-slate-500/30 flex-shrink-0" 
                alt="Poster" 
              />
            )}
            
            <div className="text-left flex flex-col">
              <span className="font-bold text-lg leading-tight">{m.Title}</span>
              <span className="font-medium text-sm opacity-50">{m.Year}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}