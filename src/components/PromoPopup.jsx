import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function PromoPopup() {
  const [banner, setBanner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Delay popup appearance by 2 seconds
    const timer = setTimeout(() => {
      loadBanner();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadBanner = async () => {
    try {
      // Check if user dismissed it in this session
      const dismissedSession = sessionStorage.getItem('promo_popup_dismissed');
      if (dismissedSession) {
        return;
      }

      const banners = await base44.entities.PromoBanner.filter({ 
        banner_type: 'popup_modal',
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
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error loading popup banner:', error);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem('promo_popup_dismissed', 'true');
    setShowPopup(false);
  };

  const handleClick = () => {
    if (banner?.link_url) {
      window.open(banner.link_url, '_blank');
      handleClose();
    }
  };

  if (!banner) return null;

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white rounded-full p-2 z-10 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          {/* Desktop Image */}
          <img
            src={banner.image_url}
            alt="Promo"
            className={`w-full rounded-lg hidden md:block ${banner.link_url ? 'cursor-pointer' : ''}`}
            onClick={handleClick}
          />
          {/* Tablet Image */}
          {banner.tablet_image_url && (
            <img
              src={banner.tablet_image_url}
              alt="Promo"
              className={`w-full rounded-lg hidden sm:block md:hidden ${banner.link_url ? 'cursor-pointer' : ''}`}
              onClick={handleClick}
            />
          )}
          {/* Mobile Image */}
          <img
            src={banner.mobile_image_url || banner.image_url}
            alt="Promo"
            className={`w-full rounded-lg block ${banner.tablet_image_url ? 'sm:hidden' : 'md:hidden'} ${banner.link_url ? 'cursor-pointer' : ''}`}
            onClick={handleClick}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}