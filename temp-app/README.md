# Proiect 13: Recomandări de film (Web Development)

Aplicație web modernă de tip Single Page Application (SPA), care utilizează OMDb API pentru a furniza date despre filme și o logică de decizie bazată pe scorurile de la Rotten Tomatoes.

## Membrii Echipei și Contribuții

*   **Alin P.** (Membrul 1)
    *   Setup arhitectură React (Vite).
    *   Integrare API (`fetch` către OMDb) și data handling.
    *   Implementare mecanism de Caching cu expirare (LocalStorage).
    *   Scriere logică decizională (Programare Funcțională) și teste unitare (Vitest).
*   **Cosmin P.** (Membrul 2)
    *   Proiectare și implementare interfață grafică (UI/UX) cu Tailwind CSS.
    *   Validare W3C pentru structura HTML5 și CSS3.
    *   Realizare diagrame UML (Use Case, Activity).
    *   Înregistrare video și deployment platformă (Vercel/Render).

## Rulare Proiect

1. `npm install`
2. Adăugați fișierul `.env` cu variabila `VITE_OMDB_API_KEY=cheia_voastra`.
3. `npm run dev`

## Rulare Teste (Vitest)
Aplicația conține teste unitare pentru a valida funcțiile de calcul a scorului:
`npm run test`