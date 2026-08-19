/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Users, Award, Shield, FileText, CheckCircle } from 'lucide-react';

interface AboutUsProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenBooking: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="bg-background-app text-slate-800 font-sans leading-relaxed" id="about-us-page">
      
      {/* 1. Header Banner / Page Title Section */}
      <section className="bg-[#0b1329] text-white py-12 md:py-16 text-center border-b border-slate-800 relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-2">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/15">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight font-sans mt-3">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-teal-400 font-semibold">Us</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl mx-auto mt-2 leading-normal">
            Building India's largest and most reliable intra-city tech-enabled logistics and shifting ecosystem.
          </p>
        </div>
      </section>
 
      {/* 2. Main Narrative Section (Two Columns: Text & Image) */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Narrative paragraphs */}
            <div className="lg:col-span-7 space-y-6 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              <p>
                Founded in 2014, Porter is a leading Goods Transport Agency offering a wide range of logistics solutions. The company operates across multiple segments of the logistics sector, including on-demand intra-city goods transportation through various categories of vehicles, Packers & Movers and inter-city transportation. Backed by a 2,600-member team, Porter has leveraged technology to drive efficiencies, offer MSMEs accessible and cost-effective logistics, and strengthen India's transition towards an organized and connected economy.
              </p>
              <p>
                Porter serves over 30 lakh customers - including 20 lakh MSMEs and 3 lakh driver-partners every month across 35 cities in India. Over the last eleven years, alongside strengthening urban logistics, the company is committed to improving the lives of driver-partners by giving them more opportunities for consistent, sustainable earnings and greater security. Having started its journey in India, Porter has now expanded its footprint internationally across two countries.
              </p>
            </div>

            {/* Right Team Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                <img 
                  src="/src/assets/images/about_team_office_1784376315809.jpg" 
                  alt="Porter Team Members in Office Collaborating"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Social Responsibility & Quality Section (Two Columns: Image & Text) */}
      <section className="py-12 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Award/Certificates Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                <img 
                  src="/src/assets/images/about_team_certs_1784376328106.jpg" 
                  alt="Porter Shifting Crew holding certificates"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right text box */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Porter is strongly committed towards improving the quality of life of our driver-partners. Over the last eleven years, alongside strengthening urban logistics, the company is committed to improving the lives of driver-partners by giving them more opportunities for consistent, sustainable earnings and greater security.
              </p>
              
              {/* Blue Action/Policy Links */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                <a 
                  href="#governance" 
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Governance
                </a>
                <a 
                  href="#vulnerability-policy" 
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Vulnerability Disclosure Policy
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Statistics Banner Section (Dark Theme with Orange Highlights) */}
      <section className="bg-[#0b1329] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-slate-100 max-w-2xl mx-auto">
            India's Leading Goods Transport Agency | <span className="text-orange-500">Revolutionizing Goods Transport</span>
          </h2>
          
          {/* 3 Columns Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Stat Item 1 */}
            <div className="space-y-1 py-4 border-b sm:border-b-0 sm:border-r border-slate-800/80 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                2014
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Year Founded
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="space-y-1 py-4 border-b sm:border-b-0 sm:border-r border-slate-800/80 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                3.6+ Crore
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Customers
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="space-y-1 py-4 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                2600+
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Strong Team
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Wide Tech Development Team Banner Image */}
      <section className="w-full">
        <div className="relative aspect-[16/6] md:aspect-[21/7] overflow-hidden">
          <img 
            src="/src/assets/images/about_tech_team_1784376341266.jpg" 
            alt="Porter Tech Engineers Collaborating on laptops"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1329]/40 via-transparent to-white/5 pointer-events-none" />
        </div>
      </section>

      {/* 6. Join Porter / Call to Action Section */}
      <section className="bg-[#0b1329] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            JOIN PORTER
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            At Porter, we create impactful journeys. Join us
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => {
                // Navigate to hiring / contact form or open a lead/booking
                onOpenBooking();
              }}
              className="bg-[#1d4ed8] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all"
            >
              SEE OPEN POSITIONS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
