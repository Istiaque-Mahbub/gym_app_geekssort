import React, { useEffect } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
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
    };
    
    document.title = pageTitles[currentPageName] || 'FitHive';
  }, [currentPageName]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}