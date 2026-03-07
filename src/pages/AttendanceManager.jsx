// pages/AttendanceManager.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Clock, Edit2, Trash2, Save, X, User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AttendanceService } from '@/services/AttendanceService';
import { MemberService } from '@/services/MemberService';

export default function AttendanceManager() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [dateFilter, setDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [formData, setFormData] = useState({
    member_id: '',
    check_in_time: '',
    check_out_time: '',
    status: 'present',
    notes: '',
    entry_method: 'card',
  });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Load members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await MemberService.getDashboardMembers();
        setMembers(data.results || data);
      } catch (error) {
        console.error('Error loading members:', error);
      }
    };
    loadMembers();
  }, []);

  // Load attendance records
  useEffect(() => {
    loadRecords();
  }, [debouncedSearch, dateFilter, customDate]);

  // Helper to extract date string from ISO
  const getRecordDate = (rec) => {
    if (rec.check_in_time) return new Date(rec.check_in_time).toISOString().split('T')[0];
    if (rec.check_out_time) return new Date(rec.check_out_time).toISOString().split('T')[0];
    return null;
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await AttendanceService.getDashboardAttendance();
      let recordsData = data.results || data;

      // Filter by search
      if (debouncedSearch) {
        recordsData = recordsData.filter(r => r.member_name.toLowerCase().includes(debouncedSearch.toLowerCase()));
      }

      // Filter by date
      const today = new Date();
      const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
      const month = today.getMonth();
      const year = today.getFullYear();

      recordsData = recordsData.filter((r) => {
        const dateStr = getRecordDate(r);
        if (!dateStr) return false;
        const recDate = new Date(dateStr);

        if (dateFilter === 'today') {
          return recDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'yesterday') {
          return recDate.toDateString() === yesterday.toDateString();
        } else if (dateFilter === 'this_month') {
          return recDate.getMonth() === month && recDate.getFullYear() === year;
        } else if (dateFilter === 'other_month') {
          return recDate.getMonth() !== month || recDate.getFullYear() !== year;
        } else if (dateFilter === 'custom' && customDate) {
          return dateStr === customDate;
        }
        return true; // 'all'
      });

      setRecords(recordsData);
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    // Find the member object from members array
    const memberObj = members.find(m => m.full_name === record.member_name);

    setEditingRecord(record);
    setFormData({
        member_id: memberObj ? memberObj.id.toString() : '', // string for select
        check_in_time: record.check_in_time ? record.check_in_time.slice(11,16) : '',
        check_out_time: record.check_out_time ? record.check_out_time.slice(11,16) : '',
        status: record.status || 'present',
        notes: record.notes || '',
        entry_method: record.entry_method || 'card',
    });
    setShowForm(true);
   };
  const resetForm = () => {
    setFormData({
      member_id: '',
      check_in_time: '',
      check_out_time: '',
      status: 'present',
      notes: '',
      entry_method: 'card',
    });
    setEditingRecord(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = customDate || new Date().toISOString().split('T')[0];
      const payload = {
        member: formData.member_id,
        check_in_time: formData.check_in_time ? `${date}T${formData.check_in_time}:00` : null,
        check_out_time: formData.check_out_time ? `${date}T${formData.check_out_time}:00` : null,
        status: formData.status,
        notes: formData.notes,
        entry_method: formData.entry_method,
      };

      if (editingRecord) {
        await AttendanceService.updateDashboardAttendance(editingRecord.id, payload);
      } else {
        await AttendanceService.createDashboardAttendance(payload);
      }
      await loadRecords();
      resetForm();
    } catch (error) {
      console.error('Error saving attendance:', error.response?.data || error);
      alert('Failed to save attendance record.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await AttendanceService.deleteDashboardAttendance(id);
      await loadRecords();
    } catch (error) {
      console.error('Error deleting attendance:', error);
      alert('Failed to delete record.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance...</p>
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
            <h1 className="text-4xl font-black">Attendance Manager</h1>
            <p className="text-gray-400 mt-1">{records.length} records found</p>
          </div>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={() => setShowForm(true)}>
            <Save className="w-4 h-4 mr-2" /> Add Record
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center w-full md:w-1/3 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by member..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            {['all','today','yesterday','this_month','other_month','custom'].map((type) => (
              <Button
                key={type}
                variant={dateFilter === type ? 'default' : 'outline'}
                onClick={() => {
                  setDateFilter(type);
                  if (type !== 'custom') setCustomDate('');
                }}
              >
                {type === 'all' ? 'All' :
                 type === 'today' ? 'Today' :
                 type === 'yesterday' ? 'Yesterday' :
                 type === 'this_month' ? 'This Month' :
                 type === 'other_month' ? 'Other Month' :
                 'Custom'}
              </Button>
            ))}
            {dateFilter === 'custom' && (
              <Input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
            )}
          </div>
        </div>

        {/* Add/Edit Attendance Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">{editingRecord ? 'Edit Record' : 'Add Attendance'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Member *</label>
                  <select
                    value={formData.member_id?.toString()} // convert to string
                    onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                    >
                    <option value="">Select Member</option>
                    {members.map((m) => (
                        <option key={m.id} value={m.id.toString()}>{m.full_name}</option> // convert to string
                    ))}
                   </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-in Time</label>
                  <Input type="time" value={formData.check_in_time} onChange={(e) => setFormData({ ...formData, check_in_time: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-out Time</label>
                  <Input type="time" value={formData.check_out_time} onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Entry Method</label>
                  <select value={formData.entry_method} onChange={(e) => setFormData({ ...formData, entry_method: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="fingerprint">Fingerprint</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Notes</label>
                  <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-400 text-white hover:bg-blue-500">
                  <Save className="w-4 h-4 mr-2" /> {editingRecord ? 'Update Record' : 'Add Record'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Attendance List */}
        <div className="space-y-6">
          <AnimatePresence>
            {records.map((rec, idx) => (
              <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: idx * 0.05 }}>
                <Card className="hover:shadow-2xl transition-all border border-gray-200 rounded-xl bg-white">
                  <CardContent className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="col-span-2 p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Member:</span> {rec.member_name}
                      </div>
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Check-in:</span> {rec.check_in_time ? new Date(rec.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                      </div>
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Check-out:</span> {rec.check_out_time ? new Date(rec.check_out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                      </div>
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                        <span className="font-semibold">Entry Method:</span> {rec.entry_method}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between mt-4 ml-2 sm:mt-0">
                      <div className="p-2 border rounded-lg bg-gray-50 flex items-center justify-between mb-2">
                        <span className="font-semibold mr-2">Attendance Date:</span>
                        <span>{getRecordDate(rec) || '-'}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(rec)}>
                          <Edit2 className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(rec.id)}>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {records.length === 0 && <p className="text-center text-gray-400 py-12 text-lg italic">No attendance records found.</p>}
        </div>
      </div>
    </div>
  );
}