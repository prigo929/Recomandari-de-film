// Contribuție: Alin P. - Testare automată actualizată

/**
 * Fișierele de test (.test.js) sunt folosite pentru a verifica dacă funcțiile noastre lucrează corect.
 * Folosim Vitest, un framework de testare rapid, care ne oferă funcțiile 'describe', 'test' și 'expect'.
 */
import { expect, test, describe } from "vitest";
import {
  getRottenTomatoesScore,
  getRecommendationMessage,
} from "../utils/scoreEvaluator";

/**
 * describe - Grupează mai multe teste corelate sub un singur nume.
 * Ne ajută să organizăm raportul de testare.
 */
describe("Logica de extragere si evaluare a scorului", () => {
  /**
   * MOCK DATA: Date simulate care imită răspunsul real de la API.
   * Le folosim pentru a testa funcția în diferite scenarii fără a face apeluri reale la rețea.
   */
  const mockRatingsGood = [{ Source: "Rotten Tomatoes", Value: "85%" }];
  const mockRatingsBad = [{ Source: "Rotten Tomatoes", Value: "30%" }];
  const mockRatingsMissing = [
    { Source: "Internet Movie Database", Value: "7.0/10" },
  ];

  /**
   * test - Definește un caz individual de testare.
   */
  test("Extrage corect numărul din string-ul Rotten Tomatoes", () => {
    /**
     * expect(...).toBe(...) - Aceasta este o "aserțiune" (assertion).
     * Spunem: "Mă aștept ca rezultatul funcției X să fie egal cu valoarea Y".
     * Dacă nu sunt egale, testul va eșua și ne va spune unde e problema.
     */
    expect(getRottenTomatoesScore(mockRatingsGood)).toBe(85);
    expect(getRottenTomatoesScore(mockRatingsBad)).toBe(30);
    expect(getRottenTomatoesScore(mockRatingsMissing)).toBeNull(); // Dacă lipsește scorul, trebuie să returneze null.
  });

  test("Returnează mesajul de recomandare corect pentru scor mare (> 80%)", () => {
    const result = getRecommendationMessage(85);
    
    // Verificăm dacă tipul recomandării este cel așteptat.
    expect(result.type).toBe("good");
    
    // toContain verifică dacă mesajul text conține un anumit fragment de cuvinte.
    expect(result.message).toContain("Ar trebui să vizionați");
  });

  test("Returnează mesajul de evitare pentru scor mic (< 50%)", () => {
    const result = getRecommendationMessage(30);
    expect(result.type).toBe("bad");
    expect(result.message).toContain("Evitați");
  });
});