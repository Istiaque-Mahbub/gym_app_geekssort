// services/MemberService.js
import apiClient from '@/lib/apiClient';

export const MemberService = {
  // Dashboard members (auth required)
  getDashboardMembers: async (params = {}) => {
    const res = await apiClient.get('/dashboard/members/', { params });
    return res.data;
  },

  getDashboardMemberById: async (id) => {
    const res = await apiClient.get(`/dashboard/members/${id}/`);
    return res.data;
  },

  createDashboardMember: async (data) => {
    const res = await apiClient.post('/dashboard/members/', data);
    return res.data;
  },

  updateDashboardMember: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/members/${id}/`, data);
    return res.data;
  },

  deleteDashboardMember: async (id) => {
    const res = await apiClient.delete(`/dashboard/members/${id}/`);
    return res.data;
  },

  // Dashboard packages
  getDashboardPackages: async () => {
    const res = await apiClient.get('/dashboard/member-packages/');
    return res.data;
  },
};