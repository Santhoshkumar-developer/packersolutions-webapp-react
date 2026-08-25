import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  Clock, 
  Users, 
  MapPin, 
  Check, 
  Award,
  Sparkles,
  Wrench,
  Cog,
  Building,
  Factory,
  Warehouse,
  Boxes,
  Shield,
  Gauge,
  HelpCircle,
  FileCheck,
  Scale,
  Zap,
  Activity,
  Layers,
  Phone,
  ClipboardCheck,
  DollarSign,
  Box,
  HeartHandshake,
  Table,
  HardDrive,
  Sparkle,
  Radio,
  FileText
} from 'lucide-react';
import { ServiceItem } from '../types';

interface LoadingUnloadingServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

// Local service hubs helper for selected city
const getLoadingServiceAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': [
      'Avinashi Road Industrial Corridor', 
      'SIDCO Industrial Estate Kurichi', 
      'Ganapathy Engineering Belt', 
      'Peelamedu Tech & Commercial', 
      'Singanallur Logistics Hub', 
      'Saravanampatti IT Park', 
      'Thudiyalur & Mettupalayam Rd', 
      'Sulur & Madukkarai Industrial', 
      'Eachanari Industrial Zone', 
      'Pollachi Road Logistics Belt', 
      'Ramanathapuram CBD', 
      'Vadavalli Commercial'
    ],
    'Bangalore': [
      'Peenya Industrial Area Phase 1-4', 
      'Whitefield EPIP & ITPL Zone', 
      'Electronic City Phase 1 & 2', 
      'Bommasandra Industrial Area', 
      'Hoodi & Mahadevapura Belt', 
      'Bidadi Industrial Estate', 
      'Rajajinagar Industrial Town', 
      'Jigani Industrial Corridor', 
      'Nelamangala Logistics Hub', 
      'Hebbal & Manyata Tech Park', 
      'Yeshwanthpur Freight Terminal', 
      'Hosur Road Industrial Corridor'
    ],
    'Chennai': [
      'Ambattur Industrial Estate', 
      'Guindy Industrial Area', 
      'Sriperumbudur SIPCOT Auto Belt', 
      'Oragadam Industrial Corridor', 
      'Maraimalai Nagar Industrial Area', 
      'Thirumudivakkam Industrial Estate', 
      'Manali Petrochem Zone', 
      'Ennore Port Freight Corridor', 
      'Porur & DLF IT Park', 
      'OMR Tech Corridor', 
      'Padi Industrial Area', 
      'Gummidipoondi SIPCOT'
    ],
    'Mumbai': [
      'Andheri East MIDC Hub', 
      'Turbhe & Kopar Khairane MIDC', 
      'Taloja Industrial MIDC Zone', 
      'Bhiwandi Logistics & Warehousing', 
      'Thane Wagle Industrial Estate', 
      'Rabale TTC Industrial Area', 
      'JNPT Port Freight Corridor', 
      'Mahape Millennium Business Park', 
      'Kanjurmarg & Bhandup Industrial', 
      'Vasai-Virar Industrial Belt', 
      'Rasayani Industrial Zone', 
      'BKC Commercial Hub'
    ],
    'Hyderabad': [
      'Sanathnagar Industrial Estate', 
      'Balanagar & Jeedimetla IDA', 
      'Pashamylaram IDA Phase 1-3', 
      'Patancheru Industrial Area', 
      'Cherlapally Industrial Estate', 
      'Nacharam & Mallapur Industrial', 
      'Kattedan Industrial Area', 
      'Hitec City & Madhapur IT Belt', 
      'Gachibowli Financial District', 
      'Medchal Industrial Corridor', 
      'Uppal Industrial Area', 
      'Kukatpally Commercial Zone'
    ],
    'Pune': [
      'Bhosari MIDC & PCMC Hub', 
      'Chakan Industrial Area Phase 1-4', 
      'Talwade IT & Industrial Park', 
      'Hadapsar Industrial Estate', 
      'Pimpri-Chinchwad Auto Belt', 
      'Hinjewadi IT & Biotech Park', 
      'Ranjangaon 5-Star MIDC', 
      'Pirangut Industrial Corridor', 
      'Markal & Alandi Logistics Belt', 
      'Sanaswadi Industrial Hub', 
      'Shirwal MIDC Corridor', 
      'Talegaon Floriculture & Auto SEZ'
    ],
    'Delhi': [
      'Okhla Industrial Area Phase 1-3', 
      'Mayapuri Industrial Area', 
      'Patparganj Industrial Estate', 
      'Naraina Industrial Area', 
      'Wazirpur Industrial Area', 
      'Bawana Industrial Area', 
      'Narela Industrial Complex', 
      'Mohan Cooperative Industrial Area', 
      'Kirti Nagar Timber & Industrial', 
      'Udyog Vihar Gurugram Phase 1-5', 
      'Manesar IMT Industrial Hub', 
      'Faridabad Sector 24-29 Belt'
    ],
    'Ahmedabad': [
      'Vatva GIDC Phase 1-4', 
      'Naroda Industrial Estate', 
      'Changodar Logistics & Freight Hub', 
      'Sanand GIDC Automotive Corridor', 
      'Odhav Industrial Area', 
      'Kathwada GIDC', 
      'Aslali Transport Hub', 
      'Bakrol GIDC Belt', 
      'Chhatral GIDC Corridor', 
      'Sarkhej-Bavla Industrial Road', 
      'Moraiya Industrial Area', 
      'SG Highway Corporate Zone'
    ],
    'Kolkata': [
      'Taratala Industrial Estate', 
      'Kasba Industrial Estate', 
      'Dankuni Freight & Logistics Hub', 
      'Howrah Industrial & Foundry Belt', 
      'Kalyani Industrial Area', 
      'Dhulagarh Truck Freight Terminal', 
      'Sector V Salt Lake IT Hub', 
      'Rajarhat New Town Commercial', 
      'Uluberia Industrial Park', 
      'Budge Budge Industrial Zone'
    ],
    'Kochi': [
      'Kalamassery Industrial Belt', 
      'Willingdon Island Port Area', 
      'Eloor & Udyogamandal Industrial', 
      'Kakkanad Infopark & SmartCity', 
      'Aluva Industrial Corridor', 
      'Edayar Industrial Development Area', 
      'Cochin SEZ (CSEZ) Kakkanad', 
      'Vallarpadam ICTT Container Corridor', 
      'Aroor Seafood & Processing Belt', 
      'Angamaly Industrial Estate'
    ]
  };

  return areas[city] || [
    'Central Industrial Estate',
    'Heavy Engineering Logistics Park',
    'Container Freight Station',
    'Manufacturing Corridor',
    'Commercial Business Hub',
    'High-Rise Residential Sector',
    'Warehouse & Distribution Terminal',
    'Metropolitan Ring Road Terminal'
  ];
};

