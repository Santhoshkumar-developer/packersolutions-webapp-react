/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '../types';
import logoImg from '../assets/images/packersolution_logo.jpg';

interface FooterProps {
  services: ServiceItem[];
  onNavigate: (page: string, serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ services, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      {/* Top Banner - trust stats */}
      <div className="border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/10">
              <LucideIcon name="Shield" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">100% Fully Insured Shifting</h5>
              <p className="text-xs text-slate-400 leading-normal">Comprehensive road safety warranty coverage on goods.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/10">
              <LucideIcon name="Award" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Government Registered</h5>
              <p className="text-xs text-slate-400 leading-normal">Full GST compliance, IBA Approved carrier services.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/10">
              <LucideIcon name="Users" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">50,000+ Happy Moves</h5>
              <p className="text-xs text-slate-400 leading-normal">Top rated across major cities and consumer platforms.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/10">
              <LucideIcon name="Clock" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Instant Spot Quotes</h5>
              <p className="text-xs text-slate-400 leading-normal">Dynamic digital pricing with zero agent negotiation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: App Download QR & Description */}
        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Download our app now!
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              Scan the QR Code to download
            </p>
            <div className="pt-2 flex items-center gap-3.5">
              <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-white/20 w-fit flex flex-col items-center group transition-transform hover:scale-105">
                {/* Clean, high contrast vector QR Code */}
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 text-slate-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Download App QR Code"
                >
                  {/* Top-Left Position Detection Pattern */}
                  <rect x="10" y="10" width="24" height="24" rx="3" fill="#001261" />
                  <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="18" y="18" width="8" height="8" rx="1" fill="#ea580c" />

                  {/* Top-Right Position Detection Pattern */}
                  <rect x="66" y="10" width="24" height="24" rx="3" fill="#001261" />
                  <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="74" y="18" width="8" height="8" rx="1" fill="#ea580c" />

                  {/* Bottom-Left Position Detection Pattern */}
                  <rect x="10" y="66" width="24" height="24" rx="3" fill="#001261" />
                  <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="18" y="74" width="8" height="8" rx="1" fill="#ea580c" />

                  {/* Timing Patterns & Alignment dots */}
                  <rect x="38" y="12" width="4" height="4" fill="#001261" />
                  <rect x="46" y="12" width="4" height="4" fill="#001261" />
                  <rect x="54" y="12" width="4" height="4" fill="#001261" />
                  <rect x="12" y="38" width="4" height="4" fill="#001261" />
                  <rect x="12" y="46" width="4" height="4" fill="#001261" />
                  <rect x="12" y="54" width="4" height="4" fill="#001261" />

                  {/* Data Matrix Modules */}
                  <rect x="38" y="24" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="48" y="24" width="5" height="5" rx="1" fill="#ea580c" />
                  <rect x="58" y="24" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="38" y="34" width="5" height="5" rx="1" fill="#ea580c" />
                  <rect x="46" y="34" width="8" height="5" rx="1" fill="#001261" />
                  <rect x="58" y="34" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="68" y="38" width="6" height="6" rx="1" fill="#001261" />
                  <rect x="78" y="38" width="6" height="6" rx="1" fill="#ea580c" />
                  <rect x="88" y="38" width="4" height="6" rx="1" fill="#1e293b" />
                  
                  {/* Center Modules */}
                  <rect x="38" y="44" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="46" y="44" width="8" height="8" rx="2" fill="#001261" />
                  <rect x="58" y="44" width="5" height="5" rx="1" fill="#ea580c" />
                  <rect x="68" y="48" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="76" y="48" width="6" height="5" rx="1" fill="#001261" />
                  <rect x="86" y="48" width="6" height="5" rx="1" fill="#ea580c" />

                  {/* Bottom Area Data */}
                  <rect x="38" y="58" width="6" height="6" rx="1" fill="#001261" />
                  <rect x="48" y="58" width="6" height="6" rx="1" fill="#ea580c" />
                  <rect x="58" y="58" width="6" height="6" rx="1" fill="#1e293b" />
                  <rect x="68" y="58" width="6" height="6" rx="1" fill="#001261" />
                  <rect x="78" y="58" width="6" height="6" rx="1" fill="#ea580c" />
                  <rect x="38" y="68" width="5" height="5" rx="1" fill="#1e293b" />
                  <rect x="46" y="68" width="8" height="5" rx="1" fill="#001261" />
                  <rect x="58" y="68" width="5" height="5" rx="1" fill="#ea580c" />
                  <rect x="68" y="68" width="8" height="8" rx="2" fill="#001261" />
                  <rect x="80" y="68" width="6" height="6" rx="1" fill="#1e293b" />
                  <rect x="38" y="78" width="6" height="6" rx="1" fill="#ea580c" />
                  <rect x="48" y="78" width="6" height="6" rx="1" fill="#001261" />
                  <rect x="58" y="78" width="6" height="6" rx="1" fill="#1e293b" />
                  <rect x="80" y="78" width="6" height="6" rx="1" fill="#ea580c" />
                </svg>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Android &amp; iOS
                </div>
                <div className="text-[10px] text-slate-400 leading-snug">
                  Fast booking &amp; live move tracker
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Packersolution is a premium logistics and relocation company specializing in end-to-end safe moving solutions across India. Inspired by modern smart protection, we bring absolute transparency and premium materials to your doorstep.
          </p>
          <div className="pt-2">
            <h6 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-3">Compliance & Accreditations</h6>
            <div className="flex gap-2 text-[10px] text-slate-400 font-semibold font-mono">
              <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700/50">IBA APPROVED</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700/50">GSTIN REGISTERED</span>
            </div>
          </div>
        </div>

