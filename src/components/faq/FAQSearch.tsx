import React from 'react';
import { Search, X } from 'lucide-react';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  totalFaqsCount: number;
  filteredCount: number;
}

export const FAQSearch: React.FC<FAQSearchProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalFaqsCount,
  filteredCount
}) => {
  return (
    <div className="relative w-full text-left">
      <label htmlFor="faq-search-input" className="sr-only">
        Search your question
      </label>
      
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4.5 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-orange-500" />
        </div>

        {/* Search Input */}
        <input
          id="faq-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your question (e.g. cost, insurance, packing, vehicle transport)..."
          className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium rounded-2xl pl-12 pr-28 py-4 border-2 border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 shadow-lg transition-all"
        />

        {/* Right side Actions (Clear Button & Match Badge) */}
        <div className="absolute right-3.5 flex items-center gap-2">
          {searchQuery && (
            <>
              <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                {filteredCount} {filteredCount === 1 ? 'result' : 'results'}
              </span>
              <button
                id="btn-clear-faq-search"
                type="button"
                onClick={onClearSearch}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Helper text under search */}
      <div className="flex items-center justify-between mt-2 px-2 text-[11px] text-slate-400">
        <span>Try searching: <button type="button" onClick={() => onSearchChange('cost')} className="underline hover:text-orange-400 cursor-pointer">cost</button>, <button type="button" onClick={() => onSearchChange('insurance')} className="underline hover:text-orange-400 cursor-pointer">insurance</button>, <button type="button" onClick={() => onSearchChange('bike')} className="underline hover:text-orange-400 cursor-pointer">bike transport</button>, <button type="button" onClick={() => onSearchChange('cancellation')} className="underline hover:text-orange-400 cursor-pointer">cancellation</button></span>
        <span className="hidden md:inline font-mono text-[10px]">{totalFaqsCount} total questions</span>
      </div>
    </div>
  );
};
