import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  FileText, 
  Boxes, 
  Weight, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  Shield, 
  Zap, 
  Scale, 
  Barcode, 
  Home, 
  Briefcase, 
  ShoppingBag, 
  Sparkles,
  Search,
  Check,
  Award,
  DollarSign,
  Lock,
  Eye,
  AlertCircle,
  ClipboardCheck,
  Navigation,
  Wrench,
  Gauge,
  Send,
  Plane
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ParcelCourierServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

// Local service hubs helper for selected city
const getParcelDeliveryAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': [
      'Peelamedu IT & Commercial Hub', 
      'RS Puram Central Staging', 
      'Gandhipuram Bus & Parcel Depot', 
      'Saibaba Colony Commercial', 
      'Singanallur Logistics Corridor', 
      'Saravanampatti Tech Zone', 
      'Ganapathy Industrial Estate', 
      'Kurichi SIDCO Industrial Area', 
      'Trichy Road Express Corridor', 
      'Avinashi Road Tech Belt', 
      'Eachanari Toll Logistics Junction', 
      'Thudiyalur Commercial Center'
    ],
    'Bangalore': [
      'Electronic City Phase 1 & 2 Hub', 
      'Whitefield ITPL & EPIP Zone', 
      'Peenya Industrial Freight Depot', 
      'Koramangala & HSR Commercial Belt', 
      'Indiranagar & Domlur Central', 
      'Hebbal & Manyata Tech Corridor', 
      'Yeshwanthpur Logistics Terminal', 
      'Jayanagar & JP Nagar Hub', 
      'Marathahalli & Bellandur Belt', 
      'Bommasandra Industrial Area', 
      'Yelahanka Express Hub', 
      'Rajajinagar Industrial Sector'
    ],
    'Chennai': [
      'Guindy Industrial Logistics Hub', 
      'Ambattur Industrial Estate', 
      'OMR IT Corridor & Sholinganallur', 
      'T. Nagar & Mount Road Commercial', 
      'Anna Nagar Central Terminal', 
      'Sriperumbudur Logistics Park', 
      'Koyambedu Wholesale Depot', 
      'Velachery & Madipakkam Belt', 
      'Porur & DLF Commercial Hub', 
      'Tambaram & GST Road Staging Yard', 
      'Parrys & George Town Trading Belt', 
      'Adyar & Besant Nagar Hub'
    ],
    'Mumbai': [
      'Andheri East & MIDC Terminal', 
      'BKC & Kurla Commercial Corridor', 
      'Vashi & Turbhe Navi Mumbai Depot', 
      'Bhiwandi Major Parcel Hub', 
      'Thane Wagle Estate Freight Center', 
      'Lower Parel & Worli Commercial', 
      'Borivali & Kandivali Western Belt', 
      'Goregaon East Logistics Hub', 
      'Dadar & Central Mumbai Hub', 
      'Fort & Nariman Point Business', 
      'Panvel Express Transit Hub', 
      'Ghatkopar & Powai Commercial'
    ],
    'Hyderabad': [
      'Hitec City & Madhapur IT Belt', 
      'Gachibowli Financial District', 
      'Secunderabad Railway Cargo Depot', 
      'Kukatpally & Miyapur Transit Hub', 
      'Sanathnagar Industrial Terminal', 
      'Begumpet & Somajiguda Commercial', 
      'Balanagar & Jeedimetla IDA', 
      'Cherlapally & Nacharam Industrial', 
      'Banjara Hills & Jubilee Hills', 
      'Uppal & LB Nagar Logistics Zone', 
      'Ameerpet & SR Nagar Hub', 
      'Shamshabad Airport Cargo Belt'
    ],
    'Pune': [
      'Hinjewadi IT Park Phase 1-3', 
      'Bhosari MIDC & PCMC Auto Hub', 
      'Viman Nagar & Kalyani Nagar', 
      'Hadapsar & Magarpatta City', 
      'Kothrud & Deccan Gymkhana Hub', 
      'Wakad & Baner Expressway Hub', 
      'Swargate & Camp Commercial', 
      'Shivaji Nagar Central Depot', 
      'Kharadi EON Free Zone Hub', 
      'Chakan Industrial Express Hub', 
      'Pimpri Commercial Center', 
      'Katraj & Kondhwa Belt'
    ],
    'Delhi': [
      'Okhla Industrial Area Phase 1-3', 
      'Connaught Place & Central Hub', 
      'Karol Bagh Commercial Depot', 
      'Udyog Vihar & Cyber City Gurgaon', 
      'Noida Sector 62 & 63 Hub', 
      'Mayapuri Industrial Belt', 
      'Nehru Place IT Hub', 
      'Dwarka & IGI Airport Cargo Belt', 
      'Patparganj Industrial Staging', 
      'Chandni Chowk & Old Delhi Trading', 
      'Laxmi Nagar & East Delhi Hub', 
      'Faridabad Industrial Corridor'
    ],
    'Ahmedabad': [
      'SG Highway Corporate Belt', 
      'Sanand & Changodar Logistics Park', 
      'Prahlad Nagar & Satellite CBD', 
      'Vatva GIDC Industrial Phase 1-4', 
      'Naroda Industrial Estate', 
      'Ashram Road Commercial Corridor', 
      'Maninagar & Old City Depot', 
      'CG Road & Navrangpura Hub', 
      'Aslali Transport Nagar Hub', 
      'Sarkhej Highway Terminal', 
      'Gota & Chandkheda Belt', 
      'Odhav Industrial Area'
    ],
    'Kolkata': [
      'Sector V Salt Lake IT & CBD', 
      'Park Street & BBD Bagh Commercial', 
      'Burrabazar Wholesale Trading Hub', 
      'Rajarhat New Town Expressway', 
      'Taratala Industrial Logistics Park', 
      'Howrah Freight Terminal', 
      'Gariahat & South Kolkata Hub', 
      'Dankuni Logistics & Container Hub', 
      'Kasba Industrial Estate', 
      'Dum Dum Airport Cargo Hub', 
      'Behala Commercial Center', 
      'Ballygunge & Alipore Hub'
    ],
    'Kochi': [
      'Kalamassery Industrial Transit Hub', 
      'Kakkanad Infopark & SmartCity', 
      'MG Road & Marine Drive Commercial', 
      'Ernakulam South Railway Depot', 
      'Willingdon Island Port Cargo Hub', 
      'Aluva Highway Transit Center', 
      'Edappally Bypass Commercial Hub', 
      'Ravipuram & Panampilly Nagar', 
      'Vyttila Mobility Logistics Hub', 
      'Palarivattom & Kaloor Hub'
    ],
    'Madurai': [
      'Mattuthavani Central Parcel Terminal', 
      'Simmakkal Wholesale Trading Hub', 
      'Goripalayam & Tallakulam Commercial', 
      'Anna Nagar & K.K. Nagar Belt', 
      'Villapuram Industrial Estate', 
      'South Masi & West Masi Street Markets', 
      'Teppakulam Commercial Sector', 
      'Kappalur SIDCO Industrial Corridor', 
      'Tirunagar Highway Junction', 
      'Ellis Nagar Commercial Belt'
    ]
  };

  return areas[city] || [
    'Central Commercial Parcel Terminal',
    'Industrial Express Logistics Hub',
    'National Highway Staging Depot',
    'Tech Park & CBD Collection Center',
    'Residential Doorstep Pickup Belt',
    'Commercial Trading Sector',
    'Air Freight & Express Facility',
    'Ring Road Logistics Junction'
  ];
};

