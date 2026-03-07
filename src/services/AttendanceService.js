// services/AttendanceService.js
import apiClient from '@/lib/apiClient';

export const AttendanceService = {
  // Dashboard attendance records
  getDashboardAttendance: async (params = {}) => {
    const res = await apiClient.get('/dashboard/attendance/', { params });
    return res.data;
  },

  getDashboardAttendanceById: async (id) => {
    const res = await apiClient.get(`/dashboard/attendance/${id}/`);
    return res.data;
  },

  createDashboardAttendance: async (data) => {
    const res = await apiClient.post('/dashboard/attendance/', data);
    return res.data;
  },

  updateDashboardAttendance: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/attendance/${id}/`, data);
    return res.data;
  },

  deleteDashboardAttendance: async (id) => {
    const res = await apiClient.delete(`/dashboard/attendance/${id}/`);
    return res.data;
  },
};