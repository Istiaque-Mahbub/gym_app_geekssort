import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const scheduleData = {
  Saturday: [
    { class: 'Aerobics', time: '06 PM - 06:40 PM', type: 'Female Only', color: 'pink' },
    { class: 'Zumba', time: '07 PM - 08 PM', type: 'Female Only', color: 'green' },
  ],
  Sunday: [
    { class: 'Aerobics', time: '09 AM - 10 AM', type: '', color: 'pink' },
    { class: 'Zumba', time: '05 PM - 06 PM', type: '', color: 'green' },
    { class: 'Yoga', time: '06 PM - 07 PM', type: 'Female Only', color: 'mint' },
    { class: 'HIIT', time: '07 PM - 07:40 PM', type: 'Female Only', color: 'white' },
  ],
  Monday: [
    { class: 'Yoga', time: '09 AM - 10 AM', type: '', color: 'mint' },
    { class: 'Yoga', time: '04 PM - 05 PM', type: '', color: 'mint' },
    { class: 'HIIT', time: '05 PM - 05:40 PM', type: 'Female Only', color: 'white' },
    { class: 'Aerobics', time: '06:40 PM - 07:20 PM', type: 'Female Only', color: 'pink' },
  ],
  Tuesday: [
    { class: 'Aerobics', time: '04 PM - 04:40 PM', type: '', color: 'pink' },
    { class: 'Aerobics', time: '06:20 PM - 07 PM', type: 'Female Only', color: 'pink' },
    { class: 'Yoga', time: '07 PM - 08 PM', type: 'Female Only', color: 'mint' },
  ],
  Wednesday: [
    { class: 'Aerobics', time: '09 AM - 10 AM', type: '', color: 'pink' },
    { class: 'Zumba', time: '04 AM - 05 AM', type: '', color: 'green' },
    { class: 'Yoga', time: '05 PM - 06 PM', type: '', color: 'mint' },
  ],
  Thursday: [
    { class: 'Yoga', time: '09 AM - 10 AM', type: '', color: 'mint' },
    { class: 'Aerobics', time: '04 PM - 04:40 PM', type: '', color: 'pink' },
    { class: 'Zumba', time: '06 PM - 07 PM', type: '', color: 'green' },
    { class: 'Aerobics', time: '07:20 PM - 08 PM', type: '', color: 'pink' },
  ],
  Friday: [
    { class: 'Rest Day', time: '', type: '', color: '' },
  ],
};

const classColors = {
  pink: 'bg-pink-100 border-pink-300',
  green: 'bg-green-100 border-green-300',
  mint: 'bg-teal-100 border-teal-300',
  white: 'bg-gray-100 border-gray-300',
};

const days = ['All', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function ClassSchedule() {
  const [selectedDay, setSelectedDay] = useState('All');

  const filteredSchedule = selectedDay === 'All' 
    ? scheduleData 
    : { [selectedDay]: scheduleData[selectedDay] };

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
            <h1 className="text-5xl md:text-7xl font-black mb-6">Class Schedule</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join our fitness classes throughout the week
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedDay === day
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {Object.entries(filteredSchedule).map(([day, classes]) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-black text-green-600">{day}</h2>
                </div>

                {classes[0]?.class === 'Rest Day' ? (
                  <div className="text-center py-12">
                    <p className="text-2xl text-gray-400 font-bold">Rest Day</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {classes.map((item, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border-2 ${classColors[item.color]} transition-all hover:shadow-lg`}
                      >
                        <h3 className="text-xl font-black mb-2">{item.class}</h3>
                        <p className="text-sm text-gray-700 font-semibold mb-2">{item.time}</p>
                        {item.type && (
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                            {item.type}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-400"
          >
            <p className="text-gray-700 font-semibold">
              ⭐ Zumba & HIIT classes are for premium members only
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}