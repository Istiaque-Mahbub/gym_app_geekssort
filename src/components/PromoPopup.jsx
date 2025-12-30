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
              className={`w-full h-auto rounded-lg ${banner.link_url ? 'cursor-pointer' : ''}`}
              onClick={handleClick}
            />
          </picture>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}