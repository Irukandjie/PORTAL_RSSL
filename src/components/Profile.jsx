import React, { useState } from 'react';

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data Profil (Dummy)
  const [profileData, setProfileData] = useState({
    nama: 'Admin IT',
    peran: 'Administrator Sistem',
    email: 'admin@portal.com',
    departemen: 'Information Technology (IT)',
    status: 'Aktif',
    hakAkses: 'Super Admin'
  });

  const [formData, setFormData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...formData });
    setIsModalOpen(false); 
  };

  return (
    <div className="min-h-screen bg-white font-sans animate-fade-in-up">
      
      {/* ---------------- HEADER PROFIL (Warna Biru) ---------------- */}
      <div className="w-full bg-blue-600 py-16 flex flex-col items-center justify-center text-white text-center">
        {/* Avatar */}
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden mb-4 border-4 border-white shadow-md relative">
          <svg className="w-16 h-16 text-blue-300 mt-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">{profileData.nama}</h1>
        <p className="text-blue-200 font-medium">{profileData.peran}</p>
      </div>

      {/* ---------------- KONTEN INFORMASI AKUN ---------------- */}
      <div className="max-w-4xl mx-auto p-6 md:p-10 -mt-6">
        
        <h2 className="text-xl font-extrabold text-slate-800 mb-6 border-b border-slate-100 pb-3">
          Informasi Akun
        </h2>

        {/* Grid 4 Kartu Informasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
            <p className="text-[15px] font-semibold text-slate-800">{profileData.email}</p>
          </div>
          
          <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Departemen</p>
            <p className="text-[15px] font-semibold text-slate-800">{profileData.departemen}</p>
          </div>
          
          <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Kepegawaian</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              <p className="text-[15px] font-semibold text-slate-800">{profileData.status}</p>
            </div>
          </div>
          
          <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hak Akses</p>
            <p className="text-[15px] font-semibold text-slate-800">{profileData.hakAkses}</p>
          </div>

        </div>

        {/* Area Tombol Action */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFormData({ ...profileData }); 
              setIsModalOpen(true);
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm"
          >
            Edit Profil
          </button>
          
          {/* Tombol ini sengaja saya hide/hapus sesuai perintah Anda ("ilangin menu ganti password") */}
          {/* 
          <button className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg shadow-sm transition-colors text-sm">
            Ubah Kata Sandi
          </button> 
          */}
        </div>

      </div>

      {/* ---------------- MODAL EDIT PROFIL ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative border border-slate-200">
            
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Edit Profil</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Tampilan</label>
                <input 
                  type="text" value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input 
                  type="email" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Departemen</label>
                <input 
                  type="text" value={formData.departemen}
                  onChange={(e) => setFormData({...formData, departemen: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                Batal
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                Simpan Perubahan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}