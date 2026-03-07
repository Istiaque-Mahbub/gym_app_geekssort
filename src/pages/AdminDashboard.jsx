// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { createPageUrl } from '@/utils';
// import { 
//   MessageSquare, FileText, Settings, TrendingUp,
//   AlertCircle, Users, Shield, Zap, CalendarCheck, IdCard, BarChart3,Phone,Wallet          
// } from 'lucide-react';
// import BasicCalculator from '@/components/admin/BasicCalculator';
// import InvestmentCalculator from '@/components/admin/InvestmentCalculator';
// import BMRCalculator from '@/components/admin/BMRCalculator';
// import QuickNotes from '@/components/admin/QuickNotes';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import GymLoader from '@/components/GymLoader';
// import { usePermissions } from '@/components/PermissionCheck';
// import apiClient from '@/lib/apiClient';

// export default function AdminDashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalInquiries: 0,
//     newInquiries: 0,
//     totalPages: 0,
//     activeBanners: 0
//   });
//   const { userRole, hasPermission, isSuperAdmin } = usePermissions();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       // const token = localStorage.getItem('access_token');
//       const token = localStorage.getItem('access');

//       if (!token) {
//         window.location.href = '/login';
//         return;
//       }

//       // Fetch current user
//       // const userRes = await apiClient.get('/accounts/me/');
//       const userRes = await apiClient.get('/accounts/me/', {
//         headers: { Authorization: `Bearer ${token}` }, // <--- add this
//       });
//       const currentUser = userRes.data;
//       // console.log("currentuser:", currentUser);
      
//       setUser(currentUser);

//       // Fetch stats from backend
//       const [inquiriesRes, pagesRes, bannersRes] = await Promise.all([
//         apiClient.get('/dashboard/fithive-support/', { headers: { Authorization: `Bearer ${token}` } }),
//         apiClient.get('/pages/', { headers: { Authorization: `Bearer ${token}` } }),
//         apiClient.get('/banners/', { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       console.log("inquiriesRes", inquiriesRes.data)


//       const inquiries = inquiriesRes.data;
//       const pages = pagesRes.data;
//       const banners = bannersRes.data;

//       setStats({
//         totalInquiries: inquiries.length,
//         newInquiries: inquiries.filter(i => i.status === 'new').length,
//         totalPages: pages.length,
//         activeBanners: banners.filter(b => b.is_active).length
//       });

//       setLoading(false);
//     } catch (error) {
      
//       setLoading(false);
//       if (error.response?.status === 401) {
//         window.location.href = '/login';
//       } else {
//         // maybe show a toast or message instead of redirecting
//         console.error('Unexpected error:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <GymLoader message="Loading admin panel..." />
//       </div>
//     );
//   }

//   // if (!userRole || !user) {
//   //   window.location.href = '/';
//   //   return null;
//   // }

//   const statCards = [
//     {
//       title: 'Monthly Revenue',
//       value: stats.totalInquiries,
//       icon: Wallet,
//       color: 'yellow',
//       link: 'InquiryManager'
//     },
//     {
//       title: 'Active Members',
//       value: stats.totalInquiries,
//       icon: Users,
//       color: 'purple',
//       link: 'MemberShipManager'
//     },
//      {
//       title: 'Total Payment',
//       value: stats.totalInquiries,
//       icon: Wallet,
//       color: 'yellow',
//       link: 'InquiryManager'
//     },
//     {
//       title: 'Total Inquiries',
//       value: stats.totalInquiries,
//       icon: MessageSquare,
//       color: 'blue',
//       link: 'InquiryManager'
//     },
//     {
//       title: 'Total Conatcts',
//       value: stats.newInquiries,
//       icon: Phone,
//       color: 'yellow',
//       link: 'ContactManager'
//     },
//     // {
//     //   title: 'Content Pages',
//     //   value: stats.totalPages,
//     //   icon: FileText,
//     //   color: 'green',
//     //   link: 'ContentManager'
//     // },
//     // {
//     //   title: 'Active Banners',
//     //   value: stats.activeBanners,
//     //   icon: TrendingUp,
//     //   color: 'purple',
//     //   link: 'BannerManager'
//     // }
//   ];

