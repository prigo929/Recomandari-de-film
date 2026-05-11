import { StarFull, StarHalf, StarEmpty } from './Stars';

export default function StarRating({ score, className = "" }) {
  // Dacă nu avem scor
  if (score === null || isNaN(score)) {
    return <span className="opacity-50 text-sm italic">Fără scor oficial</span>;
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