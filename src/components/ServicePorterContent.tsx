import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  UserCheck, 
  Smartphone, 
  QrCode, 
  Wrench, 
  Zap, 
  Maximize2, 
  Star, 
  Gift, 
  CheckCircle, 
  HelpCircle, 
  MapPin, 
  Map, 
  Layers, 
  ArrowRight,
  Clock,
  Navigation,
  Check,
  Boxes,
  Weight,
  ChevronDown,
  ChevronUp,
  Package,
  Shield,
  Headphones,
  Calculator,
  Phone,
  MessageSquare,
  ThumbsUp,
  Users,
  Award,
  DollarSign,
  Building2,
  Server,
  Briefcase,
  Table,
  FileText,
  Home,
  Tv,
  Sofa,
  Car,
  Bike,
  ClipboardCheck,
  Search,
  FileCheck,
  Warehouse,
  Calendar,
  Sparkle
} from 'lucide-react';
import { ServiceItem } from '../types';
import { OFFICE_AREA_OPTIONS } from './OfficeShiftingCardForm';
import { ParcelCourierServiceContent } from './ParcelCourierServiceContent';
import { WarehousingServiceContent } from './WarehousingServiceContent';
import { TruckBookingServiceContent } from './TruckBookingServiceContent';
import { OfficeShiftingServiceContent } from './OfficeShiftingServiceContent';
import { VehicleTransportationServiceContent } from './VehicleTransportationServiceContent';
import { PackingUnpackingServiceContent } from './PackingUnpackingServiceContent';
import { LoadingUnloadingServiceContent } from './LoadingUnloadingServiceContent';
import parcelVectorImg from '../assets/images/service_parcel_vector_1785319730384.jpg';
import packersVectorImg from '../assets/images/service_packers_vector_1785319746387.jpg';
import packingUnpackingVectorImg from '../assets/images/vector_packing_unpacking_1785946345528.jpg';
import loadingUnloadingVectorImg from '../assets/images/vector_loading_unloading_1785946360593.jpg';
import vehicleTransportVectorImg from '../assets/images/vector_vehicle_transport_1785946372441.jpg';
import warehousingStorageVectorImg from '../assets/images/vector_warehousing_storage_1785946384931.jpg';

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

interface ServicePorterContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity: (city: string) => void;
  onSelectService: (serviceId: string) => void;
  onOpenEnquiry: () => void;
  onOpenLoginModal?: () => void;
}

// Service Areas Helper based on selected city
const getServiceAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': ['Gandhipuram', 'Peelamedu', 'RS Puram', 'Singanallur', 'Ukkadam', 'Saravanampatti', 'Thudiyalur', 'Kurichi', 'Kovaipudur', 'Vadavalli', 'Ganapathy', 'Ramanathapuram', 'Sulur', 'Kinathukadavu', 'Podanur'],
    'Ahmedabad': ['Chandkheda', 'Satellite', 'Bopal', 'Ghatlodia', 'Navrangpura', 'Paldi', 'Vastrapur', 'Naranpura', 'Gota', 'Thaltej', 'C.G. Road', 'Ranip', 'Maninagar', 'Vejalpur', 'Science City Road'],
    'Bangalore': ['Indiranagar', 'Whitefield', 'Koramangala', 'HSR Layout', 'Electronic City', 'Jayanagar', 'Marathahalli', 'Bellandur', 'JP Nagar', 'Rajajinagar', 'Malleshwaram', 'BTM Layout', 'Sarjapur Road', 'Yelahanka', 'Hebbal'],
    'Mumbai': ['Andheri West', 'Bandra West', 'Powai', 'Borivali West', 'Goregaon East', 'Mulund West', 'Thane West', 'Vashi Navi Mumbai', 'Kharghar', 'Chembur', 'Lower Parel', 'Malad West', 'Colaba', 'Dadar East', 'Kalyan'],
    'Delhi': ['Dwarka', 'Saket', 'Vasant Kunj', 'Karol Bagh', 'Rajouri Garden', 'Connaught Place', 'Rohini', 'Janakpuri', 'Lajpat Nagar', 'South Ext', 'Greater Kailash', 'Preet Vihar', 'Pitampura', 'Mayur Vihar', 'Patparganj'],
    'Hyderabad': ['Gachibowli', 'Kondapur', 'Madhapur', 'Kukatpally', 'Jubilee Hills', 'Banjara Hills', 'Begumpet', 'Secunderabad', 'Ameerpet', 'Miyapur', 'Nizampet', 'LB Nagar', 'Uppal', 'Hitech City', 'Manikonda'],
    'Pune': ['Wakad', 'Koregaon Park', 'Kothrud', 'Hadapsar', 'Hinjewadi', 'Baner', 'Viman Nagar', 'Kharadi', 'Kalyani Nagar', 'Pimple Saudagar', 'Aundh', 'Katraj', 'Sinhagad Road', 'Chinchwad', 'Nigdi'],
    'Chennai': ['Adyar', 'Velachery', 'Anna Nagar', 'Nungambakkam', 'T Nagar', 'Mylapore', 'Tambaram', 'Omr Karapakkam', 'Guindy', 'Thiruvanmiyur', 'Porur', 'Mogappair', 'Perambur', 'Medavakkam', 'Sholinganallur'],
    'Surat': ['Adajan', 'Vesu', 'Pal', 'Katargam', 'Varachha', 'Piplod', 'New City Light', 'Althan', 'Rander', 'Amroli'],
    'Kolkata': ['Salt Lake', 'Rajarhat', 'New Town', 'Garia', 'Behala', 'Tollygunge', 'Jadavpur', 'Howrah', 'Dum Dum', 'Kasba'],
  };

  return areas[city] || ['Central Market', 'Industrial Hub', 'Ring Road Junction', 'Textile Park', 'IT Expressway', 'Suburbs Sector 1', 'Main Logistics Zone', 'Metro Phase II'];
};

