import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const blogPosts = {
  '1': {
    id: 1,
    title: '10 Essential Tips for Building Muscle Mass',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&q=80&fit=crop',
    author: 'John Smith',
    date: '2024-01-15',
    category: 'Training',
    content: `
      <p>Building muscle mass is a goal for many fitness enthusiasts, but it requires a strategic approach combining proper training, nutrition, and recovery. Here are the essential tips that will help you achieve your muscle-building goals.</p>

      <h2>1. Progressive Overload</h2>
      <p>The foundation of muscle growth is progressive overload. This means gradually increasing the weight, frequency, or number of repetitions in your strength training routine. Your muscles need to be challenged beyond their current capacity to grow stronger.</p>

      <h2>2. Compound Exercises First</h2>
      <p>Prioritize compound movements like squats, deadlifts, bench presses, and rows. These exercises work multiple muscle groups simultaneously and stimulate the greatest hormonal response for muscle growth.</p>

      <h2>3. Protein is King</h2>
      <p>Aim for 1.6-2.2 grams of protein per kilogram of body weight daily. Spread your protein intake throughout the day to maximize muscle protein synthesis. Quality sources include lean meats, fish, eggs, and plant-based options like legumes.</p>

      <h2>4. Don't Neglect Carbohydrates</h2>
      <p>Carbs fuel your workouts and aid in recovery. They replenish glycogen stores and support the muscle-building process. Include complex carbohydrates like oats, rice, and sweet potatoes in your diet.</p>

      <h2>5. Recovery is Crucial</h2>
      <p>Muscles grow during rest, not during workouts. Ensure you're getting 7-9 hours of quality sleep each night and allow adequate recovery time between training sessions for the same muscle groups.</p>

      <h2>6. Stay Hydrated</h2>
      <p>Water is essential for protein synthesis and helps transport nutrients to your muscles. Aim for at least 3-4 liters of water daily, more if you're training intensely.</p>

      <h2>7. Consistency Over Perfection</h2>
      <p>Building muscle takes time. Focus on being consistent with your training and nutrition rather than seeking perfection. Small, sustainable changes lead to long-term success.</p>

      <h2>8. Track Your Progress</h2>
      <p>Keep a training log to monitor your lifts, body measurements, and progress photos. This helps you identify what's working and adjust your program accordingly.</p>

      <h2>9. Mind-Muscle Connection</h2>
      <p>Focus on feeling the target muscle working during each exercise. Quality repetitions with proper form trump heavy weights with poor technique.</p>

      <h2>10. Be Patient</h2>
      <p>Building significant muscle mass takes months and years, not weeks. Trust the process, stay consistent, and celebrate small victories along the way.</p>

      <p>Remember, everyone's body responds differently. What works for one person might not work for another. Listen to your body, adjust as needed, and consider working with a qualified trainer to personalize your approach.</p>
    `,
  },
  '2': {
    id: 2,
    title: 'Nutrition Guide: Fueling Your Workouts',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&q=80&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    category: 'Nutrition',
    content: `
      <p>Proper nutrition is the cornerstone of athletic performance and recovery. What you eat before and after your workouts can significantly impact your results.</p>

      <h2>Pre-Workout Nutrition</h2>
      <p>Eating the right foods before exercise provides the energy you need to perform at your best. Aim to eat 2-3 hours before your workout for optimal digestion.</p>

      <h2>Post-Workout Recovery</h2>
      <p>The 30-60 minutes after your workout is crucial for recovery. Focus on protein for muscle repair and carbohydrates to replenish glycogen stores.</p>

      <h2>Hydration Strategy</h2>
      <p>Start hydrating hours before your workout and continue during and after. Proper hydration improves performance and recovery.</p>
    `,
  },
};

export default function BlogPost() {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get('id') || '1';
  const post = blogPosts[blogId] || blogPosts['1'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Back Button */}
        <Link to={createPageUrl('Blogs')}>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-8 left-8 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </motion.button>
        </Link>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-12 pb-8 border-b"
          >
            <span className="font-bold flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share:
            </span>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl text-center"
          >
            <h3 className="text-3xl font-black text-black mb-4">
              Ready to Transform Your Fitness?
            </h3>
            <p className="text-black/80 mb-6">
              Join FitHive today and start your journey to a stronger, healthier you.
            </p>
            <Link to={createPageUrl('Packages')}>
              <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                View Packages
              </button>
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  );
}