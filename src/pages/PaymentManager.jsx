import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Edit2, Trash2, Save, X,
  CreditCard, Tag, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PaymentService } from '@/services/PaymentService';

export default function PaymentManager() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    member_name: '',
    amount: '',
    payment_date: '',
    payment_type: 'cash',
    is_active: true,
  });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Load payments
  useEffect(() => {
    loadPayments();
  }, [debouncedSearch]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;

      const data = await PaymentService.getDashboardPayments(params);
      setPayments(data.results || data);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      member_name: payment.member_name || '',
      amount: payment.amount || '',
      payment_date: payment.payment_date || '',
      payment_type: payment.payment_type || 'cash',
      is_active: payment.is_active ?? true,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      member_name: '',
      amount: '',
      payment_date: '',
      payment_type: 'cash',
      is_active: true,
    });
    setEditingPayment(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        await PaymentService.updateDashboardPayment(editingPayment.id, formData);
      } else {
        await PaymentService.createDashboardPayment(formData);
      }
      await loadPayments();
      resetForm();
    } catch (error) {
      console.error('Error saving payment:', error);
      alert('Failed to save payment.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this payment?')) return;
    try {
      await PaymentService.deleteDashboardPayment(id);
      await loadPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Failed to delete payment.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
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
            <h1 className="text-4xl font-black">Payment Manager</h1>
            <p className="text-gray-400 mt-1">{payments.length} payments found</p>
          </div>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={() => setShowForm(true)}>
            <Save className="w-4 h-4 mr-2" /> Add Payment
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/3 bg-white border rounded-xl px-3 py-2 shadow-sm mb-6">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by member name..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Payment Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">{editingPayment ? 'Edit Payment' : 'Add New Payment'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Member Name *</label>
                  <Input value={formData.member_name} onChange={(e) => setFormData({ ...formData, member_name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Amount *</label>
                  <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Payment Date *</label>
                  <Input type="date" value={formData.payment_date} onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Payment Type</label>
                  <select value={formData.payment_type} onChange={(e) => setFormData({ ...formData, payment_type: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                <span>Active</span>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-400 text-white hover:bg-blue-500">
                  <Save className="w-4 h-4 mr-2" /> {editingPayment ? 'Update Payment' : 'Add Payment'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Payment List */}
        <div className="space-y-6">
          <AnimatePresence>
            {payments.map((payment, index) => (
              <motion.div key={payment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }}>
                <Card className="hover:shadow-2xl transition-all border border-gray-200 rounded-xl bg-white">
                  <CardContent className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left Column */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Member:</span> {payment.member_name}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Amount:</span> ${payment.amount}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Date:</span> {new Date(payment.payment_date).toLocaleDateString()}
                        </div>
                        <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2 break-words">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">Type:</span> {payment.payment_type}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col justify-between mt-12">
                        {/* <div className="p-2 border rounded-lg bg-gray-50 flex items-center justify-between">
                          <span className="font-semibold">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${payment.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {payment.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div> */}

                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(payment)}>
                            <Edit2 className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(payment.id)}>
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
          {payments.length === 0 && <p className="text-center text-gray-400 py-12 text-lg italic">No payments found.</p>}
        </div>
      </div>
    </div>
  );
}