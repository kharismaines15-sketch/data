import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { pendudukService } from '../services/api'

const FOTO_URL = 'http://localhost:8000/storage/'

export default function DetailPenduduk() {
  const { id } = useParams()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await pendudukService.getById(id)
        setData(res.data)
      } catch {
        alert('Data tidak ditemukan')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  if (loading) return <div className="card loading">Memuat data...</div>
  if (!data)   return <div className="card">Data tidak ditemukan</div>

  const fields = [
    { label: 'NIK',           value: data.nik },
    { label: 'Nama Lengkap',  value: data.nama },
    { label: 'Tempat Lahir',  value: data.tempat_lahir },
    { label: 'Tanggal Lahir', value: data.tanggal_lahir },
    { label: 'Jenis Kelamin', value: data.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' },
    { label: 'Alamat',        value: data.alamat },
    { label: 'Agama',         value: data.agama },
    { label: 'Pekerjaan',     value: data.pekerjaan },
    {
      label: 'Status',
      value: (
        <span className={`badge badge-${data.status}`}>
          {data.status === 'active' ? 'Aktif' : 'Non-Aktif'}
        </span>
      )
    },
  ]

  return (
    <div className="card">
      <div className="page-header">
        <span className="page-title">Detail Penduduk</span>
        <div className="actions">
          <Link to={`/edit/${data.id}`} className="btn btn-warning">Edit</Link>
          <Link to="/" className="btn btn-secondary">← Kembali</Link>
        </div>
      </div>

      {/* Foto */}
      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        {data.foto ? (
          <img
            src={FOTO_URL + data.foto}
            alt={data.nama}
            style={{ width: 140, height: 160, objectFit: 'cover', borderRadius: 8, border: '2px solid #e5e7eb' }}
          />
        ) : (
          <div style={{
            width: 140, height: 160, borderRadius: 8, border: '2px dashed #d1d5db',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#9ca3af', fontSize: 13, flexDirection: 'column', gap: 4
          }}>
            <span style={{ fontSize: 32 }}>👤</span>
            Belum ada foto
          </div>
        )}
      </div>

      {fields.map((f, i) => (
        <div className="detail-row" key={i}>
          <span className="detail-label">{f.label}</span>
          <span>{f.value}</span>
        </div>
      ))}
    </div>
  )
}
