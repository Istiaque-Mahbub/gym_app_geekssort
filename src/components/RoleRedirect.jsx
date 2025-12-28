import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';

export default function RoleRedirect() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAndRedirect();
  }, []);

  const checkAndRedirect = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        setChecking(false);
        return;
      }

      const user = await base44.auth.me();
      if (!user || !user.email) {
        setChecking(false);
        return;
      }

      // Check if user has a role
      const roles = await base44.entities.UserRole.filter({ 
        user_email: user.email,
        is_active: true 
      });

      if (roles.length > 0) {
        const userRole = roles[0];
        // Redirect based on role
        if (userRole.role === 'super_admin' || userRole.role === 'admin' || userRole.role === 'editor') {
          window.location.href = createPageUrl('AdminDashboard');
          return;
        }
      }

      setChecking(false);
    } catch (error) {
      console.error('Error checking role:', error);
      setChecking(false);
    }
  };

  return null;
}