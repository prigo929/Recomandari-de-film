import { useState } from 'react';
import RecommendationBanner from './RecommendationBanner';

const StarFull = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-md"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
);

const StarEmpty = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 opacity-40"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.121-1.097.82L12 18.423l-4.761 2.846c-.566.301-1.245-.199-1.097-.82l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
);

const StarHalf = () => (
  <div className="relative inline-block">
    <StarEmpty />
    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
      <StarFull />
    </div>
  </div>
);

export default function MovieCard({ movie, recommendation, score, isDarkMode }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  if (!movie) return null;

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

  const renderStars = () => {
    if (score === null || isNaN(score)) return <span className="opacity-50 text-sm italic">Fără scor oficial</span>;
    const rating = score / 20; 
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1 mb-4 bg-black/30 w-max px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
        {[...Array(fullStars)].map((_, i) => <StarFull key={`f-${i}`} />)}
        {hasHalfStar && <StarHalf />}
        {[...Array(emptyStars)].map((_, i) => <StarEmpty key={`e-${i}`} />)}
        <span className="ml-3 font-black text-2xl text-white">{score}%</span>
      </div>
    );
  };

  return (
    <>
      <article className={`rounded-[3rem] overflow-hidden flex flex-col md:flex-row border-4 transition-all duration-700 ease-out w-full ${cardBg} ${verdictStyle}`}>
        
        <div className="md:w-2/5 relative h-[450px] md:h-auto overflow-hidden group">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=Fara+Poster"} 
            alt={movie.Title} 
            onClick={() => setShowPosterModal(true)}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/50 pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 md:hidden">
            {renderStars()}
          </div>
        </div>
        
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

          <div className="hidden md:block">
            {renderStars()}
          </div>

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

      {/* MODAL (POP-UP) PENTRU POSTER */}
      {showPosterModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setShowPosterModal(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95 duration-300">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=Fara+Poster"} 
              alt={`${movie.Title} Poster`} 
              className="max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <button 
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-white bg-slate-900/80 hover:bg-slate-700 p-2 sm:p-3 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-110 active:scale-95"
              onClick={() => setShowPosterModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}