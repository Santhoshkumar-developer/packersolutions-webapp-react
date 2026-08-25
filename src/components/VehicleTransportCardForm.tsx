import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Truck, 
  Car, 
  Bike, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Search, 
  Zap, 
  Shield, 
  Clock 
} from 'lucide-react';
import { CITIES_DATA } from '../data/cities';
import { LocationInputSelector } from './LocationInputSelector';

const SERVICED_CITIES = ['bangalore', 'chennai', 'coimbatore', 'mumbai', 'pune', 'delhi', 'delhi ncr', 'hyderabad', 'mysore', 'kochi'];

export interface VehicleTypeOption {
  id: string;
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  localBasePrice: number;
  intercityBasePrice: number;
}

export const VEHICLE_TYPE_OPTIONS: VehicleTypeOption[] = [
  { 
    id: 'car', 
    label: 'Car', 
    subtext: 'Hatchback, Sedan, SUV, Luxury', 
    icon: Car, 
    localBasePrice: 3500, 
    intercityBasePrice: 7500 
  },
  { 
    id: 'bike', 
    label: 'Bike', 
    subtext: 'Motorcycle, Cruiser, Sports', 
    icon: Bike, 
    localBasePrice: 1500, 
    intercityBasePrice: 3200 
  },
  { 
    id: 'scooter', 
    label: 'Scooter', 
    subtext: 'EV Scooter, Activa, Moped', 
    icon: Bike, 
    localBasePrice: 1200, 
    intercityBasePrice: 2800 
  },
  { 
    id: 'commercial', 
    label: 'Commercial', 
    subtext: 'Pickup, Tempo, Fleet, Van', 
    icon: Truck, 
    localBasePrice: 4500, 
    intercityBasePrice: 9500 
  }
];

interface VehicleTransportCardFormProps {
  selectedCity: string;
  onSelectCity?: (city: string) => void;
  onOpenCityModal: () => void;
  onOpenLoginModal: () => void;
  onOpenEstimateModal?: () => void;
  serviceName?: string;
  basePrice?: number;
}

