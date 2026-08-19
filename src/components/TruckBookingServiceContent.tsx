import React, { useState } from 'react';
import {
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Phone,
  HelpCircle,
  ChevronDown,
  Navigation,
  Calculator,
  Boxes,
  UserCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  Weight,
  Maximize2,
  FileText,
  X
} from 'lucide-react';
import { ServiceItem } from '../types';

// Vehicle Images Imports
import threeWheeler500kgImg from '../assets/images/trucks/three_wheeler_500kg.jpg';
import tataAce750kgImg from '../assets/images/trucks/tata_ace_750kg.jpg';
import tataSuperAce1tonImg from '../assets/images/trucks/tata_super_ace_1ton.jpg';
import miniTruck1tonImg from '../assets/images/trucks/mini_truck_1ton.jpg';
import pickup8ft125tonImg from '../assets/images/trucks/pickup_8ft_125ton.jpg';
import boleroPickup15tonImg from '../assets/images/trucks/bolero_pickup_15ton.jpg';
import miniTruck8ft15tonImg from '../assets/images/trucks/mini_truck_8ft_15ton.jpg';
import truck10ft18tonImg from '../assets/images/trucks/truck_10ft_18ton.jpg';
import container14ft28tonImg from '../assets/images/trucks/container_14ft_28ton.jpg';
import container17ft48tonImg from '../assets/images/trucks/container_17ft_48ton.jpg';
import container20ft65tonImg from '../assets/images/trucks/container_20ft_65ton.jpg';
import container20ft9tonImg from '../assets/images/trucks/container_20ft_9ton.jpg';
import container22ft9tonImg from '../assets/images/trucks/container_22ft_9ton.jpg';
import allTrucksFleetImg from '../assets/images/trucks/all_trucks_fleet.jpg';

// Other service vector images
import parcelVectorImg from '../assets/images/service_parcel_vector_1785319730384.jpg';
import packersVectorImg from '../assets/images/service_packers_vector_1785319746387.jpg';
import packingUnpackingVectorImg from '../assets/images/vector_packing_unpacking_1785946345528.jpg';
import loadingUnloadingVectorImg from '../assets/images/vector_loading_unloading_1785946360593.jpg';
import vehicleTransportVectorImg from '../assets/images/vector_vehicle_transport_1785946372441.jpg';
import warehousingStorageVectorImg from '../assets/images/vector_warehousing_storage_1785946384931.jpg';

export interface FleetVehicle {
  id: string;
  itemNumber: number;
  name: string;
  category: 'light' | 'intermediate' | 'heavy';
  capacity: string;
  payloadKg: number;
  dimensions: string;
  lengthFt: string;
  heightFt: string;
  image: string;
  baseFare: number;
  ratePerKm: number;
  idealFor: string;
  popularTag?: string;
  bodyType: string;
}

