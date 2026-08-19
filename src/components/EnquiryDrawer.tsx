import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Clock, ShieldAlert, CheckCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { BookingForm } from './BookingForm';

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem;
  onSuccess: () => void;
  selectedCity: string;
}

export const EnquiryDrawer: React.FC<EnquiryDrawerProps> = ({
  isOpen,
  onClose,
  service,
  onSuccess,
  selectedCity,
}) => {
  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="enquiry-drawer-container">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Content Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-screen max-w-lg bg-white dark:bg-slate-900 shadow-2xl flex flex-col relative h-full border-l border-slate-100 dark:border-slate-800"
            >
              {/* Header section with orange/brand-blue highlight */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 px-6 py-5 border-b border-slate-800 text-white relative">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/15 px-2.5 py-1 rounded-full border border-orange-500/10 inline-block mb-1.5">
                      Verified Carrier Network
                    </span>
                    <h3 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
                      Shifting Enquiry
                    </h3>
                  </div>
                  
                  {/* Close button with subtle hover ring */}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer border border-transparent hover:border-slate-700"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtitle describing service context */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                  <span className="font-semibold text-orange-400">{service.name}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    📍 City: <span className="underline font-bold text-white">{selectedCity}</span>
                  </span>
                </div>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/50 space-y-6">
                
                {/* Visual indicator of trust metrics */}
                <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100/80 dark:border-slate-800 shadow-sm text-center">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">100% Insured</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-800">
                    <Clock className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Fast Shifting</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Free Cancel</span>
                  </div>
                </div>

                {/* The actual modular Enquiry form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
                  <BookingForm service={service} onSuccess={onSuccess} />
                </div>

                {/* Bottom assurance disclaimer */}
                <div className="bg-slate-100/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-200">Need immediate assistance?</p>
                  <p>Our dedicated support lines are open 24/7. Speak to a shift coordinator in Bangalore at support@packersolution.com or call our toll-free hotline.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
