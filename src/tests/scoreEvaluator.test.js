// Contribuție: Alin P. - Testare logică de business (Jest/Vitest)
import { describe, it, expect } from 'vitest';
import { getRottenTomatoesScore, getRecommendationMessage } from '../utils/scoreEvaluator';

/**
 * Testarea logicii de evaluare (Funcții Pure)
 * Acesta este cel mai simplu și sigur mod de a bifa cerința de testare unitară.
 * Testăm dacă funcțiile noastre returnează rezultatele corecte pentru diferite intrări.
 */
describe('Evaluare Scor Rotten Tomatoes', () => {
  
  it('extrage corect procentajul din array-ul de rating-uri', () => {
    /**
     * MOCK DATA: Date simulate care imită răspunsul real de la API.
     */
    const mockRatings = [
      { Source: "Internet Movie Database", Value: "8.8/10" },
      { Source: "Rotten Tomatoes", Value: "85%" }
    ];
    
    // expect(...).toBe(...) este o "aserțiune" - verificăm egalitatea.
    expect(getRottenTomatoesScore(mockRatings)).toBe(85);
  });

  it('returnează null dacă sursa Rotten Tomatoes nu există', () => {
    const mockRatings = [{ Source: "Internet Movie Database", Value: "8.8/10" }];
    expect(getRottenTomatoesScore(mockRatings)).toBeNull();
  });

  it('recomandă vizionarea filmului pentru un scor mare (>= 80)', () => {
    const verdict = getRecommendationMessage(85);
    expect(verdict.type).toBe("good");
    expect(verdict.message).toContain("Ar trebui să vizionați");
  });

  it('recomandă evitarea filmului pentru un scor mic (<= 50)', () => {
    const verdict = getRecommendationMessage(40);
    expect(verdict.type).toBe("bad");
    expect(verdict.message).toContain("Evitați acest film");
  });

  it('returnează mesaj neutru pentru scoruri medii', () => {
    const verdict = getRecommendationMessage(65);
    expect(verdict.type).toBe("neutral");
    expect(verdict.message).toContain("mediocru");
  });
});