import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Search, 
  Zap 
} from 'lucide-react';
import { CITIES_DATA } from '../data/cities';

const SERVICED_CITIES = ['bangalore', 'chennai', 'coimbatore', 'mumbai', 'pune', 'delhi', 'delhi ncr', 'hyderabad', 'mysore', 'kochi'];

const TIME_SLOTS = [
  '08:00 AM - 11:00 AM',
  '11:00 AM - 02:00 PM',
  '02:00 PM - 05:00 PM',
  '05:00 PM - 08:00 PM'
];

interface PackingUnpackingCardFormProps {
  selectedCity: string;
  onSelectCity?: (city: string) => void;
  onOpenCityModal: () => void;
  onOpenLoginModal: () => void;
  onOpenEstimateModal?: () => void;
  serviceName?: string;
  basePrice?: number;
}

export const PackingUnpackingCardForm: React.FC<PackingUnpackingCardFormProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenEstimateModal,
  serviceName = "Packing & Unpacking",
  basePrice = 3000
}) => {
  // 1. Location state: City Dropdown & Street/Area input
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchInput, setCitySearchInput] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const [locationAddress, setLocationAddress] = useState<string>('');

  // 2. Packing Date & Time state
  const [packingDate, setPackingDate] = useState<string>(() => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0];
  });
  const [packingTimeSlot, setPackingTimeSlot] = useState<string>(TIME_SLOTS[0]);

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

  const handleGetEstimate = () => {
    if (contactNo && contactNo.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit contact number');
      return;
    }
    setErrorMessage('');

    // Save selected form state to localStorage for seamless estimation
    const packingBookingData = {
      bookingType: 'packing-unpacking',
      serviceName,
      city: selectedCity,
      location: locationAddress || `${selectedCity} Central`,
      packingDate,
      packingTimeSlot,
      contactPerson: contactPerson || 'Valued Customer',
      contactNo: contactNo || '',
      estimatedPrice: basePrice
    };
    localStorage.setItem('ps_packing_booking_draft', JSON.stringify(packingBookingData));
    localStorage.setItem('ps_house_shifting_draft', JSON.stringify({
      relocateType: 'within-city',
      originCity: selectedCity,
      destinationCity: selectedCity,
      houseSize: 'Packing & Unpacking Service',
      pickupLoc: locationAddress || `${selectedCity} Central`,
      dropLoc: locationAddress || `${selectedCity} Central`,
      shiftingDate: packingDate
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-visible relative p-3.5 sm:p-4.5 space-y-2.5 sm:space-y-3 text-left transition-all max-w-md mx-auto lg:max-w-none">
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#001261] via-[#0321a1] to-blue-600 rounded-t-2xl sm:rounded-t-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-[#001261] dark:text-blue-300">
            <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
            <span>Professional Packing Crew</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Book {serviceName}
          </h3>
        </div>

        {/* Starting Fare Tag */}
        <div className="text-right shrink-0">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Starts from</span>
          <span className="text-base sm:text-lg font-black text-[#001261] dark:text-blue-400 font-mono">
            ₹{basePrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 1. FIELD: LOCATION */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          1. Location
        </label>

        {/* City Selector Dropdown */}
        <div ref={cityDropdownRef} className="relative z-30 mb-1.5">
          <div
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            className="w-full flex items-center justify-between p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer group text-left shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-0.5">Service City:</span>
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

        {/* Address / Locality Textbox */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
            placeholder="Enter packing address, flat, apartment or locality"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 2. FIELD: PACKING DATE & TIME */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          2. Packing Date &amp; Time
        </label>
        
        <div className="grid grid-cols-2 gap-1.5">
          {/* Packing Date */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
            </div>
            <input
              type="date"
              value={packingDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setPackingDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-8 pr-2 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600 transition-all cursor-pointer shadow-2xs"
            />
          </div>

          {/* Packing Time Slot */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400" />
            </div>
            <select
              value={packingTimeSlot}
              onChange={(e) => setPackingTimeSlot(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-8 pr-2 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600 transition-all cursor-pointer shadow-2xs appearance-none"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3 & 4. FIELDS: CONTACT PERSON & CONTACT NO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* 3. Contact Person */}
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

        {/* 4. Contact No */}
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
          <span>Calculate Packing Fare &amp; Book</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>

        <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1">
          <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
          <span>5-Layer Bubble &amp; Corrugated Box • Zero Damage Guarantee • Pro Crew</span>
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
