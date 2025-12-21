import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const basePlans = [
  {
    id: '3month',
    name: '3 Months',
    price: 45,
    description: 'Perfect for getting started',
    discount: 0,
  },
  {
    id: '6month',
    name: '6 Months',
    price: 40,
    description: 'Most popular choice',
    discount: 10,
    popular: true,
  },
  {
    id: '12month',
    name: '12 Months',
    price: 35,
    description: 'Best value, maximum savings',
    discount: 20,
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
    const plan = basePlans.find(p => p.id === selectedPlan);
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return (plan?.price || 0) + addonsTotal;
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
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-black/20">
                    <span className="text-black font-bold">Base Plan</span>
                    <span className="text-black font-black">
                      €{basePlans.find(p => p.id === selectedPlan)?.price}/mo
                    </span>
                  </div>
                  
                  {selectedAddons.map(addonId => {
                    const addon = addons.find(a => a.id === addonId);
                    return (
                      <div key={addonId} className="flex justify-between items-center pb-3 border-b border-black/20">
                        <span className="text-black text-sm">{addon?.name}</span>
                        <span className="text-black font-bold">€{addon?.price}/mo</span>
                      </div>
                    );
                  })}
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
              {/* Base Plans */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-black mb-8">Select Your Base Plan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {basePlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id
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
                        <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                        <div className="mb-4">
                          <span className="text-5xl font-black">€{plan.price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                        {plan.discount > 0 && (
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            Save {plan.discount}%
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}