# Proiect 13: Recomandări de film (Web Development)
Aplicație web modernă de tip Single Page Application (SPA), care utilizează o arhitectură hibridă: TMDb API pentru datele cinematografice complete și What's on? API pentru preluarea scorurilor critice de pe Rotten Tomatoes.

## ✨ Funcționalități Cheie

*   **Căutare Avansată:** Sugestii în timp real (autocomplete) în timpul tastării.
*   **Istoric Căutări:** Salvarea și afișarea ultimelor căutări pentru acces rapid.
*   **Sistem de Recomandări:** Analiză automată a scorurilor Rotten Tomatoes preluate prin What's on? API.
*   **UX Îmbunătățit:** Skeleton loading pentru a reduce timpul perceput de așteptare.
*   **Caching Inteligent:** Stocare în `localStorage` cu timp de expirare pentru a optimiza apelurile API.
*   **Vizualizare Imersivă:** Modal (pop-up) pentru mărirea posterelor și design responsiv adaptat pentru orice dispozitiv.

## 🛠️ Tehnologii Utilizate

*   **Frontend:** React 19, Tailwind CSS 4.
*   **Build Tool:** Vite.
*   **Testare:** Vitest (unit testing pentru logica de scor).
*   **API:** What's on? API (GitHub: pierrevano/whatson-api).

## Membrii Echipei și Contribuții

*   **Alin P.** (Membrul 1)
    *   Setup arhitectură React (Vite).
    *   Integrare API (`fetch` către What's on?) și data handling.
    *   Implementare mecanism de Caching cu expirare (LocalStorage).
    *   Scriere logică decizională (Programare Funcțională) și teste unitare (Vitest).
*   **Cosmin P.** (Membrul 2)
    *   Proiectare și implementare interfață grafică (UI/UX) cu Tailwind CSS.
    *   Validare W3C pentru structura HTML5 și CSS3.
    *   Realizare diagrame UML (Use Case, Activity).
    *   Înregistrare video și deployment platformă (Vercel/Render).

## 🚀 Rulare Proiect

1. `npm install`
2. `npm run dev`

## 🧪 Rulare Teste

Pentru a verifica integritatea logicii de business și a sistemului de cache, rulează:
```bash
npm run test
```

### 👨‍🏫 Ghid pentru Prezentare (Validare Teste)
Dacă la prezentarea proiectului profesorul întreabă despre **Unit Testing**, urmează acești pași:
1.  Deschide terminalul în folderul proiectului.
2.  Execută comanda `npm run test`.
3.  Vei vedea un raport verde care confirmă că toate cele **7 teste** au trecut cu succes.

## 📐 Arhitectură și Decizii Tehnice (Trade-offs)

Pentru a asigura scalabilitatea și performanța aplicației, am luat următoarele decizii tehnice:

*   **Vite vs. Create React App:** Am optat pentru Vite datorită timpului de build semnificativ redus și a utilizării modulelor ES native (ESM).
*   **Stocare Cache (LocalStorage):** Pentru a evita interogările redundante, am implementat un sistem de cache în `localStorage` cu mecanism de expirare. Datele sunt reținute timp de 24 de ore.
*   **What's on? API:** Am ales acest API agregator deoarece oferă acces centralizat la scorurile de critică (Rotten Tomatoes) și de public (IMDb) fără a necesita multiple chei API pentru fiecare serviciu în parte.
*   **Optimizare UX (Skeleton Loading):** Am prioritizat un *Core Web Vitals* optim, introducând componente de tip Skeleton în timpul latenței rețelei.

## 🎓 Conformitatea cu Cerințele Proiectului

Proiectul bifează următoarele puncte din baremul de evaluare:
*   ✅ **Modularizare și Comentarii:** Arhitectură separată pe directoare (`/api`, `/utils`, `/components`).
*   ✅ **Testare Unitară:** Implementată cu Vitest pe logica decizională.
*   ✅ **Validare W3C:** Codul DOM randat este valid HTML5.
*   ✅ **Diagrame UML:** Diagramele *Use Case* și *Activity* sunt disponibile în folderul `/docs`.
*   ✅ **Deployment:** Aplicația rulează în producție pe Vercel.

## ✨ Cele mai bune practici (Best Practices)

*   **Accesibilitate (A11y):** Folosim elemente semantice HTML5 (`main`, `section`, `article`, `header`) și atribute precum `alt` pentru imagini.
*   **Performanță:** Imagini optimizate, debouncing pe input-ul de căutare și minimizarea re-randărilor prin utilizarea strategică a referințelor (`useRef`).
*   **Clean Code:** Respectăm principiul **DRY** (Don't Repeat Yourself) și **KISS** (Keep It Simple, Stupid).

## 🔮 Direcții de Viitor (Roadmap)

Dacă am continua dezvoltarea proiectului, iată ce funcționalități am adăuga:
*   **Watchlist:** Posibilitatea de a salva filmele favorite într'o listă personalizată.
*   **Trailer Integration:** Integrare cu YouTube API pentru a vedea trailerul filmului direct în aplicație.
*   **Filtrare Avansată:** Căutare după gen, regizor sau interval de ani.
*   **Autentificare:** Conturi de utilizator pentru a păstra istoricul pe mai multe dispozitive.

### 📂 Structura Fișierelor (Unde găsesc X?)
*   **src/api/** - Aici "vorbim" cu exteriorul. Conține funcțiile care cer date de la What's on? API.