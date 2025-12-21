import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const classes = [
  {
    id: 1,
    name: 'TRX',
    category: 'Power',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
  },
  {
    id: 2,
    name: 'Yoga',
    category: 'Flow',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    id: 3,
    name: 'Yoguitos Kids',
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80',
  },
  {
    id: 4,
    name: 'Zumba',
    category: 'Moves',
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&q=80',
  },
];

const MarqueeText = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-yellow-400">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl font-black tracking-tighter text-black mx-8"
          >
            CLASSES
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function ClassesSection() {
  return (
    <section className="bg-white">
      {/* Marquee Header */}
      <MarqueeText />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-16"
        >
          The most exciting classes, created by top instructors. No matter your goal, we can make it happen.
        </motion.p>

        {/* Classes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="text-yellow-400 text-xs md:text-sm tracking-wider mb-1 block">
                    {classItem.category}
                  </span>
                  <h3 className="text-white text-lg md:text-2xl font-bold">
                    {classItem.name}
                  </h3>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}