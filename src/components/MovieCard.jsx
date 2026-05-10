// Autor: Membrul 2 (UI/UX)
import RecommendationBanner from './RecommendationBanner';

export default function MovieCard({ movie, recommendation }) {
  if (!movie) return null;

  return (
    <article className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row border border-slate-700/50">
      
      <figure className="md:w-1/3 flex-shrink-0 bg-slate-900 m-0 relative">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600/1e293b/ffffff?text=Poster+Indisponibil"} 
          alt={`Poster oficial pentru filmul ${movie.Title}`} 
          className="w-full h-full object-cover min-h-[400px]"
        />
        {/* Un mic gradient peste imagine pentru tranzitie lina in card */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent md:bg-gradient-to-l opacity-80"></div>
      </figure>

      <div className="p-8 md:w-2/3 flex flex-col justify-between text-left z-10">
        <header>
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md">
            {movie.Title} <span className="text-slate-400 text-2xl font-medium">({movie.Year})</span>
          </h2>
          <div className="flex flex-wrap gap-3 text-xs text-slate-300 font-bold uppercase tracking-wider mb-6">
            <span className="bg-slate-700/50 px-3 py-1.5 rounded-md border border-slate-600">{movie.Rated}</span>
            <span className="bg-slate-700/50 px-3 py-1.5 rounded-md border border-slate-600">{movie.Runtime}</span>
            <span className="bg-slate-700/50 px-3 py-1.5 rounded-md border border-slate-600 text-cyan-400">{movie.Genre}</span>
          </div>
        </header>

        <section className="mb-6 flex-grow">
          <h3 className="text-lg font-bold text-slate-200 mb-2">Sinopsis:</h3>
          <p className="text-slate-400 leading-relaxed text-base">{movie.Plot}</p>
        </section>

        {recommendation && (
          <RecommendationBanner type={recommendation.type} message={recommendation.message} />
        )}
      </div>
    </article>
  );
}