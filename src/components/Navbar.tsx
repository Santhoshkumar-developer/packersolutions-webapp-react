/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '../types';
import logoImg from '../assets/images/packersolution_logo.jpg';
import { useAddress } from '../context/AddressContext';
import { User, MapPin, LogOut, ChevronDown, HelpCircle, LogIn } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  activeServiceId?: string;
  services: ServiceItem[];
  onNavigate: (page: string, serviceId?: string) => void;
  selectedCity?: string;
  onOpenCityModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenPartnerModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeServiceId,
  services,
  onNavigate,
  selectedCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenPartnerModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  
  const { isLoggedIn, currentUser, logoutUser, openSavedAddressesModal, savedAddresses } = useAddress();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Close account menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              className="hidden items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-amber-300 border border-orange-500/30 text-[11px] font-bold cursor-pointer transition-colors"
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

        {/* Action button */}
        <div className="hidden lg:flex items-center gap-3">
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

          {/* User Account / Login Button */}
          {isLoggedIn ? (
            <div className="relative" ref={accountMenuRef}>
              <button
                id="btn-nav-account"
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-xs px-3.5 h-11 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[11px] font-black">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left leading-tight hidden xl:block">
                  <div className="text-xs font-black truncate max-w-[90px]">
                    {currentUser?.name || 'My Account'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {savedAddresses.length} saved addr
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-black text-slate-900 dark:text-white">
                      {currentUser?.name || 'Valued User'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      +91 {currentUser?.mobile}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      id="btn-nav-saved-addresses"
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        openSavedAddressesModal();
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <span>Saved Addresses</span>
                      </div>
                      <span className="text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                        {savedAddresses.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="btn-nav-saved-addresses-guest"
                type="button"
                onClick={openSavedAddressesModal}
                className="relative bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs w-11 h-11 rounded-xl transition-all flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700/80 shrink-0"
                title="Saved Addresses"
                aria-label="Saved Addresses"
              >
                <MapPin className="w-4 h-4 text-orange-500" />
                {savedAddresses.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-[9px] bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-black shadow-sm">
                    {savedAddresses.length}
                  </span>
                )}
              </button>

              <button
                id="btn-nav-faqs"
                type="button"
                onClick={() => onNavigate('faq')}
                className={`hidden md:flex font-bold text-xs px-3.5 h-11 rounded-xl transition-all items-center gap-1.5 cursor-pointer border shrink-0 ${
                  currentPage === 'faq'
                    ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/60'
                    : 'bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500'
                }`}
                title="Frequently Asked Questions"
              >
                <HelpCircle className="w-4 h-4 text-orange-500" />
                <span>FAQs</span>
              </button>

              <button
                id="btn-nav-help-center"
                type="button"
                onClick={() => onNavigate('contact')}
                className="hidden sm:flex bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs px-4 h-11 rounded-xl transition-all items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md border border-red-700 shrink-0"
                title="Help Center & 24x7 Support"
              >
                <HelpCircle className="w-4 h-4 text-white" />
                <span>Help Center</span>
              </button>
              
              <button
                id="btn-nav-login"
                onClick={onOpenLoginModal}
                className="bg-[#0321a1] hover:bg-[#001980] active:bg-[#001261] text-white font-medium text-xs px-4 h-11 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md border border-[#021b85] shrink-0"
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>Login</span>
              </button>
            </div>
          )}
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
                onNavigate('faq');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                currentPage === 'faq'
                  ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              Frequently Asked Questions (FAQs)
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

            {/* Saved Addresses in Mobile Navigation */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSavedAddressesModal();
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Saved Addresses</span>
              </span>
              <span className="text-xs bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 font-extrabold px-2 py-0.5 rounded-full">
                {savedAddresses.length}
              </span>
            </button>
          </div>

          {/* User Account / Login in Mobile Navigation */}
          <div className="pt-2">
            {isLoggedIn ? (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {currentUser?.name || 'My Account'}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      +91 {currentUser?.mobile}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutUser();
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLoginModal) onOpenLoginModal();
                }}
                className="w-full h-11 rounded-xl bg-[#0321a1] hover:bg-[#001980] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-[#021b85]"
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>Login</span>
              </button>
            )}
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
                onNavigate('service', 'packers-and-movers');
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
