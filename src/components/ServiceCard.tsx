/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ServiceItem } from '../types';
import { LucideIcon } from './LucideIcon';

interface ServiceCardProps {
  service?: ServiceItem;
  onSelect?: (serviceId: string) => void;
  isLoading?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, isLoading }) => {
  if (isLoading || !service) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-md flex flex-col justify-between relative overflow-hidden animate-pulse min-h-[280px]">
        {/* Decorative ambient skeleton background */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full blur-xl"></div>
        
        <div>
          {/* Icon frame skeleton */}
          <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 mb-5"></div>

          {/* Title skeleton */}
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mb-3"></div>
          
          {/* Tagline skeleton */}
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/60 rounded-lg w-1/2 mb-4"></div>

          {/* Description skeleton */}
          <div className="space-y-2 mt-4">
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md w-full"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md w-5/6"></div>
          </div>
        </div>

        {/* Pricing and Action Footer skeleton */}
        <div className="border-t border-slate-50 dark:border-slate-800 pt-4 mt-6 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-10"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
          </div>

          <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-28"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id={`bento-card-${service.id}`}
      onClick={() => onSelect && onSelect(service.id)}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
    >
      {/* Decorative ambient background accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/20 dark:bg-orange-950/20 rounded-full blur-xl group-hover:bg-orange-100/40 dark:group-hover:bg-orange-950/40 transition-all duration-300"></div>

      <div>
        {/* Dynamic Icon frame */}
        <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
          <LucideIcon name={service.iconName} className="w-6 h-6" />
        </div>

        {/* Content details */}
        <h3 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-xs font-bold text-orange-500/90 dark:text-orange-400 mt-1 leading-normal">
          {service.tagline}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-3">
          {service.shortDescription}
        </p>
      </div>

      {/* Pricing and Action Footer */}
      <div className="border-t border-slate-50 dark:border-slate-800 pt-4 mt-6 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block tracking-wider leading-none">
            {service.priceMetric}
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5 block">
            ₹{service.basePrice.toLocaleString()}
          </span>
        </div>

        <button 
          id={`btn-select-${service.id}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent card container double-firing
            onSelect && onSelect(service.id);
          }}
          className="bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-500 group-hover:text-white text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
        >
          Details & Quote
          <LucideIcon name="ArrowRight" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