export const VehicleTransportCardForm: React.FC<VehicleTransportCardFormProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCityModal,
  onOpenLoginModal,
  onOpenEstimateModal,
  serviceName = "Vehicle Transportation",
  basePrice = 3200
}) => {
  // 1. Relocate type toggle state: 'within-city' | 'between-city'
  const [relocateType, setRelocateType] = useState<'within-city' | 'between-city'>('between-city');
  
  // 2. Cities
  const [destinationCity, setDestinationCity] = useState<string>('Chennai');

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

  // 4. Vehicle Type Selection: Car / Bike / Scooter / Commercial
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('car');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [carrierType, setCarrierType] = useState<'enclosed' | 'open'>('enclosed');

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

  // Calculate pricing based on vehicle type and trip scope
  const activeVehicleOption = VEHICLE_TYPE_OPTIONS.find(v => v.id === selectedVehicleType) || VEHICLE_TYPE_OPTIONS[0];
  const calculatedBasePrice = relocateType === 'between-city' 
    ? activeVehicleOption.intercityBasePrice 
    : activeVehicleOption.localBasePrice;

  const handleGetEstimate = () => {
    // Save selected form state to localStorage for seamless estimation
    const vehicleBookingData = {
      bookingType: 'vehicle-transportation',
      relocateType,
      vehicleType: selectedVehicleType,
      vehicleModel: vehicleModel.trim() || activeVehicleOption.label,
      carrierType,
      originCity: selectedCity,
      destinationCity: relocateType === 'between-city' ? destinationCity : selectedCity,
      pickupLoc,
      dropLoc,
      estimatedPrice: calculatedBasePrice
    };
    localStorage.setItem('ps_vehicle_transport_draft', JSON.stringify(vehicleBookingData));

    // Also update common booking draft so global estimate modal shows full details
    const commonDraft = {
      relocateType,
      originCity: selectedCity,
      destinationCity: relocateType === 'between-city' ? destinationCity : selectedCity,
      houseSize: `Vehicle: ${activeVehicleOption.label} ${vehicleModel ? `(${vehicleModel})` : ''} [${carrierType.toUpperCase()} CARRIER]`,
      pickupLoc,
      dropLoc,
      shiftingDate: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('ps_booking_draft', JSON.stringify(commonDraft));

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
            <span>Zero-Scratch Guaranteed Transit</span>
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
          /* WITHIN CITY SINGLE SEARCHABLE DROPDOWN */
          <div className="relative" ref={withinCityDropdownRef}>
            <button
              type="button"
              onClick={() => setIsWithinCityDropdownOpen(!isWithinCityDropdownOpen)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{selectedCity}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isWithinCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isWithinCityDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                <div className="p-1.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative flex items-center">
                    <Search className="w-3 h-3 text-slate-400 absolute left-2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={citySearchInput}
                      onChange={(e) => setCitySearchInput(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-600 text-slate-900 dark:text-white font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="max-h-40 overflow-y-auto py-1">
                  {CITIES_DATA.filter(c => c.name.toLowerCase().includes(citySearchInput.toLowerCase())).length > 0 ? (
                    CITIES_DATA.filter(c => c.name.toLowerCase().includes(citySearchInput.toLowerCase())).map((city) => {
                      const isServiced = SERVICED_CITIES.includes(city.name.toLowerCase());
                      return (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => {
                            if (onSelectCity) onSelectCity(city.name);
                            setIsWithinCityDropdownOpen(false);
                            setCitySearchInput('');
                          }}
                          className={`w-full px-2.5 py-1.5 text-left text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center justify-between transition-colors cursor-pointer ${
                            selectedCity === city.name ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{city.name}</span>
                            {isServiced && (
                              <span className="text-[8px] font-extrabold px-1 py-0.2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 rounded">
                                Hub
                              </span>
                            )}
                          </div>
                          {selectedCity === city.name && <Check className="w-3 h-3 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-400 text-center">No cities found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* BETWEEN CITY: 2 SEARCHABLE DROPDOWNS (FROM & TO) */
          <div className="grid grid-cols-2 gap-1.5">
            {/* FROM DROPDOWN */}
            <div className="relative" ref={fromDropdownRef}>
              <button
                type="button"
                onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase">From:</span>
                  <span className="truncate">{selectedCity}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${isFromDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFromDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                  <div className="p-1 border-b border-slate-100 dark:border-slate-800">
                    <input
                      type="text"
                      placeholder="Search origin..."
                      value={fromCitySearch}
                      onChange={(e) => setFromCitySearch(e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-600 text-slate-900 dark:text-white font-medium"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-36 overflow-y-auto py-1">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(fromCitySearch.toLowerCase())).map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => {
                          if (onSelectCity) onSelectCity(city.name);
                          setIsFromDropdownOpen(false);
                          setFromCitySearch('');
                        }}
                        className={`w-full px-2 py-1 text-left text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center justify-between ${
                          selectedCity === city.name ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{city.name}</span>
                        {selectedCity === city.name && <Check className="w-3 h-3 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TO DROPDOWN */}
            <div className="relative" ref={toDropdownRef}>
              <button
                type="button"
                onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase">To:</span>
                  <span className="truncate">{destinationCity}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${isToDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                  <div className="p-1 border-b border-slate-100 dark:border-slate-800">
                    <input
                      type="text"
                      placeholder="Search destination..."
                      value={toCitySearch}
                      onChange={(e) => setToCitySearch(e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-600 text-slate-900 dark:text-white font-medium"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-36 overflow-y-auto py-1">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(toCitySearch.toLowerCase())).map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => {
                          setDestinationCity(city.name);
                          setIsToDropdownOpen(false);
                          setToCitySearch('');
                        }}
                        className={`w-full px-2 py-1 text-left text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center justify-between ${
                          destinationCity === city.name ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{city.name}</span>
                        {destinationCity === city.name && <Check className="w-3 h-3 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. PICKUP AND DELIVERY ADDRESS (Connected Truck Booking Style) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Pickup &amp; Delivery Address
          </label>
          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">Doorstep Carrier</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 sm:p-2.5 space-y-1.5 relative">
          {/* Visual Route Connector Axis */}
          <div className="flex items-center gap-2.5">
            {/* Left Marker Column */}
            <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs" title="Pickup Location">
                <MapPin className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="w-0.5 h-5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 my-0.5" />
              <div className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs" title="Drop Location">
                <MapPin className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400" />
              </div>
            </div>

            {/* Input Fields Column */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <LocationInputSelector
                value={pickupLoc}
                onChange={(val) => setPickupLoc(val)}
                placeholder="Pickup Location (Showroom, House, Parking or Area)"
                type="pickup"
                serviceId="vehicle-transport"
                cityContext={selectedCity}
              />
              <LocationInputSelector
                value={dropLoc}
                onChange={(val) => setDropLoc(val)}
                placeholder="Drop Location (Destination Address or City Hub)"
                type="drop"
                serviceId="vehicle-transport"
                cityContext={relocateType === 'between-city' ? destinationCity : selectedCity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. VEHICLE TYPE SELECTION: Car / Bike / Scooter / Commercial */}
      <div className="space-y-1.5 bg-slate-50 dark:bg-slate-950/60 p-2 sm:p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 block">
            Vehicle Type
          </label>
          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">Select Category</span>
        </div>

        {/* 4 Chips / Cards Grid: Car | Bike | Scooter | Commercial */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {VEHICLE_TYPE_OPTIONS.map((vt) => {
            const IconComp = vt.icon;
            const isSelected = selectedVehicleType === vt.id;
            return (
              <button
                key={vt.id}
                type="button"
                onClick={() => setSelectedVehicleType(vt.id)}
                className={`p-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-[#001261] text-white border-[#001261] shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
                title={vt.subtext}
              >
                <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span className="leading-tight text-[11px] font-bold">{vt.label}</span>
                <span className={`text-[8.5px] truncate max-w-full font-medium ${isSelected ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                  {vt.id === 'car' ? 'Hatchback/SUV' : vt.id === 'bike' ? 'Motorcycle' : vt.id === 'scooter' ? 'EV/Activa' : 'Pickup/Van'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Optional Vehicle Make / Model Name Field */}
        <div className="pt-1">
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            placeholder={`Vehicle Model (e.g., ${selectedVehicleType === 'car' ? 'Hyundai Creta, Honda City' : selectedVehicleType === 'bike' ? 'Royal Enfield Classic 350' : selectedVehicleType === 'scooter' ? 'Ola S1, Honda Activa 6G' : 'Tata Ace, Bolero Maxi Truck'})`}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 5. CARRIER PROTECTION TYPE */}
      <div className="space-y-1">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Carrier Enclosure
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setCarrierType('enclosed')}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
              carrierType === 'enclosed'
                ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-700 dark:text-blue-300'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Closed Carrier / Wooden Crate</span>
          </button>

          <button
            type="button"
            onClick={() => setCarrierType('open')}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
              carrierType === 'open'
                ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-700 dark:text-blue-300'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Truck className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            <span>Hydraulic Open Trailer</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400 pt-0.5 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          <span>Zero-Scratch Assurance</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          <span>Live GPS Tracking</span>
        </span>
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" />
          <span>Doorstep Handover</span>
        </span>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleGetEstimate}
        className="w-full bg-[#001261] hover:bg-[#0321a1] active:scale-[0.99] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20 hover:shadow-xl transition-all cursor-pointer group"
      >
        <span>Check Vehicle Transport Rates</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Policy snippet */}
      <p className="text-[9px] text-center text-slate-400 dark:text-slate-500">
        Includes Transit Insurance • Digital Scratch &amp; Fuel Inspection Report Included
      </p>

    </div>
  );
};
