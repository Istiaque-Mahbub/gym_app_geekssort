import apiClient from '@/lib/apiClient';

export const ContactService = {

  // Public Contact Submit
  createContact: async (data) => {
    const res = await apiClient.post('/contact/', data);
    return res.data;
  },

  // Get Gym Clubs for dropdown
  getGymClubs: async () => {
    const res = await apiClient.get('/gym-club/'); // make sure backend has public gym club list API
    return res.data;
  },

  // Dashboard
  getDashboardContacts: async (params = {}) => {
    const res = await apiClient.get('/dashboard/contacts/', { params });
    return res.data;
  },

  markAsRead: async (id) => {
    const res = await apiClient.patch(`/dashboard/contacts/${id}/mark_as_read/`);
    return res.data;
  },

  markAsResponded: async (id) => {
    const res = await apiClient.patch(`/dashboard/contacts/${id}/mark_as_responded/`);
    return res.data;
  }
};
