import apiClient from '@/lib/apiClient';

export const FitHiveSupportService = {

  // Public Submit (Chat Widget)
  createSupport: async (data) => {
    const res = await apiClient.post('/fithive-support/', data);
    return res.data;
  },

  // Dashboard
  getDashboardSupports: async (params = {}) => {
    const res = await apiClient.get('/dashboard/fithive-support/', { params });
    return res.data;
  },

  markAsRead: async (id) => {
    const res = await apiClient.patch(`/dashboard/fithive-support/${id}/mark_as_read/`);
    return res.data;
  },

  markAsResponded: async (id) => {
    const res = await apiClient.patch(`/dashboard/fithive-support/${id}/mark_as_responded/`);
    return res.data;
  }
};
