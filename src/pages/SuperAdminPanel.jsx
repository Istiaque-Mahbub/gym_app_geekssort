import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Plus, Edit2, Trash2, Shield, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GymLoader from '@/components/GymLoader';

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

  const loadData = async () => {
    try {
      const user = await base44.auth.me();
      
      // Check if user is super admin
      const userRole = await base44.entities.UserRole.filter({ user_email: user.email });
      if (!userRole[0] || userRole[0].role !== 'super_admin') {
        window.location.href = createPageUrl('Home');
        return;
      }

      setCurrentUser(user);

      // Load all users and their roles
      const allUsers = await base44.entities.User.list();
      const allRoles = await base44.entities.UserRole.list();
      
      setUsers(allUsers);
      setUserRoles(allRoles);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      window.location.href = createPageUrl('Home');
    }
  };

  const sendWelcomeEmail = async (email, role, permissions) => {
    const loginUrl = window.location.origin;
    const permissionsList = role === 'super_admin' 
      ? 'All administrative functions'
      : permissions.length > 0 
        ? permissions.map(p => AVAILABLE_PERMISSIONS.find(perm => perm.id === p)?.label).join(', ')
        : 'No specific permissions assigned yet';

    await base44.integrations.Core.SendEmail({
      from_name: 'FitHive Admin',
      to: email,
      subject: '🎉 Welcome to FitHive Admin Panel',
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9fafb; padding: 40px 30px; }
            .role-badge { display: inline-block; background: #fbbf24; color: #000; padding: 10px 20px; border-radius: 25px; font-weight: bold; font-size: 14px; }
            .button { display: inline-block; background: #9333ea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; }
            .info-box { background: white; padding: 25px; border-left: 4px solid #9333ea; margin: 25px 0; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; padding: 30px; color: #666; font-size: 13px; background: #e5e7eb; }
            ol { padding-left: 20px; }
            ol li { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏋️ Welcome to FitHive Admin</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">You've been granted administrative access!</p>
            </div>
            <div class="content">
              <h2 style="color: #111; margin-top: 0;">Hello!</h2>
              <p>We're excited to have you join the FitHive admin team. You've been granted access to manage our fitness platform.</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #9333ea;">Your Role:</h3>
                <span class="role-badge">${role.replace('_', ' ').toUpperCase()}</span>
                
                <h3 style="margin-top: 25px; color: #9333ea;">Your Permissions:</h3>
                <p style="margin: 10px 0 0 0;">${permissionsList}</p>
              </div>

              <h3 style="color: #111;">Getting Started:</h3>
              <ol>
                <li><strong>Access the Panel:</strong> Click the button below to visit the admin dashboard</li>
                <li><strong>Login:</strong> Use your email address to sign in</li>
                <li><strong>Explore:</strong> Familiarize yourself with the management tools available</li>
              </ol>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" class="button">Access Admin Panel →</a>
              </div>

              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-top: 25px;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>💡 Need Help?</strong> If you have questions or need assistance, contact your super administrator at the admin panel.
                </p>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;"><strong>FitHive Fitness Management</strong></p>
              <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} FitHive. All rights reserved.</p>
              <p style="margin: 10px 0 0 0; color: #999;">This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update existing user
        await base44.entities.UserRole.update(editingUser.id, {
          role: formData.role,
          permissions: formData.permissions
        });
        alert('User updated successfully!');
      } else {
        // Create new role assignment
        await base44.entities.UserRole.create({
          user_email: formData.email,
          role: formData.role,
          permissions: formData.permissions,
          created_by_email: currentUser.email,
          is_active: true
        });

        // Send welcome email
        await sendWelcomeEmail(formData.email, formData.role, formData.permissions);
        alert('User created successfully! A welcome email has been sent to ' + formData.email);
      }

      setShowUserForm(false);
      setEditingUser(null);
      setFormData({ email: '', role: 'editor', permissions: [] });
      await loadData();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleResendEmail = async (role) => {
    try {
      setSendingEmail(role.id);
      await sendWelcomeEmail(role.user_email, role.role, role.permissions || []);
      alert('Invitation email sent to ' + role.user_email);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email: ' + error.message);
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
      await base44.entities.UserRole.update(roleId, updates);
      await loadData();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error updating role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!confirm('Are you sure you want to remove this user\'s admin access?')) return;
    try {
      await base44.entities.UserRole.delete(roleId);
      await loadData();
    } catch (error) {
      console.error('Error deleting role:', error);
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

  const getUserInfo = (email) => {
    return users.find(u => u.email === email);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <GymLoader message="Loading super admin panel..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-black mb-2 text-purple-600">
                {userRoles.filter(r => r.role === 'super_admin').length}
              </div>
              <div className="text-sm text-gray-600">Super Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-black mb-2 text-blue-600">
                {userRoles.filter(r => r.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-black mb-2 text-green-600">
                {userRoles.filter(r => r.role === 'editor').length}
              </div>
              <div className="text-sm text-gray-600">Editors</div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="grid gap-6">
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
                        {role.user_email !== currentUser.email && (
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
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

          {userRoles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No admin users yet. Create your first one!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Dialog */}
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