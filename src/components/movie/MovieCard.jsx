import { useState } from 'react';
import RecommendationBanner from './RecommendationBanner';
import PosterModal from './PosterModal';
import StarRating from './StarRating';

export default function MovieCard({ movie, recommendation, score, isDarkMode }) {
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prevMovieId, setPrevMovieId] = useState(movie?.imdbID);

  if (movie && movie.imdbID !== prevMovieId) {
    setPrevMovieId(movie.imdbID);
    setImageError(false);
    setShowPosterModal(false);
  }

  if (!movie) return null;

  const isPosterMissing = movie.Poster === "N/A" || imageError;

  const getVerdictStyles = () => {
    if (recommendation?.type === 'good') return "border-emerald-500 shadow-[0_0_30px_0px_rgba(16,185,129,0.7)]";
    if (recommendation?.type === 'bad') return "border-rose-500 shadow-[0_0_30px_0px_rgba(244,63,94,0.7)]";
    if (recommendation?.type === 'neutral') return "border-amber-500 shadow-[0_0_30px_0px_rgba(245,158,11,0.7)]";
    return isDarkMode ? "border-slate-700 shadow-2xl" : "border-gray-300 shadow-2xl";
  };

  const cardBg = isDarkMode ? "bg-slate-800" : "bg-white";
  const textTitle = isDarkMode ? "text-white" : "text-slate-900";
  const tagStyle = isDarkMode ? "bg-slate-700 text-cyan-400 border-slate-600" : "bg-gray-100 text-blue-600 border-gray-200";
  const verdictStyle = getVerdictStyles();

  return (
    <>
      <article className={`rounded-[3rem] overflow-hidden flex flex-col md:flex-row border-4 transition-all duration-700 ease-out w-full ${cardBg} ${verdictStyle}`}>
        
        {/* ZONA POSTERULUI */}
        <div className="md:w-2/5 relative h-[450px] md:h-auto overflow-hidden group">
          {isPosterMissing ? (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none ${isDarkMode ? 'bg-slate-900/50 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
              <span className="text-6xl mb-4 opacity-40 drop-shadow-sm">🎬</span>
              <span className="font-bold text-lg uppercase tracking-widest opacity-80">Posterul nu a fost găsit</span>
            </div>
          ) : (
            <>
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                onError={() => setImageError(true)}
                onClick={() => setShowPosterModal(true)}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/50 pointer-events-none" />
            </>
          )}
          
          <StarRating score={score} className="absolute bottom-6 left-6 md:hidden mb-0" />
        </div>
        
        {/* ZONA INFORMAȚIILOR (TEXT) */}
        <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center text-left relative">
          <header>
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${textTitle} leading-tight`}>
              {movie.Title} <span className="opacity-50 text-2xl md:text-3xl font-bold">({movie.Year})</span>
            </h2>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {[movie.Rated, movie.Runtime, movie.Genre].map(t => (
                <span key={t} className={`px-4 py-1.5 rounded-xl border-2 font-bold text-xs uppercase tracking-widest ${tagStyle}`}>{t}</span>
              ))}
            </div>
          </header>

          <StarRating score={score} className="hidden md:flex mb-4" />

          <section className="mb-8 flex-grow">
            <h3 className={`text-lg font-bold mb-2 uppercase tracking-widest opacity-40 ${textTitle}`}>Sinopsis</h3>
            <p className={`text-lg leading-relaxed font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{movie.Plot}</p>
          </section>

          {recommendation && (
            <div className="mt-auto">
              <RecommendationBanner type={recommendation.type} message={recommendation.message} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </article>

      {/* COMPONENTA DE MODAL (Doar dacă imaginea e validă) */}
      {!isPosterMissing && (
        <PosterModal 
          isOpen={showPosterModal} 
          onClose={() => setShowPosterModal(false)} 
          posterUrl={movie.Poster} 
          title={movie.Title} 
        />
      )}
    </>
  );
}