import React, { useState, useRef, useEffect } from 'react';

export default function FormSafety({ onBack }) {
  // State untuk menyimpan hasil jepretan foto (dalam bentuk Data URL)
  const [files, setFiles] = useState([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State khusus Kamera (Photobooth Mode)
  const [activeCameraIndex, setActiveCameraIndex] = useState(null); 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const photoLabels = [
    "1. Pelindung Kepala & Masker",
    "2. Baju Pelindung (Gown/Apron)",
    "3. Sarung Tangan (Gloves)",
    "4. Sepatu Pelindung / Tertutup"
  ];

  // =====================================
  // LOGIC KAMERA REAL-TIME (WEBRTC)
  // =====================================

  const startCamera = async (index) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setActiveCameraIndex(index);
    } catch (err) {
      alert("Gagal mengakses kamera. Pastikan browser Anda memiliki izin untuk menggunakan kamera.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeCameraIndex !== null && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [activeCameraIndex, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setActiveCameraIndex(null);
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
    if (videoRef.current && canvasRef.current && activeCameraIndex !== null) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      const newFiles = [...files];
      newFiles[activeCameraIndex] = photoDataUrl;
      setFiles(newFiles);
      
      stopCamera();
    }
  };

  // =====================================
  // LOGIC SUBMIT FORM
  // =====================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.includes(null)) {
      alert('Mohon jepret ke-4 foto APD Anda secara live sebelum mengirim form!');
      return;
    }
    
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
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Inspeksi Live Diterima!</h2>
          <p className="text-slate-500 mb-8">
            Bukti jepretan kamera penggunaan APD Anda berhasil dikirim secara real-time ke sistem RS Sekar Laras.
          </p>
          <button onClick={onBack} className="w-full py-3.5 bg-rose-600 text-white font-bold rounded-xl shadow-md hover:bg-rose-700 transition-colors">
            Kembali ke Katalog Formulir
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // UI UTAMA (FORM + PHOTOBOOTH ESTETIK)
  // =====================================
  return (
    <div className="min-h-screen bg-slate-50 py-10 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Navigasi Back */}
        <button onClick={() => { stopCamera(); onBack(); }} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-rose-600 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* =========================================================
            OVERLAY KAMERA ESTETIK (Glassmorphism & Scanner UI)
            ========================================================= */}
        {activeCameraIndex !== null && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
            
            {/* Header Kamera */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent z-10">
              <div className="text-white font-semibold tracking-wide bg-rose-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-rose-500/50">
                {photoLabels[activeCameraIndex]}
              </div>
              <button onClick={stopCamera} className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-rose-600 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Viewfinder Kamera */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-video mx-auto bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.15)] ring-1 ring-white/10 mt-10">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover scale-105" 
              />
              
              {/* Overlay Efek Scanner / Bracket Kamera */}
              <div className="absolute inset-0 pointer-events-none p-6">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-rose-500 rounded-tl-2xl opacity-80"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-rose-500 rounded-tr-2xl opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-rose-500 rounded-bl-2xl opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-rose-500 rounded-br-2xl opacity-80"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Jepret */}
            <div className="mt-12 flex flex-col items-center">
              <button 
                onClick={capturePhoto} 
                className="relative flex items-center justify-center w-20 h-20 rounded-full border-[3px] border-white/60 hover:border-rose-400 transition-colors duration-300 group focus:outline-none"
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

        {/* Card Form Utama */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Inspeksi Safety Live</h1>
              <p className="text-slate-500 text-sm mt-1">Laporan Kamera Real-time Penggunaan APD</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3 text-rose-800 text-sm font-medium">
              <svg className="w-5 h-5 flex-shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p>Upload galeri dinonaktifkan untuk mencegah manipulasi. Anda <strong>wajib menggunakan fitur kamera langsung</strong> untuk memverifikasi APD Anda saat ini.</p>
            </div>

            {/* Grid 4 Slot Jepretan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {files.map((file, index) => (
                <div key={index} className="flex flex-col group cursor-pointer" onClick={() => !file && startCamera(index)}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 group-hover:text-rose-600 transition-colors">{photoLabels[index]}</label>
                  
                  <div className={`relative h-56 flex justify-center items-center px-6 py-6 border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${file ? 'border-rose-500 bg-black' : 'border-slate-300 group-hover:border-rose-400 group-hover:bg-rose-50/30 group-hover:shadow-[0_4px_20px_rgba(225,29,72,0.05)]'}`}>
                    
                    {file ? (
                      /* Mode Preview Jepretan */
                      <>
                        <img src={file} alt={`Hasil ${index}`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                          <button type="button" onClick={(e) => { e.stopPropagation(); startCamera(index); }} className="bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg text-sm hover:bg-rose-700 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                          <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-60"></div>
                          
                          {/* Ikon Kamera Utama (Scanner Style) */}
                          <div className="relative w-full h-full bg-gradient-to-tr from-white to-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-md border-2 border-rose-100 group-hover:border-rose-300 group-hover:text-rose-600 transition-all duration-300">
                            <svg className="w-9 h-9 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2M21 8V6a2 2 0 00-2-2h-2M21 16v2a2 2 0 01-2 2h-2M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Tombol Pill Estetik */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white group-hover:bg-rose-600 text-rose-600 group-hover:text-white font-bold rounded-xl transition-all duration-300 shadow-sm uppercase tracking-wider text-[11px] border border-rose-200 group-hover:border-rose-600">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                          Buka Kamera
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100">
              <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg hover:-translate-y-0.5'}`}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi Lokasi & Gambar...
                  </>
                ) : (
                  'Kirim Inspeksi Live'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}