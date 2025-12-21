import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packageTypes = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Build your perfect package',
    plans: [
      { duration: '3month', name: '3 Months', price: 45 },
      { duration: '6month', name: '6 Months', price: 40, popular: true },
      { duration: '12month', name: '12 Months', price: 35 },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'All-inclusive fitness experience',
    plans: [
      { duration: '3month', name: '3 Months', price: 95, savings: 23 },
      { duration: '6month', name: '6 Months', price: 85, savings: 23, popular: true },
      { duration: '12month', name: '12 Months', price: 75, savings: 23 },
    ],
  },
];

const premiumFeatures = [
  { id: 'pool', name: 'Swimming Pool Access' },
  { id: 'sauna', name: 'Sauna & Spa' },
  { id: 'classes', name: 'Unlimited Classes' },
  { id: 'pt', name: 'Personal Training Sessions' },
  { id: 'nutrition', name: 'Nutrition Consultation' },
  { id: 'locker', name: 'Private Locker' },
  { id: 'priority', name: 'Priority Booking' },
  { id: 'vip', name: 'VIP Locker Room' },
  { id: 'guest', name: 'Guest Passes' },
];

const addons = [
  { id: 'pool', name: 'Swimming Pool Access', price: 10 },
  { id: 'sauna', name: 'Sauna & Spa', price: 8 },
  { id: 'classes', name: 'Unlimited Classes', price: 15 },
  { id: 'pt', name: 'Personal Training (4 sessions/month)', price: 50 },
  { id: 'nutrition', name: 'Nutrition Consultation', price: 20 },
  { id: 'locker', name: 'Private Locker', price: 5 },
];

