// pages/PackageManager.jsx
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
import { MemberShipService } from '@/services/MemberShipService';

export default function PackageManager() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    package_type: 'monthly',
    duration_in_days: '',
    price: '',
  });

  const loadPackages = async () => {
    setLoading(true);
    try {
      const data = await MemberShipService.getDashboardPackages();
      setPackages(data.results || data);
    } catch (error) {
      console.error('Error loading packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name || '',
      package_type: pkg.package_type || 'monthly',
      duration_in_days: pkg.duration_in_days || '',
      price: pkg.price || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      package_type: 'monthly',
      duration_in_days: '',
      price: '',
    });
    setEditingPackage(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await MemberShipService.updateDashboardPackage(editingPackage.id, formData);
      } else {
        await MemberShipService.createDashboardPackage(formData);
      }
      await loadPackages();
      resetForm();
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await MemberShipService.deleteDashboardPackage(id);
      await loadPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link to={createPageUrl('AdminDashboard')} className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black">MemberShip Package Manager</h1>
            <p className="text-gray-400 mt-1">{packages.length} packages found</p>
          </div>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={() => setShowForm(true)}>
            <Save className="w-4 h-4 mr-2" /> Add Package
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Package Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Package Type</label>
                  <select
                    value={formData.package_type}
                    onChange={(e) => setFormData({ ...formData, package_type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="3_month">3 Months</option>
                    <option value="6_month">6 Months</option>
                    <option value="12_month">12 Months</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Duration (days) *</label>
                  <Input type="number" value={formData.duration_in_days} onChange={(e) => setFormData({ ...formData, duration_in_days: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                  <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-400 text-white hover:bg-blue-500">
                  <Save className="w-4 h-4 mr-2" /> {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Package List */}
        <div className="space-y-4">
          <AnimatePresence>
            {packages.map((pkg, index) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }}>
                <Card className="hover:shadow-xl transition-all">
                 <CardContent className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column: Package Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <h3 className="col-span-2 text-2xl font-bold text-gray-800">{pkg.name}</h3>
                      
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Type:</span> {pkg.package_type}
                      </div>
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Duration:</span> {pkg.duration_in_days} days
                      </div>
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Price:</span> ${pkg.price}
                      </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="flex flex-col justify-between">
                      <div className="flex gap-2 mt-12">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)}>
                          <Edit2 className="w-4 h-4" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(pkg.id)}>
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {packages.length === 0 && <p className="text-center text-gray-500 py-12">No packages found.</p>}
        </div>
      </div>
    </div>
  );
}