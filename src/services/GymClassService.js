import apiClient from '@/lib/apiClient';

export const GymClassService = {
  // =====================================
  // PUBLIC (No Auth Required)
  // =====================================

  getAll: async (params = {}) => {
    const res = await apiClient.get('/classes/', { params });
    return res.data;
  },

  getById: async (id) => {
    const res = await apiClient.get(`/classes/${id}/`);
    return res.data;
  },

  // =====================================
  // DASHBOARD (Auth Required)
  // =====================================
  getDashboardClasses: async (params = {}) => {
    const res = await apiClient.get('/dashboard/gym-classes/', { params });
    return res.data;
  },
  getLevels: async () => {
    const res = await apiClient.get('/dashboard/gym-classes/levels/');
    return res.data;
  },
  // Dashboard gym class category list
  getCategories: async () => {
    const res = await apiClient.get('/dashboard/gym-class-categories/');
    return res.data;
  },
  // services/GymClassService.js
  getInstructors: async () => {
    const res = await apiClient.get('/dashboard/instructors/');
    return Array.isArray(res.data) ? res.data : [];
  },

  createDashboardClass: async (data) => {
    const res = await apiClient.post('/dashboard/gym-classes/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  updateDashboardClass: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/gym-classes/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  deleteDashboardClass: async (id) => {
    const res = await apiClient.delete(`/dashboard/gym-classes/${id}/`);
    return res.data;
  },

  // =====================================
  // BOOKINGS
  // =====================================

  createBooking: async (data) => {
    const res = await apiClient.post('/dashboard/bookings/', data);
    return res.data;
  },

  getBookings: async () => {
    const res = await apiClient.get('/dashboard/bookings/');
    return res.data;
  },

  updateBooking: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/bookings/${id}/`, data);
    return res.data;
  },

  deleteBooking: async (id) => {
    const res = await apiClient.delete(`/dashboard/bookings/${id}/`);
    return res.data;
  },
};
