import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Minus } from 'lucide-react';
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
    included: ['All Add-ons Included', 'Priority Booking', 'VIP Locker Room', 'Free Guest Passes (2/month)'],
  },
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
            <h1 className="text-5xl md:text-7xl font-black mb-6">Choose Your Package</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Build your perfect fitness plan with flexible pricing and custom add-ons
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Calculator Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-black text-black mb-6">Your Package</h3>
                
                <div className="mb-4 pb-4 border-b border-black/20">
                  <span className="text-black text-sm font-bold">Package Type</span>
                  <div className="text-2xl font-black text-black mt-1">
                    {packageTypes.find(p => p.id === packageType)?.name}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-black/20">
                    <span className="text-black font-bold">Base Plan</span>
                    <span className="text-black font-black">
                      €{packageTypes.find(p => p.id === packageType)?.plans.find(pl => pl.duration === selectedPlan)?.price}/mo
                    </span>
                  </div>
                  
                  {packageType === 'starter' && selectedAddons.map(addonId => {
                    const addon = addons.find(a => a.id === addonId);
                    return (
                      <div key={addonId} className="flex justify-between items-center pb-3 border-b border-black/20">
                        <span className="text-black text-sm">{addon?.name}</span>
                        <span className="text-black font-bold">€{addon?.price}/mo</span>
                      </div>
                    );
                  })}

                  {packageType === 'elite' && (
                    <div className="bg-black/10 rounded-xl p-4 mt-4">
                      <p className="text-black font-bold text-sm mb-2">✓ All Add-ons Included</p>
                      <p className="text-green-700 font-black text-lg">
                        Save €{calculateSavings()}/mo
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t-2 border-black">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-black text-black">Total</span>
                    <span className="text-4xl font-black text-black">
                      €{calculateTotal()}
                      <span className="text-lg">/mo</span>
                    </span>
                  </div>
                  
                  <Button className="w-full bg-black text-yellow-400 hover:bg-gray-800 py-6 text-lg font-bold">
                    Get Started
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-black/70 text-sm">
                    ✓ No commitment • Cancel anytime
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Plans & Add-ons */}
            <div className="lg:col-span-2 space-y-12">
              {/* Package Type Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-black mb-4">Choose Your Package Type</h2>
                <p className="text-gray-600 mb-8">Start with flexibility or go all-in with Elite</p>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {packageTypes.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setPackageType(pkg.id);
                        if (pkg.id === 'elite') setSelectedAddons([]);
                      }}
                      className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                        packageType === pkg.id
                          ? 'border-yellow-400 bg-yellow-50 shadow-xl'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <h3 className="text-3xl font-black mb-2">{pkg.name}</h3>
                      <p className="text-gray-600 mb-4">{pkg.description}</p>
                      {pkg.id === 'elite' && (
                        <div className="space-y-2">
                          {pkg.included.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Duration Plans */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-3xl font-black mb-8">Select Duration</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {packageTypes.find(p => p.id === packageType)?.plans.map((plan) => (
                    <motion.div
                      key={plan.duration}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPlan(plan.duration)}
                      className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.duration
                          ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="px-4 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                            POPULAR
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-5xl font-black">€{plan.price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                        {plan.savings && (
                          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            💰 Save €{plan.savings}/mo
                          </div>
                        )}
                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Access to all equipment</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Locker room access</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Mobile app access</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Add-ons */}
              {packageType === 'starter' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-black mb-4">Customize with Add-ons</h2>
                  <p className="text-gray-600 mb-8">
                    Build your perfect package by adding services you need
                  </p>
                
                <div className="space-y-4">
                  {addons.map((addon) => (
                    <motion.div
                      key={addon.id}
                      whileHover={{ x: 5 }}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddons.includes(addon.id)
                          ? 'border-yellow-400 bg-yellow-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedAddons.includes(addon.id)
                            ? 'bg-yellow-400'
                            : 'bg-gray-100'
                        }`}>
                          {selectedAddons.includes(addon.id) ? (
                            <Check className="w-5 h-5 text-black" />
                          ) : (
                            <Plus className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{addon.name}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black">€{addon.price}</span>
                        <span className="text-gray-600">/mo</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              )}

              {packageType === 'elite' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-12 text-center"
                >
                  <h2 className="text-4xl font-black text-black mb-6">All Add-ons Included!</h2>
                  <p className="text-black/80 text-xl mb-8">
                    Elite package includes everything - no need to pick and choose
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {addons.map((addon) => (
                      <div key={addon.id} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-yellow-400" />
                        </div>
                        <span className="text-black font-bold text-left">{addon.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}