import React, { useState } from 'react';
import { 
  Warehouse, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Layers, 
  Boxes, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Shield, 
  Scale, 
  Home, 
  Briefcase, 
  ShoppingBag, 
  Truck,
  Sparkles,
  Check,
  CheckCircle2,
  Calendar,
  Sparkle,
  Calculator,
  RefreshCw,
  FileCheck,
  Users,
  PackageCheck,
  ArrowRight,
  ClipboardCheck,
  Phone,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { ServiceItem } from '../types';

interface WarehousingServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

export const WarehousingServiceContent: React.FC<WarehousingServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const city = selectedCity || 'Coimbatore';

  const HOUSEHOLD_SUITABLE_FOR = [
    'Waiting for possession of a new home',
    'Temporary relocation',
    'Moving to another city',
    'Overseas relocation',
    'Home renovation',
    'Moving between rental properties',
    'Student and employee transfers',
    'Seasonal household items',
    'Furniture and appliances',
    'Pooja and festival items',
    'Travel equipment',
    'Personal collections and household belongings'
  ];

  const FURNITURE_ITEMS = [
    'Sofas & Couches',
    'Beds & Mattresses',
    'Dining Tables & Chairs',
    'Wardrobes & Almirahs',
    'Office Tables & Desks',
    'Modular Workstations',
    'Cabinets & Drawers',
    'Storage Racks & Shelves',
    'Household Appliances (Fridge, TV, Washing Machine)',
    'Executive Chairs & Seating'
  ];

  const CORPORATE_SOLUTIONS = [
    { title: 'Commercial Inventory Storage', desc: 'Secure palletized space for business inventory and finished products.' },
    { title: 'Office Furniture Storage', desc: 'Protected storage for desks, workstations, chairs, and filing units.' },
    { title: 'Machinery & Equipment Storage', desc: 'Heavy-duty ground storage for precision industrial tools and spare units.' },
    { title: 'Retail Inventory Storage', desc: 'Buffer stock storage for retail chains, distributors, and shop owners.' },
    { title: 'Excess Inventory Storage', desc: 'Flexible overflow capacity during high-demand and peak festive seasons.' },
    { title: 'Business Relocation Storage', desc: 'Bridge storage during corporate office transition and fit-outs.' },
    { title: 'Temporary Project Storage', desc: 'Short-term staging area for ongoing engineering and civil projects.' },
    { title: 'Industrial Goods Storage', desc: 'Organized racking and pallet storage for commercial industrial lots.' },
    { title: 'Distribution Support', desc: 'Cross-docking and distribution staging for regional fulfillment.' },
    { title: 'Logistics Inventory Management', desc: 'Systematic batch tracking, SKU logging, and dispatch scheduling.' }
  ];

  const COMMERCIAL_WHO_CAN_USE = [
    'Retailers & Wholesalers',
    'Manufacturers & Producers',
    'Distributors & Stockists',
    'E-commerce & D2C Brands',
    'Production & Industrial Units',
    'Logistics & Freight Companies',
    'Small and Medium-Sized Enterprises (SMEs)',
    'Corporate Offices & Startups'
  ];

  const COMMERCIAL_NEED_REASONS = [
    'Temporary inventory storage',
    'Additional buffer stock space',
    'Seasonal inventory fluctuations',
    'Raw material and production stock',
    'Finished goods warehousing',
    'Project-based equipment storage',
    'Office relocation & remodeling',
    'Logistics stock management'
  ];

  const LOGISTICS_STORAGE_POINTS = [
    'Warehouse Receiving & Inspection',
    'Secure Inventory Racking & Storage',
    'Skilled Material Handling',
    'Professional Loading & Unloading',
    'Dispatch Preparation & Palletizing',
    'Delivery Coordination & Staging',
    'Commercial Goods Storage',
    'Temporary Logistics Staging',
    'Part-Load Shipment Consolidation',
    'Transportation Fleet Coordination'
  ];

  const TWELVE_STEPS = [
    { step: '01', title: 'Storage Assessment', desc: 'Detailed evaluation of your goods, volume, and storage duration requirements.' },
    { step: '02', title: 'CFT / Space Calculation', desc: 'Accurate Cubic Feet (CFT) and square footage measurement for transparent pricing.' },
    { step: '03', title: 'Packing & Protection', desc: 'Industrial multi-layer wrapping, bubble wrap, and 5-ply carton box packing.' },
    { step: '04', title: 'Item Labelling', desc: 'Unique barcode and color-coded labels applied to every individual item.' },
    { step: '05', title: 'Digital Inventory Preparation', desc: 'Comprehensive digital itemized manifest created and shared with the client.' },
    { step: '06', title: 'Loading & Unloading', desc: 'Safe mechanized loading with pallet jacks, trolleys, and trained crews.' },
    { step: '07', title: 'Warehouse Entry Documentation', desc: 'Formal inward gate entry verification, condition check, and security logging.' },
    { step: '08', title: 'Stack Allocation', desc: 'Designated wooden pallet, bay, and racking allocation in temperature-safe zones.' },
    { step: '09', title: 'Inventory Management', desc: 'Systematic software-indexed stack tracking for effortless future retrieval.' },
    { step: '10', title: 'Storage & Periodic Monitoring', desc: '24/7 CCTV surveillance, weekly pest control, and humidity checks.' },
    { step: '11', title: 'Delivery Scheduling', desc: 'Flexible handover scheduling on demand with 24-48 hours advance notice.' },
    { step: '12', title: 'Safe Dispatch & Delivery', desc: 'Careful retrieval, outbound transport, doorstep delivery, and setup.' }
  ];

  const COMPLETE_RELOCATION_SUPPORT = [
    { title: 'Packing', desc: 'High-grade protective wrapping of all items' },
    { title: 'Labelling', desc: 'Systematic numbering and room categorization' },
    { title: 'Furniture Dismantling', desc: 'Careful breakdown of modular beds and tables' },
    { title: 'Loading', desc: 'Heavy lifters using dollies and ramps' },
    { title: 'Transportation', desc: 'Dedicated closed container vehicles' },
    { title: 'Warehouse Storage', desc: 'Clean, elevated pallet storage bays' },
    { title: 'Inventory Management', desc: 'Digital receipt and photo records' },
    { title: 'Unloading', desc: 'Safe offloading at the warehouse facility' },
    { title: 'Repacking', desc: 'Optional re-wrapping before final delivery' },
    { title: 'Final Delivery', desc: 'Doorstep handover and room placement' }
  ];

  const PERIODIC_MAINTENANCE_POINTS = [
    'Periodic inspection of stored goods and carton seals',
    'Dust cleaning of cartons, wooden furniture, and appliances',
    'Replacement of worn or damaged protective wrapping',
    'Repacking of selected items when required',
    'Inventory verification and stock reconciliation',
    'Moisture and condition checking across pallets'
  ];

  const HOUSEHOLD_RATES = [
    { volume: 'Up to 100 CFT', rate: '₹1,800', badge: 'Ideal for cartons & small luggage' },
    { volume: '200 CFT – Approx. 1 BHK', rate: '₹3,600', badge: '1 BHK Essential Household' },
    { volume: '300 CFT', rate: '₹5,400', badge: '2 BHK Compact Household' },
    { volume: '400 CFT', rate: '₹7,200', badge: '2-3 BHK Standard Household' },
    { volume: '500 CFT', rate: '₹9,000', badge: '3 BHK Full Home Furniture' },
    { volume: 'Above 500 CFT', rate: 'Custom Quote', badge: 'Villas & Large Inventories' }
  ];

  const STORAGE_DURATION_PLANS = [
    { duration: '1 Week', suitableFor: 'Temporary Storage / Bridge Move', pricing: 'Based on Volume' },
    { duration: '15 Days', suitableFor: 'Transit Storage & Quick Relocation', pricing: 'Based on Volume' },
    { duration: '1 Month', suitableFor: 'Home Relocation & Painting', pricing: 'Based on Volume' },
    { duration: '3 Months', suitableFor: 'Renovation / Overseas Travel', pricing: 'Custom Quote' },
    { duration: '6 Months', suitableFor: 'Long-Term Storage', pricing: 'Discount Available' },
    { duration: '12 Months', suitableFor: 'Annual Storage', pricing: 'Special Discount' }
  ];

  const CORPORATE_RATES = [
    { requirement: 'Per Sq. Ft.', service: 'Loading, Unloading, Handling & Storage', charge: '₹120 / Sq. Ft.' },
    { requirement: 'Corporate Inventory', service: 'Stack Management & Dispatch', charge: 'Custom Quote' },
    { requirement: 'Distribution Storage', service: 'Warehouse Handling & Cross-Docking', charge: 'Custom Quote' },
    { requirement: 'Logistics Inventory', service: 'Storage & Delivery Management', charge: 'Custom Quote' }
  ];

  const WHY_CHOOSE_POINTS = [
    `Professional Warehouse Storage Services in ${city}`,
    'Household and furniture storage specialists',
    'Corporate warehouse and palletized inventory solutions',
    'Commercial inventory and e-commerce stock staging',
    'Integrated logistics and closed-container transportation',
    'Flexible short-term and long-term storage plans',
    'Digital inventory records with itemized condition manifests',
    'Organized warehouse handling with pallet racking systems',
    'High-grade packing and barcode labelling support',
    'Mechanized loading and unloading equipment',
    'Dedicated inventory and stack management',
    'Optional 45-day cleaning and repacking maintenance',
    'Doorstep pickup and return delivery support across Tamil Nadu',
    '100% Transparent upfront quotations (No hidden costs)',
    'Competitive household storage from ₹18 per CFT/month',
    'Corporate storage from ₹120 per Sq. Ft.',
    'Tailored customized storage plans for commercial enterprises'
  ];

  const TARGET_AUDIENCE = [
    { title: 'Individuals & Families', desc: 'Storing household furniture during home renovation, construction, or transitions.' },
    { title: 'Students & Employees', desc: 'Safe safekeeping of books, luggage, and personal goods during transfers or vacations.' },
    { title: 'Homeowners & Tenants', desc: 'Bridge storage while waiting for interior work, painting, or property handover.' },
    { title: 'NRIs & Overseas Travelers', desc: 'Secure multi-month or annual storage for entire apartment belongings.' },
    { title: 'Retail Businesses & Shops', desc: 'Extra storage capacity for seasonal inventory, FMCG goods, and festive stock.' },
    { title: 'Manufacturers & Wholesalers', desc: 'Safe holding space for raw materials, machinery spares, and finished cartons.' },
    { title: 'Distributors & Stockists', desc: 'Regional distribution hub with systematic inventory indexing and dispatch.' },
    { title: 'E-commerce Businesses', desc: 'Order consolidation, packing support, and fast dispatch coordination.' },
    { title: 'Corporate Offices', desc: 'Secure archive of modular desks, server racks, IT spares, and office files.' },
    { title: 'Logistics Companies', desc: 'Part-load staging, transit holding, and commercial cross-docking.' }
  ];

  const FAQS = [
    {
      q: `What items can I store in a warehouse in ${city}?`,
      a: `You can store household furniture, appliances, cartons, office equipment, commercial inventory, retail stock, machinery, documents, personal collections, and other eligible non-hazardous goods based on warehouse policies.`
    },
    {
      q: `How are warehouse storage charges calculated?`,
      a: `Storage charges are calculated transparently based on the physical volume in Cubic Feet (CFT) or square footage occupied, type of goods, storage duration, handling requirements, packing support, and optional transportation.`
    },
    {
      q: `Can I store household goods for several months?`,
      a: `Yes. Packer Solutions offers flexible short-term (weekly/monthly) and long-term (multi-month or annual) household storage solutions tailored to your timeline with applicable long-term discounts.`
    },
    {
      q: `Do you provide packing before warehouse storage?`,
      a: `Yes. Complete packing and labelling can be arranged before moving items into storage, utilizing 5-ply cartons, bubble wrap, corrugated sheets, and industrial stretch film.`
    },
    {
      q: `Can you pick up my goods and transport them to the warehouse?`,
      a: `Yes. Customers can combine packing, loading, transportation, warehouse storage, and return delivery as part of a complete end-to-end relocation and storage solution.`
    },
    {
      q: `Do you provide corporate inventory storage?`,
      a: `Yes. We provide dedicated corporate and commercial warehouse storage for office equipment, inventory, machinery, retail stock, project materials, and business goods.`
    },
    {
      q: `Do you provide cleaning or repacking for long-term storage?`,
      a: `Yes. An optional 45-day cleaning and repacking maintenance service can be arranged for customers requiring periodic inspection, dusting, and condition verification.`
    },
    {
      q: `How can I get a warehouse storage quotation?`,
      a: `Contact Packer Solutions with details such as the type and quantity of goods, approximate volume, pickup location in ${city}, storage duration, and delivery requirements. Our team will perform a free assessment and provide a customized quote.`
    }
  ];

  return (
    <div id="warehousing-details-view" className="space-y-12 text-left">
      
      {/* =========================================================================
          1. HERO SUMMARY & LOCATION BANNER
         ========================================================================= */}
      <section id="warehousing-hero-overview" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <Warehouse className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Warehouse &amp; Storage Solutions • {city}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                Warehouse Storage Services in {city} – Secure &amp; Affordable Storage Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal mt-2">
                Looking for reliable <strong>Warehouse Storage Services in {city}</strong>? Packer Solutions provides secure, pest-controlled, and professionally managed warehousing and storage solutions for households, businesses, corporate customers, retailers, and logistics companies.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 text-white px-4 py-2.5 rounded-2xl border border-white/15 shadow-xs text-xs font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>24/7 CCTV &amp; Pest-Controlled</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            We offer flexible short-term and long-term storage for household goods, furniture, office equipment, commercial inventory, machinery, cartons, and other goods. Our services can also be seamlessly combined with packing, loading, transportation, inventory management, and return delivery for a complete turnkey storage solution.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether you are moving to a new home, waiting for property possession, renovating your house, relocating overseas, shifting your office, or managing excess business inventory, Packer Solutions provides a customized storage solution tailored to your exact requirements.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="warehouse-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Storage Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="warehouse-hero-survey-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Calculate Storage Space</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOUSEHOLD STORAGE SERVICES
         ========================================================================= */}
      <section id="household-storage" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Residential Household Storage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 capitalize">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            rent storage space in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Suitable for customers who need additional space to safely store household belongings for a few weeks, months, or longer.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#001261] dark:text-blue-400" />
            <span>Suitable For:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {HOUSEHOLD_SUITABLE_FOR.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-800/80 p-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
            Before storage, our team can conduct a <strong>storage assessment</strong>, calculate the approximate <strong>CFT (Cubic Feet)</strong> requirement, prepare an inventory, label the items, and allocate suitable warehouse space.
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FURNITURE STORAGE SERVICES
         ========================================================================= */}
      <section id="furniture-storage" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Boxes className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>3. Furniture &amp; Appliances Storage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 capitalize">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            storage for rent in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Need a safe place to store furniture during relocation or renovation? Packer Solutions provides secure furniture storage for residential and commercial customers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#001261] dark:text-blue-400" />
            <span>Items We Store &amp; Protect:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FURNITURE_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1.5 hover:border-blue-400 transition-colors"
              >
                <Boxes className="w-4 h-4 text-[#001261] dark:text-blue-400" />
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 font-normal leading-relaxed">
            * Furniture can be professionally packed and protected with high-grade stretch film, corrugated sheets, and bubble wrap before storage to minimize exposure to dust, handling, and transportation-related damage.
          </p>
        </div>
      </section>

      {/* =========================================================================
          4. CORPORATE WAREHOUSE STORAGE
         ========================================================================= */}
      <section id="corporate-storage" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>4. Enterprise &amp; Commercial Warehousing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Corporate Warehouse Storage in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Designed for businesses that require organized storage and systematic inventory handling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {CORPORATE_SOLUTIONS.map((sol, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#001261] dark:text-blue-400 shrink-0" />
                <span>{sol.title}</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                {sol.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <p>
            <strong>Inventory Management Workflow:</strong> Goods received at the warehouse are documented, labelled, allocated to designated storage areas, and recorded using inventory management procedures.
          </p>
          <p>
            When goods need to be dispatched, our team can retrieve the required inventory, prepare the dispatch documentation, arrange loading, and coordinate delivery.
          </p>
        </div>
      </section>

      {/* =========================================================================
          5. COMMERCIAL WAREHOUSE STORAGE
         ========================================================================= */}
      <section id="commercial-warehouse" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>5. B2B &amp; Retail Warehousing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 capitalize">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            commercial storage units in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Customized storage plans according to storage volume, type of goods, handling requirements, and storage duration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#001261] dark:text-blue-400" />
              <span>Suitable For:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {COMMERCIAL_WHO_CAN_USE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                  <Check className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#001261] dark:text-blue-400" />
              <span>When Businesses Need Storage:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {COMMERCIAL_NEED_REASONS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. LOGISTICS STORAGE SERVICES
         ========================================================================= */}
      <section id="logistics-storage" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>6. Integrated Transportation &amp; Staging</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Logistics Storage Services in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Packer Solutions provides Logistics Storage Services for businesses requiring both storage and transportation support.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {LOGISTICS_STORAGE_POINTS.map((pt, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2"
              >
                <Truck className="w-3.5 h-3.5 text-[#001261] dark:text-blue-400 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
            Businesses can combine warehouse storage with transportation services for efficient movement of goods from the pickup location to the warehouse and from the warehouse to the final destination.
          </p>
        </div>
      </section>

      {/* =========================================================================
          7. 12-STEP WAREHOUSE HANDLING PROCESS
         ========================================================================= */}
      <section id="warehouse-handling-process" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>7. Structured Handling Workflow</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Professional 12-Step Warehouse Handling Process
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            We follow a structured process to improve inventory visibility and simplify storage management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {TWELVE_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5 relative overflow-hidden hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#001261] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 px-2.5 py-1 rounded-lg">
                  Step {step.step}
                </span>
              </div>

              <h4 className="font-semibold text-sm text-slate-900 dark:text-white pt-1">
                {step.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. COMPLETE RELOCATION & CLEANING SERVICE
         ========================================================================= */}
      <section id="relocation-and-maintenance" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* End-to-End Relocation Support */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#001261] dark:text-blue-400">
                END-TO-END SUPPORT
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Warehouse Storage with Packing &amp; Transportation
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Customers who require end-to-end relocation support can combine Warehouse Storage Services in {city} with our packing and transportation services.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {COMPLETE_RELOCATION_SUPPORT.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 italic">
            * Particularly useful for temporary relocation, property renovation, overseas travel, or waiting for new home possession.
          </p>
        </div>

        {/* 45-Day Periodic Maintenance */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                OPTIONAL LONG-TERM CARE
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Warehouse Cleaning &amp; Repacking Service
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              For long-term storage requirements, Packer Solutions provides an optional 45-day cleaning and repacking maintenance service.
            </p>

            <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {PERIODIC_MAINTENANCE_POINTS.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50/70 dark:bg-blue-950/40 rounded-xl p-3 text-[11px] text-blue-950 dark:text-blue-300 font-medium border border-blue-200/60 dark:border-blue-800/60">
            A 45-day periodic maintenance option can be considered for customers requiring additional care for long-term household or commercial storage.
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. HOUSEHOLD STORAGE RATE CHART (TABLE 1)
         ========================================================================= */}
      <section id="household-rate-chart" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>9. Transparent Household Tariff</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Household Storage Rate Chart in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Household Storage Rate: <strong>₹18 per CFT per month</strong>. Final pricing may vary based on storage requirements, handling, transportation, and packing.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Storage Volume</th>
                  <th className="px-5 py-3.5">Monthly Storage Rate</th>
                  <th className="px-5 py-3.5">Recommended Space Suitability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {HOUSEHOLD_RATES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-slate-100">
                      {row.volume}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#001261] dark:text-blue-400 font-mono">
                      {row.rate}
                    </td>
                    <td className="px-5 py-4 font-normal text-slate-600 dark:text-slate-300">
                      {row.badge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          * A quotation may include: Pickup charges, Packing charges, Loading and unloading, Warehouse handling, Storage charges, Return delivery charges, Cleaning/repacking charges, and Optional insurance.
        </p>
      </section>

      {/* =========================================================================
          10. SHORT-TERM & LONG-TERM STORAGE PLANS (TABLE 2)
         ========================================================================= */}
      <section id="duration-plans" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>10. Flexible Storage Tenure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 capitalize">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            self storage in {city}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Select the storage duration that matches your transition schedule. Customers requiring annual storage can request long-term discounts.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Storage Duration</th>
                  <th className="px-5 py-3.5">Suitable For</th>
                  <th className="px-5 py-3.5">Pricing Structure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {STORAGE_DURATION_PLANS.map((plan, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                      {plan.duration}
                    </td>
                    <td className="px-5 py-3.5 font-normal text-slate-600 dark:text-slate-300">
                      {plan.suitableFor}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-medium text-[#001261] dark:text-blue-400">
                      {plan.pricing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. CORPORATE WAREHOUSE HANDLING CHARGES (TABLE 3)
         ========================================================================= */}
      <section id="corporate-rates-table" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>11. Enterprise Commercial Tariff</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Corporate Warehouse Handling Charges in {city}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Corporate pricing may vary depending on inventory volume, storage duration, handling requirements, and service scope.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Storage Requirement</th>
                  <th className="px-5 py-3.5">Service Included</th>
                  <th className="px-5 py-3.5">Starting Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {CORPORATE_RATES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                      {row.requirement}
                    </td>
                    <td className="px-5 py-3.5 font-normal text-slate-600 dark:text-slate-300">
                      {row.service}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-[#001261] dark:text-blue-400">
                      {row.charge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. WHY CHOOSE PACKER SOLUTIONS (14 POINTS)
         ========================================================================= */}
      <section id="why-choose-warehouse" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>12. Verified Storage Advantages</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Why Choose Packer Solutions for Warehouse Storage?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Trusted by homeowners, corporates, and logistics managers across {city}.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WHY_CHOOSE_POINTS.map((pt, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. WHO CAN USE OUR SERVICES (10 SEGMENTS)
         ========================================================================= */}
      <section id="who-can-use" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>13. Target Clients &amp; Use Cases</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Who Can Use Our Warehouse Storage Services?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Tailored storage solutions designed for personal, residential, and corporate stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {TARGET_AUDIENCE.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-1.5 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          14. FREQUENTLY ASKED QUESTIONS (8 ACCORDIONS)
         ========================================================================= */}
      <section id="warehouse-faqs" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>14. Storage FAQs</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Everything you need to know about warehouse storage, calculation, packing, and retrieval in {city}.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-bold text-xs sm:text-sm text-slate-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#001261] dark:text-blue-400 font-mono text-xs">{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <span className="text-[#001261] dark:text-blue-400 shrink-0 font-bold">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          15. FINAL CTA & HELPLINE CALLOUT
         ========================================================================= */}
      <section id="section-warehouse-final-cta" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 rounded-[2.5rem] border border-blue-500/30 p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col items-start gap-6 relative z-10">
          <div className="space-y-2 text-left w-full">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ 15. Fast Booking &amp; Storage Staging
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Need Secure Storage in {city}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 w-full leading-relaxed">
              Store your household furniture or commercial inventory with complete peace of mind. Get a free digital volume assessment and transparent monthly quotation with flexible duration terms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Your Free Storage Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3.5 rounded-2xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Call Storage Helpline</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>24/7 Helpline: <strong>+91 98765 43210</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Assessment: <strong>Instant Reply</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Facility Access: <strong>Mon - Sun (8 AM - 8 PM)</strong></span>
          </div>
        </div>
      </section>

    </div>
  );
};
