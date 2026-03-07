import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiClient from '@/lib/apiClient'; // your backend API client

export default function InitializeSuperAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [existingRole, setExistingRole] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Fetch current user
      const userRes = await apiClient.get('/accounts/me/');
      setUser(userRes.data);

      // Check if user already has a role
      const rolesRes = await apiClient.get(`/user-roles/?user_id=${userRes.data.id}`);
      if (rolesRes.data.length > 0) {
        setExistingRole(rolesRes.data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking super admin status:', error);
      window.location.href = '/login';
    }
  };

  const createSuperAdmin = async () => {
    if (!user) return;

    try {
      setCreating(true);

      await apiClient.post('/user-roles/', {
        user_id: user.id,
        role: 'super_admin',
        permissions: [],
        created_by: user.id,
        is_active: true
      });

      setDone(true);
      setTimeout(() => {
        window.location.href = '/AdminDashboard';
      }, 2000);
    } catch (error) {
      console.error('Error creating super admin:', error);
      alert('Error: ' + error.message);
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (existingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You already have admin access as: <strong>{existingRole.role.replace('_', ' ').toUpperCase()}</strong></p>
            <Button 
              onClick={() => window.location.href = '/AdminDashboard'}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Go to Admin Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-600" />
            Initialize Super Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {done ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Super Admin Created!</h3>
              <p className="text-gray-600">Redirecting to admin dashboard...</p>
            </div>
          ) : (
            <>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Your Email:</strong> {user?.email}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Click below to grant yourself Super Admin access.
                </p>
              </div>

              <Button
                onClick={createSuperAdmin}
                disabled={creating || !user}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {creating ? 'Creating...' : 'Make Me Super Admin'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                This will grant you full administrative access to the platform.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
