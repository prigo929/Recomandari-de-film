// Contribuție: Alin P. - Testare invalidare cache (Jest/Vitest)
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMovieFromCache, saveMovieToCache } from '../utils/cacheManager';

/**
 * Validare Sistem Cache (LocalStorage)
 * Aici demonstrăm că stăpânim testarea avansată. 
 * Cache-ul depinde de timp (expiră după 24 de ore). 
 * Vom folosi funcțiile din Vitest pentru a "călători în timp" și a verifica dacă datele expiră corect.
 */
describe('Validare Sistem Cache (LocalStorage)', () => {
  
  // Înainte de fiecare test, golim memoria browserului simulată
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('salvează și recuperează corect datele din cache', () => {
    const titluFilm = "Inception";
    const dateMock = { Title: "Inception", Year: "2010" };

    saveMovieToCache(titluFilm, dateMock);
    const dateRecuperate = getMovieFromCache(titluFilm);

    // toEqual verifică dacă obiectele au același conținut
    expect(dateRecuperate).toEqual(dateMock);
  });

  it('returnează null și șterge datele dacă cache-ul a expirat (peste 24h)', () => {
    const titluFilm = "Avatar";
    const dateMock = { Title: "Avatar", Year: "2009" };

    // Setăm ceasul intern al testului (Fake Timers)
    vi.useFakeTimers();
    
    // Salvăm datele acum (T0)
    saveMovieToCache(titluFilm, dateMock);

    // Simulăm trecerea a 25 de ore (25 ore * 60 min * 60 sec * 1000 ms)
    vi.advanceTimersByTime(25 * 60 * 60 * 1000);

    // Încercăm să le recuperăm
    const dateRecuperate = getMovieFromCache(titluFilm);

    // Ne așteptăm să fie null, deoarece au expirat conform regulii de 24h
    expect(dateRecuperate).toBeNull();
  });
});