//   const posActions = [
//     { title: 'Member Packages', icon: IdCard, link: 'MemberShipPackageManager', color: 'orange', permission: 'MemberShipPackageManager' },
//     { title: 'Membership Manager', icon: IdCard, link: 'MemberShipManager', color: 'emerald', permission: 'MemberShipManager' },
//     { title: 'Payment Manager', icon: Wallet, link: 'PaymentManager', color: 'indigo', permission: 'PaymentManager' },
//     { title: 'Attendence Manager', icon: CalendarCheck, link: 'AttendanceManager', color: 'cyan', permission: 'AttendanceManager' },
//     { title: 'Reports Manager', icon: BarChart3, link: 'ReportManager', color: 'amber', permission: 'ReportManager' },
//   ];

//   const allActions = [
//     { title: 'Contact Manager', icon: Phone, link: 'ContactManager', color: 'amber', permission: 'ContactManager' },
//     { title: 'Manage Inquiries', icon: MessageSquare, link: 'InquiryManager', color: 'blue', permission: 'InquiryManager' },
//     { title: 'Schedule Manager', icon: TrendingUp, link: 'ClassScheduleManager', color: 'amber', permission: 'ClassScheduleManager' },
//     { title: 'Class Manager', icon: TrendingUp, link: 'ClassManager', color: 'purple', permission: 'ClassManager' },
//     { title: 'Booking Manager', icon: MessageSquare, link: 'BookingManager', color: 'emerald', permission: 'BookingManager' },
    
//     { title: 'Blog Manager', icon: FileText, link: 'BlogManager', color: 'indigo', permission: 'BlogManager' },
//     { title: 'Package Manager', icon: TrendingUp, link: 'PackageManager', color: 'green', permission: 'PackageManager' },
    
//     { title: 'Club Manager', icon: TrendingUp, link: 'ClubManager', color: 'cyan', permission: 'ClubManager' },
    
//     { title: 'Banner Manager', icon: TrendingUp, link: 'BannerManager', color: 'red', permission: 'BannerManager' },
//     { title: 'Promo Banners', icon: Zap, link: 'PromoBannerManager', color: 'rose', permission: 'PromoBannerManager' },
//     { title: 'Content Manager', icon: FileText, link: 'ContentManager', color: 'orange', permission: 'ContentManager' },
//     { title: 'Site Settings', icon: Settings, link: 'SiteSettingsManager', color: 'gray', permission: 'SiteSettingsManager' },
    
//     // { title: 'Visitor Analytics', icon: Users, link: 'VisitorAnalytics', color: 'pink', permission: 'VisitorAnalytics' },
//     { title: 'Notification Settings', icon: Settings, link: 'NotificationSettings', color: 'slate', permission: 'NotificationSettings' }
//   ];

