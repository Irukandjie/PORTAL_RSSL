import React from 'react';

export default function LoginForm({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <img className="h-24 w-auto drop-shadow-md hover:scale-105 transition-transform duration-300" src="https://i.ibb.co.com/XZpfgCKT/LOGO-KOTAK-PNG.png" alt="Logo Portal RSSL" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Silakan masuk ke akun Portal RSSL Anda</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700">Email / Username</label>
              <div className="mt-2">
                <input type="email" className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" placeholder="admin@portal.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Kata Sandi</label>
              <div className="mt-2">
                <input type="password" className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                <label className="ml-2 block text-sm text-slate-600 cursor-pointer">Ingat saya</label>
              </div>
              <div className="text-sm">
                <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">Lupa sandi?</button>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onLogin(); // Trigger pindah ke Landing Page
                }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Masuk Sekarang
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}