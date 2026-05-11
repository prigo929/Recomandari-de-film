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

---

## 📖 Ghid pentru Începători (Cum să modifici proiectul)

Dacă ești la început de drum cu React și Tailwind, iată câteva sfaturi pentru a personaliza această aplicație:

### 🎨 Cum modific culorile și stilul?
Folosim **Tailwind CSS**, ceea ce înseamnă că stilizarea se face direct în fișierele `.jsx` folosind clase (proprietatea `className`).
*   **Schimbare culori:** Caută clase de tipul `bg-blue-600` (fundal albastru) sau `text-slate-900` (text gri închis). Poți înlocui `blue` cu `emerald`, `rose`, `amber` etc.
*   **Grosime text:** Folosește `font-bold` sau `font-black` pentru titluri.
*   **Umbre:** Adaugă `shadow-xl` sau `shadow-2xl` pentru a scoate elementele în evidență.

### 🏗️ Ce este JSX?
Fișierele `.jsx` ne permit să scriem cod asemănător cu HTML direct în interiorul funcțiilor JavaScript.
*   **Regulă importantă:** În loc de `class=""` (ca în HTML-ul clasic), folosim `className=""`.
*   **Logicã:** Tot ce este între acolade `{ }` este cod JavaScript (ex: `{movie.Title}`).

### 📂 Unde găsesc ce am nevoie?
*   **Vrei să schimbi cum arată un film?** Mergi în `src/components/MovieCard.jsx`.
*   **Vrei să schimbi logica de recomandare?** Mergi în `src/utils/scoreEvaluator.js`.
*   **Vrei să modifici bara de căutare?** Mergi în `src/components/SearchBar.jsx`.

### 🛡️ Variabile de mediu (.env)
Nu urca niciodată cheia API (`VITE_OMDB_API_KEY`) direct pe GitHub! Folosește fișierul `.env` care este deja ignorat prin `.gitignore`. Acesta păstrează cheile în siguranță pe calculatorul tău local.

### 🔄 Sincronizare Git (Recomandare)
Dacă lucrezi în echipă și apar conflicte după ce cineva a făcut modificări mari în istoric, folosește aceste comenzi pentru a fi sigur că ești la zi:
```bash
git fetch origin
git reset --hard origin/main
```
*Atenție: Această comandă va șterge orice modificare locală nesalvată!*