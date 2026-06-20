import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { pendudukService } from '../services/api'
import PendudukForm from '../components/PendudukForm'

export default function EditPenduduk() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [fotoLama, setFotoLama] = useState(null)
  const [fotoFile, setFotoFile] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pendudukService.getById(id)
        const { nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, agama, pekerjaan, foto } = res.data
        setFormData({ nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, agama, pekerjaan })
        setFotoLama(foto)
      } catch {
        alert('Data tidak ditemukan')
        navigate('/')
      }
    }
    fetchData()
  }, [id])

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

    // Laravel tidak support PUT multipart, pakai POST + _method=PUT
    const payload = new FormData()
    payload.append('_method', 'PUT')
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v))
    if (fotoFile) payload.append('foto', fotoFile)

    try {
      await axios.post(`http://localhost:8000/api/penduduk/${id}`, payload, {
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

  if (!formData) return <div className="card loading">Memuat data...</div>

  return (
    <div className="card">
      <div className="page-header">
        <span className="page-title">Edit Data Penduduk</span>
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
        isEdit={true}
        fotoLama={fotoLama}
      />
    </div>
  )
}