const POPULAR_PARCEL_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Kochi', 'Madurai'
];

export const ParcelCourierServiceContent: React.FC<ParcelCourierServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const city = selectedCity || 'Coimbatore';
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Interactive Parcel Cost Estimator state
  const [calcParcelTier, setCalcParcelTier] = useState<'document' | 'small-box' | 'medium-box' | 'heavy-box' | 'bulk-50' | 'freight-100'>('medium-box');
  const [calcDistance, setCalcDistance] = useState<number>(450);
  const [calcDeliverySpeed, setCalcDeliverySpeed] = useState<'standard' | 'express'>('standard');

  const parcelAreas = getParcelDeliveryAreas(city);

  // Dynamic price calculation
  const calculateParcelPrice = (
    tier: 'document' | 'small-box' | 'medium-box' | 'heavy-box' | 'bulk-50' | 'freight-100',
    distanceKm: number,
    speed: 'standard' | 'express'
  ) => {
    let baseRate = 180;
    let ratePerKm = 0.55;

    switch (tier) {
      case 'document':
        baseRate = 120;
        ratePerKm = 0.25;
        break;
      case 'small-box':
        baseRate = 220;
        ratePerKm = 0.50;
        break;
      case 'medium-box':
        baseRate = 480;
        ratePerKm = 0.95;
        break;
      case 'heavy-box':
        baseRate = 950;
        ratePerKm = 1.75;
        break;
      case 'bulk-50':
        baseRate = 1800;
        ratePerKm = 2.90;
        break;
      case 'freight-100':
        baseRate = 3200;
        ratePerKm = 4.80;
        break;
    }

    let calculated = Math.round(baseRate + (distanceKm * ratePerKm));
    if (speed === 'express') {
      calculated = Math.round(calculated * 1.35);
    }
    return calculated;
  };

  const getEstimatedTransit = (distanceKm: number, speed: 'standard' | 'express') => {
    if (speed === 'express') {
      if (distanceKm <= 500) return 'Same Day – 24 Hours';
      if (distanceKm <= 1200) return '24 – 36 Hours';
      return '1 – 2 Days';
    }
    if (distanceKm <= 350) return '1 Day (Next Day)';
    if (distanceKm <= 850) return '1 – 2 Days';
    if (distanceKm <= 1600) return '2 – 4 Days';
    return '4 – 6 Days';
  };

  const PARCEL_PRICING_TABLE = [
    { route: `${city} → Chennai`, dist: '500 km', doc: '₹220', small: '₹470', medium: '₹950', heavy: '₹1,800', time: '1 – 2 Days' },
    { route: `${city} → Bengaluru`, dist: '360 km', doc: '₹190', small: '₹400', medium: '₹820', heavy: '₹1,580', time: '1 – 2 Days' },
    { route: `${city} → Hyderabad`, dist: '920 km', doc: '₹340', small: '₹680', medium: '₹1,350', heavy: '₹2,550', time: '2 – 3 Days' },
    { route: `${city} → Kochi / Madurai`, dist: '200 km', doc: '₹160', small: '₹320', medium: '₹670', heavy: '₹1,300', time: '1 Day' },
    { route: `${city} → Mumbai`, dist: '1,280 km', doc: '₹420', small: '₹860', medium: '₹1,690', heavy: '₹3,180', time: '2 – 3 Days' },
    { route: `${city} → Pune`, dist: '1,150 km', doc: '₹390', small: '₹790', medium: '₹1,570', heavy: '₹2,960', time: '2 – 3 Days' },
    { route: `${city} → Delhi NCR`, dist: '2,400 km', doc: '₹680', small: '₹1,420', medium: '₹2,760', heavy: '₹5,150', time: '3 – 5 Days' },
    { route: `${city} → Ahmedabad`, dist: '1,750 km', doc: '₹540', small: '₹1,090', medium: '₹2,140', heavy: '₹4,010', time: '3 – 4 Days' },
    { route: `${city} → Kolkata`, dist: '2,150 km', doc: '₹630', small: '₹1,290', medium: '₹2,520', heavy: '₹4,710', time: '3 – 5 Days' }
  ];

  const FAQS = [
    {
      q: `How does Packer Solutions guarantee safe and intact parcel delivery in ${city}?`,
      a: 'We implement a strict multi-layer packaging protocol utilizing 5-ply corrugated boxes, high-density bubble cushioning, edge protectors, and tamper-evident barcode labels. Each consignment is digitally scanned at every dispatch terminal and transferred on scheduled express logistics corridors with zero unauthorized handling.'
    },
    {
      q: `Do you provide doorstep parcel pickup across all residential and business areas in ${city}?`,
      a: `Yes. Our logistics captains collect parcels directly from homes, apartments, corporate offices, retail stores, manufacturing units, and e-commerce warehouses throughout ${city} at your scheduled pickup time.`
    },
    {
      q: 'What is the difference between Standard Parcel Delivery and Express Priority Courier?',
      a: 'Standard Parcel Delivery is our cost-efficient scheduled surface highway transit ideal for personal belongings, routine commercial boxes, and luggage. Express Priority Courier utilizes dedicated green express corridors and air cargo for urgent business documents, medical parcels, and time-critical samples with expedited next-day delivery.'
    },
    {
      q: 'How are delicate, fragile, or electronic items packed and transported?',
      a: 'Fragile goods (laptops, monitors, glassware, crockery, handicrafts) undergo 3-stage custom cushioning: primary anti-static or bubble wrapping, secondary foam corner blocking, and placement inside heavy-duty 5-ply outer carton boxes with high-visibility "FRAGILE / HANDLE WITH CARE" labels and top-load transport protocol.'
    },
    {
      q: 'What documents are required to send a parcel from one state to another?',
      a: 'For personal goods: Sender and receiver Government Photo ID (Aadhaar / Driving License / PAN) and an itemized content declaration. For commercial shipments: GST Invoice, E-Way Bill (for consignments with value exceeding ₹50,000), and Company Delivery Challan.'
    },
    {
      q: 'How is volumetric weight calculated for lightweight large boxes?',
      a: 'In accordance with national freight standards, if volumetric weight exceeds actual gross weight, charges are calculated based on volumetric dimensions: (Length × Width × Height in cm) / 5000. Our pickup pilot uses certified digital scales and measuring tapes to give you a 100% transparent reading.'
    },
    {
      q: 'Can I send bulk cargo, commercial inventory, or multiple carton boxes?',
      a: 'Yes. We cater to bulk consignments ranging from 50 kg to 5,000+ kg through dedicated part-load (LTL) and full mini-truck arrangements (Tata Ace, Bolero Maxi Truck) offering discounted bulk volume rates for businesses, traders, and D2C brands.'
    },
    {
      q: 'How do I track the live status and location of my parcel?',
      a: 'Upon pickup, you receive a unique Barcode Tracking Number. Real-time milestone updates (Pickup confirmed, Hub sorted, In-transit highway checkpoint, Destination arrival, Out for delivery) are sent automatically via SMS, WhatsApp, and our live online tracking portal.'
    },
    {
      q: 'Is transit insurance available for valuable parcels and commercial goods?',
      a: 'Yes, comprehensive transit insurance is available covering accidental risks, fire, and collision during highway transit. We issue a formal Certificate of Insurance (COI) based on your declared invoice / replacement value before dispatch.'
    },
    {
      q: 'What items are restricted or prohibited from parcel transportation?',
      a: 'In compliance with Indian highway transit and safety laws, we do NOT transport inflammable liquids, compressed gas cylinders, contraband, unauthorized firearms/ammunition, live animals, perishable foods without dry ice, hazardous chemicals, or currency/bullion.'
    }
  ];

  const RELATED_SERVICES = [
    { title: `House Shifting Services in ${city}`, id: 'packers-and-movers' },
    { title: `Packing Service in ${city}`, id: 'packing-unpacking' },
    { title: `Loading & Unloading Services in ${city}`, id: 'loading-unloading' },
    { title: `Vehicle Transportation Services in ${city}`, id: 'vehicle-transportation' },
    { title: `Truck Booking Services in ${city}`, id: 'domestic-relocation' },
    { title: `Warehousing & Storage in ${city}`, id: 'warehousing-storage' }
  ];

  return (
    <div className="space-y-12" id="parcel-courier-details-view">
      
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
            Professional Parcel &amp; Courier Transportation Services in {city} – Express &amp; Secure Delivery
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Dispatch documents, personal boxes, retail products, e-commerce orders, and commercial bulk cargo anywhere across India with Packer Solutions&apos; certified parcel network in {city}. Featuring scheduled highway corridors, tamper-evident barcode tracking, heavy-duty 5-ply cartons, and doorstep pickup.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether sending an urgent contract to Chennai, a festive luggage box to Bengaluru, or a 200 kg commercial batch to Mumbai or Delhi, our logistics fleet guarantees zero misplacement, verified OTP delivery, and 100% transparent flat pricing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="parcel-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Parcel Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="parcel-hero-pickup-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-blue-400" />
              <span>Book Doorstep Parcel Pickup</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL PARCEL & COURIER SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional Parcel &amp; Courier Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Parcel Service &amp; Logistics Solutions in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Sending packages across cities shouldn’t involve endless counter queues, fragile mishandling, or unexpected delivery delays. Packer Solutions provides planned, tracked, and protective parcel logistics engineered for complete reliability.
          </p>
        </div>

        {/* 6 Service Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Doorstep Pickup in {city}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Convenient, on-schedule collection directly from your home, office, shop, or factory with certified digital weighing scales.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Standard Surface Parcel Transport</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cost-effective scheduled highway transit connecting {city} to over 100+ tier-1, tier-2, and industrial hubs across India.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Express Priority Courier Dispatch</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Expedited handling and priority flight/express corridor routing for time-sensitive corporate shipments, tenders, and emergency parts.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Confidential Document &amp; Envelope Security</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tamper-evident waterproof security pouches for legal agreements, property deeds, financial certificates, and corporate records.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Fragile &amp; Electronics Multi-Layer Packing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Shock-absorbing bubble wrap, 5-ply export-grade boxes, foam corner guards, and top-load segregation for sensitive glassware &amp; tech gadgets.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Commercial Bulk Cargo &amp; Part Load (LTL)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Discounted volume rates for 50 kg to 5,000 kg consignments, merchant stock transfers, retail stock replenishment, and trader freight.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS (FOR PARCEL & COURIER)
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            The Packer Solutions Benchmark for Parcel Safety &amp; Speed
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered packaging protocols, digital barcode custody tracking, and guaranteed zero hidden surcharges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <Barcode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Misplacement Barcode Tracking</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every parcel receives a unique tamper-evident barcode. Scanned at every transit hub to guarantee zero lost or misplaced boxes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Heavy-Duty 5-Ply Packaging</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We exclusively use virgin-kraft 5-ply corrugated cartons and multi-layer bubble wrap that resist crushing, moisture, and road vibrations.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Doorstep Pickup &amp; Direct Handover</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No need to visit crowded parcel booking counters. We collect from your doorstep in {city} and hand over safely to recipient hands.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real-Time SMS &amp; WhatsApp Updates</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Receive automatic notifications at each milestone: Pickup completed, highway hub departure, destination arrival, and out-for-delivery.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Transit Insurance &amp; Security</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Comprehensive transit insurance coverage for valuable shipments with verified electronic proof of delivery (E-POD) and OTP confirmation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Starting Rates with Zero Surprises</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upfront, weight-based rates with clear volumetric calculation, zero fuel surcharge surprises, and clear digital GST invoicing.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW PARCEL DELIVERY WORKS (9 STAGES)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How Parcel Delivery Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Parcel Relocation Workflow (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A precision 9-stage logistics workflow ensuring maximum package security, tracking accuracy, and timely handover.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Instant Quote & Pickup Scheduling', desc: `Enter pickup address in ${city}, destination pincode, approximate weight, and package type.` },
              { num: 2, title: 'Doorstep Pickup by Logistics Captain', desc: 'Our trained pickup pilot arrives at your home or office with digital weighing scales and measuring tape.' },
              { num: 3, title: 'Weight & Dimension Verification', desc: 'Gross physical weight and volumetric dimensions are recorded transparently with an instant digital receipt.' },
              { num: 4, title: 'Barcode Tagging & Label Printing', desc: 'Tamper-proof barcode stickers and handling instructions are affixed securely to all parcel surfaces.' },
              { num: 5, title: '5-Ply Packaging & Multi-Layer Sealing', desc: 'Packages undergo reinforced tape sealing, bubble film wrap, and waterproof outer stretch wrapping.' },
              { num: 6, title: 'Automated Hub Sorting & Staging', desc: `Parcel arrives at the ${city} central logistics terminal and is sorted into dedicated destination routes.` },
              { num: 7, title: 'Express Highway Transit with Live GPS', desc: 'Transferred via sealed container trucks with real-time GPS tracking and transit milestone updates.' },
              { num: 8, title: 'Destination Terminal Offloading', desc: 'Parcel arrives at the destination regional hub, undergoes barcode scan, and is assigned to a delivery van.' },
              { num: 9, title: 'Doorstep Handover & OTP Delivery', desc: 'Delivered directly into recipient hands with secure OTP verification and digital signature sign-off.' }
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
          5. INDUSTRIAL PACKAGING & TAMPER-PROOF MATERIALS
         ========================================================================= */}
      <section id="section-packaging-materials" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Industrial Packaging &amp; Protective Gear</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Industrial-Grade Packing Materials &amp; Tamper-Evident Security
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every parcel is cushioned and sealed using certified industrial packaging materials designed to resist highway shocks, dust, and moisture.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">📦</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">5-Ply Kraft Cartons</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Crush-resistant heavy-duty corrugated boxes for general and heavy cargo</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🫧</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">High-Density Bubble Film</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Dual-layer shock cushioning for glassware, laptops &amp; delicate electronics</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">✉️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Security Seal Pouches</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Tamper-evident waterproof polybags for confidential agreements &amp; papers</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🛡️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Waterproof Cling Film</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Industrial stretch wrap to prevent moisture entry, scuffs &amp; box tearing</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE PARCEL COST & TRANSIT ESTIMATOR
         ========================================================================= */}
      <section id="section-parcel-estimator" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Interactive Parcel Fare Estimator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Calculate Your Parcel Delivery Fare in Real Time
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select your shipment size, highway distance from {city}, and delivery speed to view an instant transparent estimate.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Step 1: Weight & Tier Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>1. Select Shipment Size &amp; Weight Category</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { id: 'document', label: 'Document', desc: 'Up to 1 kg', icon: '📄' },
                { id: 'small-box', label: 'Small Box', desc: '1 – 5 kg', icon: '📦' },
                { id: 'medium-box', label: 'Medium Parcel', desc: '5 – 20 kg', icon: '🧳' },
                { id: 'heavy-box', label: 'Heavy Carton', desc: '20 – 50 kg', icon: '📦' },
                { id: 'bulk-50', label: 'Bulk Cargo', desc: '50 – 100 kg', icon: '🏭' },
                { id: 'freight-100', label: 'Part-Load Truck', desc: '100 kg+', icon: '🚛' }
              ].map((tier) => {
                const isSelected = calcParcelTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setCalcParcelTier(tier.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/80 border-[#001261] dark:border-blue-400 shadow-xs'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl">{tier.icon}</span>
                    <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#001261] dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'}`}>
                      {tier.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                      {tier.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Delivery Speed Option */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>2. Delivery Speed &amp; Priority Mode</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCalcDeliverySpeed('standard')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  calcDeliverySpeed === 'standard'
                    ? 'bg-blue-50/90 dark:bg-blue-950/80 border-[#001261] dark:border-blue-400'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Standard Surface Transit (Most Economical)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-normal">
                    Scheduled highway container logistics corridor. Perfect for personal boxes &amp; routine stock.
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 border-blue-600">
                  {calcDeliverySpeed === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCalcDeliverySpeed('express')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  calcDeliverySpeed === 'express'
                    ? 'bg-blue-50/90 dark:bg-blue-950/80 border-[#001261] dark:border-blue-400'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Express Priority Transit (Fastest Delivery)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-normal">
                    Priority airport cargo &amp; express overnight green corridors for urgent papers &amp; samples.
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 border-blue-600">
                  {calcDeliverySpeed === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Distance Slider */}
          <div className="space-y-2 bg-slate-50/80 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>3. Highway Distance from {city}</span>
              </label>
              <span className="text-xs sm:text-sm font-mono font-black text-[#001261] dark:text-blue-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {calcDistance} km
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="25"
              value={calcDistance}
              onChange={(e) => setCalcDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Intra-State (50 km)</span>
              <span>Regional (500 km)</span>
              <span>Interstate (1,200 km)</span>
              <span>Pan-India (2,500 km)</span>
            </div>
          </div>

          {/* Calculation Result Summary Box */}
          <div className="bg-gradient-to-r from-blue-900 to-[#001261] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
                Estimated Parcel Delivery Fare
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2 justify-center sm:justify-start">
                <span>₹{calculateParcelPrice(calcParcelTier, calcDistance, calcDeliverySpeed).toLocaleString('en-IN')}*</span>
                <span className="text-xs text-blue-200 font-normal">All-inclusive starting fare</span>
              </div>
              <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 justify-center sm:justify-start pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Est. Time: <strong>{getEstimatedTransit(calcDistance, calcDeliverySpeed)}</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doorstep Pickup &amp; Barcode Included</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Book This Parcel Rate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PRICING BREAKDOWN & ROUTE RATES TABLE
         ========================================================================= */}
      <section id="section-pricing-matrix" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Transparent Route Pricing Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Parcel Delivery Service &amp; Route Rates Matrix from {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Standard starting rates for key intercity corridors. All rates include doorstep collection and verified barcode scanning.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Intercity Route</th>
                  <th className="px-4 py-3.5">Distance</th>
                  <th className="px-4 py-3.5">Document (&lt;1kg)</th>
                  <th className="px-4 py-3.5">Small Box (1-5kg)</th>
                  <th className="px-4 py-3.5">Medium (5-20kg)</th>
                  <th className="px-4 py-3.5">Heavy (20-50kg)</th>
                  <th className="px-4 py-3.5">Transit Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300 font-medium">
                {PARCEL_PRICING_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{row.route}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-xs">{row.dist}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.doc}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.small}</td>
                    <td className="px-4 py-3 text-[#001261] dark:text-blue-400 font-bold">{row.medium}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.heavy}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold">
                        {row.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. WHAT YOU CAN SEND (PERMITTED SHIPMENT CATEGORIES)
         ========================================================================= */}
      <section id="section-shipment-categories" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Permitted Shipment Categories</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            What You Can Send from {city} Across India
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Packer Solutions manages compliant and safe transportation across personal, corporate, and commercial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Personal &amp; Household Boxes</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">For individuals &amp; families</p>
              </div>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-medium pt-1">
              {['Apparel, Clothes & Suitcase Luggage', 'Books, Study Materials & Academic Kits', 'Home Decor, Linen & Kitchen Utensils', 'Personal Small Electronics & Laptops', 'Festive Gift Hampers & Packages'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Business &amp; Commercial Cargo</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">For offices &amp; manufacturers</p>
              </div>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-medium pt-1">
              {['Legal Documents, Tenders & Contracts', 'Commercial Product Samples & Catalogs', 'Industrial Machinery Spares & Hardware', 'Office IT Equipment & Monitors', 'Factory Raw Materials & Part Lots'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">E-commerce &amp; Retail Orders</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">For D2C brands &amp; traders</p>
              </div>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-medium pt-1">
              {['D2C Brand Packaged Dispatches', 'Online Marketplace Merchant Shipments', 'Retail Stock Replenishment Boxes', 'Customer Return & Exchange Logistics', 'Bulk Distribution & Trader Freight'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. PARCEL SERVICE MODELS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-service-models" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Parcel Service Models</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Courier Services &amp; Tailored Delivery Packages in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose the exact delivery speed, carrier configuration, and security level that fits your shipment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Most Popular
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Standard Parcel Service (Surface)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Economical highway container shipping for personal suitcases, study boxes, and general goods with verified tracking and doorstep collection.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600" />
              <span>Doorstep Pickup + Barcode Tracking + Transit Cover</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                Fastest Speed
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Express Priority Courier (Air / Green Corridor)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Expedited transit for urgent time-sensitive shipments, medical consignments, and critical business samples with guaranteed next-day delivery.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600" />
              <span>Priority Routing + Direct Flight / Overnight Express</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                High Security
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Confidential Document &amp; Envelope Delivery
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Dedicated tamper-proof polybags and sealed delivery for legal deeds, corporate paperwork, passports, certificates, and tenders.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-purple-600" />
              <span>Tamper-Evident Seal + Encrypted Chain of Custody</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                Commercial Volume
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Bulk Cargo &amp; Part-Load Truck (LTL)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              High-volume rates for shipments above 50 kg to 5,000 kg with dedicated pallet handling, forklift loading, and wholesale dispatch.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-teal-600" />
              <span>Discounted Per-Kg Rates + Scheduled Truck Freight</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. SAFETY, BARCODE TRACKING & SECURITY PROTOCOLS
         ========================================================================= */}
      <section id="section-security-protocols" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Security &amp; Barcode Tracking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Courier Delivery, Tamper-Proof Handling &amp; Barcode Tracking in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every step of your consignment’s journey is recorded on our digital logistics management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Home className="w-4 h-4 text-blue-600" />
              <span>Sender Documentation</span>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-normal">
              <li>• Sender Name &amp; Verified Mobile</li>
              <li>• Complete Pickup Address in {city}</li>
              <li>• Government ID Verification</li>
              <li>• Itemized Content Declaration</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Receiver Details &amp; E-POD</span>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-normal">
              <li>• Recipient Name &amp; Active Phone</li>
              <li>• Exact Destination Street &amp; Pincode</li>
              <li>• Secure OTP Handover Protocol</li>
              <li>• Instant Digital Proof of Delivery</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Barcode className="w-4 h-4 text-purple-600" />
              <span>Consignment Label Data</span>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-normal">
              <li>• Unique Barcode Reference ID</li>
              <li>• Multi-Piece Box Numbering (e.g. 1/3, 2/3)</li>
              <li>• Certified Gross &amp; Volumetric Weight</li>
              <li>• Fragile &amp; Top-Load Handling Signs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. LOCAL PARCEL PICKUP & DELIVERY HUBS IN SELECTED CITY
         ========================================================================= */}
      <section id="section-local-hubs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Local Hubs &amp; Neighborhood Coverage</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Doorstep Parcel Pickup &amp; Delivery Across All Localities in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Our daily pickup vans and logistics captains service every residential sector, commercial district, and industrial belt in {city}.
          </p>
        </div>

        {/* Local Areas Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {parcelAreas.map((area, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 font-medium"
              >
                <CheckCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>

          {/* Quick City Switcher */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Switch Hub Coverage to Another Major City:
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_PARCEL_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onSelectCity && onSelectCity(c)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                    city === c
                      ? 'bg-[#001261] text-white border-[#001261] shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================================= */}
      <section id="section-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>12. Frequently Asked Questions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Everything You Need to Know About Parcel Transportation
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Answers to common questions regarding pickup booking, packaging, insurance, prohibited items, and transit timelines.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          13. PARCEL & COURIER LOGISTICS GUIDE (SEO DIRECTORY)
         ========================================================================= */}
      <section id="section-parcel-topics" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Parcel &amp; Courier Logistics Guide</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive overview of intercity parcel moving, courier transit models, and security standards across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tag 1: parcel service */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              parcel service
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Our end-to-end parcel service in {city} provides scheduled doorstep pickup, certified digital weighing, heavy-duty 5-ply corrugated carton packing, and scheduled highway transit to over 100+ cities nationwide.
            </p>
          </div>

          {/* Tag 2: courier delivery */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              courier delivery
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Experience fast, reliable courier delivery featuring tamper-evident barcode custody tracking, verified OTP recipient handover, and automated milestone updates via SMS and WhatsApp.
            </p>
          </div>

          {/* Tag 3: parcel delivery service */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              parcel delivery service
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Whether sending personal luggage, books, household items, or e-commerce products, our parcel delivery service guarantees zero misplacement, complete safety cushioning, and transparent weight-based pricing.
            </p>
          </div>

          {/* Tag 4: courier services */}
          <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#001261] dark:bg-blue-400 shrink-0" />
              courier services
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Specialized express courier services for confidential corporate documents, contracts, tenders, IT equipment, and industrial spare parts with expedited direct air cargo and green express road corridors.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. 24/7 HELPLINE & FAST BOOKING CALLOUT
         ========================================================================= */}
      <section id="section-final-cta" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 rounded-3xl border border-blue-500/30 p-6 sm:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ INSTANT PARCEL DISPATCH ASSISTANCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to Dispatch Your Parcel from {city}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed font-normal">
              Book doorstep pickup, 5-ply protective packaging, and real-time live GPS tracking with Packer Solutions. Instant transparent quotations with zero hidden surcharges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Parcel Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-2xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 relative z-10 font-normal">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>24/7 Helpline: <strong>+91 98765 43210</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Support: <strong>Instant Updates</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Operating Hours: <strong>Mon - Sun (8 AM - 10 PM)</strong></span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. RECOMMENDED INTERNAL SERVICES
         ========================================================================= */}
      <section id="section-related-services" className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Explore Related Logistics Services in {city}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Quick access to comprehensive house shifting, vehicle transport, packing, and warehousing solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {RELATED_SERVICES.map((link, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectService && onSelectService(link.id)}
              className="bg-white dark:bg-slate-900 hover:bg-orange-500 hover:text-white border border-slate-200 dark:border-slate-700/80 p-3 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate">{link.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:text-white shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
