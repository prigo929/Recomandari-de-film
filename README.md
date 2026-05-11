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

## 📖 Ghid pentru Începători (Concepte și Modificări)

Dacă ești la început de drum cu React și Tailwind, iată o explicație a modului în care funcționează "motorul" acestei aplicații:

### 🧠 Concepte de bază în React

1.  **State (`useState`) - Memoria Componentei:**
    *   Imaginează-ți că `useState` este o cutie în care aplicația ține minte lucruri (ex: ce a scris utilizatorul, dacă se încarcă datele sau ce film am găsit).
    *   Când conținutul cutiei se schimbă, React "re-desenează" automat ecranul.
2.  **Props - Cum comunică componentele:**
    *   Componentele sunt ca niște piese de LEGO. "Props" sunt instrucțiunile sau datele pe care o piesă părinte le trimite unei piese copil.
    *   Exemplu: `App.jsx` trimite datele filmului către `MovieCard.jsx` prin props.
3.  **Hooks (`useEffect`) - Reacții la schimbări:**
    *   Îi spunem aplicației: "Când se întâmplă X, fă și Y".
    *   Exemplu: "Când utilizatorul scrie 3 litere, caută automat sugestii în API".

### ⚙️ Cum circulă datele în aplicație?

1.  **Input:** Utilizatorul scrie în `SearchBar.jsx`.
2.  **Cerere (Request):** Aplicația verifică întâi în `cacheManager.js` (memoria locală). Dacă nu există, `omdb.js` face un apel la serverul OMDb.
3.  **Procesare:** Datele primite (scorurile) sunt trimise la `scoreEvaluator.js`. Acesta extrage procentul de la Rotten Tomatoes.
4.  **Verdict:** În funcție de scor, se generează un mesaj (ex: "Evitați" sau "Vizionare obligatorie").
5.  **Afișare:** Toate aceste informații ajung în `MovieCard.jsx` care le "colorează" frumos și le arată utilizatorului.

### 🔍 Cum depanez (Debug) și înțeleg datele?

Dacă ceva nu merge sau vrei să vezi ce date primești:
*   **Consola Browserului:** Apasă `F12` (sau Right Click -> Inspect) și mergi la tab-ul **Console**. Acolo vei vedea erorile de rețea sau mesajele de test.
*   **Network Tab:** Tot în `F12`, mergi la **Network** pentru a vedea cererile către OMDb. Poți da click pe ele să vezi exact ce răspuns trimite serverul (format JSON).
*   **Structura Datelor:** Un film primit de la API arată așa:
    ```json
    {
      "Title": "Inception",
      "Year": "2010",
      "Poster": "https://...",
      "Ratings": [{ "Source": "Rotten Tomatoes", "Value": "87%" }]
    }
    ```
    Dacă vrei să adaugi ceva nou (ex: regizorul), caută `{movie.Director}` în codul din `MovieCard.jsx`.

### 🧪 De ce avem teste?
În folderul `src/tests/` vei găsi fișiere care verifică dacă matematica noastră e corectă.
*   Testele ne asigură că dacă modificăm ceva în viitor, nu stricăm logica de calcul a scorului.
*   Poți adăuga teste noi în `scoreEvaluator.test.js` pentru a verifica scenarii noi (ex: ce se întâmplă dacă filmul are scor 0%).

### 🎨 Cum modific culorile și stilul?

Folosim **Tailwind CSS**, ceea ce înseamnă că stilizarea se face direct în fișierele `.jsx` folosind clase CSS gata făcute:
*   **Culori:** `bg-blue-600` (fundal), `text-white` (text), `border-gray-200` (margine).
*   **Spațiere:** `p-4` (padding/spațiu interior), `m-2` (margin/spațiu exterior).
*   **Responsive:** `flex-col md:flex-row` (pe mobil elementele stau unul sub altul, pe calculator stau unul lângă altul).

### 🔄 Sincronizare Git (Recomandare)
Dacă lucrezi în echipă și apar conflicte, folosește aceste comenzi pentru a fi sigur că ești la zi cu variabila "oficială" de pe server:
```bash
git fetch origin
git reset --hard origin/main
```