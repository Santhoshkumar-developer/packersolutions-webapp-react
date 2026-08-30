import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Camera, 
  FileText, 
  Truck, 
  ChevronDown, 
  ArrowRight, 
  ClipboardCheck, 
  Navigation, 
  Layers, 
  Sparkles,
  Phone,
  HelpCircle,
  Building,
  UserCheck,
  Zap,
  DollarSign,
  Award,
  Wrench,
  Shield,
  Check,
  Gauge,
  Lock,
  Eye,
  AlertCircle
} from 'lucide-react';
import { ServiceItem } from '../types';

interface VehicleTransportationServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

// Local service hubs helper for selected city
const getVehicleTransportAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': [
      'Avinashi Road Automobile Hub', 
      'Trichy Road Transport Corridor', 
      'Mettupalayam Road Depot', 
      'Peelamedu Tech & CBD Hub', 
      'Singanallur Logistics Belt', 
      'Saravanampatti IT Corridor', 
      'Gandhipuram Central Hub', 
      'Kurichi SIDCO Staging Area', 
      'Pollachi Road Transit Junction', 
      'Eachanari Toll Terminal', 
      'Kovaipudur Ring Road Sector', 
      'Sulur Airforce & Cargo Belt'
    ],
    'Bangalore': [
      'Electronic City Phase 1 & 2', 
      'Whitefield ITPL & EPIP Zone', 
      'Peenya Industrial Freight Terminal', 
      'Hebbal & Manyata Tech Corridor', 
      'HSR Layout & Koramangala Hub', 
      'Yeshwanthpur Auto Logistics Park', 
      'Nelamangala Highway Staging Yard', 
      'Bommasandra Industrial Terminal', 
      'Hosur Road Intercity Hub', 
      'Sarjapur & Bellandur Tech Hub', 
      'Marathahalli & Mahadevapura', 
      'Yelahanka Airport Expressway'
    ],
    'Chennai': [
      'Sriperumbudur Auto Manufacturing Corridor', 
      'Guindy Industrial Freight Hub', 
      'Ambattur Industrial Estate', 
      'OMR IT Expressway Belt', 
      'Porur & DLF Commercial Hub', 
      'Oragadam Industrial Terminal', 
      'Anna Nagar & Koyambedu Terminal', 
      'Velachery & Madipakkam Belt', 
      'Tambaram & GST Road Staging Yard', 
      'Ennore Port Freight Corridor', 
      'Mogappair & Padi Industrial', 
      'Thoraipakkam & Sholinganallur'
    ],
    'Mumbai': [
      'Andheri East & MIDC Terminal', 
      'Vashi & Turbhe Navi Mumbai Hub', 
      'Bhiwandi Major Auto Warehousing', 
      'Thane Wagle Estate Freight Yard', 
      'Taloja Industrial Staging Terminal', 
      'BKC & Kurla Commercial Corridor', 
      'Borivali & Kandivali Western Hub', 
      'Goregaon East IT & Commercial', 
      'Panvel Expressway Transit Hub', 
      'JNPT Port Freight Corridor', 
      'Kalyan & Dombivli Logistics Belt', 
      'Rabale TTC Industrial Zone'
    ],
    'Hyderabad': [
      'Hitec City & Madhapur IT Belt', 
      'Gachibowli Financial Corridor', 
      'Sanathnagar Industrial Hub', 
      'Kukatpally & Miyapur Transit Depot', 
      'Balanagar & Jeedimetla IDA', 
      'Medchal Highway Staging Terminal', 
      'Patancheru & Pashamylaram IDA', 
      'Cherlapally & Nacharam Industrial', 
      'Kondapur & Hafeezpet Hub', 
      'Uppal & LB Nagar Logistics Zone', 
      'Secunderabad Railway Terminal', 
      'Shamshabad Airport Expressway'
    ],
    'Pune': [
      'Chakan Auto Manufacturing SEZ', 
      'Bhosari MIDC & PCMC Auto Hub', 
      'Hinjewadi IT Park Phase 1-3', 
      'Wakad & Baner Expressway Hub', 
      'Hadapsar Magarpatta City Belt', 
      'Kharadi EON Free Zone IT Hub', 
      'Talawade Software & Auto SEZ', 
      'Ranjangaon 5-Star MIDC Corridor', 
      'Viman Nagar & Nagar Road Depot', 
      'Pimpri-Chinchwad Industrial Belt', 
      'Kothrud & Sinhagad Highway Corridor', 
      'Talegaon Dabhade Logistics Hub'
    ],
    'Delhi': [
      'Okhla Industrial Area Phase 1-3', 
      'Udyog Vihar Gurugram Corridor', 
      'Manesar IMT Auto Logistics Hub', 
      'Dwarka & IGI Airport Cargo Belt', 
      'Noida Sector 62 & 63 Hub', 
      'Mayapuri Auto Industrial Belt', 
      'Patparganj Industrial Staging Area', 
      'Faridabad Sector 24-29 Industrial', 
      'Bawana & Narela Industrial Zone', 
      'Kirti Nagar & Naraina Logistics', 
      'Greater Noida Expressway Belt', 
      'Sahibabad & Ghaziabad Freight Yard'
    ],
    'Ahmedabad': [
      'Sanand GIDC Automotive Corridor', 
      'Changodar Logistics & Freight Hub', 
      'Vatva GIDC Phase 1-4 Terminal', 
      'Naroda Industrial Estate', 
      'SG Highway Corporate Corridor', 
      'Sarkhej-Bavla Highway Terminal', 
      'Odhav Industrial Area', 
      'Aslali Transport & Staging Nagar', 
      'Prahlad Nagar & Satellite CBD', 
      'Chhatral GIDC Corridor', 
      'Gota & Chandkheda Highway Belt', 
      'Bakrol Auto Warehousing Hub'
    ],
    'Kolkata': [
      'Dankuni Freight & Container Hub', 
      'Taratala Industrial Logistics Park', 
      'Sector V Salt Lake IT & CBD Hub', 
      'Rajarhat New Town Expressway', 
      'Howrah Industrial & Freight Belt', 
      'Dhulagarh Truck Terminal Zone', 
      'Kasba Industrial Estate', 
      'Kalyani Industrial Corridor', 
      'Uluberia Logistics Park', 
      'Budge Budge Freight Terminal'
    ],
    'Kochi': [
      'Kalamassery Industrial Transit Hub', 
      'Willingdon Island Port Depot', 
      'Kakkanad Infopark & SmartCity', 
      'Aluva National Highway Corridor', 
      'Vallarpadam ICTT Container Corridor', 
      'Eloor Industrial Zone', 
      'Cochin SEZ (CSEZ) Belt', 
      'Angamaly Freight Terminal', 
      'Aroor National Highway Hub', 
      'Edappally Bypass Logistics Junction'
    ]
  };

  return areas[city] || [
    'Central Auto Freight Terminal',
    'Automobile Logistics Corridor',
    'National Highway Staging Yard',
    'Industrial Express Hub',
    'Commercial Business District',
    'High-Rise Residential Sector',
    'Enclosed Container Depots',
    'Ring Road Logistics Junction'
  ];
};

