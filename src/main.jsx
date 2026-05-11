import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importăm stilurile globale (Tailwind)
import App from './App.jsx' // Importăm componenta principală a aplicației

/**
 * main.jsx - Punctul de intrare (Entry Point) în aplicația React.
 * Aici se face legătura dintre codul JavaScript și fișierul HTML (index.html).
 */

/**
 * createRoot caută elementul cu ID-ul 'root' în index.html și "injectează" aplicația React în el.
 */
createRoot(document.getElementById('root')).render(
  /**
   * StrictMode este un instrument de dezvoltare care ajută la identificarea problemelor 
   * potențiale în cod (ex: funcții învechite sau efecte secundare neașteptate).
   */
  <StrictMode>
    <App />
  </StrictMode>,
)
