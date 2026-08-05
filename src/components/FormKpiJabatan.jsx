import React, { useState } from 'react';

export default function FormKpiJabatan({ onBack }) {
  const [file, setFile] = useState(null);
  const [narasi, setNarasi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Logic Validasi File Max 10MB
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File terlalu besar! Maksimal ukuran file adalah 10 MB.');
        e.target.value = null; // Reset input
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  // Logic Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !narasi) {
      alert('Mohon unggah dokumen dan lengkapi narasi pekerjaan Anda!');
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
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Terkirim!</h2>
          <p className="text-slate-500 mb-8">
            Formulir KPI Jabatan Anda berhasil dikirim ke sistem manajemen RS Sekar Laras untuk ditinjau.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigasi Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Form KPI Jabatan</h1>
              <p className="text-slate-500 text-sm mt-1">Evaluasi Sasaran Keselamatan Pasien (SKP)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Upload File */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Unggah Dokumen Bukti Kerja (Max 10MB)</label>
              <p className="text-xs text-slate-500 mb-3">Format yang didukung: PDF, DOCX, JPG, PNG.</p>
              
              <div className="relative flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors">
                <div className="space-y-2 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Pilih file</span>
                      <input type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">atau *drag and drop* ke sini</p>
                  </div>
                  {file ? (
                    <p className="text-sm font-bold text-emerald-600">{file.name}</p>
                  ) : (
                    <p className="text-xs text-slate-500">Belum ada file yang dipilih</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Text Area Narasi */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Narasi Penjelasan Pekerjaan (1 Minggu Terakhir)</label>
              <textarea 
                rows="5"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                placeholder="Ceritakan secara detail kegiatan, pencapaian, dan kendala yang Anda alami minggu ini terkait implementasi Sasaran Keselamatan Pasien..."
                value={narasi}
                onChange={(e) => setNarasi(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengunggah Data...
                  </>
                ) : (
                  'Kirim Formulir KPI'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}