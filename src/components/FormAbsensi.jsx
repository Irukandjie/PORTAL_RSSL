import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Wajib import ini
import CameraPopup from './CameraPopup'; 

export default function FormAbsensi({ onBack }) {
  // State Absensi
  const [activeType, setActiveType] = useState(null); 
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false); // State untuk React Portal

  // State untuk kontrol Popup Kamera
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll body saat Preview atau Loading aktif
  useEffect(() => {
    if (capturedPhoto || isSubmitting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [capturedPhoto, isSubmitting]);

  const absenCards = [
    { id: 'Masuk', title: 'Absen Masuk', desc: 'Mulai shift kerja reguler', color: 'emerald', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
    { id: 'Pulang', title: 'Absen Pulang', desc: 'Akhiri shift kerja reguler', color: 'rose', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
    { id: 'Lembur In', title: 'Lembur IN', desc: 'Mulai jam kerja tambahan', color: 'blue', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'Lembur Out', title: 'Lembur OUT', desc: 'Akhiri jam kerja tambahan', color: 'purple', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' }
  ];

  // Logic saat card absensi diklik
  const handleCardClick = (type) => {
    setActiveType(type);
    setCapturedPhoto(null);
    setIsCameraOpen(true);
  };

  // Logic HANYA MENYIMPAN FOTO ke Preview 
  const handleCapture = (photoDataUrl) => {
    setCapturedPhoto(photoDataUrl); 
    setIsCameraOpen(false); 
  };

  // Logic KETIKA KLIK "KIRIM ABSEN" DARI PREVIEW
  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // =====================================
  // UI BERHASIL
  // =====================================
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4 animate-fade-in-up">
        <div className="max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center border border-slate-100">
          
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Absen Berhasil!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Data {activeType} beserta foto validasi timestamp telah terekam di sistem.
          </p>

          {capturedPhoto && (
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 mb-6 bg-black">
              <img src={capturedPhoto} alt="Bukti Absen" className="w-full h-full object-cover" />
            </div>
          )}

          <button onClick={onBack} className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl shadow-md hover:bg-slate-900 transition-colors">
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // PORTAL OVERLAY: PREVIEW & LOADING
  // =====================================
  const previewOverlay = mounted && capturedPhoto && !isSubmitting ? createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center h-[100dvh] w-screen overflow-hidden touch-none p-6 animate-fade-in">
      <h2 className="text-white text-2xl font-bold mb-6 drop-shadow-md">Preview Absensi</h2>
      
      <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/10 mb-8 flex items-center justify-center bg-black aspect-[3/4]">
        <img src={capturedPhoto} alt="Hasil Absen" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      
      <div className="flex gap-4 w-full max-w-sm">
        <button 
          onClick={() => { setCapturedPhoto(null); setIsCameraOpen(true); }} 
          className="flex-1 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 border border-white/20 transition-colors shadow-lg active:scale-95"
        >
          Foto Ulang
        </button>
        <button 
          onClick={handleConfirmSubmit} 
          className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95"
        >
          Kirim Absen
        </button>
      </div>
    </div>,
    document.body
  ) : null;

  const loadingOverlay = mounted && isSubmitting ? createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center h-[100dvh] w-screen overflow-hidden touch-none p-6 animate-fade-in">
      <svg className="animate-spin h-14 w-14 text-emerald-500 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h2 className="text-white text-2xl font-bold tracking-widest animate-pulse drop-shadow-md">Memproses Absen...</h2>
      <p className="text-slate-300 text-sm mt-2 drop-shadow-md">Mengirim data dan lokasi Anda ke server.</p>
    </div>,
    document.body
  ) : null;

  // =====================================
  // UI UTAMA
  // =====================================
  return (
    <div className="min-h-screen bg-slate-50 py-10 animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Tombol Kembali Utama */}
        <button onClick={onBack} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </button>

        {/* =========================================================
            HEADER & GRID CARD ABSENSI (Selalu di-render di background)
            ========================================================= */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 text-white rounded-2xl shadow-lg mb-6 transform -rotate-3">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">Absensi Kamera</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Silakan pilih tipe absensi Anda. Sistem akan mencatat waktu dan menyematkan <i>watermark</i> keamanan otomatis pada foto Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {absenCards.map((card) => (
            <div 
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative overflow-hidden group flex flex-col bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-${card.color}-300 cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${card.color}-50 text-${card.color}-600 group-hover:bg-${card.color}-500 group-hover:text-white transition-colors duration-300`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h3 className={`text-xl font-bold text-slate-800 mb-2 group-hover:text-${card.color}-600 transition-colors`}>{card.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{card.desc}</p>
              
              <div className={`mt-auto inline-flex items-center text-sm font-bold text-${card.color}-600`}>
                Jepret Sekarang
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          ))}
        </div>

        {/* PANGGIL KOMPONEN KAMERA SAKTI */}
        <CameraPopup 
          isOpen={isCameraOpen}
          onClose={() => setIsCameraOpen(false)}
          onCapture={handleCapture}
          title={`Absen ${activeType || ''}`}
          statusText={`STATUS: ABSEN ${activeType?.toUpperCase() || ''}`}
          defaultFacingMode="user" 
        />

        {/* RENDER PORTAL OVERLAY */}
        {previewOverlay}
        {loadingOverlay}

      </div>
    </div>
  );
}
