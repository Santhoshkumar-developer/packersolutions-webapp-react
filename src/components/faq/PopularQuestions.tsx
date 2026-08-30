import React from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';
import { FAQ } from '../../data/faqs';

interface PopularQuestionsProps {
  popularFaqs: FAQ[];
  onSelectFaq: (faqId: string, category: string) => void;
}

export const PopularQuestions: React.FC<PopularQuestionsProps> = ({
  popularFaqs,
  onSelectFaq
}) => {
  if (!popularFaqs || popularFaqs.length === 0) return null;

  return (
    <div id="popular-faqs-section" className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs font-roboto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
          <Flame className="w-4 h-4 text-orange-500" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Popular Questions
        </h2>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Frequently asked by our customers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {popularFaqs.map((faq) => (
          <button
            key={faq.id}
            id={`popular-faq-btn-${faq.id}`}
            onClick={() => onSelectFaq(faq.id, faq.category)}
            className="group text-left p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 hover:border-orange-500/60 dark:hover:border-orange-500/60 hover:shadow-md transition-all duration-200 cursor-pointer flex items-start justify-between gap-2.5"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
              {faq.question}
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
