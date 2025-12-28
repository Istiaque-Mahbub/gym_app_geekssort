import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import GymLoader from '@/components/GymLoader';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const clubsData = await base44.entities.Club.filter({ is_active: true });
      setClubs(clubsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
      setLoading(false);
    } catch (error) {
      console.error('Error loading clubs:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <GymLoader message="Loading clubs..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">Our Clubs</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Find your perfect FitHive location
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clubs List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {clubs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No clubs available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {clubs.map((club, index) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={club.images?.[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&q=80&fit=crop'} 
                          alt={club.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4">{club.name}</h2>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{club.address}</span>
                          </div>
                          {club.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.phone}</span>
                            </div>
                          )}
                          {club.email && (
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.email}</span>
                            </div>
                          )}
                          {club.operating_hours?.weekdays && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.operating_hours.weekdays}</span>
                            </div>
                          )}
                        </div>
                        {club.facilities?.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3">Facilities:</h3>
                            <div className="flex flex-wrap gap-2">
                              {club.facilities.map((facility, i) => (
                                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <Link to={createPageUrl('Contact')}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full"
                          >
                            Schedule a Visit
                          </motion.button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4">{club.name}</h2>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{club.address}</span>
                          </div>
                          {club.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.phone}</span>
                            </div>
                          )}
                          {club.email && (
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.email}</span>
                            </div>
                          )}
                          {club.operating_hours?.weekdays && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-700">{club.operating_hours.weekdays}</span>
                            </div>
                          )}
                        </div>
                        {club.facilities?.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3">Facilities:</h3>
                            <div className="flex flex-wrap gap-2">
                              {club.facilities.map((facility, i) => (
                                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <Link to={createPageUrl('Contact')}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full"
                          >
                            Schedule a Visit
                          </motion.button>
                        </Link>
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={club.images?.[0] || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&q=80&fit=crop'} 
                          alt={club.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}