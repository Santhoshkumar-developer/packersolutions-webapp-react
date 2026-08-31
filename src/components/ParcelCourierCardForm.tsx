import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  Zap, 
  Clock
} from 'lucide-react';
import { CITIES_DATA } from '../data/cities';
import { LocationInputSelector } from './LocationInputSelector';

const SERVICED_CITIES = ['bangalore', 'chennai', 'coimbatore', 'mumbai', 'pune', 'delhi', 'delhi ncr', 'hyderabad', 'mysore', 'kochi'];

const WEIGHT_OPTIONS = [
  { id: 'under-1kg', label: '< 1 kg', baseRate: 150, subtext: 'Light Docs / Pouch' },
  { id: '1-5kg', label: '1–5 kg', baseRate: 350, subtext: 'Small Box' },
  { id: '5-10kg', label: '5–10 kg', baseRate: 650, subtext: 'Medium Carton' },
  { id: '10plus-kg', label: '10+ kg', baseRate: 1100, subtext: 'Heavy Cargo' }
];

interface ParcelCourierCardFormProps {
  selectedCity: string;
  onSelectCity?: (city: string) => void;
  onOpenCityModal: () => void;
  onOpenLoginModal?: () => void;
  onOpenEnquiryModal?: () => void;
  serviceName?: string;
  basePrice?: number;
}

