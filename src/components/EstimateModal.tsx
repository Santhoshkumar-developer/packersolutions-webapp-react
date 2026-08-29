import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ChevronDown, Check, ArrowRight, ArrowLeft, Send, CheckCircle2, ShieldCheck, Clock, HelpCircle, Phone, Mail, User, Calendar, Shield, Home, Truck, Building } from 'lucide-react';
import { CITIES_DATA } from '../data/cities';
import { SERVICES_DATA } from '../data/services';
import { apiService } from '../services/api';
import { ServiceItem } from '../types';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity?: string;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  defaultCity = 'Bangalore',
}) => {
  // Navigation / multi-step state
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  
  // Selection States
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [activeServiceId, setActiveServiceId] = useState<'packers-and-movers' | 'household-shifting' | 'domestic-relocation' | 'office-relocation'>('packers-and-movers');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  
  // Dynamic requirement fields (stored as key-value pairs)
  const [details, setDetails] = useState<Record<string, string>>({});
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [movingDate, setMovingDate] = useState('');
  
  // Utilities
  const [estimatedCost, setEstimatedCost] = useState(4500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Filter service items to match our three main buttons
  const mainServices = useMemo(() => {
    return SERVICES_DATA.filter(service => 
      ['packers-and-movers', 'household-shifting', 'domestic-relocation', 'office-relocation'].includes(service.id)
    );
  }, []);

  const activeService = useMemo(() => {
    return SERVICES_DATA.find(s => s.id === activeServiceId) || SERVICES_DATA[0];
  }, [activeServiceId]);

  // Set default details when active service changes
  useEffect(() => {
    const initialDetails: Record<string, string> = {};
    if (activeService && activeService.formFields) {
      activeService.formFields.forEach(field => {
        if (field.type === 'select' && field.options && field.options.length > 0) {
          initialDetails[field.name] = field.options[0];
        } else {
          initialDetails[field.name] = '';
        }
      });
    }
    setDetails(initialDetails);
    setErrorMsg('');
  }, [activeServiceId, activeService]);

  // Reset modal on close/open transitions
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedCity(defaultCity);
      setActiveServiceId('packers-and-movers');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setMovingDate('');
      setErrorMsg('');
    }
  }, [isOpen, defaultCity]);

  // Handle outside click for city dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Live Cost Estimation Calculator
  useEffect(() => {
    let cost = activeService.basePrice;

    if (activeServiceId === 'packers-and-movers' || activeServiceId === 'household-shifting') {
      const size = details['apartmentSize'];
      if (size === '2 BHK Apartment') cost += 2500;
      else if (size === '3 BHK Apartment') cost += 5000;
      else if (size === '4+ BHK / Villa') cost += 9000;
      else if (size === 'Few Household Items Only') cost -= 1500;

      const originElevator = details['hasOriginElevator'];
      const destElevator = details['hasDestinationElevator'];
      const originFlr = details['originFloor'];
      const destFlr = details['destinationFloor'];

      let floorMultiplier = 0;
      const extractFloor = (flrStr: string) => {
        if (!flrStr || flrStr.includes('Ground')) return 0;
        const match = flrStr.match(/\d+/);
        return match ? parseInt(match[0]) : 1;
      };

      if (originElevator === 'No, stairs only') {
        floorMultiplier += extractFloor(originFlr) * 400;
      }
      if (destElevator === 'No, stairs only') {
        floorMultiplier += extractFloor(destFlr) * 400;
      }
      cost += floorMultiplier;

      const distance = parseFloat(details['approxDistance']) || 0;
      if (distance > 10) {
        cost += (distance - 10) * 45;
      }
    } 
    else if (activeServiceId === 'domestic-relocation') {
      const size = details['houseSize'];
      if (size === '2 BHK Apartment') cost += 5500;
      else if (size === '3 BHK Apartment') cost += 11000;
      else if (size === '4+ BHK / Villa') cost += 18000;
      else if (size === 'Few Cartons / Box Shipment Only') cost -= 4000;

      const vehicle = details['needsVehicleTransport'];
      if (vehicle === 'Yes, transport Bike as well') cost += 4500;
      else if (vehicle === 'Yes, transport Car as well') cost += 9500;
      else if (vehicle === 'Yes, both Car & Bike') cost += 13500;

      const insurance = details['insuranceNeeded'];
      if (insurance === 'Yes, protect my goods (Recommended)') {
        cost += 1500;
      }
    } 
    else if (activeServiceId === 'office-relocation') {
      const size = details['officeSize'] || '';
      if (size.includes('Startup Office')) cost = 9999;
      else if (size.includes('Small Corporate Office')) cost = 18999;
      else if (size.includes('Medium Office')) cost = 21999;
      else if (size.includes('Large Corporate Office')) cost = 29999;
      else if (size.includes('IT Office')) cost = 24999;
      else if (size.includes('Call Center / BPO')) cost = 34999;
      else if (size.includes('Showroom / Retail Store')) cost = 26999;
      else if (size.includes('Warehouse Office')) cost = 39999;
      else if (size.includes('Corporate Head Office')) cost = 49999;
      else cost = 8999;

      const scope = details['shiftingScope'];
      if (scope && scope.includes('Between City')) {
        cost += 12000;
      }

      const server = details['hasServerRoom'];
      if (server && server.includes('Yes')) {
        cost += 8000;
      }
    }

    setEstimatedCost(Math.max(cost, 1000));
  }, [details, activeServiceId, activeService]);

  const handleDetailChange = (fieldName: string, value: string) => {
    setDetails(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const filteredCities = useMemo(() => {
    return CITIES_DATA.filter(city => 
      city.name.toLowerCase().includes(citySearchQuery.toLowerCase())
    );
  }, [citySearchQuery]);

  const validateStep1 = () => {
    if (!selectedCity) {
      setErrorMsg('Please select your shifting city.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    for (const field of activeService.formFields) {
      if (field.required && !details[field.name]) {
        setErrorMsg(`Please specify: ${field.label}`);
        return false;
      }
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!movingDate) {
      setErrorMsg('Please choose your preferred moving date.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await apiService.createBooking({
        serviceId: activeServiceId,
        serviceName: activeService.name,
        customerName,
        customerEmail,
        customerPhone,
        date: movingDate,
        details: {
          ...details,
          shiftingFromCity: selectedCity
        },
        estimatedCost
      });
      setIsSubmitting(false);
      setStep('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while submitting. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs cursor-pointer"
          id="modal-backdrop"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200/80 dark:border-slate-800 w-full max-w-2xl overflow-hidden relative z-10 flex flex-col my-auto"
          id="estimate-modal-window"
        >
          {/* Top Decorative Brand Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 shrink-0" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer z-20 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress Indicator (Omit on success step) */}
          {step !== 'success' && (
            <div className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-orange-600 bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400 px-2.5 py-1 rounded-full uppercase">
                  Live Quotation Engine
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Step {step} of 3
                </span>
              </div>
              
              {/* Stepper Dots */}
              <div className="flex gap-2">
                <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-6 bg-orange-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} />
                <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-6 bg-orange-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} />
                <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-6 bg-orange-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} />
              </div>
            </div>
          )}

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 max-h-[75vh]">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5"
                id="modal-error-banner"
              >
                <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* ================= STEP 1: CITY & SERVICE SELECTION ================= */}
            {step === 1 && (
              <div className="space-y-6" id="modal-step-1">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                    Tell us where & what you are moving
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                    Select your current city and select one of our premium, 5-star rated shifting options.
                  </p>
                </div>

                {/* Shifting City Selector */}
                <div className="space-y-2 relative" ref={cityDropdownRef}>
                  <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                    1. Select Shifting City
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 flex items-center justify-between text-left cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm focus:ring-2 focus:ring-orange-400"
                    id="modal-city-trigger"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {selectedCity || 'Choose your City'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options Box */}
                  <AnimatePresence>
                    {isCityDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 overflow-hidden flex flex-col max-h-56"
                        id="modal-city-dropdown"
                      >
                        {/* Search field */}
                        <div className="p-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
                          <input
                            type="text"
                            placeholder="Search shifting city..."
                            value={citySearchQuery}
                            onChange={(e) => setCitySearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none border border-slate-100 dark:border-slate-800 focus:border-slate-200"
                          />
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto flex-1 p-1 grid grid-cols-2 gap-1">
                          {filteredCities.map((city) => {
                            const isChosen = selectedCity === city.name;
                            return (
                              <button
                                key={city.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCity(city.name);
                                  setIsCityDropdownOpen(false);
                                  setCitySearchQuery('');
                                }}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                                  isChosen
                                    ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 border border-transparent'
                                }`}
                              >
                                <span>{city.name}</span>
                                {isChosen && <Check className="w-3.5 h-3.5 text-orange-500" />}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service Selection Three Buttons */}
                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                    2. Select Logistics Service Channel
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="service-three-buttons">
                    {/* Button 1: Household Local */}
                    <button
                      type="button"
                      onClick={() => setActiveServiceId('packers-and-movers')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer group ${
                        activeServiceId === 'packers-and-movers' || activeServiceId === 'household-shifting'
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        activeServiceId === 'packers-and-movers' || activeServiceId === 'household-shifting'
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200'
                      }`}>
                        <Home className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-100">
                          Within City
                        </span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 line-clamp-1">
                          Local home shifting
                        </span>
                      </div>
                    </button>

                    {/* Button 2: Inter-city Domestic */}
                    <button
                      type="button"
                      onClick={() => setActiveServiceId('domestic-relocation')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer group ${
                        activeServiceId === 'domestic-relocation'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        activeServiceId === 'domestic-relocation'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200'
                      }`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-100">
                          Truck Booking
                        </span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 line-clamp-1">
                          Mini & Heavy Goods Vehicles
                        </span>
                      </div>
                    </button>

                    {/* Button 3: Office Relocation */}
                    <button
                      type="button"
                      onClick={() => setActiveServiceId('office-relocation')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer group ${
                        activeServiceId === 'office-relocation'
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        activeServiceId === 'office-relocation'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200'
                      }`}>
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-100">
                          Office Shifting
                        </span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 line-clamp-1">
                          Corporate & servers
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Mini Trust Badges */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex gap-2.5 items-start">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Secure Shifting</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                        Multi-layer wrapping with free dismantling and reassembly.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">On-Time Execution</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                        Instant slot booking and dedicated coordinator support.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Action Bar */}
                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) {
                        setStep(2);
                      }
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all group"
                  >
                    Proceed with Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: DYNAMIC SPECIFY REQUIREMENTS ================= */}
            {step === 2 && (
              <div className="space-y-6" id="modal-step-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      Specify Requirements
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                      Configure your shifting specs to get a transparent dynamic quote instantly.
                    </p>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeService.formFields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        {field.label}
                        {field.required && <span className="text-red-500 font-bold">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          value={details[field.name] || ''}
                          onChange={(e) => handleDetailChange(field.name, e.target.value)}
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer"
                        >
                          {field.options?.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={details[field.name] || ''}
                          onChange={(e) => handleDetailChange(field.name, e.target.value)}
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Live Cost Output Ticker Box */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black text-white p-5 rounded-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold text-orange-400 tracking-widest uppercase bg-orange-500/15 px-2.5 py-1 rounded-full border border-orange-500/10">
                        Estimated Shifting Price
                      </span>
                      <h4 className="text-xs font-bold text-slate-300 mt-2">
                        Transparent base tariff index
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-semibold block font-mono">INR (₹)</span>
                      <span className="text-2xl font-extrabold text-orange-400 font-mono">
                        ₹{estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Bar */}
                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep2()) {
                        setStep(3);
                      }
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all group"
                  >
                    Confirm & Proceed
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: CUSTOMER CONTACT DETAILS ================= */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6" id="modal-step-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      Contact & Scheduling Details
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                      Enter your coordinates so our verified team can contact you for the survey.
                    </p>
                  </div>
                </div>

                {/* Input Elements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Santhosh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g., santhosh@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500 font-extrabold text-sm select-none font-sans">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={customerPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setCustomerPhone(val);
                        }}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl pl-12 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono"
                      />
                    </div>
                  </div>

                  {/* Moving Date */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Preferred Moving Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={movingDate}
                        onChange={(e) => setMovingDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimate Summary Invoice Card */}
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 text-left">
                  <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-3.5">
                    Quotation Estimate Breakdown
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold font-sans">
                    <div className="flex justify-between">
                      <span>Logistics Core Base rate ({activeService.name})</span>
                      <span className="font-mono text-slate-700 dark:text-slate-200">
                        ₹{activeService.basePrice.toLocaleString()}
                      </span>
                    </div>
                    {Object.entries(details).map(([key, val]) => {
                      if (!val || key.toLowerCase().includes('address') || key.toLowerCase().includes('model')) return null;
                      return (
                        <div key={key} className="flex justify-between border-t border-dashed border-slate-200 dark:border-slate-800/80 pt-1.5">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')} ({val})</span>
                          <span className="text-slate-600 dark:text-slate-400 font-mono">Included</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2.5 text-slate-800 dark:text-slate-100 font-bold text-sm">
                      <span>Total Secure Estimate</span>
                      <span className="text-orange-600 dark:text-orange-400 font-mono">
                        ₹{estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* GoDigit Shifting Protection */}
                <div className="flex gap-2.5 p-3.5 bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 text-teal-800 dark:text-teal-400 rounded-2xl text-[11px] font-semibold leading-relaxed text-left">
                  <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>GoDigit Protection:</strong> Full damage cover, transit security, and zero-liability cancellation policies apply.
                  </div>
                </div>

                {/* Submit button bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    Modify details
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all flex items-center gap-2 cursor-pointer ${
                      isSubmitting ? 'opacity-80 cursor-wait' : ''
                    }`}
                    id="modal-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Submit Quote Enquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ================= STEP SUCCESS: POPUP ENQUIRY REGISTERED ================= */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-4 text-center space-y-6 flex flex-col items-center"
                id="modal-step-success"
              >
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                    Enquiry Registered!
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bold max-w-md mx-auto leading-relaxed">
                    Our team will contact you shortly to schedule your physical or video inventory assessment.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 max-w-md w-full space-y-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-300">Shifting City</span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedCity}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-300">Chosen Service</span>
                    <span className="text-slate-600 dark:text-slate-400">{activeService.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-300">Contact Number</span>
                    <span className="text-slate-600 dark:text-slate-400 font-mono">+91 {customerPhone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-300">Target Moving Date</span>
                    <span className="text-slate-600 dark:text-slate-400 font-mono">{movingDate}</span>
                  </div>
                </div>

                <div className="pt-4 w-full max-w-xs">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-3.5 rounded-2xl cursor-pointer transition-all shadow-sm"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