//   const quickActions = allActions.filter(action => hasPermission(action.permission));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="bg-black text-white py-8 px-6 shadow-lg">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
//             <p className="text-gray-400">Welcome back, {user?.full_name || user?.email}</p>
//             {userRole && (
//               <p className="text-yellow-400 text-sm font-semibold">
//                 {userRole.role.replace('_', ' ').toUpperCase()}
//               </p>
//             )}
//           </div>
//           <div className="flex gap-2">
//             {/* {isSuperAdmin() && ( */}
//               {/* <Link to={createPageUrl('Home')}>
//                 <Button className="bg-purple-600 hover:bg-purple-700">
//                   <Shield className="w-4 h-4 mr-2" />
//                   Back To Website
//                 </Button>
//               </Link> */}
//               <a
//                 href={createPageUrl('Home')}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button className="bg-purple-600 hover:bg-purple-700">
//                   <Shield className="w-4 h-4 mr-2" />
//                   Back To Website
//                 </Button>
//               </a>
//             {/* )} */}
//             <Button variant="outline" className="bg-white text-black hover:bg-gray-200" onClick={() => {
//               localStorage.removeItem('access');
//               localStorage.removeItem('refresh');
//               window.location.href = '/login';
//             }}>
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid md:grid-cols-4 gap-6 mb-12">
//           {statCards.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Link to={createPageUrl(stat.link)}>
//                 <Card className="hover:shadow-xl transition-all cursor-pointer group">
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                         stat.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-500' :
//                         stat.color === 'yellow' ? 'bg-yellow-100 group-hover:bg-yellow-400' :
//                         stat.color === 'green' ? 'bg-green-100 group-hover:bg-green-500' :
//                         'bg-purple-100 group-hover:bg-purple-500'
//                       } transition-colors`}>
//                         <stat.icon className={`w-6 h-6 ${
//                           stat.color === 'blue' ? 'text-blue-600 group-hover:text-white' :
//                           stat.color === 'yellow' ? 'text-yellow-600 group-hover:text-black' :
//                           stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
//                           'text-purple-600 group-hover:text-white'
//                         } transition-colors`} />
//                       </div>
//                     </div>
//                     <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
//                     <p className="text-gray-600 text-sm">{stat.title}</p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//          <motion.div className='mb-12' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <h2 className="text-2xl font-black">Management Dashboard</h2>
//           <p className="text-gray-500 mt-1 mb-5">
//             Manage attendance, memberships, and performance reports in one place.
//           </p>
//           {/* {quickActions.length === 0 ? (
//             <Card className="p-8 text-center">
//               <p className="text-gray-500">No permissions assigned. Contact your super admin.</p>
//             </Card>
//           ) : ( */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {posActions.map((action, index) => (
//                 <Link key={index} to={createPageUrl(action.link)}>
//                   <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer">
//                     <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
//                       action.color === 'blue' ? 'bg-blue-500' :
//                       action.color === 'emerald' ? 'bg-emerald-500' :
//                       action.color === 'indigo' ? 'bg-indigo-500' :
//                       action.color === 'green' ? 'bg-green-500' :
//                       action.color === 'purple' ? 'bg-purple-500' :
//                       action.color === 'cyan' ? 'bg-cyan-500' :
//                       action.color === 'amber' ? 'bg-amber-500' :
//                       action.color === 'orange' ? 'bg-orange-500' :
//                       action.color === 'red' ? 'bg-red-500' :
//                       action.color === 'pink' ? 'bg-pink-500' :
//                       action.color === 'rose' ? 'bg-rose-500' :
//                       action.color === 'teal' ? 'bg-teal-500' :
//                       action.color === 'slate' ? 'bg-slate-500' :
//                       'bg-gray-800'
//                     }`}>
//                       <action.icon className="w-7 h-7 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold">{action.title}</h3>
//                   </motion.div>
//                 </Link>
//               ))}
//             </div>
//           {/*  )} */}
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <h2 className="text-2xl font-black mb-6">Quick Actions</h2>
//           {/* {quickActions.length === 0 ? (
//             <Card className="p-8 text-center">
//               <p className="text-gray-500">No permissions assigned. Contact your super admin.</p>
//             </Card>
//           ) : ( */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {allActions.map((action, index) => (
//                 <Link key={index} to={createPageUrl(action.link)}>
//                   <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer">
//                     <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
//                       action.color === 'blue' ? 'bg-blue-500' :
//                       action.color === 'emerald' ? 'bg-emerald-500' :
//                       action.color === 'indigo' ? 'bg-indigo-500' :
//                       action.color === 'green' ? 'bg-green-500' :
//                       action.color === 'purple' ? 'bg-purple-500' :
//                       action.color === 'cyan' ? 'bg-cyan-500' :
//                       action.color === 'amber' ? 'bg-amber-500' :
//                       action.color === 'orange' ? 'bg-orange-500' :
//                       action.color === 'red' ? 'bg-red-500' :
//                       action.color === 'pink' ? 'bg-pink-500' :
//                       action.color === 'rose' ? 'bg-rose-500' :
//                       action.color === 'teal' ? 'bg-teal-500' :
//                       action.color === 'slate' ? 'bg-slate-500' :
//                       'bg-gray-800'
//                     }`}>
//                       <action.icon className="w-7 h-7 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold">{action.title}</h3>
//                   </motion.div>
//                 </Link>
//               ))}
//             </div>
//           {/*  )} */}
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12">
//           <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//             <Zap className="w-6 h-6 text-yellow-500" />
//             Admin Tools & Utilities
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <BasicCalculator />
//             <InvestmentCalculator />
//             <BMRCalculator />
//             <QuickNotes />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// pages/AdminDashboard.jsx
// pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  MessageSquare, FileText, Settings, TrendingUp,
  Users, Shield, Zap, CalendarCheck, IdCard, BarChart3, Phone, Wallet
} from 'lucide-react';
import BasicCalculator from '@/components/admin/BasicCalculator';
import InvestmentCalculator from '@/components/admin/InvestmentCalculator';
import BMRCalculator from '@/components/admin/BMRCalculator';
import QuickNotes from '@/components/admin/QuickNotes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GymLoader from '@/components/GymLoader';
import { usePermissions } from '@/components/PermissionCheck';

