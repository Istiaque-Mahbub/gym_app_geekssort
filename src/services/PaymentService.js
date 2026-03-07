// services/PaymentService.js
import apiClient from '@/lib/apiClient';

export const PaymentService = {
  // Dashboard payments (auth required)
  getDashboardPayments: async (params = {}) => {
    const res = await apiClient.get('/dashboard/payments/', { params });
    return res.data;
  },

  getDashboardPaymentById: async (id) => {
    const res = await apiClient.get(`/dashboard/payments/${id}/`);
    return res.data;
  },

  createDashboardPayment: async (data) => {
    const res = await apiClient.post('/dashboard/payments/', data);
    return res.data;
  },

  updateDashboardPayment: async (id, data) => {
    const res = await apiClient.patch(`/dashboard/payments/${id}/`, data);
    return res.data;
  },

  deleteDashboardPayment: async (id) => {
    const res = await apiClient.delete(`/dashboard/payments/${id}/`);
    return res.data;
  },
};