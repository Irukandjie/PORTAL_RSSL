import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans fixed inset-0 z-[100]">
      <div className="flex flex-col items-center animate-pulse">
        <img 
          src="https://i.ibb.co.com/XZpfgCKT/LOGO-KOTAK-PNG.png" 
          alt="Logo RS Sekar Laras" 
          className="h-32 w-auto mb-6 drop-shadow-xl" 
        />
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">RS Sekar Laras</h2>
        
        <div className="mt-3 text-center">
          <p className="text-xl font-bold text-blue-600 italic tracking-wide drop-shadow-sm">"Nang Ning Nung"</p>
          <p className="text-sm font-medium text-slate-500 mt-1">(Menang, Wening Lan Hanung)</p>
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-3">
          <div className="w-3.5 h-3.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3.5 h-3.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Memuat Halaman...</p>
      </div>
    </div>
  );
}