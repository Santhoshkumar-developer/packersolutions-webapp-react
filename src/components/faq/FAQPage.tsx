import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { FAQ_CATEGORIES, FAQS_DATA, POPULAR_FAQ_IDS, FAQ } from '../../data/faqs';
import { FAQHero } from './FAQHero';
import { PopularQuestions } from './PopularQuestions';
import { FAQCategories } from './FAQCategories';
import { FAQAccordion } from './FAQAccordion';
import { FAQCTA } from './FAQCTA';

interface FAQPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
  selectedCity?: string;
  onOpenQuote?: () => void;
  onOpenBooking?: (serviceId?: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onNavigate,
  selectedCity = 'Coimbatore',
  onOpenQuote,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(new Set(['faq-price-1', 'faq-gen-1']));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Popular FAQs objects
  const popularFaqs = useMemo(() => {
    return FAQS_DATA.filter(f => POPULAR_FAQ_IDS.includes(f.id) || f.popular);
  }, []);

  // Calculate dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: FAQS_DATA.length
    };
    FAQ_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = FAQS_DATA.filter(f => f.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter FAQs based on search query & active category
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    return FAQS_DATA.filter((faq) => {
      // Category check
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      if (!matchesCategory) return false;

      // Query check (checks question, answer, and tags)
      if (!query) return true;

      const inQuestion = faq.question.toLowerCase().includes(query);
      const inAnswer = faq.answer.toLowerCase().includes(query);
      const inTags = faq.tags?.some(tag => tag.toLowerCase().includes(query)) || false;

      return inQuestion || inAnswer || inTags;
    });
  }, [searchQuery, activeCategory]);

  // Handle toggling single FAQ
  const handleToggleFaq = (faqId: string) => {
    setOpenFaqIds(prev => {
      const next = new Set(prev);
      if (next.has(faqId)) {
        next.delete(faqId);
      } else {
        next.add(faqId);
      }
      return next;
    });
  };

  // Expand all / Collapse all in current view
  const handleExpandAll = () => {
    setOpenFaqIds(new Set(filteredFaqs.map(f => f.id)));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds(new Set());
  };

  // Select popular FAQ -> switch category if needed, expand, and scroll to it
  const handleSelectPopularFaq = (faqId: string, category: string) => {
    setSearchQuery('');
    if (activeCategory !== 'all' && activeCategory !== category) {
      setActiveCategory('all');
    }
    setOpenFaqIds(prev => new Set(prev).add(faqId));
    
    setTimeout(() => {
      const element = document.getElementById(`faq-card-${faqId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  // Generate JSON-LD Structured Data Schema for FAQPage
  const faqSchemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'name': 'Packersolution Frequently Asked Questions',
      'description': 'Comprehensive answers to common questions about house shifting, office relocation, vehicle transportation, packing, pricing, insurance, and warehouse storage in India.',
      'mainEntity': FAQS_DATA.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }, []);

  return (
    <div id="faq-page-view" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-roboto">
      
      {/* SEO Helmet Integration */}
      <Helmet>
        <title>Packers and Movers FAQs | Shifting, Pricing & Transport Questions</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about Packers and Movers services, household shifting, vehicle transportation, warehouse storage, insurance, and pricing in Coimbatore, Chennai, and Bangalore." 
        />
        <meta 
          name="keywords" 
          content="Packers and Movers FAQ, household shifting questions, office relocation answers, vehicle transport cost, warehouse storage rules, packers and movers in Coimbatore, packers and movers in Chennai, intercity relocation" 
        />
        <link rel="canonical" href="https://packersolution.com/#faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaData)}
        </script>
      </Helmet>

      {/* 1. Hero Section with dynamic Search */}
      <FAQHero
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onClearSearch={() => setSearchQuery('')}
        totalFaqsCount={FAQS_DATA.length}
        filteredCount={filteredFaqs.length}
      />

      {/* Main Content Area (Max width around 1200px) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button 
              type="button"
              onClick={() => onNavigate('home')} 
              className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-bold">Frequently Asked Questions</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Serving: <strong className="text-orange-600 dark:text-orange-400">{selectedCity}</strong> & Pan India
            </span>
          </div>
        </div>

        {/* 2. Popular Questions Quick Links (Shown when not searching) */}
        {!searchQuery && (
          <PopularQuestions
            popularFaqs={popularFaqs}
            onSelectFaq={handleSelectPopularFaq}
          />
        )}

        {/* 3. Category Filter Tabs */}
        <FAQCategories
          categories={FAQ_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
          }}
          categoryCounts={categoryCounts}
        />

        {/* 4. Controls Bar (Count + Expand / Collapse All) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}</span>
            {searchQuery && (
              <span className="font-normal text-slate-400">
                for <span className="font-semibold text-orange-500">"{searchQuery}"</span>
              </span>
            )}
          </div>

          {filteredFaqs.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {/* 5. FAQ Accordion Cards List */}
        <FAQAccordion
          faqs={filteredFaqs}
          openFaqIds={openFaqIds}
          onToggleFaq={handleToggleFaq}
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
        />

        {/* 6. "Still Have Questions?" CTA Component */}
        <div className="pt-6">
          <FAQCTA
            onOpenQuote={onOpenQuote || (() => onNavigate('home'))}
            onNavigateContact={() => onNavigate('contact')}
          />
        </div>

      </div>
    </div>
  );
};
