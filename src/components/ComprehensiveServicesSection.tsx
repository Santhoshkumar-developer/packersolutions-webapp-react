import React from 'react';
import relocationCompletedImg from '../assets/images/relocation_completed_app_1789400599387.jpg';

export const ComprehensiveServicesSection: React.FC = () => {
  const column1 = [
    'Residential Moving',
    'Corporate Relocations',
    'Local Moving',
    'Long-Distance Moves',
    'Vehicle Transportation',
  ];

  const column2 = [
    'Expert Packing Services',
    'Fragile Item Handling',
    'Secure Loading',
    'Safe Transportation',
    'Unpacking & Setup',
  ];

  const column3 = [
    'Climate-Controlled Storage',
    'Furniture Disassembly/Assembly',
    'Insurance Coverage',
    'Custom Moving Plans',
    'Dedicated Move Coordinator',
  ];

  return (
    <section
      id="comprehensive-services-section"
      style={{ paddingTop: '35px', paddingBottom: '35px' }}
      className="py-[35px] bg-white dark:bg-slate-950 font-roboto border-b border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Headline & Lead Narrative */}
        <div className="mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 block font-sans">
            SPECIAL OFFERS & SAVINGS
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans mb-6">
            Stress-Free Moving Solutions - Local &amp; Nationwide
          </h2>
       

          <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed max-w-6xl">
            <p>
              With Packersolutions Relocations, your move is in expert hands. We understand that moving can be stressful,
              which is why we are dedicated to making your transition as seamless and effortless as possible. Whether
              you&apos;re moving your home or your office, locally or long-distance across India, our professional team handles
              every detail with care and precision.
            </p>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Below, you will find a comprehensive list of our specialized moving services, tailored to your specific needs:
            </p>
          </div>
        </div>

        {/* Two Columns: Left = Illustration graphic with app, Right = Comprehensive Services List & Rate info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Illustration with phone and truck */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-slate-50/60 dark:bg-slate-900/60 p-2 sm:p-4 border border-slate-100 dark:border-slate-800/60 transition-transform duration-300 hover:scale-[1.01]">
              <img
                src={relocationCompletedImg}
                alt="Packersolutions Relocation Completed App and Moving Fleet"
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Comprehensive Services List & Rates */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 sm:mb-5 font-roboto">
              Comprehensive Moving Services:
            </h3>

            {/* 3-column bulleted grid matching reference design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2.5 mb-6 sm:mb-8">
              {/* Column 1 */}
              <ul className="space-y-2.5">
                {column1.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Column 2 */}
              <ul className="space-y-2.5">
                {column2.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Column 3 */}
              <ul className="space-y-2.5">
                {column3.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rates Description paragraph matching reference design */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-200/70 dark:border-slate-800/70">
              Our moving rates depend on factors such as the volume of goods, distance of the move, required level of
              packing, and access to the premises. We provide transparent pricing and work with you to find the best, most
              cost-effective moving package. Travelling by our professional moving service is the most reliable and
              stress-free way to relocate compared to self-moving.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
