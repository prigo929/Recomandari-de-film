// Contribuție: Cosmin P. - Meniu sugestii în timp real

import { useState } from 'react';

/**
 * Componenta SuggestionsDropdown - Afișează lista de rezultate pe măsură ce utilizatorul scrie.
 */
export default function SuggestionsDropdown({ suggestions, onSuggestionClick, isDarkMode }) {
  /**
   * failedImages: O stare de tip obiect care reține care postere nu s-au putut încărca.
   * Folosim ID-ul filmului ca cheie și "true" ca valoare.
   */
  const [failedImages, setFailedImages] = useState({});

  // Dacă nu avem sugestii, nu afișăm meniul.
  if (!suggestions || suggestions.length === 0) return null;

  return (
    /**
     * "absolute z-50": Meniul "plutește" deasupra restului conținutului (strat superior).
     */
    <ul className={`absolute z-50 w-full mt-3 rounded-3xl shadow-2xl border-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
      isDarkMode ? "bg-slate-800 border-slate-700 divide-slate-700" : "bg-white border-gray-100 divide-gray-100"
    }`}>
      {suggestions.map((m) => {
        const isPosterMissing = m.Poster === "N/A" || failedImages[m.imdbID];

        return (
          /**
           * onMouseDown: Folosim acest eveniment în loc de onClick pentru a ne asigura că 
           * selecția se face înainte ca input-ul să piardă focusul (care ar închide lista).
           */
          <li key={m.imdbID} onMouseDown={() => onSuggestionClick(m.Title)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-cyan-50 text-slate-900"
              }`}>
            
            {isPosterMissing ? (
              // Iconiță de rezervă dacă posterul lipsește.
              <div className={`w-10 h-14 flex-shrink-0 flex items-center justify-center rounded shadow-sm border border-slate-500/30 text-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-200/50'}`} title="Poster indisponibil">
                🎬
              </div>
            ) : (
              // Imaginea reală cu detectarea erorilor de încărcare (onError).
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