import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';

const allBlogs = [
  {
    id: 1,
    title: '10 Essential Tips for Building Muscle Mass',
    excerpt: 'Discover the proven strategies that will help you gain lean muscle and transform your physique. From progressive overload to proper nutrition.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&q=80&fit=crop',
    author: 'John Smith',
    date: '2024-01-15',
    category: 'Training',
  },
  {
    id: 2,
    title: 'Nutrition Guide: Fueling Your Workouts',
    excerpt: 'Learn what to eat before and after training for maximum performance and recovery. Complete meal plans and timing strategies.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&q=80&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    category: 'Nutrition',
  },
  {
    id: 3,
    title: 'Yoga for Athletes: Flexibility & Recovery',
    excerpt: 'Why every athlete should incorporate yoga into their training routine for better results and injury prevention.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&q=80&fit=crop',
    author: 'Emma Wilson',
    date: '2024-01-10',
    category: 'Wellness',
  },
  {
    id: 4,
    title: 'HIIT vs Steady State: Which is Better?',
    excerpt: 'Compare different cardio methods and find out which one aligns with your fitness goals and lifestyle.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&h=600&q=80&fit=crop',
    author: 'Mike Rodriguez',
    date: '2024-01-08',
    category: 'Cardio',
  },
  {
    id: 5,
    title: 'The Science of Recovery: Rest Days Matter',
    excerpt: 'Understanding why rest and recovery are just as important as your training sessions for long-term progress.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&q=80&fit=crop',
    author: 'Dr. Lisa Chen',
    date: '2024-01-05',
    category: 'Wellness',
  },
  {
    id: 6,
    title: 'Beginner Guide to Weight Training',
    excerpt: 'Everything you need to know to start your weight training journey safely and effectively.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&q=80&fit=crop',
    author: 'Tom Anderson',
    date: '2024-01-03',
    category: 'Training',
  },
];

const categories = ['All', 'Training', 'Nutrition', 'Wellness', 'Cardio'];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">FitHive Blog</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Expert advice, training tips, and wellness insights to power your fitness journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Categories */}
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

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No articles found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={createPageUrl(`BlogPost?id=${blog.id}`)}>
                    <div className="group cursor-pointer h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
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
                      
                      <div className="p-6 flex-grow flex flex-col">
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
                        
                        <h3 className="text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors">
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
          )}
        </div>
      </section>
    </div>
  );
}