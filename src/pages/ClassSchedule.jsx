import React, { useState } from 'react';
import { motion } from 'framer-motion';

const scheduleData = {
  Saturday: [
    { class: 'Aerobics', time: '06 PM - 06:40 PM', type: 'Female Only' },
    { class: 'Zumba', time: '07 PM - 08 PM', type: 'Female Only' },
  ],
  Sunday: [
    { class: 'Aerobics', time: '09 AM - 10 AM', type: '' },
    { class: 'Zumba', time: '05 PM - 06 PM', type: '' },
    { class: 'Yoga', time: '06 PM - 07 PM', type: 'Female Only' },
    { class: 'HIIT', time: '07 PM - 07:40 PM', type: 'Female Only' },
  ],
  Monday: [
    { class: 'Yoga', time: '09 AM - 10 AM', type: '' },
    { class: 'Yoga', time: '04 PM - 05 PM', type: '' },
    { class: 'HIIT', time: '05 PM - 05:40 PM', type: 'Female Only' },
    { class: 'Aerobics', time: '06:40 PM - 07:20 PM', type: 'Female Only' },
  ],
  Tuesday: [
    { class: 'Aerobics', time: '04 PM - 04:40 PM', type: '' },
    { class: 'Aerobics', time: '06:20 PM - 07 PM', type: 'Female Only' },
    { class: 'Yoga', time: '07 PM - 08 PM', type: 'Female Only' },
  ],
  Wednesday: [
    { class: 'Aerobics', time: '09 AM - 10 AM', type: '' },
    { class: 'Zumba', time: '04 AM - 05 AM', type: '' },
    { class: 'Yoga', time: '05 PM - 06 PM', type: '' },
  ],
  Thursday: [
    { class: 'Yoga', time: '09 AM - 10 AM', type: '' },
    { class: 'Aerobics', time: '04 PM - 04:40 PM', type: '' },
    { class: 'Zumba', time: '06 PM - 07 PM', type: '' },
    { class: 'Aerobics', time: '07:20 PM - 08 PM', type: '' },
  ],
  Friday: [
    { class: 'Rest Day', time: '', type: '' },
  ],
};

const days = ['All', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getClassColor = (className) => {
  const colors = {
    'Aerobics': 'bg-pink-100 border-pink-400 text-pink-900',
    'Zumba': 'bg-green-100 border-green-400 text-green-900',
    'Yoga': 'bg-teal-100 border-teal-400 text-teal-900',
    'HIIT': 'bg-gray-100 border-gray-400 text-gray-900',
  };
  return colors[className] || 'bg-gray-100 border-gray-400 text-gray-900';
};

export default function ClassSchedule() {
  const [selectedDay, setSelectedDay] = useState('All');

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
                    ? 'bg-yellow-400 text-black shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {Object.keys(scheduleData).map((day) => (
                    <th 
                      key={day}
                      className={`p-4 text-left border-2 font-black text-xl ${
                        selectedDay === day || selectedDay === 'All'
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.entries(scheduleData).map(([day, classes]) => (
                    <td 
                      key={day}
                      className={`p-4 border-2 align-top ${
                        selectedDay === day || selectedDay === 'All'
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {classes[0]?.class === 'Rest Day' ? (
                        <div className="text-center py-8">
                          <p className="text-xl font-bold text-gray-400">Rest Day</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {classes.map((item, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                selectedDay === day || selectedDay === 'All'
                                  ? `${getClassColor(item.class)} shadow-md`
                                  : 'bg-gray-50 border-gray-200 opacity-60'
                              }`}
                            >
                              <h3 className="font-black text-lg mb-1">{item.class}</h3>
                              <p className="text-sm font-semibold mb-2">{item.time}</p>
                              {item.type && (
                                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                                  {item.type}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-400"
          >
            <p className="text-gray-900 font-bold text-lg">
              ⭐ Zumba & HIIT classes are for premium members only
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}