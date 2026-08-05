import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // 1. Pastikan yang di-import adalah App
import './index.css' // (Atau './App.css', sesuaikan dengan aslinya)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* 2. Pastikan yang di-render di sini adalah <App />, BUKAN <FormCards /> */}
  </React.StrictMode>,
)