const POPULAR_VEHICLE_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Kochi'
];

export const VehicleTransportationServiceContent: React.FC<VehicleTransportationServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const city = selectedCity || 'Coimbatore';
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const vehicleAreas = getVehicleTransportAreas(city);

  const CAR_PRICING_TABLE = [
    { route: `${city} → Chennai`, dist: '500 km', hatchback: '₹9,500', sedan: '₹11,500', suv: '₹13,500', time: '1 – 2 Days' },
    { route: `${city} → Bengaluru`, dist: '360 km', hatchback: '₹8,000', sedan: '₹9,500', suv: '₹11,500', time: '1 – 2 Days' },
    { route: `${city} → Hyderabad`, dist: '920 km', hatchback: '₹14,000', sedan: '₹16,500', suv: '₹19,000', time: '2 – 3 Days' },
    { route: `${city} → Kochi`, dist: '190 km', hatchback: '₹6,500', sedan: '₹7,500', suv: '₹9,000', time: '1 Day' },
    { route: `${city} → Mumbai`, dist: '1,280 km', hatchback: '₹19,500', sedan: '₹22,000', suv: '₹26,000', time: '3 – 4 Days' },
    { route: `${city} → Pune`, dist: '1,150 km', hatchback: '₹18,000', sedan: '₹20,500', suv: '₹24,000', time: '3 – 4 Days' },
    { route: `${city} → Delhi NCR`, dist: '2,400 km', hatchback: '₹28,500', sedan: '₹33,000', suv: '₹39,000', time: '5 – 7 Days' },
    { route: `${city} → Ahmedabad`, dist: '1,750 km', hatchback: '₹24,000', sedan: '₹27,500', suv: '₹32,000', time: '4 – 5 Days' },
    { route: `${city} → Kolkata`, dist: '2,150 km', hatchback: '₹27,000', sedan: '₹31,000', suv: '₹37,000', time: '5 – 6 Days' },
    { route: `${city} → Visakhapatnam`, dist: '1,180 km', hatchback: '₹19,000', sedan: '₹22,000', suv: '₹25,500', time: '3 – 4 Days' }
  ];

  const BIKE_PRICING_TABLE = [
    { route: `${city} → Chennai`, dist: '500 km', standard: '₹2,800', superbike: '₹4,500', time: '1 – 2 Days' },
    { route: `${city} → Bengaluru`, dist: '360 km', standard: '₹2,400', superbike: '₹3,800', time: '1 – 2 Days' },
    { route: `${city} → Hyderabad`, dist: '920 km', standard: '₹4,500', superbike: '₹7,000', time: '2 – 3 Days' },
    { route: `${city} → Kochi`, dist: '190 km', standard: '₹1,900', superbike: '₹3,000', time: '1 Day' },
    { route: `${city} → Mumbai`, dist: '1,280 km', standard: '₹6,000', superbike: '₹9,500', time: '3 – 4 Days' },
    { route: `${city} → Pune`, dist: '1,150 km', standard: '₹5,500', superbike: '₹8,800', time: '3 – 4 Days' },
    { route: `${city} → Delhi NCR`, dist: '2,400 km', standard: '₹8,500', superbike: '₹13,500', time: '5 – 7 Days' },
    { route: `${city} → Ahmedabad`, dist: '1,750 km', standard: '₹7,200', superbike: '₹11,500', time: '4 – 5 Days' },
    { route: `${city} → Kolkata`, dist: '2,150 km', standard: '₹8,000', superbike: '₹12,800', time: '5 – 6 Days' },
    { route: `${city} → Visakhapatnam`, dist: '1,180 km', standard: '₹5,800', superbike: '₹9,200', time: '3 – 4 Days' }
  ];

  const FAQS = [
    {
      q: 'How does Packer Solutions guarantee zero scratches or damage during vehicle transport?',
      a: 'We use enclosed car carriers equipped with rubber-padded wheel chocks, custom hydraulic lift ramps, and four-point high-tensile nylon wheel-lashing straps. Your car body or chassis never contacts metal chains or carrier sides. Before loading, a rigorous 15-point digital inspection captures high-definition photos and 4K video of every panel.'
    },
    {
      q: `Do you provide car and bike transport services from ${city} to all cities across India?`,
      a: `Yes. We operate regular enclosed carrier fleets and dedicated container slots connecting ${city} to over 100+ tier-1, tier-2, and industrial cities across India, including Bengaluru, Chennai, Hyderabad, Mumbai, Pune, Delhi NCR, Ahmedabad, Kolkata, and Kochi.`
    },
    {
      q: 'What is the difference between an Open Car Carrier and an Enclosed Car Container?',
      a: 'An open multi-car carrier transports vehicles on an open bi-level truck, which is highly economical and cost-effective. An enclosed container carrier houses vehicles inside a fully sealed weatherproof steel container, shielding your vehicle from highway stone chips, dust, monsoon rain, and unauthorized access — ideal for luxury sedans, new SUVs, and vintage cars.'
    },
    {
      q: 'How are bikes and premium two-wheelers packed and transported?',
      a: 'Bikes undergo 3-layer protective wrapping (bubble film, corrugated board, and stretch cling wrap on mirrors, exhaust, and tank). For long-distance or superbike transport, we place the bike in a custom heavy-duty wooden box crate with wheel locking clamps to ensure zero movement and zero suspension fatigue.'
    },
    {
      q: 'What documents are required to book vehicle transportation?',
      a: 'To comply with national highway transport regulations and state RTO checkpoints, you need to provide: 1) Copy of Vehicle Registration Certificate (RC), 2) Valid Vehicle Insurance Policy, 3) Owner Government Photo ID Proof (Aadhaar / Driving License / Passport), and 4) Pollution Under Control (PUC) Certificate.'
    },
    {
      q: 'How much fuel should be in the vehicle before pickup?',
      a: 'Due to national carrier fire safety protocols, we request keeping the fuel tank at approximately 10% to 15% (1/4th tank max) — sufficient for loading, unloading, and positioning onto carriers while minimizing flammable weight during transit.'
    },
    {
      q: 'Can I transport my personal luggage or household items inside the car?',
      a: 'You may keep up to 20-30 kg of non-hazardous personal luggage neatly placed in the car trunk (boot) only. Nothing should be placed on seats or dashboard to prevent obstructing the driver’s visibility during ramp loading. Valuables, jewelry, cash, and inflammable items are strictly prohibited.'
    },
    {
      q: 'How can I track my vehicle during interstate transit?',
      a: 'All our long-distance vehicle carriers are GPS-enabled. You receive a dedicated tracking link along with milestone SMS/WhatsApp updates for carrier dispatch, highway transit checkpoints, toll crossing timestamps, destination hub arrival, and doorstep delivery scheduling.'
    },
    {
      q: 'Are electric vehicles (EVs) and low-ground-clearance luxury cars supported?',
      a: 'Yes. We operate specialized low-angle hydraulic tail-lift ramp carriers specifically engineered for low-ground-clearance sports cars (Porsche, BMW, Audi, Mercedes) and provide battery isolation handling for Electric Vehicles (Tata EV, MG, Hyundai, Tesla) adhering to manufacturer transit guidelines.'
    },
    {
      q: 'Is transit insurance included with vehicle transport services?',
      a: 'Yes, all vehicle relocations include comprehensive transit insurance coverage covering accidental risks, fire, and collision during highway transit. We issue a formal Certificate of Insurance (COI) based on your declared vehicle IDV value before vehicle dispatch.'
    }
  ];

  return (
    <div className="space-y-12" id="vehicle-transportation-details-view">
      
      {/* =========================================================================
          1. HERO / GET QUOTE OVERVIEW
         ========================================================================= */}
      <section id="section-hero-quote" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Hero / Get Quote • {city}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            Professional Car &amp; Bike Transportation Services in {city} – Zero Damage Guarantee
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Relocate your precious car, SUV, premium luxury sedan, or motorcycle anywhere across India with Packer Solutions&apos; certified vehicle transport fleet in {city}. Featuring customized hydraulic tail-lift carriers, enclosed weatherproof container trailers, 4-point wheel lashing, and 15-point digital pre-transit inspection reports.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether shifting a family hatchback within Tamil Nadu, moving an SUV from {city} to Bengaluru, or dispatching a luxury superbike to Mumbai, our licensed carrier network guarantees on-time delivery with zero tyre wear, zero stone chips, and 100% full-value transit insurance.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="vehicle-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Vehicle Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="vehicle-hero-survey-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-blue-400" />
              <span>Book Doorstep Vehicle Inspection</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL VEHICLE TRANSPORT SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Car className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional Vehicle Transport Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Vehicle Transport Services in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Driving your vehicle over thousands of highway kilometers causes extreme mechanical wear, tyre degradation, odometer inflation, and stone chip hazards. Packer Solutions provides safe, carrier-borne vehicle relocations engineered for complete peace of mind.
          </p>
        </div>

        {/* 6 Service Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Car Relocation &amp; Enclosed Carriers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Safe transit for hatchbacks, sedans, SUVs, and luxury electric vehicles in dust-free, fully covered container trailers with wheel-locking chocks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Motorcycle &amp; Superbike Box Crating</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Multi-layer foam wrapping, mirror protection, and heavy-duty wooden box crating for Royal Enfields, Harleys, sports bikes, and commuter scooters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">15-Point Digital Pre-Transit Audit</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Comprehensive baseline inspection documenting body paint, scratches, dents, odometer readings, and fuel levels with timestamped photos.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Doorstep Pickup &amp; Direct Delivery</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Trained auto pilots collect your vehicle right from your home or office in {city} and hand it over directly at your new address.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hydraulic Low-Angle Ramp Loading</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Zero underbody scraping for low-clearance luxury cars (BMW, Mercedes, Audi) using synchronized hydraulic tail-lifts and smooth entry angles.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Corporate &amp; Dealership Fleet Transfers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bulk automotive carrier logistics for employee transfers, dealer stock relocations, and test drive vehicle distributions across India.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS (FOR VEHICLE SHIFTING)
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            The Gold Standard in Automotive Shifting &amp; Carrier Safety
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered carrier tie-downs, certified commercial pilots, and 100% transparent digital handover tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Scratch &amp; Zero Dent Guarantee</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We exclusively use soft nylon webbing straps over tyres and rubber wheel chocks. Metal chains never touch your alloy rims or car paint.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Custom Enclosed Car Carrier Trailers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All-weather, dust-sealed bi-level trailers equipped with internal pneumatic dampeners to absorb 99% of interstate highway road shocks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">15-Point Digital Video Inspection</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instant digital copy of vehicle condition, fuel gauge, odometer reading, and 360-degree high-res video sent directly to your phone.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Live GPS Tracking &amp; Toll Milestones</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Track your vehicle’s journey on national expressways with live GPS tracking, FASTag toll updates, and direct carrier contact.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Comprehensive Transit Insurance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Full declared value (IDV) transit insurance coverage with simple, zero-hassle digital claims processing in case of highway contingencies.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Starting Rates with Zero Hidden Costs</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All-inclusive rates covering doorstep pickup, toll taxes, carrier freight, loading/unloading, and destination handover.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW VEHICLE TRANSPORT WORKS (9 STAGES)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How Vehicle Transport Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Vehicle Relocation Workflow (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A precision 9-stage engineering workflow designed for maximum automotive safety and transparency.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Instant Quote & Route Scheduling', desc: `Provide vehicle make, model, pickup address in ${city}, and destination to reserve your carrier slot.` },
              { num: 2, title: 'Document Verification', desc: 'Quick check of Vehicle RC, Insurance policy, and owner ID proof for seamless interstate toll & RTO transit.' },
              { num: 3, title: '15-Point Digital Pre-Transit Audit', desc: 'Timestamped 360° video recording, paint inspection, odometer logging, and fuel level documentation.' },
              { num: 4, title: 'Doorstep Pickup by Certified Auto Pilot', desc: 'Our trained, background-verified logistics captain collects the vehicle from your home or office.' },
              { num: 5, title: 'Specialized Hydraulic Ramp Loading', desc: 'Vehicle is guided onto our covered carrier using smooth low-angle hydraulic ramps to prevent bottom scrape.' },
              { num: 6, title: '4-Point Wheel Lashing & Chocking', desc: 'Heavy-duty nylon straps lock all 4 wheels firmly to carrier chassis beds with rubber safety chocks.' },
              { num: 7, title: 'Express Highway Transit with Live GPS', desc: 'Carrier travels via dedicated green corridors with live GPS telemetry, toll alerts, and updates.' },
              { num: 8, title: 'Controlled Destination Offloading', desc: 'Vehicle is carefully driven down carrier ramps at the destination staging terminal under supervision.' },
              { num: 9, title: 'Doorstep Handover & Final Sign-Off', desc: 'You inspect the vehicle against the pre-transit digital report, check the odometer, and sign off.' }
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
          5. SPECIALIZED VEHICLE CARRIERS & RIGGING EQUIPMENT
         ========================================================================= */}
      <section id="section-rigging-gear" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Specialized Fleet &amp; Gear</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Industrial-Grade Automotive Carriers &amp; Safety Equipment
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every vehicle carrier in our fleet is custom-fabricated with specialized automotive rigging, heavy-duty dampeners, and safety locks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🚛</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Enclosed Car Containers</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Fully sealed all-weather trailers for dust &amp; stone chip protection</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🏗️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Hydraulic Tail-Lifts</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Smooth entry ramps for low ground clearance luxury &amp; sports cars</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">📦</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Wooden Box Crates</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Heavy-duty timber crates for superbikes and premium motorcycles</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🪢</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Nylon Wheel Straps</h4>
            <p className="text-[10px] text-slate-400 leading-tight">High-tensile polyester tyre lashing &amp; rubber wheel chocks</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CAR TRANSPORTATION SPOTLIGHT (HATCHBACK, SEDAN, SUV & LUXURY)
         ========================================================================= */}
      <section id="section-car-spotlight" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Car className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Car Transportation Fleet Spotlight</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Car Transport Service for Every Vehicle Class in {city}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hatchbacks, Sedans &amp; Compact SUVs</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Regular &amp; Express Interstate Shifting</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Safe transit for Swift, i20, City, Verna, Creta, Seltos, and Nexon models using specialized double-decker carriers. Each vehicle is secured with independent wheel chocks and soft lashing to eliminate chassis vibration.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 pt-1">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ 4-Point Wheel Tie-Downs</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Full Body Dust Covers</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Direct Doorstep Pickup in {city}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Luxury Sedans, EVs &amp; Heavy 4x4 SUVs</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Enclosed Single &amp; Dual Unit Containers</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Designed for BMW, Mercedes-Benz, Audi, Jaguar, Fortuner, Defender, and EV models. Loaded via low-degree angle hydraulic ramps with isolated battery transit protocols and custom tamper-proof seal locks.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 pt-1">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Low Clearance Hydraulic Lift</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ EV Safe Transit Protocol</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Sealed Weatherproof Trailer</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BIKE & TWO-WHEELER TRANSPORTATION SPOTLIGHT
         ========================================================================= */}
      <section id="section-bike-spotlight" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Bike className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Two-Wheeler &amp; Superbike Logistics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Multi-Layer Wrapping &amp; Wooden Box Crating
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Bike className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              We do not treat two-wheelers as ordinary cargo. Every motorcycle, scooter, and superbike undergoes triple-layer protective wrapping (thick bubble film, 5-ply corrugated sheets, and heavy-duty shrink wrap) to safeguard the fuel tank, mirrors, fairings, and exhaust. For premium bikes (Royal Enfield, Triumph, Harley-Davidson, Ducati), we construct tailor-made wooden box crates with wheel locks to eliminate all transit vibration and prevent suspension strain.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Triple-Layer Protective Wrapping</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Custom Wooden Box Crating Available</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Mirrors &amp; Visor Foam Shielding</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. 15-POINT DIGITAL VEHICLE CONDITION AUDIT
         ========================================================================= */}
      <section id="section-digital-inspection" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Digital Condition Inspection</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            15-Point Digital Vehicle Inspection with Photo &amp; Video Proof
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            To ensure complete transparency, our logistics pilots conduct an exhaustive 15-point digital checklist before taking handover of your vehicle in {city}. You receive a live digital PDF report with timestamped photos before the carrier departs:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {[
              '1. Body Paint & Panels',
              '2. Existing Scratches',
              '3. Minor Dents & Creases',
              '4. Windshield & Glass',
              '5. Rearview Mirrors',
              '6. Tyre Tread & Pressure',
              '7. Alloy Rim Condition',
              '8. Headlights & Taillights',
              '9. Odometer Reading',
              '10. Fuel Level (15% Max)',
              '11. Battery & Ignition',
              '12. Spare Wheel & Jack',
              '13. Audio / Dashcam Units',
              '14. Floor Mats & Boot Items',
              '15. 360° Walkaround Video'
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[11px] truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. VEHICLE TRANSPORT SERVICE MODELS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-shifting-options" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Vehicle Transport Service Models</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Car Transport Companies &amp; Tailored Shifting Packages in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose the exact level of protection, carrier configuration, and speed that matches your relocation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Most Popular
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Door-to-Door Enclosed Carrier</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Full premium service: our auto pilot collects your vehicle at your doorstep in <strong>{city}</strong>, loads it into a sealed container carrier, and delivers directly to your new home address.
            </p>
          </div>

          {/* Option 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Economy Choice
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Open Multi-Car Carrier Transport</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Cost-effective highway transport on open multi-vehicle bi-level carriers with 4-point wheel lashing and full-body protective dust wrapping.
            </p>
          </div>

          {/* Option 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono">
                Hub-to-Hub Saver
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Terminal-to-Terminal Shifting</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Self-drive your vehicle to our central freight terminal in <strong>{city}</strong> and pick it up from our destination logistics hub to save on local doorstep pilot charges.
            </p>
          </div>

          {/* Option 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded font-mono">
                VIP / Luxury Cars
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Dedicated Single-Car Express Trailer</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Exclusive single-vehicle enclosed container trailer with zero intermediate stops, high-priority expressway dispatch, and dedicated 24/7 telemetry monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. INTERSTATE TRANSIT STANDARDS & EXPRESS CORRIDORS
         ========================================================================= */}
      <section id="section-domestic-shifting" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Interstate Transit Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Car Shipping Companies – All-India Express Highway Logistics &amp; Compliance in {city}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Interstate vehicle movement is strictly regulated by National Highway Authority of India (NHAI) and state transport checkposts. Packer Solutions handles all documentation, e-Way bills, RTO declarations, and carrier permits, ensuring non-stop transit across all state borders.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Every transport carrier is driven by two certified commercial highway captains who rotate shifts, minimizing transit delays while eliminating reckless speed driving.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Full E-Way Bill Clearance</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Dedicated Dual Drivers</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>FASTag Express Highway Routes</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>100% Legal RTO Documentation</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. TRANSPARENT ROUTE PRICING & TRANSIT TIME MATRIX
         ========================================================================= */}
      <section id="section-pricing-matrix" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            <span>12. Route Pricing Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Car Shipping Routes, Cost Matrix &amp; Timelines from {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Standard starting rates for frequent interstate corridors originating from {city}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Car Pricing Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Car Transport Rate Card</h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">From {city}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200/80 dark:border-slate-800">
                    <th className="px-3.5 py-2.5">Destination Route</th>
                    <th className="px-3 py-2.5 text-right">Hatchback</th>
                    <th className="px-3 py-2.5 text-right">Sedan</th>
                    <th className="px-3 py-2.5 text-right">SUV / 4x4</th>
                    <th className="px-3 py-2.5 text-right">Est. Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                  {CAR_PRICING_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3.5 py-2.5 font-bold text-slate-900 dark:text-white">{row.route}</td>
                      <td className="px-3 py-2.5 text-right font-mono">{row.hatchback}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-blue-600 dark:text-blue-400">{row.sedan}</td>
                      <td className="px-3 py-2.5 text-right font-mono">{row.suv}</td>
                      <td className="px-3 py-2.5 text-right text-[11px] text-slate-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bike Pricing Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Bike &amp; Superbike Rate Card</h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">From {city}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200/80 dark:border-slate-800">
                    <th className="px-3.5 py-2.5">Destination Route</th>
                    <th className="px-3 py-2.5 text-right">Standard / Scooter</th>
                    <th className="px-3 py-2.5 text-right">Royal Enfield / 350cc+</th>
                    <th className="px-3 py-2.5 text-right">Est. Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                  {BIKE_PRICING_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3.5 py-2.5 font-bold text-slate-900 dark:text-white">{row.route}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">{row.standard}</td>
                      <td className="px-3 py-2.5 text-right font-mono">{row.superbike}</td>
                      <td className="px-3 py-2.5 text-right text-[11px] text-slate-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          13. KEY FACTORS AFFECTING VEHICLE TRANSPORT CHARGES
         ========================================================================= */}
      <section id="section-cost-factors" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <ClipboardCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>13. Cost Variables</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            What Determines Your Vehicle Shifting Quote?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>1. Route &amp; Distance</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Highway mileage, state toll charges, and national expressway connectivity directly scale freight fuel consumption.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              <span>2. Vehicle Dimensions</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Full-size 7-seater SUVs (Fortuner, Scorpio) occupy greater carrier floor area compared to compact hatchbacks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>3. Open vs. Enclosed</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Enclosed sealed container carriers provide 100% dust/stone protection at a slight premium over standard open carriers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>4. Insurance IDV Value</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Insurance premium scales proportionally with your vehicle’s declared market invoice value (IDV) for 100% risk coverage.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. LOCAL SERVICE HUBS & CITY SWITCHER
         ========================================================================= */}
      <section id="section-city-hubs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>14. Local Pickup Staging Hubs</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Vehicle Pickup Hubs &amp; Staging Yards Across {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Our auto logistics captains provide 60-minute doorstep collection across all major residential sectors and commercial corridors in {city}.
          </p>
        </div>

        {/* City Switcher Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {POPULAR_VEHICLE_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSelectCity && onSelectCity(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                city === c
                  ? 'bg-[#001261] dark:bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Area Tags Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Active Vehicle Pickup &amp; Carrier Staging Corridors in {city}:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {vehicleAreas.map((area, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-[11px] font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          15. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================================= */}
      <section id="section-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>15. Frequently Asked Questions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Vehicle Relocation Knowledge Base
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, transparent answers regarding safety protocols, required documents, tracking, and claims.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 shadow-xs overflow-hidden">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <span className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/40 dark:bg-slate-950/40 border-t border-slate-100/60 dark:border-slate-800/40 pl-12.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          16. AUTOMOTIVE SHIPPING & RELOCATION TOPICS (SEO DIRECTORY)
         ========================================================================= */}
      <section id="section-automotive-topics" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Automotive Relocation Guide</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive overview of vehicle moving, carrier options, and safety guarantees across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tag 1: car shipping companies */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              car shipping companies
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              When evaluating car shipping companies in {city}, ensure they provide dedicated closed container trailers, hydraulic tail-lift loading for low ground clearance vehicles, and certified transit insurance with live GPS tracking.
            </p>
          </div>

          {/* Tag 2: car shipping */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              car shipping
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Intercity car shipping eliminates highway driving fatigue, odometer inflation, tyre wear, and stone-chip damage. We coordinate express national highway transit with scheduled door-to-door delivery.
            </p>
          </div>

          {/* Tag 3: car transport companies */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              car transport companies
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Reputable car transport companies utilize four-point high-tensile nylon wheel tie-downs and rubber wheel chocks, ensuring your vehicle chassis never makes contact with metal chains or carrier sides.
            </p>
          </div>

          {/* Tag 4: car transport service */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              car transport service
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Our end-to-end car transport service includes a 15-point digital pre-transit video audit, complete documentation support for RTO &amp; toll checkpoints, and zero-scratch handling guarantee.
            </p>
          </div>

          {/* Tag 5: vehicle transport services */}
          <div className="md:col-span-2 p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              vehicle transport services
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Specialized vehicle transport services across India for two-wheelers, superbikes, family cars, electric vehicles, and commercial fleets, backed by weatherproof trailers and 24/7 dedicated dispatch support.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          17. 24/7 HOTLINE & RELOCATION SPECIALIST CALLOUT
         ========================================================================= */}
      <section id="section-booking-cta" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-widest bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 inline-block">
            Certified Automotive Logistics • 100% Insured
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Ready to Transport Your Car or Bike from {city}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed font-normal">
            Speak directly with our senior automotive dispatch engineers. We provide instant carrier availability, door-to-door transit timelines, digital condition audits, and zero-compromise vehicle safety.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onOpenEnquiry}
            id="book-vehicle-transport-final-btn"
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg cursor-pointer transition-all flex items-center gap-2 group"
          >
            <span>Request Instant Vehicle Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:18001234567"
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>24/7 Dispatch Hotline: 1800-123-4567</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            <span>Verified Safety: </span>
            <strong className="text-slate-200">Zero Scratch Guarantee</strong> • <strong className="text-slate-200">15-Point Digital Video Inspection</strong>
          </div>
          <div className="text-blue-300 font-medium">
            Serving all residential &amp; industrial pin codes in {city}
          </div>
        </div>
      </section>

    </div>
  );
};
