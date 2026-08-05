import React, { useState } from 'react';
import './App.css';

// Import Komponen
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FormCards from './components/FormCards';
import LoadingScreen from './components/LoadingScreen'; 
import FormKpiJabatan from './components/FormKpiJabatan';
import FormSafety from './components/FormSafety'; 
import FormExcellence from './components/FormExcellence'; 
import FormKolaboratif from './components/FormKolaboratif'; 
import FormAmanah from './components/FormAmanah'; 
import FormResponsive from './components/FormResponsive'; 
import FormAbsensi from './components/FormAbsensi'; 
import AdminDashboard from './components/AdminDashboard'; 
import Profile from './components/Profile'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState('home'); 

  // Fungsi navigasi pakai loading
  const navigateWithLoading = (targetPage) => {
    if (activePage === targetPage && isLoggedIn) return;
    setIsLoading(true);
    setTimeout(() => {
      setActivePage(targetPage);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogin = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoggedIn(true);
      // Arahkan pengguna langsung ke Admin Dashboard setelah berhasil login
      setActivePage('admin-dashboard');
      setIsLoading(false);
    }, 2500); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('home');
  };

  if (isLoading) return <LoadingScreen />;
  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* NAVBAR: Sembunyikan jika sedang berada di halaman Admin Dashboard */}
      {activePage !== 'admin-dashboard' && (
        <Navbar 
          activePage={activePage} 
          onNavigate={navigateWithLoading} 
          onLogout={handleLogout} 
        />
      )}

      <div className="flex-grow">
        
        {/* KONTEN TANPA WRAPPER GLOBAL BIAR BISA ANIMASI PER SECTION */}
        {activePage === 'home' && (
          <LandingPage 
            onNavigateToForm={() => navigateWithLoading('form')} 
            onDirectToKpi={() => navigateWithLoading('form-kpi-jabatan')} 
            onDirectToSafety={() => navigateWithLoading('form-safety')}
            onDirectToExcellence={() => navigateWithLoading('form-excellence')}
            onDirectToKolaboratif={() => navigateWithLoading('form-kolaboratif')} 
            onDirectToAmanah={() => navigateWithLoading('form-amanah')}
            onDirectToResponsive={() => navigateWithLoading('form-responsive')} 
          />
        )}
        
        {activePage === 'form' && (
          <FormCards 
            onBack={() => navigateWithLoading('home')} 
            onNavigate={navigateWithLoading} 
          />
        )}
        
        {activePage === 'profile' && <Profile />}

        {/* RUTE ADMIN DASHBOARD */}
        {activePage === 'admin-dashboard' && (
          <AdminDashboard onBack={() => navigateWithLoading('home')} />
        )}
        
        {activePage === 'form-kpi-jabatan' && (
          <FormKpiJabatan onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-safety' && (
          <FormSafety onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-excellence' && (
          <FormExcellence onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-kolaboratif' && (
          <FormKolaboratif onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-amanah' && (
          <FormAmanah onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-responsive' && (
          <FormResponsive onBack={() => navigateWithLoading('form')} />
        )}

        {activePage === 'form-absensi' && (
          <FormAbsensi onBack={() => navigateWithLoading('home')} />
        )}

      </div>
    </div>
  );
}