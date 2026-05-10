// Contribuție: Alin P. - Testare automată pentru logica de decizie

import { expect, test, describe } from "vitest";
import {
  getRottenTomatoesScore,
  getRecommendationMessage,
} from "../src/utils/scoreEvaluator";

describe("Logica de extragere si evaluare a scorului", () => {
  const mockRatingsGood = [{ Source: "Rotten Tomatoes", Value: "85%" }];
  const mockRatingsBad = [{ Source: "Rotten Tomatoes", Value: "30%" }];
  const mockRatingsMissing = [
    { Source: "Internet Movie Database", Value: "7.0/10" },
  ];

  test("Extrage corect numărul din string-ul Rotten Tomatoes", () => {
    expect(getRottenTomatoesScore(mockRatingsGood)).toBe(85);
    expect(getRottenTomatoesScore(mockRatingsMissing)).toBeNull();
  });

  test("Returnează mesajul de recomandare corect pentru > 80%", () => {
    expect(getRecommendationMessage(85)).toBe(
      "Ar trebui să vizionați acest film chiar acum!",
    );
  });

  test("Returnează mesajul de evitare pentru < 50%", () => {
    expect(getRecommendationMessage(30)).toBe(
      "Evitați acest film cu orice preț!",
    );
  });
});
