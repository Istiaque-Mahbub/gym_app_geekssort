import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  User, Camera, Mail, Phone, TrendingUp, Target, Award, 
  Calendar, Activity, Dumbbell, Apple, BarChart3, Trophy,
  Edit, Save, X, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GymLoader from '@/components/GymLoader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [stats, setStats] = useState({
    workoutPlans: 0,
    mealPlans: 0,
    progressLogs: 0,
    achievements: 0,
    activeChallenges: 0,
    totalPoints: 0
  });
  const [progressData, setProgressData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    current_weight: '',
    target_weight: '',
    fitness_goal: 'general_fitness',
    fitness_level: 'beginner'
  });

  const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true
  });

  useEffect(() => {
    loadCurrentUser();

    const interval = setInterval(() => {
      if (user) loadUserData(user);
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const loadCurrentUser = async () => {
    try {
      const res = await apiClient.get('/me/');
      setUser(res.data);
      setProfileForm({
        full_name: res.data.full_name || '',
        email: res.data.email || '',
        phone: res.data.phone || '',
        age: res.data.age || '',
        height: res.data.height || '',
        current_weight: res.data.current_weight || '',
        target_weight: res.data.target_weight || '',
        fitness_goal: res.data.fitness_goal || 'general_fitness',
        fitness_level: res.data.fitness_level || 'beginner'
      });

      // BMI calculation
      if (res.data.current_weight && res.data.height) {
        const heightM = res.data.height / 100;
        const bmiVal = (res.data.current_weight / (heightM * heightM)).toFixed(1);
        setBmi(bmiVal);
        if (bmiVal < 18.5) setBmiCategory('Underweight');
        else if (bmiVal < 25) setBmiCategory('Normal');
        else if (bmiVal < 30) setBmiCategory('Overweight');
        else setBmiCategory('Obese');
      }

      await loadUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      window.location.href = createPageUrl('Login');
    }
  };

  const loadUserData = async (currentUser) => {
    try {
      // Fetch stats
      const [workoutsRes, mealsRes, logsRes, achievementsRes, challengesRes, profilesRes] = await Promise.all([
        apiClient.get(`/workout-plans?user_id=${currentUser.id}`),
        apiClient.get(`/meal-plans?user_id=${currentUser.id}`),
        apiClient.get(`/progress-logs?user_id=${currentUser.id}`),
        apiClient.get(`/achievements?user_id=${currentUser.id}`),
        apiClient.get(`/user-challenges?user_id=${currentUser.id}`),
        apiClient.get(`/user-profiles?sort=-total_points&limit=10`)
      ]);

      setStats({
        workoutPlans: workoutsRes.data.length,
        mealPlans: mealsRes.data.length,
        progressLogs: logsRes.data.length,
        achievements: achievementsRes.data.length,
        activeChallenges: challengesRes.data.filter(c => !c.is_completed).length,
        totalPoints: profilesRes.data.find(p => p.user_id === currentUser.id)?.total_points || 0
      });

      setAchievements(achievementsRes.data);

      const chartData = logsRes.data
        .sort((a,b) => new Date(a.log_date)-new Date(b.log_date))
        .slice(-10)
        .map(log => ({
          date: new Date(log.log_date).toLocaleDateString('en-US',{month:'short',day:'numeric'}),
          weight: log.weight || 0,
          bodyFat: log.body_fat_percentage || 0
        }));
      setProgressData(chartData);

      const leaderboardData = await Promise.all(
        profilesRes.data.map(async profile => {
          try {
            const userRes = await apiClient.get(`/users?email=${profile.user_email}`);
            return {
              name: userRes.data[0]?.full_name || 'Anonymous',
              points: profile.total_points || 0,
              level: profile.fitness_level || 'beginner',
              email: profile.user_email
            };
          } catch {
            return {
              name: 'Anonymous',
              points: profile.total_points || 0,
              level: profile.fitness_level || 'beginner',
              email: profile.user_email
            };
          }
        })
      );
      setLeaderboard(leaderboardData);

    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.patch('/me/', profileForm);
      setUser({...user, ...profileForm});

      if (profileForm.current_weight && profileForm.height) {
        const heightM = profileForm.height / 100;
        const bmiVal = (profileForm.current_weight / (heightM * heightM)).toFixed(1);
        setBmi(bmiVal);
        if (bmiVal < 18.5) setBmiCategory('Underweight');
        else if (bmiVal < 25) setBmiCategory('Normal');
        else if (bmiVal < 30) setBmiCategory('Overweight');
        else setBmiCategory('Obese');
      }

      setEditingProfile(false);
      await loadUserData({...user, ...profileForm});
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleLogout = () => {
    window.location.href = createPageUrl('Home');
  };

  if (loading) return <GymLoader message="Loading your dashboard..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      {/* Header */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Welcome back, {user?.full_name || 'User'}!</h1>
              <p className="text-gray-300 text-lg">Track your fitness journey and achieve your goals</p>
            </div>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Dashboard content */}
      {/* ...You can reuse the same JSX from your original code for Tabs, Cards, Charts, Achievements, Leaderboard */}
      {/* Just keep the state and data fetching from the new API */}
    </div>
  );
}
