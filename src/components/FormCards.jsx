import React from 'react';
import ScrollReveal from './ScrollReveal'; 

export default function FormCards({ onBack, onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SUB-NAVBAR */}
        <nav className="mb-10 w-full flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 font-semibold shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 transition-all duration-300"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </button>
          <div className="text-sm font-medium text-slate-400 hidden sm:block">
            Dashboard <span className="mx-2">/</span> <span className="text-emerald-600">Katalog Formulir</span>
          </div>
        </nav>
        
        {/* Header Section */}
        <ScrollReveal>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm mb-6 shadow-sm border border-emerald-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Portal Evaluasi Pegawai
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight mb-6">
              Katalog Formulir
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Silakan pilih formulir evaluasi yang ingin Anda isi. Pastikan Anda memilih formulir yang sesuai dengan ketentuan dan instruksi dari manajemen Rumah Sakit Sekar Laras.
            </p>
          </div>
        </ScrollReveal>

        {/* GRID CARDS */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* ===================== CARD 1: KPI JABATAN (BLUE) ===================== */}
            <div 
              onClick={() => onNavigate('form-kpi-jabatan')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-blue-300 hover:shadow-blue-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-blue-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-blue-50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-blue-700">KPI Jabatan</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Kelengkapan dokumentasi dan implementasi Sasaran Keselamatan Pasien (SKP).</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-blue-50 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* ===================== CARD 2: SAFETY (RED) ===================== */}
            <div 
              onClick={() => onNavigate('form-safety')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-red-300 hover:shadow-red-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-red-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-red-50 text-red-600 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-red-700">Safety</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Pegawai menggunakan APD sesuai risiko pekerjaan dan ketentuan.</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-red-50 text-red-700 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* ===================== CARD 3: EXCELLENCE (GREEN) ===================== */}
            <div 
              onClick={() => onNavigate('form-excellence')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-green-300 hover:shadow-green-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-green-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-green-50 text-green-600 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-green-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-green-700">Excellence</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Pegawai hadir tepat waktu dan menggunakan seragam beserta atribut sesuai ketentuan rumah sakit.</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-green-50 text-green-700 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-green-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* ===================== CARD 4: KOLABORATIF (PURPLE) ===================== */}
            <div 
              onClick={() => onNavigate('form-kolaboratif')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-purple-300 hover:shadow-purple-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-purple-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-purple-50 text-purple-600 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-purple-700">Kolaboratif</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Pegawai aktif mengikuti briefing pagi, rapat unit, rapat mutu, diskusi kasus, dan koordinasi lintas profesi.</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-purple-50 text-purple-700 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* ===================== CARD 5: AMANAH (YELLOW) ===================== */}
            <div 
              onClick={() => onNavigate('form-amanah')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-yellow-300 hover:shadow-yellow-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-yellow-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-yellow-50 text-yellow-600 group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:to-yellow-500 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-yellow-700">Amanah</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Pegawai mematuhi peraturan, SOP, etika profesi, dan tata tertib rumah sakit.</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-yellow-50 text-yellow-700 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-400 group-hover:text-white group-hover:shadow-lg group-hover:shadow-yellow-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* ===================== CARD 6: RESPONSIVE (INDIGO) ===================== */}
            {/* KONEKTOR RESPONSIVE DI SINI */}
            <div 
              onClick={() => onNavigate('form-responsive')}
              className="relative overflow-hidden group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-indigo-300 hover:shadow-indigo-500/20 cursor-pointer"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-indigo-400"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:-rotate-6 bg-indigo-50 text-indigo-600 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-indigo-700">Responsive</h3>
              <p className="relative z-10 text-slate-500 mb-8 leading-relaxed flex-grow">Pegawai aktif melaporkan kondisi pasien, insiden keselamatan, atau kerusakan sarana manajemen.</p>
              <button className="relative z-10 mt-auto w-full inline-flex items-center justify-center px-4 py-3.5 font-bold rounded-xl transition-all duration-500 bg-indigo-50 text-indigo-700 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30">
                Mulai Pengisian
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}