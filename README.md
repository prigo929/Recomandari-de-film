# Proiect 13: Recomandări de film (Web Development)

Aplicație web modernă de tip Single Page Application (SPA), care utilizează OMDb API pentru a furniza date despre filme și o logică de decizie bazată pe scorurile de la Rotten Tomatoes.

## ✨ Funcționalități Cheie

*   **Căutare Avansată:** Sugestii în timp real (autocomplete) în timpul tastării.
*   **Istoric Căutări:** Salvarea și afișarea ultimelor căutări pentru acces rapid.
*   **Sistem de Recomandări:** Analiză automată a scorurilor Rotten Tomatoes cu feedback vizual (Banner de recomandare).
*   **UX Îmbunătățit:** Skeleton loading pentru a reduce timpul perceput de așteptare.
*   **Caching Inteligent:** Stocare în `localStorage` cu timp de expirare pentru a optimiza apelurile API.

## 🛠️ Tehnologii Utilizate

*   **Frontend:** React 19, Tailwind CSS 4.
*   **Build Tool:** Vite.
*   **Testare:** Vitest (unit testing pentru logica de scor).
*   **API:** OMDb API.

## Membrii Echipei și Contribuții

*   **Alin P.**
    *   Setup arhitectură React și integrare API.
    *   Sistem de Caching și logică decizională (score evaluator).
    *   Testare automată (Vitest).
*   **Cosmin P.**
    *   Design UI/UX și implementare Tailwind CSS.
    *   Istoric căutări și dropdown de sugestii.
    *   Elemente de Skeleton Loading și branding assets.

## 🚀 Rulare Proiect

1. `npm install`
2. Creați un fișier `.env` în rădăcină: `VITE_OMDB_API_KEY=cheia_voastra`
3. `npm run dev`

## 🧪 Rulare Teste

`npm run test`