import React from 'react';
import { HelpCircle, RefreshCw } from 'lucide-react';
import { FAQ } from '../../data/faqs';
import { FAQItem } from './FAQItem';

interface FAQAccordionProps {
  faqs: FAQ[];
  openFaqIds: Set<string>;
  onToggleFaq: (faqId: string) => void;
  searchQuery: string;
  onResetFilters: () => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  openFaqIds,
  onToggleFaq,
  searchQuery,
  onResetFilters
}) => {
  if (faqs.length === 0) {
    return (
      <div 
        id="faq-empty-state" 
        className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800"
      >
        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No questions found
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
          {searchQuery 
            ? `We couldn't find any questions matching "${searchQuery}". Try searching with different keywords or browse our categories.`
            : 'No questions are currently available under this category.'
          }
        </p>
        <button
          id="btn-reset-faq-filters"
          type="button"
          onClick={onResetFilters}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Search & Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div id="faq-accordion-list" className="space-y-3 sm:space-y-4">
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openFaqIds.has(faq.id)}
          onToggle={() => onToggleFaq(faq.id)}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
};
