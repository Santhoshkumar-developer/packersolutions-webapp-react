/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS_GENERAL } from '../data/services';
import { LucideIcon } from './LucideIcon';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  serviceSpecificFaqs?: FAQItem[];
  serviceName?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ serviceSpecificFaqs = [], serviceName }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'general' | 'service'>('general');

  const faqs = activeTab === 'service' && serviceSpecificFaqs.length > 0 ? serviceSpecificFaqs : FAQS_GENERAL;

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs-section" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-orange-600 dark:text-orange-400 text-xs font-bold tracking-widest uppercase bg-orange-100 dark:bg-orange-950/60 px-3 py-1 rounded-full">
            Help & Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
            Have questions about pricing, safety, insurance or vehicle booking? Find answers to all your packing & moving inquiries with Packersolutions below.
          </p>
        </div>

        {/* Toggles between General & Service Specific (if applicable) */}
        {serviceSpecificFaqs.length > 0 && (
          <div className="flex justify-center mb-8 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl max-w-md mx-auto">
            <button
              id="btn-faq-tab-general"
              onClick={() => {
                setActiveTab('general');
                setActiveIndex(0);
              }}
              className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              General Shifting FAQs
            </button>
            <button
              id="btn-faq-tab-service"
              onClick={() => {
                setActiveTab('service');
                setActiveIndex(0);
              }}
              className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'service'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {serviceName ? `${serviceName} FAQs` : 'Service Specific FAQs'}
            </button>
          </div>
        )}

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50/10 dark:bg-orange-950/10 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  id={`btn-toggle-faq-${index}`}
                  onClick={() => handleToggle(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-2 leading-relaxed">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-orange-500 text-white rotate-180' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    ▼
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-white dark:bg-slate-900/80">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions? section */}
        <div className="mt-12 text-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Still have questions?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get in touch directly with our support specialists via phone or whatsapp.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a 
              href="tel:+919876543210" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-colors flex items-center gap-1.5"
            >
              <LucideIcon name="Phone" className="w-3.5 h-3.5" />
              Call Specialist
            </a>
            <a 
              href="https://wa.me/919876543210" 
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-colors flex items-center gap-1.5"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
