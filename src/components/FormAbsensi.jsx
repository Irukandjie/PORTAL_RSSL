import React, { useState, useRef, useEffect } from 'react';

export default function FormAbsensi({ onBack }) {
  // State Absensi
  const [activeType, setActiveType] = useState(null); // 'masuk' | 'pulang' | 'lembur-in' | 'lembur-out'
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State Kamera & Waktu
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update jam real-time setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Waktu & Tanggal
  const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
  const dateString = currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const absenCards = [
    { id: 'Masuk', title: 'Absen Masuk', desc: 'Mulai shift kerja reguler', color: 'emerald', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
    { id: 'Pulang', title: 'Absen Pulang', desc: 'Akhiri shift kerja reguler', color: 'rose', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
    { id: 'Lembur In', title: 'Lembur IN', desc: 'Mulai jam kerja tambahan', color: 'blue', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'Lembur Out', title: 'Lembur OUT', desc: 'Akhiri jam kerja tambahan', color: 'purple', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' }
  ];

  // =====================================
  // LOGIC KAMERA & WATERMARK CANVAS
  // =====================================
  const startCamera = async (type) => {
    setActiveType(type);
    setCapturedPhoto(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err) {
      alert("Kamera tidak dapat diakses. Pastikan izin kamera aktif.");
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
      
      // 1. Gambar frame video asli ke canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 2. Gambar Background Watermark (Hitam transparan)
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(20, canvas.height - 140, 320, 120); // Disesuaikan tingginya buat logo
      
      // 3. Load dan Gambar Logo RS
      // Pake Promise biar canvas nunggu gambarnya keload dulu sebelum di-draw
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = "Anonymous"; // Biar ga kena error CORS pas save toDataURL
        logoImg.src = 'https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png';
        
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
        });

        // Draw logo (X, Y, Lebar, Tinggi) -> Disesuaikan posisinya
        ctx.drawImage(logoImg, 35, canvas.height - 125, 200, 40); 
      } catch (err) {
        console.error("Gagal load logo watermark", err);
        // Fallback teks kalau gambar gagal load
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.fillText("🏥 RS SEKAR LARAS", 35, canvas.height - 105);
      }
      
      // 4. Tambahkan Teks Watermark Lainnya
      // Tanggal
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "14px Arial";
      ctx.fillText(dateString, 35, canvas.height - 70);
      
      // Jam
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(timeString, 35, canvas.height - 50);

      // Jenis Absen
      ctx.fillStyle = "#38bdf8"; // emerald/cyan
      ctx.font = "bold 14px Arial";
      ctx.fillText(`STATUS: ABSEN ${activeType.toUpperCase()}`, 35, canvas.height - 30);
      
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
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
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
            KAMERA PHOTOBOOTH OVERLAY
            ========================================================= */}
        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
            <div className="absolute top-6 left-6 text-white font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30 uppercase tracking-widest text-sm">
              Absen {activeType}
            </div>
            <button onClick={stopCamera} className="absolute top-6 right-6 text-white bg-white/20 hover:bg-rose-500 p-3 rounded-full backdrop-blur-sm transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/20">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-105" />
              
              {/* Overlay Watermark (UI Preview) */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-lg">
                <div className="mb-2">
                   <img src="https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png" alt="Logo RS" className="h-8 object-contain" />
                </div>
                <div className="text-xs text-slate-300 mb-1">{dateString}</div>
                <div className="text-base font-bold text-white mb-2">{timeString}</div>
                <div className="inline-block bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/50">
                  ABSEN: {activeType}
                </div>
              </div>

              {/* Bracket Scanner Tengah */}
              <div className="absolute inset-0 pointer-events-none p-6 opacity-40">
                <div className="w-full h-full relative border-2 border-white/30 rounded-3xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Jepret */}
            <div className="mt-8 flex flex-col items-center">
              <button onClick={capturePhoto} className="relative flex items-center justify-center w-20 h-20 rounded-full border-[4px] border-white/80 hover:border-emerald-400 transition-colors duration-300 group focus:outline-none">
                <div className="w-16 h-16 bg-white rounded-full transition-all duration-200 transform group-hover:scale-90 group-active:scale-75 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
              </button>
              <p className="mt-4 text-white/80 font-bold tracking-widest uppercase text-[10px] animate-pulse">Ketuk Untuk Jepret</p>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* =========================================================
            PREVIEW HASIL FOTO SEBELUM SUBMIT
            ========================================================= */}
        {capturedPhoto && !isSuccess && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in p-6">
            <h2 className="text-white text-2xl font-bold mb-6">Preview Absensi</h2>
            <div className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 mb-8">
              <img src={capturedPhoto} alt="Hasil Absen" className="w-full h-auto object-cover" />
            </div>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={() => startCamera(activeType)} className="flex-1 py-4 bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-600 transition-colors">
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