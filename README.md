# Proiect 13: Recomandări de film (Web Development)

Aplicație web modernă de tip Single Page Application (SPA), care utilizează OMDb API pentru a furniza date despre filme și o logică de decizie bazată pe scorurile de la Rotten Tomatoes.

## ✨ Funcționalități Cheie

*   **Căutare Avansată:** Sugestii în timp real (autocomplete) în timpul tastării.
*   **Istoric Căutări:** Salvarea și afișarea ultimelor căutări pentru acces rapid.
*   **Sistem de Recomandări:** Analiză automată a scorurilor Rotten Tomatoes cu feedback vizual (Banner de recomandare).
*   **UX Îmbunătățit:** Skeleton loading pentru a reduce timpul perceput de așteptare.
*   **Caching Inteligent:** Stocare în `localStorage` cu timp de expirare pentru a optimiza apelurile API.
*   **Vizualizare Imersivă:** Modal (pop-up) pentru mărirea posterelor și design responsiv adaptat pentru orice dispozitiv.

## 🛠️ Tehnologii Utilizate

*   **Frontend:** React 19, Tailwind CSS 4.
*   **Build Tool:** Vite.
*   **Testare:** Vitest (unit testing pentru logica de scor).
*   **API:** OMDb API.

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

## 🚀 Rulare Proiect

1. `npm install`
2. Creați un fișier `.env` în rădăcină: `VITE_OMDB_API_KEY=cheia_voastra`
3. `npm run dev`

## 🧪 Rulare Teste

Pentru a verifica integritatea logicii de business și a sistemului de cache, rulează:
```bash
npm run test
```

### 👨‍🏫 Ghid pentru Prezentare (Validare Teste)
Dacă la prezentarea proiectului profesorul întreabă despre **Unit Testing**, urmează acești pași:
1.  Deschide terminalul în folderul proiectului.
2.  Execută comanda `npm run test`.
3.  Vei vedea un raport verde care confirmă că toate cele **7 teste** au trecut cu succes (5 pentru logica de scor și 2 pentru validarea memoriei cache).

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
*   ✅ **Deployment:** Aplicația rulează în producție pe Vercel: https://recomandari-de-film.vercel.app/
*   ⭐ **Funcționalități Bonus (Mărire Notă):**
    *   Utilizarea paradigmelor de programare reactivă (React) și funcțională (Utils).
    *   Mecanism de stocare în cache a datelor.
    *   Sugestii de căutare în timp real și Istoric integrat.

## ✨ Cele mai bune practici (Best Practices)

