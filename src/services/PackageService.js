import apiClient from '@/lib/apiClient';

export const PackageService = {
  // ==========================
  // PUBLIC API
  // ==========================
  getPublicPackages: async () => {
    const res = await apiClient.get('/packages/');
    return res.data;
  },

  // ==========================
  // DASHBOARD API
  // ==========================
  getPackages: async () => {
    const res = await apiClient.get('/dashboard/packages/');
    return res.data;
  },

  createPackage: async (data) => {
    // data can include nested features/addons
    const res = await apiClient.post('/dashboard/packages/', data);
    return res.data;
  },

  updatePackage: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/packages/${id}/`, data);
    return res.data;
  },

  deletePackage: async (id) => {
    const res = await apiClient.delete(`/dashboard/packages/${id}/`);
    return res.data;
  }
};