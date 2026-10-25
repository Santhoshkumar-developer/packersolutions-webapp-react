/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '../types';
import logoImg from '../assets/images/packersolution_logo.jpg';
import { useAddress } from '../context/AddressContext';
import { User, MapPin, LogOut, ChevronDown, HelpCircle, LogIn, Sparkles, Luggage, Gift, Tag, Truck, FileText, Navigation, Coins, Headphones, ArrowRight, ChevronRight, BadgePercent, GraduationCap, Package, Wallet, ClipboardCheck, Award } from 'lucide-react';

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
  const [authPopoverOpen, setAuthPopoverOpen] = useState(false);
  const authPopoverRef = useRef<HTMLDivElement>(null);
  const authTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAuthMouseEnter = () => {
    if (authTimeoutRef.current) {
      clearTimeout(authTimeoutRef.current);
      authTimeoutRef.current = null;
    }
    setAuthPopoverOpen(true);
  };

  const handleAuthMouseLeave = () => {
    authTimeoutRef.current = setTimeout(() => {
      setAuthPopoverOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (authTimeoutRef.current) {
        clearTimeout(authTimeoutRef.current);
      }
    };
  }, []);
  
  const { isLoggedIn, currentUser, logoutUser, openSavedAddressesModal, savedAddresses } = useAddress();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Close popover on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authPopoverRef.current && !authPopoverRef.current.contains(event.target as Node)) {
        setAuthPopoverOpen(false);
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

          {/* Manage Booking Button (navigates to OrderTrackingPage) */}
          <button
            id="btn-nav-manage-booking"
            type="button"
            onClick={() => {
              onNavigate('order-tracking');
            }}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-colors text-left group cursor-pointer select-none ${
              currentPage === 'order-tracking'
                ? 'bg-blue-50 dark:bg-blue-950/60 ring-1 ring-blue-400/50'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
            title="Manage Booking & Live Fleet Tracking"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
              currentPage === 'order-tracking'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}>
              <Luggage className={`w-5 h-5 ${
                currentPage === 'order-tracking'
                  ? 'text-white'
                  : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
              }`} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Manage Booking
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                My Trips
              </span>
            </div>
          </button>

          {/* Login or Create Account Pill Button with Popover on Hover */}
          <div 
            className="relative" 
            ref={authPopoverRef}
            onMouseEnter={handleAuthMouseEnter}
            onMouseLeave={handleAuthMouseLeave}
          >
            <button
              id="btn-nav-auth-trigger"
              type="button"
              onClick={() => {
                // Click does not show the popover; only hover does
                if (!isLoggedIn && onOpenLoginModal) {
                  onOpenLoginModal();
                }
              }}
              className={`h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-lg border border-blue-500 bg-white dark:bg-slate-900 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs ${
                authPopoverOpen ? 'ring-2 ring-blue-400/40' : ''
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <User className="w-3 h-3 fill-current" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {isLoggedIn ? (currentUser?.name || 'My Account') : 'Login or Create Account'}
              </span>
            </button>

            {/* Popover Dropdown on Hover - House Shifting & Relocation Theme */}
            {authPopoverOpen && (
              <div className="absolute right-0 top-full pt-1.5 w-[260px] sm:w-[275px] z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 p-4 relative">
                  {/* Triangular caret pointing to the button */}
                  <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-slate-200/90 dark:border-slate-800 rotate-45 z-20" />

                  {/* Header: Hey, Packer! */}
                  <div className="text-left mb-3">
                    <div className="text-[15px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      {isLoggedIn && currentUser?.name ? `Hey ${currentUser.name}` : 'Hey, Packer! 👋'}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-snug">
                      Exclusive deals &amp; manage your moves
                    </p>
                  </div>

                  {/* Login/SignUp Button */}
                  {!isLoggedIn ? (
                    <button
                      id="btn-popover-login"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        if (onOpenLoginModal) onOpenLoginModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#1e74e6] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center cursor-pointer mb-3"
                    >
                      Login/SignUp
                    </button>
                  ) : (
                    <div className="mb-3 p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                      <div className="min-w-0 pr-1.5 text-left">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          +91 {currentUser?.mobile}
                        </div>
                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                          Active Account
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthPopoverOpen(false);
                          logoutUser();
                        }}
                        className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-100/60 dark:hover:bg-rose-950/60 transition-colors shrink-0 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  {/* List of Menu Items */}
                  <div className="flex flex-col text-left">
                    {/* 1. PackerPlus */}
                    <button
                      id="btn-popover-packerplus"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        onNavigate('home');
                        setTimeout(() => {
                          const el = document.getElementById('discount-offers');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Package className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          Packer<span className="text-orange-500 font-bold">Plus</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          Save more on every move
                        </div>
                      </div>
                    </button>

                    {/* 2. Offers */}
                    <button
                      id="btn-popover-offers"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        onNavigate('home');
                        setTimeout(() => {
                          const el = document.getElementById('discount-offers');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <BadgePercent className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          Offers
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          Exclusive shifting deals
                        </div>
                      </div>
                    </button>

                    {/* 3. Move Rewards */}
                    <button
                      id="btn-popover-move-rewards"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        if (isLoggedIn) {
                          openSavedAddressesModal();
                        } else if (onOpenLoginModal) {
                          onOpenLoginModal();
                        }
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <ClipboardCheck className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          Move Rewards
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          Get rewards on your bookings
                        </div>
                      </div>
                    </button>

                    {/* Subtle Divider Line */}
                    <div className="border-b border-slate-100 dark:border-slate-800 my-1" />

                    {/* 4. My Moves */}
                    <button
                      id="btn-popover-my-moves"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        onNavigate('order-tracking');
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Truck className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          My Moves &amp; Tracking
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          Manage bookings &amp; live GPS
                        </div>
                      </div>
                    </button>

                    {/* 5. PackerCredits */}
                    <button
                      id="btn-popover-packercredits"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        if (isLoggedIn) {
                          openSavedAddressesModal();
                        } else if (onOpenLoginModal) {
                          onOpenLoginModal();
                        }
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Coins className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          PackerCredits
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          Earn credits on every move
                        </div>
                      </div>
                    </button>

                    {/* Subtle Divider Line */}
                    <div className="border-b border-slate-100 dark:border-slate-800 my-1" />

                    {/* 6. Gift Vouchers */}
                    <button
                      id="btn-popover-gift-vouchers"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        onNavigate('home');
                        setTimeout(() => {
                          const el = document.getElementById('discount-offers');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Gift className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          Gift Vouchers
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          View and redeem your vouchers
                        </div>
                      </div>
                    </button>

                    {/* 7. Help & Support */}
                    <button
                      id="btn-popover-help-support"
                      type="button"
                      onClick={() => {
                        setAuthPopoverOpen(false);
                        onNavigate('contact');
                      }}
                      className="w-full text-left py-2 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Headphones className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                          Help &amp; Support
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                          We&apos;re here to help with your move
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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

            {/* Manage Booking in Mobile Navigation */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('order-tracking');
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${
                currentPage === 'order-tracking'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Luggage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="flex flex-col">
                  <span className="text-[11px] font-medium text-slate-500 leading-none mb-0.5">Manage Booking</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">My Trips &amp; Live Tracking</span>
                </span>
              </span>
              <span className="text-xs bg-blue-600 text-white font-extrabold px-2.5 py-1 rounded-lg">
                Track
              </span>
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
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
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
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLoginModal) onOpenLoginModal();
                  }}
                  className="w-full h-11 rounded-xl bg-[#1a73e8] hover:bg-blue-600 active:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <User className="w-4 h-4 fill-current" />
                  <span>LOGIN / SIGNUP</span>
                </button>

                {/* Offer banner for mobile */}
                <div className="bg-[#e8f7f5] dark:bg-teal-950/40 border border-[#b8ece5] dark:border-teal-900/60 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-900/50">
                    <Gift className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="text-[#0d8272] dark:text-teal-300 font-extrabold text-xs tracking-tight leading-tight">
                      FLAT 25% OFF*
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-medium mt-0.5">
                      on your first booking
                    </div>
                  </div>
                </div>
              </div>
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
