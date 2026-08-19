import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MapPin, Search, Phone, Mail, Clock, Shield, CheckCircle2, AlertTriangle, Building2, ChevronDown, ExternalLink, ArrowRight, HelpCircle, Navigation } from 'lucide-react';
import { CITIES_DATA } from '../data/cities';

interface LocationsViewProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenBooking: (serviceId: string, city: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

interface BranchInfo {
  cityName: string;
  isServiced: boolean;
  branchName?: string;
  address?: string;
  pincode?: string;
  phone?: string;
  tollFree?: string;
  email?: string;
  workingHours?: string;
  managerName?: string;
  coverageAreas?: string[];
  googleMapQuery?: string;
}

// Master Branch Directory mapping for code-level service availability control
const BRANCHES_DIRECTORY: Record<string, BranchInfo> = {
  bangalore: {
    cityName: 'Bangalore',
    isServiced: true,
    branchName: 'Packer Solutions - Bangalore Zonal Headquarters',
    address: '#45, 1st Floor, 100 Feet Road, Koramangala 4th Block, Bangalore, Karnataka',
    pincode: '560034',
    phone: '+91 98765 43210',
    tollFree: '1800-425-9000',
    email: 'bangalore@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    managerName: 'Rajesh Kumar (Regional Hub Director)',
    coverageAreas: ['Koramangala', 'Whitefield', 'HSR Layout', 'Indiranagar', 'Electronic City', 'Marathahalli', 'Yelahanka', 'Bellandur'],
    googleMapQuery: '100 Feet Road Koramangala Bangalore Karnataka',
  },
  chennai: {
    cityName: 'Chennai',
    isServiced: true,
    branchName: 'Packer Solutions - Chennai Regional Hub',
    address: 'Plot No. 12, OMR Main Road, Thoraipakkam, Chennai, Tamil Nadu',
    pincode: '600097',
    phone: '+91 98765 43211',
    tollFree: '1800-425-9001',
    email: 'chennai@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    managerName: 'S. Murugan (Branch Head)',
    coverageAreas: ['Velachery', 'Thoraipakkam', 'Anna Nagar', 'Adyar', 'Tambaram', 'Porur', 'Sholinganallur', 'Mylapore'],
    googleMapQuery: 'OMR Main Road Thoraipakkam Chennai Tamil Nadu',
  },
  coimbatore: {
    cityName: 'Coimbatore',
    isServiced: true,
    branchName: 'Packer Solutions - Coimbatore Zonal Office',
    address: '128, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu',
    pincode: '641004',
    phone: '+91 98765 43212',
    tollFree: '1800-425-9002',
    email: 'coimbatore@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 8:30 PM',
    managerName: 'K. Venkatesh (Operations Head)',
    coverageAreas: ['Peelamedu', 'RS Puram', 'Saravanampatti', 'Gandhipuram', 'Vadavalli', 'Singanallur', 'Thudiyalur', 'Race Course'],
    googleMapQuery: 'Avinashi Road Peelamedu Coimbatore Tamil Nadu',
  },
  mumbai: {
    cityName: 'Mumbai',
    isServiced: true,
    branchName: 'Packer Solutions - Mumbai Central Branch',
    address: 'Unit 302, Corporate Park, S.V. Road, Andheri West, Mumbai, Maharashtra',
    pincode: '400058',
    phone: '+91 98765 43213',
    tollFree: '1800-425-9003',
    email: 'mumbai@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    managerName: 'Amit Shah (Zone Director)',
    coverageAreas: ['Andheri West', 'Bandra', 'Powai', 'Thane West', 'Navi Mumbai', 'Malad', 'Borivali', 'Goregaon'],
    googleMapQuery: 'SV Road Andheri West Mumbai Maharashtra',
  },
  pune: {
    cityName: 'Pune',
    isServiced: true,
    branchName: 'Packer Solutions - Pune Logistics Hub',
    address: 'Shop 14, Commercial Hub, Baner Road, Baner, Pune, Maharashtra',
    pincode: '411045',
    phone: '+91 98765 43214',
    tollFree: '1800-425-9004',
    email: 'pune@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 8:30 PM',
    managerName: 'Sachin Patil (Branch Coordinator)',
    coverageAreas: ['Wakad', 'Baner', 'Kharadi', 'Hinjewadi', 'Hadapsar', 'Viman Nagar', 'Kothrud', 'Aundh'],
    googleMapQuery: 'Baner Road Pune Maharashtra',
  },
  delhi: {
    cityName: 'Delhi',
    isServiced: true,
    branchName: 'Packer Solutions - Delhi NCR Zonal Office',
    address: 'Building 88, Sector 18, Udyog Vihar, Gurugram, Delhi NCR',
    pincode: '122015',
    phone: '+91 98765 43215',
    tollFree: '1800-425-9005',
    email: 'delhi@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    managerName: 'Vikas Sharma (Regional Manager)',
    coverageAreas: ['Gurugram', 'Noida', 'South Delhi', 'Dwarka', 'Ghaziabad', 'Faridabad', 'Rohini'],
    googleMapQuery: 'Sector 18 Udyog Vihar Gurugram Delhi NCR',
  },
  'delhi ncr': {
    cityName: 'Delhi NCR',
    isServiced: true,
    branchName: 'Packer Solutions - Delhi NCR Zonal Office',
    address: 'Building 88, Sector 18, Udyog Vihar, Gurugram, Delhi NCR',
    pincode: '122015',
    phone: '+91 98765 43215',
    tollFree: '1800-425-9005',
    email: 'delhi@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    managerName: 'Vikas Sharma (Regional Manager)',
    coverageAreas: ['Gurugram', 'Noida', 'South Delhi', 'Dwarka', 'Ghaziabad', 'Faridabad', 'Rohini'],
    googleMapQuery: 'Sector 18 Udyog Vihar Gurugram Delhi NCR',
  },
  hyderabad: {
    cityName: 'Hyderabad',
    isServiced: true,
    branchName: 'Packer Solutions - Hyderabad Cyber Hub',
    address: 'Plot 42, Hitech City Main Rd, Madhapur, Hyderabad, Telangana',
    pincode: '500081',
    phone: '+91 98765 43216',
    tollFree: '1800-425-9006',
    email: 'hyderabad@packersolution.com',
    workingHours: 'Monday - Sunday: 8:00 AM - 8:30 PM',
    managerName: 'P. Srinivas (Branch Lead)',
    coverageAreas: ['Gachibowli', 'Hitech City', 'Madhapur', 'Kukatpally', 'Kondapur', 'Jubilee Hills', 'Banjara Hills'],
    googleMapQuery: 'Hitech City Madhapur Hyderabad Telangana',
  },
  mysore: {
    cityName: 'Mysore',
    isServiced: true,
    branchName: 'Packer Solutions - Mysore Express Office',
    address: 'No. 88, Kalidasa Road, VV Mohalla, Mysore, Karnataka',
    pincode: '570002',
    phone: '+91 98765 43217',
    tollFree: '1800-425-9007',
    email: 'mysore@packersolution.com',
    workingHours: 'Monday - Sunday: 8:30 AM - 8:00 PM',
    managerName: 'M. Ramesh (Branch Supervisor)',
    coverageAreas: ['VV Mohalla', 'Gokulam', 'Vijayanagar', 'Jayalakshmipuram', 'Kuvempunagar', 'JP Nagar'],
    googleMapQuery: 'Kalidasa Road VV Mohalla Mysore Karnataka',
  },
  kochi: {
    cityName: 'Kochi',
    isServiced: true,
    branchName: 'Packer Solutions - Kerala Regional Office',
    address: 'Door 24/810, MG Road, Ernakulam, Kochi, Kerala',
    pincode: '682016',
    phone: '+91 98765 43218',
    tollFree: '1800-425-9008',
    email: 'kochi@packersolution.com',
    workingHours: 'Monday - Sunday: 8:30 AM - 8:00 PM',
    managerName: 'Anand V. Nair (Branch Lead)',
    coverageAreas: ['MG Road', 'Edappally', 'Kakkanad', 'Palarivattom', 'Vyttila', 'Kaloor'],
    googleMapQuery: 'MG Road Ernakulam Kochi Kerala',
  },
};

export const LocationsView: React.FC<LocationsViewProps> = ({ 
  onNavigate, 
  onOpenBooking,
  selectedCity,
  setSelectedCity
}) => {
  const [citySearchInput, setCitySearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expansionRequested, setExpansionRequested] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalize selected city key
  const cityKey = selectedCity.trim().toLowerCase();

  // Code-level check for service availability
  const currentBranch = useMemo<BranchInfo>(() => {
    if (BRANCHES_DIRECTORY[cityKey]) {
      return BRANCHES_DIRECTORY[cityKey];
    }
    // Return explicit unserviced state for any other city
    return {
      cityName: selectedCity,
      isServiced: false
    };
  }, [cityKey, selectedCity]);

  // Primary hub list for quick pills
  const primaryCities = ['Bangalore', 'Chennai', 'Coimbatore', 'Mumbai', 'Pune', 'Delhi NCR', 'Hyderabad', 'Mysore'];

  // FAQs specific to branch locations & coverage
  const locationFaqs = [
    {
      q: 'Can I visit the local Packer Solutions branch office in person?',
      a: 'Yes, absolutely! Our zonal branch offices are open 7 days a week from 8:00 AM to 8:30 PM. You can visit us to discuss custom moving quotes, inspect storage facilities, or collect packing materials.'
    },
    {
      q: 'What if my city is listed as "No Service Currently Available"?',
      a: 'If Packer Solutions does not have a direct local branch in your city yet, our long-distance intercity fleet can still handle relocations passing through or terminating in your area. Click "Request Expansion / Call Support" to speak with our national transport desk.'
    },
    {
      q: 'Do you provide free pre-move physical surveys at my address?',
      a: 'Yes, in all our active serviced cities, we provide free doorstep surveys where a certified relocation supervisor visits your home or office to evaluate item volume and provide a guaranteed fixed quotation.'
    },
    {
      q: 'Are your trucks permitted for apartment societies with strict time windows?',
      a: 'Yes, our local drivers and supervisors are well-versed in society guidelines across all major metros. We coordinate loading schedules to strictly comply with society quiet hours and elevator restrictions.'
    },
    {
      q: 'How do I track my shipment once it leaves the branch?',
      a: 'Every move booked through Packer Solutions includes real-time GPS tracking link sent directly via WhatsApp and SMS, along with a dedicated Move Manager contact.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ==================== PAGE HEADER & CITY SELECTOR ==================== */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">
                OUR BRANCHES & COVERAGE
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Select Your Location
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Choose a city below to view our active branch address, map, and contact info.
              </p>
            </div>

            {/* Custom Location Selector Dropdown & Search */}
            <div ref={dropdownRef} className="relative w-full md:w-80 z-30">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Current Location:
              </label>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {selectedCity}
                  </span>
                  {currentBranch.isServiced ? (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      No Service
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input 
                      type="text"
                      placeholder="Search city..."
                      value={citySearchInput}
                      onChange={(e) => setCitySearchInput(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {CITIES_DATA.filter(c => c.name.toLowerCase().includes(citySearchInput.toLowerCase())).map((c) => {
                      const isServiced = !!BRANCHES_DIRECTORY[c.name.toLowerCase()] || c.name.toLowerCase() === 'delhi';
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedCity(c.name);
                            setIsDropdownOpen(false);
                            setCitySearchInput('');
                            setExpansionRequested(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                            selectedCity.toLowerCase() === c.name.toLowerCase() ? 'text-orange-600 font-bold bg-orange-50/50 dark:bg-orange-950/30' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{c.name}</span>
                          {isServiced ? (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Serviced</span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">No Service</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick City Selector Pills */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Major Hubs:
            </span>
            {primaryCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setExpansionRequested(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCity.toLowerCase() === city.toLowerCase()
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* ==================== MAIN MAP (LEFT) & ADDRESS / NO SERVICE (RIGHT) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* MAP SIDE (LEFT SIDE) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col min-h-[380px] sm:min-h-[460px]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold tracking-wide">
                  {currentBranch.isServiced 
                    ? `Branch Location Map - ${currentBranch.cityName}` 
                    : `Coverage Status Map - ${currentBranch.cityName}`
                  }
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {currentBranch.isServiced ? 'Live Google Map' : 'Unserviced Zone'}
              </span>
            </div>

            <div className="relative flex-1 w-full bg-slate-100 dark:bg-slate-950">
              {currentBranch.isServiced ? (
                <iframe
                  title={`Map location for ${currentBranch.cityName}`}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[340px] border-0"
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(currentBranch.googleMapQuery || currentBranch.address || currentBranch.cityName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 via-slate-50 to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950/20">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    No Direct Branch in {currentBranch.cityName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed font-medium">
                    Our local door-to-door network is not yet active in {currentBranch.cityName}.
                  </p>
                  <div className="mt-4 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Intercity transit routes passing through {currentBranch.cityName} can still be arranged on request.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ADDRESS INFORMATION / NO SERVICE (RIGHT SIDE) */}
          <div className="lg:col-span-6 flex flex-col">
            {currentBranch.isServiced ? (
              /* SERVICED ADDRESS DETAILS */
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Active Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Branch Hub
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Pincode: {currentBranch.pincode}
                    </span>
                  </div>

                  {/* Branch Title */}
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    {currentBranch.branchName}
                  </h2>

                  {/* Address */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 mb-6 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Physical Office Address
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {currentBranch.address}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone / Helpline</span>
                        <a href={`tel:${currentBranch.phone}`} className="text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-orange-600">
                          {currentBranch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</span>
                        <a href={`mailto:${currentBranch.email}`} className="text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-orange-600 truncate block">
                          {currentBranch.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Working Hours</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {currentBranch.workingHours}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Branch In-Charge</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {currentBranch.managerName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Local Coverage Areas */}
                  {currentBranch.coverageAreas && (
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Localities Served in {currentBranch.cityName}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentBranch.coverageAreas.map((area, idx) => (
                          <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenBooking('household-shifting', currentBranch.cityName)}
                    className="w-full sm:flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-3.5 px-5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book Moving Service in {currentBranch.cityName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(currentBranch.googleMapQuery || currentBranch.address || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs py-3.5 px-5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              /* NO SERVICE PROVISION AT CODE LEVEL */
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-amber-900/50 shadow-lg flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Warning Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800 mb-4">
                    <AlertTriangle className="w-3.5 h-3.5" /> No Direct Branch Service
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                    Service Currently Unavailable in {currentBranch.cityName}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6">
                    Packer Solutions currently does not have a local operational branch or direct door-to-door moving team stationed in <span className="font-bold text-slate-900 dark:text-white">{currentBranch.cityName}</span>.
                  </p>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      Intercity Transit & Service Expansion:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Long-distance intercity trucks passing through or originating from nearby zonal hubs can accommodate moves on custom schedule.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>You can submit a expansion interest request to prioritize opening a branch in {currentBranch.cityName}.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Form / Expansion Request */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  {expansionRequested ? (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
                      ✓ Thank you! Your request for service in {currentBranch.cityName} has been logged with our expansion planning team.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Want us to launch in {currentBranch.cityName}?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setExpansionRequested(true)}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 px-4 rounded-2xl transition-all cursor-pointer shadow-sm text-center"
                        >
                          Request Service Expansion in {currentBranch.cityName}
                        </button>
                        <a
                          href="tel:18004259000"
                          className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-2xl transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call National Desk</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== FAQ INFORMATION SECTION ==================== */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-lg mt-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">
              HELP & INFORMATION
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Locations & Branch FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Find quick answers regarding our branch network, physical visits, and coverage expansion.
            </p>
          </div>

          <div className="space-y-4">
            {locationFaqs.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
