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
  X,
  Award,
  DollarSign,
  Zap,
  Building2,
  MessageSquare,
  Home,
  Briefcase
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
    id: 'packers-and-movers',
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

const PAN_INDIA_ROUTES = [
  { destination: 'Kochi', distance: '190 Kms', estTime: '~5 - 6 hrs' },
  { destination: 'Madurai', distance: '215 Kms', estTime: '~5 - 6 hrs' },
  { destination: 'Bengaluru', distance: '365 Kms', estTime: '~7 - 8 hrs' },
  { destination: 'Chennai', distance: '505 Kms', estTime: '~9 - 10 hrs' },
  { destination: 'Hyderabad', distance: '730 Kms', estTime: '~14 - 16 hrs' },
  { destination: 'Pune', distance: '1,175 Kms', estTime: '~24 - 28 hrs' },
  { destination: 'Mumbai', distance: '1,340 Kms', estTime: '~28 - 32 hrs' },
  { destination: 'Ahmedabad', distance: '1,750 Kms', estTime: '~36 - 40 hrs' },
  { destination: 'Kolkata', distance: '1,950 Kms', estTime: '~42 - 46 hrs' },
  { destination: 'Jaipur', distance: '2,150 Kms', estTime: '~45 - 50 hrs' },
  { destination: 'Delhi', distance: '2,250 Kms', estTime: '~48 - 54 hrs' },
  { destination: 'Guwahati', distance: '2,650 Kms', estTime: '~60 - 72 hrs' },
];

const ADDITIONAL_TRUCK_ROUTES = [
  {
    region: 'Tamil Nadu',
    routes: [
      'Coimbatore to Tiruppur',
      'Coimbatore to Erode',
      'Coimbatore to Salem',
      'Coimbatore to Tiruchirappalli',
      'Coimbatore to Dindigul',
      'Coimbatore to Tirunelveli',
      'Coimbatore to Thanjavur',
      'Coimbatore to Vellore',
      'Coimbatore to Hosur',
      'Coimbatore to Kanyakumari',
    ]
  },
  {
    region: 'Kerala',
    routes: [
      'Coimbatore to Palakkad',
      'Coimbatore to Thrissur',
      'Coimbatore to Kozhikode',
      'Coimbatore to Malappuram',
      'Coimbatore to Kannur',
      'Coimbatore to Thiruvananthapuram',
    ]
  },
  {
    region: 'Karnataka',
    routes: [
      'Coimbatore to Mysuru',
      'Coimbatore to Mangaluru',
      'Coimbatore to Hubballi',
      'Coimbatore to Belagavi',
    ]
  },
  {
    region: 'Andhra Pradesh & Telangana',
    routes: [
      'Coimbatore to Vijayawada',
      'Coimbatore to Visakhapatnam',
      'Coimbatore to Tirupati',
      'Coimbatore to Warangal',
    ]
  },
  {
    region: 'Maharashtra & Gujarat',
    routes: [
      'Coimbatore to Nashik',
      'Coimbatore to Aurangabad',
      'Coimbatore to Kolhapur',
      'Coimbatore to Rajkot',
    ]
  },
  {
    region: 'North & East India',
    routes: [
      'Coimbatore to Lucknow',
      'Coimbatore to Kanpur',
      'Coimbatore to Chandigarh',
      'Coimbatore to Patna',
      'Coimbatore to Ranchi',
      'Coimbatore to Bhubaneswar',
      'Coimbatore to Guwahati',
    ]
  },
];

interface TruckBookingServiceContentProps {
  selectedCity: string;
  activeService?: ServiceItem;
  onSelectCity?: (city: string) => void;
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

  const filteredVehicles = ALL_TRUCK_FLEET.filter((v) => v.category === activeTab);

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
      
      {/* =========================================================================
          1. PORTER FLEET SHOWCASE & HERO SECTION WITH TABS
         ========================================================================= */}
      <section id="truck-fleet-showcase" className="space-y-8">
        
