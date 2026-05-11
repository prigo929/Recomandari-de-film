/**
 * Componenta SkeletonCard - Un "placeholder" animat afișat în timpul încărcării datelor.
 * Oferă utilizatorului un indiciu vizual că aplicația lucrează și urmează să afișeze conținut.
 * @param {boolean} isDarkMode - Dacă tema întunecată este activă.
 */
export default function SkeletonCard({ isDarkMode }) {
  // Culorile de fundal pentru card și pentru elementele care pulsează.
  const bg = isDarkMode ? "bg-slate-800" : "bg-white";
  const pulse = isDarkMode ? "bg-slate-700" : "bg-gray-200";

  return (
    /**
     * animate-pulse este o clasă Tailwind care creează o animație de tip "respirație" (se aprinde și se stinge ușor).
     */
    <div className={`w-full max-w-4xl mx-auto rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 animate-pulse shadow-xl ${bg}`}>
      
      {/* "Posterul" fals */}
      <div className={`md:w-1/3 h-[400px] rounded-2xl ${pulse}`}></div>
      
      {/* "Conținutul" fals (Titlu, Descriere, Banner) */}
      <div className="md:w-2/3 flex flex-col gap-4">
        <div className={`h-12 w-3/4 rounded-xl ${pulse}`}></div> {/* Titlu */}
        <div className={`h-6 w-1/2 rounded-lg ${pulse}`}></div> {/* Metadate */}
        <div className={`h-32 w-full rounded-xl ${pulse} mt-4`}></div> {/* Sinopsis */}
        <div className={`h-20 w-full rounded-xl ${pulse} mt-auto`}></div> {/* Banner */}
      </div>
    </div>
  );
}