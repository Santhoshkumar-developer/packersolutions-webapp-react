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
import parcelVectorImg from '../assets/images/service_parcel_vector_1785319730384.jpg';
import packersVectorImg from '../assets/images/service_packers_vector_1785319746387.jpg';
import packingUnpackingVectorImg from '../assets/images/vector_packing_unpacking_1785946345528.jpg';
import loadingUnloadingVectorImg from '../assets/images/vector_loading_unloading_1785946360593.jpg';
import vehicleTransportVectorImg from '../assets/images/vector_vehicle_transport_1785946372441.jpg';
import warehousingStorageVectorImg from '../assets/images/vector_warehousing_storage_1785946384931.jpg';

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

  const [selectedFleetId, setSelectedFleetId] = useState<string>('tata-ace');
  const [selectedTruck, setSelectedTruck] = useState<string>('tata-ace');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeScopeTab, setActiveScopeTab] = useState<'within-city' | 'between-city'>('within-city');

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
      <div className="space-y-12">
        
        {/* 1. KEY BENEFITS / USP FOR CORPORATE RELOCATION */}
        <section id="office-key-benefits" className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-[11px] font-bold font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Commercial Moving</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Key Benefits of Corporate Shifting in {selectedCity}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Meticulous planning, zero business downtime, and certified IT asset handling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-3 hover:border-orange-300 transition-all">
              <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Business Downtime</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Relocations scheduled over weekends or overnight shifts so your team leaves Friday and resumes Monday morning without disruption.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-3 hover:border-orange-300 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">IT &amp; Server Room Care</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Anti-static bubble wrap, cushioned tech crates, and systematic cable-mapping for workstations, switches, and server racks.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-3 hover:border-orange-300 transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Asset Tagging &amp; Layout</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Color-coded barcode tags correspond to your destination seating plan, ensuring every employee crate lands at the exact desk.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-3 hover:border-orange-300 transition-all">
              <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">GST &amp; Transit Insurance</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Full 100% transit insurance cover with official B2B tax invoices, compliance documentation, and dedicated Move Manager.
              </p>
            </div>
          </div>
        </section>

        {/* 2. PRICING & OFFICE APPROX AREA MATRIX TABLE */}
        <section id="office-pricing-matrix" className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                  Office Approx Area &amp; Pricing Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
                  Standard indicative commercial rates based on office floor area and capacity.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold shrink-0">
                <Table className="w-3.5 h-3.5" />
                <span>Area Rate Matrix</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 dark:bg-slate-950 text-white font-semibold font-mono text-[10px] uppercase tracking-wider">
                    <th className="px-5 py-3.5 border-b border-slate-800">Approx. Floor Area</th>
                    <th className="px-5 py-3.5 border-b border-slate-800 text-right">Starting Price</th>
                    <th className="px-5 py-3.5 border-b border-slate-800 text-center">Service Inclusions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                  {OFFICE_AREA_OPTIONS.map((row) => (
                    <tr key={row.id} className="hover:bg-orange-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                          <span>{row.approxArea}</span>
                          {row.tag && (
                            <span className="ml-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                              {row.tag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-black text-slate-900 dark:text-white text-base">
                        {row.startingPrice > 0 ? `₹${row.startingPrice.toLocaleString()}` : 'Custom Survey'}
                      </td>
                      <td className="px-5 py-3.5 text-center text-[11px] text-slate-500 dark:text-slate-400">
                        Loading + IT Packing + Transit + Unloading
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-semibold font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>* Pricing applies to local intracity relocations. Intercity rates calculated based on transit distance and highway tolls.</span>
              <button 
                onClick={onOpenEnquiry}
                className="text-orange-600 dark:text-orange-400 hover:underline font-bold cursor-pointer"
              >
                Request Custom Site Survey →
              </button>
            </div>
          </div>
        </section>

        {/* 3. STEP-BY-STEP CORPORATE MOVING PROCESS */}
        <section id="office-how-it-works" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Corporate Relocation Process
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              Structured 4-phase execution roadmap guaranteeing precision and zero lost work hours.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  1
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Survey &amp; Blueprinting</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our corporate move manager audits your facility, inventories all workstations &amp; server gear, and matches it with the new office seating plan.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  2
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Crate Distribution &amp; Tagging</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We supply reusable lockable plastic crates and color-coded labels in advance so staff can pack personal desk items securely.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  3
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Weekend Express Transit</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Specialized crews dismantle executive cabins, wrap server racks in ESD film, load sealed container trucks, and transport under GPS supervision.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  4
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Setup &amp; Handover</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Workstations are reassembled, cables routed, employee crates placed at matching desks, and final sign-off completed before Monday morning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. IT & SERVER ROOM SPECIALIZATION */}
        <section id="it-server-specialization" className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
                  Specialized IT Logistics
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  High-Value Server &amp; Workstation Relocation
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Certified technicians trained in server rack de-racking, network router shielding, multi-monitor dual arm dismantling, and static-safe handling.
                </p>
              </div>
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-2xl shadow-lg cursor-pointer whitespace-nowrap shrink-0 transition-all hover:scale-105"
              >
                Book Tech Survey
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1.5">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Anti-Static ESD Wrapping
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Multi-ply conductive bubble wrap and ESD bags shield server motherboards and HDDs from electrostatic discharge.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1.5">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Port &amp; Cable Numbering
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Color-coded tags on all patch panels and ethernet cables make re-plugging at the destination instant and error-free.
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1.5">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Cushioned Transport Crates
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  High-density foam shock absorbers line all transit bins carrying delicate blade servers, switches, and laptops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SERVICE COVERAGE AREAS */}
        <section id="office-coverage-areas" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Corporate Hubs &amp; IT Parks Served in {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              Rapid commercial shifting teams active across all primary tech corridors and commercial clusters:
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {serviceAreas.map((area, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">{area} Tech Hub</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. OTHER SERVICES NAVIGATION */}
        <section id="other-corporate-services" className="space-y-4">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Explore Other Logistics Channels
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {OTHER_SERVICES_MENU.map((svc) => (
              <button
                key={svc.id}
                onClick={() => onSelectService(svc.id)}
                className="bg-white dark:bg-slate-900 hover:bg-orange-50/40 dark:hover:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left transition-all group flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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

      </div>
    );
  }

  if (isTruckBooking) {
    return (
      <div className="space-y-12">
        
        {/* 1. PORTER FLEET SHOWCASE */}
        <section id="truck-fleet-showcase" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                Select a Truck for Rent in {selectedCity}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
                Choose from mini trucks, tempos, and heavy vehicles available on-demand.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-full text-xs font-bold shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>~15 Min Pickup in {selectedCity}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRUCK_FLEET.map((vehicle) => {
              const isSelected = selectedTruck === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedTruck(vehicle.id)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#001261] text-white border-[#001261] shadow-xl scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  {vehicle.popularTag && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {vehicle.popularTag}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isSelected ? 'bg-white/10 text-orange-400' : 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                    }`}>
                      <Truck className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className={`text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {vehicle.name}
                      </h4>
                      <p className={`text-xs mt-0.5 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        Capacity: <strong className={isSelected ? 'text-orange-300' : 'text-slate-700 dark:text-slate-200'}>{vehicle.capacity}</strong>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>Base Fare (first 1.0 km):</span>
                        <span className={`font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>₹{vehicle.baseFare}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>Rate per km:</span>
                        <span className={`font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>₹{vehicle.ratePerKm}/km</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>Dimensions:</span>
                        <span className={`font-medium ${isSelected ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}`}>{vehicle.dimensions}</span>
                      </div>
                    </div>

                    <p className={`text-[11px] leading-relaxed italic ${isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                      Ideal for: {vehicle.idealFor}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnquiry();
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span>Book {vehicle.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. INSTANT FARE ESTIMATOR CALCULATOR */}
        <section id="instant-fare-estimator" className="bg-gradient-to-br from-[#001261] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-orange-400">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Pricing Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Get an Instant Estimated Fare for {selectedCity}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              No hidden driver charges, no surprise surge fees. Calculate your accurate goods transport fare based on exact pickup and drop pin-codes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenEnquiry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Calculate Precise Trip Fare</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE PORTER TRUCK BOOKING */}
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">15-Minute Instant Dispatch</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Nearby driver partner assigned within minutes. Fast pickup across all major hubs in {selectedCity}.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Transparent Fixed Rate Card</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                No driver haggling or unannounced surge charges. Pay exact fare calculated by distance and weight.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Navigation className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Live GPS Shipment Tracking</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Track your mini truck live from pickup point to drop location with real-time location sharing link.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Verified Driver Partners</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Background-checked, commercial-license verified drivers ensuring high cargo safety and courtesy.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Boxes className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Helper Assistance Available</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Opt for skilled helpers to assist in loading and unloading heavy boxes, appliances, or furniture.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Multi-Stop Drop Facility</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Deliver goods to multiple clients or locations across {selectedCity} in a single organized truck route.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FARE COMPARISON TABLE */}
        <section id="truck-fare-table" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Truck Booking Rate Card in {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              Standard base rates and per km distance charges for goods vehicles.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 dark:bg-slate-950 text-white font-semibold font-mono text-[10px] uppercase tracking-wider">
                    <th className="px-6 py-4 border-b border-slate-800">Vehicle Model</th>
                    <th className="px-6 py-4 border-b border-slate-800">Capacity</th>
                    <th className="px-6 py-4 border-b border-slate-800 text-right">Base Fare</th>
                    <th className="px-6 py-4 border-b border-slate-800 text-right">Per KM Charge</th>
                    <th className="px-6 py-4 border-b border-slate-800">Best Suited For</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                  {TRUCK_FLEET.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{f.name}</span>
                      </td>
                      <td className="px-6 py-4.5 text-slate-600 dark:text-slate-300 font-medium">{f.capacity}</td>
                      <td className="px-6 py-4.5 text-right font-mono font-black text-slate-900 dark:text-white text-sm">₹{f.baseFare}</td>
                      <td className="px-6 py-4.5 text-right font-mono font-black text-slate-900 dark:text-white text-sm">₹{f.ratePerKm}/km</td>
                      <td className="px-6 py-4.5 text-slate-500 dark:text-slate-400 text-[11px] font-normal">{f.idealFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-semibold font-mono">
              * Base fares include initial 1.0 km travel. Toll taxes, parking charges, and state permits (for intercity) payable as applicable.
            </div>
          </div>
        </section>

        {/* 5. HOW TO BOOK A TRUCK IN CITY */}
        <section id="how-to-book-truck" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              How to Rent a Mini Truck in {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              4 quick steps to dispatch your cargo truck in under 2 minutes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  1
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Enter Pickup & Drop</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Specify exact pickup location and drop address in {selectedCity}.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  2
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Select Truck Model</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Choose Tata Ace, 8ft Pickup, or 14ft Eicher according to load volume.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  3
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Add Helper Option</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Opt for 1 or 2 helpers if loading or unloading assistance is needed.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  4
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Track Live & Pay</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Driver reaches within minutes. Track movement on GPS and pay digitally or cash.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. EDITORIAL CONTENT FOR SELECTED CITY */}
        <section id="truck-editorial" className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-8 shadow-xs space-y-4 text-slate-700 dark:text-slate-300">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            On-Demand Mini Truck & Goods Transport Services in {selectedCity}
          </h3>
          
          <p className="text-xs sm:text-sm leading-relaxed font-normal">
            Whether you are a local merchant in {selectedCity} needing fast stock movement, a manufacturer transporting raw materials, or a homeowner moving furniture, finding a reliable, economical truck with a trusted driver used to take hours of negotiation.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed font-normal">
            With Packersolution, you can book Tata Ace (Chhota Hathi), 3-Wheeler Tempos, 8ft Pickups, and 14ft Eicher trucks instantly. Our app and web portal connect you directly with nearby driver partners in {selectedCity}, giving you live GPS tracking, upfront distance-based pricing, and optional labour assistance.
          </p>

          <div className="bg-orange-50 dark:bg-orange-950/40 rounded-2xl p-4 border border-orange-200 dark:border-orange-900/50 flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Commercial & Goods Safety Guarantee</h5>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-normal">
                All vehicles in {selectedCity} are equipped with tarp covers and ropes for safe transit during rain or dusty weather.
              </p>
            </div>
          </div>
        </section>

        {/* 7. TRUCK BOOKING FAQS */}
        <section id="truck-faqs" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Frequently Asked Questions – Truck Booking in {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-3.5">
              Everything you need to know about mini truck rental & goods transport.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
            {[
              {
                q: `How quickly can I get a truck in ${selectedCity}?`,
                a: `Our smart dispatch system assigns the nearest verified driver within 2 to 5 minutes, and the truck typically arrives at your doorstep in under 15-20 minutes depending on local traffic.`
              },
              {
                q: `Can I hire helpers for loading and unloading?`,
                a: `Yes! While booking your truck, you can opt for 1 or 2 professional helpers to assist with lifting boxes, loading furniture, and carrying items up to your floor.`
              },
              {
                q: `What items are allowed to be transported?`,
                a: `You can transport household items, furniture, commercial goods, hardware, machinery parts, textiles, e-commerce parcels, and electronics. Hazardous materials, explosives, and illegal items are strictly prohibited.`
              },
              {
                q: `Are toll and parking charges included in the fare?`,
                a: `Base fare and per-km charges cover transit and fuel. Any government toll taxes, municipal entry fees, or specific mall/apartment parking fees are paid directly at actuals.`
              },
              {
                q: `Can I book a truck for intercity or outstation transport from ${selectedCity}?`,
                a: `Yes, we support both intracity deliveries within ${selectedCity} and outstation goods transport to neighboring districts and major Indian cities.`
              }
            ].map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180 text-orange-500' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {openFaq === index && (
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
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
            House Shifting Services – Safe, Reliable &amp; Hassle-Free in {selectedCity}
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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            End-to-End Household Relocation Solutions
          </h3>
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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            The Packer Solutions Standard of Excellence
          </h3>
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
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹3,500 – ₹5,500</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹8,500 – ₹14,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">2 BHK Flat</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹2,500 – ₹3,800</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹2,800 – ₹4,000</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹6,500 – ₹9,500</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹14,000 – ₹22,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">3 BHK Apartment</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹4,000 – ₹6,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹4,500 – ₹6,500</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹10,500 – ₹16,000</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹22,000 – ₹34,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">4 BHK / Independent Villa</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹6,500 – ₹9,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹7,000 – ₹11,000</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹16,500 – ₹26,000</td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">₹32,000 – ₹55,000</td>
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ 18. Final CTA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ready to Move Your Home?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Make your next move simple with professional house shifting services from Packer Solutions. Get a free digital survey, understand your moving requirements and receive a transparent quotation before confirming your relocation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
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
