import React, { useState, useEffect } from 'react';

export default function FormAmanah({ onBack }) {
  // State untuk mode laporan (false = aman, true = ada pelanggaran)
  const [hasViolation, setHasViolation] = useState(false);
  
  // State form pelanggaran
  const [tanggal, setTanggal] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState(null); // Menyimpan objek file gambar

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // =====================================
  // LOGIC UPLOAD FILE
  // =====================================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        alert('Mohon unggah file berupa gambar (JPG/PNG).');
        e.target.value = null;
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar terlalu besar! Maksimal 5MB.');
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    }
  };

  // Bersihkan memory preview URL saat komponen ditutup atau diganti
  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);


  // =====================================
  // LOGIC SUBMIT FORM
  // =====================================
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi jika melaporkan pelanggaran
    if (hasViolation) {
      if (!tanggal || !deskripsi) {
        alert('Mohon lengkapi tanggal dan deskripsi pelanggaran!');
        return;
      }
      if (!file) {
        alert('Mohon sertakan bukti foto/dokumen pelanggaran!');
        return;
      }
    }
    
    setIsSubmitting(true);
    // Simulasi loading ngirim data ke server 2 detik
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
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Laporan Tersimpan!</h2>
          <p className="text-slate-500 mb-8">
            {hasViolation 
              ? "Laporan pelanggaran SOP/Tata Tertib Anda telah dicatat beserta dokumen buktinya untuk ditindaklanjuti oleh manajemen RS Sekar Laras."
              : "Terima kasih telah mematuhi SOP dan Etika Profesi RS Sekar Laras. Pertahankan kinerja Anda!"}
          </p>
          <button onClick={onBack} className="w-full py-3.5 bg-yellow-500 text-white font-bold rounded-xl shadow-md hover:bg-yellow-600 transition-colors">
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
        <button onClick={onBack} className="group flex items-center gap-2 mb-8 text-slate-500 hover:text-yellow-600 transition-colors font-medium">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Form Amanah</h1>
              <p className="text-slate-500 text-sm mt-1">Kepatuhan Peraturan, SOP, dan Etika Profesi</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-600 text-sm leading-relaxed">
              Pegawai diharapkan selalu mematuhi peraturan, SOP, etika profesi, dan tata tertib rumah sakit. 
              <strong className="block mt-2 text-slate-800">Perhatian:</strong>
              Anda <strong>tidak perlu</strong> melakukan unggahan dokumen atau foto apabila tidak ada pelanggaran yang dilakukan.
            </div>

            {/* Pilihan Deklarasi */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Deklarasi Kepatuhan Kinerja</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Opsi Aman */}
                <div 
                  onClick={() => setHasViolation(false)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 ${!hasViolation ? 'border-yellow-500 bg-yellow-50 shadow-[0_4px_20px_rgba(234,179,8,0.1)]' : 'border-slate-200 hover:border-yellow-300 hover:bg-slate-50'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${!hasViolation ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className={`font-bold ${!hasViolation ? 'text-yellow-700' : 'text-slate-700'}`}>Sesuai Prosedur</h3>
                    <p className="text-xs text-slate-500 mt-1">Tidak ada pelanggaran SOP/Aturan</p>
                  </div>
                </div>

                {/* Opsi Pelanggaran */}
                <div 
                  onClick={() => setHasViolation(true)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 ${hasViolation ? 'border-rose-500 bg-rose-50 shadow-[0_4px_20px_rgba(244,63,94,0.1)]' : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${hasViolation ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div>
                    <h3 className={`font-bold ${hasViolation ? 'text-rose-700' : 'text-slate-700'}`}>Lapor Pelanggaran</h3>
                    <p className="text-xs text-slate-500 mt-1">Ada insiden/pelanggaran aturan</p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM PELANGGARAN (HANYA MUNCUL JIKA hasViolation = true) */}
            {hasViolation && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6 animate-fade-in-up">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-3">Detail Laporan Pelanggaran</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Kejadian <span className="text-rose-500">*</span></label>
                    <input 
                      type="date" 
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                  </div>
                  
                  {/* UPLOAD FOTO/DOKUMEN (BUKAN LIVE CAMERA) */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Bukti Foto / Dokumen <span className="text-rose-500">*</span></label>
                    <div className="flex items-center">
                      {file ? (
                        <div className="relative w-full h-[52px] px-4 py-2 border border-yellow-300 bg-yellow-50 rounded-xl flex items-center justify-between shadow-sm">
                           <div className="flex items-center gap-3 overflow-hidden">
                             <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                             <span className="text-sm font-semibold text-yellow-800 truncate">{file.name}</span>
                           </div>
                           <button type="button" onClick={() => setFile(null)} className="text-rose-500 hover:bg-rose-100 p-1.5 rounded-md transition-colors flex-shrink-0">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                        </div>
                      ) : (
                        <div className="relative w-full">
                          <label className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-yellow-300 text-yellow-600 font-bold rounded-xl hover:bg-yellow-50 hover:shadow-md transition-all cursor-pointer">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            Pilih Foto / Dokumen
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="sr-only" 
                              onChange={handleFileChange} 
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Pelanggaran <span className="text-rose-500">*</span></label>
                  <textarea 
                    rows="3"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Jelaskan secara singkat SOP atau tata tertib yang dilanggar..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100">
              <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white shadow-md transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg hover:-translate-y-0.5'}`}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan Laporan...
                  </>
                ) : (
                  hasViolation ? 'Kirim Laporan Pelanggaran' : 'Kirim Form (Tidak Ada Pelanggaran)'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}