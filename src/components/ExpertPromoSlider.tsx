/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

import acPromoImg from '../assets/images/promo_ac_service_1785323463821.jpg';
import packagingPromoImg from '../assets/images/promo_packaging_service_1785323481720.jpg';
import carpenterPromoImg from '../assets/images/promo_carpenter_service_1785323496829.jpg';
import cratingPromoImg from '../assets/images/promo_crating_service_1785323510651.jpg';
import electricalPromoImg from '../assets/images/promo_electrical_service_1785323786733.jpg';
import paintingPromoImg from '../assets/images/promo_painting_service_1785323808438.jpg';

interface PromoCard {
  id: number;
  tag: string;
  title: string;
  highlightText: string;
  description: string;
  image: string;
  bgClass: string;
  tagColor: string;
  titleColor: string;
}

export const ExpertPromoSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const cards: PromoCard[] = [
    {
      id: 0,
      tag: 'Expert Service',
      title: 'Installation/ Uninstallation Of AC\'s',
      highlightText: 'Installation/ Uninstallation Of AC\'s',
      description: 'Background-verified AC specialist support with nitrogen leak testing & bracket fitting.',
      image: acPromoImg,
      bgClass: 'bg-[#f0f7e8] dark:bg-slate-900 border-[#e1eecf] dark:border-slate-800',
      tagColor: 'text-[#41622f] dark:text-emerald-400',
      titleColor: 'text-[#2e4720] dark:text-slate-100',
    },
    {
      id: 1,
      tag: 'Multi-Layer Packaging',
      title: 'Ensure Safe Movement Of Household Items',
      highlightText: 'Ensure Safe Movement Of Household Items',
      description: '5-layer heavy-duty cartons, multi-bubble wrap rolls & clear stretch film protection.',
      image: packagingPromoImg,
      bgClass: 'bg-[#f4f0fa] dark:bg-slate-900 border-[#e6dcf5] dark:border-slate-800',
      tagColor: 'text-[#523378] dark:text-purple-400',
      titleColor: 'text-[#382054] dark:text-slate-100',
    },
    {
      id: 2,
      tag: 'Carpenter Support',
      title: 'Modular Furniture Dismantling & Assembly',
      highlightText: 'Modular Furniture Dismantling & Assembly',
      description: 'Certified carpenters for modular wardrobes, hydraulic king-size beds & wall mounts.',
      image: carpenterPromoImg,
      bgClass: 'bg-[#fdf5eb] dark:bg-slate-900 border-[#f8e3ce] dark:border-slate-800',
      tagColor: 'text-[#7d4e21] dark:text-amber-400',
      titleColor: 'text-[#543313] dark:text-slate-100',
    },
    {
      id: 3,
      tag: 'Specialized Transit',
      title: 'Fragile TVs & Appliances Wooden Crating',
      highlightText: 'Fragile TVs & Appliances Wooden Crating',
      description: 'Custom corrugated crates with thermocol shock pads for maximum screen safety.',
      image: cratingPromoImg,
      bgClass: 'bg-[#edf4fb] dark:bg-slate-900 border-[#d8e7f7] dark:border-slate-800',
      tagColor: 'text-[#28537e] dark:text-blue-400',
      titleColor: 'text-[#1a3857] dark:text-slate-100',
    },
    {
      id: 4,
      tag: 'Electrical Fitting',
      title: 'Geysers, Wiring & Smart Appliance Setup',
      highlightText: 'Geysers, Wiring & Smart Appliance Setup',
      description: 'Licensed electrician services for high-voltage appliances and custom home wiring.',
      image: electricalPromoImg,
      bgClass: 'bg-[#fbf4ea] dark:bg-slate-900 border-[#f5e5d3] dark:border-slate-800',
      tagColor: 'text-[#7d4a19] dark:text-orange-400',
      titleColor: 'text-[#52300f] dark:text-slate-100',
    },
    {
      id: 5,
      tag: 'Home Refresh',
      title: 'Interior Wall Painting & Touch-up',
      highlightText: 'Interior Wall Painting & Touch-up',
      description: 'Dust-free professional wall painting with premium moisture-resistant coatings.',
      image: paintingPromoImg,
      bgClass: 'bg-[#eaf6f4] dark:bg-slate-900 border-[#d3ede9] dark:border-slate-800',
      tagColor: 'text-[#205c53] dark:text-teal-400',
      titleColor: 'text-[#133d37] dark:text-slate-100',
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay Slider every 4 seconds
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 4000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex]);

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 4000);
  };

  // Compute 3 visible cards starting at currentIndex
  const visibleCards = [
    cards[currentIndex % cards.length],
    cards[(currentIndex + 1) % cards.length],
    cards[(currentIndex + 2) % cards.length]
  ];

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Slider Header */}
      <div className="flex items-center justify-between mb-4 px-2 sm:px-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 block font-sans">
            SUPERIOR HOME SERVICES
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
            Expert Value Add-ons
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { handlePrev(); resetAutoplay(); }}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => { handleNext(); resetAutoplay(); }}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3-Card Carousel Container */}
      <div className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleCards.map((card, idx) => {
              // Hide 2nd and 3rd card on smaller screens for responsive perfection
              const visibilityClass = idx === 0 
                ? 'block' 
                : idx === 1 
                  ? 'hidden md:block' 
                  : 'hidden lg:block';

              return (
                <motion.div
                  key={`${card.id}-${currentIndex}-${idx}`}
                  layout
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`${visibilityClass} w-full`}
                >
                  <div className={`h-[220px] sm:h-[230px] ${card.bgClass} border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex items-stretch relative group cursor-pointer`}>
                    
                    {/* Left Text Banner */}
                    <div className="w-[58%] p-4 sm:p-5 flex flex-col justify-between z-10">
                      <div>
                        {/* Tag */}
                        <span className={`text-base sm:text-lg font-bold ${card.tagColor} tracking-tight font-sans block mb-0.5`}>
                          {card.tag}
                        </span>

                        {/* Title */}
                        <h3 className={`text-sm sm:text-base font-semibold ${card.titleColor} tracking-tight leading-snug line-clamp-2`}>
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-normal sm:font-medium leading-relaxed line-clamp-2 mt-1.5">
                          {card.description}
                        </p>
                      </div>

                      {/* Verified Badge */}
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">Verified Technician</span>
                      </div>
                    </div>

                    {/* Right Arched Image Container */}
                    <div className="w-[42%] relative h-full overflow-hidden">
                      <div className="relative h-full w-full overflow-hidden rounded-l-[50px] sm:rounded-l-[60px] shadow-inner bg-slate-200 dark:bg-slate-800">
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        {/* Soft overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bullet Indicator Dots for All Cards */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {cards.map((item, i) => (
          <button
            key={item.id}
            onClick={() => { handleDotClick(i); resetAutoplay(); }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex 
                ? 'w-8 bg-orange-500 dark:bg-orange-400' 
                : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
            title={`Slide ${i + 1}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