const OTHER_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata', 'Surat'
];

interface FleetVehicle {
  id: string;
  name: string;
  capacity: string;
  baseFare: number;
  ratePerKm: number;
  dimensions: string;
  idealFor: string;
  popularTag?: string;
  iconType: string;
}

const TRUCK_FLEET: FleetVehicle[] = [
  {
    id: 'bike-2w',
    name: '2 Wheeler / Bike Delivery',
    capacity: 'Up to 20 kg',
    baseFare: 30,
    ratePerKm: 8,
    dimensions: 'Compact Parcel / Messenger Bag',
    idealFor: 'Urgent documents, small parcels, keys, food boxes, electronics',
    iconType: 'bike'
  },
  {
    id: 'tempo-3w',
    name: '3 Wheeler Tempo',
    capacity: 'Up to 500 kg',
    baseFare: 150,
    ratePerKm: 14,
    dimensions: '5.5 ft x 4.5 ft x 5.0 ft',
    idealFor: 'Small furniture, TV, fridge, 2-3 boxes, single room items',
    iconType: 'tempo'
  },
  {
    id: 'tata-ace',
    name: 'Tata Ace (Chhota Hathi)',
    capacity: 'Up to 750 kg',
    baseFare: 180,
    ratePerKm: 18,
    dimensions: '7.0 ft x 4.8 ft x 4.8 ft',
    idealFor: '1 BHK household items, commercial stock, textile rolls, hardware',
    popularTag: 'Most Popular Choice',
    iconType: 'truck'
  },
  {
    id: 'pickup-8ft',
    name: '8ft Pickup / Bolero',
    capacity: 'Up to 1,250 kg',
    baseFare: 240,
    ratePerKm: 22,
    dimensions: '8.0 ft x 4.8 ft x 4.8 ft',
    idealFor: '1-2 BHK relocation, timber, industrial equipment, heavy goods',
    iconType: 'truck'
  },
  {
    id: 'eicher-14ft',
    name: '14ft Eicher Truck',
    capacity: 'Up to 3,500 kg',
    baseFare: 650,
    ratePerKm: 32,
    dimensions: '14.0 ft x 6.0 ft x 6.5 ft',
    idealFor: '2-3 BHK household items, bulk commercial loads, factory cargo',
    iconType: 'heavy'
  },
  {
    id: 'container-32ft',
    name: '19ft / 32ft Closed Container',
    capacity: 'Up to 7,000 - 15,000 kg',
    baseFare: 1800,
    ratePerKm: 48,
    dimensions: 'Weather-proof closed heavy container',
    idealFor: 'Pan-India intercity freight, heavy manufacturing, villa shifting',
    iconType: 'heavy'
  }
];

