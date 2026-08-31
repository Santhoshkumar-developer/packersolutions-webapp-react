import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Truck, ChevronDown, ArrowRight, ShieldCheck, Sparkles, Check, Search, Zap } from 'lucide-react';
import { CITIES_DATA } from '../data/cities';
import { LocationInputSelector } from './LocationInputSelector';

const SERVICED_CITIES = ['bangalore', 'chennai', 'coimbatore', 'mumbai', 'pune', 'delhi', 'delhi ncr', 'hyderabad', 'mysore', 'kochi'];

interface TruckBookingCardFormProps {
  selectedCity: string;
  onSelectCity?: (city: string) => void;
  onOpenCityModal: () => void;
  onOpenLoginModal: () => void;
  onOpenEstimateModal?: () => void;
  serviceName?: string;
  basePrice?: number;
}

export const TruckBookingCardForm: React.FC<TruckBookingCardFormProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenEstimateModal,
  serviceName = "Truck Booking Services",
  basePrice = 850
}) => {
  // 1. Relocate type toggle state: 'within-city' | 'between-city'
  const [relocateType, setRelocateType] = useState<'within-city' | 'between-city'>('within-city');
  
  // 2. Cities
  const [destinationCity, setDestinationCity] = useState<string>('Bangalore');

  // Searchable dropdown state (identical to Locations page)
  const [isWithinCityDropdownOpen, setIsWithinCityDropdownOpen] = useState(false);
  const [citySearchInput, setCitySearchInput] = useState('');
  const withinCityDropdownRef = useRef<HTMLDivElement>(null);

  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [fromCitySearch, setFromCitySearch] = useState('');
  const fromDropdownRef = useRef<HTMLDivElement>(null);

  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [toCitySearch, setToCitySearch] = useState('');
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // 3. Pickup & Drop Locations
  const [pickupLoc, setPickupLoc] = useState<string>('');
  const [dropLoc, setDropLoc] = useState<string>('');

  // Outside click listeners for dropdowns
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

  const calculatedBasePrice = relocateType === 'between-city' ? 4500 : basePrice;

  const handleGetEstimate = () => {
    // Save selected form state to localStorage for seamless estimation
    const truckBookingData = {
      bookingType: 'truck-hire',
      relocateType,
      originCity: selectedCity,
      destinationCity: relocateType === 'between-city' ? destinationCity : selectedCity,
      pickupLoc,
      dropLoc,
      estimatedPrice: calculatedBasePrice
    };
    localStorage.setItem('ps_truck_booking_draft', JSON.stringify(truckBookingData));

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
            <span>Instant Truck Dispatch</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Book {serviceName}
          </h3>
        </div>

        {/* Starting Fare Tag */}
        <div className="text-right shrink-0">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Starts from</span>
          <span className="text-base sm:text-lg font-black text-[#001261] dark:text-blue-400 font-mono">
            ₹{calculatedBasePrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 1. TOGGLE: Trip Scope (Within City / Between City) */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Trip Scope
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
            <span>Within City</span>
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
            <Truck className={`w-3 h-3 ${relocateType === 'between-city' ? 'text-white' : 'text-blue-900 dark:text-blue-400'}`} />
            <span>Between City</span>
          </button>
        </div>
      </div>

      {/* 2. CITY SELECTION DROPDOWN (Locations page style) */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          {relocateType === 'within-city' ? 'Current Location:' : 'Origin & Destination Cities:'}
        </label>

        {relocateType === 'within-city' ? (
          /* Single City Selector Dropdown */
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
                  <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-0.5">Current Location:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {selectedCity}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Active
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
                        className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
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
        ) : (
          /* Between City Dual Selector */
          <div className="grid grid-cols-2 gap-1.5">
            {/* From City Dropdown */}
            <div ref={fromDropdownRef} className="relative z-30">
              <button
                type="button"
                onClick={() => {
                  setIsFromDropdownOpen(!isFromDropdownOpen);
                  setIsToDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 transition-all cursor-pointer text-left shadow-xs"
              >
                <div className="min-w-0 pr-1">
                  <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none mb-0.5">From (Origin)</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate block">{selectedCity}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${isFromDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFromDropdownOpen && (
                <div className="absolute top-full left-0 w-52 sm:w-60 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search origin city..."
                      value={fromCitySearch}
                      onChange={(e) => setFromCitySearch(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-44 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(fromCitySearch.toLowerCase())).map((c) => {
                      const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
                      const isServiced = SERVICED_CITIES.includes(c.name.toLowerCase());
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            if (onSelectCity) onSelectCity(c.name);
                            setIsFromDropdownOpen(false);
                            setFromCitySearch('');
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                            isSelected ? 'text-blue-600 font-bold bg-blue-50/60 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {c.name}
                          </span>
                          {isServiced && (
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full shrink-0">
                              Serviced
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* To City Dropdown */}
            <div ref={toDropdownRef} className="relative z-30">
              <button
                type="button"
                onClick={() => {
                  setIsToDropdownOpen(!isToDropdownOpen);
                  setIsFromDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer text-left shadow-xs"
              >
                <div className="min-w-0 pr-1">
                  <span className="text-[8px] text-slate-400 font-bold uppercase block leading-none mb-0.5">To (Destination)</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate block">{destinationCity}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${isToDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToDropdownOpen && (
                <div className="absolute top-full right-0 w-52 sm:w-60 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
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
                  <div className="max-h-44 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(toCitySearch.toLowerCase())).map((c) => {
                      const isSelected = destinationCity.toLowerCase() === c.name.toLowerCase();
                      const isSameAsOrigin = selectedCity.toLowerCase() === c.name.toLowerCase();
                      const isServiced = SERVICED_CITIES.includes(c.name.toLowerCase());
                      return (
                        <button
                          key={c.id}
                          type="button"
                          disabled={isSameAsOrigin}
                          onClick={() => {
                            setDestinationCity(c.name);
                            setIsToDropdownOpen(false);
                            setToCitySearch('');
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                            isSameAsOrigin ? 'opacity-40 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer'
                          } ${
                            isSelected ? 'text-blue-600 font-bold bg-blue-50/60 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {c.name} {isSameAsOrigin ? '(Origin)' : ''}
                          </span>
                          {isServiced && !isSameAsOrigin && (
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full shrink-0">
                              Serviced
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. PICKUP AND DROP LOCATION TEXTBOXES WITH GOOGLE MAP CONNECTOR */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Pickup &amp; Drop Address
        </label>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 sm:p-2.5 space-y-1.5 relative">
          
          {/* Visual Route Connector Axis (Left Line with Markers) */}
          <div className="flex items-center gap-2.5">
            {/* Left Marker Column */}
            <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
              {/* Pickup Location Marker */}
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Dotted Line Connector */}
              <div className="w-0.5 h-5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 my-0.5" />

              {/* Drop Location Marker */}
              <div className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400" />
              </div>
            </div>

            {/* Input Fields Column */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <LocationInputSelector
                value={pickupLoc}
                onChange={(val) => setPickupLoc(val)}
                placeholder="Enter Pickup address, shop or warehouse"
                type="pickup"
                serviceId="truck-booking"
                cityContext={selectedCity}
              />

              <LocationInputSelector
                value={dropLoc}
                onChange={(val) => setDropLoc(val)}
                placeholder="Enter Drop address, shop or destination"
                type="drop"
                serviceId="truck-booking"
                cityContext={relocateType === 'between-city' ? destinationCity : selectedCity}
              />
            </div>
          </div>

        </div>
      </div>

      {/* GET ESTIMATE & BOOK BUTTON */}
      <div className="pt-1 space-y-1.5">
        <button
          type="button"
          onClick={handleGetEstimate}
          className="w-full bg-gradient-to-r from-[#001261] via-[#0321a1] to-blue-800 hover:from-[#000d47] hover:to-blue-900 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 rounded-xl shadow-md shadow-blue-950/20 hover:shadow-blue-950/40 transition-all cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>Calculate Truck Fare & Book</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>

        <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1">
          <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
          <span>Live GPS Tracking • Verified Drivers • Instant Dispatch</span>
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
          <span>Lowest Fare Guarantee</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-[#001261] dark:text-blue-400 shrink-0" />
          <span>No Hidden Charges</span>
        </div>
      </div>

    </div>
  );
};
