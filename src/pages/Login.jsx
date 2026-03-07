import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Login and get tokens
      const loginRes = await AuthService.login(formData);

      const { access, refresh } = loginRes;

      // Save tokens
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // 2️⃣ Fetch real user info from backend
      const user = await AuthService.getCurrentUser();

      if (!user) throw new Error('Failed to get user data');

      // Save user info
      localStorage.setItem('role', user.role);
      localStorage.setItem('full_name', user.full_name);

      // Notify header
      window.dispatchEvent(new Event('authChanged'));

      // 3️⃣ Redirect based on role
      if (['admin', 'superuser', 'staff'].includes(user.role)) {
        navigate('/AdminDashboard');
      } else if (user.role === 'instructor') {
        navigate('/InstructorDashboard');
      } else {
        navigate('/UserDashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Invalid credentials or server error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to your FitHive account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold mb-2 block">Email or Phone</label>
            <Input
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email or phone"
              className="py-6"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Password</label>
            <Input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter password"
              className="py-6"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-6 text-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-yellow-500 font-bold cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
