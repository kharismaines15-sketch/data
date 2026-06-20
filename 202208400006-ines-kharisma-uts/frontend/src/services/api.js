import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
})

export const pendudukService = {
  getAll: (page = 1, search = '') => api.get(`/penduduk?page=${page}&search=${search}`),
  getById: (id)      => api.get(`/penduduk/${id}`),
  create: (data)     => api.post('/penduduk', data),
  update: (id, data) => api.put(`/penduduk/${id}`, data),
  toggleStatus: (id) => api.patch(`/penduduk/${id}/toggle-status`),
  delete: (id)       => api.delete(`/penduduk/${id}`),
}
