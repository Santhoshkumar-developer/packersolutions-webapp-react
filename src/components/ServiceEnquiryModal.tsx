import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  PhoneCall,
  User,
  MapPin,
  Calendar,
  Truck,
  Building2,
  Home,
  Layers,
  Car,
  Warehouse,
  Package,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Clock,
  Check,
  ChevronRight,
  Star,
  Zap,
  RotateCcw
} from 'lucide-react';
import parcelVectorImg from '../assets/images/service_parcel_vector_1785319730384.jpg';
import packersVectorImg from '../assets/images/service_packers_vector_1785319746387.jpg';
import truckVectorImg from '../assets/images/service_truck_vector_1785319761125.jpg';
import officeCorporateVectorImg from '../assets/images/office_shifting_service_1788079537044.jpg';
import packingUnpackingVectorImg from '../assets/images/vector_packing_unpacking_1785946345528.png';
import loadingUnloadingVectorImg from '../assets/images/vector_loading_unloading_1785946360593.png';
import vehicleTransportVectorImg from '../assets/images/vector_vehicle_transport_1785946372441.png';
import warehousingStorageVectorImg from '../assets/images/vector_warehousing_storage_1785946384931.png';

export interface ServiceEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialCity?: string;
  initialMobile?: string;
  initialName?: string;
  initialStep?: 'services' | 'form';
}

export interface ServiceItemData {
  id: string;
  name: string;
  shortName: string;
  image: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  startingPrice: string;
}

export const SERVICES_GRID: ServiceItemData[] = [
  {
    id: 'packers-and-movers',
    name: 'Home Shifting',
    shortName: 'Home Shifting',
    image: packersVectorImg,
    badge: 'Up to 30% Off',
    badgeColor: 'bg-orange-500 text-white',
    headline: 'Safe & hassle-free household relocation with multi-layer packing',
    description: 'Complete home relocation with dedicated truck, bubble wrap & unpacking.',
    startingPrice: '₹3,499'
  },
  {
    id: 'office-relocation',
    name: 'Office Shifting',
    shortName: 'Office Move',
    image: officeCorporateVectorImg,
    badge: '0% Advance',
    badgeColor: 'bg-blue-600 text-white',
    headline: 'Zero-downtime corporate office & IT workstation shifting',
    description: 'Desks, server racks, electronics & conference furniture relocation.',
    startingPrice: '₹7,999'
  },
  {
    id: 'packing-unpacking',
    name: 'Packing Service',
    shortName: 'Packing Service',
    image: packingUnpackingVectorImg,
    badge: '5-Ply Box',
    badgeColor: 'bg-purple-600 text-white',
    headline: 'Expert 5-layer packing materials and dedicated unpacking setup',
    description: 'Bubble wraps, carton boxes, edge protectors & fragile item crating.',
    startingPrice: '₹1,499'
  },
  {
    id: 'loading-unloading',
    name: 'Loading Service',
    shortName: 'Loading Service',
    image: loadingUnloadingVectorImg,
    badge: 'Safe Handling',
    badgeColor: 'bg-amber-600 text-white',
    headline: 'Skilled loaders for floor-to-floor heavy furniture & appliance handling',
    description: 'Trained moving crew with hydraulic trolleys and safety straps.',
    startingPrice: '₹999'
  },
  {
    id: 'vehicle-transportation',
    name: 'Vehicle Transport',
    shortName: 'Vehicle Transport',
    image: vehicleTransportVectorImg,
    badge: 'Enclosed Trailer',
    badgeColor: 'bg-emerald-600 text-white',
    headline: 'Doorstep bike & enclosed car carrier transport across India',
    description: 'Damage-free GPS-tracked closed car containers & hydraulic bike carriers.',
    startingPrice: '₹2,499'
  },
  {
    id: 'parcel-courier',
    name: 'Parcel Delivery',
    shortName: 'Parcel Courier',
    image: parcelVectorImg,
    badge: 'Express 24h',
    badgeColor: 'bg-rose-600 text-white',
    headline: 'Fast intercity cargo, single carton & luggage courier solutions',
    description: 'Same-day pickup and doorstep delivery for cartons and luggage.',
    startingPrice: '₹499'
  },
  {
    id: 'domestic-relocation',
    name: 'Truck Booking',
    shortName: 'Truck Booking',
    image: truckVectorImg,
    badge: 'GPS Tracked',
    badgeColor: 'bg-indigo-600 text-white',
    headline: 'Instant booking for Tata Ace, 8ft, 14ft & container moving trucks',
    description: 'On-demand mini trucks and large container vehicles with driver.',
    startingPrice: '₹1,299'
  },
  {
    id: 'warehousing-storage',
    name: 'Storage Solutions',
    shortName: 'Storage Vault',
    image: warehousingStorageVectorImg,
    badge: 'CCTV Vault',
    badgeColor: 'bg-cyan-600 text-white',
    headline: 'Moisture-proof, 24/7 CCTV short & long term household storage',
    description: 'Secure, pest-controlled climate storage with flexible monthly terms.',
    startingPrice: '₹1,999/mo'
  }
];

