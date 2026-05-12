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
*   **Programare Funcțională:** Logica de business (evaluarea scorului și decizia recomandării) a fost complet decuplată de interfața grafică (UI). Funcțiile din `scoreEvaluator.js` sunt pure, ceea ce ne-a permis testarea lor unitară izolată, fără a randa componente de React în mediul de test. Această decuplare facilitează mentenanța și predictibilitatea sistemului.
*   **Optimizare UX (Skeleton Loading):** Am prioritizat un *Core Web Vitals* optim, introducând componente de tip Skeleton în timpul latenței rețelei, pentru a evita un *Cumulative Layout Shift (CLS)* deranjant pentru utilizator și a menține o interfață fluidă.

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

*   **Accesibilitate (A11y):** Folosim elemente semantice HTML5 (`main`, `section`, `article`, `header`) și atribute precum `alt` pentru imagini pentru a asigura o structură corectă și accesibilă.
*   **Performanță:** Imagini optimizate, debouncing pe input-ul de căutare și minimizarea re-randărilor prin utilizarea strategică a referințelor (`useRef`).
*   **Clean Code:** Respectăm principiul **DRY** (Don't Repeat Yourself) și **KISS** (Keep It Simple, Stupid), menținând o logică granulară și ușor de testat.

## 🔮 Direcții de Viitor (Roadmap)

Dacă am continua dezvoltarea proiectului, iată ce funcționalități am adăuga:
*   **Watchlist:** Posibilitatea de a salva filmele favorite într-o listă personalizată.
*   **Trailer Integration:** Integrare cu YouTube API pentru a vedea trailerul filmului direct în aplicație.
*   **Filtrare Avansată:** Căutare după gen, regizor sau interval de ani.
*   **Autentificare:** Conturi de utilizator pentru a păstra istoricul pe mai multe dispozitive.