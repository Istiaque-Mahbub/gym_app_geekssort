import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import BMICalculator from '@/components/BMICalculator';
import { AuthService } from '@/services/AuthService';

export default function Header({ currentPageName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBMI, setShowBMI] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('student');
  const [userName, setUserName] = useState('');

  // ✅ Dashboard URL based on role
  const dashboardUrl =
    ['admin', 'superuser', 'staff'].includes(role)
      ? '/AdminDashboard'
      : role === 'instructor'
      ? '/InstructorDashboard'
      : '/UserDashboard';

  // ✅ Role Label for badge
  const roleLabel =
    role === 'superuser'
      ? 'Superuser'
      : role === 'admin'
      ? 'Admin'
      : role === 'staff'
      ? 'Staff'
      : role === 'instructor'
      ? 'Instructor'
      : 'Student';

  // ✅ Default navigation links
  const getDefaultNav = () => [
    { page_name: 'Clubs', label: 'Clubs', order: 1 },
    { page_name: 'Classes', label: 'Classes', order: 2 },
    { page_name: 'Packages', label: 'Packages', order: 3 },
    { page_name: 'App', label: 'App', order: 4 },
    { page_name: 'About', label: 'About', order: 5 },
    { page_name: 'SCHEDULE', label: 'SCHEDULE', order: 5 }
  ];


  // =========================
  // Check Auth and get current user
  // =========================
  const checkAuth = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setIsAuthenticated(false);
      setRole('student');
      setUserName('');
      return;
    }

    try {
      const user = await AuthService.getCurrentUser();
      if (!user) throw new Error('User fetch failed');

      setIsAuthenticated(true);
      setRole(user.role);
      setUserName(user.full_name);

      // Save in localStorage for consistency
      localStorage.setItem('role', user.role);
      localStorage.setItem('full_name', user.full_name);
    } catch (error) {
      console.error('Header auth check failed:', error);
      setIsAuthenticated(false);
      setRole('student');
      setUserName('');
      localStorage.removeItem('role');
      localStorage.removeItem('full_name');
    }
  };

  // =========================
  // Logout function
  // =========================
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);

    // Set nav links
    setNavLinks(getDefaultNav());

    // Initial auth check
    checkAuth();

    // Listen to login/logout events
    window.addEventListener('authChanged', checkAuth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          currentPageName?.includes('Dashboard')
            ? 'bg-black py-4'
            : scrolled
            ? 'bg-black/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
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
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setShowBMI(true)}
              className="flex items-center gap-2 text-white text-sm font-medium tracking-wider hover:text-yellow-400"
            >
              <Calculator className="w-4 h-4" />
              BMI CALCULATOR
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.page_name}
                to={createPageUrl(link.page_name)}
                className="text-white text-sm font-medium tracking-wider hover:text-yellow-400"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-white text-sm font-bold px-3 py-1 border border-white rounded-full">
                  {roleLabel}
                </span>

                <Link to={dashboardUrl}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 border border-white text-white rounded-full font-bold hover:bg-white hover:text-black"
                  >
                    DASHBOARD
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="px-6 py-3 bg-yellow-400 text-black rounded-full font-bold"
                >
                  LOGOUT
                </motion.button>
              </>
            ) : (
              <>
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
            
                  <a href="https://mubafitness.com/" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 lg:px-6 py-2 lg:py-3 bg-yellow-400 text-black rounded-full text-xs lg:text-sm font-bold tracking-wider hover:bg-yellow-500 transition-colors flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      SHOP
                    </motion.button>
                  </a>
                </div>
                <Link to="/login">
                  <button className="px-6 py-3 border border-white text-white rounded-full font-bold">
                    LOGIN
                  </button>
                </Link>

                

                <Link to="/register">
                  <button className="px-6 py-3 bg-yellow-400 text-black rounded-full font-bold">
                    JOIN NOW
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page_name}
                  to={createPageUrl(link.page_name)}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-3xl font-bold"
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link to={dashboardUrl}>
                    <button className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-bold">
                      DASHBOARD
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-8 py-4 bg-yellow-400 text-black rounded-full text-lg font-bold"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                <div className="hidden md:flex items-center gap-2 lg:gap-3">
            
                    <a href="https://mubafitness.com/" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 lg:px-6 py-2 lg:py-3 bg-yellow-400 text-black rounded-full text-xs lg:text-sm font-bold tracking-wider hover:bg-yellow-500 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        SHOP
                      </motion.button>
                    </a>
                  </div>
                  <Link to="/login">
                    <button className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-bold">
                      LOGIN
                    </button>
                  </Link>
                  

                  <Link to="/register">
                    <button className="px-8 py-4 bg-yellow-400 text-black rounded-full text-lg font-bold">
                      JOIN NOW
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BMI Calculator */}
      <BMICalculator isOpen={showBMI} onClose={() => setShowBMI(false)} />
    </>
  );
}
