import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const clubs = [
  {
    id: 1,
    name: 'FitHive Boavista',
    city: 'Porto',
    address: 'Rua da Boavista 1234, Porto',
    phone: '+351 222 000 000',
    email: 'boavista@fithive.pt',
    hours: 'Mon-Sun: 06:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&q=80&fit=crop',
    facilities: ['Swimming Pool', 'Sauna', 'Pilates Studio', 'Cardio Area', 'Free Weights'],
  },
  {
    id: 2,
    name: 'FitHive 5 de Outubro',
    city: 'Lisbon',
    address: 'Avenida 5 de Outubro 567, Lisboa',
    phone: '+351 211 000 000',
    email: 'lisboa@fithive.pt',
    hours: 'Mon-Sun: 06:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&q=80&fit=crop',
    facilities: ['Turkish Bath', 'Jacuzzi', 'Group Classes', 'Personal Training', 'Locker Rooms'],
  },
  {
    id: 3,
    name: 'FitHive Coimbra Celas',
    city: 'Coimbra',
    address: 'Rua de Celas 890, Coimbra',
    phone: '+351 239 000 000',
    email: 'celas@fithive.pt',
    hours: 'Mon-Sun: 06:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&q=80&fit=crop',
    facilities: ['Yoga Studio', 'CrossFit Area', 'Nutrition Bar', 'Parking', 'Showers'],
  },
  {
    id: 4,
    name: 'FitHive Coimbra Lágrimas',
    city: 'Coimbra',
    address: 'Largo das Lágrimas 123, Coimbra',
    phone: '+351 239 111 000',
    email: 'lagrimas@fithive.pt',
    hours: 'Mon-Sun: 06:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=600&q=80&fit=crop',
    facilities: ['Indoor Pool', 'Spa', 'Kids Area', 'Cafe', 'Wifi'],
  },
];

export default function Clubs() {
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
              Find your perfect FitHive location across Portugal
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clubs List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
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
                      <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black mb-4">{club.name}</h2>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{club.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.hours}</span>
                        </div>
                      </div>
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
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-700">{club.hours}</span>
                        </div>
                      </div>
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
                      <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}