import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'; // IMPORT INI WAJIB UNTUK FULLSCREEN MURNI

export default function CameraPopup({ 
  isOpen, 
  onClose, 
  onCapture, 
  title = "Kamera", 
  statusText = "STATUS: LIVE", 
  defaultFacingMode = "user" 
}) {
  const [facingMode, setFacingMode] = useState(defaultFacingMode);
  const [stream, setStream] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isApiTime, setIsApiTime] = useState(false);
  const [mounted, setMounted] = useState(false); // State untuk React Portal
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Pastikan portal hanya di-render di client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // =====================================
  // SINKRONISASI WAKTU
  // =====================================
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'auto';
      return; 
    }
    
    // Kunci mati scroll body saat kamera aktif
    document.body.style.overflow = 'hidden';

    let timer;
    const syncTime = async () => {
      try {
        const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Jakarta?nocache=${Date.now()}`);
        if (!res.ok) throw new Error("API Waktu down");
        
        const data = await res.json();
        const serverTime = new Date(data.datetime).getTime();
        const localTime = Date.now();
        const offset = serverTime - localTime;

        setIsApiTime(true);
        setCurrentTime(new Date(Date.now() + offset));
        timer = setInterval(() => {
          setCurrentTime(new Date(Date.now() + offset));
        }, 1000);
      } catch (err) {
        console.warn("Gagal sinkron waktu server, pakai jam lokal", err);
        setIsApiTime(false);
        setCurrentTime(new Date());
        timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
      }
    };
    
    syncTime();
    return () => { 
      if (timer) clearInterval(timer); 
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen]);

  const timeString = currentTime 
    ? currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    : '...';
    
  const dateString = currentTime 
    ? currentTime.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'short', year: 'numeric' })
    : '...';

  // =====================================
  // LOGIC KAMERA
  // =====================================
  const startCamera = async (mode) => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    
    try {
      const constraints = { 
        video: { 
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 960 } 
        } 
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setFacingMode(mode);
    } catch (err) {
      console.warn("Kamera gagal dengan mode spesifik, mencoba fallback:", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(fallbackStream);
      } catch (fallbackErr) {
        alert("Gagal membuka kamera. Pastikan izin kamera diberikan.");
        onClose(); 
      }
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => stopCamera();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isOpen, stream]);

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(newMode);
  };

  // =====================================
  // LOGIC CAPTURE & WATERMARK
  // =====================================
  const handleCapture = async () => {
    if (!currentTime) return;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      if (facingMode === 'user') ctx.setTransform(1, 0, 0, 1, 0, 0);

      const padding = canvas.width * 0.03;
      const rectWidth = Math.max(300, canvas.width * 0.35);
      const rectHeight = Math.max(110, canvas.height * 0.15);
      const rectX = padding;
      const rectY = canvas.height - rectHeight - padding;
      const cornerRadius = 12;

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(rectX, rectY, rectWidth, rectHeight, cornerRadius);
        ctx.fill();
      } else {
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
      }
      
      const contentX = rectX + 15;
      let currentY = rectY + 25;

      try {
        const logoImg = new Image();
        logoImg.crossOrigin = "Anonymous"; 
        logoImg.src = 'https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png';
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
        });
        const logoHeight = rectHeight * 0.3;
        const logoWidth = logoImg.width * (logoHeight / logoImg.height);
        ctx.drawImage(logoImg, contentX, currentY, logoWidth, logoHeight); 
        currentY += logoHeight + 15;
      } catch (err) {
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(16, rectHeight * 0.18)}px sans-serif`;
        ctx.fillText("RS SEKAR LARAS", contentX, currentY);
        currentY += 25;
      }
      
      ctx.fillStyle = "#e2e8f0";
      ctx.font = `${Math.max(12, rectHeight * 0.12)}px sans-serif`;
      const fullDateStr = currentTime.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      ctx.fillText(fullDateStr, contentX, currentY);
      currentY += Math.max(16, rectHeight * 0.16);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(14, rectHeight * 0.14)}px sans-serif`;
      ctx.fillText(timeString + ' WIB', contentX, currentY);
      currentY += Math.max(16, rectHeight * 0.16);

      ctx.fillStyle = "#38bdf8"; 
      ctx.font = `bold ${Math.max(11, rectHeight * 0.11)}px sans-serif`;
      const verifiedText = statusText.toUpperCase() + (isApiTime ? " (WAKTU TERVERIFIKASI)" : "");
      ctx.fillText(verifiedText, contentX, currentY);
      
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(photoDataUrl);
      
      stopCamera();
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  // =====================================
  // UI KAMERA - Menggunakan createPortal
  // =====================================
  const modalContent = (
    <div className="fixed inset-0 z-[9999999] bg-black flex flex-col overflow-hidden touch-none h-[100dvh] w-screen">
      
      {/* 1. LAYER VIDEO BAWAH */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-neutral-900">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
        />
      </div>

      {/* 2. HEADER TOP (Batal / Status) */}
      <div className="relative z-10 w-full p-5 sm:p-6 flex justify-between items-start bg-gradient-to-b from-black/70 to-transparent pb-16">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
          <div className={`w-2 h-2 rounded-full ${stream ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          <h3 className="font-semibold text-white text-xs tracking-wider">{title}</h3>
        </div>
        
        <button 
          onClick={() => { stopCamera(); onClose(); }} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 active:scale-90"
          aria-label="Tutup Kamera"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Spacer untuk mendorong konten kontrol ke bawah */}
      <div className="flex-1 pointer-events-none"></div>

      {/* 3. CONTROL PANEL BAWAH (Melayang di atas video) */}
      <div className="relative z-10 w-full flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent pt-12 pb-8 sm:pb-10 px-6">
        
        {/* Preview Watermark (Posisinya pas di atas tombol shutter) */}
        <div className="w-full max-w-sm mx-auto mb-8 pointer-events-none">
          <div className="inline-block bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-2xl text-white">
            <div className="flex items-center gap-2 mb-1.5">
                <img src="https://i.ibb.co.com/nqSwPcP9/LOGO-PANJANG-PNG.png" alt="Logo RSSL" className="h-3.5 w-auto object-contain brightness-0 invert" />
                <span className="text-[10px] text-sky-300 font-bold px-1.5 py-0.5 bg-sky-950/60 rounded uppercase">{statusText}</span>
            </div>
            <div className="text-xs font-medium text-slate-300">{dateString}</div>
            <div className="text-base font-bold tracking-tight mt-0.5">{timeString} WIB</div>
          </div>
        </div>

        {/* Tombol Kamera ala iOS */}
        <div className="flex justify-between items-center max-w-xs mx-auto w-full px-2">
          
          {/* Spacer kiri agar jepretan pas di tengah */}
          <div className="w-12 h-12"></div>

          {/* Tombol Shutter Utama */}
          <button 
            onClick={handleCapture} 
            className="relative flex items-center justify-center w-[76px] h-[76px] rounded-full border-[4px] border-white active:scale-95 transition-transform duration-150 focus:outline-none"
            aria-label="Ambil Foto"
          >
            {/* Inner Circle Putih */}
            <div className="w-[60px] h-[60px] bg-white rounded-full"></div>
          </button>

          {/* Tombol Flip Kamera */}
          <button 
            onClick={toggleCamera} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:rotate-180 duration-500"
            aria-label="Putar Kamera"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
          </button>
          
        </div>
      </div>
      
      {/* Canvas Tersembunyi */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );

  // Lempar langsung ke root <body> biar nggak terperangkap CSS apapun
  return createPortal(modalContent, document.body);
}