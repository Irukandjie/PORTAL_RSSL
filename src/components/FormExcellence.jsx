import React, { useState, useRef, useEffect } from 'react';

export default function FormExcellence({ onBack }) {
  // State untuk 1 foto penampilan (nyimpen Data URL dari kamera)
  const [file, setFile] = useState(null);
  
  // State untuk 3 absensi briefing (Opsional)
  const [briefings, setBriefings] = useState([
    { tanggal: '', foto: null },
    { tanggal: '', foto: null },
    { tanggal: '', foto: null }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State khusus Kamera (Photobooth Mode)
  const [isCameraActive, setIsCameraActive] = useState(false); 
  const [facingMode, setFacingMode] = useState('environment'); // Default kamera belakang
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // =====================================
  // LOGIC KAMERA REAL-TIME (WEBRTC)
  // =====================================

  const startCamera = async (mode = facingMode) => {
    // Stop stream lama jika ada sebelum membuka yang baru
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode }
      });
      setStream(mediaStream);
      setFacingMode(mode);
      setIsCameraActive(true);
    } catch (err) {
      alert("Gagal mengakses kamera. Pastikan browser Anda memiliki izin untuk menggunakan kamera.");
      console.error(err);
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(newMode);
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Balik gambar secara horizontal (mirror) jika pakai kamera depan
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Kembalikan ke normal untuk watermark (kalau ada) supaya nggak terbalik
      if (facingMode === 'user') {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setFile(photoDataUrl);
      stopCamera();
    }
  };

  // =====================================
  // LOGIC INPUT BRIEFING & UPLOAD FOTO
  // =====================================

  const handleBriefingChange = (index, field, value) => {
    const newBriefings = [...briefings];
    newBriefings[index][field] = value;
    setBriefings(newBriefings);
  };

  const handleBriefingFileChange = (index, e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Mohon unggah file berupa Gambar (JPG/PNG) atau Dokumen (PDF/DOC).');
        e.target.value = null;
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 5MB.');
        e.target.value = null;
        return;
      }
      const newBriefings = [...briefings];
      newBriefings[index].foto = selectedFile;
      setBriefings(newBriefings);
    }
  };

  // Bersihkan object URL saat komponen unmount untuk menghindari memory leak
  useEffect(() => {
    return () => {
      briefings.forEach(b => {
        if (b.foto && b.foto.type.startsWith('image/')) {
          URL.revokeObjectURL(b.foto.preview);
        }
      });
    };
  }, [briefings]);

  // =====================================
  // LOGIC SUBMIT FORM
  // =====================================
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi Foto Penampilan (Wajib 1 slot terisi)
    if (!file) {
      alert('Mohon jepret foto Penampilan Kerja Anda secara live sebelum mengirim form!');
      return;
    }

    // Validasi Kelengkapan Briefing (Opsional, tapi kalau diisi harus lengkap)
    let isBriefingIncomplete = false;
    briefings.forEach(b => {
      const isPartiallyFilled = (b.tanggal || b.foto) && !(b.tanggal && b.foto);
      if (isPartiallyFilled) isBriefingIncomplete = true;
    });

    if (isBriefingIncomplete) {
      alert('Jika Anda mengisi data briefing, pastikan Tanggal dan Dokumen Bukti terisi semua!');
      return;
    }
    
    setIsSubmitting(true);
    // Simulasi loading ngirim data ke server 2 detik
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // =====================================
  // TAMPILAN JIKA BERHASIL SUBMIT
  // =====================================
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Inspeksi Live Diterima!</h2>
          <p className="text-slate-500 mb-8">
            Terima kasih! Bukti jepretan penampilan Excellence dan absensi briefing Anda berhasil dikirim ke sistem RS Sekar Laras.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-colors"
          >
            Kembali ke Katalog Formulir
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // TAMPILAN FORMULIR
  // =====================================
  return (
    <div className="min-h-screen bg-slate-50 py-10 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Navigasi Back */}
        <button 
          onClick={() => { stopCamera(); onBack(); }}
          className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-emerald-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* =========================================================
            OVERLAY KAMERA ESTETIK (Glassmorphism & Scanner UI Emerald)
            ========================================================= */}
        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
            
            {/* Header Kamera */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent z-10">
              <div className="text-white font-semibold tracking-wide bg-emerald-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-500/50">
                Foto Penampilan Kerja
              </div>
              
              {/* TOMBOL ACTION (Ganti Kamera & Close) */}
              <div className="flex items-center gap-3">
                {/* Tombol Flip Camera */}
                <button onClick={toggleCamera} className="text-white bg-white/20 hover:bg-white/40 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                {/* Tombol Close */}
                <button onClick={stopCamera} className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-rose-500 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Viewfinder Kamera */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-video mx-auto bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-1 ring-white/10 mt-10">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={`w-full h-full object-cover scale-105 ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
              />
              
              {/* Overlay Efek Scanner / Bracket Kamera (Emerald) */}
              <div className="absolute inset-0 pointer-events-none p-6">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl opacity-80"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl opacity-80"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Jepret (iOS Shutter Style) */}
            <div className="mt-12 flex flex-col items-center">
              <button 
                onClick={capturePhoto} 
                className="relative flex items-center justify-center w-20 h-20 rounded-full border-[3px] border-white/60 hover:border-emerald-400 transition-colors duration-300 group focus:outline-none"
              >
                <div className="w-16 h-16 bg-white rounded-full transition-all duration-200 transform group-hover:scale-90 group-active:scale-75 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]"></div>
              </button>
              <p className="mt-6 text-white/70 font-semibold tracking-widest uppercase text-xs animate-pulse">
                Ketuk Untuk Jepret
              </p>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          
          {/* Header Form */}
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Form Excellence Live</h1>
              <p className="text-slate-500 text-sm mt-1">Evaluasi Penampilan Kerja & Absensi Briefing Pagi</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SECTION 1: FOTO PENAMPILAN (WAJIB - KAMERA ONLY) */}
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Foto Penampilan Kerja <span className="text-red-500">*</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1 pl-8">Pastikan satu foto mencakup atribut lengkap (Seragam, ID Card, Kerapian, Sepatu).</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm font-medium mb-6 ml-0 sm:ml-8">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p>Upload galeri dinonaktifkan untuk menjaga validitas. Anda <strong>wajib menggunakan fitur kamera langsung</strong> untuk memverifikasi penampilan Anda saat ini.</p>
              </div>

              <div className="pl-0 sm:pl-8">
                <div className="flex flex-col group cursor-pointer w-full sm:w-1/2 mx-auto" onClick={() => !file && startCamera()}>
                  <label className="block text-center text-sm font-bold text-slate-700 mb-2 group-hover:text-emerald-600 transition-colors">Bukti Penampilan (Keseluruhan)</label>
                  
                  <div className={`relative h-64 flex justify-center items-center px-6 py-6 border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${file ? 'border-emerald-500 bg-black' : 'border-slate-300 group-hover:border-emerald-400 group-hover:bg-emerald-50/30 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.05)]'}`}>
                    
                    {file ? (
                      /* Mode Preview Jepretan */
                      <>
                        <img src={file} alt={`Hasil Jepretan`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                          <button type="button" onClick={(e) => { e.stopPropagation(); startCamera(); }} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg text-sm hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Foto Ulang
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Mode Belum Dijepret (ESTETIK UPGRADE) */
                      <div className="space-y-5 text-center transform transition-transform duration-300 group-hover:scale-105">
                        
                        <div className="relative w-20 h-20 mx-auto">
                          {/* Efek Pinggiran Berkedip (Pulse Ring) */}
                          <div className="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-60"></div>
                          
                          {/* Ikon Kamera Utama (Scanner Style) */}
                          <div className="relative w-full h-full bg-gradient-to-tr from-white to-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-emerald-100 group-hover:border-emerald-300 group-hover:text-emerald-600 transition-all duration-300">
                            <svg className="w-9 h-9 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2M21 8V6a2 2 0 00-2-2h-2M21 16v2a2 2 0 01-2 2h-2M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Tombol Pill Estetik */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white font-bold rounded-xl transition-all duration-300 shadow-sm uppercase tracking-wider text-[11px] border border-emerald-200 group-hover:border-emerald-600">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                          Buka Kamera
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: ABSENSI BRIEFING (OPSIONAL) */}
            <section className="pt-6 border-t border-slate-100">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Data & Bukti Absensi Briefing <span className="text-slate-400 font-normal text-sm">(Opsional)</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1 pl-8">Isi tanggal dan unggah dokumen bukti kehadiran briefing 3 kali dalam seminggu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 sm:pl-8">
                {briefings.map((briefing, index) => (
                  <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 transition-colors flex flex-col h-full">
                    <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">Briefing Hari Ke-{index + 1}</h3>
                    
                    <div className="space-y-4 flex-grow">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Tanggal</label>
                        <input 
                          type="date" 
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={briefing.tanggal}
                          onChange={(e) => handleBriefingChange(index, 'tanggal', e.target.value)}
                        />
                      </div>
                      
                      {/* UPLOAD FOTO/DOKUMEN BUKTI BRIEFING */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Dokumen Bukti Kehadiran</label>
                        {briefing.foto ? (
                          <div className="relative w-full px-3 py-2 border-2 border-emerald-500 bg-emerald-50/50 rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
                            <div className="flex items-center gap-3 overflow-hidden">
                              {briefing.foto.type.startsWith('image/') ? (
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-200 flex-shrink-0 bg-white shadow-sm">
                                  <img src={URL.createObjectURL(briefing.foto)} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200 flex-shrink-0">
                                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                              )}
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 truncate block">{briefing.foto.name}</span>
                                <span className="text-[10px] font-semibold text-emerald-600">
                                  {(briefing.foto.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => {
                                const newBriefings = [...briefings];
                                newBriefings[index].foto = null;
                                setBriefings(newBriefings);
                              }} 
                              className="text-rose-500 hover:bg-rose-100 p-1.5 rounded-lg transition-colors flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        ) : (
                          <label className="relative w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-400 bg-white hover:bg-emerald-50/50 transition-all cursor-pointer group">
                            <svg className="w-6 h-6 text-emerald-500 mb-2 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-emerald-600 font-bold text-xs mb-0.5">Upload Dokumen</span>
                            <span className="text-slate-400 text-[10px] font-medium text-center leading-tight px-2">Format: JPG, PNG, PDF</span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              onChange={(e) => handleBriefingFileChange(index, e)} 
                              accept="image/*,.pdf,.doc,.docx"
                            />
                          </label>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-8 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi Data...
                  </>
                ) : (
                  'Kirim Evaluasi Excellence'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
