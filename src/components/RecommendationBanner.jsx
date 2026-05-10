// Autor: Membrul 2 (UI/UX)
export default function RecommendationBanner({ type, message }) {
  // Culori adaptate pentru Dark Mode (neon text cu fundal semi-transparent)
  const styles = {
    good: "bg-emerald-900/30 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    bad: "bg-rose-900/30 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]",
    neutral: "bg-amber-900/30 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  };

  const currentStyle = styles[type] || styles.neutral;

  return (
    <aside className={`mt-6 p-5 border-l-4 rounded-r-xl backdrop-blur-md transition-all ${currentStyle}`}>
      <p className="font-extrabold text-lg tracking-wide">{message}</p>
    </aside>
  );
}