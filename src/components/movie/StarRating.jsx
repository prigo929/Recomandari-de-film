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

const StarHalf = () => (
  <div className="relative inline-block">
    <StarEmpty />
    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
      <StarFull />
    </div>
  </div>
);

export default function StarRating({ score, className = "" }) {
  // REZOLVAREA: Am adăugat ${className} și pe acest span!
  if (score === null || isNaN(score)) {
    return <span className={`opacity-50 text-sm italic ${className}`}>Fără scor oficial</span>;
  }

  const rating = score / 20; 
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 bg-black/30 w-max px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`}>
      {[...Array(fullStars)].map((_, i) => <StarFull key={`f-${i}`} />)}
      {hasHalfStar && <StarHalf />}
      {[...Array(emptyStars)].map((_, i) => <StarEmpty key={`e-${i}`} />)}
      <span className="ml-3 font-black text-2xl text-white">{score}%</span>
    </div>
  );
}