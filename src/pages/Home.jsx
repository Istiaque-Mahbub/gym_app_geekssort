import React from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import ClubsSection from '@/components/home/ClubsSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import AmenitiesSection from '@/components/home/AmenitiesSection';
import ClassesSection from '@/components/home/ClassesSection';
import AppSection from '@/components/home/AppSection';
import SocialSection from '@/components/home/SocialSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <section id="clubs">
          <ClubsSection />
        </section>
        <ScheduleSection />
        <AmenitiesSection />
        <section id="classes">
          <ClassesSection />
        </section>
        <section id="app">
          <AppSection />
        </section>
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}