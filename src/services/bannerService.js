import apiClient from '@/lib/apiClient';

export const BannerService = {
  getAll() {
    return apiClient.get('/banners/');
  },

  getById(id) {
    return apiClient.get(`/banners/${id}/`);
  },

  create(formData) {
    return apiClient.post('/banners/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update(id, formData) {
    return apiClient.put(`/banners/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete(id) {
    return apiClient.delete(`/banners/${id}/`);
  },
};
