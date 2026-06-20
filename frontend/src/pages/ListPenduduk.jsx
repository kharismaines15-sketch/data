import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { pendudukService } from '../services/api'

const FOTO_URL = 'http://localhost:8000/storage/'

export default function ListPenduduk() {
  const [data, setData]             = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage]             = useState(1)
  const [loading, setLoading]       = useState(true)
  const [alert, setAlert]           = useState(null)
  const [search, setSearch]         = useState('')

  const [showModal, setShowModal]       = useState(false)
  const [selectedId, setSelectedId]     = useState(null)
  const [selectedNama, setSelectedNama] = useState('')

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedItem, setSelectedItem]       = useState(null)

  useEffect(() => { fetchData(page, search) }, [page])

  const fetchData = async (halaman, keyword = '') => {
    setLoading(true)
    try {
      const res = await pendudukService.getAll(halaman, keyword)
      setData(res.data.data)
      setPagination(res.data)
    } catch {
      showAlert('Gagal memuat data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchData(1, search)
  }

  const handleClearSearch = () => {
    setSearch('')
    setPage(1)
    fetchData(1, '')
  }

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
  }

  const bukaModalHapus = (id, nama) => {
    setSelectedId(id); setSelectedNama(nama); setShowModal(true)
  }

  const konfirmasiHapus = async () => {
    try {
      await pendudukService.delete(selectedId)
      showAlert('Data berhasil dihapus')
      setShowModal(false)
      fetchData(page, search)
    } catch {
      showAlert('Gagal menghapus data', 'error')
      setShowModal(false)
    }
  }

  const bukaModalStatus = (item) => {
    setSelectedItem(item); setShowStatusModal(true)
  }

  const konfirmasiToggleStatus = async () => {
    try {
      await pendudukService.toggleStatus(selectedItem.id)
      showAlert('Status berhasil diubah')
      setShowStatusModal(false)
      fetchData(page, search)
    } catch {
      showAlert('Gagal mengubah status', 'error')
      setShowStatusModal(false)
    }
  }

  const totalPages = pagination.last_page || 1

  return (
    <div>
      <div className="card">
        <div className="page-header">
          <span className="page-title">Daftar Penduduk</span>
          <Link to="/tambah" className="btn btn-primary">+ Tambah Data</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Cari nama atau NIK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 5, fontSize: 14 }}
          />
          <button type="submit" className="btn btn-primary">Cari</button>
          {search && (
            <button type="button" className="btn btn-secondary" onClick={handleClearSearch}>Reset</button>
          )}
        </form>

        {alert && (
          <div className={`alert alert-${alert.type}`}>{alert.message}</div>
        )}

        {loading ? (
          <div className="loading">Memuat data...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Foto</th>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th>J/K</th>
                  <th>Pekerjaan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr><td colSpan="8" style={{ textAlign: 'center', color: '#9ca3af' }}>Data tidak ditemukan</td></tr>
                )}
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>
                      {item.foto ? (
                        <img
                          src={FOTO_URL + item.foto}
                          alt={item.nama}
                          style={{ width: 40, height: 44, objectFit: 'cover', borderRadius: 4, border: '1px solid #e5e7eb' }}
                        />
                      ) : (
                        <div style={{
                          width: 40, height: 44, borderRadius: 4, background: '#f3f4f6',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 20, color: '#9ca3af'
                        }}>👤</div>
                      )}
                    </td>
                    <td>{item.nik}</td>
                    <td>{item.nama}</td>
                    <td>{item.jenis_kelamin === 'L' ? 'L' : 'P'}</td>
                    <td>{item.pekerjaan}</td>
                    <td>
                      <span className={`badge badge-${item.status}`}>
                        {item.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/detail/${item.id}`} className="btn btn-info">Lihat</Link>
                        <Link to={`/edit/${item.id}`} className="btn btn-warning">Edit</Link>
                        <button
                          className={`btn ${item.status === 'active' ? 'btn-secondary' : 'btn-success'}`}
                          onClick={() => bukaModalStatus(item)}
                        >
                          {item.status === 'active' ? 'Non-Aktifkan' : 'Aktifkan'}
                        </button>
                        <button className="btn btn-danger" onClick={() => bukaModalHapus(item.id, item.nama)}>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                &laquo; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>
                  {p}
                </button>
              ))}
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next &raquo;
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🗑️ Konfirmasi Hapus</h3>
            <p>Hapus permanen data <strong>{selectedNama}</strong>?<br />Data tidak dapat dipulihkan.</p>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn btn-danger" onClick={konfirmasiHapus}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🔄 Ubah Status</h3>
            <p>
              Ubah status <strong>{selectedItem.nama}</strong> dari{' '}
              <strong>{selectedItem.status === 'active' ? 'Aktif' : 'Non-Aktif'}</strong> menjadi{' '}
              <strong>{selectedItem.status === 'active' ? 'Non-Aktif' : 'Aktif'}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowStatusModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={konfirmasiToggleStatus}>Ya, Ubah</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
