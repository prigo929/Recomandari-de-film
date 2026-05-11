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

## 📐 Arhitectură și Decizii Tehnice (Trade-offs)

Pentru a asigura scalabilitatea și performanța aplicației, am luat următoarele decizii tehnice:

*   **Vite vs. Create React App:** Am optat pentru Vite datorită timpului de build semnificativ redus și a utilizării modulelor ES native (ESM), ceea ce optimizează experiența de dezvoltare (HMR instant) comparativ cu bundle-urile greoaie bazate pe Webpack.
*   **Stocare Cache (LocalStorage):** Pentru a evita interogările redundante (și eventualele costuri/limitări de rate-limiting ale API-ului extern), am implementat un sistem de cache în `localStorage` cu mecanism de expirare (stale-while-revalidate). Datele sunt reținute timp de 24 de ore.
*   **Programare Funcțională:** Logica de business (evaluarea scorului și decizia recomandării) a fost complet decuplată de interfața grafică (UI). Funcțiile din `scoreEvaluator.js` sunt pure, ceea ce ne-a permis testarea lor unitară izolată, fără a randa componente de React în mediul de test.
*   **Optimizare UX (Skeleton Loading):** Am prioritizat un *Core Web Vitals* optim, introducând componente de tip Skeleton în timpul latenței rețelei, pentru a evita un *Cumulative Layout Shift (CLS)* deranjant pentru utilizator.

## 🎓 Conformitatea cu Cerințele Proiectului

Proiectul bifează următoarele puncte din baremul de evaluare:
*   ✅ **Modularizare și Comentarii:** Arhitectură separată pe directoare (`/api`, `/utils`, `/components`). Fiecare componentă are evidențiată contribuția membrului.
*   ✅ **Testare Unitară:** Implementată cu Vitest pe logica decizională. Rulați `npm run test`.
*   ✅ **Validare W3C:** Codul DOM randat este valid HTML5, iar clasele Tailwind CSS respectă standardele de validare.
*   ✅ **Diagrame UML:** Diagramele *Use Case* și *Activity* sunt disponibile în format PDF în directorul `/docs`.
*   ✅ **Deployment:** Aplicația rulează în producție pe Vercel: [INTRODU-LINK-UL-AICI]
*   ⭐ **Funcționalități Bonus (Mărire Notă):**
    *   Utilizarea paradigmelor de programare reactivă (React) și funcțională (Utils).
    *   Mecanism de stocare în cache a datelor.
    *   Sugestii de căutare în timp real și Istoric integrat.

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

### 🧪 De ce avem teste?
În folderul `src/tests/` vei găsi fișiere care verifică dacă matematica noastră e corectă.
*   Testele ne asigură că dacă modificăm ceva în viitor, nu stricăm logica de calcul a scorului.

---

## 📚 Mic Dicționar de Termeni (Cheat Sheet)

Dacă vezi aceste cuvinte în cod și nu ești sigur ce fac, iată o explicație rapidă:

### Logica React
*   **`useState`**: Salvează date în memoria componentei.
*   **`useEffect`**: Execută cod automat la anumite schimbări.
*   **`async/await`**: Spune codului să aștepte răspunsul de la internet înainte să continue.

### Structura HTML
*   **`div`**: O cutie folosită pentru a grupa elemente.
*   **`p`**: Un paragraf de text.
*   **`section` / `article`**: Cutii speciale care îi spun browserului ce fel de conținut este acolo.

### Design (Tailwind CSS)
*   **`w-full`**: Ocupă toată lățimea.
*   **`max-w-4xl`**: Limitează lățimea pe ecrane mari pentru a arăta bine.
*   **`mx-auto`**: Centrează elementul pe mijloc.
*   **`rounded-[2.5rem]`**: Colțuri foarte rotunjite (aspect modern).
*   **`flex-col md:flex-row`**: Pe mobil stau unul sub altul, pe calculator stau unul lângă altul.
*   **`animate-pulse`**: Animație de tip "încărcare" (se aprinde/stinge).
*   **`shadow-xl`**: Umbră fină care dă efect de adâncime.

---

### 🔄 Sincronizare Git (Recomandare)
Dacă lucrezi în echipă și apar conflicte, folosește aceste comenzi pentru a fi sigur că ești la zi cu variabila "oficială" de pe server:
```bash
git fetch origin
git reset --hard origin/main
```