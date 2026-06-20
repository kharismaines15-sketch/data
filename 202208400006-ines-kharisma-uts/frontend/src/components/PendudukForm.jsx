import React, { useRef } from 'react'

const FOTO_URL = 'http://localhost:8000/storage/'

export default function PendudukForm({ formData, onChange, onSubmit, loading, isEdit, fotoLama }) {
  const fileRef = useRef()

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>NIK (16 digit)</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={onChange}
            maxLength={16}
            placeholder="3201010101010001"
            required
          />
        </div>

        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={onChange}
            placeholder="Nama lengkap"
            required
          />
        </div>

        <div className="form-group">
          <label>Tempat Lahir</label>
          <input
            type="text"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={onChange}
            placeholder="Jakarta"
            required
          />
        </div>

        <div className="form-group">
          <label>Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Jenis Kelamin</label>
          <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={onChange} required>
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Agama</label>
          <select name="agama" value={formData.agama} onChange={onChange} required>
            <option value="">-- Pilih --</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pekerjaan</label>
          <input
            type="text"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={onChange}
            placeholder="Pegawai Negeri"
            required
          />
        </div>

        {/* Upload Foto */}
        <div className="form-group">
          <label>Foto Diri (jpg/png, maks 2MB)</label>
          {isEdit && fotoLama && (
            <div style={{ marginBottom: 8 }}>
              <img
                src={FOTO_URL + fotoLama}
                alt="Foto saat ini"
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #d1d5db' }}
              />
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Foto saat ini. Upload baru untuk mengganti.</div>
            </div>
          )}
          <input
            type="file"
            name="foto"
            accept="image/jpg,image/jpeg,image/png"
            ref={fileRef}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Alamat</label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={onChange}
          rows={3}
          placeholder="Alamat lengkap"
          required
        />
      </div>

      <div className="actions" style={{ marginTop: 16 }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Menyimpan...' : (isEdit ? 'Update Data' : 'Simpan Data')}
        </button>
        <a href="/" className="btn btn-secondary">Batal</a>
      </div>
    </form>
  )
}
