import RecommendationBanner from './RecommendationBanner';

export default function MovieCard({ movie, recommendation, isDarkMode }) {
  if (!movie) return null;

  // Culori cu contrast extrem pentru vizibilitate 100%
  const cardBg = isDarkMode ? "bg-[#1e293b] border-slate-600" : "bg-white border-gray-300";
  const textTitle = isDarkMode ? "text-white" : "text-black";
  const textBody = isDarkMode ? "text-gray-200" : "text-gray-800";
  const tagBg = isDarkMode ? "bg-slate-700 border-slate-500 text-cyan-300" : "bg-gray-100 border-gray-300 text-blue-700";

  return (
    <article className={`${cardBg} rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 w-full transition-colors duration-300`}>
      
      <figure className="md:w-2/5 flex-shrink-0 m-0 relative h-[500px] md:h-auto bg-black">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=Poster+Indisponibil"} 
          alt={`Poster pentru ${movie.Title}`} 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        {/* Gradientul a fost redus pentru a nu ascunde detaliile din poză */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-slate-900/90 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1e293b]' : 'bg-gradient-to-t from-white/90 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white'}`}></div>
      </figure>

      <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center text-left z-10">
        <header>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${textTitle} leading-tight drop-shadow-sm`}>
            {movie.Title} <span className="opacity-70 text-2xl md:text-3xl font-bold">({movie.Year})</span>
          </h2>
          <div className="flex flex-wrap gap-3 text-sm font-bold uppercase tracking-wider mb-8">
            <span className={`px-4 py-2 rounded-xl border-2 ${tagBg}`}>{movie.Rated}</span>
            <span className={`px-4 py-2 rounded-xl border-2 ${tagBg}`}>{movie.Runtime}</span>
            <span className={`px-4 py-2 rounded-xl border-2 ${tagBg}`}>{movie.Genre}</span>
          </div>
        </header>

        <section className="mb-8 flex-grow">
          <h3 className={`text-xl font-bold mb-3 ${textTitle}`}>Sinopsis:</h3>
          <p className={`leading-relaxed text-lg font-medium ${textBody}`}>{movie.Plot}</p>
        </section>

        {recommendation && (
          <div className="mt-auto">
            <RecommendationBanner type={recommendation.type} message={recommendation.message} isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
    </article>
  );
}