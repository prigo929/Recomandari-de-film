// Contribuție: Cosmin P. - Butoane de acțiune și funcția "Surprinde-mă"

/**
 * Componenta ActionButtons - Grupează butoanele principale de interacțiune.
 * @param {Function} onSurpriseMe - O funcție (callback) primită de la SearchBar care alege un film la întâmplare.
 */
export default function ActionButtons({ onSurpriseMe, isDarkMode }) {
  return (
    /**
     * flex-col sm:flex-row: Pe ecrane mici (mobil) butoanele stau unul sub altul, 
     * iar pe ecrane "sm" (small/tabletă) și mai mari, stau pe orizontală.
     */
    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
      
      {/* BUTONUL DE CĂUTARE */}
      <button 
        type="submit" // Acest tip spune browserului să declanșeze evenimentul onSubmit al formularului părinte.
        className={`
          px-10 py-4 font-black uppercase tracking-wide rounded-full transition-all duration-300 active:scale-95 w-full sm:w-auto
          ${isDarkMode 
            ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]" 
            : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/50"
          }
        `}
      >
        Caută Filmul
      </button>
      
      {/* BUTONUL SURPRINDE-MĂ */}
      <button 
        type="button" // Prevenim trimiterea formularului; acest buton are o funcție separată.
        onClick={onSurpriseMe} // Legăm funcția primită prin props la evenimentul de click.
        className={`
          flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase tracking-tight rounded-full transition-all duration-300 active:scale-95 border-2 w-full sm:w-auto
          ${isDarkMode 
            ? "bg-slate-800 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]" 
            : "bg-white border-cyan-400 text-cyan-600 shadow-sm hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          }
        `}
      >
        <span className="text-xl">🎲</span> Surprinde-mă
      </button>
    </div>
  );
}