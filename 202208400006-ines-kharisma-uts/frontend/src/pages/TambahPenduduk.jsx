import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PendudukForm from '../components/PendudukForm'

const initialForm = {
  nik: '', nama: '', tempat_lahir: '', tanggal_lahir: '',
  jenis_kelamin: '', alamat: '', agama: '', pekerjaan: ''
}

export default function TambahPenduduk() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [fotoFile, setFotoFile] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})

  const handleChange = (e) => {
    if (e.target.name === 'foto') {
      setFotoFile(e.target.files[0])
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Pakai FormData karena ada file upload
    const payload = new FormData()
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v))
    if (fotoFile) payload.append('foto', fotoFile)

    try {
      await axios.post('http://localhost:8000/api/penduduk', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/')
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {})
      } else {
        alert('Terjadi kesalahan, coba lagi')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="page-header">
        <span className="page-title">Tambah Data Penduduk</span>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="alert alert-error">
          {Object.values(errors).flat().map((msg, i) => (
            <div key={i}>• {msg}</div>
          ))}
        </div>
      )}

      <PendudukForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={false}
      />
    </div>
  )
}
