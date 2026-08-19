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
  Check
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

export const ParcelCourierServiceContent: React.FC<ParcelCourierServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedWeightTier, setSelectedWeightTier] = useState<string>('std-parcel');

  const originCity = selectedCity || 'Coimbatore';
  const destinationCity = selectedCity === 'Madurai' ? 'Chennai' : 'Madurai';

  const SERVICE_INCLUSIONS = [
    { title: `Parcel Pickup in ${originCity}`, desc: `Convenient doorstep collection directly from your home, office, or store.`, icon: Home },
    { title: `Parcel Delivery in ${destinationCity}`, desc: `Timely doorstep delivery to residential, commercial, or institutional addresses.`, icon: MapPin },
    { title: 'Standard Parcel Delivery', desc: 'Cost-effective regular scheduled surface transportation across highways.', icon: Truck },
    { title: 'Express Parcel Delivery', desc: 'Priority transit for time-sensitive packages, emergency spares, and documents.', icon: Zap },
    { title: 'Door-to-Door Parcel Delivery', desc: 'Full end-to-end handling from sender doorstep to receiver hands.', icon: ShieldCheck },
    { title: 'Business Parcel Delivery', desc: 'Commercial dispatch for product samples, invoices, and retail shipments.', icon: Briefcase },
    { title: 'Commercial Parcel Transportation', desc: 'Tailored logistics for small and medium enterprises and wholesale lots.', icon: Building2 },
    { title: 'Document Delivery', desc: 'Fast, secure envelopes and tamper-proof pouches for legal/business papers.', icon: FileText },
    { title: 'Small Package Delivery', desc: 'Secure transit for small gift boxes, electronics, apparel, and personal parcels.', icon: Package },
    { title: 'Bulk Parcel Transportation', desc: 'Consolidated shipments and dedicated part-load arrangements for 20kg+ loads.', icon: Boxes },
    { title: 'Parcel Packaging Support', desc: 'Professional 5-ply cartons, bubble wrap, foam, and stretch film sealing.', icon: Layers },
    { title: 'Shipment Status Updates', desc: 'Live GPS milestones, dispatch tracking, and digital delivery confirmations.', icon: Clock }
  ];

  const WHAT_YOU_CAN_SEND = [
    {
      title: 'Personal Parcels',
      subtitle: 'For individuals, families & students',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: Home,
      items: [
        'Clothes & Apparel',
        'Books & Study Material',
        'Important Documents',
        'Gifts & Festive Hampers',
        'Household Items',
        'Personal Belongings',
        'Accessories & Footwear',
        'Small Electronic Gadgets'
      ]
    },
    {
      title: 'Business Parcels',
      subtitle: 'For offices, manufacturers & dealers',
      badgeColor: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      icon: Briefcase,
      items: [
        'Business Documents & Contracts',
        'Product Samples & Prototypes',
        'Office Materials & Stationery',
        'Industrial Spare Parts',
        'Small Machinery & Equipment',
        'Commercial Packages',
        'Retail Products & Goods',
        'Business Inventory Stock'
      ]
    },
    {
      title: 'E-commerce Parcels',
      subtitle: 'For online brands & local sellers',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: ShoppingBag,
      items: [
        'Online E-commerce Orders',
        'Small Businesses & Startups',
        'Retailers & Wholesalers',
        'Home-based Businesses',
        'D2C Brand Shipments',
        'Local City & Regional Sellers',
        'Marketplace Merchant Returns',
        'Scheduled Merchant Dispatches'
      ]
    }
  ];

  const SERVICE_OPTIONS_TABLE = [
    { service: 'Standard Parcel', weight: 'Up to 20 kg', suitableFor: 'Regular personal & household shipments', tag: 'Economical' },
    { service: 'Express Parcel', weight: 'Up to 20 kg', suitableFor: 'Urgent & time-sensitive packages', tag: 'Fastest' },
    { service: 'Bulk Parcel', weight: '20 kg+', suitableFor: 'Business inventory & commercial cargo', tag: 'Volume Rates' },
    { service: 'Document Delivery', weight: 'Up to 1 kg', suitableFor: 'Official papers, certificates & contracts', tag: 'Priority' },
    { service: 'Fragile Parcel', weight: 'Subject to assessment', suitableFor: 'Electronics, glassware & delicate items', tag: 'Extra Cushion' }
  ];

  const BULK_TIERS_TABLE = [
    { tier: '1 – 5 kg', service: 'Standard Parcel', desc: 'Everyday personal boxes, gift packs & documents' },
    { tier: '5 – 20 kg', service: 'Parcel Service', desc: 'Luggage bags, apparel cartons & mid-weight goods' },
    { tier: '20 – 50 kg', service: 'Bulk Parcel', desc: 'Multiple cartons, product samples & trader goods' },
    { tier: '50 – 100 kg', service: 'Commercial Transportation', desc: 'Wholesale merchandise & retail distribution' },
    { tier: '100 kg+', service: 'Truck / Part Load', desc: 'Dedicated mini truck (Tata Ace/Pickup) or part load' }
  ];

  const PACKING_MATERIALS = [
    '5-Ply Heavy-Duty Carton Boxes',
    'Corrugated Protective Sheets',
    'High-Density Bubble Wrap',
    'Shock-Absorbent Foam Sheets',
    'Industrial Stretch Film',
    'Reinforced Packing Tape',
    'Fragile & Handle With Care Stickers',
    'Waterproof Plastic Wrapping',
    'Protective Corner Edge Sheets'
  ];

  const PRICING_FACTORS = [
    { title: 'Actual Physical Weight', desc: 'Gross weight measured on certified digital scales.' },
    { title: 'Volumetric Dimensions', desc: 'Calculated as (Length × Width × Height in cm) / 5000.' },
    { title: 'Package Dimensions', desc: 'Overall length, width, and height profile of each box.' },
    { title: 'Number of Packages', desc: 'Total box / parcel count within a single consignment.' },
    { title: 'Doorstep Accessibility', desc: 'Pickup and delivery accessibility at origin and destination.' },
    { title: 'Delivery Speed Tier', desc: 'Standard surface vs Express priority flight/highway dispatch.' },
    { title: 'Protective Packaging', desc: 'Multi-layer bubble wrap, 5-ply cartons, and waterproof wrapping.' },
    { title: 'Special Fragile Handling', desc: 'Dedicated cushioning and top-load placement for delicate goods.' }
  ];

  const NINE_STEPS = [
    { step: '01', title: 'Enter Pickup Location', desc: `Provide your exact pickup address in ${originCity} along with active pincode.` },
    { step: '02', title: 'Enter Delivery Location', desc: `Specify receiver destination address in ${destinationCity} and contact number.` },
    { step: '03', title: 'Provide Parcel Details', desc: 'Enter parcel category, approximate weight, dimensions, and box quantity.' },
    { step: '04', title: 'Select Required Service', desc: 'Choose between Standard, Express, Document, or Bulk Transportation.' },
    { step: '05', title: 'Confirm the Booking', desc: 'Review transparent quotation and confirm pickup schedule with zero hassle.' },
    { step: '06', title: 'Doorstep Parcel Pickup', desc: `Executive collects parcel directly from your home, office, or warehouse in ${originCity}.` },
    { step: '07', title: 'Shipment Processing', desc: 'Parcel is verified, securely packed with 5-ply cartons, and barcode-labeled.' },
    { step: '08', title: `Transportation to ${destinationCity}`, desc: 'Dispatched through scheduled express highway logistics corridor.' },
    { step: '09', title: 'Delivery Confirmation', desc: 'Delivered to destination with digital OTP and instant status update.' }
  ];

  const WHY_CHOOSE_POINTS = [
    `Dedicated ${originCity} to ${destinationCity} Intercity Parcel Service`,
    'Standard and Express Parcel Delivery Options',
    'Door-to-Door Delivery Where Access Permits',
    `Rapid Parcel Pickup Across ${originCity}`,
    `Guaranteed Doorstep Delivery in ${destinationCity}`,
    'Professional & Safe Parcel Handling Process',
    'Comprehensive Packaging & Cushioning Support',
    'Heavy-Duty 5-Ply Carton Box Packing',
    'Tamper-Proof Barcode Labeling & Package Identification',
    'Specialized Commercial & Business Parcel Solutions',
    'Bulk Parcel & Part-Load Truck Transportation',
    'Real-time Milestone Tracking & SMS/WhatsApp Updates',
    '100% Transparent Upfront Pricing (No Hidden Surcharges)',
    'Dedicated Customer Support Throughout the Shipment'
  ];

  const FAQS = [
    {
      q: `What is the ${originCity} to ${destinationCity} Parcel Service?`,
      a: `It is a dedicated intercity parcel transportation service provided by Packer Solutions for sending eligible documents, personal packages, business parcels, and commercial shipments from ${originCity} to ${destinationCity} with doorstep pickup and verified delivery.`
    },
    {
      q: `Can I send a parcel from ${originCity} to ${destinationCity}?`,
      a: `Yes. Packer Solutions provides reliable parcel transportation from ${originCity} to ${destinationCity} and all major Tamil Nadu and pan-India destinations for eligible household, personal, and commercial shipments.`
    },
    {
      q: 'Do you provide door-to-door parcel delivery?',
      a: 'Yes, door-to-door pickup and delivery are provided where the pickup and delivery locations support vehicle and delivery access.'
    },
    {
      q: `Do you provide parcel pickup in ${originCity}?`,
      a: `Yes. Parcel pickup can be arranged from eligible homes, offices, shops, warehouses, and business locations across ${originCity}.`
    },
    {
      q: `Do you provide parcel delivery in ${destinationCity}?`,
      a: `Yes. Parcels can be delivered directly to eligible residential, office, commercial, and business addresses in ${destinationCity}.`
    },
    {
      q: `Can I send a business parcel from ${originCity} to ${destinationCity}?`,
      a: `Yes. Businesses can use our service for sending commercial documents, product samples, spare parts, customer orders, retail packages, inter-branch shipments, and inventory.`
    },
    {
      q: 'Do you provide Express Parcel Service?',
      a: 'Yes. Express parcel transportation can be arranged for time-sensitive documents and priority shipments based on the available transportation and flight/express highway schedule.'
    },
    {
      q: 'Can I send fragile items?',
      a: 'Fragile items (such as electronics, glassware, artwork, and decorative pieces) are accepted subject to pre-shipment assessment and mandatory multi-layer protective packaging.'
    },
    {
      q: 'Do you provide parcel packaging support?',
      a: 'Yes. Packaging support is provided using 5-ply carton boxes, bubble wrap, foam sheets, stretch film, fragile stickers, and waterproof wrapping based on the parcel specifications.'
    },
    {
      q: `How are ${originCity} to ${destinationCity} parcel charges calculated?`,
      a: 'Charges are calculated transparently based on actual weight, volumetric weight (L × W × H / 5000), dimensions, number of packages, service speed (Standard vs Express), pickup/delivery location, and packaging requirements.'
    },
    {
      q: 'Can I send multiple or bulk parcels?',
      a: 'Yes. Bulk parcel transportation and dedicated part-load vehicle options are available for customers and businesses with multiple packages or volume freight.'
    },
    {
      q: 'Can I track my parcel status?',
      a: 'Yes. You receive booking confirmation, pickup alerts, transit milestone notifications, and digital delivery confirmation via SMS and WhatsApp.'
    }
  ];

  const RELATED_SERVICES = [
    { title: `House Shifting Services in ${originCity}`, id: 'household-shifting' },
    { title: `Packing and Unpacking Services in ${originCity}`, id: 'packing-unpacking' },
    { title: `Loading and Unloading Services in ${originCity}`, id: 'loading-unloading' },
    { title: `Vehicle Transportation Services in ${originCity}`, id: 'vehicle-transportation' },
    { title: `Truck Booking Services in ${originCity}`, id: 'domestic-relocation' },
    { title: `Warehousing & Storage Services in ${originCity}`, id: 'warehousing-storage' }
  ];

  return (
    <div className="space-y-12">
      
      {/* =========================================================================
          1. HERO SUMMARY & SERVICE AREA BANNER
         ========================================================================= */}
      <section id="parcel-hero-overview" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">
              ⚡ PROFESSIONAL PARCEL & COURIER LOGISTICS
            </span>
            <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Service Area: {originCity} → {destinationCity}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {originCity} to {destinationCity} Parcel Service – Fast &amp; Secure Parcel Delivery by Packer Solutions
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
          Packer Solutions provides professional <strong>{originCity} to {destinationCity} Parcel Services</strong> for individuals, businesses, offices, retailers, e-commerce sellers, and commercial customers. Our parcel transportation service is designed for documents, personal belongings, small packages, business parcels, commercial goods, and other eligible shipments.
        </p>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-normal">
          Whether you need to send a parcel from your home, office, shop, warehouse, or business location in <strong>{originCity}</strong> to an address in <strong>{destinationCity}</strong>, Packer Solutions provides a systematic process covering parcel booking, pickup, verification, packaging, secure handling, transportation, delivery updates, and final delivery confirmation.
        </p>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL PARCEL DELIVERY SERVICE INCLUSIONS (12 CARDS)
         ========================================================================= */}
      <section id="parcel-service-inclusions" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            COMPREHENSIVE LOGISTICS COVERAGE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Professional {originCity} to {destinationCity} Parcel Delivery
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Designed for customers who need reliable intercity transportation for small, medium-sized, and bulk shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_INCLUSIONS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Available on-demand</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>
            <strong>Service Note:</strong> Final service availability and transit time depend on parcel size, weight, destination accessibility, transportation route schedule, and carrier availability.
          </span>
        </div>
      </section>

      {/* =========================================================================
          3. WHAT CAN YOU SEND FROM COIMBATORE TO MADURAI? (3 CATEGORY CARDS)
         ========================================================================= */}
      <section id="what-can-you-send" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            PERMITTED SHIPMENT CATEGORIES
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            What Can You Send from {originCity} to {destinationCity}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Packer Solutions can arrange safe and compliant transportation for various eligible parcel types.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHAT_YOU_CAN_SEND.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5 text-orange-500" />
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      {cat.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. PARCEL SERVICE OPTIONS (TABLE 1)
         ========================================================================= */}
      <section id="parcel-service-options-table" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            SERVICE CATEGORY TIERS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            {originCity} to {destinationCity} Parcel Service Options
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare recommended weight tiers and suitability for your consignment.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Service Option</th>
                  <th className="px-5 py-3.5">Recommended Weight</th>
                  <th className="px-5 py-3.5">Suitable For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {SERVICE_OPTIONS_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>{row.service}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded-md">
                        {row.tag}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-slate-100">
                      {row.weight}
                    </td>
                    <td className="px-5 py-4 font-normal text-slate-600 dark:text-slate-300">
                      {row.suitableFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          * Final service availability depends on parcel type, size, weight, packaging, route, and transportation requirements.
        </p>
      </section>

      {/* =========================================================================
          5. DOOR-TO-DOOR PARCEL DELIVERY & PICKUP COVERAGE
         ========================================================================= */}
      <section id="door-to-door-coverage" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            LOCALITY & HUB NETWORK
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Door-to-Door Parcel Delivery from {originCity} to {destinationCity}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Packer Solutions provides Door-to-Door Parcel Delivery where pickup and delivery access permits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pickup in Origin */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Pickup in {originCity}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Collected from any declared address</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {['Homes & Residences', 'Corporate Offices', 'Retail Shops', 'Warehouses', 'Business Premises', 'Commercial Establishments'].map((loc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery in Destination */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Delivery in {destinationCity}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Delivered directly to receiver doorstep</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {['Residential Homes', 'Office Addresses', 'Market Shops', 'Business Locations', 'Commercial Addresses', 'Institutional Hubs'].map((loc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          Our dedicated operations team coordinates the entire consignment lifecycle starting from doorstep pickup verification in {originCity} through final recipient delivery handover in {destinationCity}.
        </p>
      </section>

      {/* =========================================================================
          6. 9-STEP DELIVERY & PICKUP PROCESS
         ========================================================================= */}
      <section id="parcel-nine-steps" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            STEP-BY-STEP WORKFLOW
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            9-Step {originCity} to {destinationCity} Parcel Delivery Process
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A seamless, transparent, and structured workflow from booking to destination confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NINE_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs space-y-2.5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg">
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
          7. PARCEL PACKAGING SERVICES & MATERIALS
         ========================================================================= */}
      <section id="parcel-packaging-materials" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            PROTECTIVE PACKAGING
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Parcel Packaging Services &amp; Protective Materials
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Proper packaging protects parcels during handling and transit. Packer Solutions provides tailored packaging support based on parcel type, dimensions, weight, and fragility.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Available Packaging Materials
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {PACKING_MATERIALS.map((mat, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>{mat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-orange-50/60 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-900/50 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 dark:text-orange-200 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-orange-600" />
            <span>Fragile Parcel Packing Recommendations</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Additional multi-layer protective cushioning is recommended for: <strong>Glass items, Electronics, Decorative pieces, Artwork, Sensitive equipment,</strong> and delicate items. Packaging requirements are determined based on individual shipment assessments.
          </p>
        </div>
      </section>

      {/* =========================================================================
          8. WEIGHT & DIMENSION ASSESSMENT & PRICING FACTORS
         ========================================================================= */}
      <section id="pricing-factors" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            PRICING CRITERIA
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Factors Affecting {originCity} to {destinationCity} Parcel Delivery Charges
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Parcel charges depend on physical weight, volumetric characteristics, and service speed preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING_FACTORS.map((factor, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4.5 shadow-xs space-y-1.5"
            >
              <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                {factor.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                {factor.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold">Need an Accurate Custom Quotation?</h4>
            <p className="text-xs text-slate-300 font-normal">
              Provide your parcel weight, dimensions, pickup locality, and box count for an instant flat estimate.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Calculate Quotation
          </button>
        </div>
      </section>

      {/* =========================================================================
          9. BULK PARCEL TRANSPORTATION & WEIGHT TIERS
         ========================================================================= */}
      <section id="bulk-parcel-tiers" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            BULK & VOLUME CARGO
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Bulk Parcel Transportation from {originCity} to {destinationCity}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            For customers and commercial enterprises sending multiple packages or higher volumes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Shipment Size Tier</th>
                  <th className="px-5 py-3.5">Recommended Service</th>
                  <th className="px-5 py-3.5">Typical Load Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {BULK_TIERS_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5 font-mono font-bold text-orange-600 dark:text-orange-400">
                      {row.tier}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                      {row.service}
                    </td>
                    <td className="px-5 py-3.5 font-normal text-slate-600 dark:text-slate-300">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          * For consignments exceeding 100 kg, <strong>Truck Booking</strong> (Tata Ace / Pickup) or <strong>Part Load Transportation</strong> is often more cost-effective than standard parcel parceling.
        </p>
      </section>

      {/* =========================================================================
          10. PARCEL DOCUMENTATION & LABELING
         ========================================================================= */}
      <section id="documentation-labeling" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            DISPATCH INFORMATION
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Parcel Documentation &amp; Barcode Identification
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Accurate shipment details and barcode labeling ensure seamless verification and eliminate misplacement risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4.5 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Home className="w-4 h-4 text-orange-500" />
              <span>Sender Information</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-normal">
              <li>• Sender Full Name</li>
              <li>• Verified Mobile Number</li>
              <li>• Detailed Pickup Address</li>
              <li>• Origin City &amp; Pincode</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4.5 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Receiver Information</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-normal">
              <li>• Recipient Full Name</li>
              <li>• Active Contact Mobile Number</li>
              <li>• Exact Delivery Destination Address</li>
              <li>• Destination City &amp; Pincode</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4.5 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Barcode className="w-4 h-4 text-emerald-500" />
              <span>Consignment Label Details</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-normal">
              <li>• Unique Barcode Reference ID</li>
              <li>• Individual Box Numbering (e.g., 1/3, 2/3)</li>
              <li>• Gross Weight &amp; Dimension Tags</li>
              <li>• Special Handling &amp; Fragile Symbols</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. WHY CHOOSE PACKER SOLUTIONS (14 BULLET VERIFIED CHECKLIST)
         ========================================================================= */}
      <section id="why-choose-parcel" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            VERIFIED ADVANTAGES
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Why Choose Packer Solutions for {originCity} to {destinationCity} Parcel Service?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Trusted by thousands of individual shippers, retail brands, and commercial businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHY_CHOOSE_POINTS.map((pt, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 shadow-xs flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {pt}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          12. FREQUENTLY ASKED QUESTIONS (12 ACCORDION ITEMS)
         ========================================================================= */}
      <section id="parcel-faqs" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
            HELP &amp; CLARIFICATIONS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Frequently Asked Questions – {originCity} to {destinationCity} Parcel Service
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            Everything you need to know about parcel booking, rates, packaging, pickup, and delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer hover:text-orange-600 dark:hover:text-orange-400"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <span className="text-orange-500 font-mono font-bold text-base shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          13. RECOMMENDED INTERNAL LINKS (CORRIDORS & SERVICES)
         ========================================================================= */}
      <section id="recommended-internal-links" className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Explore Related Services in {originCity}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Quick access to comprehensive packing, loading, vehicle transport, and warehousing solutions.
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

      {/* =========================================================================
          14. FINAL BOOKING CTA CARD
         ========================================================================= */}
      <section id="parcel-final-cta" className="bg-gradient-to-br from-slate-900 via-[#001261] to-slate-950 rounded-3xl border border-blue-500/30 p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ GET YOUR PARCEL ESTIMATE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to Send a Parcel from {originCity} to {destinationCity}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed font-normal">
              Book doorstep pickup, 5-ply protective packaging, and real-time live GPS tracking with Packer Solutions. Instant transparent quotations with zero hidden fees.
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

    </div>
  );
};
