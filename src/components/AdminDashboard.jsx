import React, { useState } from 'react';

export default function AdminDashboard({ onBack }) {
  // --- STATE UNTUK MOBILE SIDEBAR ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- SIMULATOR AKUN (ADMIN & SUPERADMIN) ---
  const userList = [
    { id: 'alden', nama: 'Alden (IT)', role: 'Admin' },
    { id: 'thalia', nama: 'Thalia (Manajemen)', role: 'Admin' },
    { id: 'stefan', nama: 'Stefan (Kabag Umum)', role: 'Admin' },
    { id: 'dr_angga', nama: 'dr. Angga (Owner)', role: 'Superadmin' },
    { id: 'dr_anita', nama: 'dr. Anita (Owner)', role: 'Superadmin' }
  ];
  const [currentUser, setCurrentUser] = useState(userList[0]);

  // Data User Management
  const [users, setUsers] = useState([
    { id: 1, namaLengkap: 'Alden Christian', username: 'alden_it', password: '***', role: 'Admin' },
    { id: 2, namaLengkap: 'Thalia Putri', username: 'thalia_mng', password: '***', role: 'Admin' },
    { id: 3, namaLengkap: 'Stefan William', username: 'stefan_umum', password: '***', role: 'Admin' },
    { id: 4, namaLengkap: 'dr. Angga', username: 'dr_angga', password: '***', role: 'Superadmin' },
    { id: 5, namaLengkap: 'dr. Anita', username: 'dr_anita', password: '***', role: 'Superadmin' },
  ]);

  // Mock Data Submissions
  const [submissions] = useState([
    { id: 1, nama: 'Alden Christian', jabatan: 'IT Support', form: 'Absensi', waktu: 'Hari ini, 07:45 WIB', status: 'Hadir', badge: 'bg-emerald-100 text-emerald-700', foto: 'https://i.pravatar.cc/150?img=11', jam_masuk: '07:45 WIB', jam_pulang: '17:00 WIB', lembur_in: '-', lembur_out: '-', foto_bukti: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Perawat IGD', form: 'Safety', waktu: 'Hari ini, 08:15 WIB', status: 'Sesuai SOP', badge: 'bg-green-100 text-green-700', foto: 'https://i.pravatar.cc/150?img=5', apd: { kepala: 'https://images.unsplash.com/photo-1584982751601-97d883f51524?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', baju: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', sarung_tangan: 'https://images.unsplash.com/photo-1583947581924-860bda6a45df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', sepatu: 'https://images.unsplash.com/photo-1605810756784-90fbce856988?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' } },
    { id: 3, nama: 'Budi Santoso', jabatan: 'Staff Farmasi', form: 'KPI Jabatan', waktu: 'Hari ini, 09:30 WIB', status: 'Menunggu Review', badge: 'bg-amber-100 text-amber-700', foto: 'https://i.pravatar.cc/150?img=12', file_upload: 'Dokumen_KPI_Juli_2026.pdf' },
    { id: 4, nama: 'Dr. Andi Gunawan', jabatan: 'Dokter Umum', form: 'Excellence', waktu: 'Kemarin, 14:20 WIB', status: 'Sesuai SOP', badge: 'bg-green-100 text-green-700', foto: 'https://i.pravatar.cc/150?img=13', penampilan: { seragam: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', id_card: 'https://images.unsplash.com/photo-1580281658223-9b93f18a5a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', rambut: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', sepatu: 'https://images.unsplash.com/photo-1605810756784-90fbce856988?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }, briefing: [ { hari: 1, tanggal: '03/08/2026', topik: 'Evaluasi kepuasan layanan rawat jalan.' }, { hari: 2, tanggal: '04/08/2026', topik: 'Sosialisasi alur resep baru.' }, { hari: 3, tanggal: '-', topik: '-' } ] },
    { id: 5, nama: 'Joko Widodo', jabatan: 'Security', form: 'Amanah', waktu: 'Kemarin, 16:00 WIB', status: 'Pelanggaran', badge: 'bg-rose-100 text-rose-700', foto: 'https://i.pravatar.cc/150?img=14', amanah: { deklarasi: 'Lapor Pelanggaran', tanggal_kejadian: '04/08/2026', bukti_foto: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', deskripsi: 'Ditemukan pengunjung yang merokok di area dilarang merokok dekat IGD.' } },
    { id: 6, nama: 'Suster Maria', jabatan: 'Kepala Ruangan', form: 'Responsive', waktu: '03 Ags 2026, 11:10 WIB', status: 'Laporan Insiden', badge: 'bg-indigo-100 text-indigo-700', foto: 'https://i.pravatar.cc/150?img=9', responsive: { foto_kondisi: 'https://images.unsplash.com/photo-1584820927498-cafe8c1c9695?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', narasi: 'Terdapat kerusakan pada handle tempat tidur pasien di kamar 302, sehingga tidak bisa dinaik-turunkan secara hidrolik. Perlu segera perbaikan teknisi.' } },
    { id: 7, nama: 'Rina Kartika', jabatan: 'HRD', form: 'Kolaboratif', waktu: '02 Ags 2026, 09:00 WIB', status: 'Terverifikasi', badge: 'bg-purple-100 text-purple-700', foto: 'https://i.pravatar.cc/150?img=5', kolaboratif: { bukti_briefing_pagi: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', bukti_rapat_unit: null, bukti_rapat_mutu: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', bukti_diskusi_kasus: null, koordinasi_lintas: null } },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); 

  // Modal Submissions
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [adminScores, setAdminScores] = useState({ kriteria1: false, kriteria2: false, kriteria3: false, kriteria4: false });
  const [superadminApproval, setSuperadminApproval] = useState({ isApproved: false, catatan: '' });

  // Modal User Management
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ namaLengkap: '', username: '', password: '', role: 'Admin' });

  const openDetail = (data) => {
    setSelectedDetail(data);
    setAdminScores({ kriteria1: false, kriteria2: false, kriteria3: false, kriteria4: false });
    setSuperadminApproval({ isApproved: false, catatan: '' });
  };

  const calculateAdminScore = () => {
    const values = Object.values(adminScores);
    const checkedCount = values.filter(v => v).length;
    return (checkedCount / values.length) * 100;
  };
  const adminScorePercentage = calculateAdminScore();

  // --- LOGIC USER MANAGEMENT ---
  const handleOpenUserModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setUserForm(user);
    } else {
      setEditingUser(null);
      setUserForm({ namaLengkap: '', username: '', password: '', role: 'Admin' });
    }
    setIsUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.namaLengkap || !userForm.username || !userForm.password) {
      alert('Mohon lengkapi semua field!');
      return;
    }
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...userForm, id: editingUser.id } : u));
    } else {
      setUsers([...users, { ...userForm, id: Date.now() }]);
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Yakin ingin menghapus user ini?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const menuItems = [
    { name: 'Dashboard Utama', filter: 'All', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Data Absensi', filter: 'Absensi', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Penilaian KPI Jabatan', filter: 'KPI Jabatan', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Data Safety', filter: 'Safety', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { name: 'Data Excellence', filter: 'Excellence', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Data Kolaboratif', filter: 'Kolaboratif', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Data Amanah', filter: 'Amanah', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Data Responsive', filter: 'Responsive', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Manajemen Akun', filter: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
  ];

  const filteredData = submissions.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.form.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMenu = activeCategory === 'All' ? true : item.form === activeCategory;
    return matchesSearch && matchesMenu;
  });

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
      
      {/* ---------------- MOBILE OVERLAY & SIDEBAR ---------------- */}
      {/* Background Overlay saat Sidebar Terbuka di Mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Content (Theme: Putih / Terang) */}
      <aside className={`bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-30 fixed inset-y-0 left-0 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-24 flex items-center px-6 border-b border-slate-200 bg-white justify-between">
          <div className="flex items-center gap-4">
            <img src="https://i.ibb.co.com/PvLNCdRs/LOGO-KOTAK-PNG.png" alt="Logo" className="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm" />
            <div>
              <h2 className="text-xl font-extrabold leading-tight tracking-wide text-slate-800">Portal Admin</h2>
              <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">RS Sekar Laras</p>
            </div>
          </div>
          {/* Tombol Close Sidebar Mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Menu Navigasi</p>
          {menuItems.map((menu) => {
            const isActive = activeCategory === menu.filter;
            return (
              <button
                key={menu.name}
                onClick={() => { setActiveCategory(menu.filter); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu.icon} />
                </svg>
                {menu.name}
              </button>
            );
          })}
        </nav>

        <div className="p-5 border-t border-slate-200 bg-slate-50/50">
          <button onClick={onBack} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar Dashboard
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <main className="flex-1 h-screen overflow-y-auto animate-fade-in-up w-full">
        
        {/* HEADER NAVBAR ATAS & SIMULATOR AKUN */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-10 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm w-full">
           
           <div className="flex items-center gap-4">
             {/* TOMBOL HAMBURGER MOBILE */}
             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
             
             <div className="items-center gap-2 text-sm font-medium text-slate-500 hidden sm:flex">
               Status Modul: <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold text-xs">Aktif</span>
             </div>
           </div>
           
           <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
             <label className="text-xs sm:text-sm font-bold text-slate-700 hidden sm:block">Akses Sebagai:</label>
             <select 
               className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold rounded-xl border outline-none cursor-pointer transition-colors shadow-sm ${currentUser.role === 'Superadmin' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}
               value={currentUser.id}
               onChange={(e) => setCurrentUser(userList.find(u => u.id === e.target.value))}
             >
               <optgroup label="Admin (HR/IT/Umum)">
                 {userList.filter(u => u.role === 'Admin').map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
               </optgroup>
               <optgroup label="Superadmin (Owner)">
                 {userList.filter(u => u.role === 'Superadmin').map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
               </optgroup>
             </select>
           </div>
        </div>

        <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full">
          
          {/* Header Konten */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
                {activeCategory === 'All' ? 'Dashboard Utama' : activeCategory === 'Users' ? 'Manajemen Akun' : `Rekap ${activeCategory}`}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2">Pusat Kendali Rekapitulasi Kinerja & Evaluasi Pegawai</p>
            </div>
            {activeCategory !== 'Users' && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Export Excel
                </button>
              </div>
            )}
          </div>

          {/* VIEW: MANAJEMEN AKUN */}
          {activeCategory === 'Users' ? (
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-10 animate-fade-in w-full">
              <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">Daftar Pengguna Sistem</h2>
                <button onClick={() => handleOpenUserModal()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white font-bold rounded-xl shadow-md hover:bg-slate-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Tambah User
                </button>
              </div>
              <div className="overflow-x-auto w-full custom-scrollbar">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                      <th className="py-4 px-4 sm:px-6 font-semibold">Nama Lengkap</th>
                      <th className="py-4 px-4 sm:px-6 font-semibold">Username</th>
                      <th className="py-4 px-4 sm:px-6 font-semibold">Hak Akses (Role)</th>
                      <th className="py-4 px-4 sm:px-6 font-semibold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors text-sm sm:text-base">
                        <td className="py-4 px-4 sm:px-6 font-bold text-slate-800">{user.namaLengkap}</td>
                        <td className="py-4 px-4 sm:px-6 text-slate-600">{user.username}</td>
                        <td className="py-4 px-4 sm:px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'Superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 flex justify-center gap-2 sm:gap-3">
                          <button onClick={() => handleOpenUserModal(user)} className="text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Edit">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 p-2 rounded-lg transition-colors" title="Hapus">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              {/* Statistik Top */}
              {activeCategory === 'All' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 w-full">
                  <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Total Evaluasi</p>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">1,248</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Absen Hari Ini</p>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">142 <span className="text-xs sm:text-sm font-medium text-emerald-500 ml-1">Orang</span></h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Rekapitulasi: DESKTOP TABLE & MOBILE CARD GRID */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-10 w-full">
                <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                    {activeCategory === 'All' ? 'Data Masuk Terbaru' : `List ${activeCategory} Terbaru`}
                  </h2>
                  <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input 
                      type="text" placeholder="Cari pegawai atau formulir..." 
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none transition-shadow bg-slate-50/50"
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* A. TAMPILAN DESKTOP (Tabel Normal) */}
                <div className="hidden md:block overflow-x-auto w-full custom-scrollbar">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                        <th className="py-4 px-6 font-semibold">Nama Pegawai</th>
                        <th className="py-4 px-6 font-semibold">Jenis Formulir</th>
                        <th className="py-4 px-6 font-semibold">Waktu Masuk</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.length > 0 ? filteredData.map((data) => (
                        <tr key={data.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-800">{data.nama}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{data.jabatan}</div>
                          </td>
                          <td className="py-4 px-6"><span className="font-medium text-slate-700">{data.form}</span></td>
                          <td className="py-4 px-6 text-sm text-slate-500">{data.waktu}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${data.badge}`}>{data.status}</span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button onClick={() => openDetail(data)} className="text-slate-600 hover:text-slate-800 font-semibold text-sm hover:underline flex items-center justify-center gap-1 mx-auto bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              Lihat
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="py-12 text-center text-slate-500">
                            Data tidak ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* B. TAMPILAN MOBILE (Card List Responsive Anti-Kepotong) */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filteredData.length > 0 ? filteredData.map((data) => (
                    <div key={data.id} className="p-4 flex flex-col gap-3 hover:bg-slate-50/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-800 text-base">{data.nama}</div>
                          <div className="text-xs text-slate-500">{data.jabatan}</div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${data.badge}`}>
                          {data.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="font-bold text-slate-700 block">{data.form}</span>
                          <span className="text-[10px] text-slate-400">{data.waktu}</span>
                        </div>
                        <button onClick={() => openDetail(data)} className="px-3.5 py-1.5 bg-slate-800 text-white font-bold rounded-lg shadow-sm text-xs hover:bg-slate-900 transition-colors flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          Review
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="py-12 text-center text-slate-500 text-sm">
                      Data tidak ditemukan.
                    </div>
                  )}
                </div>

              </div>
            </>
          )}

        </div>
      </main>

      {/* ---------------- MODAL USER MANAGEMENT ---------------- */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">{editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-rose-500 bg-slate-50 p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none" value={userForm.namaLengkap} onChange={(e) => setUserForm({...userForm, namaLengkap: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none" value={userForm.username} onChange={(e) => setUserForm({...userForm, username: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="***" className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Role / Hak Akses</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none bg-white" value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})}>
                  <option value="Admin">Admin (HR/IT/Umum)</option>
                  <option value="Superadmin">Superadmin (Owner)</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3 rounded-b-3xl">
              <button onClick={() => setIsUserModalOpen(false)} className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-100">Batal</button>
              <button onClick={handleSaveUser} className="w-full sm:w-auto px-6 py-2.5 text-white font-bold rounded-xl bg-slate-800 hover:bg-slate-900">Simpan User</button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL DETAIL & VERIFIKASI AREA ---------------- */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200 flex flex-col custom-scrollbar">
            
            {/* Header Modal */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10 shadow-sm">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Review Form: {selectedDetail.form}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500">{selectedDetail.waktu}</p>
              </div>
              <button onClick={() => setSelectedDetail(null)} className="text-slate-400 hover:text-rose-500 transition-colors p-2 bg-slate-50 rounded-full hover:bg-rose-50">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
              
              {/* Header Info Pegawai */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center sm:text-left">
                <div className="w-16 h-16 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-xl font-bold overflow-hidden shadow-sm border-2 border-white flex-shrink-0">
                   {selectedDetail.foto ? (
                     <img src={selectedDetail.foto} alt="Foto Profil" className="w-full h-full object-cover" />
                   ) : (
                     selectedDetail.nama.charAt(0)
                   )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{selectedDetail.nama}</h4>
                  <p className="text-sm font-medium text-slate-500">{selectedDetail.jabatan}</p>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedDetail.badge}`}>
                    {selectedDetail.status}
                  </span>
                </div>
              </div>

              {/* ----- ISI DATA FORM ----- */}
              <div className="mb-8">
                {selectedDetail.form === 'Absensi' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                        <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase mb-1">Jam Masuk</p>
                        <p className="text-lg sm:text-xl font-extrabold text-emerald-600">{selectedDetail.jam_masuk}</p>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                        <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase mb-1">Jam Pulang</p>
                        <p className="text-lg sm:text-xl font-extrabold text-blue-600">{selectedDetail.jam_pulang}</p>
                      </div>
                    </div>
                    {selectedDetail.foto_bukti && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <h5 className="text-sm font-bold text-slate-700 mb-3">Foto Bukti Kehadiran</h5>
                        <div className="w-full h-48 sm:h-72 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                          <img src={selectedDetail.foto_bukti} alt="Bukti Kehadiran" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedDetail.form === 'Safety' && (
                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-slate-700 mb-2">Verifikasi APD</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.apd?.kepala} alt="Kepala" className="w-full h-32 object-cover rounded-lg"/></div>
                      <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.apd?.baju} alt="Baju" className="w-full h-32 object-cover rounded-lg"/></div>
                      <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.apd?.sarung_tangan} alt="Sarung Tangan" className="w-full h-32 object-cover rounded-lg"/></div>
                      <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.apd?.sepatu} alt="Sepatu" className="w-full h-32 object-cover rounded-lg"/></div>
                    </div>
                  </div>
                )}

                {selectedDetail.form === 'Excellence' && (
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-bold text-slate-700 mb-3">Foto Penampilan Kerja</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.penampilan?.seragam} alt="Seragam" className="w-full h-32 object-cover rounded-lg"/></div>
                        <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.penampilan?.id_card} alt="ID Card" className="w-full h-32 object-cover rounded-lg"/></div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-700 mb-3">Briefing Mingguan</h5>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedDetail.briefing?.map((b, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl"><p className="text-xs font-bold text-slate-600 mb-2">{b.tanggal}</p><p className="text-sm text-slate-700">{b.topik}</p></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedDetail.form === 'Kolaboratif' && (
                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-slate-700 mb-2">Bukti Kegiatan Kolaboratif</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedDetail.kolaboratif?.bukti_briefing_pagi && <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.kolaboratif.bukti_briefing_pagi} alt="Bukti" className="w-full h-32 object-cover rounded-lg"/></div>}
                      {selectedDetail.kolaboratif?.bukti_rapat_mutu && <div className="border border-slate-200 rounded-xl p-3"><img src={selectedDetail.kolaboratif.bukti_rapat_mutu} alt="Bukti" className="w-full h-32 object-cover rounded-lg"/></div>}
                    </div>
                  </div>
                )}

                {selectedDetail.form === 'Amanah' && (
                  <div className="bg-rose-50 border-2 border-rose-400 p-4 sm:p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-rose-800 text-center mb-1">Lapor Pelanggaran</h4>
                    <p className="text-xs sm:text-sm font-medium bg-white p-3 rounded-lg border border-rose-100 my-4">[{selectedDetail.amanah?.tanggal_kejadian}] - {selectedDetail.amanah?.deskripsi}</p>
                    <img src={selectedDetail.amanah?.bukti_foto} alt="Bukti Pelanggaran" className="w-full h-40 sm:h-48 object-cover rounded-lg border border-rose-200"/>
                  </div>
                )}

                {selectedDetail.form === 'Responsive' && (
                  <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl">
                     <h5 className="text-sm font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Laporan Kondisi/Insiden</h5>
                     <img src={selectedDetail.responsive?.foto_kondisi} alt="Kondisi" className="w-full h-40 sm:h-56 object-cover rounded-xl mb-4 border border-slate-300" />
                     <p className="text-xs sm:text-sm bg-white border border-slate-200 p-4 rounded-xl text-slate-700 leading-relaxed">"{selectedDetail.responsive?.narasi}"</p>
                  </div>
                )}

                {selectedDetail.form === 'KPI Jabatan' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
                    <span className="font-semibold text-sm text-slate-700 break-all">{selectedDetail.file_upload}</span>
                    <button className="w-full sm:w-auto text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm">Unduh File</button>
                  </div>
                )}
              </div>

              {/* =============================================================
                  2-TIER VERIFICATION SYSTEM (ADMIN -> SUPERADMIN)
                  ============================================================= */}
              {selectedDetail.form !== 'Absensi' && (
                <div className="border-t-2 border-dashed border-slate-200 pt-6 sm:pt-8 mt-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Sistem Verifikasi 2 Lapis
                  </h3>

                  {/* TIER 1: VERIFIKASI ADMIN (HRD/IT/MANAJEMEN) */}
                  <div className={`mb-6 rounded-2xl border-2 transition-all ${currentUser.role === 'Admin' ? 'border-slate-400 bg-slate-50/50 shadow-md p-4 sm:p-5' : 'border-slate-200 bg-slate-50 p-4 sm:p-5 opacity-75'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h5 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                        Verifikasi Tahap 1: Admin HR/Manajemen
                      </h5>
                      {currentUser.role === 'Admin' && <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded uppercase tracking-widest self-start sm:self-auto">Akses Aktif</span>}
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <label className={`flex items-start sm:items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl ${currentUser.role === 'Admin' ? 'cursor-pointer hover:border-slate-300' : 'cursor-not-allowed opacity-70'}`}>
                        <input type="checkbox" disabled={currentUser.role !== 'Admin'} className="w-5 h-5 text-slate-800 rounded flex-shrink-0 mt-0.5 sm:mt-0 focus:ring-slate-800" checked={adminScores.kriteria1} onChange={(e) => setAdminScores({...adminScores, kriteria1: e.target.checked})} />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">Kelengkapan data foto dan narasi sesuai format laporan.</span>
                      </label>
                      <label className={`flex items-start sm:items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl ${currentUser.role === 'Admin' ? 'cursor-pointer hover:border-slate-300' : 'cursor-not-allowed opacity-70'}`}>
                        <input type="checkbox" disabled={currentUser.role !== 'Admin'} className="w-5 h-5 text-slate-800 rounded flex-shrink-0 mt-0.5 sm:mt-0 focus:ring-slate-800" checked={adminScores.kriteria2} onChange={(e) => setAdminScores({...adminScores, kriteria2: e.target.checked})} />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">Implementasi sesuai standar SOP / Kepatuhan RS.</span>
                      </label>
                      <label className={`flex items-start sm:items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl ${currentUser.role === 'Admin' ? 'cursor-pointer hover:border-slate-300' : 'cursor-not-allowed opacity-70'}`}>
                        <input type="checkbox" disabled={currentUser.role !== 'Admin'} className="w-5 h-5 text-slate-800 rounded flex-shrink-0 mt-0.5 sm:mt-0 focus:ring-slate-800" checked={adminScores.kriteria3} onChange={(e) => setAdminScores({...adminScores, kriteria3: e.target.checked})} />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">Bukti tervalidasi asli (tidak ada manipulasi data).</span>
                      </label>
                      <label className={`flex items-start sm:items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl ${currentUser.role === 'Admin' ? 'cursor-pointer hover:border-slate-300' : 'cursor-not-allowed opacity-70'}`}>
                        <input type="checkbox" disabled={currentUser.role !== 'Admin'} className="w-5 h-5 text-slate-800 rounded flex-shrink-0 mt-0.5 sm:mt-0 focus:ring-slate-800" checked={adminScores.kriteria4} onChange={(e) => setAdminScores({...adminScores, kriteria4: e.target.checked})} />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">Disetujui Admin untuk diteruskan ke Owner.</span>
                      </label>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] sm:text-xs font-bold text-slate-500 mb-1">
                        <span>Skor Kelengkapan Admin</span>
                        <span>{adminScorePercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-500 ${adminScorePercentage === 100 ? 'bg-emerald-500' : 'bg-slate-500'}`} style={{ width: `${adminScorePercentage}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* TIER 2: VERIFIKASI SUPERADMIN (OWNER) */}
                  <div className={`rounded-2xl border-2 transition-all ${currentUser.role === 'Superadmin' ? 'border-slate-400 bg-slate-50/50 shadow-md p-4 sm:p-5' : 'border-slate-200 bg-slate-50 p-4 sm:p-5 opacity-75'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                        Verifikasi Tahap 2: Superadmin (Owner)
                      </h5>
                      {currentUser.role === 'Superadmin' && <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1 self-start sm:self-auto"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" /></svg> Akses Owner</span>}
                    </div>

                    <div className="space-y-4">
                      <label className={`flex items-start gap-3 p-3 sm:p-4 bg-white border ${superadminApproval.isApproved ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-200'} rounded-xl ${currentUser.role === 'Superadmin' ? 'cursor-pointer hover:border-slate-300' : 'cursor-not-allowed opacity-70'}`}>
                        <input 
                          type="checkbox" 
                          disabled={currentUser.role !== 'Superadmin'} 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 rounded mt-0.5 flex-shrink-0 focus:ring-slate-800" 
                          checked={superadminApproval.isApproved} 
                          onChange={(e) => setSuperadminApproval({...superadminApproval, isApproved: e.target.checked})} 
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800 block mb-0.5">Approval Final (Disetujui Owner)</span>
                          <span className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight block">Centang untuk memberikan persetujuan akhir pada evaluasi/laporan ini sebagai dasar penggajian atau tindak lanjut manajerial.</span>
                        </div>
                      </label>

                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold text-slate-600 mb-1 sm:mb-2">Catatan Khusus Superadmin (Opsional)</label>
                        <textarea 
                          disabled={currentUser.role !== 'Superadmin'}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-xl outline-none resize-none text-xs sm:text-sm transition-colors ${currentUser.role === 'Superadmin' ? 'focus:ring-2 focus:ring-slate-500 bg-white' : 'bg-slate-100 cursor-not-allowed'}`}
                          rows="2"
                          placeholder={currentUser.role === 'Superadmin' ? "Tuliskan arahan, SP, atau catatan evaluasi untuk pegawai..." : "Hanya Superadmin yang dapat mengisi catatan ini."}
                          value={superadminApproval.catatan}
                          onChange={(e) => setSuperadminApproval({...superadminApproval, catatan: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modal Action */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 rounded-b-3xl shrink-0">
              <button onClick={() => setSelectedDetail(null)} className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                Tutup
              </button>
              {selectedDetail.form !== 'Absensi' && (
                <button 
                  onClick={() => { 
                    alert(`Data disimpan!\nRole: ${currentUser.role}\nAdmin Score: ${adminScorePercentage}%\nSuperadmin Approved: ${superadminApproval.isApproved}`); 
                    setSelectedDetail(null); 
                  }} 
                  className="w-full sm:w-auto px-6 py-2.5 text-white font-bold rounded-xl shadow-md transition-colors bg-slate-800 hover:bg-slate-900"
                >
                  Simpan Evaluasi {currentUser.role}
                </button>
              )}
            </div>

          </div>
        </div>
      )}
      
      {/* --- Menambahkan CSS untuk menyembunyikan scrollbar agar UI lebih estetik --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}