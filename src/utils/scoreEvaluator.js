// Contribuție: Alin P. - Evaluare scor (Programare Funcțională)

export const getRottenTomatoesScore = (ratings) => {
  if (!Array.isArray(ratings)) return null;

  const rtRating = ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes",
  );
  if (!rtRating) return null;

  // Extrage numărul din string (ex: "85%" -> 85)
  return parseInt(rtRating.Value.replace("%", ""), 10);
};

export const getRecommendationMessage = (score) => {
  if (score === null || isNaN(score)) {
    return "Nu există un scor Rotten Tomatoes pentru acest film.";
  }

  if (score > 80) return "Ar trebui să vizionați acest film chiar acum!";
  if (score < 50) return "Evitați acest film cu orice preț!";

  return "Filmul este mediocru. Decizia îți aparține.";
};
