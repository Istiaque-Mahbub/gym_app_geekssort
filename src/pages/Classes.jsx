import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Flame } from 'lucide-react';

const classes = [
  {
    id: 1,
    name: 'TRX Suspension Training',
    category: 'Power',
    duration: '45 min',
    intensity: 'High',
    participants: '15',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&q=80&fit=crop',
    description: 'Build strength and stability with bodyweight exercises using TRX straps.',
    schedule: ['Mon 07:00', 'Wed 18:00', 'Fri 19:00'],
  },
  {
    id: 2,
    name: 'Yoga Flow',
    category: 'Flow',
    duration: '60 min',
    intensity: 'Medium',
    participants: '20',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&q=80&fit=crop',
    description: 'Connect mind and body through flowing movements and breath work.',
    schedule: ['Tue 08:00', 'Thu 17:00', 'Sat 10:00'],
  },
  {
    id: 3,
    name: 'HIIT Burn',
    category: 'Cardio',
    duration: '30 min',
    intensity: 'Very High',
    participants: '12',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&h=600&q=80&fit=crop',
    description: 'High-intensity interval training to maximize calorie burn.',
    schedule: ['Mon 18:00', 'Wed 19:00', 'Fri 18:00'],
  },
  {
    id: 4,
    name: 'Zumba Dance',
    category: 'Moves',
    duration: '50 min',
    intensity: 'Medium',
    participants: '25',
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800&h=600&q=80&fit=crop',
    description: 'Dance your way to fitness with Latin-inspired choreography.',
    schedule: ['Tue 19:00', 'Thu 19:00', 'Sat 11:00'],
  },
  {
    id: 5,
    name: 'Pilates Core',
    category: 'Strength',
    duration: '55 min',
    intensity: 'Medium',
    participants: '15',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&q=80&fit=crop',
    description: 'Strengthen your core and improve flexibility with controlled movements.',
    schedule: ['Mon 09:00', 'Wed 17:00', 'Fri 09:00'],
  },
  {
    id: 6,
    name: 'Spin Cycle',
    category: 'Cardio',
    duration: '45 min',
    intensity: 'High',
    participants: '20',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&q=80&fit=crop',
    description: 'Indoor cycling with motivating music and intense intervals.',
    schedule: ['Tue 07:00', 'Thu 18:00', 'Sat 09:00'],
  },
];

const categories = ['All', 'Power', 'Flow', 'Cardio', 'Moves', 'Strength'];

export default function Classes() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredClasses = selectedCategory === 'All' 
    ? classes 
    : classes.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">Our Classes</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Discover the perfect workout for your fitness goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm">
                      {classItem.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black mb-3">{classItem.name}</h3>
                  <p className="text-gray-600 mb-4">{classItem.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <span>{classItem.participants} max</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-yellow-400" />
                      <span>{classItem.intensity}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-bold text-sm mb-2">Schedule:</h4>
                    <div className="flex flex-wrap gap-2">
                      {classItem.schedule.map((time, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}