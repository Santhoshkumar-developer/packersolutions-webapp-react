import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Box, 
  Boxes, 
  Layers, 
  Truck, 
  Home, 
  Building2, 
  HeartHandshake, 
  FileText, 
  ChevronDown, 
  ArrowRight, 
  Clock, 
  Star, 
  Users, 
  Calculator, 
  MapPin, 
  Check, 
  Award,
  Sparkle,
  Shield,
  Wrench,
  Zap,
  HelpCircle,
  Phone,
  ClipboardCheck,
  Warehouse,
  QrCode,
  Smartphone,
  Navigation,
  DollarSign,
  Palette,
  Table,
  HardDrive
} from 'lucide-react';
import { ServiceItem } from '../types';

interface PackingUnpackingServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

// Local service hubs helper for selected city
const getPackingServiceAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': ['Gandhipuram', 'Peelamedu', 'RS Puram', 'Singanallur', 'Saravanampatti', 'Thudiyalur', 'Vadavalli', 'Ramanathapuram', 'Kurichi', 'Kovaipudur', 'Ganapathy', 'Sulur'],
    'Bangalore': ['Indiranagar', 'Whitefield', 'Koramangala', 'HSR Layout', 'Electronic City', 'Jayanagar', 'Marathahalli', 'Bellandur', 'JP Nagar', 'Malleshwaram', 'Sarjapur Road', 'Hebbal'],
    'Chennai': ['Adyar', 'Velachery', 'Anna Nagar', 'Nungambakkam', 'T Nagar', 'Mylapore', 'Tambaram', 'OMR Karapakkam', 'Guindy', 'Porur', 'Mogappair', 'Sholinganallur'],
    'Mumbai': ['Andheri West', 'Bandra West', 'Powai', 'Borivali West', 'Goregaon East', 'Mulund West', 'Thane West', 'Vashi Navi Mumbai', 'Lower Parel', 'Kharghar', 'Chembur', 'Kalyan'],
    'Hyderabad': ['Gachibowli', 'Kondapur', 'Madhapur', 'Kukatpally', 'Jubilee Hills', 'Banjara Hills', 'Begumpet', 'Secunderabad', 'Miyapur', 'Hitech City', 'Manikonda', 'Uppal'],
    'Pune': ['Wakad', 'Koregaon Park', 'Kothrud', 'Hadapsar', 'Hinjewadi', 'Baner', 'Viman Nagar', 'Kharadi', 'Kalyani Nagar', 'Pimple Saudagar', 'Aundh', 'Chinchwad'],
    'Delhi': ['Dwarka', 'Saket', 'Vasant Kunj', 'Karol Bagh', 'Rajouri Garden', 'Connaught Place', 'Rohini', 'Janakpuri', 'Lajpat Nagar', 'South Ext', 'Greater Kailash', 'Pitampura'],
    'Ahmedabad': ['Satellite', 'Bopal', 'Chandkheda', 'Navrangpura', 'Paldi', 'Vastrapur', 'Naranpura', 'Gota', 'Thaltej', 'C.G. Road', 'Maninagar', 'Science City Road'],
    'Kolkata': ['Salt Lake', 'Rajarhat', 'New Town', 'Garia', 'Behala', 'Tollygunge', 'Jadavpur', 'Howrah', 'Dum Dum', 'Kasba', 'Park Street', 'Alipore'],
    'Kochi': ['Kakkanad Infopark', 'Edapally', 'Marine Drive', 'Palarivattom', 'Vyttila', 'Kaloor', 'MG Road', 'Aluva', 'Panampilly Nagar', 'Fort Kochi', 'Tripunithura', 'Kalamassery']
  };

  return areas[city] || [
    'Central Residential District',
    'High-Rise Apartment Complex',
    'Gated Villa Community',
    'Commercial Business Park',
    'IT Corridor Suburbs',
    'Industrial Logistics Zone',
    'Main Express Hub',
    'Metropolitan Ring Road'
  ];
};

