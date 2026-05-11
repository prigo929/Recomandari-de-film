export default function PosterModal({ isOpen, onClose, posterUrl, title }) {
  // Dacă modalul nu este setat să fie deschis, nu returnăm nimic
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose} // Dacă dai click oriunde pe fundalul negru, se închide
    >
      <div className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95 duration-300">
        
        {/* Imaginea mărită */}
        <img 
          src={posterUrl} 
          alt={`${title} Poster`} 
          className="max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()} // Împiedicăm închiderea dacă dai click fix pe poză
        />
        
        {/* Butonul X de închidere */}
        <button 
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-white bg-slate-900/80 hover:bg-slate-700 p-2 sm:p-3 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-110 active:scale-95"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
      </div>
    </div>
  );
}