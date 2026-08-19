/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Wind, 
  Palette, 
  Zap, 
  Sparkles, 
  Droplets, 
  ShieldAlert, 
  Star, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  ChevronRight,
  ChevronDown,
  Info,
  Check,
  ShoppingBag
} from 'lucide-react';
import { ADDON_CATEGORIES, AddonCategory, AddonSubService } from '../data/addonServices';
import carpenterVectorImg from '../assets/images/addon_carpenter_vector_1785322577003.jpg';
import paintingVectorImg from '../assets/images/addon_painting_vector_1785322592772.jpg';
import acVectorImg from '../assets/images/addon_ac_vector_1785322607775.jpg';
import electricalVectorImg from '../assets/images/addon_electrical_vector_1785322619284.jpg';
import { motion, AnimatePresence } from 'motion/react';

interface AddonServicesViewProps {
  onNavigate: (page: string, serviceId?: string) => void;
  selectedCity: string;
  onBookingSuccess: (ticketId: string) => void;
  initialCategoryId?: string;
}

export const AddonServicesView: React.FC<AddonServicesViewProps> = ({
  onNavigate,
  selectedCity,
  onBookingSuccess,
  initialCategoryId
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<AddonCategory | null>(null);
  
  // Cart state for sub-service selection within the modal
  const [cart, setCart] = useState<Record<string, number>>({});
  
  // Booking Form fields inside the modal
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingSlot, setBookingSlot] = useState('10:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [expandedSubServiceId, setExpandedSubServiceId] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'select' | 'details'>('select');
  const [formError, setFormError] = useState('');

  // Icon mapping
  const getCategoryIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Wrench': return <Wrench className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  const getCategoryVector = (id: string) => {
    switch (id) {
      case 'carpenter': return carpenterVectorImg;
      case 'painting': return paintingVectorImg;
      case 'ac-appliances': return acVectorImg;
      case 'electrical': return electricalVectorImg;
      default: return carpenterVectorImg;
    }
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return ADDON_CATEGORIES.filter((cat) => {
      const matchesCategory = activeCategoryFilter === 'all' || cat.id === activeCategoryFilter;
      const matchesSearch = searchQuery === '' || 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.subCategories.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  // Open booking modal for a specific category
  const handleOpenBookingModal = (cat: AddonCategory, preselectSubId?: string) => {
    setSelectedCategoryForModal(cat);
    setBookingStep('select');
    setFormError('');
    // Initialize cart
    const initialCart: Record<string, number> = {};
    if (preselectSubId) {
      initialCart[preselectSubId] = 1;
    } else if (cat.subCategories.length > 0) {
      // Default select the popular or first sub-service
      const pop = cat.subCategories.find(s => s.popular) || cat.subCategories[0];
      initialCart[pop.id] = 1;
    }
    setCart(initialCart);
  };

  // Cart operations
  const updateQuantity = (subId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[subId] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        const copy = { ...prev };
        delete copy[subId];
        return copy;
      }
      return { ...prev, [subId]: updated };
    });
  };

  // Calculate cart total amount & count
  const cartSummary = useMemo(() => {
    if (!selectedCategoryForModal) return { totalAmount: 0, totalItems: 0, items: [] };
    let totalAmount = 0;
    let totalItems = 0;
    const items: { subService: AddonSubService; qty: number }[] = [];

    Object.entries(cart).forEach(([subId, rawQty]) => {
      const qty = Number(rawQty);
      const sub = selectedCategoryForModal.subCategories.find(s => s.id === subId);
      if (sub && qty > 0) {
        totalAmount += sub.price * qty;
        totalItems += qty;
        items.push({ subService: sub, qty });
      }
    });

    return { totalAmount, totalItems, items };
  }, [cart, selectedCategoryForModal]);

  // Handle final submission of Addon Booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (cartSummary.totalItems === 0) {
      setFormError('Please select at least one sub-service');
      return;
    }

    const ticketId = `UC-ADDON-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: ticketId,
      userName: customerName,
      userPhone: customerPhone,
      serviceName: `${selectedCategoryForModal?.title} Addon Service`,
      movingFrom: `${selectedCity} (${customerAddress || 'Address on call'})`,
      movingTo: `Slot: ${bookingDate} @ ${bookingSlot}`,
      status: "Service Assigned",
      estimatedCost: cartSummary.totalAmount,
      details: {
        category: selectedCategoryForModal?.title,
        items: cartSummary.items.map(i => `${i.subService.title} (x${i.qty})`),
        bookingDate,
        bookingSlot
      },
      createdAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('packers_bookings') || '[]';
      const parsed = JSON.parse(stored);
      parsed.unshift(newBooking);
      localStorage.setItem('packers_bookings', JSON.stringify(parsed));
    } catch (err) {
      console.error('Error saving addon booking:', err);
    }

    setSelectedCategoryForModal(null);
    onBookingSuccess(ticketId);
  };

  return (
    <div id="addon-services-page" className="min-h-screen bg-slate-50/60 dark:bg-[#070d19] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Urban Company-Style Header Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-orange-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-xs">
                UrbanClap & UC Inspired
              </span>
              <span className="bg-slate-800/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                Active in {selectedCity}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Professional Home &amp; Shifting Addon Services
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Book certified carpenters, painters, AC technicians, electricians, and deep cleaners with standardized transparent rates, 45-min arrival guarantee, and 30-day service warranty.
            </p>

            {/* Urban Company Search Input Bar */}
            <div className="pt-2">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 'AC wash', 'Bed dismantling', 'Wall painting'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-200 dark:border-slate-700"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-300 border-t border-slate-800/80 mt-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.88/5 Rated (1.5L+ Jobs)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>45-Min Express Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>30-Day Service Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeCategoryFilter === 'all'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <span>All Addon Services</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{ADDON_CATEGORIES.length}</span>
          </button>

          {ADDON_CATEGORIES.map((cat) => {
            const isActive = activeCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {getCategoryIcon(cat.iconName, "w-4 h-4")}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid of Addon Categories */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-3">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching addon services found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Try searching for 'AC', 'Bed', 'Paint', or clear filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategoryFilter('all'); }}
              className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-orange-400/80 dark:hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top Header Image & Badges */}
                <div>
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={getCategoryVector(cat.id)}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {cat.badge}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-white backdrop-blur-md font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{cat.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({cat.reviewsCount})</span>
                    </div>

                    {/* Bottom Title overlay */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-orange-500 text-white shrink-0">
                          {getCategoryIcon(cat.iconName, "w-4 h-4")}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                          {cat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Body & Sub-Services Teaser */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                      {cat.tagline}
                    </p>

                    {/* Sub-Category Pills */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        Popular Sub-Services Included:
                      </span>
                      <div className="space-y-1.5">
                        {cat.subCategories.slice(0, 3).map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => handleOpenBookingModal(cat, sub.id)}
                            className="bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/50 rounded-xl p-2.5 flex items-center justify-between text-xs cursor-pointer transition-colors group/sub"
                          >
                            <div className="flex items-center gap-2 pr-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              <span className="font-bold text-slate-800 dark:text-slate-200 group-hover/sub:text-orange-600 dark:group-hover/sub:text-orange-400 line-clamp-1">
                                {sub.title}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0">
                              ₹{sub.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Starting Rate</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      ₹{cat.startingPrice}
                    </span>
                  </div>

                  {/* Prominent "Book For Service" Button requested by user */}
                  <button
                    onClick={() => handleOpenBookingModal(cat)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                  >
                    <span>Book For Service</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* ==================== SUB-CATEGORY SERVICE BOOKING MODAL / DRAWER ==================== */}
      <AnimatePresence>
        {selectedCategoryForModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 w-full max-w-3xl overflow-hidden relative flex flex-col max-h-[90vh] my-auto"
            >
              {/* Modal Top Bar */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500 text-white">
                    {getCategoryIcon(selectedCategoryForModal.iconName, "w-5 h-5")}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white leading-tight">
                      {selectedCategoryForModal.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      Select sub-category services &amp; customize quantity
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategoryForModal(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Step Switcher Tabs */}
              <div className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 px-6 py-3 flex items-center justify-between text-xs font-bold shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBookingStep('select')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      bookingStep === 'select'
                        ? 'bg-orange-500 text-white font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    1. Choose Sub-Services ({cartSummary.totalItems})
                  </button>
                  <span className="text-slate-300">→</span>
                  <button
                    onClick={() => {
                      if (cartSummary.totalItems > 0) setBookingStep('details');
                    }}
                    disabled={cartSummary.totalItems === 0}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      bookingStep === 'details'
                        ? 'bg-orange-500 text-white font-extrabold cursor-pointer'
                        : cartSummary.totalItems > 0
                        ? 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer'
                        : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                    }`}
                  >
                    2. Slot &amp; Contact Details
                  </button>
                </div>

                <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-extrabold bg-orange-100 dark:bg-orange-950/40 px-2.5 py-1 rounded-full">
                  Total: ₹{cartSummary.totalAmount}
                </span>
              </div>

              {/* Modal Body Scroll Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {formError && (
                  <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* STEP 1: SUB-SERVICES LIST & QUANTITY CONTROLS */}
                {bookingStep === 'select' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span>Available Sub-Category Services</span>
                      <span>UC Guaranteed Pricing</span>
                    </div>

                    <div className="space-y-3.5">
                      {selectedCategoryForModal.subCategories.map((sub) => {
                        const qty = cart[sub.id] || 0;
                        const isExpanded = expandedSubServiceId === sub.id;

                        return (
                          <div
                            key={sub.id}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                              qty > 0
                                ? 'bg-orange-50/40 dark:bg-orange-950/20 border-orange-500/80 shadow-xs ring-1 ring-orange-500/20'
                                : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                                    {sub.title}
                                  </h4>
                                  {sub.popular && (
                                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                                      Most Popular
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                  {sub.description}
                                </p>

                                <div className="flex items-center gap-3 pt-1 text-[11px] font-bold text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                                    {sub.duration}
                                  </span>
                                  <span>•</span>
                                  <span>{sub.unit}</span>
                                  <span>•</span>
                                  <button
                                    type="button"
                                    onClick={() => setExpandedSubServiceId(isExpanded ? null : sub.id)}
                                    className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-700 cursor-pointer"
                                  >
                                    {isExpanded ? 'Hide Details' : "What's Included?"}
                                  </button>
                                </div>
                              </div>

                              {/* Price and Quantity Counter */}
                              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
                                <div className="text-left sm:text-right">
                                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono block">
                                    ₹{sub.price}
                                  </span>
                                </div>

                                {/* Counter Button */}
                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(sub.id, 1)}
                                    className="bg-white dark:bg-slate-800 hover:bg-orange-500 hover:text-white border border-orange-500 text-orange-600 dark:text-orange-400 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>ADD</span>
                                  </button>
                                ) : (
                                  <div className="flex items-center bg-orange-500 text-white rounded-xl shadow-md overflow-hidden font-extrabold text-xs">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(sub.id, -1)}
                                      className="p-2 hover:bg-orange-600 cursor-pointer transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-3 font-mono text-sm">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(sub.id, 1)}
                                      className="p-2 hover:bg-orange-600 cursor-pointer transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Expandable Included List */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5"
                                >
                                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                                    Included in this service:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                    {sub.included.map((inc, i) => (
                                      <div key={i} className="flex items-start gap-1.5">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{inc}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: SLOT SELECTION & CONTACT DETAILS FORM */}
                {bookingStep === 'details' && (
                  <form onSubmit={handleConfirmBooking} className="space-y-5">
                    {/* Selected Summary Badge */}
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                        <span>Selected Sub-Services Summary</span>
                        <button
                          type="button"
                          onClick={() => setBookingStep('select')}
                          className="text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                        >
                          Edit Selection
                        </button>
                      </div>

                      <div className="space-y-1">
                        {cartSummary.items.map(({ subService, qty }) => (
                          <div key={subService.id} className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <span>{subService.title} (x{qty})</span>
                            <span className="font-mono font-bold">₹{subService.price * qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
                        <span>Grand Total Rate</span>
                        <span className="font-mono text-base text-orange-600 dark:text-orange-400">₹{cartSummary.totalAmount}</span>
                      </div>
                    </div>

                    {/* Date & Time Slot Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>Time Slot</span>
                        </label>
                        <select
                          value={bookingSlot}
                          onChange={(e) => setBookingSlot(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                          <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Popular)</option>
                          <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                          <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                          <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                          <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Contact & Address Details */}
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-orange-500" />
                            <span>Your Full Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-orange-500" />
                            <span>Mobile Phone Number</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span>Service Address / Locality in {selectedCity}</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Flat 302, Green Acres Apt, HSR Layout"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Confirm Addon Booking (₹{cartSummary.totalAmount})</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Bottom Fixed CTA if in Select Step */}
              {bookingStep === 'select' && (
                <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {cartSummary.totalItems} Service(s) Selected
                    </span>
                    <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      ₹{cartSummary.totalAmount}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={cartSummary.totalItems === 0}
                    onClick={() => {
                      if (cartSummary.totalItems > 0) {
                        setFormError('');
                        setBookingStep('details');
                      }
                    }}
                    className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
                      cartSummary.totalItems > 0
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 cursor-pointer'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Proceed to Slot &amp; Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
