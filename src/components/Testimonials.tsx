/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS_DATA } from '../data/services';
import { LucideIcon } from './LucideIcon';

interface TestimonialsProps {
  isLoading?: boolean;
  plainGrid?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ isLoading, plainGrid }) => {
  if (plainGrid) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm relative animate-pulse flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                    <div className="h-2.5 bg-slate-100 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 bg-slate-100 rounded w-full"></div>
                  <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-3.5 bg-slate-100 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          TESTIMONIALS_DATA.slice(0, 3).map((t) => (
            <div 
              key={t.id} 
              id={`review-card-plain-${t.id}`}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all text-left"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-700 font-bold rounded-full flex items-center justify-center text-sm shadow-inner shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{t.name}</h4>
                    <div className="flex text-emerald-500 text-[10px] mt-0.5">
                      {[...Array(t.rating)].map((_, idx) => "★").join("")}
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-slate-900 text-sm mb-2">{t.service}</h5>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed line-clamp-6">
                  "{t.comment}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 text-xs font-bold tracking-widest uppercase bg-orange-100 px-3 py-1 rounded-full animate-pulse">
            {isLoading ? "Fetching Reviews..." : "Digit Customer Reviews"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3">
            What 50,000+ Relocated Families Say About Our Shifting Care
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Read verified feedback from individuals, families, and organizations who relocated with Packersolution. We maintain a 4.9/5 star satisfaction score across platforms.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md relative animate-pulse flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  {/* Stars & Quote Icon skeleton */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, sIdx) => (
                        <div key={sIdx} className="w-4 h-4 rounded-full bg-slate-200" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-slate-100" />
                  </div>

                  {/* Feedback description skeleton */}
                  <div className="space-y-2.5 mb-6">
                    <div className="h-3.5 bg-slate-100 rounded w-full"></div>
                    <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-3.5 bg-slate-100 rounded w-2/3"></div>
                  </div>
                </div>

                {/* Profile card skeleton */}
                <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-200" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-slate-200 rounded w-24"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-32"></div>
                    </div>
                  </div>

                  <div className="h-6 bg-slate-100 rounded-full w-20"></div>
                </div>
              </div>
            ))
          ) : (
            TESTIMONIALS_DATA.map((t) => (
              <div 
                key={t.id} 
                id={`review-card-${t.id}`}
                className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Stars & Quote Icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <LucideIcon key={idx} name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-xl select-none">
                    “
                  </div>
                </div>

                {/* Feedback description */}
                <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 font-medium italic">
                  "{t.comment}"
                </blockquote>

                {/* Profile card */}
                <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">{t.role} • <span className="text-slate-500">{t.location}</span></p>
                    </div>
                  </div>

                  {/* Service tag */}
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-full max-w-[150px] truncate">
                    {t.service}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Aggregated Score Bar */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-950 shrink-0">
              <LucideIcon name="Shield" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Safe & Insured Transit Guarantee</h3>
              <p className="text-xs text-slate-400 leading-normal">Every single booking is backed by comprehensive transit insurance policies.</p>
            </div>
          </div>
          <div className="flex items-center gap-8 divide-x divide-slate-700">
            <div className="text-center pl-0">
              <span className="text-3xl font-bold text-white font-mono block">4.9/5</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Google Rating</span>
            </div>
            <div className="text-center pl-8">
              <span className="text-3xl font-bold text-white font-mono block">99.4%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Damage-Free Rate</span>
            </div>
            <div className="text-center pl-8">
              <span className="text-3xl font-bold text-white font-mono block">24Hrs</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Claim Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
