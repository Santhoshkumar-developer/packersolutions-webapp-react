import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  User, 
  Phone, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Search, 
  Warehouse,
  Boxes,
  Lock
} from 'lucide-react';
import { CITIES_DATA } from '../data/cities';
import { LocationInputSelector } from './LocationInputSelector';

const SERVICED_CITIES = ['bangalore', 'chennai', 'coimbatore', 'mumbai', 'pune', 'delhi', 'delhi ncr', 'hyderabad', 'mysore', 'kochi'];

const DURATION_OPTIONS = [
  { id: '1-month', label: '1 Month', durationType: 'short-term', badge: 'Standard' },
  { id: '3-months', label: '3 Months', durationType: 'short-term', badge: '5% Off' },
  { id: '6-months', label: '6 Months', durationType: 'long-term', badge: '15% Off' },
  { id: '12-months', label: '1+ Year', durationType: 'long-term', badge: '25% Off' }
];

interface WarehousingStorageCardFormProps {
  selectedCity: string;
  onSelectCity?: (city: string) => void;
  onOpenCityModal: () => void;
  onOpenLoginModal: () => void;
  onOpenEstimateModal?: () => void;
  serviceName?: string;
  basePrice?: number;
}

export const WarehousingStorageCardForm: React.FC<WarehousingStorageCardFormProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenEstimateModal,
  serviceName = "Warehousing & Storage",
  basePrice = 3000
}) => {
  // 1. Storage Requirement state: 'short-term' | 'long-term' + selected duration
  const [storageRequirement, setStorageRequirement] = useState<'short-term' | 'long-term'>('short-term');
  const [selectedDuration, setSelectedDuration] = useState<string>('1-month');

  // 2. Location state: City Dropdown & Street/Area input
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchInput, setCitySearchInput] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const [locationAddress, setLocationAddress] = useState<string>('');

  // 3. Contact Person state
  const [contactPerson, setContactPerson] = useState<string>('');

  // 4. Contact No state
  const [contactNo, setContactNo] = useState<string>('');

  // Validation error state
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Outside click listener for city dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const calculateDisplayPrice = () => {
    if (storageRequirement === 'long-term') {
      // Long-term monthly discounted rate
      return `₹${Math.round(basePrice * 0.85).toLocaleString()}/mo`;
    }
    return `₹${basePrice.toLocaleString()}/mo`;
  };

  const handleGetEstimate = () => {
    if (contactNo && contactNo.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit contact number');
      return;
    }
    setErrorMessage('');

    // Save selected form state to localStorage for seamless estimation
    const storageBookingData = {
      bookingType: 'warehousing-storage',
      serviceName,
      storageRequirement,
      selectedDuration,
      city: selectedCity,
      location: locationAddress || `${selectedCity} Central Warehouse Hub`,
      contactPerson: contactPerson || 'Valued Customer',
      contactNo: contactNo || '',
      estimatedMonthlyPrice: storageRequirement === 'long-term' ? Math.round(basePrice * 0.85) : basePrice
    };
    localStorage.setItem('ps_storage_booking_draft', JSON.stringify(storageBookingData));
    localStorage.setItem('ps_house_shifting_draft', JSON.stringify({
      relocateType: 'within-city',
      originCity: selectedCity,
      destinationCity: selectedCity,
      houseSize: `Warehousing Storage (${storageRequirement.toUpperCase()})`,
      pickupLoc: locationAddress || `${selectedCity} Central`,
      dropLoc: `${selectedCity} Secure Warehouse Vault`,
      shiftingDate: new Date().toISOString().split('T')[0]
    }));

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('ps_user_logged_in') === 'true';
    if (!isLoggedIn) {
      onOpenLoginModal();
    } else if (onOpenEstimateModal) {
      onOpenEstimateModal();
    } else {
      onOpenLoginModal();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-visible relative p-3.5 sm:p-4.5 space-y-2.5 sm:space-y-3 text-left transition-all w-full max-w-lg sm:max-w-xl mx-auto lg:max-w-none">
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 bg-gradient-to-r from-[#001261] via-[#0321a1] to-blue-600 rounded-b-full" />

      {/* Header */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-[#001261] dark:text-blue-300">
            <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
            <span>24/7 CCTV &amp; Pest-Controlled Vaults</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Book {serviceName}
          </h3>
        </div>

        {/* Starting Fare Tag */}
        <div className="text-right shrink-0">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Starts from</span>
          <span className="text-base sm:text-lg font-black text-[#001261] dark:text-blue-400 font-mono">
            {calculateDisplayPrice()}
          </span>
        </div>
      </div>

      {/* 1. FIELD: STORAGE REQUIREMENT (Short-term / Long-term) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            1. Storage Requirement
          </label>
          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">
            {storageRequirement === 'short-term' ? 'Flexible Weekly/Monthly' : 'Long-Term Discount'}
          </span>
        </div>
        
        {/* Toggle between Short-term and Long-term */}
        <div className="bg-slate-100 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => {
              setStorageRequirement('short-term');
              setSelectedDuration('1-month');
            }}
            className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              storageRequirement === 'short-term'
                ? 'bg-[#001261] text-white shadow-xs border border-[#001261]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Boxes className={`w-3 h-3 ${storageRequirement === 'short-term' ? 'text-white' : 'text-blue-900 dark:text-blue-400'}`} />
            <span>Short-term (1–3 Mos)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStorageRequirement('long-term');
              setSelectedDuration('6-months');
            }}
            className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              storageRequirement === 'long-term'
                ? 'bg-[#001261] text-white shadow-xs border border-[#001261]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Warehouse className={`w-3 h-3 ${storageRequirement === 'long-term' ? 'text-white' : 'text-blue-900 dark:text-blue-400'}`} />
            <span>Long-term (6+ Mos)</span>
          </button>
        </div>

        {/* Duration Chips Selector */}
        <div className="grid grid-cols-4 gap-1 pt-0.5">
          {DURATION_OPTIONS.map((opt) => {
            const isSelected = selectedDuration === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setSelectedDuration(opt.id);
                  setStorageRequirement(opt.durationType as 'short-term' | 'long-term');
                }}
                className={`py-1 px-1 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-700 dark:text-blue-300 shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="leading-tight">{opt.label}</div>
                <span className={`text-[8px] font-extrabold block leading-none mt-0.5 ${
                  isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                }`}>
                  {opt.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. FIELD: LOCATION */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          2. Location (Pickup / Storage City)
        </label>

        {/* City Selector Dropdown */}
        <div ref={cityDropdownRef} className="relative z-30 mb-1.5">
          <div
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            className="w-full flex items-center justify-between p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer group text-left shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                <Warehouse className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-0.5">Warehouse Location:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                    {selectedCity}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    Vault Available
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-[#001261] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800 group-hover:bg-[#001261] group-hover:text-white transition-all">
              <span>Change</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* City Dropdown Menu */}
          {isCityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={citySearchInput}
                  onChange={(e) => setCitySearchInput(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {CITIES_DATA.filter(c => c.name.toLowerCase().includes(citySearchInput.toLowerCase())).map((c) => {
                  const isServiced = SERVICED_CITIES.includes(c.name.toLowerCase());
                  const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        if (onSelectCity) onSelectCity(c.name);
                        setIsCityDropdownOpen(false);
                        setCitySearchInput('');
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer ${
                        isSelected ? 'text-blue-600 font-bold bg-blue-50/60 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                        {c.name}
                      </span>
                      {isServiced ? (
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">
                          Serviced
                        </span>
                      ) : (
                        <span className="text-[9px] font-medium text-slate-400">
                          Available
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Address / Pickup Locality Textbox */}
        <div className="relative flex items-center">
          <LocationInputSelector
            value={locationAddress}
            onChange={(val) => setLocationAddress(val)}
            placeholder="Enter Goods pickup address, apartment, flat or area"
            type="pickup"
            serviceId="warehousing-storage"
            cityContext={selectedCity}
          />
        </div>
      </div>

      {/* 3 & 4. FIELDS: CONTACT PERSON & CONTACT NO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Contact Person */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            3. Contact Person
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
            </div>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-8 pr-2.5 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Contact No */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            4. Contact No
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
            </div>
            <span className="absolute left-7.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value.replace(/\D/g, ''))}
              placeholder="Mobile number"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-15 pr-2.5 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
          {errorMessage}
        </p>
      )}

      {/* GET ESTIMATE & BOOK BUTTON */}
      <div className="pt-1 space-y-1.5">
        <button
          type="button"
          onClick={handleGetEstimate}
          className="w-full bg-gradient-to-r from-[#001261] via-[#0321a1] to-blue-800 hover:from-[#000d47] hover:to-blue-900 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 rounded-xl shadow-md shadow-blue-950/20 hover:shadow-blue-950/40 transition-all cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>Calculate Storage Price &amp; Reserve</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>

        <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1">
          <Lock className="w-2.5 h-2.5 text-emerald-500" />
          <span>Moisture-Free Pallets • Biometric &amp; CCTV Vault • Free Transit Pickup</span>
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
          <span>Fire &amp; Pest Insured</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-[#001261] dark:text-blue-400 shrink-0" />
          <span>Flexible Monthly Renewal</span>
        </div>
      </div>

    </div>
  );
};

