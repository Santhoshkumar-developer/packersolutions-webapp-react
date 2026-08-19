/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '../types';
import logoImg from '../assets/images/packersolution_logo.jpg';

interface NavbarProps {
  currentPage: string;
  activeServiceId?: string;
  services: ServiceItem[];
  onNavigate: (page: string, serviceId?: string) => void;
  selectedCity?: string;
  onOpenCityModal?: () => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeServiceId,
  services,
  onNavigate,
  selectedCity,
  onOpenCityModal,
  onOpenLoginModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleServiceClick = (serviceId: string) => {
    onNavigate('service', serviceId);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070d19]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      {/* Top micro-bar for direct trust indicators */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 md:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
          <span className="flex items-center gap-1">
            <LucideIcon name="Shield" className="w-3.5 h-3.5 text-teal-400" />
            GoDigit Inspired Shifting Coverage
          </span>
          <span className="hidden md:flex items-center gap-1">
            <LucideIcon name="Clock" className="w-3.5 h-3.5 text-orange-400" />
            24/7 Shifting Support
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-medium">
          {selectedCity && onOpenCityModal && (
            <button
              onClick={onOpenCityModal}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-amber-300 border border-orange-500/30 text-[11px] font-bold cursor-pointer transition-colors"
              title="Click to select or detect your location"
            >
              <LucideIcon name="MapPin" className="w-3 h-3 text-orange-400" />
              <span>{selectedCity}</span>
              <span className="text-[9px] text-amber-400">▼</span>
            </button>
          )}
          <a href="tel:+919876543210" className="hover:text-teal-400 flex items-center gap-1 transition-colors">
            <LucideIcon name="Phone" className="w-3.5 h-3.5 text-teal-400" />
            +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Brand Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <img 
            src={logoImg} 
            alt="Packer Solutions Logo" 
            className="h-8 sm:h-9 md:h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        
        </div>

        {/* Desktop Links - styled exactly as requested with Corporate and Delivery Partner links */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            id="nav-link-home"
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-brand-blue dark:text-orange-400 font-bold'
                : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
            }`}
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              id="nav-dropdown-services-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                currentPage === 'service'
                  ? 'text-brand-blue dark:text-orange-400 font-bold'
                  : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
              }`}
            >
              Services
              <span className={`transform transition-transform duration-200 block text-xs ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {dropdownOpen && (
              <div 
                id="nav-dropdown-menu"
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-[#111a33] border border-slate-100 dark:border-slate-800 shadow-xl rounded-2xl p-4 grid grid-cols-1 gap-1"
              >
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  Our Logistics Portfolios
                </div>
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    id={`dropdown-item-${svc.id}`}
                    onClick={() => handleServiceClick(svc.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                      activeServiceId === svc.id && currentPage === 'service'
                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/40 dark:hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      activeServiceId === svc.id && currentPage === 'service'
                        ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      <LucideIcon name={svc.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">{svc.name}</span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate max-w-[200px]">
                        {svc.tagline}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>     

          <button
            id="nav-link-locations"
            onClick={() => onNavigate('locations')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'locations'
                ? 'text-brand-orange dark:text-orange-400 font-bold'
                : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
            }`}
          >
            Locations
          </button>

          <button
            id="nav-link-how-it-works"
            onClick={() => onNavigate('how-it-works')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'how-it-works'
                ? 'text-brand-orange dark:text-orange-400 font-bold'
                : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
            }`}
          >
            How It Works
          </button>

          <button
            id="nav-link-about"
            onClick={() => onNavigate('about')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'about'
                ? 'text-brand-orange dark:text-orange-400 font-bold'
                : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
            }`}
          >
            About Us
          </button>

          <button
            id="nav-link-contact-us"
            onClick={() => onNavigate('contact')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'contact'
                ? 'text-brand-orange dark:text-orange-400 font-bold'
                : 'text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-orange-400'
            }`}
          >
            Contact Us
          </button>
        </div>

        {/* Action button */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Global Dark Mode Toggle */}
          <button
            id="btn-dark-mode-toggle"
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex items-center justify-center h-11 w-11"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <LucideIcon name="Sun" className="w-5 h-5 text-amber-400" />
            ) : (
              <LucideIcon name="Moon" className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>

          <a 
            id="btn-nav-whatsapp"
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-all hover:scale-105 shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.524 5.845L0 24l6.316-1.48C7.973 23.472 9.923 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.626-.502-5.143-1.378l-.368-.211-3.753.88.905-3.619-.232-.38C2.477 15.727 1.96 13.921 1.96 12c0-5.535 4.505-10.04 10.04-10.04 5.535 0 10.04 4.505 10.04 10.04C22.04 17.535 17.535 22 12 22z"/>
            </svg>
          </a>
          <button
            id="btn-nav-login"
            onClick={onOpenLoginModal}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-xs px-4 h-11 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
          >
            <LucideIcon name="Smartphone" className="w-4 h-4 text-orange-500" />
            <span>Login / OTP</span>
          </button>

          <button
            id="btn-nav-calc-price"
            onClick={onOpenLoginModal}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs px-5 h-11 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Calculate Shifting Price</span>
            <LucideIcon name="ArrowRight" className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Dark Mode Toggle */}
          <button
            id="btn-mobile-dark-mode-toggle"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-slate-100 dark:border-slate-800/80 flex items-center justify-center w-10 h-10"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <LucideIcon name="Sun" className="w-5 h-5 text-amber-400" />
            ) : (
              <LucideIcon name="Moon" className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>

          {/* Mobile WhatsApp Button */}
          <a
            id="btn-mobile-nav-whatsapp"
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform active:scale-95 shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.524 5.845L0 24l6.316-1.48C7.973 23.472 9.923 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.626-.502-5.143-1.378l-.368-.211-3.753.88.905-3.619-.232-.38C2.477 15.727 1.96 13.921 1.96 12c0-5.535 4.505-10.04 10.04-10.04 5.535 0 10.04 4.505 10.04 10.04C22.04 17.535 17.535 22 12 22z"/>
            </svg>
          </a>
          
          <button
            id="btn-toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 dark:text-slate-300 hover:text-orange-500 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl transition-all w-10 h-10 flex items-center justify-center"
          >
            <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#070d19] p-5 space-y-4 shadow-inner">
          <div className="space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'home'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>

            <div className="border-t border-slate-100 dark:border-slate-800/80 my-2 pt-2">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2">
                Services
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => handleServiceClick(svc.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      activeServiceId === svc.id && currentPage === 'service'
                        ? 'text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-500/10 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <LucideIcon name={svc.iconName} className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    {svc.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('addons');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                currentPage === 'addons'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-extrabold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Addon Services</span>
              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                UrbanClap
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('locations');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'locations'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              Locations
            </button>

            <button
              onClick={() => {
                onNavigate('how-it-works');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'how-it-works'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'about'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'contact'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href="tel:+919876543210"
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl h-12 flex items-center justify-center gap-2 font-bold text-sm transition-colors"
            >
              <LucideIcon name="Phone" className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              +91 98765 43210
            </a>
            <button
              onClick={() => {
                onNavigate('service', 'household-shifting');
                setMobileMenuOpen(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 font-bold text-sm transition-all"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
