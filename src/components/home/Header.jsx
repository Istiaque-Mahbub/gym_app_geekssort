import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import BMICalculator from '@/components/BMICalculator';

const navLinks = [
  { name: 'Clubs', href: '/Clubs' },
  { name: 'Classes', href: '/Classes' },
  { name: 'Packages', href: '/Packages' },
  { name: 'App', href: '/App' },
  { name: 'About', href: '/About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBMI, setShowBMI] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to={createPageUrl('Home')}
            className="text-2xl font-black tracking-tight text-yellow-400"
          >
            FITHIVE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setShowBMI(true)}
              className="flex items-center gap-2 text-white text-sm font-medium tracking-wider hover:text-yellow-400 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              BMI CALCULATOR
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={createPageUrl(link.href.replace('/', ''))}
                className="text-white text-sm font-medium tracking-wider hover:text-yellow-400 transition-colors"
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={createPageUrl('UserDashboard')}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-full text-sm font-bold tracking-wider hover:bg-yellow-400 hover:text-black transition-all"
              >
                USER PANEL
              </motion.button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-yellow-400 text-black rounded-full text-sm font-bold tracking-wider"
              >
                CONTACT US
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-40 pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={createPageUrl(link.href.replace('/', ''))}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-3xl font-bold tracking-wider hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link to={createPageUrl('UserDashboard')}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-8 px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full text-lg font-bold tracking-wider"
                >
                  USER PANEL
                </motion.button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-4 bg-yellow-400 text-black rounded-full text-lg font-bold tracking-wider"
                >
                  CONTACT US
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BMI Calculator Modal */}
      <BMICalculator isOpen={showBMI} onClose={() => setShowBMI(false)} />
    </>
  );
}