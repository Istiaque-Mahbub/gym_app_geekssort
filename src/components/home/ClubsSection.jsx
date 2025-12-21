import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const clubs = [
  {
    id: 1,
    name: 'Club Boavista',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'Club 5 de Outubro',
    city: 'Lisbon',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=800&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Club Coimbra Celas',
    city: 'Coimbra',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=800&q=80&fit=crop',
  },
  {
    id: 4,
    name: 'Club Coimbra Lágrimas',
    city: 'Coimbra',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&h=800&q=80&fit=crop',
  },
  {
    id: 5,
    name: 'Club Leiria',
    city: 'Leiria',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&q=80&fit=crop',
  },
  {
    id: 6,
    name: 'Club Figueira',
    city: 'Figueira da Foz',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=800&q=80&fit=crop',
  },
];

const MarqueeText = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-8">
      <div className="flex animate-marquee-slow">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="text-[15vw] md:text-[20vw] font-black tracking-tighter text-transparent mx-8 inline-block"
            style={{ 
              WebkitTextStroke: '2px #000',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            PHIVE
          </span>
        ))}
      </div>
    </div>
  );
};

export default function ClubsSection() {
  return (
    <section className="bg-white py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          Phive has clubs located in Coimbra, Leiria, Lisbon, and Porto. Get to know each one!
        </motion.p>
      </div>

      {/* Clubs Grid - Horizontal Scroll on Mobile */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-8 px-6 gap-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:max-w-7xl md:mx-auto md:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {clubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-48 md:w-full snap-start group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-lg font-bold mb-1">{club.name}</h3>
                  <span className="text-yellow-400 text-sm font-medium">{club.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <MarqueeText />

      {/* Choose Your Club */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-8"
        >
          Choose your club
        </motion.h2>
        
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-3 group"
          >
            View all Clubs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-black text-black rounded-full font-medium flex items-center gap-3 group"
          >
            Schedule a visit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}