export const ALL_TRUCK_FLEET: FleetVehicle[] = [
  // ================= Tab 1 : Light – Below 750 kg =================
  {
    id: '3-wheeler-500kg',
    itemNumber: 1,
    name: '3 Wheeler',
    category: 'light',
    capacity: '500 kg',
    payloadKg: 500,
    dimensions: '6 ft × 4.5 ft',
    lengthFt: '6 ft',
    heightFt: '4.5 ft',
    image: threeWheeler500kgImg,
    baseFare: 150,
    ratePerKm: 14,
    bodyType: 'Open Cargo Deck',
    idealFor: 'Small furniture, 2-3 boxes, TV, appliances, single room items & quick city parcel deliveries'
  },
  {
    id: 'tata-ace-750kg',
    itemNumber: 2,
    name: 'Tata Ace',
    category: 'light',
    capacity: '750 kg',
    payloadKg: 750,
    dimensions: '7.2 ft × 4.5 ft',
    lengthFt: '7.2 ft',
    heightFt: '4.5 ft',
    image: tataAce750kgImg,
    baseFare: 180,
    ratePerKm: 18,
    bodyType: 'Standard Open Bed / Tarpaulin',
    idealFor: '1 BHK household shifting, retail supplies, hardware, textiles, FMCG crates & electronics',
    popularTag: 'Most Popular'
  },

  // ================= Tab 2 : Intermediate – 750 kg to 1.2 Ton =================
  {
    id: 'tata-super-ace-1ton',
    itemNumber: 3,
    name: 'Tata Super Ace',
    category: 'intermediate',
    capacity: '1 Ton',
    payloadKg: 1000,
    dimensions: '8.6 ft × 5 ft',
    lengthFt: '8.6 ft',
    heightFt: '5 ft',
    image: tataSuperAce1tonImg,
    baseFare: 220,
    ratePerKm: 20,
    bodyType: 'Extended Open Bed',
    idealFor: '1-2 BHK house relocation, timber, commercial boxes, exhibition materials & plywood sheets',
    popularTag: 'High Utility'
  },
  {
    id: 'mini-truck-1ton',
    itemNumber: 4,
    name: 'Mini Truck',
    category: 'intermediate',
    capacity: '1 Ton',
    payloadKg: 1000,
    dimensions: '8 ft × 5 ft',
    lengthFt: '8 ft',
    heightFt: '5 ft',
    image: miniTruck1tonImg,
    baseFare: 240,
    ratePerKm: 21,
    bodyType: 'Weather-Proof Closed Container',
    idealFor: 'Closed weather-protected cargo, sensitive electronics, e-commerce, packaged cartons & pharmaceutical goods'
  },

  // ================= Tab 3 : Heavy – Above 1.2 Ton =================
  {
    id: 'pickup-8ft-125ton',
    itemNumber: 5,
    name: '8 Ft Pickup',
    category: 'heavy',
    capacity: '1.25 Ton',
    payloadKg: 1250,
    dimensions: '8 ft × 4.8 ft',
    lengthFt: '8 ft',
    heightFt: '4.8 ft',
    image: pickup8ft125tonImg,
    baseFare: 280,
    ratePerKm: 24,
    bodyType: 'Heavy-Duty Pickup Open Bed',
    idealFor: 'Plywood, construction materials, machinery spares, 2 BHK furniture & metal fabrications'
  },
  {
    id: 'bolero-pickup-15ton',
    itemNumber: 6,
    name: 'Bolero Pickup',
    category: 'heavy',
    capacity: '1.5 Ton',
    payloadKg: 1500,
    dimensions: '8.4 ft × 5 ft',
    lengthFt: '8.4 ft',
    heightFt: '5 ft',
    image: boleroPickup15tonImg,
    baseFare: 320,
    ratePerKm: 26,
    bodyType: 'Reinforced Open Bed',
    idealFor: 'Agricultural produce, industrial freight, metal rods, rough terrain transit & wholesale goods',
    popularTag: 'Commercial Workhorse'
  },
  {
    id: 'mini-truck-8ft-15ton',
    itemNumber: 7,
    name: '8 Ft Mini Truck',
    category: 'heavy',
    capacity: '1.5 Ton',
    payloadKg: 1500,
    dimensions: '8.8 ft × 5 ft',
    lengthFt: '8.8 ft',
    heightFt: '5 ft',
    image: miniTruck8ft15tonImg,
    baseFare: 340,
    ratePerKm: 27,
    bodyType: 'High-Sided Metal Cage Bed',
    idealFor: 'Caged & tall furniture, plants, scaffolding, oversized retail stock, pallets & event sets'
  },
  {
    id: 'truck-10ft-18ton',
    itemNumber: 8,
    name: '10 Ft Truck',
    category: 'heavy',
    capacity: '1.8 Ton',
    payloadKg: 1800,
    dimensions: '10 ft × 5.5 ft',
    lengthFt: '10 ft',
    heightFt: '5.5 ft',
    image: truck10ft18tonImg,
    baseFare: 450,
    ratePerKm: 30,
    bodyType: 'Heavy Commercial Closed Box',
    idealFor: '2-3 BHK complete home moving, factory consignments, tech equipment & intercity distribution'
  },
  {
    id: 'container-14ft-28ton',
    itemNumber: 9,
    name: '14 Ft Container',
    category: 'heavy',
    capacity: '2.8 Ton',
    payloadKg: 2800,
    dimensions: '14 ft × 6 ft',
    lengthFt: '14 ft',
    heightFt: '6 ft',
    image: container14ft28tonImg,
    baseFare: 650,
    ratePerKm: 35,
    bodyType: 'Weather-Proof High Volume Container',
    idealFor: '3 BHK shifting, bulk warehouse cargo, commercial intercity distribution & machinery parts',
    popularTag: 'Best for 3 BHK'
  },
  {
    id: 'container-17ft-48ton',
    itemNumber: 10,
    name: '17 Ft Container',
    category: 'heavy',
    capacity: '4.8 Ton',
    payloadKg: 4800,
    dimensions: '17 ft × 7 ft',
    lengthFt: '17 ft',
    heightFt: '7 ft',
    image: container17ft48tonImg,
    baseFare: 950,
    ratePerKm: 42,
    bodyType: 'Heavy-Duty Logistics Container',
    idealFor: 'Bulk manufacturing cargo, corporate office moves, textile export bales & large-scale shipments'
  },
  {
    id: 'container-20ft-65ton',
    itemNumber: 11,
    name: '20 Ft Container (6.5 Ton)',
    category: 'heavy',
    capacity: '6.5 Ton',
    payloadKg: 6500,
    dimensions: '20 ft × 8 ft',
    lengthFt: '20 ft',
    heightFt: '8 ft',
    image: container20ft65tonImg,
    baseFare: 1400,
    ratePerKm: 50,
    bodyType: 'Multi-Axle Heavy Commercial Container',
    idealFor: 'Heavy commercial cargo, luxury villa moves, industrial machinery transport & FMCG freight'
  },
  {
    id: 'container-20ft-9ton',
    itemNumber: 12,
    name: '20 Ft Container (9 Ton)',
    category: 'heavy',
    capacity: '9 Ton',
    payloadKg: 9000,
    dimensions: '20 ft × 8 ft',
    lengthFt: '20 ft',
    heightFt: '8 ft',
    image: container20ft9tonImg,
    baseFare: 1800,
    ratePerKm: 58,
    bodyType: 'Heavy Multi-Axle Industrial Container',
    idealFor: 'Multi-ton raw materials, steel coils, bulk FMCG, industrial plant gear & national freight'
  },
  {
    id: 'container-22ft-9ton',
    itemNumber: 13,
    name: '22 Ft Container (9 Ton)',
    category: 'heavy',
    capacity: '9 Ton',
    payloadKg: 9000,
    dimensions: '22 ft × 8 ft',
    lengthFt: '22 ft',
    heightFt: '8 ft',
    image: container22ft9tonImg,
    baseFare: 2200,
    ratePerKm: 65,
    bodyType: 'Extended High-Cube Long-Haul Container',
    idealFor: 'High-volume volumetric cargo, Pan-India long-haul freight, mega factory setups & inter-state transit',
    popularTag: 'Long Haul Leader'
  }
];