import { MemberService } from '@/services/MemberService';
import { PaymentService } from '@/services/PaymentService';
import { AttendanceService } from '@/services/AttendanceService';
import { ContactService } from '@/services/ContactService';
import { MemberShipService } from '@/services/MemberShipService';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    activeMembers: 0,
    totalPayments: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalMembers: 0,
    totalContacts: 0,
    totalPackages: 0
  });
  const { userRole, hasPermission } = usePermissions();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch current user
      const token = localStorage.getItem('access');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Fetch current user info
      const userRes = await MemberService.getDashboardMembers({}); // reuse member service to get current user if needed
      setUser(userRes.currentUser || { full_name: 'Admin' });

      // Fetch all data
      const [membersRes, paymentsRes, contactsRes, packagesRes, attendanceRes] = await Promise.all([
        MemberService.getDashboardMembers(),
        PaymentService.getDashboardPayments(),
        ContactService.getDashboardContacts(),
        MemberShipService.getDashboardPackages(),
        AttendanceService.getDashboardAttendance()
      ]);

      const members = membersRes.results || membersRes;
      const payments = paymentsRes.results || paymentsRes;
      const contacts = contactsRes.results || contactsRes;
      const packages = packagesRes.results || packagesRes;
      const attendance = attendanceRes.results || attendanceRes;

      const activeMembers = members.filter(m => m.is_active).length;
      const totalMembers = members.length;
      const monthlyRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
      const totalPayments = payments.length;
      const totalContacts = contacts.length;
      const totalPackages = packages.length;

      setStats({
        monthlyRevenue,
        activeMembers,
        totalPayments,
        totalInquiries: totalMembers, // replace with real inquiries if you have inquiry API
        newInquiries: contacts.filter(c => !c.read).length, // mark unread contacts as new
        totalMembers,
        totalContacts,
        totalPackages
      });

      setLoading(false);
    } catch (error) {
      console.error('Dashboard load error:', error);
      setLoading(false);
      if (error.response?.status === 401) window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <GymLoader message="Loading admin panel..." />
      </div>
    );
  }

  const statCards = [
    { title: 'Monthly Revenue', value: `৳ ${stats.monthlyRevenue.toLocaleString()}`, icon: Wallet, color: 'yellow', link: 'PaymentManager' },
    { title: 'Active Members', value: stats.activeMembers, icon: Users, color: 'purple', link: 'MemberShipManager' },
    { title: 'Total Payments', value: stats.totalPayments, icon: Wallet, color: 'yellow', link: 'PaymentManager' },
    { title: 'Total Members', value: stats.totalMembers, icon: Users, color: 'emerald', link: 'MemberShipManager' },
    { title: 'Total Contacts', value: stats.totalContacts, icon: Phone, color: 'amber', link: 'ContactManager' },
    { title: 'Active Packages', value: stats.totalPackages, icon: IdCard, color: 'orange', link: 'MemberShipPackageManager' }
  ];

  const posActions = [
    { title: 'Member Packages', icon: IdCard, link: 'MemberShipPackageManager', color: 'orange', permission: 'MemberShipPackageManager' },
    { title: 'Membership Manager', icon: IdCard, link: 'MemberShipManager', color: 'emerald', permission: 'MemberShipManager' },
    { title: 'Payment Manager', icon: Wallet, link: 'PaymentManager', color: 'indigo', permission: 'PaymentManager' },
    { title: 'Attendance Manager', icon: CalendarCheck, link: 'AttendanceManager', color: 'cyan', permission: 'AttendanceManager' },
    { title: 'Reports Manager', icon: BarChart3, link: 'ReportManager', color: 'amber', permission: 'ReportManager' },
  ];

  const allActions = [
    { title: 'Contact Manager', icon: Phone, link: 'ContactManager', color: 'amber', permission: 'ContactManager' },
    { title: 'Manage Inquiries', icon: MessageSquare, link: 'InquiryManager', color: 'blue', permission: 'InquiryManager' },
    { title: 'Schedule Manager', icon: TrendingUp, link: 'ClassScheduleManager', color: 'amber', permission: 'ClassScheduleManager' },
    { title: 'Class Manager', icon: TrendingUp, link: 'ClassManager', color: 'purple', permission: 'ClassManager' },
    { title: 'Booking Manager', icon: MessageSquare, link: 'BookingManager', color: 'emerald', permission: 'BookingManager' },
    { title: 'Blog Manager', icon: FileText, link: 'BlogManager', color: 'indigo', permission: 'BlogManager' },
    { title: 'Package Manager', icon: TrendingUp, link: 'PackageManager', color: 'green', permission: 'PackageManager' },
    { title: 'Club Manager', icon: TrendingUp, link: 'ClubManager', color: 'cyan', permission: 'ClubManager' },
    { title: 'Banner Manager', icon: TrendingUp, link: 'BannerManager', color: 'red', permission: 'BannerManager' },
    { title: 'Promo Banners', icon: Zap, link: 'PromoBannerManager', color: 'rose', permission: 'PromoBannerManager' },
    { title: 'Content Manager', icon: FileText, link: 'ContentManager', color: 'orange', permission: 'ContentManager' },
    { title: 'Site Settings', icon: Settings, link: 'SiteSettingsManager', color: 'gray', permission: 'SiteSettingsManager' },
    { title: 'Notification Settings', icon: Settings, link: 'NotificationSettings', color: 'slate', permission: 'NotificationSettings' }
  ];

  const quickActions = allActions.filter(a => hasPermission(a.permission));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.full_name || user?.email}</p>
            {userRole && (
              <p className="text-yellow-400 text-sm font-semibold">
                {userRole.role.replace('_', ' ').toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <a href={createPageUrl('Home')} target="_blank" rel="noopener noreferrer">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Shield className="w-4 h-4 mr-2" />
                Back To Website
              </Button>
            </a>
            <Button variant="outline" className="bg-white text-black hover:bg-gray-200" onClick={() => {
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              window.location.href = '/login';
            }}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stat Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Link to={createPageUrl(stat.link)}>
                <Card className="hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-500' :
                        stat.color === 'yellow' ? 'bg-yellow-100 group-hover:bg-yellow-400' :
                        stat.color === 'green' ? 'bg-green-100 group-hover:bg-green-500' :
                        stat.color === 'purple' ? 'bg-purple-100 group-hover:bg-purple-500' :
                        stat.color === 'amber' ? 'bg-amber-100 group-hover:bg-amber-500' :
                        stat.color === 'emerald' ? 'bg-emerald-100 group-hover:bg-emerald-500' :
                        stat.color === 'orange' ? 'bg-orange-100 group-hover:bg-orange-500' :
                        'bg-gray-100 group-hover:bg-gray-500'
                      } transition-colors`}>
                        <stat.icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-600 group-hover:text-white' :
                          stat.color === 'yellow' ? 'text-yellow-600 group-hover:text-black' :
                          stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
                          stat.color === 'purple' ? 'text-purple-600 group-hover:text-white' :
                          stat.color === 'amber' ? 'text-amber-600 group-hover:text-white' :
                          stat.color === 'emerald' ? 'text-emerald-600 group-hover:text-white' :
                          stat.color === 'orange' ? 'text-orange-600 group-hover:text-white' :
                          'text-gray-600 group-hover:text-white'
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

        {/* Pos Actions */}
        <motion.div className='mb-12' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-black">Management Dashboard</h2>
          <p className="text-gray-500 mt-1 mb-5">Manage attendance, memberships, and performance reports in one place.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posActions.map((action, index) => (
              <Link key={index} to={createPageUrl(action.link)}>
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-500' :
                    action.color === 'emerald' ? 'bg-emerald-500' :
                    action.color === 'indigo' ? 'bg-indigo-500' :
                    action.color === 'green' ? 'bg-green-500' :
                    action.color === 'purple' ? 'bg-purple-500' :
                    action.color === 'cyan' ? 'bg-cyan-500' :
                    action.color === 'amber' ? 'bg-amber-500' :
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

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-black mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allActions.map((action, index) => (
              <Link key={index} to={createPageUrl(action.link)}>
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-500' :
                    action.color === 'emerald' ? 'bg-emerald-500' :
                    action.color === 'indigo' ? 'bg-indigo-500' :
                    action.color === 'green' ? 'bg-green-500' :
                    action.color === 'purple' ? 'bg-purple-500' :
                    action.color === 'cyan' ? 'bg-cyan-500' :
                    action.color === 'amber' ? 'bg-amber-500' :
                    action.color === 'orange' ? 'bg-orange-500' :
                    action.color === 'red' ? 'bg-red-500' :
                    action.color === 'pink' ? 'bg-pink-500' :
                    action.color === 'rose' ? 'bg-rose-500' :
                    action.color === 'teal' ? 'bg-teal-500' :
                    action.color === 'slate' ? 'bg-slate-500' :
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

        {/* Admin Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Admin Tools & Utilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BasicCalculator />
            <InvestmentCalculator />
            <BMRCalculator />
            <QuickNotes />
          </div>
        </motion.div>
      </div>
    </div>
  );
}