import React from 'react';
import benefitsIllustrationImg from '../assets/images/stress_free_benefits_1789401374741.jpg';

export const StressFreeBenefitsSection: React.FC = () => {
  const benefits = [
    'Avoid the heavy lifting and risk of injury from self-moving.',
    'No more last-minute panic; get expert help at every step.',
    'Choose from comprehensive service packages, including packing and unpacking.',
    'Move both your home and office items with specialized care.',
    'Track your shipment\'s progress in real-time with our online portal.',
    'Get accurate moving cost estimates, clear schedules, and transparent service details online.',
    'Access partner offers for related services like storage and insurance.',
    'Free rescheduling of your move date if your plans change.',
    '24/7 dedicated move coordinator support.',
    'Each and every item handled with the utmost respect and secure, professional packing.',
  ];

  return (
    <section
      id="why-choose-stress-free-services-section"
      style={{ paddingTop: '35px', paddingBottom: '35px' }}
      className="py-[35px] bg-white dark:bg-slate-950 font-roboto border-b border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
         <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 block font-sans">
            SPECIAL OFFERS & SAVINGS
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans mb-6">
            Why Choose Our Stress-Free Moving Services?
          </h2>

        {/* Narrative Paragraph */}
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-6xl mb-5 sm:mb-6">
          In this day and age, moving home or office doesn&apos;t have to be a stressful experience. Traditional methods
          of managing a move are time-consuming and often lead to damage. Our professional, tech-enabled moving solutions
          are designed to be seamless, safe, and hassle-free, giving you complete peace of mind. We tick off all the boxes
          with user-friendly online booking, real-time tracking, and dedicated support. Book your move with us and
          experience the new standard of relocation.
        </p>

        {/* Two-Column Area: Left = Lead text & Bulleted Benefits, Right = Visual Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Benefits list */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4">
              Here is a list of all the benefits of choosing our expert moving services:
            </h3>

            <ul className="space-y-2.5 sm:space-y-3">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${index < 9 ? 'mb-[5px]' : ''}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 shrink-0 mt-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Illustration Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-slate-50/60 dark:bg-slate-900/60 p-2 sm:p-4 border border-slate-100 dark:border-slate-800/60 transition-transform duration-300 hover:scale-[1.01]">
              <img
                src={benefitsIllustrationImg}
                alt="Why Choose Our Stress-Free Moving Services - Customer with luggage and moving center"
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
