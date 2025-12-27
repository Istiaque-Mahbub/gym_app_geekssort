import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  MessageSquare, 
  FileText, 
  Settings, 
  TrendingUp,
  AlertCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    totalPages: 0,
    activeBanners: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      
      if (currentUser.role !== 'admin') {
        window.location.href = createPageUrl('Home');
        return;
      }

      setUser(currentUser);

      const inquiries = await base44.entities.Inquiry.list();
      const pages = await base44.entities.PageContent.list();
      const banners = await base44.entities.SiteBanner.list();

      setStats({
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter(i => i.status === 'new').length,
        totalPages: pages.length,
        activeBanners: banners.filter(b => b.is_active).length
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      window.location.href = createPageUrl('Home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'blue',
      link: 'InquiryManager'
    },
    {
      title: 'New Inquiries',
      value: stats.newInquiries,
      icon: AlertCircle,
      color: 'yellow',
      link: 'InquiryManager'
    },
    {
      title: 'Content Pages',
      value: stats.totalPages,
      icon: FileText,
      color: 'green',
      link: 'ContentManager'
    },
    {
      title: 'Active Banners',
      value: stats.activeBanners,
      icon: TrendingUp,
      color: 'purple',
      link: 'BannerManager'
    }
  ];

  const quickActions = [
    { title: 'Manage Inquiries', icon: MessageSquare, link: 'InquiryManager', color: 'blue' },
    { title: 'Blog Manager', icon: FileText, link: 'BlogManager', color: 'indigo' },
    { title: 'Content Manager', icon: FileText, link: 'ContentManager', color: 'green' },
    { title: 'Banner Manager', icon: TrendingUp, link: 'BannerManager', color: 'purple' },
    { title: 'Visitor Analytics', icon: Users, link: 'VisitorAnalytics', color: 'orange' },
    { title: 'User Management', icon: Users, link: 'UserManager', color: 'red' },
    { title: 'Notification Settings', icon: Settings, link: 'NotificationSettings', color: 'gray' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.full_name}</p>
            </div>
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={createPageUrl(stat.link)}>
                <Card className="hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-500' :
                        stat.color === 'yellow' ? 'bg-yellow-100 group-hover:bg-yellow-400' :
                        stat.color === 'green' ? 'bg-green-100 group-hover:bg-green-500' :
                        'bg-purple-100 group-hover:bg-purple-500'
                      } transition-colors`}>
                        <stat.icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-600 group-hover:text-white' :
                          stat.color === 'yellow' ? 'text-yellow-600 group-hover:text-black' :
                          stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
                          'text-purple-600 group-hover:text-white'
                        } transition-colors`} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-black mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={createPageUrl(action.link)}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-500' :
                    action.color === 'indigo' ? 'bg-indigo-500' :
                    action.color === 'green' ? 'bg-green-500' :
                    action.color === 'purple' ? 'bg-purple-500' :
                    action.color === 'orange' ? 'bg-orange-500' :
                    action.color === 'red' ? 'bg-red-500' :
                    'bg-gray-800'
                  }`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{action.title}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}