        {/* Hero Banner with House Shifting Styled Gradient Card */}
        <div className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl relative overflow-hidden space-y-5">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>1. Commercial Fleet Logistics • {selectedCity}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                  Book Your Trucks in {selectedCity}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal mt-2">
                  Choose from 13 verified vehicle classes categorized by payload capacity for seamless intra-city and intercity cargo transit.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 text-white px-4 py-2.5 rounded-2xl border border-white/15 shadow-xs text-xs font-bold shrink-0">
                <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>~15 Min Pickup in {selectedCity}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenEnquiry}
                id="truck-hero-quote-btn"
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Book Instant Truck</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                id="truck-hero-rate-btn"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Calculate Freight Fare</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB SWITCHER - HIGH CONTRAST CLEAN BUTTONS */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 pb-2 pt-1">
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
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#001261] dark:bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{tab.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* VEHICLE CARDS GRID FOR ACTIVE TAB - LARGE CLEAR IMAGES & UNIFORM COMPACT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
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
                  className={`group rounded-2xl border transition-all duration-200 p-3.5 sm:p-4.5 flex flex-col items-center text-center cursor-pointer relative bg-white dark:bg-slate-900 ${
                    isSelected
                      ? 'border-[#001261] dark:border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* 1. Large High-Clarity Vehicle Image */}
                  <div className="w-full h-32 sm:h-36 flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-1">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} (${vehicle.dimensions} - ${vehicle.capacity})`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter contrast-[1.05] brightness-[1.01] drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 2. Vehicle Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2 tracking-tight line-clamp-1">
                    {vehicle.name}
                  </h3>

                  {/* 3. Starting Fare */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Starting from <strong className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">₹{vehicle.baseFare}</strong>
                  </p>

                  {/* 4. Know More Link Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailModalVehicle(vehicle);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-xs underline underline-offset-4 decoration-dotted hover:decoration-solid mt-2 cursor-pointer"
                  >
                    Know More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. POPULAR PAN-INDIA TRUCK ROUTES FROM COIMBATORE
         ========================================================================= */}
      <section id="pan-india-truck-routes" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>2. Pan-India Freight Corridors</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Popular Pan-India Truck Routes from Coimbatore
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Direct full-truckload (FTL) and scheduled part-load freight transit across major interstate commercial corridors.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {PAN_INDIA_ROUTES.map((route) => (
            <div
              key={route.destination}
              id={`route-item-${route.destination.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 shadow-xs hover:border-blue-400 transition-colors flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Coimbatore to {route.destination}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {route.estTime}
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#001261] dark:text-blue-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md shrink-0 border border-slate-100 dark:border-slate-700">
                {route.distance}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. ADDITIONAL TRUCK BOOKING ROUTES FROM COIMBATORE - SEO OPTIMIZED
         ========================================================================= */}
      <section
        id="additional-truck-routes"
        className="space-y-6"
        aria-label="Additional Truck Booking Routes from Coimbatore"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Regional Logistics Networks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Additional Truck Booking Routes from Coimbatore
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Verified goods transport services, mini truck hire, and commercial truck transport corridors connecting Coimbatore to major industrial hubs across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADDITIONAL_TRUCK_ROUTES.map((group) => (
            <article
              key={group.region}
              id={`additional-routes-${group.region.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              itemScope
              itemType="https://schema.org/ItemList"
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-start"
            >
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-500" />
                  <h4 itemProp="name" className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                    {group.region}
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                  {group.routes.length} Routes
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {group.routes.map((route, rIndex) => (
                  <li
                    key={route}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center gap-2"
                  >
                    <meta itemProp="position" content={String(rIndex + 1)} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                    <a
                      href="#booking-section"
                      itemProp="name"
                      title={`Online truck transport & goods booking for ${route}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenEnquiry();
                      }}
                      className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors cursor-pointer"
                    >
                      {route}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. TRUCK BOOKING SERVICES IN COIMBATORE
         ========================================================================= */}
      <section id="truck-booking-services-coimbatore" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>4. Comprehensive Truck Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Truck Booking Services in Coimbatore
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our Online Truck Booking service in Coimbatore helps customers book suitable vehicles for household shifting, office relocation, commercial transportation, industrial goods movement, warehouse transportation, furniture delivery, and full truck load requirements.
          </p>
        </div>

        {/* WE SUPPORT OVERVIEW CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>We Support</span>
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {[
              'House Shifting – Local',
              'House Shifting – Domestic',
              'Office Shifting',
              'Corporate Shifting',
              'Commercial Goods Transportation',
              'Industrial Goods Transportation',
              'Warehouse Transportation',
              'Business Goods Delivery',
              'Furniture Transportation',
              'Full Truck Load (FTL) Transportation',
            ].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 font-medium">
            Customers can select a suitable vehicle based on shipment volume, load requirements, distance, and transportation needs.
          </p>
        </div>

        {/* 5 DETAILED SERVICE BREAKDOWN CARDS - FULL-WIDTH UNIFORM STRUCTURE */}
        <div className="space-y-4">
          {/* 1. Local House Shifting Truck Booking */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Local House Shifting Truck Booking
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                For house shifting within Coimbatore, customers can book suitable mini trucks, pickup vehicles, and container vehicles based on the size and quantity of household goods.
              </p>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2.5">Suitable For:</h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    '1 RK Shifting',
                    '1 BHK Shifting',
                    '2 BHK Shifting',
                    '3 BHK Shifting',
                    'Partial Household Shifting',
                    'Furniture Transportation',
                    'Single-Item Transportation',
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              Customers who need a complete relocation service can also coordinate packing, loading, transportation, unloading, and unpacking.
            </p>
          </div>

          {/* 2. Domestic House Shifting Truck Booking */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Domestic House Shifting Truck Booking
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our domestic truck booking service helps customers transport household goods from Coimbatore to other cities across India.
              </p>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2.5">Popular Routes:</h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    'Coimbatore to Chennai',
                    'Coimbatore to Bengaluru',
                    'Coimbatore to Hyderabad',
                    'Coimbatore to Kochi',
                    'Coimbatore to Mumbai',
                    'Coimbatore to Pune',
                    'Coimbatore to Delhi',
                    'Coimbatore to Madurai',
                    'Coimbatore to Salem',
                    'Coimbatore to Erode',
                    'Coimbatore to Tiruppur',
                  ].map((route) => (
                    <div
                      key={route}
                      className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{route}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              Vehicle selection depends on shipment volume, weight, dimensions, route, loading requirements, and vehicle availability.
            </p>
          </div>

          {/* 3. Office & Corporate Truck Booking */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Office &amp; Corporate Truck Booking
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our Office &amp; Corporate Truck Booking service in Coimbatore supports businesses relocating offices, warehouses, showrooms, corporate workspaces, and commercial facilities.
              </p>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2.5">Suitable For:</h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    'Office Furniture',
                    'Workstations',
                    'Computers & IT Equipment',
                    'Documents & Cartons',
                    'Conference Tables',
                    'Office Cabinets',
                    'Commercial Inventory',
                    'Warehouse Stock',
                    'Business Equipment',
                    'Corporate Assets',
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              For larger office and corporate relocations, multiple vehicles or container trucks can be arranged based on total shipment volume.
            </p>
          </div>

          {/* 4. Full Truck Load (FTL) Transportation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Full Truck Load (FTL) Transportation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our Full Truck Load (FTL) Transportation service is suitable for customers who require an entire vehicle for their shipment.
              </p>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2.5">FTL Transportation Is Suitable For:</h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    'Large Household Shifting',
                    'Factory Goods',
                    'Industrial Machinery',
                    'Commercial Inventory',
                    'Production Materials',
                    'Warehouse Stock',
                    'Bulk Goods Transportation',
                    'Long-Distance Logistics',
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              The vehicle is assigned specifically to the customer's shipment, helping minimize unnecessary handling and providing dedicated transportation for larger consignments.
            </p>
          </div>

          {/* 5. Commercial & Industrial Truck Booking */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Commercial &amp; Industrial Truck Booking
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our Commercial &amp; Industrial Truck Booking service in Coimbatore supports retailers, manufacturers, wholesalers, distributors, production companies, warehouses, and other businesses.
              </p>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2.5">Commercial &amp; Industrial Goods We Transport:</h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    'Industrial Equipment',
                    'Machinery',
                    'Production Materials',
                    'Commercial Products',
                    'Retail Inventory',
                    'Warehouse Goods',
                    'Office Equipment',
                    'Heavy Cargo',
                    'Bulk Shipments',
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              Vehicle selection can be planned according to the type, size, weight, quantity, and destination of the goods.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW ONLINE TRUCK BOOKING WORKS (8 STEPS)
         ========================================================================= */}
      <section id="how-truck-booking-works" className="space-y-6" aria-label="How Online Truck Booking Works">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Booking Process</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            How Online Truck Booking Works
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Packer Solutions makes Online Truck Booking Services in Coimbatore simple through a structured booking process. Customers can request a vehicle without visiting a transport office or spending time contacting multiple vehicle owners.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: 1,
                title: 'Enter Pickup & Drop Location',
                desc: 'Enter the complete pickup location and destination where the vehicle is required. Our team uses the route information to identify suitable transportation options.'
              },
              {
                step: 2,
                title: 'Select the Vehicle Type',
                desc: 'Based on your shipment size, weight, CFT volume, and transportation requirement, you can select a suitable vehicle from available options such as mini pickups, LCV trucks, container vehicles, and heavy commercial vehicles.'
              },
              {
                step: 3,
                title: 'Check Recommended Price',
                desc: 'Our system provides a recommended transportation price based on the route, vehicle type, distance, and expected transportation requirements.'
              },
              {
                step: 4,
                title: 'Submit Your Bid Price',
                desc: 'If you have a specific transportation budget, you can submit a Bid Price. The request is forwarded to our logistics operations team for verification.'
              },
              {
                step: 5,
                title: 'Vehicle Availability Verification',
                desc: 'Our transport coordinators check available vehicles through our logistics network and verified transport partners. The team compares the requested rate, route, vehicle capacity, and availability before confirming the vehicle.'
              },
              {
                step: 6,
                title: 'Receive Vehicle & Driver Details',
                desc: 'After vehicle confirmation, customers receive available vehicle information, driver details, estimated pickup time, and booking confirmation through WhatsApp or SMS.'
              },
              {
                step: 7,
                title: 'Pay Booking Token',
                desc: 'After approving the quotation, customers can securely pay the applicable online booking token to confirm the vehicle reservation.'
              },
              {
                step: 8,
                title: 'Vehicle Pickup',
                desc: 'The assigned vehicle arrives at the scheduled pickup location according to the confirmed booking time and transportation plan.'
              },
            ].map((item) => (
              <div
                key={item.step}
                id={`booking-step-${item.step}`}
                className="flex items-start gap-3 p-3.5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div className="w-8 h-8 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {item.step}
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE PACKER SOLUTIONS
         ========================================================================= */}
      <section id="why-choose-trucks" className="space-y-6" aria-label="Why Choose Packer Solutions">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Why Choose Packer Solutions?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Why Choose Packer Solutions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            The smartest, fastest, and most transparent way to move goods locally or intercity.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {[
              'Professional Online Truck Booking in Coimbatore',
              'Local and domestic truck booking',
              'House shifting vehicle booking',
              'Office and corporate shifting support',
              'LCV, ICV, MCV and HCV transportation',
              '7 Ft to 22 Ft vehicle options',
              'Mini pickup and container trucks',
              'Full Truck Load transportation',
              'Commercial and industrial goods transportation',
              'Verified transport partner network',
              'Vehicle availability verification',
              'Transparent recommended pricing',
              'Bid price facility',
              'WhatsApp / SMS booking confirmation',
              'Driver and vehicle details after confirmation',
              'Online booking token payment',
              'Professional logistics coordination',
              'Local and interstate transportation support',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#001261] dark:bg-blue-400 mt-2 shrink-0" />
                <span className="font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================================
          7. BOOK YOUR ONLINE TRUCK IN COIMBATORE TODAY
         ========================================================================= */}
      <section id="how-to-book-truck" className="space-y-6" aria-label="Book Your Online Truck in Coimbatore Today">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Easy Booking &amp; Coordination</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Book Your Online Truck in Coimbatore Today
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Whether you need a mini pickup for local house shifting, a container truck for domestic relocation, or a heavy commercial vehicle for industrial transportation, Packer Solutions provides convenient Online Truck Booking in Coimbatore with transparent pricing and professional logistics coordination.
          </p>
          <p>
            Enter your pickup and drop locations, select the required vehicle category, check the recommended price, or submit your preferred bid price. Our logistics team will verify vehicle availability and provide the most suitable transportation option for your requirement.
          </p>
          <p className="pt-3 border-t border-slate-100 dark:border-slate-800 font-medium text-slate-800 dark:text-slate-200">
            Contact Packer Solutions today to book a truck for House Shifting, Office Shifting, Corporate Shifting, Commercial Goods Transportation, Industrial Cargo, Full Truck Load (FTL), or Long-Distance Logistics Services.
          </p>
        </div>
      </section>

      {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section id="truck-booking-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Frequently Asked Questions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Frequently Asked Questions on Truck Rental in {selectedCity}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1 pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          9. 24/7 HELPLINE & FAST BOOKING CALLOUT
         ========================================================================= */}
      <section id="section-callout-contact" className="bg-gradient-to-r from-blue-900 to-[#001261] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200">
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>24/7 Priority Truck Dispatch Hotline</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Need Immediate Truck Assistance in {selectedCity}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-normal">
            Speak directly with our dedicated truck freight coordinators. Get instant vehicle matching, custom tonnage rates, and live vehicle status updates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Instant Truck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="tel:1800123000"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-blue-300" />
            <span>1800-123-000</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          10. OTHER SERVICES NAVIGATION
         ========================================================================= */}
      <section id="other-truck-services" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Additional Relocation Services</span>
          </div>
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Explore Other Logistics Channels
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OTHER_SERVICES_MENU.map((svc) => (
            <button
              key={svc.id}
              onClick={() => onSelectService(svc.id)}
              className="bg-white dark:bg-slate-900 hover:bg-blue-50/40 dark:hover:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left transition-all group flex flex-col items-center text-center gap-2 cursor-pointer shadow-xs"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 block leading-tight">
                  {svc.name}
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
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
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
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
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5 block">₹{detailModalVehicle.baseFare}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance Rate</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">₹{detailModalVehicle.ratePerKm} / km</span>
              </div>
            </div>

            {/* Best For Note */}
            <div className="text-xs text-slate-600 dark:text-slate-300 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 rounded-xl border border-blue-200/50 dark:border-blue-900/40">
              <strong className="text-[#001261] dark:text-blue-300 font-bold">Ideal Cargo: </strong>
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
