import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Dumbbell, Calendar, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GymLoader from '@/components/GymLoader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '@/lib/apiClient';

export default function InstructorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ classes: 0, students: 0, workouts: 0, achievements: 0 });
  const [progressData, setProgressData] = useState([]);

  // const apiClient = axios.create({ baseURL: '/api', withCredentials: true });

  useEffect(() => {
    const loadUser = async () => {
      try {
         const token = localStorage.getItem('access');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        // Fetch current user with Authorization header
        const res = await apiClient.get('/accounts/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.role !== 'instructor') {
          window.location.href = '/login';
          return;
        }

        setUser(res.data);

        const [classesRes, studentsRes, workoutsRes, logsRes] = await Promise.all([
          apiClient.get(`/instructor/classes?user_id=${res.data.id}`),
          apiClient.get(`/instructor/students?user_id=${res.data.id}`),
          apiClient.get(`/instructor/workouts?user_id=${res.data.id}`),
          apiClient.get(`/progress-logs?user_id=${res.data.id}`)
        ]);

        setStats({
          classes: classesRes.data.length,
          students: studentsRes.data.length,
          workouts: workoutsRes.data.length,
          achievements: res.data.achievements || 0
        });

        const chartData = logsRes.data
          .sort((a,b) => new Date(a.log_date)-new Date(b.log_date))
          .slice(-10)
          .map(log => ({
            date: new Date(log.log_date).toLocaleDateString('en-US',{month:'short',day:'numeric'}),
            weight: log.weight || 0,
            bodyFat: log.body_fat_percentage || 0
          }));
        setProgressData(chartData);

        setLoading(false);
      } catch (error) {
        console.error(error);
       // Redirect only if unauthorized
        if (error.response?.status === 401) {
          window.location.href = '/login';
        } else {
          setLoading(false);
        }
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
    localStorage.removeItem('full_name');
    window.location.href = '/login';
  };

  if (loading) return <GymLoader message="Loading instructor dashboard..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Welcome Instructor, {user?.full_name}</h1>
              <p className="text-gray-300 text-lg">Manage your classes and students</p>
            </div>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="p-6">
            <CardHeader><CardTitle>{key.toUpperCase()}</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-black mb-6">Student Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
