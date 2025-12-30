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

  const handleClick = () => {
    if (banner?.link_url) {
      window.open(banner.link_url, '_blank');
    }
  };

  if (!banner || dismissed) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
    >
      <div className="w-full">
        {/* Desktop/Tablet Image */}
        <img
          src={banner.image_url}
          alt="Promo"
          className={`w-full object-cover hidden md:block ${banner.link_url ? 'cursor-pointer' : ''}`}
          style={{ maxHeight: '120px' }}
          onClick={handleClick}
        />
        {/* Tablet Image */}
        {banner.tablet_image_url && (
          <img
            src={banner.tablet_image_url}
            alt="Promo"
            className={`w-full object-cover hidden sm:block md:hidden ${banner.link_url ? 'cursor-pointer' : ''}`}
            style={{ maxHeight: '100px' }}
            onClick={handleClick}
          />
        )}
        {/* Mobile Image */}
        <img
          src={banner.mobile_image_url || banner.image_url}
          alt="Promo"
          className={`w-full object-cover block ${banner.tablet_image_url ? 'sm:hidden' : 'md:hidden'} ${banner.link_url ? 'cursor-pointer' : ''}`}
          style={{ maxHeight: '80px' }}
          onClick={handleClick}
        />
      </div>
    </motion.div>
  );
}