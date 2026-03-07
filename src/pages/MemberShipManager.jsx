// pages/MembershipManager.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Clock, Edit2, Trash2, Save, X,
  Phone, CreditCard, Key, Tag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MemberService } from '@/services/MemberService';

export default function MembershipManager() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    membership_type: 'monthly',
    member_package: '',
    start_date: '',
    end_date: '',
    card_id: '',
    fingerprint_id: '',
    is_active: true,
  });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Load packages on mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await MemberService.getDashboardPackages();
        setPackages(data.results || data);
      } catch (error) {
        console.error('Error loading packages:', error);
      }
    };
    loadPackages();
  }, []);

  // Load members whenever search/filter changes
  useEffect(() => {
    loadMembers();
  }, [filterType, debouncedSearch]);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterType !== 'all') params.membership_type = filterType;
      if (debouncedSearch) params.search = debouncedSearch;

      const data = await MemberService.getDashboardMembers(params);
      setMembers(data.results || data);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name || '',
      phone_number: member.phone_number || '',
      membership_type: member.membership_type || 'monthly',
      member_package: member.member_package?.id || '',
      start_date: member.start_date || '',
      end_date: member.end_date || '',
      card_id: member.card_id || '',
      fingerprint_id: member.fingerprint_id || '',
      is_active: member.is_active ?? true,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      phone_number: '',
      membership_type: 'monthly',
      member_package: '',
      start_date: '',
      end_date: '',
      card_id: '',
      fingerprint_id: '',
      is_active: true,
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await MemberService.updateDashboardMember(editingMember.id, formData);
      } else {
        await MemberService.createDashboardMember(formData);
      }
      await loadMembers();
      resetForm();
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Failed to save member.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      await MemberService.deleteDashboardMember(id);
      await loadMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link to={createPageUrl('AdminDashboard')} className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black">Membership Manager</h1>
            <p className="text-gray-400 mt-1">{members.length} members found</p>
          </div>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={() => setShowForm(true)}>
            <Save className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center w-full md:w-1/3 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'monthly', 'package'].map((type) => (
              <Button
                key={type}
                onClick={() => setFilterType(type)}
                variant={filterType === type ? 'default' : 'outline'}
                className={filterType === type ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
              >
                {type === 'all' ? 'All Members' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Member Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <Input value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <Input value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Membership Type</label>
                  <select value={formData.membership_type} onChange={(e) => setFormData({ ...formData, membership_type: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="monthly">Monthly</option>
                    <option value="package">Package</option>
                  </select>
                </div>
              </div>

              {formData.membership_type === 'package' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Package</label>
                  <select value={formData.member_package} onChange={(e) => setFormData({ ...formData, member_package: e.target.value })} className="w-full border rounded px-3 py-2" required>
                    <option value="">Select a Package</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <Input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <Input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Card ID</label>
                  <Input value={formData.card_id} onChange={(e) => setFormData({ ...formData, card_id: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Fingerprint ID</label>
                  <Input value={formData.fingerprint_id} onChange={(e) => setFormData({ ...formData, fingerprint_id: e.target.value })} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                <span>Active</span>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-400 text-white hover:bg-blue-500">
                  <Save className="w-4 h-4 mr-2" /> {editingMember ? 'Update Member' : 'Add Member'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Member List */}
        <div className="space-y-6">
          <AnimatePresence>
            {members.map((member, index) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }}>
                <Card className="hover:shadow-2xl transition-all border border-gray-200 rounded-xl bg-white">
                  
                  <CardContent className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left Column */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h3 className="col-span-2 text-2xl font-bold text-gray-800">{member.full_name}</h3>

                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Phone:</span> {member.phone_number}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Membership:</span> {member.membership_type === 'package' ? member.member_package?.name : 'Monthly Only'}
                        </div>

                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Remaining Days:</span> {member.remaining_days}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Card ID:</span> {member.card_id || '-'}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Fingerprint ID:</span> {member.fingerprint_id || '-'}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Created At:</span> {new Date(member.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col justify-between mt-12">
                        <div className="space-y-4">
                          <div className="p-2 border rounded-lg bg-gray-50 flex items-center justify-between">
                            <span className="font-semibold">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${member.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {member.is_active ? 'Active' : 'Expired'}
                            </span>
                          </div>
                          <div className="p-2 border rounded-lg bg-gray-50 flex items-center justify-between">
                            <span className="font-semibold mr-2">Membership Period:</span>
                            <span className="text-gray-600 text-sm">{new Date(member.start_date).toLocaleDateString()} - {new Date(member.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                            <Edit2 className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {members.length === 0 && <p className="text-center text-gray-400 py-12 text-lg italic">No members found.</p>}
        </div>
      </div>
    </div>
  );
}