const POPULAR_LOADING_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Kochi'
];

export const LoadingUnloadingServiceContent: React.FC<LoadingUnloadingServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const city = selectedCity || 'Coimbatore';
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [calcWeight, setCalcWeight] = useState<number>(2000);
  const [calcServiceScope, setCalcServiceScope] = useState<'manual-trolley' | 'forklift-crane' | 'factory-turnkey'>('forklift-crane');

  const loadingAreas = getLoadingServiceAreas(city);

  // Dynamic pricing calculation helper based on weight & service scope
  const calculateEstimatedPrice = (kg: number, scope: 'manual-trolley' | 'forklift-crane' | 'factory-turnkey') => {
    if (scope === 'manual-trolley') {
      if (kg <= 500) return 2499;
      if (kg <= 1000) return 3999;
      if (kg <= 2000) return 5999;
      if (kg <= 4000) return 8999;
      return Math.round(kg * 2.5);
    } else if (scope === 'forklift-crane') {
      if (kg <= 1000) return 5499;
      if (kg <= 3000) return 8999;
      if (kg <= 6000) return 14999;
      if (kg <= 10000) return 21999;
      if (kg <= 15000) return 29999;
      return Math.round(kg * 2.2);
    } else {
      // factory-turnkey
      if (kg <= 2000) return 11999;
      if (kg <= 5000) return 24999;
      if (kg <= 10000) return 44999;
      if (kg <= 20000) return 79999;
      return Math.round(kg * 4.2);
    }
  };

  return (
    <div className="space-y-12" id="loading-unloading-details-view">
      
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
            Professional Loading, Unloading &amp; Heavy Equipment Handling in {city} – Zero Damage Guarantee
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Ensure safe, engineered, and damage-free cargo handling with Packer Solutions&apos; certified loading and unloading services in {city}. From heavy CNC industrial machinery, textile looms, and electrical transformers to container de-stuffing, server racks, and high-rise luxury furniture, we provide precision lifting powered by modern hydraulic forklifts, mobile cranes, and certified riggers.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether you require factory machinery loading, container destuffing at industrial hubs, warehouse pallet movement, or high-rise residential furniture hoisting in {city}, our licensed rigging supervisors ensure zero operational downtime and 100% safety compliance.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="loading-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Loading Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="loading-hero-survey-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-blue-400" />
              <span>Book Free On-Site / Digital Survey</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL LOADING & UNLOADING SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional Loading &amp; Unloading Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            End-to-End Industrial, Commercial &amp; Residential Handling in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Improper lifting or unscientific weight balancing can lead to catastrophic cargo damage, floor destruction, and costly industrial downtime. Packer Solutions deploys certified handling procedures customized for factories, warehouses, commercial high-rises, and residential premises across {city}.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our specialized lifting squads combine high-capacity hydraulic jacks, low-clearance machine skates, nylon sling webs, and calibrated forklift fleets to maneuver loads weighing from 300 kg to over 50 tons smoothly through narrow gangways, doorways, and staging bays.
          </p>
        </div>

        {/* 7 Complete Service Process Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Heavy Industrial Machinery &amp; CNC Rigging</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Precision mechanical shifting, dismantling support, base jacking, and transit skidding for CNC machines, lathes, and presses.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hydraulic Forklift Handling (1T–5T)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Modern counterbalanced forklifts with certified operators for warehouse pallet movement, truck loading, and container stuffing.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Gauge className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mobile &amp; Telescopic Crane Lifting</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              10-ton to 50-ton mobile cranes for heavy equipment hoisting, rooftop chiller placement, and tall multi-floor positioning.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Warehouse className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Container De-Stuffing &amp; Pallet Logistics</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Rapid 20ft &amp; 40ft shipping container loading and unloading, palletized cargo stacking, and warehouse inventory staging.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Certified Riggers &amp; Machine Fitters</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Experienced, safety-compliant riggers equipped with high-tensile belts, chain blocks, hydraulic toe jacks, and steel skates.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Cog className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Precision Leveling &amp; Destination Alignment</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Exact positioning onto factory foundation anchor bolts, vibration pads, cleanroom zones, or commercial IT layout bays.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Floor &amp; Doorframe Protection &amp; Site Clearance</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Before wheeling heavy cargo or industrial machines, our crew lays down heavy-duty rubber runners, steel spreader plates, and doorframe corner cushions, eliminating floor scratches, tile cracks, and structural damage throughout your premises in {city}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS (FOR LOADING & UNLOADING)
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            The Gold Standard in Heavy Lifting &amp; Cargo Handling
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered lifting plans, certified crane/forklift operators, and guaranteed safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Accurate Free Site Survey &amp; Lift Blueprint</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We audit machine weight, dimensions, center-of-gravity, floor capacity, and door clearances to architect a foolproof rigging blueprint.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Certified Riggers &amp; Crane Operators</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All crane and forklift drivers are commercially licensed with years of heavy engineering and plant relocation experience in {city}.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Industrial Machine Skates &amp; Toe Jacks</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Low-clearance hydraulic toe jacks, 360-degree rotating machine rollers, and heavy-duty pallet trucks ensure effortless floor gliding.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Surface &amp; Machine Damage Guarantee</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Heavy-duty floor shielding plates, anti-scratch rubber runners, and high-tensile polyester webbing slings protect equipment finishes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pan-India Industrial Logistics Coverage</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Seamless origin loading, heavy hydraulic lashing, interstate transport, and destination crane offloading across 100+ Indian cities.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Fixed &amp; Project Rates</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Clear itemized quotations covering crew, forklifts, cranes, rigging materials, and site protection with zero hidden surcharges.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW LOADING & UNLOADING WORKS (9 STAGES)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How Loading &amp; Unloading Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Rigging &amp; Handling Process (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A structured 9-stage engineering workflow designed for maximum safety, precision load balancing, and rapid execution.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Free Site Survey & Route Audit', desc: 'Evaluating equipment weight, dimensions, floor load capacity, ramp slopes, and doorway clearances.' },
              { num: 2, title: 'Weight & Center of Gravity Check', desc: 'Calculating exact payload weight and equilibrium point to select optimal lift sling positions.' },
              { num: 3, title: 'Equipment & Gear Sizing', desc: 'Allocating the right capacity forklifts (2T–5T), mobile cranes, hydraulic toe jacks, and steel skates.' },
              { num: 4, title: 'Surface & Doorway Protection Prep', desc: 'Laying heavy rubber runners, steel load plates, and corner foam guards along the handling pathway.' },
              { num: 5, title: 'Controlled Hydraulic / Crane Lift', desc: 'Rigging technicians execute synchronous lifting, smooth rolling, or crane hoisting under strict safety control.' },
              { num: 6, title: 'Vehicle Loading & Transit Lashing', desc: 'Positioning cargo with bottom-heavy balancing, securing with heavy-duty ratchet straps, chains, and chocks.' },
              { num: 7, title: 'Coordinated Destination Unloading', desc: 'De-stuffing and lowering cargo using matched mobile cranes, forklifts, or hydraulic ramp equipment.' },
              { num: 8, title: 'Floor Positioning & Alignment', desc: 'Maneuvering machinery into exact layout slots, aligning foundation holes, and seating on anti-vibration pads.' },
              { num: 9, title: 'Site Clearance & Inspection', desc: 'Removing all shoring wood, protective floor runners, and packing debris, followed by client sign-off.' }
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
          5. SPECIALIZED RIGGING & HANDLING GEAR
         ========================================================================= */}
      <section id="section-rigging-gear" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Specialized Rigging Gear</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Industrial-Grade Lifting, Jacking &amp; Rolling Machinery
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every piece of lifting equipment in our fleet is load-tested, certified, and maintained to meet rigorous industrial safety standards across {city}.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🚜</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Hydraulic Forklifts</h4>
            <p className="text-[10px] text-slate-400 leading-tight">1.5T to 5 Ton capacity for container loading &amp; pallet racks</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🏗️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Mobile Cranes</h4>
            <p className="text-[10px] text-slate-400 leading-tight">10T to 50 Ton telescopic cranes for high-reach machine hoisting</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🛹</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Machine Skates &amp; Jacks</h4>
            <p className="text-[10px] text-slate-400 leading-tight">360° roller skates &amp; hydraulic toe jacks for tight spaces</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🪢</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Webbing Slings &amp; Belts</h4>
            <p className="text-[10px] text-slate-400 leading-tight">High-tensile polyester slings, D-shackles &amp; heavy chains</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HYDRAULIC FORKLIFT & MOBILE CRANE SPOTLIGHT
         ========================================================================= */}
      <section id="section-forklift-crane" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Gauge className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Forklift &amp; Crane Fleet Spotlight</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Heavy Lifting Powered by Modern Hydraulic Fleets
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hydraulic Forklift Operations (1.5T to 5 Ton)</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Warehouse &amp; Plant Staging</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our battery-operated and diesel counterbalanced forklifts are equipped with side-shifters, roll clamps, and extended tines, ideal for loading and de-stuffing shipping containers, warehouse racking, and shopfloor equipment transit in {city}.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 pt-1">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Container Loading / De-Stuffing</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Palletized Inventory Stacking</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Certified Forklift Driver Included</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mobile &amp; Telescopic Cranes (10T to 50 Ton+)</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">High-Elevation &amp; Heavy Cargo Hoisting</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When cargo cannot be handled via ramps or stairs, our certified crane fleet handles rooftop HVAC chillers, multi-story industrial transformers, heavy structural girders, and machinery extraction with complete outrigger ground stability.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 pt-1">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Multi-Floor Hoisting &amp; Windows</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Certified Rigger &amp; Signalman</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">✓ Boom Reach Up to 45+ Meters</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FACTORY & INDUSTRIAL PLANT RELOCATION SPOTLIGHT
         ========================================================================= */}
      <section id="section-factory-relocation" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Factory className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Factory &amp; Plant Relocation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Turnkey Manufacturing Facility &amp; Production Line Shifting
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
            <Cog className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Relocating manufacturing units, textile spinning mills, injection molding facilities, and precision tooling plants demands tight scheduling and zero impact on sensitive calibration. Our factory logistics team provides end-to-end electrical disconnect support, machinery unbolting, flatbed trailer loading, and supervised foundation seating across {city}.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Unbolting &amp; Base Jacking</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Heavy Flatbed / Low-Bed Trailers</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Minimal Production Downtime</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PRECISION LEVELING & DESTINATION MACHINE PLACEMENT SPOTLIGHT
         ========================================================================= */}
      <section id="section-precision-placement" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Cog className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Precision Placement &amp; Leveling</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Systematic Shopfloor Positioning &amp; Anchor Alignment
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
            <Layers className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              We do not leave your heavy equipment stranded on the loading dock. Our riggers maneuver machines through internal shopfloor gangways, position them directly over pre-drilled floor anchors, align with level gauges, and install vibration-damping mounts according to your plant engineering blueprints.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Exact Foundation Hole Matching</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Anti-Vibration Pad Seating</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Zero Epoxy Floor Damage</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LOADING & UNLOADING SERVICE MODELS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-shifting-options" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Loading Service Models</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Tailored Handling Packages for Every Operational Scale
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose the exact level of handling, rigging, and equipment assistance that matches your operational requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Complete Turnkey Loading & Unloading */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Turnkey End-to-End
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Turnkey Loading &amp; Unloading</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Full 360-degree handling: our rigging squad handles origin unbolting/jacking, truck loading, transit tie-downs, destination offloading, and final precision floor positioning in <strong>{city}</strong>.
            </p>
          </div>

          {/* Loading-Only Service */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Origin Handling Only
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Loading-Only Service</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Ideal for shippers with their own destination reception teams. Our certified riggers safely lift, roll, load, and strap machinery/cargo securely onto your transport vehicles.
            </p>
          </div>

          {/* Unloading-Only Service */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono">
                Destination Staging
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Unloading &amp; Positioning Only</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Cargo arriving in <strong>{city}</strong>? Hire our local forklift, crane, and rigging crew to de-stuff containers or flatbed trucks and position items directly on your shopfloor or warehouse racks.
            </p>
          </div>

          {/* Dedicated Forklift / Crane Rental */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded font-mono">
                Equipment + Driver
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Dedicated Forklift / Crane Hire</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Hourly, daily, or project-based rental of 1.5T–5T forklifts or 10T–50T mobile cranes, complete with certified operators, fuel, and rigging accessories for flexible on-demand operations.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. INTERSTATE & HEAVY CARGO TRANSPORT STANDARDS
         ========================================================================= */}
      <section id="section-domestic-shifting" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Interstate Cargo Handling</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Heavy-Duty Interstate Lashing &amp; Transit Safety Standards
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Long-distance intercity movement of heavy machines and industrial goods is subject to severe highway vibrations and inertia shifts. Our loading protocols mandate timber chocking, rubber anti-slip friction mats, heavy-duty ratchet tie-downs, and steel chain binders on air-suspension trailers.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Every shipment dispatched across India is covered by comprehensive transit risk insurance and documented with pre-lift dimensional surveys and weighbridge receipts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Steel Chain Tie-Downs</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Timber Wheel Chocking</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Anti-Slip Friction Mats</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Transit Risk Insurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. INTERACTIVE WEIGHT & MACHINERY COST ESTIMATOR
         ========================================================================= */}
      <section id="section-volume-estimator" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Weight &amp; Equipment Cost Estimator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Instant Capacity &amp; Pricing Calculator for {city}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left: Interactive Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Estimated Total Weight:</span>
                  <span className="text-[#001261] dark:text-blue-400 font-mono font-black text-sm">
                    {calcWeight >= 1000 ? `${(calcWeight / 1000).toFixed(1)} Ton (${calcWeight} kg)` : `${calcWeight} kg`}
                  </span>
                </label>
                <input 
                  type="range" 
                  min="300" 
                  max="15000" 
                  step="200"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#001261] mt-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>300 kg (Small Pallet)</span>
                  <span>3,000 kg (CNC Machine)</span>
                  <span>15+ Ton (Heavy Plant)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Select Handling Scope:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCalcServiceScope('manual-trolley')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center ${
                      calcServiceScope === 'manual-trolley'
                        ? 'bg-[#001261] text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Manual &amp; Trolley
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcServiceScope('forklift-crane')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center ${
                      calcServiceScope === 'forklift-crane'
                        ? 'bg-[#001261] text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Forklift / Crane
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcServiceScope('factory-turnkey')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center ${
                      calcServiceScope === 'factory-turnkey'
                        ? 'bg-[#001261] text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Turnkey Plant
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Price Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/60 p-5 rounded-2xl border border-blue-200/60 dark:border-slate-700 text-center space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Estimated Handling Rate in {city}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#001261] dark:text-blue-400 mt-1">
                  ₹{calculateEstimatedPrice(calcWeight, calcServiceScope).toLocaleString('en-IN')}*
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Includes certified operators, floor protection runners &amp; heavy rigging slings
                </p>
              </div>

              <div className="space-y-1.5 text-left border-t border-blue-200/50 dark:border-slate-700 pt-3">
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Payload: <strong>{calcWeight} kg</strong> ({calcServiceScope.replace('-', ' ').toUpperCase()})</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero floor damage &amp; licensed crane/forklift drivers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Complete origin loading &amp; destination staging in {city}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenEnquiry}
                id="loading-calc-book-btn"
                className="w-full bg-[#001261] hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
              >
                Lock In This Rate For {city}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. TRANSPARENT PRICING & EQUIPMENT MATRIX
         ========================================================================= */}
      <section id="section-pricing-table" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Table className="w-3.5 h-3.5 text-blue-600" />
            <span>12. Standard Pricing &amp; Capacity Matrix</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Transparent Rate Card &amp; Handling Capacity Chart
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, upfront pricing with no hidden equipment fees or unexpected labour surcharges in {city}.
          </p>
        </div>

        {/* Equipment & Fleet Pricing Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Handling Equipment &amp; Operator Rate Card</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Standard rates for standalone machinery and equipment deployments.</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md self-start sm:self-auto">
              ✓ Verified {city} Rate Index
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold font-mono text-[10px] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Service / Equipment</th>
                  <th className="px-5 py-3.5">Rated Capacity</th>
                  <th className="px-5 py-3.5">Ideal Environment</th>
                  <th className="px-5 py-3.5 text-right">Starting Price</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { eq: 'Trained Handling Crew (2 Persons)', cap: 'Up to 500 kg', env: 'Commercial floors, furniture, boxes', price: '₹2,499' },
                  { eq: 'Heavy Rigging Crew (4 Persons)', cap: 'Up to 1.5 Ton', env: 'Commercial machinery, safes, servers', price: '₹4,499' },
                  { eq: 'Heavy-Duty Machine Skates & Jacks', cap: '1 Ton – 5 Ton', env: 'Factory floor machinery shifting', price: '₹2,999' },
                  { eq: 'Hydraulic Pallet Truck (1.5T / 3.5T)', cap: '1.5T to 3.5 Ton', env: 'Warehouse palletized freight', price: '₹3,499' },
                  { eq: 'Forklift Service with Operator', cap: 'Up to 3 Ton', env: 'Container de-stuffing & yard loading', price: '₹6,999' },
                  { eq: 'Heavy Forklift Service (5 Ton)', cap: 'Up to 5 Ton', env: 'Heavy steel coils & heavy pallets', price: '₹9,999' },
                  { eq: 'Mobile Telescopic Crane (10T–20T)', cap: 'Up to 20 Ton', env: 'Multi-floor hoisting & generators', price: '₹16,999' },
                  { eq: 'Heavy Crane Service (25T–50T+)', cap: 'Above 25 Ton', env: 'Heavy transformers & factory bays', price: '₹28,000+' },
                  { eq: 'Turnkey Industrial Machine Relocation', cap: 'Custom Project', env: 'Full plant & production line move', price: 'On Survey' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{row.eq}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
                        {row.cap}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{row.env}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-black text-[#001261] dark:text-blue-400 text-sm">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 px-5 py-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            * Rates are indicative starting prices for standard operations in {city}. Actual pricing depends on machine weight, center of gravity, access route, lifting height, and site survey parameters.
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. 12-CATEGORY MACHINERY & CARGO HANDLING MATRIX
         ========================================================================= */}
      <section id="section-inventory-categories" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HardDrive className="w-3.5 h-3.5 text-blue-600" />
            <span>13. Machinery &amp; Cargo Categories We Handle</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Custom Handling Protocols for Every Machinery Type
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tailored rigging fixtures, weight-balancing cradles, and surface protection for specialized assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              category: 'CNC Milling & Lathe Machines',
              icon: '⚙️',
              specs: 'Low-clearance toe jacks, 360° roller skates, base tie-down brackets',
              weight: '1 Ton – 12 Tons'
            },
            {
              category: 'Industrial Textile Looms & Spinners',
              icon: '🧵',
              specs: 'Anti-vibration alignment, level gauge balance, spindle locking',
              weight: '800 kg – 6 Tons'
            },
            {
              category: 'Electrical Transformers & HT Panels',
              icon: '⚡',
              specs: 'Mobile crane hoisting, non-conductive slings, outrigger staging',
              weight: '2 Tons – 25 Tons'
            },
            {
              category: 'Heavy Diesel Generators & Compressors',
              icon: '🔋',
              specs: 'Vibration mount seating, exhaust disconnect, skid rolling',
              weight: '1.5 Tons – 15 Tons'
            },
            {
              category: 'IT Server Racks & Data Center Stacks',
              icon: '🖥️',
              specs: 'Ramp dollies, anti-static wheel skates, zero shock transfer',
              weight: '400 kg – 1.8 Tons'
            },
            {
              category: 'Diagnostic & Lab Medical Scanners',
              icon: '🔬',
              specs: 'Micro-cushion slings, cleanroom air skates, calibrated handling',
              weight: '500 kg – 4 Tons'
            },
            {
              category: 'Commercial Printing Presses & Cutters',
              icon: '🖨️',
              specs: 'Modular section unbolting, steel skidding, roller balancing',
              weight: '1.2 Tons – 10 Tons'
            },
            {
              category: 'Plastic Injection Molding Machines',
              icon: '🏭',
              specs: 'Heavy flatbed trailer loading, hydraulic crane rigging, tie-down chains',
              weight: '3 Tons – 35 Tons'
            },
            {
              category: 'Bank Vaults & Commercial Heavy Safes',
              icon: '🔒',
              specs: 'Stair climber crawlers, floor load spreader plates, hydraulic jacks',
              weight: '300 kg – 3.5 Tons'
            },
            {
              category: 'Warehouse Pallet Racks & Conveyors',
              icon: '📦',
              specs: 'High-reach forklift destuffing, pallet truck stacking, rack placement',
              weight: '500 kg – 20 Tons'
            },
            {
              category: 'Solar Power Systems & Battery Banks',
              icon: '☀️',
              specs: 'Rooftop crane hoisting, acid-resistant handling, cell rack balance',
              weight: '500 kg – 5 Tons'
            },
            {
              category: 'High-Rise Luxury Furniture & Marble Tops',
              icon: '🛋️',
              specs: 'Balcony crane pulley hoisting, padded webbing belts, frame wrapping',
              weight: '150 kg – 800 kg'
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-2 hover:border-blue-400 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-bold font-mono text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded">
                  {item.weight}
                </span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {item.category}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {item.specs}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          14. CITY SWITCHER & NEIGHBORHOOD SERVICE HUBS
         ========================================================================= */}
      <section id="section-city-areas" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>14. Loading &amp; Unloading Hubs in {city}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Fast On-Demand Crew &amp; Equipment Dispatch Across {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Our specialized rigging crews, forklifts, and mobile cranes are staged near major industrial zones and commercial freight hubs.
          </p>
        </div>

        {/* Popular City Switcher */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Select Your City for Local Rigging &amp; Loading Teams:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_LOADING_CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onSelectCity && onSelectCity(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  city.toLowerCase() === c.toLowerCase()
                    ? 'bg-[#001261] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#001261]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Key Industrial &amp; Commercial Hubs Serviced in {city}:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {loadingAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          15. FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section id="section-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>15. Frequently Asked Questions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Everything You Need to Know About Loading &amp; Heavy Lifting in {city}
          </h3>
        </div>

        <div className="space-y-2.5">
          {[
            {
              q: `What kinds of heavy equipment and machinery can you load and unload in ${city}?`,
              a: `We handle a comprehensive range of heavy assets including CNC machines, industrial lathes, textile spinning looms, electrical transformers, diesel generators, air compressors, plastic injection molding equipment, server racks, bank vaults, commercial printing presses, and oversized luxury furniture.`
            },
            {
              q: `Do you provide certified forklift services with operators in ${city}?`,
              a: `Yes. We supply 1.5-ton to 5-ton counterbalanced diesel and electric forklifts, complete with commercially certified operators, fuel, and rigging accessories for container de-stuffing, pallet movement, and factory staging.`
            },
            {
              q: `Can you arrange mobile cranes for high-rise or rooftop lifting?`,
              a: `Absolutely. We deploy 10-ton to 50-ton+ telescopic and all-terrain mobile cranes equipped with outriggers, certified riggers, signalmen, and nylon slings for multi-story window hoisting, rooftop chiller placement, and transformer positioning.`
            },
            {
              q: `How do you protect fragile tile, marble, or epoxy factory floors during heavy machine moving?`,
              a: `Our crew lays down heavy-duty rubber runners, high-density polyethylene sheets, and steel load-spreader plates along the entire transit pathway. In addition, we utilize low-clearance 360-degree machine skates with polyurethane non-marking rollers to eliminate scratches and floor cracking.`
            },
            {
              q: `How much do loading and unloading services cost in ${city}?`,
              a: `Pricing begins at ₹2,499 for manual 2-person handling crews, ₹3,499 for hydraulic pallet trucks, ₹6,999 for forklift rentals with operators, and ₹16,999 for mobile cranes. Total costs depend on machine weight, dimensions, access route, lifting height, and site survey parameters.`
            },
            {
              q: `Can I hire your team for Loading-Only or Unloading-Only services?`,
              a: `Yes. You can book standalone Loading-Only services (to load and strap goods onto your transport vehicles) or Unloading-Only services (to receive, de-stuff, and position incoming freight anywhere in ${city}).`
            },
            {
              q: `Is a pre-move physical or digital site survey free?`,
              a: `Yes. We provide 100% free on-site or digital video surveys across ${city} to inspect machine dimensions, weight, pathway clearances, and lift points before issuing a fixed, binding quotation.`
            },
            {
              q: `Do you provide machinery unbolting and destination leveling?`,
              a: `Yes. Our mechanical rigging technicians assist with unbolting base anchors, hydraulic jacking onto moving skates, and precision alignment over foundation holes and anti-vibration pads at your new facility.`
            },
            {
              q: `Are our goods insured during the loading and hoisting process?`,
              a: `Yes. All commercial, industrial, and residential handling operations can be covered with transit and rigging risk insurance to safeguard against accidental handling shocks or unforeseen transit mishaps.`
            },
            {
              q: `How far in advance should I book forklift or crane services in ${city}?`,
              a: `For standard forklift and manual rigging crews, same-day or 24-hour advance booking is available. For heavy mobile cranes (25T+) or full factory shutdowns, we recommend scheduling 2 to 3 days in advance to conduct thorough site surveys and arrange road permits if necessary.`
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180 text-orange-500' : ''}`} />
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          16. 24/7 HEAVY EQUIPMENT HOTLINE & CONSULTATION CALLOUT
         ========================================================================= */}
      <section id="section-emergency-support" className="bg-gradient-to-r from-[#001261] via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-400/30 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            <Radio className="w-3 h-3 text-orange-400 animate-pulse" />
            <span>24/7 Industrial &amp; Rigging Hotline • {city}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-black text-white">
            Need Urgent Heavy Machinery Loading or Crane Deployment in {city}?
          </h4>
          <p className="text-xs text-blue-200 max-w-xl font-normal">
            Speak directly with our chief rigging engineers for immediate forklift dispatch, emergency plant breakdowns, or custom crane lift planning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="tel:+919876543210"
            id="loading-call-hotline-btn"
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 98765 43210</span>
          </a>
          <button
            type="button"
            onClick={onOpenEnquiry}
            id="loading-instant-survey-btn"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-blue-300" />
            <span>Request Site Survey</span>
          </button>
        </div>
      </section>

    </div>
  );
};