const POPULAR_PACKING_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Kochi'
];

export const PackingUnpackingServiceContent: React.FC<PackingUnpackingServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const city = selectedCity || 'Coimbatore';
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const packingAreas = getPackingServiceAreas(city);

  return (
    <div className="space-y-12" id="packing-unpacking-details-view">
      
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
            Professional Packing Service in {city} – Zero Damage Guarantee
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Protect your precious household belongings, sensitive IT equipment, delicate chinaware, and high-value furniture with Packer Solutions&apos; certified packing and unpacking services in {city}. Using heavy-duty 5-ply cartons, multi-layer bubble cushioning, and custom wooden crating, we eliminate transit shock and moving stress.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether you require end-to-end full home packing and unpacking, specialized fragile item crating, or standalone unpacking assistance at your destination, our trained male and female packing crews deliver systematic, room-by-room precision.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="packing-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Packing Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="packing-hero-survey-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-blue-400" />
              <span>Book Free CFT Digital Survey</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEO HIGHLIGHTS / TARGET KEYWORDS BADGE GRID
         ========================================================================= */}
      <section id="section-seo-keywords" className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Verified Relocation &amp; Packaging Categories
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              packing service
            </h2>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              packing and moving companies
            </h2>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
            <Box className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              wooden box packing company
            </h2>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              professional packing service
            </h2>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center gap-2.5 sm:col-span-2 lg:col-span-2">
            <Award className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              best packing company in coimbatore
            </h2>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL PACKING & UNPACKING SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional Packing &amp; Unpacking Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Packing Service – End-to-End Packaging &amp; Unpacking Solutions in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Proper packaging is the foundation of a zero-damage move. Packer Solutions provides systematic, multi-layered packing methodologies customized for apartments, luxury villas, commercial IT hubs, and industrial establishments across {city}.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our packing specialists utilize specialized material grades for every category — from electrostatic bubble wrap for electronics to custom ISPM-15 wooden crates for marble statues, crystal chandeliers, and vintage heirlooms.
          </p>
        </div>

        {/* 7 Complete Service Process Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">5-Ply Heavy-Duty Carton Packing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              High crush-resistant corrugated cartons engineered for books, kitchenware, home decor, and general household items.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Fragile &amp; Crockery Multi-Layering</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Double bubble wrap, foam separators, and tissue cushioning for glassware, porcelain chinaware, and bone china.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Custom ISPM-15 Wooden Crating</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Custom-built pine wood and plywood crates with cross-braced internal cushioning for mirrors, marble tables &amp; TVs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Trained Women Packing Staff</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Professional female staff available on request for packing personal wardrobes, private linen, kitchenware, and valuables.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Room-Wise Barcode Tagging</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every box is numbered and labeled with color identifiers specifying room, floor, contents, and fragile status.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Organized Unpacking &amp; Shelf Setup</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cartons opened at destination and belongings arranged directly into modular kitchen shelves, closets, and desks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                <Sparkle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Debris, Scrap &amp; Box Clearance</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  After unpacking and room setup, our crew gathers, flattens, and removes all used cartons, bubble wrap remnants, tape scraps, and protective foam, leaving your new home pristine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS (FOR PACKING & UNPACKING)
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Packing and Moving Companies – The Gold Standard in Packaging &amp; Asset Protection in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered packaging materials, skilled packing technicians, and transparent volume-based pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Accurate Free CFT Digital Survey</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Calculate exact cubic feet volume before moving day so we dispatch the exact carton quantity, tape rolls, and crew sizing required.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Virgin 5-Ply &amp; Anti-Static Materials</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We never use recycled weak cartons. High-tensile 5-ply kraft boxes, 80-micron stretch film, and shock-resistant air bubbles guarantee safety.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Specialized Women Packing Staff</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Female packing technicians provide privacy, sensitivity, and comfort when handling wardrobes, vanity items, and delicate bedroom belongings.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Custom Wooden Crate Carpentry</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              On-demand custom wooden crating with foam-lined internal cradles for 65&quot;+ OLED TVs, chandeliers, paintings, and heavy marble tabletops.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Room &amp; Category Color Coding</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Color-coded stickers and numbered manifests ensure cartons are distributed directly to target bedrooms, kitchens, or office cubicles.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Itemized Pricing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No hidden material charges or surprise surcharges. You receive an all-inclusive estimate covering all materials, labor, and unpacking fees.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW PACKING & UNPACKING WORKS (9 STAGES)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How Packing &amp; Unpacking Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Packing &amp; Unpacking Process (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A structured 9-stage execution methodology engineered for safety, speed, and effortless room setup.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Free Digital Survey & Audit', desc: 'Pre-move digital video or physical survey assessing volume and calculating exact CFT space.' },
              { num: 2, title: 'Material Estimation & Plan', desc: 'Pre-allocating 5-ply cartons, bubble rolls, stretch wrap, edge guards, and tape quantities.' },
              { num: 3, title: 'Fragile & Artwork Audit', desc: 'Tagging crockery, electronics, antiques, and glass mirrors for custom cushioning or crating.' },
              { num: 4, title: 'Custom Wooden Crate Build', desc: 'Carpenters build custom timber crates for oversized, heavy, or ultra-valuable items.' },
              { num: 5, title: 'Room-Wise Multi-Layer Packing', desc: 'Packing crew wraps belongings systematically room by room (Kitchen, Bedrooms, Hall, Pooja).' },
              { num: 6, title: 'Box Labeling & Inventory List', desc: 'Every carton is sealed, numbered, and tagged with room barcodes and itemized digital lists.' },
              { num: 7, title: 'Safe Staged Transit Stacking', desc: 'Cartons are safely cushioned and staged for vehicle loading with bottom-heavy weight balancing.' },
              { num: 8, title: 'Organized Unpacking at Destination', desc: 'Crew opens cartons and places kitchen utensils, wardrobes, books, and items in respective rooms.' },
              { num: 9, title: 'Debris Collection & Site Cleanup', desc: 'All empty cartons, bubble sheets, and tape waste are collected and removed from your premises.' }
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
          5. SPECIALIZED PACKING MATERIALS
         ========================================================================= */}
      <section id="section-premium-packing" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Specialized Packing Materials</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Multi-Layer Protection for Every Category of Belonging
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We use premium virgin packaging materials engineered to absorb impact, resist moisture, and prevent friction scratches during transit in {city}.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our material inventory includes 3-ply and 5-ply corrugated cartons, anti-static multi-layer bubble wrap, 80-micron stretch film wrap, high-density edge guards, and reinforced cross-filament packing tapes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">📦</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">5-Ply Kraft Cartons</h4>
            <p className="text-[10px] text-slate-400 leading-tight">High crush resistance for books, crockery &amp; kitchenware</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🫧</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Heavy Bubble Wrap</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Shock-absorbing air cushions for glass, chinaware &amp; TVs</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🛡️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Edge Guards &amp; Foam</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Corner protectors for wooden dining tables &amp; glass tops</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🏷️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Room Color Barcodes</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Color-coded tags for effortless bedroom &amp; kitchen allocation</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WOMEN PACKING TEAM SPOTLIGHT
         ========================================================================= */}
      <section id="section-women-packing-team" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-pink-600" />
            <span>6. Dedicated Women Packing Staff</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-pink-600 dark:bg-pink-500 rounded-full" />
            Trained Female Crew for Privacy &amp; Delicate Belongings
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              We understand that packing private wardrobes, personal vanity items, delicate fine china, and valuable bedroom linen requires utmost comfort and discretion. Packer Solutions provides trained, certified women packing professionals on request for residential shifting in {city}.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Wardrobe &amp; Clothing Folding</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Kitchen Utensil &amp; Spice Packing</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Personal Vanity &amp; Jewelry Boxes</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. WOODEN CRATE MANUFACTURING SPOTLIGHT
         ========================================================================= */}
      <section id="section-wooden-crating" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Box className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Custom Wooden Crating</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Wooden Box Packing Company – Custom Crate Manufacturing &amp; Packaging
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Boxes className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Standard cartons are not enough for fragile, heavy, or irreplaceable high-value items. Our in-house carpentry technicians construct tailor-made ISPM-15 heat-treated wooden crates and timber skids with foam internal linings for glass chandeliers, marble tables, idols, and precision machinery.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Custom 12mm–25mm Wood Crating</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Foam-Padded Internal Cradle</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Cross-Braced Shock Damping</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. UNPACKING & ROOM SETUP SPOTLIGHT
         ========================================================================= */}
      <section id="section-unpacking-placement" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Unpacking &amp; Room Arrangement</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Complete Unpacking &amp; Systematic Shelf Setup
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
            <Home className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Moving into a new home shouldn&apos;t mean living around sealed boxes for weeks. Our unpacking specialists open every carton according to the room inventory, organize crockery into kitchen cabinets, hang clothing in wardrobes, position decorative items, and dispose of all debris.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Kitchen Counter &amp; Shelf Layout</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Wardrobe &amp; Linen Arrangement</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Total Waste &amp; Box Disposal</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. PACKING & UNPACKING SERVICE MODELS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-shifting-options" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Packing Service Models</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Tailored Packing &amp; Unpacking Service Packages
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose the exact level of packing assistance that matches your timeline, budget, and relocation preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Home Packing & Unpacking */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Complete 360° Turnkey
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Full Home Packing &amp; Unpacking</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              End-to-end full service: our team brings all 5-ply cartons, bubble wrap, packs every room, loads, transports, and unpacks into designated shelves at your destination in <strong>{city}</strong>.
            </p>
          </div>

          {/* Packing-Only Service */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Professional Packing Only
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Packing-Only Service</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Ideal for customers handling their own vehicle transit or moving abroad. Our packing crew wraps and packages all items safely into numbered boxes ready for transport.
            </p>
          </div>

          {/* Unpacking-Only Service */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono">
                Destination Help
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Unpacking &amp; Organization Only</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Already moved your goods to <strong>{city}</strong>? Hire our crew to unpack sealed cartons, place items into modular wardrobes and kitchens, and clear away all trash.
            </p>
          </div>

          {/* Fragile & Custom Wooden Crating */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded font-mono">
                Custom Timber Crate
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Fragile &amp; Custom Wooden Crating</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Dedicated carpenter support for heavy stone idols, large OLED TVs, glass dining table tops, canvas art, sensitive laboratory equipment, and industrial motors.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. DOMESTIC & LONG DISTANCE PACKAGING
         ========================================================================= */}
      <section id="section-domestic-shifting" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Long-Distance Packing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Heavy-Duty Intercity &amp; Interstate Packaging Standards
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Long-distance highway transit involves constant road vibrations, moisture fluctuations, and multiple handling checkpoints. Our intercity packing protocol integrates moisture-proof plastic wrapping, silica gel desiccant packs, and heavy-duty corrugated board cushioning.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Every shipment dispatched for pan-India transit is covered by comprehensive transit risk insurance and documented with a numbered digital inventory docket.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Moisture Barrier Wrap</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Silica Gel Packs</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Corner Impact Guards</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Numbered Manifest</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. STARTING PRICE / RATE CHART
         ========================================================================= */}
      <section id="section-rate-chart" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Starting Price / Rate Chart</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Packing &amp; Unpacking Charges Matrix ({city})
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Transparent pricing based on home configuration, cubic feet volume (CFT), specialized materials, and unpacking requirements in {city}.
          </p>
        </div>

        {/* Pricing Matrix Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001261] text-white text-[11px] font-mono uppercase tracking-wider">
                  <th className="px-4 py-3 rounded-l-xl">Home / Office Size</th>
                  <th className="px-4 py-3">Approx Volume</th>
                  <th className="px-4 py-3">Packing Only</th>
                  <th className="px-4 py-3">Packing + Unpacking</th>
                  <th className="px-4 py-3 rounded-r-xl">Key Materials Included</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">1 RK / Studio Apartment</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">80 – 120 CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹2,499 – ₹3,499</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹4,499 – ₹5,999</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">10-15 Cartons, Bubble roll, Stretch wrap</td>
                </tr>
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">1 BHK Standard Home</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">150 – 220 CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹3,999 – ₹5,499</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹6,999 – ₹8,999</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">20-25 5-Ply Boxes, Crockery foam, Tape</td>
                </tr>
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">2 BHK Family House / Flat</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">250 – 380 CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹5,999 – ₹8,499</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹9,999 – ₹13,499</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">35-45 Boxes, Edge guards, Double bubble</td>
                </tr>
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">3 BHK Premium Apartment</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">400 – 600 CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹8,499 – ₹12,999</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹14,999 – ₹19,999</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">55-70 Boxes, Custom TV case, Kitchen kit</td>
                </tr>
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">4+ BHK / Luxury Villa</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">650 – 1000+ CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹13,999 – ₹22,999</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹22,999 – ₹34,999</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">80+ Boxes, Wooden crating, Female crew</td>
                </tr>
                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">Office / Commercial (10-30 Desks)</td>
                  <td className="px-4 py-3.5 font-mono text-slate-900 dark:text-slate-100">300 – 700 CFT</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹7,999 – ₹16,999</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">₹13,999 – ₹26,999</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-900 dark:text-slate-200">Anti-static IT wrap, Archive boxes, Labels</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 dark:text-slate-300 text-center sm:text-left">
              * Exact rates determined following our <strong>Free Digital CFT Survey</strong>. All rates inclusive of heavy-duty materials, packing manpower, and GST invoices.
            </span>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-[#001261] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 cursor-pointer"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. ITEMS WE PACK & UNPACK (12 CATEGORIES)
         ========================================================================= */}
      <section id="section-inventory-items" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
            <span>12. Inventory Items We Pack</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Categorized Items Handled with Specialized Packing
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every category of item receives custom-selected protection and designated room-wise labeling.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {[
            { name: 'Kitchen & Crockery', icon: Package, desc: 'Dinner sets, glassware, spices & cookware in 5-ply cartons' },
            { name: 'Wardrobes & Linens', icon: Users, desc: 'Clothes folded or boxed in dust-proof wardrobe cartons' },
            { name: 'Smart TVs & Monitors', icon: HardDrive, desc: 'Foam corner guards, bubble wrap & wooden crating' },
            { name: 'Heavy Sofas & Recliners', icon: Home, desc: 'Multi-layer stretch wrap, moving blankets & edge pads' },
            { name: 'Refrigerators & Washers', icon: Box, desc: 'Drain lines secured, drum locked & exterior corrugated wrap' },
            { name: 'Books & Legal Dockets', icon: FileText, desc: 'Heavy-duty book cartons with reinforced tape bottoms' },
            { name: 'Idols & Marble Artworks', icon: Shield, desc: 'Foam-cradled pine wooden crates with zero-shock bracing' },
            { name: 'Office Desks & Cubicles', icon: Building2, desc: 'Dismantled modular panels, screws bagged & labeled' },
            { name: 'Computers & IT Hardware', icon: Zap, desc: 'ESD anti-static wraps, numbered cables & peripheral kits' },
            { name: 'Industrial Tools & Pumps', icon: Truck, desc: 'Timber skid mounting, shrink wrapping & weather tarps' },
            { name: 'Gym & Sports Gear', icon: Award, desc: 'Treadmills, weight plates & bikes cushioned and strapped' },
            { name: 'Potted Plants & Garden', icon: Sparkle, desc: 'Breathable plant crates for safe local transit' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-1.5 hover:border-blue-400 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          13. POPULAR CITIES & SERVICE AREAS
         ========================================================================= */}
      <section id="section-popular-cities" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>13. Service Network &amp; Locations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Best Packing Company in Coimbatore &amp; Pan-India Service Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select a city to view local residential neighborhoods and commercial zones serviced by our packing crews.
          </p>
        </div>

        {/* City Selector Badges */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_PACKING_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onSelectCity?.(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                city.toLowerCase() === c.toLowerCase()
                  ? 'bg-[#001261] text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Local Areas in Selected City */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Popular Neighborhoods &amp; Suburbs Serviced in {city}:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {packingAreas.map((area, idx) => (
              <div 
                key={idx}
                className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. FREQUENTLY ASKED QUESTIONS (FAQ)
         ========================================================================= */}
      <section id="section-faqs" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>14. FAQ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Frequently Asked Questions – Packing &amp; Unpacking in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about packing materials, CFT volume calculation, female staff, and crating.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'What is included in your Packing and Unpacking Services?',
              a: 'Our full service includes high-quality 5-ply cartons, multi-layer bubble wrap, stretch films, packing tape, room-wise labeling, safe loading, transportation, complete unpacking into destination cabinets/shelves, and 100% packing waste removal.'
            },
            {
              q: `How is the packing cost calculated in ${city}?`,
              a: `Packing charges depend on your total shipment volume in CFT (Cubic Feet), the number of 5-ply cartons needed, the proportion of fragile chinaware/glass, wooden crate fabrication, and whether unpacking is required. Small loads start from ₹2,499.`
            },
            {
              q: 'Can I book only unpacking services if I already shifted my goods?',
              a: 'Yes! If you have already transported your packed boxes to your new residence or commercial premises in ' + city + ', you can hire our trained unpacking crew to unbox, organize items into wardrobes/shelves, and haul away the empty cartons.'
            },
            {
              q: 'Do you provide women packing staff for residential home shifting?',
              a: 'Yes. Upon request, we deploy certified female packing professionals to pack personal wardrobes, private linen, kitchen utensils, vanity belongings, and valuable heirlooms with complete privacy and care.'
            },
            {
              q: 'What is custom wooden crating and when is it necessary?',
              a: 'Wooden crating involves custom-building heavy timber boxes with internal foam shock absorbers for oversized, heavy, or fragile items like 65"+ OLED TVs, glass dining tops, marble temple idols, chandeliers, and precision machines.'
            },
            {
              q: 'What is CFT and how is it calculated during the Free Survey?',
              a: 'CFT stands for Cubic Feet (Length × Width × Height in feet). Our relocation specialists conduct a quick digital or physical survey to measure total furniture and box volume to determine the exact packing materials and crew size needed.'
            },
            {
              q: 'Do I need to clean or sort my items before the packing team arrives?',
              a: 'We recommend separating personal confidential documents, expensive jewelry, daily medications, and keys into a personal bag. Our team takes care of wrapping and boxing everything else.'
            },
            {
              q: 'What happens to the discarded cartons and packing waste after unpacking?',
              a: 'Our crew systematically flattens all empty cardboard boxes, bundles bubble plastic and tape scraps, and removes 100% of the packing debris from your premises.'
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 text-xs font-mono">
                  {expandedFaq === idx ? '−' : '+'}
                </span>
              </button>
              {expandedFaq === idx && (
                <div className="px-4.5 pb-4.5 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          16. FINAL CALLOUT / HELPLINE BANNER
         ========================================================================= */}
      <section className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 border border-blue-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 inline-block">
            24/7 Packing &amp; Unpacking Helpline
          </span>
          <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white">
            Need Expert Packing Assistance in {city}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
            Speak directly with our packaging specialists for free CFT volume estimates, wooden crate specifications, and female packing crew availability.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3 relative z-10">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Packing Service Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="tel:+919876543210"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call +91 98765 43210</span>
          </a>
        </div>
      </section>

    </div>
  );
};
