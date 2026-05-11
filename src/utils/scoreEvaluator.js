// Contribuție: Alin P. - Evaluare scor (Programare Funcțională)

/**
 * getRottenTomatoesScore - Extrage valoarea numerică a scorului Rotten Tomatoes.
 * @param {Array} ratings - Lista de rating-uri primită de la OMDb API.
 * @returns {number|null} - Scorul ca număr întreg sau null dacă nu este găsit.
 */
export const getRottenTomatoesScore = (ratings) => {
  // Verificăm dacă datele primite sunt într-un format valid (array).
  if (!Array.isArray(ratings)) return null;

  /**
   * Folosim .find() pentru a căuta în listă elementul care are sursa "Rotten Tomatoes".
   * Acesta este un exemplu de "Programare Funcțională" - operăm direct pe date folosind metode dedicate.
   */
  const rtRating = ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes",
  );

  // Dacă filmul nu are scor de la Rotten Tomatoes, returnăm null.
  if (!rtRating) return null;

  /**
   * Scorul vine ca text (ex: "85%"). 
   * replace("%", "") elimină simbolul procentual.
   * parseInt(..., 10) transformă textul rezultat în număr întreg.
   */
  return parseInt(rtRating.Value.replace("%", ""), 10);
};

/**
 * getRecommendationMessage - Stabilește verdictul final în funcție de scor.
 * @param {number|null} score - Scorul numeric (0-100).
 * @returns {Object} - Un obiect care conține tipul recomandării și mesajul text.
 */
export const getRecommendationMessage = (score) => {
  // Cazul în care scorul lipsește sau nu este un număr valid.
  if (score === null || isNaN(score)) {
    return { type: "neutral", message: "Nu există un scor Rotten Tomatoes pentru acest film." };
  }

  // Pragul pentru recomandare pozitivă (>= 80%).
  if (score >= 80) return { type: "good", message: `Scor: ${score}%. Ar trebui să vizionați acest film chiar acum!` };
  
  // Pragul pentru recomandare negativă (<= 50%).
  if (score <= 50) return { type: "bad", message: `Scor: ${score}%. Evitați acest film cu orice preț!` };

  // Pentru scorurile cuprinse între 51% și 79%.
  return { type: "neutral", message: `Scor: ${score}%. Filmul este mediocru. Decizia îți aparține.` };
};
