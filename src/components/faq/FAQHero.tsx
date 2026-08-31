import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { FAQSearch } from './FAQSearch';

interface FAQHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  totalFaqsCount: number;
  filteredCount: number;
}

export const FAQHero: React.FC<FAQHeroProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalFaqsCount,
  filteredCount
}) => {
  return (
    <section 
      id="faq-hero-section" 
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#071330] to-slate-900 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-800 font-roboto"
    >
      {/* Decorative ambient lighting & grid backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff6200_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-orange-400 text-xs font-bold tracking-wide uppercase shadow-sm mb-5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
          <span>Knowledge Base & Support Center</span>
        </motion.div>

        {/* Primary H1 Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          id="faq-page-main-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
        >
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Questions</span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
        >
          Get instant, transparent answers about packing, moving, vehicle transportation, pricing calculation, booking, insurance coverage, and secure warehouse storage across India.
        </motion.p>

        {/* Visual Highlights Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-slate-300"
        >
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/70 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <Truck className="w-3.5 h-3.5 text-orange-400" />
            <span>100+ Cities Covered</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/70 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>100% Transit Insured</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/70 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Zero Hidden Charges</span>
          </div>
        </motion.div>

        {/* Dynamic Search Component */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <FAQSearch 
            searchQuery={searchQuery} 
            onSearchChange={onSearchChange} 
            onClearSearch={onClearSearch}
            totalFaqsCount={totalFaqsCount}
            filteredCount={filteredCount}
          />
        </motion.div>

      </div>
    </section>
  );
};
