import apiClient from '@/lib/apiClient';

export const GymClubService = {
  // ------- public ----
  // Get all gym clubs
  getAll() {
    return apiClient.get('/gym-club/');
  },

  // Get single gym club by ID
  getById(id) {
    return apiClient.get(`/gym-club/${id}/`);
  },
  // ------- public ----

  // Get all clubs (Admin Dashboard)
  getClubAll() {
    return apiClient.get('/dashboard/gym-club/');
  },

  // Get single club
  getByClubId(id) {
    return apiClient.get(`/dashboard/gym-club/${id}/`);
  },

 // gymClubService.js
update(id, data) {
  return apiClient.put(`/dashboard/gym-club/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('access')}`, // your JWT token
    },
  });
},

create(data) {
  return apiClient.post(`/dashboard/gym-club/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
    },
  });
},

  // Partial update
  patch(id, data) {
    return apiClient.patch(`/dashboard/gym-club/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // or 'multipart/form-data' if uploading files
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // example token
        // add any other custom headers here
      },
    });
  },

  // Delete club
  delete(id) {
    return apiClient.delete(`/dashboard/gym-club/${id}/`);
  },
};
