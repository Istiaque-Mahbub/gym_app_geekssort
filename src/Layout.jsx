import React, { useEffect } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ChatWidget from '@/components/ChatWidget';
import VisitorTracker from '@/components/VisitorTracker';

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Set page title dynamically
    const pageTitles = {
      'Home': 'FitHive - Transform Your Body, Elevate Your Mind',
      'Clubs': 'Our Clubs - FitHive',
      'Classes': 'Fitness Classes - FitHive',
      'Packages': 'Membership Packages - FitHive',
      'Contact': 'Contact Us - FitHive',
      'About': 'About Us - FitHive',
      'Blogs': 'Blog - FitHive',
      'ClassSchedule': 'Class Schedule - FitHive',
      'WorkoutPlanner': 'AI Workout Planner - FitHive',
      'MealPlanner': 'AI Meal Planner - FitHive',
      'ProgressTracker': 'Progress Tracker - FitHive',
      'Challenges': 'Challenges & Rewards - FitHive',
      'App': 'Mobile App - FitHive',
      'AdminDashboard': 'Admin Dashboard - FitHive',
      'InquiryManager': 'Inquiry Manager - FitHive',
      'ContentManager': 'Content Manager - FitHive',
      'BannerManager': 'Banner Manager - FitHive',
      'NotificationSettings': 'Notification Settings - FitHive',
    };
    
    document.title = pageTitles[currentPageName] || 'FitHive';
  }, [currentPageName]);

  // Admin pages - hide header, footer, and chat widget
  const adminPages = ['AdminDashboard', 'InquiryManager', 'ContentManager', 'BannerManager', 'NotificationSettings', 'UserManager', 'BlogManager', 'VisitorAnalytics', 'SiteSettingsManager'];
  const isAdminPage = adminPages.includes(currentPageName);

  if (isAdminPage) {
    return (
      <div className="min-h-screen">
        {children}
        <VisitorTracker currentPageName={currentPageName} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPageName={currentPageName} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget currentPageName={currentPageName} />
      <VisitorTracker currentPageName={currentPageName} />
    </div>
  );
}