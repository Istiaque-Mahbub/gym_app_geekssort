import { useEffect, useState } from 'react';
import  apiClient  from '@/lib/apiClient'; // your existing apiClient
import { createPageUrl } from '@/utils';

export function usePermissions() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch current user info from Django backend
      const res = await apiClient.get('/accounts/me/');
      const user = res.data;

      if (!user || !user.role) {
        setLoading(false);
        return;
      }

      // Assign user role
      setUserRole({
        role: user.role,
        permissions: user.permissions || [], // optional: include if backend returns permissions
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading permissions:', error);
      setLoading(false);
    }
  };

  const hasPermission = (page) => {
    if (!userRole) return false;
    if (userRole.role === 'super_admin') return true;
    return userRole.permissions?.includes(page) || false;
  };

  const isSuperAdmin = () => {
    return userRole?.role === 'super_admin';
  };

  const isAdmin = () => {
    return userRole?.role === 'admin';
  };

  return { userRole, loading, hasPermission, isSuperAdmin, isAdmin };
}

export function ProtectedPage({ children, requiredPage }) {
  const { userRole, loading, hasPermission } = usePermissions();

  useEffect(() => {
    if (!loading && !hasPermission(requiredPage)) {
      window.location.href = createPageUrl('AdminDashboard');
    }
  }, [loading, userRole, requiredPage]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!hasPermission(requiredPage)) {
    return null;
  }

  return children;
}
