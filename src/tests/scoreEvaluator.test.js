// Contribuție: Alin P. - Testare automată actualizată
import { expect, test, describe } from "vitest";
import {
  getRottenTomatoesScore,
  getRecommendationMessage,
} from "../utils/scoreEvaluator";

describe("Logica de extragere si evaluare a scorului", () => {
  const mockRatingsGood = [{ Source: "Rotten Tomatoes", Value: "85%" }];
  const mockRatingsBad = [{ Source: "Rotten Tomatoes", Value: "30%" }]; // Acum o vom folosi
  const mockRatingsMissing = [
    { Source: "Internet Movie Database", Value: "7.0/10" },
  ];

  test("Extrage corect numărul din string-ul Rotten Tomatoes", () => {
    expect(getRottenTomatoesScore(mockRatingsGood)).toBe(85);
    expect(getRottenTomatoesScore(mockRatingsBad)).toBe(30); // UTILIZARE: am adăugat testul pentru variabila nefolosită
    expect(getRottenTomatoesScore(mockRatingsMissing)).toBeNull();
  });

  test("Returnează mesajul de recomandare corect pentru > 80%", () => {
    const result = getRecommendationMessage(85);
    expect(result.type).toBe("good");
    expect(result.message).toContain("Ar trebui să vizionați");
  });

  test("Returnează mesajul de evitare pentru < 50%", () => {
    const result = getRecommendationMessage(30); // Evaluăm pe baza scorului extras din mockRatingsBad
    expect(result.type).toBe("bad");
    expect(result.message).toContain("Evitați");
  });
});