import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Sparkles, Loader2, Apple, Coffee, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function MealPlanner() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dietary_preferences: 'none',
    daily_calories: 2000,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      const profiles = await base44.entities.UserProfile.filter({ user_id: currentUser.email });
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        setFormData({
          dietary_preferences: profiles[0].dietary_preferences || 'none',
          daily_calories: 2000,
        });
      } else {
        setShowForm(true);
      }

      const plans = await base44.entities.MealPlan.filter({ user_id: currentUser.email, is_active: true });
      if (plans.length > 0) {
        setMealPlan(plans[0]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateMealPlan = async () => {
    setLoading(true);
    try {
      if (profile) {
        await base44.entities.UserProfile.update(profile.id, {
          dietary_preferences: formData.dietary_preferences,
        });
      }

      const prompt = `Generate a detailed 7-day meal plan with the following requirements:
- Dietary Preference: ${formData.dietary_preferences}
- Daily Calories Target: ${formData.daily_calories} calories
- Fitness Goal: ${profile?.fitness_goal || 'general_fitness'}

Create a structured meal plan with breakfast, lunch, dinner, and 2 snacks for each day. Include calories and macros for each meal.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            plan_name: { type: 'string' },
            days: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day_name: { type: 'string' },
                  meals: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        meal_type: { type: 'string' },
                        name: { type: 'string' },
                        ingredients: { type: 'array', items: { type: 'string' } },
                        calories: { type: 'number' },
                        protein: { type: 'number' },
                        carbs: { type: 'number' },
                        fats: { type: 'number' },
                        preparation: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      const plan = await base44.entities.MealPlan.create({
        user_id: user.email,
        plan_name: result.plan_name,
        duration_days: 7,
        plan_data: result,
        daily_calories: formData.daily_calories,
        is_active: true,
      });

      setMealPlan(plan);
      setShowForm(false);
    } catch (error) {
      console.error('Error generating plan:', error);
    }
    setLoading(false);
  };

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: Coffee,
      lunch: Apple,
      dinner: Utensils,
      snack: Apple,
    };
    const Icon = icons[mealType.toLowerCase()] || Utensils;
    return <Icon className="w-5 h-5" />;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Utensils className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-black mb-6">AI Meal Planner</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Get personalized meal plans tailored to your nutrition goals
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          {!mealPlan || showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-black mb-8">Customize Your Meal Plan</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Dietary Preferences</label>
                  <select
                    value={formData.dietary_preferences}
                    onChange={(e) => setFormData({ ...formData, dietary_preferences: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="none">No Restrictions</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="gluten_free">Gluten Free</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Daily Calorie Target: {formData.daily_calories} cal
                  </label>
                  <input
                    type="range"
                    min="1200"
                    max="3500"
                    step="100"
                    value={formData.daily_calories}
                    onChange={(e) => setFormData({ ...formData, daily_calories: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={generateMealPlan}
                  disabled={loading}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-6 text-lg font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Your Meal Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate AI Meal Plan
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
                <div>
                  <h2 className="text-3xl font-black mb-2">{mealPlan.plan_data.plan_name}</h2>
                  <p className="text-gray-600">{mealPlan.daily_calories} calories per day</p>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
                >
                  Generate New Plan
                </Button>
              </div>

              {mealPlan.plan_data.days.map((day, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIdx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-black mb-6">{day.day_name}</h3>
                  
                  <div className="space-y-4">
                    {day.meals.map((meal, mealIdx) => (
                      <div key={mealIdx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                              {getMealIcon(meal.meal_type)}
                            </div>
                            <div>
                              <h4 className="font-black text-lg">{meal.meal_type}</h4>
                              <p className="text-gray-600">{meal.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-yellow-400">{meal.calories}</div>
                            <div className="text-xs text-gray-500">calories</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="font-bold text-lg">{meal.protein}g</div>
                            <div className="text-xs text-gray-500">Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{meal.carbs}g</div>
                            <div className="text-xs text-gray-500">Carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{meal.fats}g</div>
                            <div className="text-xs text-gray-500">Fats</div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <h5 className="font-bold text-sm mb-2">Ingredients:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {meal.ingredients.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>

                        {meal.preparation && (
                          <div>
                            <h5 className="font-bold text-sm mb-2">Preparation:</h5>
                            <p className="text-sm text-gray-600">{meal.preparation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}