        {/* Column 2: 7 Shifting Services (Crucial for SEO linking) */}
        <div>
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-widest mb-6">Our Shifting Services</h5>
          <ul className="space-y-3.5 text-xs text-slate-400">
            {services.map((svc) => (
              <li key={svc.id}>
                <button
                  id={`footer-link-${svc.id}`}
                  onClick={() => onNavigate('service', svc.id)}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  {svc.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <h5 className="font-bold text-slate-100 text-xs uppercase tracking-widest mb-4">Explore &amp; Company Menus</h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-slate-100"
                >
                  <span className="text-orange-500">›</span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-slate-100"
                >
                  <span className="text-orange-500">›</span>
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-slate-100"
                >
                  <span className="text-orange-500">›</span>
                  Our Shifting Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-slate-100"
                >
                  <span className="text-orange-500">›</span>
                  How It Works Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer font-semibold text-slate-100"
                >
                  <span className="text-orange-500">›</span>
                  Contact Support Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service', 'office-relocation')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  For Business (Enterprise Solutions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const modal = document.getElementById('delivery-partner-modal');
                    if (modal) modal.style.display = 'flex';
                  }}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  Driver &amp; Vehicle Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  Moving Tips &amp; Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('happy-customers')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('home-faqs-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="hover:text-orange-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-orange-500">›</span>
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Contact coordinates */}
        <div className="space-y-5">
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-widest mb-6">Headquarters</h5>
          
          <div className="space-y-4 text-xs text-slate-400">
            <div className="flex gap-3 items-start leading-relaxed">
              <LucideIcon name="MapPin" className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                45 Corporate Logistics Boulevard, <br />
                Suite 204, Sector 62, <br />
                Delhi NCR, India - 110001
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <LucideIcon name="Phone" className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors font-mono">
                +91 98765 43210
              </a>
            </div>

            <div className="flex gap-3 items-center">
              <LucideIcon name="Mail" className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="mailto:support@packersolution.com" className="hover:text-orange-400 transition-colors font-mono">
                support@packersolution.com
              </a>
            </div>

            <div className="flex gap-3 items-center">
              <LucideIcon name="Clock" className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Available 24 hours / 7 Days a week</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter / Connect */}
        <div className="space-y-5">
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-widest mb-6">Stay Protected</h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive corporate discounts, moving checklists, and seasonal packing tips.
          </p>
          
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                id="footer-email-input"
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
              />
              <button
                id="btn-footer-subscribe"
                type="submit"
                className="absolute right-1.5 top-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-1.5 transition-colors"
                title="Subscribe"
              >
                <LucideIcon name="Send" className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <span id="footer-subscribed-toast" className="text-[10px] text-teal-400 font-semibold block animate-pulse">
                Successfully subscribed! Check your inbox.
              </span>
            )}
          </form>

          {/* Social icons */}
          <div className="pt-2">
            <h6 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-3">Connect With Us</h6>
            <div className="flex gap-3.5 text-xs">
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors font-bold">Facebook</a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors font-bold">Twitter</a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors font-bold">Instagram</a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors font-bold">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom credits */}
      <div className="border-t border-slate-800 py-6 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} Packersolution Logistics Private Limited. All Rights Reserved.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-end">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">Home</button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">About Us</button>
            <span>•</span>
            <button onClick={() => onNavigate('locations')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">Locations</button>
            <span>•</span>
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">How It Works</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">Contact Us</button>
            <span>•</span>
            <button onClick={() => onNavigate('service', 'office-relocation')} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">For Business</button>
            <span>•</span>
            <button onClick={() => {
              const modal = document.getElementById('delivery-partner-modal');
              if (modal) modal.style.display = 'flex';
            }} className="hover:text-slate-400 transition-colors cursor-pointer text-left font-semibold">Driver &amp; Vehicle Partners</button>
            <span>•</span>
            <button onClick={() => onNavigate('blog')} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Moving Tips (Blog)</button>
            <span>•</span>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('happy-customers')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Reviews</button>
            <span>•</span>
            <button onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('home-faqs-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }} className="hover:text-slate-400 transition-colors cursor-pointer text-left">FAQs</button>
            <span>•</span>
            <button onClick={() => onNavigate('privacy-policy')} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('terms-conditions')} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Terms &amp; Conditions</button>
            <span>•</span>
            <button onClick={() => onNavigate('shipment-policy')} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Shipment Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('cancellation-refund')} className="hover:text-slate-400 transition-colors cursor-pointer text-left">Cancellation/Refund Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
