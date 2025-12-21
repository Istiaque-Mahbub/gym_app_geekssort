import React from 'react';
import { motion } from 'framer-motion';

const clubs = [
  { name: 'Club Boavista', city: 'Porto' },
  { name: 'Club 5 de Outubro', city: 'Lisbon' },
  { name: 'Club Coimbra Celas', city: 'Coimbra' },
  { name: 'Club Coimbra Lágrimas', city: 'Coimbra' },
  { name: 'Club Leiria', city: 'Leiria' },
  { name: 'Club Figueira', city: 'Figueira da Foz' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Clubs Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-sm font-medium tracking-wider text-gray-400 mb-8">Clubs</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clubs.map((club, index) => (
              <motion.a
                key={club.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <img
                    src={`https://images.unsplash.com/photo-${1534438327276 + index * 1000}-14e5300c3a48?w=400&q=80`}
                    alt={club.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm font-medium group-hover:text-yellow-400 transition-colors">
                  {club.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-3xl font-black tracking-tight text-yellow-400">
            PHIVE
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Complaints Book</a>
          </div>

          {/* Made By */}
          <div className="text-sm text-gray-500">
            Made with ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}