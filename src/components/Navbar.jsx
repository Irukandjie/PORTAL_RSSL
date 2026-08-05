import React, { useState } from 'react';

export default function Navbar({ activePage, onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'form', label: 'Formulir' },
    { id: 'form-absensi', label: 'Absen' },
    { id: 'profile', label: 'Profil Saya' }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo & Brand Baru */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
              src="https://i.ibb.co.com/PvLNCdRs/LOGO-KOTAK-PNG.png" 
              alt="Logo RS Sekar Laras" 
              className="w-12 h-12 rounded-xl object-contain shadow-sm border border-slate-100 bg-white"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight leading-none mb-0.5">RS Sekar Laras</h1>
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Portal Pegawai</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-5 py-2.5 rounded-2xl text-[15px] transition-all duration-300 ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600 font-bold' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-semibold'
                  }`}
                >
                  {/* Ikon khusus untuk Absen Live sesuai desain */}
                  {item.id === 'form-absensi' && (
                    <svg className="w-5 h-5 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  {item.label}
                </button>
              );
            })}

            {/* Garis Pembatas Vertikal */}
            <div className="h-8 w-px bg-slate-200 mx-4"></div>

            {/* TOMBOL LOGOUT ESTETIK */}
            <button 
              onClick={onLogout} 
              className="p-3 text-rose-500 bg-rose-50 rounded-2xl hover:bg-rose-100 hover:text-rose-600 transition-colors duration-300 flex items-center justify-center" 
              title="Keluar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-emerald-600 focus:outline-none p-2 bg-slate-50 rounded-xl">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white absolute w-full shadow-xl animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activePage === item.id 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.id === 'form-absensi' && (
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )}
                {item.label}
              </button>
            ))}
            
            <div className="h-px bg-slate-100 my-2"></div>

            <button 
              onClick={() => { onLogout(); setIsOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Keluar
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}