export const ServicePorterContent: React.FC<ServicePorterContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const serviceAreas = getServiceAreas(selectedCity);
  const isTruckBooking = activeService.id === 'domestic-relocation' || activeService.name.toLowerCase().includes('truck');
  const isOfficeRelocation = activeService.id === 'office-relocation' || activeService.name.toLowerCase().includes('office');
  const isParcelCourier = activeService.id === 'parcel-courier' || activeService.id === 'parcel-transport' || activeService.name.toLowerCase().includes('parcel') || activeService.name.toLowerCase().includes('courier');
  const isWarehousing = activeService.id === 'warehousing-storage' || activeService.id === 'warehouse' || activeService.name.toLowerCase().includes('warehouse') || activeService.name.toLowerCase().includes('storage');
  const isVehicleTransport = activeService.id === 'vehicle-transportation' || activeService.id === 'vehicle-transport' || activeService.name.toLowerCase().includes('vehicle') || activeService.name.toLowerCase().includes('car') || activeService.name.toLowerCase().includes('bike');
  const isPackingUnpacking = activeService.id === 'packing-unpacking' || activeService.id === 'packing-service' || activeService.name.toLowerCase().includes('packing') || activeService.name.toLowerCase().includes('wooden');
  const isLoadingUnloading = activeService.id === 'loading-unloading' || activeService.id === 'loading-service' || activeService.name.toLowerCase().includes('loading') || activeService.name.toLowerCase().includes('crane') || activeService.name.toLowerCase().includes('forklift');

  const [selectedFleetId, setSelectedFleetId] = useState<string>('tata-ace');
  const [selectedTruck, setSelectedTruck] = useState<string>('tata-ace');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeScopeTab, setActiveScopeTab] = useState<'within-city' | 'between-city'>('within-city');

  if (isLoadingUnloading) {
    return (
      <LoadingUnloadingServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isPackingUnpacking) {
    return (
      <PackingUnpackingServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isWarehousing) {
    return (
      <WarehousingServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isParcelCourier) {
    return (
      <ParcelCourierServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isTruckBooking) {
    return (
      <TruckBookingServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isOfficeRelocation) {
    return (
      <OfficeShiftingServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  if (isVehicleTransport) {
    return (
      <VehicleTransportationServiceContent
        selectedCity={selectedCity}
        activeService={activeService}
        onSelectCity={onSelectCity}
        onSelectService={onSelectService}
        onOpenEnquiry={onOpenEnquiry}
        onOpenLoginModal={onOpenLoginModal}
      />
    );
  }

  // 18-Section Structured House Shifting & Relocation Content
  return (
    <div className="space-y-12">
      
      {/* =========================================================================
          1. HERO / GET QUOTE OVERVIEW
         ========================================================================= */}
      <section id="section-hero-quote" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Hero / Get Quote • {selectedCity}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            House Shifting Services in {selectedCity}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Move your home with confidence with Packer Solutions&apos; professional house shifting services. From packing and loading to transportation, unloading and unpacking, we provide complete home relocation solutions designed to make your move simple and stress-free.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether you are shifting within {selectedCity} or moving to another city, our trained professionals handle your household belongings with care and provide a transparent moving experience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-blue-400" />
              <span>Book Free Digital Survey</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL & COMPLETE HOUSE SHIFTING SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional House Shifting Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Professional Packers and Movers in {selectedCity}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Moving your home requires careful planning, professional packing and reliable transportation. Packer Solutions provides end-to-end house shifting and household relocation services for apartments, villas, independent houses and residential properties.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our services cover the complete relocation process, including packing, furniture dismantling, loading, transportation, unloading, unpacking and room placement. We customize every move based on your household volume, moving distance, vehicle requirements and selected services.
          </p>
        </div>

        {/* 7 Complete Service Process Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Professional Packing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We pack household belongings using appropriate protective materials to reduce the risk of scratches, breakage and transit damage.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Furniture Dismantling &amp; Reassembly</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Selected furniture can be dismantled before transportation and reassembled at the destination by trained carpenters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Safe Loading</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Household items are carefully loaded and secured with cargo belts and protective blankets for safe transportation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Door-to-Door Transportation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Move belongings from your current home to your new destination through a planned and tracked relocation process.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Unloading</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Items are carefully unloaded, brought into your premises, and systematically verified against the itemized packing list.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sofa className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Unpacking &amp; Room Placement</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Assistance with unpacking cartons and placing furniture and belongings in designated rooms for instant living comfort.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Temporary Storage</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Secure CCTV-monitored warehouse storage can be arranged when additional time is required between handover of current and new residential locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Best Packers and Movers in {selectedCity}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered relocation workflows prioritizing safety, transparent pricing, and digital tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Free Digital Survey</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Understand household volume, vehicle requirements, packing requirements and manpower before the move without surprise costs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Pricing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Quotations are based on volume, distance, vehicle size, manpower and selected services with zero hidden surcharges.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Professional Packing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Trained professionals handle belongings using appropriate packing and multi-layer protection methods for utmost safety.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Digital Documentation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Packing lists and digital moving documents improve visibility and complete accountability across all shipment items.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real-Time Tracking</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Receive live shipment and vehicle information during transportation with direct updates from your Move Coordinator.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Door-to-Door Support</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Key relocation stages are managed from pickup through final delivery and room placement at your destination home.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW OUR HOUSE SHIFTING SERVICE WORKS (9 STEPS)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How House Shifting Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Moving Process (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A transparent 9-step workflow designed to keep your relocation seamless, secure, and on-schedule.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Free Digital Survey', desc: 'Evaluate household belongings and estimate volume, packing materials, manpower and vehicle size.' },
              { num: 2, title: 'Get Your Quotation', desc: 'Prepare a detailed quotation based on the survey and specific requirements.' },
              { num: 3, title: 'Confirm Your Booking', desc: 'Confirm the booking and moving plan with preferred date and time slot.' },
              { num: 4, title: 'Professional Packing', desc: 'Pack and label belongings according to type and delicate handling requirements.' },
              { num: 5, title: 'Safe Loading', desc: 'Carefully load and secure furniture, appliances, cartons and fragile items with straps.' },
              { num: 6, title: 'Secure Transportation', desc: 'Transport the shipment according to the planned route and verified delivery schedule.' },
              { num: 7, title: 'Unloading & Verification', desc: 'Unload and cross-check items one-by-one with the itemized packing list.' },
              { num: 8, title: 'Unpacking & Room Placement', desc: 'Provide selected unpacking and room-placement support for major furniture.' },
              { num: 9, title: 'Final Handover', desc: 'Complete delivery after customer verification, inspection sign-off, and confirmation.' }
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-3 p-3 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-[#001261] dark:bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {step.num}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PREMIUM MULTI-LAYER PACKING
         ========================================================================= */}
      <section id="section-premium-packing" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Premium Multi-Layer Packing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Premium Packing for Safe House Shifting
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Proper packing is one of the most important parts of a successful household relocation. Packer Solutions provides multi-layer packing solutions designed to protect furniture, appliances, fragile items, kitchen goods and other household belongings during handling and transportation.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Depending on the selected service, packing can include bubble wrap, corrugated sheets, moving blankets, stretch film and protective covers. Fragile and valuable items can be separately identified and handled with additional care.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🫧</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Heavy Bubble Wrap</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Cushions glassware, crockery &amp; electronics</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">📦</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">5-Ply Corrugated Sheets</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Shock resistance for furniture &amp; appliances</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🛡️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Moving Blankets &amp; Film</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Scratch prevention &amp; moisture shielding</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🏷️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Fragile Tagging</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Separate handling for antiques &amp; TVs</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SAFE LOADING & SECURING
         ========================================================================= */}
      <section id="section-safe-loading" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Safe Loading &amp; Securing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Safe Loading &amp; Cargo Securing
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Truck className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Household items are carefully loaded and secured for transportation. Our trained moving crews use heavy-duty cargo straps, non-slip floor runners, and shock-absorbing cargo blankets to keep furniture, refrigerators, washing machines, and cartons stationary during highway and city transit.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Heavy-Duty Cargo Straps</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Anti-Vibration Base Padding</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Weight-Balanced Stacking</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. REAL-TIME SHIPMENT TRACKING
         ========================================================================= */}
      <section id="section-realtime-tracking" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Real-Time Shipment Tracking</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Real-Time Shipment &amp; Vehicle Tracking
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
            <Smartphone className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Receive shipment and vehicle information during transportation. Stay fully informed at every stage with GPS truck telemetry, automatic milestone updates, driver contact information, and real-time coordination with your dedicated Move Manager.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Live GPS Updates</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Dedicated Move Coordinator</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Milestone SMS &amp; WhatsApp Alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. UNPACKING & ROOM PLACEMENT
         ========================================================================= */}
      <section id="section-unpacking-placement" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Sofa className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Unpacking &amp; Room Placement</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Unpacking &amp; Room Placement Support
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
            <Home className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Assistance with unpacking and placing belongings in designated rooms. Our crew assists with careful unboxing, position placement of heavy beds, sofas, wardrobes, and tables into their designated rooms, and takes away transit packing debris.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Designated Room Positioning</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Bed &amp; Wardrobe Reassembly</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Packing Debris Clearing</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LOCAL & DOMESTIC SHIFTING OPTIONS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-shifting-options" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Local &amp; Domestic Shifting Options</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Tailored Transport Models
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose the right transportation tier based on your household volume, urgency, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* One-Way Transport */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Same-Day Dispatch
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">One-Way Transport (Local Shifting)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Planning to move within the same city? Our local house shifting service helps relocate household belongings safely between residential locations in <strong>{selectedCity}</strong> with professional packing, loading, transportation and unloading.
            </p>
          </div>

          {/* Outstation Transport */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Dedicated Container
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Outstation Transport (Intercity Relocation)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Dedicated containerized long-distance transport for intercity household moves across state borders with locked weather-sealed trucks and guaranteed delivery timelines.
            </p>
          </div>

          {/* Share Load */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono">
                100–200 CFT • Up to 7 Days
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Share Load House Shifting</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Share Load is a cost-effective option for customers with medium-sized shipments. Your belongings are collected, moved through a warehouse-based consolidation process and transported with other compatible shipments. Covers approximately <strong>100–200 CFT</strong> shipments with an estimated transit time of up to seven days.
            </p>
          </div>

          {/* Part Load */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded font-mono">
                Below 100 CFT
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Part Load House Shifting</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Part Load transportation is suitable for smaller household shipments when a customer does not require an entire vehicle. Covers shipments <strong>below 100 CFT</strong> and is ideal for small household moves, 1 RK loads, or partial items (sofa/fridge/boxes).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. DOMESTIC HOUSE SHIFTING ACROSS INDIA
         ========================================================================= */}
      <section id="section-domestic-shifting" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Map className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Domestic House Shifting</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Domestic House Shifting Services Across India
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Moving to another city requires planning, documentation and transportation coordination. Packer Solutions provides domestic house shifting services for long-distance residential relocation.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            The domestic moving process can include digital surveys, packing, packing lists, digital dockets, vehicle allocation, transportation, unloading and delivery confirmation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Digital Survey</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Digital Dockets</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Vehicle Allocation</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Delivery Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. DIGITAL DOCKET MANAGEMENT
         ========================================================================= */}
      <section id="section-digital-docket" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Digital Docket Management</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Digital Docket &amp; Documentation
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Packing lists and digital moving documents improve visibility and accountability. Every item and carton is digitally cataloged so you can verify goods at source and destination seamlessly via your smartphone docket.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Itemized Packing Lists</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Electronic Consignment Docket</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ GST Invoices for Tax/Claims</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. STARTING PRICE / RATE CHART
         ========================================================================= */}
      <section id="section-rate-chart" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>12. Starting Price / Rate Chart</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            House Shifting Charges &amp; Pricing ({selectedCity})
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            House shifting charges depend on several factors rather than one fixed rate. Key factors include moving distance, household volume, number and type of items, vehicle size, packing requirements, manpower, floor/access conditions, furniture dismantling and reassembly, additional services and storage requirements.
          </p>
        </div>

        {/* Pricing Matrix Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001261] text-white text-[11px] uppercase tracking-wider font-mono">
                  <th className="p-3.5">House Type</th>
                  <th className="p-3.5">Packing Charges</th>
                  <th className="p-3.5">Labor &amp; Handling</th>
                  <th className="p-3.5">Intracity Total</th>
                  <th className="p-3.5">Intercity Starting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-medium">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">1 RK / 1 BHK</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹1,200 – ₹2,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹1,500 – ₹2,200</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹3,500 – ₹5,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹8,500 – ₹14,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">2 BHK Flat</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹2,500 – ₹3,800</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹2,800 – ₹4,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹6,500 – ₹9,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹14,000 – ₹22,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">3 BHK Apartment</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹4,000 – ₹6,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹4,500 – ₹6,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹10,500 – ₹16,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹22,000 – ₹34,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">4 BHK / Independent Villa</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹6,500 – ₹9,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹7,000 – ₹11,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹16,500 – ₹26,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹32,000 – ₹55,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Banner inside rate chart */}
          <div className="bg-blue-50 dark:bg-blue-950/60 p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left space-y-0.5">
              <span className="font-bold text-xs text-[#001261] dark:text-blue-300 block">
                Want an accurate house shifting quotation?
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Get a customized estimate based on your exact inventory and floor level.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-[#001261] hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Get a Free Digital Survey
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. HOUSEHOLD ITEMS WE HANDLE (ITEMS WE MOVE)
         ========================================================================= */}
      <section id="section-items-we-move" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
            <span>13. Items We Move</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Household Items We Handle
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Certified safe packing and secure transport for all residential goods categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { icon: Sofa, name: 'Furniture & Sofas', desc: 'L-shape sofas, recliners, wooden sets' },
            { icon: Home, name: 'Beds & Wardrobes', desc: 'King/Queen beds, modular wardrobes' },
            { icon: Table, name: 'Dining Tables', desc: 'Glass-top, solid wood & marble tables' },
            { icon: Package, name: 'Refrigerators', desc: 'Single/Double door & French door fridges' },
            { icon: Wrench, name: 'Washing Machines', desc: 'Front & Top load with drum locks' },
            { icon: Tv, name: 'Televisions & Audio', desc: 'OLED/QLED TVs in specialized foam crates' },
            { icon: Server, name: 'Electronics & IT', desc: 'Laptops, PCs, routers & sound systems' },
            { icon: Boxes, name: 'Kitchen Goods', desc: 'Crockery, glassware & pantry cartons' },
            { icon: ShieldCheck, name: 'Fragile Belongings', desc: 'Mirrors, paintings, artwork & chandeliers' },
            { icon: FileText, name: 'Documents & Valuables', desc: 'Sealed document pouches & safes' },
            { icon: Bike, name: 'Bikes & Scooters', desc: 'Two-wheelers in wooden/hydraulic crates' },
            { icon: Car, name: 'Cars & Commercial', desc: 'Enclosed vehicle carrier transport' }
          ].map((item, idx) => {
            const IconC = item.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xs space-y-1.5 hover:border-blue-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <IconC className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          14. ADDITIONAL RELOCATION SERVICES
         ========================================================================= */}
      <section id="section-additional-services" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>14. Additional Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Additional Relocation Services
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            One-stop moving convenience with value-added home installation, cleaning, and handyman services.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            'Deep Cleaning',
            'Home Cleaning',
            'Surface Protection',
            'AC Dismantling',
            'AC Installation',
            'TV Installation',
            'Furniture Reassembly',
            'Handyman Services',
            'Temporary Storage',
            'Transit Insurance'
          ].map((srv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs hover:border-blue-400 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{srv}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          15. POPULAR CITIES (HOUSE SHIFTING BY CITY)
         ========================================================================= */}
      <section id="section-popular-cities" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>15. Popular Cities</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            House Shifting Services by City
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated branch operations and verified local moving crews across India&apos;s leading cities.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Your City for Instant Local Dispatch:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Coimbatore', 'Chennai', 'Bengaluru', 'Hyderabad', 'Kochi', 
              'Mumbai', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata'
            ].map((city) => {
              const isSelected = city.toLowerCase() === selectedCity.toLowerCase() || 
                (city === 'Bengaluru' && selectedCity.toLowerCase() === 'bangalore');
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    const normalizedCity = city === 'Bengaluru' ? 'Bangalore' : city;
                    onSelectCity(normalizedCity);
                    const heading = document.getElementById('service-page-heading');
                    if (heading) heading.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#001261] text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                  <span>{city}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Local Localities in {selectedCity}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {serviceAreas.slice(0, 8).map((area, idx) => (
                <span key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          16. POPULAR ROUTES (ROUTE SEO PAGES)
         ========================================================================= */}
      <section id="section-popular-routes" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>16. Popular Routes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            High-Volume Intercity Shifting Routes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated regular container shuttles running between major logistics hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { origin: 'Coimbatore', dest: 'Bangalore', time: '1–2 Days', fare: '₹9,500' },
            { origin: 'Coimbatore', dest: 'Chennai', time: '1–2 Days', fare: '₹10,500' },
            { origin: 'Coimbatore', dest: 'Hyderabad', time: '2–3 Days', fare: '₹13,500' },
            { origin: 'Coimbatore', dest: 'Mumbai', time: '3–4 Days', fare: '₹16,500' },
            { origin: selectedCity, dest: 'Bengaluru', time: '1–2 Days', fare: '₹11,000' },
            { origin: selectedCity, dest: 'Chennai', time: '1–2 Days', fare: '₹10,800' },
            { origin: selectedCity, dest: 'Hyderabad', time: '2–3 Days', fare: '₹12,200' },
            { origin: selectedCity, dest: 'Delhi NCR', time: '3–5 Days', fare: '₹18,500' }
          ].map((r, idx) => (
            <div
              key={idx}
              onClick={onOpenEnquiry}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer space-y-1.5 shadow-2xs group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>{r.origin} ➔ {r.dest}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 font-normal">Transit: {r.time}</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{r.fare}+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          17. FAQS (FREQUENTLY ASKED QUESTIONS)
         ========================================================================= */}
      <section id="section-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>17. FAQs</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear answers regarding pricing, packing, transit tracking, share loads, and furniture assembly.
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            {
              q: 'How much does house shifting cost?',
              a: 'Charges depend on distance, household volume, vehicle size, packing, manpower and additional services.'
            },
            {
              q: 'Do you provide packing and unpacking?',
              a: 'Yes. Packing, loading, transportation, unloading and unpacking can be selected based on requirements.'
            },
            {
              q: 'Do you provide furniture dismantling and reassembly?',
              a: 'Yes, as part of selected relocation services.'
            },
            {
              q: 'Can I track my household shipment?',
              a: 'Yes. Shipment and vehicle information can be provided during transportation.'
            },
            {
              q: 'Do you provide domestic house shifting?',
              a: 'Yes. Domestic relocation services are available for intercity household moves.'
            },
            {
              q: 'Do you provide temporary storage?',
              a: 'Storage can be arranged when required.'
            },
            {
              q: 'What is Share Load?',
              a: 'A consolidated transportation option for medium-sized shipments; the supplied definition covers 100–200 CFT with an estimated transit time of up to seven days.'
            },
            {
              q: 'What is Part Load?',
              a: 'A transportation option for smaller household shipments; the supplied definition covers below 100 CFT.'
            }
          ].map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#001261] dark:text-blue-400 shrink-0 font-bold">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          18. FINAL CTA
         ========================================================================= */}
      <section id="section-final-cta" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 rounded-[2.5rem] border border-blue-500/30 p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col items-start gap-6 relative z-10">
          <div className="space-y-2 text-left w-full">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ 18. Final CTA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ready to Move Your Home?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 w-full leading-relaxed">
              Make your next move simple with professional house shifting services from Packer Solutions. Get a free digital survey, understand your moving requirements and receive a transparent quotation before confirming your relocation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Your Free House Shifting Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3.5 rounded-2xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>24/7 Support: <strong>+91 98765 43210</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Quote: <strong>Chat Available</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Working Hours: <strong>Mon - Sun (8 AM - 10 PM)</strong></span>
          </div>
        </div>
      </section>

    </div>
  );
};
