import apiClient from '@/lib/apiClient';

export const AuthService = {
  // ==========================
  // LOGIN
  // ==========================
  login: async ({ email, password }) => {
    try {
      // 1️⃣ Get access & refresh tokens
      const tokenRes = await apiClient.post('/login/', { email, password });
      const { access, refresh } = tokenRes.data;

      // Save tokens
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // 2️⃣ Get full user info
      const userRes = await apiClient.get('/accounts/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      localStorage.setItem('role', userRes.data.role);
      localStorage.setItem('full_name', userRes.data.full_name);

      return {
        access,
        refresh,
        user: userRes.data,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // ==========================
  // REGISTER
  // ==========================
  register: async ({ email, password, full_name, role }) => {
    try {
      const res = await apiClient.post('/accounts/register/', {
        email,
        password,
        full_name,
        role,
      });
      return res.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // ==========================
  // GET CURRENT USER
  // ==========================
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('access');
      if (!token) return null;

      const res = await apiClient.get('/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('role', res.data.role);
      localStorage.setItem('full_name', res.data.full_name);

      return res.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // ==========================
  // REFRESH TOKEN
  // ==========================
  refreshToken: async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) return null;

      const res = await apiClient.post('/refresh/', { refresh });

      const newAccess = res.data.access;
      localStorage.setItem('access', newAccess);

      return newAccess;
    } catch (error) {
      console.error('Token refresh failed:', error);
      AuthService.logout();
      return null;
    }
  },

  // ==========================
  // LOGOUT
  // ==========================
  logout: () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
    localStorage.removeItem('full_name');

    window.dispatchEvent(new Event('authChanged'));
  },

  // ==========================
  // IS AUTHENTICATED
  // ==========================
  isAuthenticated: () => !!localStorage.getItem('access'),
};
