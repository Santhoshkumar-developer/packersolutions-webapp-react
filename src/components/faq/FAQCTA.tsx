import React from 'react';
import { PhoneCall, Calculator, ArrowRight, MessageSquare, Headphones } from 'lucide-react';

interface FAQCTAProps {
  onOpenQuote?: () => void;
  onNavigateContact?: () => void;
}

export const FAQCTA: React.FC<FAQCTAProps> = ({
  onOpenQuote,
  onNavigateContact
}) => {
  return (
    <section 
      id="faq-cta-section" 
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001261] via-[#0321a1] to-[#000d47] text-white p-8 sm:p-12 shadow-xl border border-blue-900/60 font-roboto"
    >
      {/* Decorative background visual elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        
        {/* Support Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
          <Headphones className="w-3.5 h-3.5" />
          <span>24x7 Dedicated Relocation Support</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
          Still Have Questions?
        </h2>

        {/* Description */}
        <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Our team is here to help you plan your move with confidence. Speak to our verified move managers or calculate your shifting cost in seconds.
        </p>

        {/* Actions Grid */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-faq-cta-get-quote"
            type="button"
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-faq-cta-contact-us"
            type="button"
            onClick={onNavigateContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold text-sm border border-white/25 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Helpline quick link */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 border-t border-white/10">
          <a 
            href="tel:+919500955237" 
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span>Direct Helpline: <strong className="font-mono text-white">+91 95009-55237</strong></span>
          </a>
          <span className="hidden sm:inline">•</span>
          <span>Instant WhatsApp Quotes Available</span>
        </div>

      </div>
    </section>
  );
};
