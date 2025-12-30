import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoTopBar() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    loadBanner();
  }, []);

  const loadBanner = async () => {
    try {
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

  if (!banner) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 relative z-50"
    >
      <div className="w-full">
        <picture>
          {banner.mobile_image_url && (
            <source media="(max-width: 640px)" srcSet={banner.mobile_image_url} />
          )}
          {banner.tablet_image_url && (
            <source media="(max-width: 1024px)" srcSet={banner.tablet_image_url} />
          )}
          <img
            src={banner.image_url}
            alt="Promo"
            className={`w-full h-auto object-cover ${banner.link_url ? 'cursor-pointer' : ''}`}
            style={{ maxHeight: '120px' }}
            onClick={handleClick}
          />
        </picture>
      </div>
    </motion.div>
  );
}