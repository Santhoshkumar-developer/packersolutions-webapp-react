/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { 
  Bike, 
  Package, 
  Truck, 
  Wrench, 
  Palette, 
  Wind, 
  Zap, 
  CheckCircle,
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Calendar, 
  PhoneCall,
  Sparkles,
  ArrowRight,
  ArrowUp,
  Shield,
  Clock,
  HelpCircle,
  MapPin,
  ChevronDown,
  ChevronRight,
  Search
} from 'lucide-react';
import { SERVICES_DATA } from './data/services';
import { CITIES_DATA } from './data/cities';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceCard } from './components/ServiceCard';
import { BookingForm } from './components/BookingForm';
import { FAQSection } from './components/FAQSection';
import { Testimonials } from './components/Testimonials';
import { SEOConsole } from './components/SEOConsole';
import { ExpertPromoSlider } from './components/ExpertPromoSlider';
import { LucideIcon } from './components/LucideIcon';
import { BlogView } from './components/BlogView';
import { PolicyPages } from './components/PolicyPages';
import { ServiceEnquiryModal } from './components/ServiceEnquiryModal';
import { SavedAddressesModal } from './components/SavedAddressesModal';
import parcelVectorImg from './assets/images/service_parcel_vector_1785319730384.jpg';
import packersVectorImg from './assets/images/service_packers_vector_1785319746387.jpg';
import truckVectorImg from './assets/images/service_truck_vector_1785319761125.jpg';
import officeCorporateVectorImg from './assets/images/office_shifting_service_1788079537044.jpg';
import packingUnpackingVectorImg from './assets/images/vector_packing_unpacking_1785946345528.png';
import loadingUnloadingVectorImg from './assets/images/vector_loading_unloading_1785946360593.png';
import vehicleTransportVectorImg from './assets/images/vector_vehicle_transport_1785946372441.png';
import warehousingStorageVectorImg from './assets/images/vector_warehousing_storage_1785946384931.png';
import brandAmbassadorImg from './assets/images/brand_ambassador_banner_1785946313841.jpg';
import carpenterVectorImg from './assets/images/addon_carpenter_vector_1785322577003.jpg';
import paintingVectorImg from './assets/images/addon_painting_vector_1785322592772.jpg';
import acVectorImg from './assets/images/addon_ac_vector_1785322607775.jpg';
import electricalVectorImg from './assets/images/addon_electrical_vector_1785322619284.jpg';
import southIndiaSkylineImg from './assets/images/Coimbatore-Skyline-Banner.png';
import { LoginOtpModal } from './components/LoginOtpModal';
import { HouseShiftingCardForm } from './components/HouseShiftingCardForm';
import { OfficeShiftingCardForm } from './components/OfficeShiftingCardForm';
import { TruckBookingCardForm } from './components/TruckBookingCardForm';
import { PackingUnpackingCardForm } from './components/PackingUnpackingCardForm';
import { LoadingUnloadingCardForm } from './components/LoadingUnloadingCardForm';
import { WarehousingStorageCardForm } from './components/WarehousingStorageCardForm';
import { ParcelCourierCardForm } from './components/ParcelCourierCardForm';
import { VehicleTransportCardForm } from './components/VehicleTransportCardForm';
import { ServicePorterContent } from './components/ServicePorterContent';
import { VideoTestimonials } from './components/VideoTestimonials';
import { AboutUs } from './components/AboutUs';
import { LocationsView } from './components/LocationsView';
import { HowItWorksView } from './components/HowItWorksView';
import { ContactView } from './components/ContactView';
import { CityAreaDirectory } from './components/CityAreaDirectory';
import { LocationPromptModal } from './components/LocationPromptModal';
import { AddonServicesView } from './components/AddonServicesView';
import { FAQPage } from './components/faq/FAQPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const CITY_ICONIC_IMAGES: Record<string, string> = {
    'Ahmedabad': 'https://images.unsplash.com/photo-1627894006066-b4502d9a60e0?auto=format&fit=crop&q=80&w=1600',
    'Bangalore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1600',
    'Mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1600',
    'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1600',
    'Hyderabad': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1600',
    'Pune': 'https://images.unsplash.com/photo-1600100397608-f010e423b961?auto=format&fit=crop&q=80&w=1600',
    'Chennai': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1600',
    'Surat': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1600',
    'Kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=1600',
    'Coimbatore': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1600',
    'Jaipur': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1600',
  };

  const getCityIconicImage = (city: string): string => {
    return CITY_ICONIC_IMAGES[city] || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1600';
  };

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string>('packers-and-movers');
  const [selectedAddonCategory, setSelectedAddonCategory] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [latestTicketId, setLatestTicketId] = useState('');
  const [quickSearchService, setQuickSearchService] = useState('packers-and-movers');
  const [activeUpperSlide, setActiveUpperSlide] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [showCityModal, setShowCityModal] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  // Close city dropdown on external clicks
  useEffect(() => {
    if (!isCityDropdownOpen) return;
    const handleClose = () => {
      setIsCityDropdownOpen(false);
    };
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [isCityDropdownOpen]);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [loanMonthlyIncome, setLoanMonthlyIncome] = useState(50000);
  const [loanMonthlyEmi, setLoanMonthlyEmi] = useState(5000);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isServiceEnquiryModalOpen, setIsServiceEnquiryModalOpen] = useState(false);
  const [enquiryModalServiceId, setEnquiryModalServiceId] = useState('packers-and-movers');
  const [heroPickupInput, setHeroPickupInput] = useState('');
  const [heroMobileInput, setHeroMobileInput] = useState('');
  const [heroErrors, setHeroErrors] = useState<{ pickup?: string; mobile?: string }>({});
  const [testimonialTab, setTestimonialTab] = useState<'video' | 'written'>('written');
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  // Initial location prompt check on page load
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem('ps_user_city');
      const locationSet = localStorage.getItem('ps_location_set');
      if (savedCity) {
        setSelectedCity(savedCity);
      }
      if (!locationSet) {
        setShowCityModal(true);
      }
    } catch (e) {
      setShowCityModal(true);
    }
  }, []);

  // Simulate initial data rendering performance delay for ServiceCards and Testimonials
  useEffect(() => {
    const servicesTimer = setTimeout(() => {
      setIsServicesLoading(false);
    }, 1500);

    const testimonialsTimer = setTimeout(() => {
      setIsTestimonialsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(servicesTimer);
      clearTimeout(testimonialsTimer);
    };
  }, []);

  // Back to Top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Simple client-side hash routing for dynamic SEO crawling simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#service/')) {
        let serviceId = hash.replace('#service/', '');
        if (serviceId === 'household-shifting') {
          serviceId = 'packers-and-movers';
        }
        const exists = SERVICES_DATA.some(s => s.id === serviceId);
        if (exists) {
          setCurrentPage('service');
          setActiveServiceId(serviceId);
          setSelectedBlogSlug(null);
          window.scrollTo(0, 0);
          return;
        }
      }
      if (hash === '#blog') {
        setCurrentPage('blog');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setCurrentPage('blog');
        setSelectedBlogSlug(slug);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#addons' || hash.startsWith('#addons/')) {
        setCurrentPage('addons');
        if (hash.startsWith('#addons/')) {
          setSelectedAddonCategory(hash.replace('#addons/', ''));
        } else {
          setSelectedAddonCategory(null);
        }
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#about') {
        setCurrentPage('about');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#locations') {
        setCurrentPage('locations');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#how-it-works') {
        setCurrentPage('how-it-works');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#contact') {
        setCurrentPage('contact');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#faq' || hash === '#faqs') {
        setCurrentPage('faq');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (hash === '#driving-partner' || hash === '#partner') {
        setCurrentPage('driving-partner');
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      if (['#cancellation-refund', '#terms-conditions', '#shipment-policy', '#privacy-policy'].includes(hash)) {
        setCurrentPage(hash.replace('#', ''));
        setSelectedBlogSlug(null);
        window.scrollTo(0, 0);
        return;
      }
      setCurrentPage('home');
      setActiveServiceId('packers-and-movers');
      setSelectedBlogSlug(null);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // trigger on initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (page: string, serviceId?: string) => {
    if (page === 'service' && serviceId) {
      const normalizedServiceId = serviceId === 'household-shifting' ? 'packers-and-movers' : serviceId;
      window.location.hash = `#service/${normalizedServiceId}`;
    } else if (page === 'blog') {
      window.location.hash = serviceId ? `#blog/${serviceId}` : '#blog';
    } else if (page === 'addons') {
      window.location.hash = serviceId ? `#addons/${serviceId}` : '#addons';
    } else if (page === 'driving-partner' || page === 'partner') {
      window.location.hash = '#driving-partner';
    } else if (page === 'about') {
      window.location.hash = '#about';
    } else if (page === 'locations') {
      window.location.hash = '#locations';
    } else if (page === 'how-it-works') {
      window.location.hash = '#how-it-works';
    } else if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'faq' || page === 'faqs') {
      window.location.hash = '#faq';
    } else if (['cancellation-refund', 'terms-conditions', 'shipment-policy', 'privacy-policy'].includes(page)) {
      window.location.hash = `#${page}`;
    } else {
      window.location.hash = '#home';
    }
  };

  const handleBookingSuccess = () => {
    // Read the latest ticket to display on our successful modal
    try {
      const stored = localStorage.getItem('packers_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setLatestTicketId(parsed[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    }
    
    setBookingSuccess(true);
    setIsServiceEnquiryModalOpen(false);
    window.scrollTo(0, 0);
  };

  const scrollToServiceForm = () => {
    const targetElement = document.getElementById('service-card-form-container') || document.getElementById('booking-section');
    if (targetElement) {
      const navbarHeight = 85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      // Provide smooth visual feedback ring
      targetElement.classList.add('ring-4', 'ring-orange-500/40', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        targetElement.classList.remove('ring-4', 'ring-orange-500/40');
      }, 1800);

      // Focus first actionable input or selector inside the form
      const firstInput = targetElement.querySelector('input, select, button') as HTMLElement | null;
      if (firstInput) {
        setTimeout(() => {
          firstInput.focus({ preventScroll: true });
        }, 400);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyLoan = (name: string, phone: string, amount: number, emi: number) => {
    try {
      const stored = localStorage.getItem('packers_bookings') || '[]';
      const parsed = JSON.parse(stored);
      const newBooking = {
        id: `LOAN-${Math.floor(100000 + Math.random() * 900000)}`,
        userName: name,
        userPhone: phone,
        serviceName: `NoBroker Shifting Loan (₹${amount.toLocaleString()})`,
        movingFrom: `Selected Shifting partner`,
        movingTo: `EMI: ₹${emi.toLocaleString()}/mo`,
        status: "Loan Disbursed",
        createdAt: new Date().toISOString()
      };
      parsed.unshift(newBooking);
      localStorage.setItem('packers_bookings', JSON.stringify(parsed));
      setLatestTicketId(newBooking.id);
      setBookingSuccess(true);
      setShowLoanModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegisterPartner = (name: string, phone: string, city: string, vehicle: string) => {
    try {
      const stored = localStorage.getItem('packers_bookings') || '[]';
      const parsed = JSON.parse(stored);
      const newBooking = {
        id: `PARTNER-${Math.floor(100000 + Math.random() * 900000)}`,
        userName: name,
        userPhone: phone,
        serviceName: `Delivery Partner Recruitment`,
        movingFrom: city,
        movingTo: vehicle,
        status: "Application Approved",
        createdAt: new Date().toISOString()
      };
      parsed.unshift(newBooking);
      localStorage.setItem('packers_bookings', JSON.stringify(parsed));
      setLatestTicketId(newBooking.id);
      setBookingSuccess(true);
      setShowDeliveryModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeroGetEstimate = () => {
    const errors: { pickup?: string; mobile?: string } = {};
    const effectivePickup = heroPickupInput.trim() || selectedCity.trim();

    if (!effectivePickup || effectivePickup.length < 2) {
      errors.pickup = 'Please enter Pickup City or Pincode';
    }

    const cleanMobile = heroMobileInput.replace(/\D/g, '');
    if (!cleanMobile) {
      errors.mobile = 'Please enter 10-digit Mobile Number';
    } else if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setHeroErrors(errors);
      return;
    }

    setHeroErrors({});
    setEnquiryModalServiceId(activeServiceId || 'packers-and-movers');
    setIsServiceEnquiryModalOpen(true);
  };

  const activeService = SERVICES_DATA.find(s => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background-app text-text-app flex flex-col font-sans selection:bg-orange-500 selection:text-white antialiased transition-colors duration-300">
      {/* Dynamic SEO Tag Controller Widget */}
      <SEOConsole currentPage={currentPage} activeService={activeService} />

      {/* Primary Brand Navbar */}
      <Navbar 
        currentPage={currentPage}
        activeServiceId={activeServiceId}
        services={SERVICES_DATA}
        onNavigate={navigateTo}
        selectedCity={selectedCity}
        onOpenCityModal={() => setShowCityModal(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenEnquiryModal={() => {
          setEnquiryModalServiceId('packers-and-movers');
          setIsServiceEnquiryModalOpen(true);
        }}
        onOpenPartnerModal={() => setShowDeliveryModal(true)}
      />

      {/* Interactive Main Body Content */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          /* ==================== HOME VIEW ==================== */
          <div id="home-page-view" className="bg-background-app font-roboto">
            
            {/* 1. "Service We Offer" Section (Reference Digit Style) */}
            <section id="services-offer-section" className="py-10 sm:py-14 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/60 dark:border-slate-800/60 font-roboto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Header Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-white tracking-tight font-roboto leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001261] via-[#0321a1] to-[#ff6200] dark:from-blue-400 dark:via-orange-400 dark:to-amber-300">
                      Packersolutions
                    </span>{' '}
                    Your Trusted Delivery Partner
                  </h1>
                  <h2 className="text-sm sm:text-base font-normal sm:font-medium text-slate-600 dark:text-slate-400 mt-2.5 max-w-3xl mx-auto leading-relaxed">
                    Reliable and hassle-free moving and delivery solutions for homes and businesses. From packing and shifting to parcel delivery and vehicle transportation, we ensure your belongings reach their destination safely, securely, and on time.
                  </h2>
                </div>

                {/* 8 Services in a Single Horizontal Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-10">
                  {[
                    {
                      id: 'packers-and-movers',
                      name: 'Home Shifting',
                      image: packersVectorImg,
                      badge: 'Up to 30% Off'
                    },
                    {
                      id: 'office-relocation',
                      name: 'Office Shifting',
                      image: officeCorporateVectorImg,
                      badge: '0% Advance'
                    },
                    {
                      id: 'packing-unpacking',
                      name: 'Packing Service',
                      image: packingUnpackingVectorImg,
                      badge: '5-Ply Box'
                    },
                    {
                      id: 'loading-unloading',
                      name: 'Loading Service',
                      image: loadingUnloadingVectorImg,
                      badge: 'Safe Handling'
                    },
                    {
                      id: 'vehicle-transportation',
                      name: 'Vehicle Transport',
                      image: vehicleTransportVectorImg,
                      badge: 'Enclosed Trailer'
                    },
                    {
                      id: 'parcel-courier',
                      name: 'Parcel Delivery',
                      image: parcelVectorImg,
                      badge: 'Express 24h'
                    },
                    {
                      id: 'domestic-relocation',
                      name: 'Truck Booking',
                      image: truckVectorImg,
                      badge: 'GPS Tracked'
                    },
                    {
                      id: 'warehousing-storage',
                      name: 'Storage Solutions',
                      image: warehousingStorageVectorImg,
                      badge: 'CCTV Vault'
                    }
                  ].map((item, idx) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setActiveServiceId(item.id);
                        navigateTo('service', item.id);
                      }}
                      className="flex flex-col items-center cursor-pointer group relative pt-7 sm:pt-8"
                    >
                      {/* Floating Yellow Promo Tag with Smooth Ease Up/Down Animation & Gap */}
                      <span 
                        style={{ animationDelay: `${idx * 0.25}s` }}
                        className="absolute top-0 z-10 bg-amber-400 text-slate-950 font-bold text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-amber-300/80 animate-float-badge group-hover:scale-105 transition-all duration-300"
                      >
                        {item.badge}
                      </span>

                      {/* Edge-to-Edge Circular Vector Image Container (No padding/inner white border) */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full shadow-xs group-hover:shadow-md transition-all flex items-center justify-center overflow-hidden mb-2.5 border-0 p-0 bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={item.image} 
                          alt={`${item.name} Vector`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Service Title */}
                      <span className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200 text-center leading-tight group-hover:text-amber-500 transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Horizontal Floating Quote Calculator Bar (Reference Style) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
                    {/* Pickup City / Pincode Input */}
                    <div 
                      className={`flex-1 w-full bg-slate-50 dark:bg-slate-800/80 border ${
                        heroErrors.pickup ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700/80 hover:border-orange-400 dark:hover:border-orange-500/80'
                      } rounded-2xl p-3.5 flex items-center gap-3 transition-all group`}
                    >
                      <MapPin className={`w-5 h-5 ${heroErrors.pickup ? 'text-red-500' : 'text-orange-500'} shrink-0 group-hover:scale-110 transition-transform`} />
                      <div className="w-full text-left">
                        <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          Pickup City / Pincode
                        </label>
                        <div className="flex items-center justify-between">
                          <input 
                            id="hero-input-pickup-city"
                            type="text" 
                            placeholder="Enter City or 6-digit Pincode" 
                            value={heroPickupInput || selectedCity}
                            onChange={(e) => {
                              setHeroPickupInput(e.target.value);
                              if (heroErrors.pickup) {
                                setHeroErrors((prev) => ({ ...prev, pickup: undefined }));
                              }
                            }}
                            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 p-0"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCityModal(true);
                            }}
                            className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-950/60 px-2 py-0.5 rounded-md shrink-0 ml-1.5 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900 transition-colors"
                          >
                            Change
                          </button>
                        </div>
                        {heroErrors.pickup && (
                          <span className="text-[10px] font-bold text-red-500 block mt-0.5">
                            {heroErrors.pickup}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Number Input */}
                    <div 
                      className={`flex-1 w-full bg-slate-50 dark:bg-slate-800/80 border ${
                        heroErrors.mobile ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700/80'
                      } rounded-2xl p-3.5 flex items-center gap-3 transition-all`}
                    >
                      <PhoneCall className={`w-5 h-5 ${heroErrors.mobile ? 'text-red-500' : 'text-orange-500'} shrink-0`} />
                      <div className="w-full text-left">
                        <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          Mobile Number
                        </label>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">+91</span>
                          <input 
                            id="hero-input-mobile"
                            type="tel"
                            maxLength={10}
                            placeholder="Enter 10-digit Mobile" 
                            value={heroMobileInput}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setHeroMobileInput(val);
                              if (heroErrors.mobile) {
                                setHeroErrors((prev) => ({ ...prev, mobile: undefined }));
                              }
                            }}
                            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 p-0 font-mono"
                          />
                        </div>
                        {heroErrors.mobile && (
                          <span className="text-[10px] font-bold text-red-500 block mt-0.5">
                            {heroErrors.mobile}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Calculate Shifting Price Primary CTA Button */}
                    <button
                      id="btn-view-prices-hero"
                      type="button"
                      onClick={handleHeroGetEstimate}
                      className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 via-brand-orange to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Get Estimate</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Bottom Quick Links & Terms Checkbox */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                      <button 
                        onClick={() => navigateTo('service', 'packers-and-movers')}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Local House Move</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button 
                        onClick={() => navigateTo('service', 'domestic-relocation')}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Truck Booking</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button 
                        onClick={() => {
                          setEnquiryModalServiceId(activeServiceId || 'packers-and-movers');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Download Rate Card</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <input type="checkbox" id="hero-terms-check" defaultChecked className="rounded text-amber-500 focus:ring-amber-400 accent-amber-500" />
                      <label htmlFor="hero-terms-check" className="cursor-pointer">
                        I agree to the <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} className="underline hover:text-amber-500">Terms &amp; Conditions</a>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. Why People Trust Packer Solutions & Add on Services columns */}
            <section id="trust-and-addons" className="py-16 bg-transparent border-t border-slate-200/50 dark:border-slate-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Why People Trust Packer Solutions */}
                <div className="space-y-6 text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                    Why People Trust Packer Solutions?
                  </h3>
                  
                  <div className="space-y-5">
                    {/* Benefit 1 */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-base border border-blue-100/30 dark:border-blue-900/40">
                        ₹
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Lowest Price Guarantee</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Moving at a price you can afford - we'll match any competitor's quote
                        </p>
                      </div>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100/30 dark:border-blue-900/40">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Best Quality Service</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Safe and Reliable Packaging and Moving Services
                        </p>
                      </div>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100/30 dark:border-blue-900/40">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Reschedule your shifting anytime</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Change your shifting date as per your convenience.
                        </p>
                      </div>
                    </div>

                    {/* Benefit 4 */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100/30 dark:border-blue-900/40">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Support Assistance</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Dedicated support assistance for quick query resolution
                        </p>
                      </div>
                    </div>

                    {/* Benefit 5 */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100/30 dark:border-blue-900/40">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Professional Labour</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Expertly packing and moving your belongings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Add on Services */}
                <div className="space-y-6 text-left flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                      Add on Services
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                      {/* Card 1: Carpenter */}
                      <div 
                        onClick={() => navigateTo('addons', 'carpenter')}
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 flex flex-col items-center text-center group cursor-pointer transition-all"
                      >
                        <div className="w-full aspect-4/3 rounded-xl overflow-hidden mb-2 bg-[#ebf0fe] dark:bg-slate-800/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={carpenterVectorImg} 
                            alt="Carpenter Vector" 
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-semibold text-[11px] sm:text-[13px] text-slate-700 dark:text-slate-200 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                          Carpenter
                        </span>
                      </div>

                      {/* Card 2: Painting */}
                      <div 
                        onClick={() => navigateTo('addons', 'painting')}
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 flex flex-col items-center text-center group cursor-pointer transition-all"
                      >
                        <div className="w-full aspect-4/3 rounded-xl overflow-hidden mb-2 bg-[#ebf0fe] dark:bg-slate-800/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={paintingVectorImg} 
                            alt="Painting Vector" 
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-semibold text-[11px] sm:text-[13px] text-slate-700 dark:text-slate-200 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                          Painting
                        </span>
                      </div>

                      {/* Card 3: AC Needs */}
                      <div 
                        onClick={() => navigateTo('addons', 'ac-appliances')}
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 flex flex-col items-center text-center group cursor-pointer transition-all"
                      >
                        <div className="w-full aspect-4/3 rounded-xl overflow-hidden mb-2 bg-[#ebf0fe] dark:bg-slate-800/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={acVectorImg} 
                            alt="AC Needs Vector" 
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-semibold text-[11px] sm:text-[13px] text-slate-700 dark:text-slate-200 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                          AC Needs
                        </span>
                      </div>

                      {/* Card 4: Electrical */}
                      <div 
                        onClick={() => navigateTo('addons', 'electrical')}
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 flex flex-col items-center text-center group cursor-pointer transition-all"
                      >
                        <div className="w-full aspect-4/3 rounded-xl overflow-hidden mb-2 bg-[#ebf0fe] dark:bg-slate-800/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={electricalVectorImg} 
                            alt="Electrical Vector" 
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-semibold text-[11px] sm:text-[13px] text-slate-700 dark:text-slate-200 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                          Electrical
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      id="btn-book-service"
                      onClick={() => navigateTo('addons')}
                      className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-sm h-14 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      Book For Service
                      <span className="text-lg">➔</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-semibold tracking-tight mt-2.5">
                      Our Expert Team will provide best service for you
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Interactive Carousel Promo Banners */}
            <section id="promo-banners" className="py-12 bg-transparent font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ExpertPromoSlider />
              </div>
            </section>

            {/* 5. Our Happy Customers Reviews */}
            <section id="happy-customers" className="py-16 bg-transparent border-t border-slate-200/50 dark:border-slate-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-8 text-center space-y-3">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                    Our Happy Customers
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
                    Real customers sharing their genuine relocation experiences with Packersolution. Read written feedback below!
                  </p>
                </div>

                {/* Tab selector buttons - Video Stories tab hidden for now, can be enabled anytime */}
                {/* 
                <div className="flex justify-center items-center gap-2 mb-10 max-w-sm mx-auto bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                  <button
                    onClick={() => setTestimonialTab('video')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      testimonialTab === 'video'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>🎬 Video Stories</span>
                    <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold animate-pulse">NEW</span>
                  </button>
                  <button
                    onClick={() => setTestimonialTab('written')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      testimonialTab === 'written'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>📝 Written Reviews</span>
                  </button>
                </div>
                */}

                <AnimatePresence mode="wait">
                  {testimonialTab === 'video' ? (
                    <motion.div
                      key="video-testimonials-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VideoTestimonials />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="written-testimonials-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Testimonials plainGrid={true} isLoading={isTestimonialsLoading} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* City-Wise Locality Directory Section */}
            <CityAreaDirectory onSelectArea={(city, area) => {
              setSelectedCity(city);
              const quoteElement = document.getElementById('quick-quote');
              if (quoteElement) {
                quoteElement.scrollIntoView({ behavior: 'smooth' });
              }
            }} />

            {/* 8. Tamil Nadu & Kerala Iconic Landmarks Skyline Banner */}
            <section id="skyline-banner" className="bg-[#0b1b4f] relative overflow-hidden border-b border-slate-900 w-full font-sans">
              {/* Full Width Exact Ratio Panoramic Landmark Skyline Image */}
              <div className="w-full relative">
                <img 
                  src={southIndiaSkylineImg} 
                  alt="Coimbatore Skyline Banner" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </section>

          </div>
        ) : currentPage === 'blog' ? (
          /* ==================== BLOG / MOVING TIPS VIEW ==================== */
          <BlogView 
            onNavigate={navigateTo} 
            selectedArticleSlug={selectedBlogSlug}
            onSelectArticle={(slug) => navigateTo('blog', slug || undefined)}
          />
        ) : currentPage === 'addons' ? (
          /* ==================== ADDON SERVICES VIEW (URBAN COMPANY STYLE) ==================== */
          <AddonServicesView 
            onNavigate={navigateTo}
            selectedCity={selectedCity}
            onBookingSuccess={(ticketId) => {
              setLatestTicketId(ticketId);
              setBookingSuccess(true);
              window.scrollTo(0, 0);
            }}
            initialCategoryId={selectedAddonCategory || undefined}
          />
        ) : currentPage === 'about' ? (
          /* ==================== ABOUT US VIEW ==================== */
          <AboutUs 
            onNavigate={navigateTo} 
            onOpenBooking={() => {
              navigateTo('service', 'packers-and-movers');
              setTimeout(() => {
                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }} 
          />
        ) : currentPage === 'locations' ? (
          /* ==================== LOCATIONS VIEW ==================== */
          <LocationsView 
            onNavigate={navigateTo}
            onOpenBooking={(serviceId, city) => {
              setSelectedCity(city);
              setHeroPickupInput(city);
              setActiveServiceId(serviceId);
              setEnquiryModalServiceId(serviceId);
              setIsServiceEnquiryModalOpen(true);
            }}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        ) : currentPage === 'how-it-works' ? (
          /* ==================== HOW IT WORKS VIEW ==================== */
          <HowItWorksView 
            onNavigate={navigateTo}
            onOpenBooking={(serviceId, city) => {
              setSelectedCity(city);
              setHeroPickupInput(city);
              setActiveServiceId(serviceId);
              setEnquiryModalServiceId(serviceId);
              setIsServiceEnquiryModalOpen(true);
            }}
          />
        ) : currentPage === 'contact' ? (
          /* ==================== CONTACT US VIEW ==================== */
          <ContactView 
            onNavigate={navigateTo}
            selectedCity={selectedCity}
          />
        ) : currentPage === 'faq' ? (
          /* ==================== FAQ DEDICATED PAGE VIEW ==================== */
          <FAQPage
            onNavigate={navigateTo}
            selectedCity={selectedCity}
            onOpenQuote={() => {
              setEnquiryModalServiceId('packers-and-movers');
              setIsServiceEnquiryModalOpen(true);
            }}
            onOpenBooking={(serviceId) => {
              const targetService = serviceId || 'packers-and-movers';
              setActiveServiceId(targetService);
              setEnquiryModalServiceId(targetService);
              setIsServiceEnquiryModalOpen(true);
            }}
          />
        ) : ['cancellation-refund', 'terms-conditions', 'shipment-policy', 'privacy-policy'].includes(currentPage) ? (
          /* ==================== POLICY PAGES VIEW ==================== */
          <PolicyPages 
            page={currentPage as 'cancellation-refund' | 'terms-conditions' | 'shipment-policy' | 'privacy-policy'} 
            onNavigate={navigateTo} 
            selectedCity={selectedCity} 
          />
        ) : (
          /* ==================== SERVICE DETAILS VIEW ==================== */
          <div id="service-detailed-page-view">
            
            {/* Service Hero Header with Real Iconic City Background */}
            <section className="relative bg-slate-950 text-white pt-10 sm:pt-14 pb-20 sm:pb-28 lg:py-20 border-b border-slate-800 overflow-hidden min-h-[340px] sm:min-h-[380px] lg:min-h-[360px] flex items-center">
              {/* Real Iconic City Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
                style={{ backgroundImage: `url(${getCityIconicImage(selectedCity)})` }}
              />
              
              {/* Gradient overlays ensuring real iconic city photo is clearly visible while text maintains crystal readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-3xl space-y-2 sm:space-y-2.5 text-left">
                  <div className="inline-flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-orange-500/30 px-2.5 py-0.5 rounded-md max-w-full text-left shadow-sm">
                    <span className="text-orange-400 text-[10px] font-extrabold tracking-wider uppercase">
                      {activeService.tagline}
                    </span>
                    <span className="text-slate-600 font-bold">•</span>
                    <span className="text-amber-300 text-[10px] font-bold tracking-wider uppercase">
                      Serving {selectedCity}
                    </span>
                  </div>

                  <h1 id="service-page-heading" className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mt-1 drop-shadow-md">
                    {activeService.id === 'packers-and-movers' || activeService.id === 'household-shifting' 
                      ? 'Packers and Movers' 
                      : activeService.id === 'loading-unloading'
                      ? 'Loading Services'
                      : activeService.id === 'vehicle-transportation'
                      ? 'Vehicle Transport Services'
                      : activeService.id === 'parcel-courier'
                      ? 'Parcel Services'
                      : activeService.id === 'domestic-relocation'
                      ? 'Truck Booking Services'
                      : activeService.id === 'warehousing-storage'
                      ? 'Storage Services'
                      : activeService.name.replace(/\s*\([^)]*\)/g, '')} in {selectedCity}
                  </h1>

                  <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium drop-shadow-xs max-w-2xl">
                    {activeService.shortDescription}
                  </p>

                  {/* Quick Trust Highlights Pill Bar */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-extrabold text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 px-3 py-1.5 rounded-xl">
                      <span className="text-emerald-400">✓</span> 100% Damage-Free
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 px-3 py-1.5 rounded-xl">
                      <span className="text-amber-400">⚡</span> Instant Price Calculator
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 px-3 py-1.5 rounded-xl">
                      <span className="text-blue-400">🛡️</span> Verified Packers &amp; Movers
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Content & Booking Grid */}
            <section id="booking-section" className="py-6 sm:py-10 lg:py-12 bg-slate-50 dark:bg-transparent relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Content Section (Desktop: Left Column, Mobile & Tablet: Below Form) */}
                <div className="order-2 lg:order-1 lg:col-span-7 space-y-8 text-left mt-4 lg:mt-0">
                  
                  {/* Rich Dynamic Porter Sections */}
                  <ServicePorterContent
                    selectedCity={selectedCity}
                    activeService={activeService}
                    onSelectCity={setSelectedCity}
                    onSelectService={setActiveServiceId}
                    onOpenEnquiry={scrollToServiceForm}
                  />

                </div>

                {/* Shifting CTA Card Form (Desktop: Sticky Right Column, Mobile & Tablet: Adjacent Centered on Hero) */}
                <div id="service-card-form-container" className="order-1 lg:order-2 lg:col-span-5 -mt-16 sm:-mt-24 lg:-mt-36 relative z-20 w-full max-w-lg sm:max-w-xl mx-auto lg:max-w-none scroll-mt-24">
                  <div className="lg:sticky lg:top-24">
                    {activeService.id === 'domestic-relocation' ? (
                      <TruckBookingCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('domestic-relocation');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'office-relocation' || activeService.id === 'office-corporate-shifting' ? (
                      <OfficeShiftingCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('office-relocation');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'packing-unpacking' ? (
                      <PackingUnpackingCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('packing-unpacking');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'loading-unloading' ? (
                      <LoadingUnloadingCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('loading-unloading');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'warehousing-storage' ? (
                      <WarehousingStorageCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('warehousing-storage');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'vehicle-transportation' || activeService.id === 'vehicle-transport' ? (
                      <VehicleTransportCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('vehicle-transportation');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : activeService.id === 'parcel-courier' || activeService.id === 'parcel-transport' ? (
                      <ParcelCourierCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('parcel-courier');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    ) : (
                      <HouseShiftingCardForm
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        onOpenCityModal={() => setShowCityModal(true)}
                        onOpenEnquiryModal={() => {
                          setEnquiryModalServiceId('packers-and-movers');
                          setIsServiceEnquiryModalOpen(true);
                        }}
                        serviceName={activeService.name}
                        basePrice={activeService.basePrice}
                      />
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* Dynamic Service Specific FAQ accordions */}
            <FAQSection serviceSpecificFaqs={activeService.faq} serviceName={activeService.name} />

            {/* Mobile & Tablet Floating Sticky Shifting Price CTA Bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3 sm:px-6 pb-4 sm:pb-5 safe-bottom transition-all duration-300">
              <div className="flex items-center justify-between gap-4 max-w-xl mx-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider leading-none">Starting Rate</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">₹{activeService.basePrice.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{activeService.priceMetric}</span>
                  </div>
                </div>
                
                <button
                  id="btn-calculate-shifting-price-sticky"
                  type="button"
                  onClick={scrollToServiceForm}
                  className="flex-grow sm:flex-grow-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <span>Calculate Shifting Price</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Prominent Footer */}
      <Footer services={SERVICES_DATA} onNavigate={navigateTo} />

      {/* ==================== QUOTE SUBMISSION SUCCESS MODAL ==================== */}
      {bookingSuccess && (
        <div id="success-modal-overlay" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div id="success-modal-container" className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 dark:bg-green-950/40 rounded-full blur-2xl"></div>
            
            {/* Large Success Checkmark */}
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-green-50 dark:ring-green-950/30 animate-bounce">
              <LucideIcon name="Check" className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="text-[10px] font-bold tracking-wider uppercase bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 px-3 py-1 rounded-full">
              Inquiry Dispatched Successfully
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4 leading-snug">
              Estimate Calculated & Registered!
            </h3>

            {latestTicketId && (
              <div className="mt-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl py-2 px-4 inline-block font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                Ticket ID: {latestTicketId}
              </div>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-semibold">
              Your transparent estimate is secured. A background-verified shifting coordinator has been assigned. We will contact you at your submitted phone number within <strong>15 minutes</strong> to schedule your free physical/video inventory survey!
            </p>

            <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 p-3.5 rounded-xl text-[11px] text-teal-800 dark:text-teal-300 font-semibold leading-normal mt-5 flex gap-2 items-start text-left">
              <LucideIcon name="Shield" className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>GoDigit Shifting Guarantee:</strong> Your booking has been secured with zero hidden surcharges. Free carpenter assembly included!
              </span>
            </div>

            <div className="mt-6">
              <button
                id="btn-success-dismiss"
                onClick={() => setBookingSuccess(false)}
                className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl h-11 text-xs font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== NOBROKER SHIFTING LOAN ELIGIBILITY MODAL ==================== */}
      {showLoanModal && (
        <div id="loan-eligibility-modal" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full text-left border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setShowLoanModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>
            
            <span className="text-[10px] font-bold tracking-wider uppercase bg-brand-blue/10 dark:bg-blue-950/60 text-brand-blue dark:text-blue-400 px-3 py-1 rounded-full">
              NoBroker Co-Branded program
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 leading-snug">
              Calculate Shifting Loan Eligibility
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
              Slide to estimate your customized credit limit and monthly interest rates instantly.
            </p>

            {/* Interactive sliders */}
            <div className="my-6 space-y-4 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {/* Income slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Monthly Income</label>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">₹{loanMonthlyIncome.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="200000" 
                  step="5000"
                  value={loanMonthlyIncome}
                  onChange={(e) => setLoanMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* EMI slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Existing Monthly EMIs</label>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">₹{loanMonthlyEmi.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000"
                  value={loanMonthlyEmi}
                  onChange={(e) => setLoanMonthlyEmi(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* Output computation block */}
              {(() => {
                const maxEligible = Math.max(0, (loanMonthlyIncome * 0.5 - loanMonthlyEmi) * 15);
                const estEmi = Math.round(maxEligible * 0.022);
                return (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max Eligible Loan</span>
                      <span className="block text-xl font-bold text-brand-blue dark:text-blue-400 font-mono">₹{maxEligible.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Monthly EMI</span>
                      <span className="block text-xl font-bold text-teal-600 dark:text-teal-400 font-mono">₹{estEmi.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Submitter Application Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('loanName') as string;
                const phone = formData.get('loanPhone') as string;
                const maxEligible = Math.max(0, (loanMonthlyIncome * 0.5 - loanMonthlyEmi) * 15);
                const estEmi = Math.round(maxEligible * 0.022);
                handleApplyLoan(name, phone, maxEligible, estEmi);
              }}
              className="space-y-4 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Applicant Name</label>
                  <input 
                    type="text" 
                    name="loanName" 
                    required 
                    placeholder="Enter full name"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number</label>
                  <input 
                    type="tel" 
                    name="loanPhone" 
                    required 
                    placeholder="10-digit number"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs h-11 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                Apply For Shifting Loan →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== BECOME A DELIVERY PARTNER MODAL ==================== */}
      {showDeliveryModal && (
        <div id="delivery-partner-modal" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-left border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setShowDeliveryModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold tracking-wider uppercase bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full">
              Logistics Careers
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 leading-snug">
              Become a Packer Solutions Partner
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
              Attach your mini-truck, pickup, or bike and earn up to <span className="text-teal-600 dark:text-teal-400 font-bold">₹75,000/mo</span> with daily settlement loops!
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('partnerName') as string;
                const phone = formData.get('partnerPhone') as string;
                const city = formData.get('partnerCity') as string;
                const vehicle = formData.get('partnerVehicle') as string;
                handleRegisterPartner(name, phone, city, vehicle);
              }}
              className="space-y-4 mt-6 text-left"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Driver / Owner Name</label>
                <input 
                  type="text" 
                  name="partnerName" 
                  required 
                  placeholder="Enter full name"
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mobile Contact</label>
                <input 
                  type="tel" 
                  name="partnerPhone" 
                  required 
                  placeholder="10-digit number"
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Primary City</label>
                  <select 
                    name="partnerCity"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Vehicle Attached</label>
                  <select 
                    name="partnerVehicle"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="Tata Ace / Chota Hathi">Tata Ace</option>
                    <option value="Bolero Pickup">Bolero Pickup</option>
                    <option value="Eicher 14ft">Eicher 14ft</option>
                    <option value="Two Wheeler / Scooter">Two Wheeler</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold text-xs h-11 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                Register as Delivery Partner →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="btn-back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 bg-[#1e3a8a] hover:bg-blue-800 text-white p-3.5 rounded-full shadow-2xl cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==================== LOCATION PROMPT MODAL ==================== */}
      <LocationPromptModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          try {
            localStorage.setItem('ps_user_city', city);
            localStorage.setItem('ps_location_set', 'true');
          } catch (e) {
            console.error('LocalStorage error:', e);
          }
        }}
      />

      {/* ==================== LOGIN OTP MODAL ==================== */}
      <LoginOtpModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* ==================== SERVICE ENQUIRY MODAL (POPUP WITH SERVICE LIST & FORMS) ==================== */}
      <ServiceEnquiryModal
        isOpen={isServiceEnquiryModalOpen}
        onClose={() => setIsServiceEnquiryModalOpen(false)}
        initialServiceId={enquiryModalServiceId}
        initialCity={heroPickupInput || selectedCity}
        initialMobile={heroMobileInput}
      />
      {/* ==================== SAVED ADDRESSES MODAL ==================== */}
      <SavedAddressesModal />
      </div>
    </HelmetProvider>
  );
}
