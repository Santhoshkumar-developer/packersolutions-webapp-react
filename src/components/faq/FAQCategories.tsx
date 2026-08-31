import React from 'react';
import { 
  HelpCircle, 
  Info, 
  Package, 
  Home, 
  Briefcase, 
  Car, 
  Layers, 
  Truck, 
  Warehouse, 
  CreditCard, 
  ShieldCheck, 
  CalendarCheck 
} from 'lucide-react';
import { FAQCategory } from '../../data/faqs';

interface FAQCategoriesProps {
  categories: FAQCategory[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

export const FAQCategories: React.FC<FAQCategoriesProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Info': return <Info className="w-4 h-4" />;
      case 'Package': return <Package className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Warehouse': return <Warehouse className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'CalendarCheck': return <CalendarCheck className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div id="faq-categories-container" className="w-full font-roboto">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Filter by Category
        </h3>
        <span className="text-xs text-slate-400">
          Showing {categoryCounts[activeCategory] || 0} questions
        </span>
      </div>

      {/* Horizontal scroll on mobile, responsive flex-wrap on larger screens */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`faq-category-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-[#001261] dark:bg-orange-600 text-white border-[#001261] dark:border-orange-600 shadow-sm shadow-blue-900/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <span className={`transition-colors ${isActive ? 'text-orange-400 dark:text-white' : 'text-slate-400 group-hover:text-orange-500'}`}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-orange-50 dark:group-hover:bg-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
