import React from 'react';
import movingIllustrationImg from '../assets/images/stress_free_moving_1789398689104.jpg';

export const StressFreeMovingSection: React.FC = () => {
  return (
    <section
      id="stress-free-moving-section"
      style={{ paddingTop: '35px', paddingBottom: '35px' }}
      className="py-[35px] bg-white dark:bg-slate-950 font-roboto border-b border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Narrative matching reference */}
          <div className="lg:col-span-7 flex flex-col justify-center">
           <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 block font-sans">
            SPECIAL OFFERS & SAVINGS
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans mb-6">
             Stress-Free Moving Solutions
          </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 font-roboto">
              <p className="text-[15px] leading-[20px] font-roboto">
                Welcome to our Premier Packing and Moving Services. We understand that moving can
                be overwhelming, which is why we are dedicated to making your transition as
                seamless and stress-free as possible. Whether you are moving your home or your
                office, locally or long-distance, our professional team is here to handle every detail with
                care and precision.
              </p>

              <p className="text-[15px] leading-[20px] font-roboto">
                From expert packing and secure loading to safe transportation and unpacking, we offer
                comprehensive services tailored to your specific needs. We ensure your belongings
                are handled with the utmost respect and arrive at your new location on
                time and in perfect condition.
              </p>

              <p className="text-[15px] leading-[20px] font-roboto">
                Browse our range of moving packages and use our advanced smart planner to create
                a custom moving checklist that ensures a reliable and efficient relocation, tailored to
                your schedule and requirements.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration Vector matching reference */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 p-2 sm:p-4 transition-transform duration-300 hover:scale-[1.01]">
              <img
                src={movingIllustrationImg}
                alt="Stress-Free Moving Solutions - Professional Packing and Relocation"
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