const TRUCK_TABS = [
  {
    id: 'light',
    title: 'Light – Below 750 kg',
    subtitle: '500 kg – 3 Wheeler • 750 kg – Tata Ace',
    count: 2,
    badge: 'Quick City Transit'
  },
  {
    id: 'intermediate',
    title: 'Intermediate – 750 kg to 1.2 Ton',
    subtitle: '1 Ton – Tata Super Ace • 1 Ton – Mini Truck',
    count: 2,
    badge: 'Medium Cargo'
  },
  {
    id: 'heavy',
    title: 'Heavy – Above 1.2 Ton',
    subtitle: '1.25 Ton to 9 Ton Containers & Pickups',
    count: 9,
    badge: 'Commercial & Multi-BHK'
  }
] as const;

const OTHER_SERVICES_MENU = [
  {
    id: 'household-shifting',
    name: 'House Shifting',
    image: packersVectorImg,
    badge: 'Up to 30% Off'
  },
  {
    id: 'parcel-courier',
    name: 'Parcel & Courier',
    image: parcelVectorImg,
    badge: 'Express Pickup'
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
    id: 'warehousing-storage',
    name: 'Storage Solutions',
    image: warehousingStorageVectorImg,
    badge: 'CCTV Vault'
  }
];

interface TruckBookingServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity: (city: string) => void;
  onSelectService: (serviceId: string) => void;
  onOpenEnquiry: () => void;
  onOpenLoginModal?: () => void;
}

