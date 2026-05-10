// Autor: Membrul 2 (UI/UX)
export default function RecommendationBanner({ type, message, isDarkMode }) {
  const styles = {
    good: isDarkMode 
      ? "bg-emerald-900/40 border-emerald-500 text-emerald-400" 
      : "bg-emerald-100 border-emerald-500 text-emerald-800",
    bad: isDarkMode 
      ? "bg-rose-900/40 border-rose-500 text-rose-400" 
      : "bg-rose-100 border-rose-500 text-rose-800",
    neutral: isDarkMode 
      ? "bg-amber-900/40 border-amber-500 text-amber-400" 
      : "bg-amber-100 border-amber-500 text-amber-800",
  };

  const currentStyle = styles[type] || styles.neutral;

  return (
    <aside className={`mt-2 p-6 border-l-[8px] rounded-2xl shadow-lg transition-colors ${currentStyle}`}>
      <p className="font-black text-xl tracking-wide leading-snug">{message}</p>
    </aside>
  );
}