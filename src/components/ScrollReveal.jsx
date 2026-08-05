import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // Memakai IntersectionObserver buat deteksi elemen masuk ke layar
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Kalau mau animasinya cuma jalan sekali, uncomment baris di bawah ini:
          // observer.unobserve(domRef.current); 
        } else {
          // Kalau mau animasinya ngulang pas di-scroll ke atas lagi, biarkan ini:
          setIsVisible(false);
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  );
}