// Contribuție: Cosmin P. - Design Banner Recomandare

/**
 * Componenta RecommendationBanner - Afișează verdictul final pentru un film.
 * @param {string} type - Tipul recomandării: 'good', 'bad' sau 'neutral'.
 * @param {string} message - Mesajul text generat de logica de recomandare.
 * @param {boolean} isDarkMode - Dacă tema întunecată este activă.
 */
export default function RecommendationBanner({ type, message, isDarkMode }) {
  /**
   * Obiectul styles definește culorile bannerului pentru fiecare stare.
   * Folosim operatorul ternar (condiție ? true : false) pentru a alege varianta de culori potrivită temei.
   */
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

  /**
   * Selectăm stilul curent în funcție de proprietatea 'type'.
   * Dacă tipul primit nu este recunoscut, folosim 'neutral' ca variantă de siguranță (fallback).
   */
  const currentStyle = styles[type] || styles.neutral;

  return (
    /**
     * <aside> este un element semantic HTML5 folosit pentru conținut adițional (cum ar fi acest banner).
     * border-l-[8px] - Adaugă o bordură groasă doar în partea stângă pentru un aspect modern.
     */
    <aside className={`mt-2 p-6 border-l-[8px] rounded-2xl shadow-lg transition-colors ${currentStyle}`}>
      <p className="font-black text-xl tracking-wide leading-snug">{message}</p>
    </aside>
  );
}