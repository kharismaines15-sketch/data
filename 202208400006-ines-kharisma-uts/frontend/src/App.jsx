import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ListPenduduk from './pages/ListPenduduk'
import DetailPenduduk from './pages/DetailPenduduk'
import TambahPenduduk from './pages/TambahPenduduk'
import EditPenduduk from './pages/EditPenduduk'

export default function App() {
  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          📋 Sistem Data Penduduk
        </Link>
      </div>

      <div className="container">
        <Routes>
          <Route path="/"           element={<ListPenduduk />} />
          <Route path="/tambah"     element={<TambahPenduduk />} />
          <Route path="/detail/:id" element={<DetailPenduduk />} />
          <Route path="/edit/:id"   element={<EditPenduduk />} />
        </Routes>
      </div>
    </>
  )
}