export const ServiceEnquiryModal: React.FC<ServiceEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'packers-and-movers',
  initialCity = 'Coimbatore',
  initialMobile = '',
  initialName = '',
  initialStep = 'services'
}) => {
  // Modal flow steps: 'services' -> 'form' -> 'success'
  const [modalStep, setModalStep] = useState<'services' | 'form' | 'success'>(initialStep);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);

  // Common customer details
  const [fullName, setFullName] = useState(initialName);
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [pickupCity, setPickupCity] = useState(initialCity);
  const [dropCity, setDropCity] = useState('');
  const [movingDate, setMovingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  // Service specific form states
  const [houseSize, setHouseSize] = useState('2 BHK');
  const [hasElevator, setHasElevator] = useState('yes');
  
  const [officeSize, setOfficeSize] = useState('11-30 Employees');
  const [needsITSetup, setNeedsITSetup] = useState(true);

  const [vehicleType, setVehicleType] = useState('Hatchback / Sedan Car');
  const [vehicleModel, setVehicleModel] = useState('');

  const [packingScope, setPackingScope] = useState('Complete Household (Full Packing)');
  
  const [helpersCount, setHelpersCount] = useState('2 Trained Helpers');
  const [floorLevel, setFloorLevel] = useState('1st - 3rd Floor');

  const [storageDuration, setStorageDuration] = useState('3 Months');
  const [storageCategory, setStorageCategory] = useState('Household Goods');

  const [parcelWeight, setParcelWeight] = useState('Medium Carton (10 - 25 kg)');
  
  const [truckType, setTruckType] = useState('Tata Ace / Mini Truck (1 Ton)');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedEnquiryId, setGeneratedEnquiryId] = useState('');
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; pickup?: string; drop?: string }>({});

  // Reset modal step and sync props when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalStep(initialStep);
      if (initialServiceId) setSelectedServiceId(initialServiceId);
      if (initialCity) setPickupCity(initialCity);
      if (initialMobile) setMobileNumber(initialMobile);
      if (initialName) setFullName(initialName);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, initialStep, initialServiceId, initialCity, initialMobile, initialName]);

  if (!isOpen) return null;

  const currentService = SERVICES_GRID.find(s => s.id === selectedServiceId) || SERVICES_GRID[0];

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setErrors({});
    setModalStep('form');
  };

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string; pickup?: string; drop?: string } = {};

    if (!fullName.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Please enter your 10-digit mobile number';
    } else if (cleanMobile.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!pickupCity.trim()) {
      newErrors.pickup = 'Please provide pickup location / city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Generate random realistic Enquiry ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const enquiryId = `PS-ENQ-${randomNum}`;

    // Collect complete payload
    const enquiryPayload = {
      enquiryId,
      createdAt: new Date().toISOString(),
      serviceId: selectedServiceId,
      serviceName: currentService.name,
      customer: {
        name: fullName,
        mobile: mobileNumber.replace(/\D/g, ''),
      },
      locations: {
        pickup: pickupCity,
        drop: dropCity || pickupCity
      },
      movingDate,
      serviceDetails: {
        houseSize: selectedServiceId === 'packers-and-movers' ? houseSize : undefined,
        hasElevator: selectedServiceId === 'packers-and-movers' ? hasElevator : undefined,
        officeSize: selectedServiceId === 'office-relocation' ? officeSize : undefined,
        needsITSetup: selectedServiceId === 'office-relocation' ? needsITSetup : undefined,
        vehicleType: selectedServiceId === 'vehicle-transportation' ? vehicleType : undefined,
        vehicleModel: selectedServiceId === 'vehicle-transportation' ? vehicleModel : undefined,
        packingScope: selectedServiceId === 'packing-unpacking' ? packingScope : undefined,
        helpersCount: selectedServiceId === 'loading-unloading' ? helpersCount : undefined,
        floorLevel: selectedServiceId === 'loading-unloading' ? floorLevel : undefined,
        storageDuration: selectedServiceId === 'warehousing-storage' ? storageDuration : undefined,
        storageCategory: selectedServiceId === 'warehousing-storage' ? storageCategory : undefined,
        parcelWeight: selectedServiceId === 'parcel-courier' ? parcelWeight : undefined,
        truckType: selectedServiceId === 'domestic-relocation' ? truckType : undefined
      }
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('ps_user_enquiries') || '[]');
      existing.unshift(enquiryPayload);
      localStorage.setItem('ps_user_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving enquiry to localStorage', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setGeneratedEnquiryId(enquiryId);
      setModalStep('success');
    }, 600);
  };

  const handleResetForAnother = () => {
    setModalStep('services');
    setGeneratedEnquiryId('');
    setDropCity('');
  };

  return (
    <div
      id="modal-service-enquiry-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto font-roboto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="service-enquiry-modal-container"
        className="relative w-full max-w-4xl lg:max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#001261] via-[#0321a1] to-[#ff6200] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            {modalStep === 'form' && (
              <button
                type="button"
                onClick={() => setModalStep('services')}
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold mr-1"
                title="Back to Services"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-amber-300 shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                  {modalStep === 'services' ? 'Select Service' : modalStep === 'form' ? 'Step 2: Instant Quote' : 'Confirmed'}
                </span>
                <span className="hidden sm:inline-block text-[11px] text-white/80">
                  Zero Hidden Charges • 100% Safe
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black tracking-tight text-white mt-0.5">
                {modalStep === 'services'
                  ? 'Choose a Service to Get Instant Estimate'
                  : modalStep === 'form'
                  ? `${currentService.name} Booking Enquiry`
                  : 'Enquiry Created Successfully'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-service-enquiry-modal"
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto">
          {modalStep === 'services' ? (
            /* ================= STEP 1: SERVICES SELECTION GRID (Hero Section Style) ================= */
            <div id="enquiry-modal-service-list" className="p-4 sm:p-6 lg:p-8 space-y-6">
              
              {/* Introduction Banner */}
              <div className="text-center max-w-2xl mx-auto space-y-1.5">
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  What kind of service do you need?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Click any service below to customize your inventory, choose moving dates, and receive a guaranteed price estimate.
                </p>
              </div>

              {/* Responsive 8-Service Grid with Images matching Home Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {SERVICES_GRID.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelectService(service.id)}
                    className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-3 sm:p-4 border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-200 text-left flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                  >
                    {/* Badge Pill */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full ${service.badgeColor} shadow-xs truncate`}>
                        {service.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0">
                        {service.startingPrice}
                      </span>
                    </div>

                    {/* Vector Illustration Container */}
                    <div className="w-full aspect-[4/3] rounded-xl bg-slate-50 dark:bg-slate-900/60 overflow-hidden mb-3 flex items-center justify-center p-1.5 border border-slate-100 dark:border-slate-800">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-contain object-center transform group-hover:scale-108 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-1 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                          {service.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug mt-0.5">
                          {service.description}
                        </p>
                      </div>

                      {/* Select Action Bar */}
                      <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-orange-600 dark:text-orange-400 text-xs font-bold">
                        <span>Get Quote</span>
                        <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom Trust Strip */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-700/60 flex flex-wrap items-center justify-around gap-3 text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Damage Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.9/5 Star Rated Service</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Prompt Doorstep Pickup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>WhatsApp Updates</span>
                </div>
              </div>

            </div>
          ) : modalStep === 'form' ? (
            /* ================= STEP 2: DEDICATED SERVICE ENQUIRY FORM ================= */
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              
              {/* Selected Service Hero Summary Card */}
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 rounded-2xl p-4 border border-orange-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-xl bg-white dark:bg-slate-900 p-2 shrink-0 border border-orange-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
                  <img
                    src={currentService.image}
                    alt={currentService.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentService.badgeColor}`}>
                      {currentService.badge}
                    </span>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      Starting at {currentService.startingPrice}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white">
                    {currentService.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {currentService.headline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalStep('services')}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-600 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
                  <span>Change Service</span>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: Customer Contact Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span>Customer Contact Information</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="enquiry-input-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                          }}
                          placeholder="E.g. Rajesh Kumar"
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                            errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                          } rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[10px] font-bold text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        10-Digit Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3.5 flex items-center gap-1 text-slate-400 pointer-events-none">
                          <PhoneCall className="w-4 h-4 text-orange-500" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">+91</span>
                        </div>
                        <input
                          id="enquiry-input-mobile"
                          type="tel"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setMobileNumber(val);
                            if (errors.mobile) setErrors(prev => ({ ...prev, mobile: undefined }));
                          }}
                          placeholder="9876543210"
                          className={`w-full pl-18 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                            errors.mobile ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                          } rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono outline-none focus:border-orange-500 transition-all`}
                        />
                      </div>
                      {errors.mobile && (
                        <p className="text-[10px] font-bold text-red-500 mt-1">{errors.mobile}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Journey & Dates */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Locations & Moving Schedule</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Pickup City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Pickup City / Area <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="enquiry-input-pickup"
                          type="text"
                          value={pickupCity}
                          onChange={(e) => {
                            setPickupCity(e.target.value);
                            if (errors.pickup) setErrors(prev => ({ ...prev, pickup: undefined }));
                          }}
                          placeholder="E.g. Coimbatore"
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                            errors.pickup ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                          } rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all`}
                        />
                      </div>
                      {errors.pickup && (
                        <p className="text-[10px] font-bold text-red-500 mt-1">{errors.pickup}</p>
                      )}
                    </div>

                    {/* Destination / Drop City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Drop City / Area <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="enquiry-input-drop"
                          type="text"
                          value={dropCity}
                          onChange={(e) => setDropCity(e.target.value)}
                          placeholder="Same City or E.g. Chennai"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Shifting Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Expected Move Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="enquiry-input-date"
                          type="date"
                          value={movingDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setMovingDate(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Dynamic Service-Specific Fields */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>{currentService.name} Customization</span>
                  </h4>

                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80">
                    
                    {/* Home Shifting */}
                    {selectedServiceId === 'packers-and-movers' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            House / Apartment Size
                          </label>
                          <select
                            value={houseSize}
                            onChange={(e) => setHouseSize(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="1 RK / Studio">1 RK / Studio Apartment</option>
                            <option value="1 BHK">1 BHK (Small Household)</option>
                            <option value="2 BHK">2 BHK (Standard Family)</option>
                            <option value="3 BHK">3 BHK (Large Household)</option>
                            <option value="4+ BHK / Villa">4+ BHK / Independent Villa</option>
                            <option value="Few Items Only">Few Furniture / Appliance Items Only</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Elevator / Lift Available?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setHasElevator('yes')}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                hasElevator === 'yes'
                                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              Yes (Service Lift)
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasElevator('no')}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                hasElevator === 'no'
                                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              No (Stairs Only)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Office Shifting */}
                    {selectedServiceId === 'office-relocation' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Office Scale / Team Size
                          </label>
                          <select
                            value={officeSize}
                            onChange={(e) => setOfficeSize(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="1-10 Employees">1-10 Workstations (Small Office)</option>
                            <option value="11-30 Employees">11-30 Workstations (Mid Size)</option>
                            <option value="31-75 Employees">31-75 Workstations (Large Office)</option>
                            <option value="75+ Corporate">75+ Corporate Campus / IT Park</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            IT & Server Dismantling Setup
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setNeedsITSetup(true)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                needsITSetup
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              Included (IT Cables & Servers)
                            </button>
                            <button
                              type="button"
                              onClick={() => setNeedsITSetup(false)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                !needsITSetup
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              Furniture Only
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Vehicle Transportation */}
                    {selectedServiceId === 'vehicle-transportation' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Vehicle Category
                          </label>
                          <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="Hatchback / Sedan Car">Hatchback / Sedan Car (Enclosed Carrier)</option>
                            <option value="SUV / MUV / Compact SUV">SUV / MUV / Compact SUV</option>
                            <option value="Bike / Motorcycle (<200cc)">Bike / Motorcycle (&lt;200cc)</option>
                            <option value="Superbike / Royal Enfield (350cc+)">Superbike / Cruiser (350cc+)</option>
                            <option value="Scooter / Activa">Scooter / Moped (Activa/Jupiter)</option>
                            <option value="Luxury / Vintage Vehicle">Luxury / Vintage Supercar</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Vehicle Model / Make
                          </label>
                          <input
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            placeholder="E.g. Hyundai Creta / RE Hunter 350"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Packing Service */}
                    {selectedServiceId === 'packing-unpacking' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Packing Scope & Materials Required
                        </label>
                        <select
                          value={packingScope}
                          onChange={(e) => setPackingScope(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                        >
                          <option value="Complete Household (Full Packing)">Complete Household (Full 5-Ply Packing + Bubble Wrap)</option>
                          <option value="Fragile & Kitchen Items Only">Fragile &amp; Kitchen Glassware Only</option>
                          <option value="Heavy Furniture & Wooden Crating">Heavy Wooden Furniture &amp; Electronics Crating</option>
                          <option value="Unpacking & Rearrangement Only">Unpacking &amp; Room Arrangement Setup</option>
                        </select>
                      </div>
                    )}

                    {/* Loading & Unloading */}
                    {selectedServiceId === 'loading-unloading' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Labour Crew Size
                          </label>
                          <select
                            value={helpersCount}
                            onChange={(e) => setHelpersCount(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="2 Trained Helpers">2 Trained Helpers (Light Shifting)</option>
                            <option value="3 Trained Helpers">3 Trained Helpers (Standard 2 BHK)</option>
                            <option value="4+ Heavy Lifting Crew">4+ Heavy Lifting Crew (3-4 BHK / Heavy Appliances)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Floor Level / Lifting Access
                          </label>
                          <select
                            value={floorLevel}
                            onChange={(e) => setFloorLevel(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="Ground Floor">Ground Floor / Direct Access</option>
                            <option value="1st - 3rd Floor">1st - 3rd Floor (With or Without Lift)</option>
                            <option value="4th - 8th Floor">4th - 8th Floor</option>
                            <option value="High-Rise (9th+ Floor)">High-Rise (9th+ Floor)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Warehouse & Storage */}
                    {selectedServiceId === 'warehousing-storage' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Storage Duration
                          </label>
                          <select
                            value={storageDuration}
                            onChange={(e) => setStorageDuration(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="1 Month">1 Month (Short-Term)</option>
                            <option value="3 Months">3 Months (Renovation Period)</option>
                            <option value="6 Months">6 Months (Abroad / Relocation)</option>
                            <option value="12+ Months">12+ Months (Long-Term Vault)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Goods Category
                          </label>
                          <select
                            value={storageCategory}
                            onChange={(e) => setStorageCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                          >
                            <option value="Household Goods">Complete Household Furniture &amp; Appliances</option>
                            <option value="Commercial Inventory">Commercial Stock / Retail Inventory</option>
                            <option value="Vehicle Storage">Vehicle / Bike Safe Parking</option>
                            <option value="Office Equipment">Office Desks &amp; Archive Records</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Parcel Courier */}
                    {selectedServiceId === 'parcel-courier' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Parcel / Consignment Weight &amp; Size
                        </label>
                        <select
                          value={parcelWeight}
                          onChange={(e) => setParcelWeight(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                        >
                          <option value="Documents / Small Box (<5 kg)">Documents / Small Box (&lt;5 kg)</option>
                          <option value="Medium Carton (10 - 25 kg)">Medium Carton (10 - 25 kg)</option>
                          <option value="Heavy Luggage (25 - 50 kg)">Heavy Luggage / Multiple Cartons (25 - 50 kg)</option>
                          <option value="Commercial Consignment (50+ kg)">Commercial Consignment (50+ kg / Pallet)</option>
                        </select>
                      </div>
                    )}

                    {/* Truck Booking */}
                    {selectedServiceId === 'domestic-relocation' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Select Required Truck Type
                        </label>
                        <select
                          value={truckType}
                          onChange={(e) => setTruckType(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500"
                        >
                          <option value="Tata Ace / Mini Truck (1 Ton)">Tata Ace / Mini Truck (1 Ton, 750kg load)</option>
                          <option value="8ft Pickup (1.5 Ton)">8ft Pickup (1.5 Ton, 1 BHK moves)</option>
                          <option value="14ft Canter (3.5 Ton)">14ft Canter (3.5 Ton, 2-3 BHK moves)</option>
                          <option value="17ft - 19ft Container (7 Ton)">17ft - 19ft Container (7 Ton Intercity)</option>
                          <option value="22ft+ Multi-Axle">22ft+ Heavy Cargo Container</option>
                        </select>
                      </div>
                    )}

                  </div>
                </div>

                {/* Submit Action Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <button
                    id="btn-submit-enquiry-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-600 via-brand-orange to-amber-500 hover:from-orange-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating Guaranteed Quote...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit {currentService.shortName} Enquiry &amp; Lock Price</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Zero booking fee</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      <span>WhatsApp receipt sent instantly</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                      <span>Free relocation coordinator call</span>
                    </span>
                  </div>
                </div>

              </form>

            </div>
          ) : (
            /* ================= STEP 3: SUCCESS CONFIRMATION ================= */
            <div id="enquiry-success-view" className="p-6 sm:p-10 text-center space-y-6">
              
              {/* Celebration Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-4 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl"
              >
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
              </motion.div>

              {/* Headline */}
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  Your Enquiry Created Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Thank You, {fullName}!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Your relocation enquiry for <strong className="text-slate-900 dark:text-white">{currentService.name}</strong> has been registered in our logistics dispatch system.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enquiry ID:</span>
                <strong className="text-base sm:text-lg font-mono font-bold text-orange-600 dark:text-orange-400 tracking-wider">
                  {generatedEnquiryId}
                </strong>
              </div>

              {/* Crucial Next Steps & WhatsApp Notification Box */}
              <div className="max-w-xl mx-auto space-y-3 text-left">
                {/* Call Notice */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white font-bold block text-sm">
                      Our Relocation Team Will Call You Shortly
                    </strong>
                    Our dedicated moving coordinator will contact you on <span className="font-bold text-blue-700 dark:text-blue-300">+91 {mobileNumber}</span> to confirm your inventory list, elevator requirements, and lock in the best discounted price.
                  </div>
                </div>

                {/* WhatsApp Callout Box */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800/80 flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-emerald-900 dark:text-emerald-300 font-bold block text-sm">
                      Check Your WhatsApp For Future Communication
                    </strong>
                    We have sent an automated confirmation message, reference receipt, and estimated rate breakdown to your WhatsApp (+91 {mobileNumber}). You can reply there to share photos, floor plans, or reschedule your move.
                  </div>
                </div>
              </div>

              {/* Summary Details Grid */}
              <div className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Service</span>
                  <span className="font-bold text-slate-900 dark:text-white">{currentService.shortName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pickup</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate block">{pickupCity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Move Date</span>
                  <span className="font-bold text-slate-900 dark:text-white">{movingDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Status</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Assigned</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919500955237?text=Hi%20Packersolution,%20I%20just%20submitted%20Enquiry%20${generatedEnquiryId}%20for%20${currentService.shortName}.%20Please%20assist.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetForAnother}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Choose Another Service
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