*   **Accesibilitate (A11y):** Folosim elemente semantice HTML5 (`main`, `section`, `article`, `header`) și atribute precum `alt` pentru imagini.
*   **Performanță:** Imagini optimizate, debouncing pe input-ul de căutare și minimizarea re-randărilor prin utilizarea strategică a `useRef`.
*   **Clean Code:** Respectăm principiul **DRY** (Don't Repeat Yourself) și **KISS** (Keep It Simple, Stupid), având o logică ușor de urmărit.

## 🔮 Direcții de Viitor (Roadmap)

Dacă am continua dezvoltarea proiectului, iată ce funcționalități am adăuga:
*   **Watchlist:** Posibilitatea de a salva filmele favorite într-o listă personalizată.
*   **Trailer Integration:** Integrare cu YouTube API pentru a vedea trailerul filmului direct în aplicație.
*   **Filtrare Avansată:** Căutare după gen, regizor sau interval de ani.
*   **Autentificare:** Conturi de utilizator pentru a păstra istoricul pe mai multe dispozitive.

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

### 📂 Structura Fișierelor (Unde găsesc X?)
*   **src/api/** - Aici "vorbim" cu exteriorul. Conține funcțiile care cer date de la serverul OMDb.
*   **src/utils/** - "Creierul" matematic. Funcții izolate care calculează scoruri sau gestionează memoria (cache). Nu conțin cod vizual.
*   **src/components/** - "Piesele de LEGO". Organizate în `/movie` (pentru afișare) și `/search` (pentru interacțiune).
*   **src/hooks/** - Logica reutilizabilă pentru funcții speciale (Autocomplete, Istoric).
*   **src/App.jsx** - Dispecerul central. Componenta care leagă interfața grafică de funcțiile logice.
*   **package.json** - "Buletinul" aplicației. Listează bibliotecile externe folosite și scripturile executabile (`npm run dev`).

### 🔐 Variabile de Mediu (.env) și Securitate
*   **Ce sunt?** Fișierul `.env` stochează parole sau chei secrete (cum ar fi `VITE_OMDB_API_KEY`).
*   **De ce nu le urcăm pe Git?** Fișierul `.gitignore` blochează intenționat fișierul `.env` pentru ca cheia ta API să nu devină publică pe internet.
*   **Regula de aur:** Când descarci proiectul pe un PC nou, trebuie mereu să recreezi manual fișierul `.env`. Variabilele în Vite trebuie să înceapă obligatoriu cu `VITE_`.

### 🛑 Erori Frecvente și Cum Să Le Rezolvi
*   **Ecran complet alb (White Screen of Death):** Ai o eroare fatală de JavaScript la randare. Apasă `F12`, mergi la **Console** și citește textul roșu. De obicei este o proprietate apelată pe un obiect inexistent (ex: încerci să citești `movie.Title` înainte ca `movie` să primească datele din API).
*   **Eroare 401 Unauthorized în consolă:** Cheia ta OMDb este invalidă sau serverul Vite nu a citit fișierul `.env`. Oprește terminalul (`Ctrl + C`) și repornește-l (`npm run dev`).
*   **Modificările CSS/Tailwind nu apar pe ecran:** Asigură-re că fișierul în care lucrezi este prins în regulile din `tailwind.config.js` (în array-ul `content`). Altfel, Tailwind va șterge automat acele clase la compilare.
*   **Datele "vechi" apar în continuare (Cache invalid):** Dacă faci teste și vrei să ignori sistemul nostru de stocare, deschide `F12` -> tab-ul **Application** -> **Local Storage** -> click dreapta pe domeniu și alege **Clear**.

---

## 📚 Mic Dicționar de Termeni (Cheat Sheet)

### ⚛️ Logica React & JavaScript
*   **`useState`**: Salvează date în memoria componentei (starea).
*   **`useEffect`**: Execută cod automat (ex: la încărcarea paginii sau la schimbarea unei variabile).
*   **`props`**: Datele trimise de la o componentă părinte la una copil.
*   **`async / await`**: Spune codului să aștepte un răspuns de la internet fără a bloca restul aplicației.
*   **`fetch`**: Comanda care face cererea propriu-zisă către un server (API).
*   **`localStorage`**: Memoria browserului unde salvăm date care rămân acolo și după refresh (ex: Istoric).
*   **`JSON.parse / stringify`**: Traducerea datelor între formatul de Obiect (JS) si formatul de Text (pentru salvare).
*   **`try...catch`**: O plasă de siguranță care prinde erorile și previne oprirea aplicației.

### 🏗️ Structura HTML & Componente
*   **`div`**: O cutie generică pentru a grupa alte elemente.
*   **`p` / `span`**: Elemente pentru text (paragraf sau text scurt în interiorul unui rând).
*   **`section` / `article`**: Cutii cu nume specific care ajută la organizarea logică a paginii.
*   **`export / import`**: Modul în care "legăm" fișierele între ele, permițând refolosirea codului.

### 🎨 Design (Tailwind CSS)
*   **`w-full` / `h-screen`**: Ocupă toată lățimea, respectiv toată înălțimea ecranului.
*   **`max-w-4xl`**: Împiedică un element să devină prea lat pe ecrane mari.
*   **`mx-auto`**: Centrează un element orizontal.
*   **`flex / grid`**: Sisteme moderne de aliniere a elementelor.
*   **`flex-col md:flex-row`**: Pe mobil stau pe verticală, pe calculator pe orizontală.
*   **`gap-4`**: Spațiul gol dintre elementele dintr-o cutie.
*   **`p-8` / `m-4`**: Spațiul interior (padding), respectiv exterior (margin).
*   **`rounded-[2rem]`**: Colțuri rotunjite pentru un aspect modern.
*   **`shadow-xl`**: Umbră care dă efect de profunzime.
*   **`hover:bg-blue-500`**: Schimbă culoarea doar când pui mouse-ul deasupra.
*   **`transition-all`**: Face schimbările de culori sau dimensiuni să fie line (animație).
*   **`animate-pulse`**: Animație de tip "încărcare" (pâlpâire).
*   **`backdrop-blur`**: Efect de "sticlă înghețată" (blur pe fundal).
*   **`z-50` / `absolute`**: Controlul straturilor (ce stă deasupra cui) și poziționare liberă pe ecran.

---

### 🔄 Sincronizare Git (Recomandare)
Dacă lucrezi în echipă și apar conflicte, folosește aceste comenzi pentru a fi sigur că ești la zi cu variabila "oficială" de pe server:
```bash
git fetch origin
git reset --hard origin/main
```