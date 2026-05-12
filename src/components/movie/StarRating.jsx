// Contribuție: Cosmin P. - Sistem de rating vizual cu stele

/**
 * Componente interne pentru afișarea stelelor.
 * Folosim SVG-uri (Scalable Vector Graphics) pentru ca stelele să arate clar la orice mărime.
 */
const StarFull = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-md">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const StarEmpty = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 opacity-40">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.121-1.097.82L12 18.423l-4.761 2.846c-.566.301-1.245-.199-1.097-.82l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

/**
 * StarHalf - Realizează efectul de jumătate de stea.
 * Suprapunem o jumătate de stea plină peste una goală folosind "absolute" și "overflow-hidden".
 */
const StarHalf = () => (
  <div className="relative inline-block">
    <StarEmpty />
    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
      <StarFull />
    </div>
  </div>
);

/**
 * StarRating - Transformă un scor numeric (0-100) într-o reprezentare vizuală de 5 stele.
 */
export default function StarRating({ score, className = "" }) {
  // Dacă nu avem un scor valid, afișăm un mesaj neutru.
  if (score === null || isNaN(score)) {
    return <span className={`opacity-50 text-sm italic ${className}`}>Fără scor oficial</span>;
  }

  /**
   * Calculăm câte stele pline, jumătăți sau stele goale avem nevoie.
   * Scorul e de la 0 la 100, deci îl împărțim la 20 pentru a obține o scară de 5.
   */
  const rating = score / 20; 
  const fullStars = Math.floor(rating); // Rotunjire în jos pentru stele pline.
  const hasHalfStar = rating - fullStars >= 0.5; // Verificăm dacă restul e suficient pentru o jumătate.
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 bg-black/30 w-max px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`}>
      {/* Generăm stelele pline folosind un Array și .map() */}
      {[...Array(fullStars)].map((_, i) => <StarFull key={`f-${i}`} />)}
      
      {/* Adăugăm jumătatea de stea dacă e cazul */}
      {hasHalfStar && <StarHalf />}
      
      {/* Completăm până la 5 cu stele goale */}
      {[...Array(emptyStars)].map((_, i) => <StarEmpty key={`e-${i}`} />)}
      
      {/* Afișăm și scorul procentual lângă stele */}
      <span className="ml-3 font-black text-2xl text-white">{score}%</span>
    </div>
  );
}