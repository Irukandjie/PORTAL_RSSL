import React from 'react';
import ScrollReveal from './ScrollReveal'; 

export default function LandingPage({ onNavigateToForm, onDirectToKpi, onDirectToSafety, onDirectToExcellence }) {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <ScrollReveal>
        <section 
          className="relative h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
              Rumah Sakit Sekar Laras
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 font-light drop-shadow-md">
              Melayani dengan Sepenuh Hati, Mengutamakan Keselamatan & Mutu Pelayanan
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* 2. SECTION DIREKTUR */}
      <ScrollReveal>
        <section className="py-24 bg-white relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Direktur RS Sekar Laras" className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
              </div>
              <div>
                <div className="mb-8">
                  <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Sambutan Pimpinan</span>
                  <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">Dedikasi untuk Kesehatan Masyarakat</h2>
                  <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                    "Sistem yang solid berawal dari evaluasi dan standar yang disiplin. Portal ini hadir untuk mempermudah seluruh jajaran pegawai dalam melaporkan kinerja, mutu, dan keselamatan lingkungan kerja kita."
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-emerald-700 mb-2">Visi</h3>
                    <p className="text-slate-600">Menjadi Rumah Sakit pilihan utama yang memberikan pelayanan kesehatan terpadu, berkualitas, dan mengutamakan keselamatan pasien di kawasan ini.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-emerald-700 mb-2">Misi</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Memberikan pelayanan kesehatan paripurna dan profesional.</li>
                      <li>Meningkatkan kompetensi dan kedisiplinan SDM.</li>
                      <li>Mengedepankan standar patient safety dalam setiap tindakan.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SECTION MENU FORM */}
      <ScrollReveal>
        <section className="py-24 bg-slate-50 border-t border-slate-200 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Akses Formulir Pegawai</h2>
              <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                Silakan pilih formulir di bawah ini sesuai dengan evaluasi departemen dan kebutuhan operasional Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CARD 1: Form KPI */}
              <div className="group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-blue-300 cursor-pointer" onClick={onDirectToKpi}>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">Form KPI Jabatan</h3>
                <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
                  Penilaian Indikator Kinerja Utama pegawai berdasarkan target posisi dan tanggung jawab operasional.
                </p>
                <button className="mt-auto w-full inline-flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  Buka Form
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* CARD 2: Form Safety */}
              <div className="group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-rose-900/10 transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-rose-300 cursor-pointer" onClick={onDirectToSafety}>
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-8 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-rose-600 transition-colors">Form Safety</h3>
                <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
                  Pelaporan insiden, inspeksi standar keselamatan pasien, dan cek berkala K3 lingkungan rumah sakit.
                </p>
                <button className="mt-auto w-full inline-flex items-center justify-center px-4 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  Buka Form
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* CARD 3: Form Excellence (PERBAIKAN DISINI => onDirectToExcellence) */}
              <div className="group flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-emerald-300 cursor-pointer" onClick={onDirectToExcellence}>
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">Form Excellence</h3>
                <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
                  Evaluasi standar mutu layanan prima (Service Excellence) untuk menjamin kepuasan pasien maksimal.
                </p>
                <button className="mt-auto w-full inline-flex items-center justify-center px-4 py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  Buka Form
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={onNavigateToForm}
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white font-bold rounded-full shadow-lg hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                Jelajahi Formulir Lainnya
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>
      
    </div>
  );
}