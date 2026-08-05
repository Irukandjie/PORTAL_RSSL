import React, { useState, useEffect } from 'react';

export default function FormKolaboratif({ onBack }) {
  // State untuk 5 foto bukti kolaborasi
  const [files, setFiles] = useState([null, null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Label Foto Bukti Kolaborasi
  const photoLabels = [
    "1. Bukti Briefing Pagi",
    "2. Bukti Rapat Unit",
    "3. Bukti Rapat Mutu",
    "4. Bukti Diskusi Kasus",
    "5. Koordinasi Lintas Profesi"
  ];

  // Handler Upload Foto
  const handleFileChange = (index, e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        alert('Mohon unggah file berupa gambar (JPG/PNG).');
        e.target.value = null;
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar terlalu besar! Maksimal 5MB per foto.');
        e.target.value = null;
        return;
      }
      
      const newFiles = [...files];
      newFiles[index] = selectedFile;
      setFiles(newFiles);
    }
  };

  // Bersihkan memory URL saat komponen unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  // Handler Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi Foto (Minimal harus ada 1 foto yang diupload)
    const hasAtLeastOne = files.some(file => file !== null);
    if (!hasAtLeastOne) {
      alert('Mohon unggah minimal SATU bukti kegiatan kolaboratif Anda minggu ini!');
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
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Laporan Diterima!</h2>
          <p className="text-slate-500 mb-8">
            Terima kasih! Bukti partisipasi kolaboratif Anda telah tercatat di sistem manajemen RS Sekar Laras.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-3.5 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition-colors"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigasi Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-purple-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          
          {/* Header Form */}
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Form Kolaboratif</h1>
              <p className="text-slate-500 text-sm mt-1">Evaluasi partisipasi kegiatan operasional dan profesi</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
              <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Anda wajib mengunggah <strong>minimal 1 bukti foto</strong> dari 5 kegiatan kolaboratif di bawah ini. (Format JPG/PNG, maks 5MB per foto).</p>
            </div>

            {/* Grid 5 Slot Upload Foto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {files.map((file, index) => (
                <div key={index} className={`flex flex-col ${index === 4 ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{photoLabels[index]}</label>
                  
                  <div className={`relative h-48 flex justify-center items-center px-6 py-6 border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${file ? 'border-purple-500 bg-black' : 'border-slate-300 hover:border-purple-500 hover:bg-purple-50/50'}`}>
                    
                    {file ? (
                      <>
                        <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow text-sm hover:bg-purple-700 transition-colors">
                            Ganti Foto
                            <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(index, e)} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2 text-center">
                        <svg className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer bg-transparent rounded-md font-bold text-purple-600 hover:text-purple-500 focus-within:outline-none">
                            <span>Pilih Foto</span>
                            <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(index, e)} />
                          </label>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi & Mengunggah...
                  </>
                ) : (
                  'Kirim Bukti Kolaboratif'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}