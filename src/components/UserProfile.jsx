import React from 'react';

export default function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header Profil dengan Background Biru */}
        <div className="bg-blue-600 px-8 py-12 text-center relative">
          <div className="absolute inset-0 bg-blue-700 opacity-20 pattern-diagonal-lines"></div>
          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar Besar */}
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center border-4 border-blue-100 shadow-lg mb-4">
              <svg className="h-12 w-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin IT</h1>
            <p className="text-blue-100 mt-1 font-medium">Administrator Sistem</p>
          </div>
        </div>

        {/* Informasi Detail Profil */}
        <div className="px-8 py-10 bg-white">
          <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Informasi Akun</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-slate-800 font-medium">admin@portal.com</p>
            </div>
            
            {/* Info 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Departemen</p>
              <p className="text-slate-800 font-medium">Information Technology (IT)</p>
            </div>
            
            {/* Info 3 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status Kepegawaian</p>
              <p className="text-slate-800 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Aktif
              </p>
            </div>

            {/* Info 4 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Hak Akses</p>
              <p className="text-slate-800 font-medium">Super Admin</p>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Edit Profil
            </button>
            <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              Ubah Kata Sandi
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}