export default function Packages() {
  const [packageType, setPackageType] = useState('starter');
  const [selectedPlan, setSelectedPlan] = useState('6month');
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const pkg = packageTypes.find(p => p.id === packageType);
    const plan = pkg?.plans.find(p => p.duration === selectedPlan);
    
    if (packageType === 'elite') {
      return plan?.price || 0;
    }
    
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return (plan?.price || 0) + addonsTotal;
  };

  const calculateSavings = () => {
    if (packageType !== 'elite') return 0;
    const pkg = packageTypes.find(p => p.id === packageType);
    const plan = pkg?.plans.find(p => p.duration === selectedPlan);
    return plan?.savings || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
            <h1 className="text-5xl md:text-7xl font-black mb-6">Choose Your Package</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Build your perfect fitness plan with flexible pricing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Type Selector - Premium Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Starter Package Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                setPackageType('starter');
              }}
              className={`relative cursor-pointer rounded-3xl p-8 transition-all duration-300 ${
                packageType === 'starter'
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl scale-105'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-6 h-6 ${packageType === 'starter' ? 'text-black' : 'text-yellow-400'}`} />
                    <h3 className={`text-3xl font-black ${packageType === 'starter' ? 'text-black' : 'text-gray-900'}`}>
                      Starter
                    </h3>
                  </div>
                  <p className={`text-lg ${packageType === 'starter' ? 'text-black/80' : 'text-gray-600'}`}>
                    Customize your experience
                  </p>
                </div>
                {packageType === 'starter' && (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <Check className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {premiumFeatures.map((feature) => {
                  const isIncluded = ['pool', 'sauna', 'classes', 'pt', 'nutrition', 'locker'].includes(feature.id);
                  return (
                    <div key={feature.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isIncluded 
                          ? (packageType === 'starter' ? 'bg-black' : 'bg-gray-800')
                          : (packageType === 'starter' ? 'bg-black/20' : 'bg-gray-200')
                      }`}>
                        {isIncluded ? (
                          <Check className={`w-4 h-4 ${packageType === 'starter' ? 'text-yellow-400' : 'text-white'}`} />
                        ) : (
                          <X className={`w-4 h-4 ${packageType === 'starter' ? 'text-black/40' : 'text-gray-400'}`} />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        packageType === 'starter' 
                          ? (isIncluded ? 'text-black' : 'text-black/50')
                          : (isIncluded ? 'text-gray-900' : 'text-gray-400')
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-black/20">
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-bold ${packageType === 'starter' ? 'text-black/70' : 'text-gray-500'}`}>
                    FROM
                  </span>
                  <span className={`text-4xl font-black ${packageType === 'starter' ? 'text-black' : 'text-gray-900'}`}>
                    €35
                  </span>
                  <span className={`text-lg ${packageType === 'starter' ? 'text-black/70' : 'text-gray-500'}`}>
                    /month
                  </span>
                </div>
                <p className={`text-xs mt-2 ${packageType === 'starter' ? 'text-black/60' : 'text-gray-500'}`}>
                  + Selected add-ons
                </p>
              </div>
            </motion.div>

            {/* Elite Package Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                setPackageType('elite');
                setSelectedAddons([]);
              }}
              className={`relative cursor-pointer rounded-3xl p-8 transition-all duration-300 ${
                packageType === 'elite'
                  ? 'bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl scale-105 border-2 border-yellow-400'
                  : 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Premium Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-6 py-2 bg-yellow-400 text-black text-xs font-black rounded-full flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-3xl font-black text-white">Elite</h3>
                  </div>
                  <p className="text-lg text-gray-300">
                    All-inclusive experience
                  </p>
                </div>
                {packageType === 'elite' && (
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Check className="w-5 h-5 text-black" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {premiumFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-yellow-400/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-gray-400">FROM</span>
                  <span className="text-4xl font-black text-yellow-400">€75</span>
                  <span className="text-lg text-gray-400">/month</span>
                </div>
                <div className="mt-3 inline-block px-4 py-2 bg-green-500/20 rounded-full">
                  <p className="text-sm font-bold text-green-400">
                    💰 Save €23/mo compared to Starter
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Duration Plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-black mb-8 text-center">Select Duration</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {packageTypes.find(p => p.id === packageType)?.plans.map((plan) => (
                <motion.div
                  key={plan.duration}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedPlan(plan.duration)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                    selectedPlan === plan.duration
                      ? 'bg-yellow-400 text-black shadow-xl'
                      : 'bg-white border-2 border-gray-200 hover:border-yellow-400'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-black text-yellow-400 text-xs font-bold rounded-full">
                        BEST VALUE
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-black mb-3">{plan.name}</h3>
                    <div className="mb-3">
                      <span className="text-4xl font-black">€{plan.price}</span>
                      <span className="text-sm opacity-70">/month</span>
                    </div>
                    {plan.savings && (
                      <div className={`text-xs font-bold ${selectedPlan === plan.duration ? 'text-green-700' : 'text-green-600'}`}>
                        Save €{plan.savings}/mo
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Add-ons for Starter */}
          {packageType === 'starter' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-black mb-4 text-center">Customize with Add-ons</h2>
              <p className="text-gray-600 mb-8 text-center">
                Build your perfect package by adding services you need
              </p>
            
              <div className="grid md:grid-cols-2 gap-4">
                {addons.map((addon) => (
                  <motion.div
                    key={addon.id}
                    whileHover={{ x: 5 }}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-6 rounded-xl cursor-pointer transition-all ${
                      selectedAddons.includes(addon.id)
                        ? 'bg-yellow-400 shadow-lg'
                        : 'bg-white border-2 border-gray-200 hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedAddons.includes(addon.id) ? 'bg-black' : 'bg-gray-100'
                      }`}>
                        <Check className={`w-5 h-5 ${
                          selectedAddons.includes(addon.id) ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <h4 className="font-bold">{addon.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black">€{addon.price}</span>
                      <span className="text-sm opacity-70">/mo</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Summary & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-16"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-4">Your Total</h3>
              <div className="text-6xl font-black text-yellow-400 mb-2">
                €{calculateTotal()}
                <span className="text-2xl text-white/70">/mo</span>
              </div>
              {packageType === 'elite' && (
                <p className="text-green-400 font-bold mb-6">
                  💰 Saving €{calculateSavings()}/month
                </p>
              )}
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-6 text-xl font-bold mt-4">
                Get Started Now
              </Button>
              <p className="text-sm text-white/60 mt-4">
                ✓ No commitment • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}