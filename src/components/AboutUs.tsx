/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Users, Award, Shield, FileText, CheckCircle, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';

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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-teal-400 font-semibold">Packer Solutions</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-2xl mx-auto mt-2 leading-normal">
            India's trusted Packers and Movers, Transportation, and Logistics Service Providers delivering reliable relocation and freight solutions since 2018.
          </p>
        </div>
      </section>
 
      {/* 2. Main Narrative Section (Two Columns: Text & Image) */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Narrative paragraphs */}
            <div className="lg:col-span-7 space-y-4 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
              <p>
                Packer Solutions is one of India's trusted Packers and Movers, Transportation, and Logistics Service Providers, delivering reliable relocation and freight solutions since 2018. Headquartered in Coimbatore, we specialize in house shifting, office relocation, vehicle transportation, warehousing, packing and unpacking, loading and unloading, and commercial logistics services across India. Our mission is to provide safe, transparent, and technology-driven moving solutions for individuals, families, and businesses.
              </p>
              <p>
                With an extensive transportation network, Packer Solutions offers both Inter-City and Intra-City relocation services, ensuring seamless movement of household goods, office equipment, industrial machinery, commercial cargo, and high-value consignments. Our modern fleet includes vehicles ranging from 6 feet to 24 feet, capable of handling shipments from 1 kg to 10,000 kg, allowing us to efficiently manage everything from small parcel deliveries to full truckload (FTL) and large-scale commercial transportation.
              </p>
              <p>
                As a growing logistics company, we have built a strong network of verified transport vendors, MSME partners, and regional logistics associates across multiple locations in India. This enables us to provide dependable transportation services, faster transit times, and nationwide coverage while maintaining consistent service quality. Our multi-location logistics network supports residential relocation, corporate distribution, industrial transportation, warehouse movements, and last-mile delivery solutions.
              </p>
            </div>

            {/* Right Team Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                <img 
                  src="/src/assets/images/about_team_office_1784376315809.jpg" 
                  alt="Packer Solutions Team Collaborating"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Safety, Standard Operating Procedures & Flexible Transport (Two Columns: Image & Text) */}
      <section className="py-12 bg-slate-50/50 dark:bg-slate-900/40 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Award/Certificates Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                <img 
                  src="/src/assets/images/about_team_certs_1784376328106.jpg" 
                  alt="Packer Solutions Certified Relocation Crew"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right text box */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                At Packer Solutions, safety is at the heart of every shipment. Our experienced team follows standardized operating procedures, including Free Digital Surveys, accurate CFT (Cubic Feet) volume calculation, professional packing, detailed packing lists, secure loading, real-time shipment coordination, and systematic delivery verification. Every consignment is carefully planned and monitored to ensure safe handling from pickup to final delivery.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                We provide flexible transportation options, including Dedicated Vehicle Services, Shared Load (Part Load) Transport, Full Truck Load (FTL), and Express Priority Deliveries, allowing customers to choose the most suitable solution based on their budget and delivery schedule. Whether you require local shifting within a city or long-distance domestic relocation, our team delivers efficient and cost-effective logistics solutions.
              </p>
              
              {/* Blue Action/Policy Links */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                <a 
                  href="#transit-insurance" 
                  onClick={(e) => { e.preventDefault(); }}
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold text-xs underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Transit Insurance Protection
                </a>
                <a 
                  href="#transparent-pricing" 
                  onClick={(e) => { e.preventDefault(); }}
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold text-xs underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Transparent Pricing Policy
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Comprehensive Service Portfolio & Trust Section */}
      <section className="py-14 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
              Full Spectrum Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Our Comprehensive Service Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Tailored moving, freight, and warehousing solutions designed to support every residential, corporate, and industrial requirement:
            </p>
          </div>

          {/* Grid of 12 Services */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'House Shifting Services',
              'Office Relocation Services',
              'Packers and Movers',
              'Local & Domestic Moving',
              'Inter-City & Intra-City Transportation',
              'Vehicle Transport (Car & Bike)',
              'Packing Service',
              'Loading & Unloading Services',
              'Warehousing & Storage Solutions',
              'Industrial & Commercial Logistics',
              'Corporate Relocation',
              'Distribution & Freight Management'
            ].map((serviceName, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{serviceName}</span>
              </div>
            ))}
          </div>

          {/* Trust & Insurance Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Transit Insurance &amp; Transparent Quotations
              </h4>
              <p>
                For additional protection, we also offer Transit Insurance to safeguard valuable household goods, office assets, vehicles, and commercial consignments against unforeseen events during transportation. Our transparent pricing policy ensures customers receive clear quotations with no hidden charges, giving them complete confidence throughout the relocation process.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                Customer Trust &amp; Service Commitment
              </h4>
              <p>
                Over the years, Packer Solutions has earned the trust of homeowners, businesses, corporate organizations, and industrial clients by delivering reliable, professional, and customer-focused logistics services. Our commitment to quality, timely delivery, advanced logistics planning, and personalized customer support has made us a preferred choice for relocation and transportation across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Statistics Banner Section (Dark Theme with Orange Highlights) */}
      <section className="bg-[#0b1329] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-slate-100 max-w-3xl mx-auto">
            India's Trusted Packers &amp; Movers and Logistics Network | <span className="text-orange-500">Coimbatore to Pan-India</span>
          </h2>
          
          {/* 3 Columns Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Stat Item 1 */}
            <div className="space-y-1 py-4 border-b sm:border-b-0 sm:border-r border-slate-800/80 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                2018
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Delivering Since
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="space-y-1 py-4 border-b sm:border-b-0 sm:border-r border-slate-800/80 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                6ft – 24ft
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Fleet (1 kg to 10,000 kg)
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="space-y-1 py-4 last:border-0">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                Pan-India
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Nationwide Coverage
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Wide Tech Development Team Banner Image */}
      <section className="w-full">
        <div className="relative aspect-[16/6] md:aspect-[21/7] overflow-hidden">
          <img 
            src="/src/assets/images/about_tech_team_1784376341266.jpg" 
            alt="Packer Solutions Operations and Logistics Planning Team"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1329]/40 via-transparent to-white/5 pointer-events-none" />
        </div>
      </section>

      {/* 7. Careers & Job Openings Section */}
      <section className="bg-[#0b1329] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Work With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase">
            Careers &amp; Job Openings
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            At Packer Solutions, we are constantly expanding our nationwide logistics network and looking for passionate talent. Join our growing team across operations, customer support, logistics technology, fleet management, and regional coordination.
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => {
                onOpenBooking();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>EXPLORE CAREERS &amp; JOB OPENINGS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

