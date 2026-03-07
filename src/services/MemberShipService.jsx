// services/PackageService.js
import apiClient from '@/lib/apiClient';

export const MemberShipService = {
  getDashboardPackages: async () => {
    const res = await apiClient.get('/dashboard/member-packages/');
    return res.data;
  },

  getDashboardPackageById: async (id) => {
    const res = await apiClient.get(`/dashboard/member-packages/${id}/`);
    return res.data;
  },

  createDashboardPackage: async (data) => {
    const res = await apiClient.post('/dashboard/member-packages/', data);
    return res.data;
  },

  updateDashboardPackage: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/member-packages/${id}/`, data);
    return res.data;
  },

  deleteDashboardPackage: async (id) => {
    const res = await apiClient.delete(`/dashboard/member-packages/${id}/`);
    return res.data;
  },
};