// pages/ReportManager.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Users, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MemberService } from '@/services/MemberService';
import { PaymentService } from '@/services/PaymentService';
import { AttendanceService } from '@/services/AttendanceService';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function ReportManager() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filterMonth, setFilterMonth] = useState('');

  useEffect(() => {
    loadAllData();
  }, [filterMonth]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // ---------------- MEMBERS ----------------
      const memberData = await MemberService.getDashboardMembers();
      const memberList = memberData.results || memberData;
      setMembers(memberList);

      // ---------------- PAYMENTS ----------------
      const paymentData = await PaymentService.getDashboardPayments();
      let paymentList = paymentData.results || paymentData;

      if (filterMonth) {
        paymentList = paymentList.filter(p =>
          p.payment_date?.startsWith(filterMonth)
        );
      }
      setPayments(paymentList);

      // ---------------- ATTENDANCE ----------------
      const attendanceData = await AttendanceService.getDashboardAttendance();
      let attendanceList = attendanceData.results || attendanceData;

      if (filterMonth) {
        attendanceList = attendanceList.filter(a => {
          const date = a.check_in_time || a.check_out_time;
          return date?.startsWith(filterMonth);
        });
      }
      setAttendance(attendanceList);

    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // STATS CALCULATIONS
  // ==============================

  const totalMembers = members.length;

  const totalPayments = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  const attendanceByDay = {};
  attendance.forEach(a => {
    const date = (a.check_in_time || a.check_out_time)?.slice(0, 10);
    if (date) {
      attendanceByDay[date] = (attendanceByDay[date] || 0) + 1;
    }
  });

  const attendanceBarData = Object.keys(attendanceByDay)
    .sort()
    .slice(-15)
    .map(date => ({
      date,
      count: attendanceByDay[date]
    }));

  const avgAttendance = attendanceBarData.length
    ? (
        attendanceBarData.reduce((sum, d) => sum + d.count, 0) /
        attendanceBarData.length
      ).toFixed(1)
    : 0;

  const memberPieData = [
    { name: 'Active', value: members.filter(m => m.is_active).length },
    { name: 'Expired', value: members.filter(m => !m.is_active).length }
  ];

  const paymentPieData = ['admission', 'package', 'monthly'].map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: payments
      .filter(p => p.payment_type === type)
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <Link
            to={createPageUrl('AdminDashboard')}
            className="inline-flex items-center text-yellow-300 hover:text-white mb-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black">Report Manager</h1>
          <p className="text-indigo-100 mt-1">
            Overview of members, payments and attendance analytics
          </p>
        </div>
      </div>

      

      {/* ========================= */}
      {/* FILTER SECTION */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-4 bg-white p-6 rounded-2xl shadow-md">
          <label className="font-semibold text-gray-700">
            Filter by Month:
          </label>
          <Input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="w-52"
          />
          <Button
            onClick={() => setFilterMonth('')}
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* ========================= */}
      {/* STATS SECTION (TOP) */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-6 mt-4 mb-12">
        <div className="grid md:grid-cols-3 gap-6">

          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Members</p>
                <h2 className="text-3xl font-bold mt-1">
                  {totalMembers}
                </h2>
              </div>
              <Users className="w-10 h-10 text-indigo-500" />
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Payments</p>
                <h2 className="text-3xl font-bold mt-1">
                  ৳ {totalPayments.toLocaleString()}
                </h2>
              </div>
              <CreditCard className="w-10 h-10 text-green-500" />
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Attendance</p>
                <h2 className="text-3xl font-bold mt-1">
                  {avgAttendance} /day
                </h2>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ========================= */}
      {/* CHARTS SECTION */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid md:grid-cols-3 gap-6">

        {/* Member Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Members Status
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={memberPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {memberPieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payments Summary
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {paymentPieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:col-span-3"
        >
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Daily Attendance (Last {attendanceBarData.length} Days)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceBarData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}