import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const blogs = [
  {
    id: 1,
    title: '10 Essential Tips for Building Muscle Mass',
    excerpt: 'Discover the proven strategies that will help you gain lean muscle and transform your physique.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&q=80&fit=crop',
    author: 'John Smith',
    date: '2024-01-15',
    category: 'Training',
  },
  {
    id: 2,
    title: 'Nutrition Guide: Fueling Your Workouts',
    excerpt: 'Learn what to eat before and after training for maximum performance and recovery.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&q=80&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    category: 'Nutrition',
  },
  {
    id: 3,
    title: 'Yoga for Athletes: Flexibility & Recovery',
    excerpt: 'Why every athlete should incorporate yoga into their training routine for better results.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&q=80&fit=crop',
    author: 'Emma Wilson',
    date: '2024-01-10',
    category: 'Wellness',
  },
  {
    id: 4,
    title: 'HIIT vs Steady State: Which is Better?',
    excerpt: 'Compare different cardio methods and find out which one aligns with your fitness goals.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&h=400&q=80&fit=crop',
    author: 'Mike Rodriguez',
    date: '2024-01-08',
    category: 'Cardio',
  },
];

export default function BlogsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-600">
            Tips, guides, and inspiration for your fitness journey
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={createPageUrl(`BlogPost?id=${blog.id}`)}>
                <div className="group cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black mb-3 group-hover:text-yellow-400 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-black font-bold group-hover:text-yellow-400 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to={createPageUrl('Blogs')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg inline-flex items-center gap-3"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}