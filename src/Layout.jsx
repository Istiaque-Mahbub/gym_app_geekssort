import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function Layout({ children, currentPageName }) {
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