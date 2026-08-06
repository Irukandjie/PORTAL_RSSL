import React, { useState, useRef, useEffect } from 'react';

export default function FormAbsensi({ onBack }) {
  // State Absensi
  const [activeType, setActiveType] = useState(null); // 'Masuk' | 'Pulang' | 'Lembur In' | 'Lembur Out'
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State Kamera & Waktu (DI-SET DEFAULT KE 'user' UNTUK KAMERA DEPAN)
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode] = useState('user'); 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update jam real-time setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // =====================================
  // KUNCI WAKTU KE UTC+7 (WIB) 
  // MENCEGAH MANIPULASI ZONA WAKTU DI HP
  // =====================================
  const timeString = currentTime.toLocaleTimeString('id-ID', { 
    timeZone: 'Asia/Jakarta', // Kunci ke WIB (UTC+7)
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false
  }) + ' WIB';
  
  const dateString = currentTime.toLocaleDateString('id-ID', { 
    timeZone: 'Asia/Jakarta', // Kunci ke WIB (UTC+7)
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const absenCards = [
    { id: 'Masuk', title: 'Absen Masuk', desc: 'Mulai shift kerja reguler', color: 'emerald', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
    { id: 'Pulang', title: 'Absen Pulang', desc: 'Akhiri shift kerja reguler', color: 'rose', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
    { id: 'Lembur In', title: 'Lembur IN', desc: 'Mulai jam kerja tambahan', color: 'blue', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'Lembur Out', title: 'Lembur OUT', desc: 'Akhiri jam kerja tambahan', color: 'purple', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' }
  ];

  // =====================================
  // LOGIC KAMERA (AUTO BYPASS KE DEPAN)
  // =====================================
  const startCamera = async (type) => {
    if (type) setActiveType(type);
    setCapturedPhoto(null);
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      // Auto bypass langsung minta kamera depan ('user')
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Gagal membuka kamera depan spesifik, mencoba fallback default...", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        setStream(fallbackStream);
        setIsCameraActive(true);
      } catch (fallbackErr) {
        alert(`Kamera Gagal Diakses!\n\nAlasan: ${fallbackErr.name} - ${fallbackErr.message}\n\nSolusi: Klik ikon Gembok (🔒) di URL bar atas, pilih 'Permissions / Izin', dan pastikan Kamera di-Set ke 'Allow / Izinkan'.`);
      }
    }
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

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Karena pakai kamera depan, flip canvas secara horizontal biar hasil foto nggak terbalik
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      
      // 1. Gambar frame video asli ke canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Kembalikan transformasi canvas ke normal sebelum menggambar watermark teks
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      // 2. Gambar Background Watermark (Hitam transparan)
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(20, canvas.height - 140, 320, 120); 
      
      // 3. Load dan Gambar Logo RS
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
        console.error("Gagal load logo watermark", err);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.fillText("🏥 RS SEKAR LARAS", 35, canvas.height - 105);
      }
      
      // 4. Tambahkan Teks Watermark Lainnya yang sudah dikunci ke UTC+7
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "14px Arial";
      ctx.fillText(dateString, 35, canvas.height - 70);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(timeString, 35, canvas.height - 50);

      ctx.fillStyle = "#38bdf8"; 
      ctx.font = "bold 14px Arial";
      ctx.fillText(`STATUS: ABSEN ${activeType?.toUpperCase()}`, 35, canvas.height - 30);
      
      // Convert ke Data URL (JPEG)
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedPhoto(photoDataUrl);
      stopCamera();
    }
  };

  const handleSubmit = () => {
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
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Absen Berhasil!</h2>
          <p className="text-slate-500 mb-8">
            Data {activeType} Anda beserta foto timestamp telah terekam di server HRD. Selamat melanjutkan aktivitas!
          </p>
          <button onClick={onBack} className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl shadow-md hover:bg-slate-900 transition-colors">
            Kembali ke Dashboard
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <button onClick={() => { stopCamera(); onBack(); }} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </button>

        {/* =========================================================
            OVERLAY KAMERA ESTETIK (Model POPUP Anti-Scroll - AUTO DEPAN)
            ========================================================= */}
        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative border border-slate-700">
              
              {/* Header Action di dalam Popup */}
              <div className="px-5 py-4 flex justify-between items-center bg-slate-800 absolute top-0 w-full z-20 shadow-sm border-b border-slate-700">
                <span className="text-white font-bold tracking-wide text-xs bg-sky-500/20 text-sky-400 px-3 py-1.5 rounded-lg border border-sky-500/30 truncate max-w-[70%]">
                  Absen {activeType} (Kamera Depan)
                </span>
                
                <button onClick={stopCamera} className="bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Viewfinder Kamera (Di-mirror otomatis biar pas selfie) */}
              <div className="relative w-full aspect-[3/4] max-h-[60vh] bg-black flex items-center justify-center overflow-hidden mt-16">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]" 
                />
                
                {/* Overlay Efek Scanner Bracket */}
                <div className="absolute inset-0 pointer-events-none p-6 opacity-60">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-sky-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-sky-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-sky-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-sky-500 rounded-br-xl"></div>
                  </div>
                </div>

                {/* Overlay UI Preview Watermark */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white pointer-events-none">
                  <div className="mb-1">
                     <img src="https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png" alt="Logo RS" className="h-5 object-contain" />
                  </div>
                  <div className="text-[10px] text-slate-300 mb-0.5">{dateString}</div>
                  <div className="text-sm font-bold text-white mb-1.5">{timeString}</div>
                  <div className="inline-block bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border border-sky-500/50">
                    STATUS: ABSEN {activeType?.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Tombol Jepret Area */}
              <div className="bg-slate-800 p-5 flex flex-col items-center justify-center">
                <button 
                  onClick={capturePhoto} 
                  className="relative flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-slate-300 hover:border-sky-400 transition-colors duration-300 focus:outline-none"
                >
                  <div className="w-12 h-12 bg-white rounded-full transition-all duration-200 active:scale-75 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </button>
                <p className="mt-3 text-slate-400 font-bold tracking-widest uppercase text-[10px]">
                  Ketuk Untuk Jepret
                </p>
              </div>
              
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* =========================================================
            PREVIEW HASIL FOTO SEBELUM SUBMIT
            ========================================================= */}
        {capturedPhoto && !isSuccess && !isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in p-6">
            <h2 className="text-white text-2xl font-bold mb-6">Preview Absensi</h2>
            <div className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 mb-8 max-h-[60vh] flex items-center justify-center bg-black">
              <img src={capturedPhoto} alt="Hasil Absen" className="w-full h-auto max-h-full object-contain" />
            </div>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={() => startCamera(activeType)} className="flex-1 py-4 bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-600 transition-colors shadow-lg">
                Foto Ulang
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                {isSubmitting ? 'Loading...' : 'Kirim Absen'}
              </button>
            </div>
          </div>
        )}

        {/* HEADER & GRID CARD */}
        {!isCameraActive && !capturedPhoto && (
          <>
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
                  onClick={() => startCamera(card.id)}
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
          </>
        )}

      </div>
    </div>
  );
}
