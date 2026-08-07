import React, { useState, useEffect } from 'react';

export default function FormResponsive({ onBack }) {
  // State form
  const [kategori, setKategori] = useState(''); // State baru untuk Opsi Laporan
  const [file, setFile] = useState(null); 
  const [narasi, setNarasi] = useState(''); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
  // LOGIC UPLOAD FILE
  // =====================================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 10MB.');
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    return () => {
      if (file && file.type.startsWith('image/')) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  // =====================================
  // LOGIC SUBMIT FORM
  // =====================================
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi baru untuk kategori
    if (!kategori) {
      alert('Mohon pilih Opsi Kategori Laporan terlebih dahulu!');
      return;
    }
    if (!file) {
      alert('Mohon unggah bukti foto atau dokumen permasalahan sebelum mengirim form!');
      return;
    }
    if (!narasi.trim()) {
      alert('Mohon lengkapi narasi laporan permasalahan!');
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
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Laporan Diterima!</h2>
          <p className="text-slate-500 mb-8">
            Terima kasih! Laporan Anda beserta file buktinya telah masuk ke sistem dan akan segera ditindaklanjuti oleh manajemen RS Sekar Laras.
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
        
        {/* Navigasi Back */}
        <button onClick={onBack} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Card Form */}
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
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-indigo-800 text-sm leading-relaxed flex gap-3">
              <svg className="w-5 h-5 flex-shrink-0 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                Pegawai diwajibkan untuk aktif melaporkan kondisi pasien, insiden keselamatan, atau kerusakan sarana manajemen secara akurat dan tepat waktu.
              </div>
            </div>

            {/* OPSI KATEGORI LAPORAN (BARU) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Kategori Laporan <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {kategoriOptions.map((opt) => {
                  const isActive = kategori === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => setKategori(opt.id)}
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
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Bukti Foto / Dokumen Laporan <span className="text-rose-500">*</span></label>
              
              {file ? (
                <div className="relative w-full p-4 border-2 border-indigo-500 bg-indigo-50/50 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
                  <div className="flex items-center gap-4 overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-indigo-200 flex-shrink-0 bg-white shadow-sm">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-200 flex-shrink-0">
                        <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="truncate">
                      <span className="text-sm font-bold text-slate-800 truncate block mb-0.5">{file.name}</span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setFile(null)} 
                    className="text-rose-500 hover:bg-rose-100 p-2.5 rounded-xl transition-colors flex-shrink-0"
                    title="Hapus File"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <label className="relative w-full flex flex-col items-center justify-center px-6 py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <span className="text-indigo-600 font-bold text-[15px] mb-1">Klik untuk Upload File</span>
                  <span className="text-slate-400 text-xs font-medium">Mendukung Foto (JPG/PNG) & Dokumen (PDF)</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf,.doc,.docx"
                  />
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
      </div>
    </div>
  );
}
