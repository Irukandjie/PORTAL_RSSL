import React, { useState, useRef, useEffect } from 'react';

export default function FormResponsive({ onBack }) {
  // State form
  const [kategori, setKategori] = useState(''); 
  const [file, setFile] = useState(null); // Bisa nyimpen string (Base64 dari kamera) atau Object (File upload)
  const [narasi, setNarasi] = useState(''); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State Kamera & Waktu (Untuk Kategori IT)
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // Default kamera belakang
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  // =====================================
  // ANTI MANIPULASI WAKTU (SISTEM OFFSET)
  // =====================================
  useEffect(() => {
    let timer;
    const syncTime = async () => {
      try {
        const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Jakarta?nocache=${Date.now()}`);
        if (!res.ok) throw new Error("API Waktu down");
        const data = await res.json();
        const serverTime = new Date(data.datetime).getTime();
        const localTime = Date.now();
        const offset = serverTime - localTime;

        setCurrentTime(new Date(Date.now() + offset));
        timer = setInterval(() => {
          setCurrentTime(new Date(Date.now() + offset));
        }, 1000);
      } catch (err) {
        console.warn("Gagal sinkron waktu server, pakai jam lokal", err);
        setCurrentTime(new Date());
        timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
      }
    };
    syncTime();
    return () => { if (timer) clearInterval(timer); };
  }, []);

  const timeString = currentTime 
    ? currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' WIB'
    : 'Memuat Waktu...';
    
  const dateString = currentTime 
    ? currentTime.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Menyinkronkan...';

  // Daftar Opsi Kategori
  const kategoriOptions = [
    { 
      id: 'tulang_ikan', 
      label: 'Internal (Tulang Ikan)', 
      desc: 'Analisis akar masalah (RCA)',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
    },
    { 
      id: 'perbaikan_sarana', 
      label: 'Perbaikan Sarana', 
      desc: 'Fasilitas & alat medis RS',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' 
    },
    { 
      id: 'perbaikan_it', 
      label: 'IT (ERM & SIMRS)', 
      desc: 'Jaringan & error sistem',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    }
  ];

  // =====================================
  // LOGIC KAMERA (KHUSUS IT)
  // =====================================
  const startCamera = async (mode = facingMode) => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
      setStream(mediaStream);
      setFacingMode(mode);
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Kamera gagal dengan mode spesifik, mencoba fallback:", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(fallbackStream);
        setIsCameraActive(true);
      } catch (fallbackErr) {
        alert("Gagal membuka kamera. Pastikan browser Anda memiliki izin untuk menggunakan kamera.");
      }
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
    if (stream) stream.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    if (!currentTime) {
      alert("Tunggu sebentar, sedang verifikasi jam asli...");
      return;
    }
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Mirror effect untuk kamera depan (selfie)
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Kembalikan transformasi agar tulisan watermark tidak terbalik
      if (facingMode === 'user') {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      
      // Watermark Hitam Transparan
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(20, canvas.height - 140, 320, 120); 
      
      // Logo RSSL
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = "Anonymous"; 
        logoImg.src = 'https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png';
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
        });
        ctx.drawImage(logoImg, 35, canvas.height - 125, 200, 40); 
      } catch (err) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.fillText("🏥 RS SEKAR LARAS", 35, canvas.height - 105);
      }
      
      // Teks Waktu & Tanggal
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "14px Arial";
      ctx.fillText(dateString, 35, canvas.height - 70);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(timeString, 35, canvas.height - 50);

      ctx.fillStyle = "#818cf8"; // Warna Indigo
      ctx.font = "bold 14px Arial";
      ctx.fillText("STATUS: LAPORAN IT", 35, canvas.height - 30);
      
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setFile(photoDataUrl); // Simpan Base64 string ke state
      stopCamera();
    }
  };

  // =====================================
  // LOGIC UPLOAD FILE (UMUM)
  // =====================================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 25 * 1024 * 1024) { // Max 25MB untuk video
        alert('Ukuran file terlalu besar! Maksimal 25MB.');
        e.target.value = null;
        return;
      }
      setFile(selectedFile); // Simpan object File ke state
    }
  };

  // Logic Klik Kategori (AUTO BYPASS KAMERA UNTUK IT)
  const handleKategoriClick = (id) => {
    setKategori(id);
    // Jika pilih IT dan belum ada file, langsung buka kamera
    if (id === 'perbaikan_it' && !file) {
      startCamera();
    }
  };

  useEffect(() => {
    return () => {
      // Clean up blob url kalau pakai file normal
      if (file && typeof file !== 'string' && file.type.startsWith('image/')) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  // =====================================
  // LOGIC SUBMIT FORM
  // =====================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kategori) return alert('Mohon pilih Kategori Laporan terlebih dahulu!');
    if (!file) return alert('Mohon unggah bukti foto atau dokumen permasalahan!');
    if (!narasi.trim()) return alert('Mohon lengkapi narasi laporan permasalahan!');
    
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Laporan Diterima!</h2>
          <p className="text-slate-500 mb-8">
            Terima kasih! Laporan Anda beserta file buktinya telah masuk ke sistem dan akan segera ditindaklanjuti.
          </p>
          <button onClick={onBack} className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-colors">
            Kembali ke Katalog Formulir
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // UI UTAMA
  // =====================================
  return (
    <div className="min-h-screen bg-slate-50 py-10 animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <button onClick={() => { stopCamera(); onBack(); }} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </button>

        {/* =========================================================
            OVERLAY KAMERA ESTETIK (KHUSUS IT)
            ========================================================= */}
        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative border border-slate-700">
              
              <div className="px-5 py-4 flex justify-between items-center bg-slate-800 absolute top-0 w-full z-20 shadow-sm border-b border-slate-700">
                <span className="text-white font-bold tracking-wide text-[10px] bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-500/30 truncate">
                  Kamera Laporan IT
                </span>
                
                <div className="flex gap-2">
                  {/* Tombol Flip Camera */}
                  <button onClick={toggleCamera} className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors shadow-sm" title="Ubah Kamera">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                  {/* Tombol Close */}
                  <button onClick={stopCamera} className="bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full transition-colors shadow-sm" title="Tutup Kamera">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-[3/4] max-h-[60vh] bg-black flex items-center justify-center overflow-hidden mt-16">
                <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} />
                
                <div className="absolute inset-0 pointer-events-none p-6 opacity-60">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br-xl"></div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white pointer-events-none">
                  <div className="mb-1"><img src="https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png" alt="Logo" className="h-5 object-contain" /></div>
                  <div className="text-[10px] text-slate-300 mb-0.5">{dateString}</div>
                  <div className="text-sm font-bold text-white mb-1.5">{timeString}</div>
                  <div className="inline-block bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border border-indigo-500/50">STATUS: LAPORAN IT</div>
                </div>
              </div>

              <div className="bg-slate-800 p-5 flex flex-col items-center justify-center border-t border-slate-700">
                <button onClick={capturePhoto} className="relative flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-slate-300 hover:border-indigo-400 transition-colors duration-300 focus:outline-none">
                  <div className="w-12 h-12 bg-white rounded-full transition-all duration-200 active:scale-75 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </button>
                <p className="mt-3 text-slate-400 font-bold tracking-widest uppercase text-[10px]">Ketuk Untuk Jepret</p>
              </div>
              
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* =========================================================
            PREVIEW HASIL FOTO (Kamera IT)
            ========================================================= */}
        {file && typeof file === 'string' && !isSuccess && !isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in p-6">
            <h2 className="text-white text-2xl font-bold mb-6">Preview Laporan IT</h2>
            <div className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 mb-8 max-h-[60vh] flex items-center justify-center bg-black">
              <img src={file} alt="Hasil Jepretan" className="w-full h-auto max-h-full object-contain" />
            </div>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={() => startCamera(facingMode)} className="flex-1 py-4 bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-600 transition-colors shadow-lg">
                Foto Ulang
              </button>
              <button onClick={() => setFile(file)} className="flex-1 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
                Simpan & Lanjut
              </button>
            </div>
          </div>
        )}

        {/* Card Form */}
        {!isCameraActive && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Form Responsive</h1>
                <p className="text-slate-500 text-sm mt-1">Pelaporan Kondisi, Insiden Keselamatan & Sarana</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* OPSI KATEGORI LAPORAN */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Kategori Laporan <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {kategoriOptions.map((opt) => {
                    const isActive = kategori === opt.id;
                    return (
                      <div 
                        key={opt.id}
                        onClick={() => handleKategoriClick(opt.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 ${
                          isActive 
                            ? 'border-indigo-500 bg-indigo-50/50 shadow-md transform -translate-y-1' 
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={opt.icon} />
                          </svg>
                        </div>
                        <div>
                          <div className={`text-sm font-bold mb-1 ${isActive ? 'text-indigo-800' : 'text-slate-700'}`}>
                            {opt.label}
                          </div>
                          <div className={`text-xs ${isActive ? 'text-indigo-600/80' : 'text-slate-400'}`}>
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AREA UPLOAD FILE / FOTO BUKTI */}
              <div className="animate-fade-in-up">
                <label className="block text-sm font-bold text-slate-700 mb-3">Bukti Foto / Video / Dokumen <span className="text-rose-500">*</span></label>
                
                {file ? (
                  <div className="relative w-full p-4 border-2 border-indigo-500 bg-indigo-50/50 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {typeof file === 'string' ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-indigo-200 flex-shrink-0 bg-black shadow-sm">
                          <img src={file} alt="Preview Jepretan" className="w-full h-full object-cover opacity-90" />
                        </div>
                      ) : file.type.startsWith('image/') ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-indigo-200 flex-shrink-0 bg-white shadow-sm">
                          <img src={URL.createObjectURL(file)} alt="Preview Upload" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-200 flex-shrink-0">
                          <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      
                      <div className="truncate">
                        <span className="text-sm font-bold text-slate-800 truncate block mb-0.5">
                          {typeof file === 'string' ? 'Jepretan_Kamera_IT.jpg' : file.name}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">
                          {typeof file === 'string' ? 'Watermarked' : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                        </span>
                      </div>
                    </div>
                    <button type="button" onClick={() => setFile(null)} className="text-rose-500 hover:bg-rose-100 p-2.5 rounded-xl transition-colors flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : kategori === 'perbaikan_it' ? (
                  // TAMPILAN KHUSUS IT (BISA JEPRET ATAU UPLOAD VIDEO TANPA FORCE REAR CAMERA)
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button" 
                      onClick={() => startCamera()}
                      className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-400 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white shadow-sm border border-indigo-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      </div>
                      <span className="text-indigo-700 font-bold text-sm">Jepret Foto Error</span>
                      <span className="text-indigo-400 text-[10px] mt-1">(Otomatis ada Watermark RSSL)</span>
                    </button>

                    <label className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:border-slate-400 hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </div>
                      <span className="text-slate-600 font-bold text-sm">Upload Video / Dokumen</span>
                      <span className="text-slate-400 text-[10px] mt-1">(Khusus rekam layar/jaringan)</span>
                      <input type="file" className="sr-only" onChange={handleFileChange} accept="video/*,image/*,.pdf,.doc,.docx" />
                    </label>
                  </div>
                ) : (
                  // TAMPILAN UPLOAD NORMAL (Untuk Tulang Ikan / Sarana)
                  <label className="relative w-full flex flex-col items-center justify-center px-6 py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <span className="text-indigo-600 font-bold text-[15px] mb-1">Klik untuk Upload File</span>
                    <span className="text-slate-400 text-xs font-medium">Mendukung Foto (JPG/PNG) & Dokumen (PDF)</span>
                    <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
                  </label>
                )}
              </div>

              {/* NARASI LAPORAN */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Narasi / Deskripsi Kejadian <span className="text-rose-500">*</span></label>
                <textarea 
                  rows="5"
                  value={narasi}
                  onChange={(e) => setNarasi(e.target.value)}
                  placeholder="Ceritakan dengan jelas dan detail mengenai kondisi, insiden, atau kerusakan sarana yang terjadi..."
                  className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none text-slate-700 leading-relaxed transition-all shadow-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-100">
                <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'}`}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan Laporan...
                    </>
                  ) : (
                    'Kirim Laporan Responsive'
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}