export const ParcelCourierCardForm: React.FC<ParcelCourierCardFormProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenEnquiryModal,
  serviceName = "Parcel Services",
  basePrice = 150
}) => {
  // 1. Trip Scope: 'within-city' | 'between-city'
  const [relocateType, setRelocateType] = useState<'within-city' | 'between-city'>('within-city');

  // 2. Cities
  const [destinationCity, setDestinationCity] = useState<string>('Mumbai');

  // Searchable dropdown state for within-city
  const [isWithinCityDropdownOpen, setIsWithinCityDropdownOpen] = useState(false);
  const [citySearchInput, setCitySearchInput] = useState('');
  const withinCityDropdownRef = useRef<HTMLDivElement>(null);

  // Searchable dropdown state for origin city (between-city)
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [fromCitySearch, setFromCitySearch] = useState('');
  const fromDropdownRef = useRef<HTMLDivElement>(null);

  // Searchable dropdown state for destination city (between-city)
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [toCitySearch, setToCitySearch] = useState('');
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // 3. Location fields: Pickup & Delivery
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');

  // 4. "What are you sending?" fields:
  // Approximate Weight: < 1 kg | 1–5 kg | 5–10 kg | 10+ kg
  const [selectedWeight, setSelectedWeight] = useState<string>('under-1kg');

  // Number of Parcels: − 1 +
  const [parcelCount, setParcelCount] = useState<number>(1);

  // Validation error state
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Outside click listener for city dropdowns
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (withinCityDropdownRef.current && !withinCityDropdownRef.current.contains(target)) {
        setIsWithinCityDropdownOpen(false);
      }
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(target)) {
        setIsFromDropdownOpen(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(target)) {
        setIsToDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Calculate dynamic starting price
  const calculatePrice = () => {
    const weightObj = WEIGHT_OPTIONS.find(w => w.id === selectedWeight) || WEIGHT_OPTIONS[0];
    let unitRate = weightObj.baseRate;
    if (relocateType === 'between-city') {
      unitRate = Math.round(unitRate * 1.8);
    }
    return unitRate * parcelCount;
  };

  const handleGetEstimate = () => {
    if (!pickupLocation.trim()) {
      setErrorMessage('Please enter your pickup location address');
      return;
    }
    if (!deliveryLocation.trim()) {
      setErrorMessage('Please enter the delivery destination address');
      return;
    }
    setErrorMessage('');

    const calculatedPrice = calculatePrice();
    const parcelBookingData = {
      bookingType: 'parcel-courier',
      relocateType,
      weightCategory: selectedWeight,
      parcelCount,
      originCity: selectedCity,
      destinationCity: relocateType === 'between-city' ? destinationCity : selectedCity,
      pickupLocation,
      deliveryLocation,
      estimatedPrice: calculatedPrice
    };

    localStorage.setItem('ps_parcel_booking_draft', JSON.stringify(parcelBookingData));
    localStorage.setItem('ps_house_shifting_draft', JSON.stringify({
      relocateType,
      originCity: selectedCity,
      destinationCity: relocateType === 'between-city' ? destinationCity : selectedCity,
      houseSize: `Parcel: ${parcelCount} item${parcelCount > 1 ? 's' : ''} (${selectedWeight})`,
      pickupLoc: pickupLocation,
      dropLoc: deliveryLocation,
      shiftingDate: new Date().toISOString().split('T')[0]
    }));

    if (onOpenEnquiryModal) {
      onOpenEnquiryModal();
    } else if (onOpenLoginModal) {
      onOpenLoginModal();
    }
  };

  return (
    <div id="parcel-courier-form" className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-visible relative p-3.5 sm:p-4.5 space-y-2.5 sm:space-y-3 text-left transition-all w-full max-w-lg sm:max-w-xl mx-auto lg:max-w-none scroll-mt-24">
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 bg-gradient-to-r from-[#001261] via-[#0321a1] to-blue-600 rounded-b-full" />

      {/* Header */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-[#001261] dark:text-blue-300">
            <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
            <span>Express Doorstep Pickup</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Book {serviceName}
          </h3>
        </div>

        {/* Starting Fare Tag */}
        <div className="text-right shrink-0">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Est. Fare</span>
          <span className="text-base sm:text-lg font-black text-[#001261] dark:text-blue-400 font-mono">
            ₹{calculatePrice().toLocaleString()}
          </span>
        </div>
      </div>

      {/* 1. TOGGLE: Trip Scope (Within City / Between City) */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Delivery Scope
        </label>
        
        <div className="bg-slate-100 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setRelocateType('within-city')}
            className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              relocateType === 'within-city'
                ? 'bg-[#001261] text-white shadow-xs border border-[#001261]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className={`w-3 h-3 ${relocateType === 'within-city' ? 'text-white' : 'text-blue-900 dark:text-blue-400'}`} />
            <span>Within City (Same Day)</span>
          </button>

          <button
            type="button"
            onClick={() => setRelocateType('between-city')}
            className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              relocateType === 'between-city'
                ? 'bg-[#001261] text-white shadow-xs border border-[#001261]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className={`w-3 h-3 ${relocateType === 'between-city' ? 'text-white' : 'text-blue-900 dark:text-blue-400'}`} />
            <span>Between City (Intercity)</span>
          </button>
        </div>
      </div>

      {/* 2. CITY SELECTION DROPDOWN */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          {relocateType === 'within-city' ? 'Current Hub / City:' : 'Origin & Destination Cities:'}
        </label>

        {relocateType === 'within-city' ? (
          <div ref={withinCityDropdownRef} className="relative z-30">
            <div
              onClick={() => setIsWithinCityDropdownOpen(!isWithinCityDropdownOpen)}
              className="w-full flex items-center justify-between p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer group text-left shadow-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-0.5">Pickup City:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {selectedCity}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Express Available
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-[#001261] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800 group-hover:bg-[#001261] group-hover:text-white transition-all">
                <span>Change</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isWithinCityDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isWithinCityDropdownOpen && (
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
                          setIsWithinCityDropdownOpen(false);
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
                            Express
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
        ) : (
          /* Between City - Dual Dropdowns */
          <div className="grid grid-cols-2 gap-1.5 relative z-30">
            {/* Origin City */}
            <div ref={fromDropdownRef} className="relative">
              <div
                onClick={() => {
                  setIsFromDropdownOpen(!isFromDropdownOpen);
                  setIsToDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    <MapPin className="w-3 h-3 text-[#001261] dark:text-blue-400" />
                  </div>
                  <div className="truncate">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none">From:</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                      {selectedCity}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${isFromDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isFromDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search origin..."
                      value={fromCitySearch}
                      onChange={(e) => setFromCitySearch(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(fromCitySearch.toLowerCase())).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          if (onSelectCity) onSelectCity(c.name);
                          setIsFromDropdownOpen(false);
                          setFromCitySearch('');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Destination City */}
            <div ref={toDropdownRef} className="relative">
              <div
                onClick={() => {
                  setIsToDropdownOpen(!isToDropdownOpen);
                  setIsFromDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none">To:</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                      {destinationCity}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${isToDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isToDropdownOpen && (
                <div className="absolute top-full right-0 w-64 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search destination..."
                      value={toCitySearch}
                      onChange={(e) => setToCitySearch(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(toCitySearch.toLowerCase())).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setDestinationCity(c.name);
                          setIsToDropdownOpen(false);
                          setToCitySearch('');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. PICKUP AND DELIVERY ADDRESS (Truck Booking connected style with Parcel titles) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Pickup &amp; Delivery Address
          </label>
          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">Doorstep Dispatch</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 sm:p-2.5 space-y-1.5 relative">
          {/* Visual Route Connector Axis (Left Line with Markers) */}
          <div className="flex items-center gap-2.5">
            {/* Left Marker Column */}
            <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
              {/* Pickup Marker */}
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs" title="Where are you sending from?">
                <MapPin className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Dotted Line Connector */}
              <div className="w-0.5 h-5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 my-0.5" />

              {/* Delivery Marker */}
              <div className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs" title="Where should we deliver?">
                <MapPin className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400" />
              </div>
            </div>

            {/* Input Fields Column */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <LocationInputSelector
                value={pickupLocation}
                onChange={(val) => setPickupLocation(val)}
                placeholder="Where are you sending from? (Pickup address, locality or pincode)"
                type="pickup"
                serviceId="parcel-courier"
                cityContext={selectedCity}
              />

              <LocationInputSelector
                value={deliveryLocation}
                onChange={(val) => setDeliveryLocation(val)}
                placeholder="Where should we deliver? (Delivery address, recipient area or pincode)"
                type="drop"
                serviceId="parcel-courier"
                cityContext={relocateType === 'between-city' ? destinationCity : selectedCity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. ADDITIONAL FIELDS: WHAT ARE YOU SENDING? */}
      <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 block">
            What are you sending?
          </label>
          <span className="text-[9px] font-bold text-slate-400">Package Weight &amp; Count</span>
        </div>

        {/* Approximate Weight + Number of Parcels (Side-by-side or stacked cleanly) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* Approximate Weight (Takes 2 cols on tablet/desktop) */}
          <div className="sm:col-span-2 space-y-1">
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block">
              Approximate Weight
            </span>
            <div className="grid grid-cols-4 gap-1">
              {WEIGHT_OPTIONS.map((w) => {
                const isSelected = selectedWeight === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWeight(w.id)}
                    className={`py-1.5 px-1 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-700 dark:text-blue-300 shadow-2xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span className="block leading-tight font-extrabold">{w.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Parcels: − 1 + */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block truncate">
              Number of Parcels
            </span>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setParcelCount(Math.max(1, parcelCount - 1))}
                disabled={parcelCount <= 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>

              <span className="text-xs font-black text-slate-900 dark:text-white px-2 font-mono">
                {parcelCount}
              </span>

              <button
                type="button"
                onClick={() => setParcelCount(Math.min(50, parcelCount + 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-950/80 text-[#001261] dark:text-blue-300 hover:bg-[#001261] hover:text-white transition-all cursor-pointer font-bold"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
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
          <span>Calculate Courier Price &amp; Book</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>

        <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1">
          <Clock className="w-2.5 h-2.5 text-blue-500" />
          <span>Doorstep Pickup in 30–45 Mins • Live GPS Link • OTP Delivery</span>
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
          <span>Tamper-Proof Pouch</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-[#001261] dark:text-blue-400 shrink-0" />
          <span>20,000+ Pin Codes Covered</span>
        </div>
      </div>

    </div>
  );
};
