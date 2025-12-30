import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoTopBar() {
  const [banner, setBanner] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    loadBanner();
  }, []);

  const loadBanner = async () => {
    try {
      // Check if user dismissed it in this session
      const dismissedSession = sessionStorage.getItem('promo_topbar_dismissed');
      if (dismissedSession) {
        setDismissed(true);
        return;
      }

      const banners = await base44.entities.PromoBanner.filter({ 
        banner_type: 'top_bar',
        is_active: true 
      });

      if (banners.length > 0) {
        const activeBanner = banners.find(b => {
          const now = new Date();
          const start = b.start_date ? new Date(b.start_date) : null;
          const end = b.end_date ? new Date(b.end_date) : null;
          
          if (start && now < start) return false;
          if (end && now > end) return false;
          return true;
        });

        if (activeBanner) {
          setBanner(activeBanner);
        }
      }
    } catch (error) {
      console.error('Error loading top bar banner:', error);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('promo_topbar_dismissed', 'true');
    setDismissed(true);
  };

  const handleClick = () => {
    if (banner?.link_url) {
      window.open(banner.link_url, '_blank');
    }
  };

  if (!banner || dismissed) return null;

  // Determine which image to show based on screen size
  const getImageUrl = () => {
    if (window.innerWidth < 768 && banner.mobile_image_url) {
      return banner.mobile_image_url;
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1024 && banner.tablet_image_url) {
      return banner.tablet_image_url;
    }
    return banner.image_url;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
      >
        <div className="relative w-full">
          <img
            src={getImageUrl()}
            alt="Promo"
            className={`w-full object-cover ${banner.link_url ? 'cursor-pointer' : ''}`}
            style={{ maxHeight: '120px' }}
            onClick={handleClick}
          />
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}