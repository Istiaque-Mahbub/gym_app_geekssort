import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Shield, Mail, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GymLoader from '@/components/GymLoader';
import axios from 'axios';
import { createPageUrl } from '@/utils';

const AVAILABLE_PERMISSIONS = [
  { id: 'InquiryManager', label: 'Inquiry Manager' },
  { id: 'BookingManager', label: 'Booking Manager' },
  { id: 'BlogManager', label: 'Blog Manager' },
  { id: 'PackageManager', label: 'Package Manager' },
  { id: 'ClassManager', label: 'Class Manager' },
  { id: 'ClubManager', label: 'Club Manager' },
  { id: 'ClassScheduleManager', label: 'Schedule Manager' },
  { id: 'ContentManager', label: 'Content Manager' },
  { id: 'BannerManager', label: 'Banner Manager' },
  { id: 'PromoBannerManager', label: 'Promo Banners' },
  { id: 'SiteSettingsManager', label: 'Site Settings' },
  { id: 'VisitorAnalytics', label: 'Visitor Analytics' },
  { id: 'NotificationSettings', label: 'Notification Settings' }
];

export default function SuperAdminPanel() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'editor',
    permissions: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true
  });

  const loadData = async () => {
    try {
      const userRes = await apiClient.get('/me/');
      setCurrentUser(userRes.data);

      // Only allow super admins
      const rolesRes = await apiClient.get('/user-roles/');
      const myRole = rolesRes.data.find(r => r.user_email === userRes.data.email);
      if (!myRole || myRole.role !== 'super_admin') {
        window.location.href = createPageUrl('Home');
        return;
      }

      setUserRoles(rolesRes.data);

      const usersRes = await apiClient.get('/users/');
      setUsers(usersRes.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      window.location.href = createPageUrl('Home');
    }
  };

  const getUserInfo = (email) => users.find(u => u.email === email);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await apiClient.patch(`/user-roles/${editingUser.id}/`, {
          role: formData.role,
          permissions: formData.permissions
        });
        alert('User updated successfully!');
      } else {
        // Invite user
        await apiClient.post('/accounts/invite/', { email: formData.email });

        // Create role
        await apiClient.post('/user-roles/', {
          user_email: formData.email,
          role: formData.role,
          permissions: formData.permissions,
          created_by_email: currentUser.email,
          is_active: true
        });

        alert(`✅ User created! Invitation sent to ${formData.email}`);
      }
      setShowUserForm(false);
      setEditingUser(null);
      setFormData({ email: '', role: 'editor', permissions: [] });
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleResendEmail = async (role) => {
    try {
      setSendingEmail(role.id);
      await apiClient.post('/accounts/invite/', { email: role.user_email });
      alert('✅ Invitation email resent to ' + role.user_email);
    } catch (error) {
      console.error(error);
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setSendingEmail(false);
    }
  };

  const handleEditUser = (role) => {
    setEditingUser(role);
    setFormData({
      email: role.user_email,
      role: role.role,
      permissions: role.permissions || []
    });
    setShowUserForm(true);
  };

  const handleUpdateRole = async (roleId, updates) => {
    try {
      await apiClient.patch(`/user-roles/${roleId}/`, updates);
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Error updating role');
    }
  };

  const handleDeleteRole = async (roleId, userEmail) => {
    if (userEmail === currentUser.email) {
      alert('You cannot delete your own role');
      return;
    }
    if (!confirm('Are you sure you want to remove this user\'s admin access?')) return;

    try {
      await apiClient.delete(`/user-roles/${roleId}/`);
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Error deleting role');
    }
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const downloadPageAsPDF = async (pageName, role) => {
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(16);
      pdf.text(`${pageName} - Access Report`, 20, 20);
      pdf.setFontSize(12);
      pdf.text(`Role: ${role.role.replace('_', ' ').toUpperCase()}`, 20, 30);
      pdf.text(`User: ${role.user_email}`, 20, 40);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
      
      if (role.permissions?.length > 0) {
        pdf.text('Assigned Pages:', 20, 65);
        let yPos = 75;
        role.permissions.forEach((perm, idx) => {
          pdf.text(`${idx + 1}. ${perm}`, 25, yPos);
          yPos += 10;
        });
      }
      
      pdf.save(`${pageName}-${role.user_email}.pdf`);
    } catch (error) {
      console.error(error);
      alert('Error generating PDF');
    }
  };

  if (loading) return <GymLoader message="Loading super admin panel..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('AdminDashboard')}>
              <Button variant="outline" size="icon" className="bg-white text-purple-600 hover:bg-gray-200">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8" />
                <h1 className="text-4xl font-black">Super Admin Panel</h1>
              </div>
              <p className="text-purple-200">Manage users, roles & permissions</p>
            </div>
          </div>
          <Button onClick={() => setShowUserForm(true)} className="bg-white text-purple-600 hover:bg-gray-200">
            <Plus className="w-5 h-5 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Users List */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-6">
        {userRoles.map((role, index) => {
          const userInfo = getUserInfo(role.user_email);
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{userInfo?.full_name || role.user_email}</CardTitle>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          role.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                          role.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {role.role.replace('_', ' ').toUpperCase()}
                        </span>
                        {!role.is_active && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{role.user_email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleResendEmail(role)}
                        disabled={sendingEmail === role.id}
                        title="Resend invitation email"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEditUser(role)}
                        title="Edit permissions"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={role.is_active}
                        onCheckedChange={(checked) => handleUpdateRole(role.id, { is_active: checked })}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => downloadPageAsPDF('UserRole', role)}
                        title="Download as PDF"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteRole(role.id, role.user_email)}
                        disabled={role.user_email === currentUser.email}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {role.role !== 'super_admin' && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions?.length > 0 ? (
                          role.permissions.map(perm => (
                            <span key={perm} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {AVAILABLE_PERMISSIONS.find(p => p.id === perm)?.label || perm}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No permissions assigned</span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={showUserForm} onOpenChange={(open) => {
        setShowUserForm(open);
        if (!open) {
          setEditingUser(null);
          setFormData({ email: '', role: 'editor', permissions: [] });
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New Admin User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={editingUser}
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Role *</label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role !== 'super_admin' && (
              <div>
                <label className="block text-sm font-semibold mb-3">Permissions</label>
                <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-4">
                  {AVAILABLE_PERMISSIONS.map(perm => (
                    <div key={perm.id} className="flex items-center gap-2">
                      <Switch
                        checked={formData.permissions.includes(perm.id)}
                        onCheckedChange={() => togglePermission(perm.id)}
                      />
                      <label className="text-sm">{perm.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setShowUserForm(false);
                setEditingUser(null);
                setFormData({ email: '', role: 'editor', permissions: [] });
              }}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