export const TruckBookingServiceContent: React.FC<TruckBookingServiceContentProps> = ({
  selectedCity,
  onSelectService,
  onOpenEnquiry
}) => {
  const [activeTab, setActiveTab] = useState<'light' | 'intermediate' | 'heavy'>('light');
  const [selectedTruckId, setSelectedTruckId] = useState<string>('tata-ace-750kg');
  const [detailModalVehicle, setDetailModalVehicle] = useState<FleetVehicle | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [tableFilter, setTableFilter] = useState<'all' | 'light' | 'intermediate' | 'heavy'>('all');

  const filteredVehicles = ALL_TRUCK_FLEET.filter((v) => v.category === activeTab);
  const tableVehicles = tableFilter === 'all' 
    ? ALL_TRUCK_FLEET 
    : ALL_TRUCK_FLEET.filter((v) => v.category === tableFilter);

  const selectedVehicleObj = ALL_TRUCK_FLEET.find((v) => v.id === selectedTruckId) || ALL_TRUCK_FLEET[1];

  const faqs = [
    {
      q: `How quickly can I get a truck dispatched in ${selectedCity}?`,
      a: `Our automated dispatch engine matches and assigns the nearest verified driver within 2–5 minutes. Drivers arrive at your pickup location within 15–30 minutes across all key industrial, commercial, and residential zones in ${selectedCity}.`
    },
    {
      q: 'Are tolls, parking, and permit fees included in the base fare?',
      a: 'Base fares cover the vehicle hiring and initial distance (1.0 km). Toll taxes, municipal parking fees, and interstate permits (for outstation trips) are charged at actuals and billed transparently without extra markups.'
    },
    {
      q: 'Can I add helper assistance for loading and unloading?',
      a: 'Yes, you can request 1, 2, or more trained helpers during booking. Helper charges are calculated on an economical hourly and floor-climbing basis to ensure stress-free loading.'
    },
    {
      q: 'How does live GPS tracking work?',
      a: 'Once your driver begins transit, you receive an instant live GPS tracking link via SMS & WhatsApp. You and your receiver can monitor the exact location in real-time until delivery confirmation with OTP.'
    },
    {
      q: 'Which truck size is best suited for 1 BHK or 2 BHK shifting?',
      a: 'For 1 BHK compact households, Tata Ace (750 kg) or Tata Super Ace (1 Ton) is ideal. For 2 BHK full households, we recommend the 8 Ft Bolero Pickup (1.5 Ton) or 10 Ft Truck (1.8 Ton). For 3 BHK and large villas, our 14 Ft or 17 Ft closed containers ensure single-trip transit.'
    }
  ];

  return (
    <div id="truck-booking-details-view" className="space-y-12">
      
      {/* 1. PORTER FLEET SHOWCASE WITH TABS */}
      <section id="truck-fleet-showcase" className="space-y-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Commercial Fleet Logistics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Book Your Trucks in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Choose from 13 verified vehicle classes categorized by payload capacity for seamless intra-city and intercity cargo transit.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900 text-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-xs text-xs font-bold shrink-0">
            <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>~15 Min Pickup in {selectedCity}</span>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
          {TRUCK_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id as 'light' | 'intermediate' | 'heavy');
                  const firstInTab = ALL_TRUCK_FLEET.find((v) => v.category === tab.id);
                  if (firstInTab) setSelectedTruckId(firstInTab.id);
                }}
                className={`flex-1 py-3 px-4 rounded-xl sm:rounded-2xl text-center transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border border-slate-200/60 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className={`text-xs sm:text-sm font-bold tracking-tight text-center block ${isActive ? 'text-orange-600 dark:text-orange-400 font-extrabold' : ''}`}>
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* VEHICLE CARDS GRID FOR ACTIVE TAB - LARGE CLEAR IMAGES & UNIFORM COMPACT CARDS */}
        <div className="flex flex-wrap gap-3.5 sm:gap-4.5 items-stretch justify-start">
          {filteredVehicles.map((vehicle) => {
            const isSelected = selectedTruckId === vehicle.id;
            return (
              <div
                key={vehicle.id}
                id={`truck-card-${vehicle.id}`}
                onClick={() => {
                  setSelectedTruckId(vehicle.id);
                  setDetailModalVehicle(vehicle);
                }}
                className={`group w-[calc(50%-7px)] sm:w-[210px] md:w-[225px] shrink-0 rounded-2xl border transition-all duration-200 p-3.5 sm:p-4.5 flex flex-col items-center text-center cursor-pointer relative bg-white dark:bg-slate-900 ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md'
                }`}
              >
                {/* 1. Large High-Clarity Vehicle Image (includes dimensions & payload inside image) */}
                <div className="w-full h-36 sm:h-44 md:h-48 flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-1">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.name} (${vehicle.dimensions} - ${vehicle.capacity})`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter contrast-[1.05] brightness-[1.01] drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* 2. Vehicle Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-2 tracking-tight line-clamp-1">
                  {vehicle.name}
                </h3>

                {/* 3. Starting Fare */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Starting from <strong className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">₹{vehicle.baseFare}</strong>
                </p>

                {/* 4. Know More Link Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailModalVehicle(vehicle);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-xs underline underline-offset-4 decoration-dotted hover:decoration-solid mt-2.5 cursor-pointer"
                >
                  Know More
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. INSTANT FARE ESTIMATOR CALCULATOR */}
      <section id="instant-fare-estimator" className="bg-gradient-to-br from-[#001261] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-orange-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Pricing Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Get an Accurate Transport Estimate for {selectedCity}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            No hidden driver charges, no surprise surge fees. Calculate your accurate goods transport fare based on exact pickup and drop pin-codes with optional helper assistance.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenEnquiry}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Calculate Precise Trip Fare</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenEnquiry}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-colors flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Talk to Fleet Dispatcher</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE PACKERSOLUTION TRUCK BOOKING */}
      <section id="why-choose-trucks" className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Why Choose Packersolution Truck Booking in {selectedCity}?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
            The smartest, fastest, and most transparent way to move goods locally or intercity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">15-Minute Instant Dispatch</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Nearby driver partner assigned within minutes. Fast pickup across all major industrial and residential hubs in {selectedCity}.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Transparent Fixed Rate Card</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              No driver haggling or unannounced surge charges. Pay exact fare calculated by distance and vehicle payload class.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Navigation className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Live GPS Shipment Tracking</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Track your vehicle live from pickup point to drop location with real-time location sharing via SMS and WhatsApp.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Verified Commercial Drivers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Background-checked, commercial-license verified drivers ensuring high cargo safety, punctuality, and courtesy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Boxes className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Helper Assistance Available</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Opt for skilled helpers to assist in loading and unloading heavy boxes, appliances, industrial machinery, or furniture.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Multi-Stop Drop Facility</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Deliver goods to multiple clients or branch locations across {selectedCity} in a single organized truck route.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE FLEET RATE CARD TABLE (ALL 13 VEHICLES) */}
      <section id="truck-fare-table" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Complete Vehicle Rate Matrix in {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              Standard base rates and per km distance charges for all 13 commercial vehicle classes.
            </p>
          </div>

          {/* Table Filter buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            {(['all', 'light', 'intermediate', 'heavy'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTableFilter(filter)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer capitalize ${
                  tableFilter === filter
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All (13)' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 dark:bg-slate-950 text-white font-semibold font-mono text-[10px] uppercase tracking-wider">
                  <th className="px-5 py-3.5 border-b border-slate-800">#</th>
                  <th className="px-5 py-3.5 border-b border-slate-800">Vehicle Model</th>
                  <th className="px-5 py-3.5 border-b border-slate-800">Category</th>
                  <th className="px-5 py-3.5 border-b border-slate-800">Payload</th>
                  <th className="px-5 py-3.5 border-b border-slate-800">Deck Size</th>
                  <th className="px-5 py-3.5 border-b border-slate-800 text-right">Base Fare</th>
                  <th className="px-5 py-3.5 border-b border-slate-800 text-right">Per KM</th>
                  <th className="px-5 py-3.5 border-b border-slate-800 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                {tableVehicles.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-slate-400 font-bold">{f.itemNumber}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                        <img src={f.image} alt={f.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <span>{f.name}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        f.category === 'light' 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                          : f.category === 'intermediate'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                          : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                      }`}>
                        {f.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-bold">{f.capacity}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">{f.dimensions}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-black text-slate-900 dark:text-white text-sm">₹{f.baseFare}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-black text-orange-600 dark:text-orange-400 text-sm">₹{f.ratePerKm}/km</td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={onOpenEnquiry}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3.5 border-t border-slate-200/80 dark:border-slate-800 text-[10px] text-slate-400 font-semibold font-mono">
            * Base fares include initial 1.0 km travel. Toll taxes, parking charges, and state permits (for intercity) payable as applicable.
          </div>
        </div>
      </section>

      {/* 5. HOW TO BOOK A TRUCK */}
      <section id="how-to-book-truck" className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            How to Rent a Commercial Truck in {selectedCity}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
            4 quick steps to dispatch your cargo truck in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs relative space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Select Vehicle Category</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose from Light, Intermediate, or Heavy truck categories based on your cargo payload and dimensions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs relative space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Enter Pickup &amp; Drop</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Add pickup address, drop destination, and choose optional helper assistance if heavy lifting is needed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs relative space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Instant Driver Partner Match</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get connected with the nearest verified commercial driver who arrives at your doorstep in ~15 minutes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs relative space-y-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center">
              4
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Live Track &amp; Safe Delivery</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Track live transit via GPS map sharing and receive prompt digital delivery confirmation with OTP.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section id="truck-booking-faqs" className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Frequently Asked Questions on Truck Rental in {selectedCity}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
            Clear answers to common questions about truck sizing, pricing, and transit.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. OTHER SERVICES NAVIGATION */}
      <section id="other-truck-services" className="space-y-4">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Explore Other Logistics Channels
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OTHER_SERVICES_MENU.map((svc) => (
            <button
              key={svc.id}
              onClick={() => onSelectService(svc.id)}
              className="bg-white dark:bg-slate-900 hover:bg-orange-50/40 dark:hover:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left transition-all group flex flex-col items-center text-center gap-2 cursor-pointer shadow-xs"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 block leading-tight">
                  {svc.name}
                </span>
                <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">
                  {svc.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* VEHICLE QUICK DETAILS MODAL ("KNOW MORE") */}
      {detailModalVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setDetailModalVehicle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {detailModalVehicle.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {detailModalVehicle.bodyType} • Category: {detailModalVehicle.category.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Vehicle Preview Graphic */}
            <div className="w-full h-44 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center justify-center">
              <img
                src={detailModalVehicle.image}
                alt={detailModalVehicle.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Payload Capacity</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{detailModalVehicle.capacity} ({detailModalVehicle.payloadKg} kg)</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Bed Dimensions</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{detailModalVehicle.dimensions}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Base Fare (1st km)</span>
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm mt-0.5 block">₹{detailModalVehicle.baseFare}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance Rate</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">₹{detailModalVehicle.ratePerKm} / km</span>
              </div>
            </div>

            {/* Best For Note */}
            <div className="text-xs text-slate-600 dark:text-slate-300 bg-orange-50/50 dark:bg-orange-950/20 p-3.5 rounded-xl border border-orange-200/50 dark:border-orange-900/40">
              <strong className="text-orange-900 dark:text-orange-300 font-bold">Ideal Cargo: </strong>
              <span>{detailModalVehicle.idealFor}</span>
            </div>

            {/* Booking CTA */}
            <button
              onClick={() => {
                setDetailModalVehicle(null);
                onOpenEnquiry();
              }}
              className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Book {detailModalVehicle.name} in {selectedCity}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
