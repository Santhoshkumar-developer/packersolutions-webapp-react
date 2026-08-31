import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Check, Star } from 'lucide-react';
import { FAQ, FAQ_CATEGORIES } from '../../data/faqs';

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery?: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  isOpen,
  onToggle,
  searchQuery = ''
}) => {
  // Category label lookup
  const categoryObj = FAQ_CATEGORIES.find(c => c.id === faq.category);
  const categoryName = categoryObj ? categoryObj.name : faq.category;

  // Helper to highlight matching search words
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-orange-200 dark:bg-orange-950/80 text-orange-950 dark:text-orange-200 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      id={`faq-card-${faq.id}`}
      className={`rounded-2xl border transition-all duration-200 font-roboto ${
        isOpen
          ? 'bg-white dark:bg-slate-900 border-orange-400 dark:border-orange-500 shadow-md ring-2 ring-orange-500/10'
          : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
      }`}
    >
      {/* Header Button */}
      <button
        id={`btn-faq-accordion-${faq.id}`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl"
      >
        <div className="space-y-1.5 flex-1 pr-2">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md">
              {categoryName}
            </span>
            {faq.popular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                Popular
              </span>
            )}
          </div>

          {/* Question Title */}
          <h3 className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
            isOpen ? 'text-slate-950 dark:text-white' : 'text-slate-800 dark:text-slate-200'
          }`}>
            {highlightText(faq.question, searchQuery)}
          </h3>
        </div>

        {/* Plus / Minus indicator button icon */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
            isOpen
              ? 'bg-orange-500 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Accordion Content with smooth height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`btn-faq-accordion-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 mt-1">
              <div className="pt-3">
                {highlightText(faq.answer, searchQuery)}
              </div>

              {/* Verified answer footer indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Verified by Packersolution Moving Specialists
                </span>
                {faq.tags && (
                  <div className="hidden sm:flex gap-1.5">
                    {faq.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
