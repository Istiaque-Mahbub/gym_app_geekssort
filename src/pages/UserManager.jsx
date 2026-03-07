import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { UserPlus, Trash2, Shield, User, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from '@/components/ui/alert-dialog';

export default function UserManager() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load current logged-in user
      const res = await apiClient.get('/me/');
      setUser(res.data);

      // Only admin can access
      if (res.data.role !== 'admin') {
        window.location.href = createPageUrl('Home');
        return;
      }

      await loadUsers();
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      window.location.href = createPageUrl('Home');
    }
  };

  const loadUsers = async () => {
    try {
      const res = await apiClient.get('/users/');
      setUsers(res.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      await apiClient.delete(`/users/${deleteUserId}/`);
      setDeleteUserId(null);
      await loadUsers();
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await apiClient.patch(`/users/${userId}/`, { role: newRole });
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      alert('Error changing role: ' + error.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading users...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('AdminDashboard')}>
              <Button variant="ghost" className="text-white hover:text-yellow-400">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-black">User Management</h1>
              <p className="text-gray-400">Manage admin and user accounts</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowInviteDialog(true)}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-black">{users.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Admins</p>
              <p className="text-3xl font-black">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Regular Users</p>
              <p className="text-3xl font-black">{users.filter(u => u.role !== 'admin').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="max-w-7xl mx-auto px-6">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((u, index) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      u.role === 'admin' ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}>
                      {u.role === 'admin' ? (
                        <Shield className="w-6 h-6 text-black" />
                      ) : (
                        <User className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{u.full_name || 'No Name'}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{u.email}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          u.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {u.id !== user.id ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingUser(u)}
                      >
                        {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteUserId(u.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      You
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
          </DialogHeader>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p><strong>Note:</strong> User invitations should be handled by your backend or admin panel.</p>
            <p className="mt-2">Ensure the invited user receives login instructions via email.</p>
          </div>
          <Button onClick={() => setShowInviteDialog(false)} className="w-full">
            Got It
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Confirmation */}
      <AlertDialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role</AlertDialogTitle>
            <AlertDialogDescription>
              {editingUser?.role === 'admin' ? (
                <>Remove admin privileges from <strong>{editingUser?.full_name}</strong>?</>
              ) : (
                <>Make <strong>{editingUser?.full_name}</strong> an admin?</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleChangeRole(editingUser?.id, editingUser?.role === 'admin' ? 'user' : 'admin')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {editingUser?.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
