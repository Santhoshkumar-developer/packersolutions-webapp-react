import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Layers, 
  Boxes, 
  Truck,
  Sparkles,
  Check,
  Calendar,
  Calculator,
  FileCheck,
  Users,
  Server,
  Monitor,
  FileText,
  Wrench,
  Zap,
  Phone,
  ArrowRight,
  ClipboardCheck,
  Warehouse,
  Briefcase,
  HelpCircle,
  QrCode,
  Smartphone,
  Navigation,
  Award,
  DollarSign,
  MessageSquare,
  Package,
  Shield,
  Table,
  HardDrive
} from 'lucide-react';
import { ServiceItem } from '../types';

interface OfficeShiftingServiceContentProps {
  selectedCity: string;
  activeService: ServiceItem;
  onSelectCity?: (city: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenEnquiry?: () => void;
  onOpenLoginModal?: () => void;
}

// Commercial Service Areas Helper based on selected city
const getCommercialServiceAreas = (city: string): string[] => {
  const areas: Record<string, string[]> = {
    'Coimbatore': ['Avinashi Road', 'Tidel Park & Peelamedu', 'Gandhipuram CBD', 'Saravanampatti IT Corridor', 'RS Puram Commercial', 'Singanallur Industrial Zone', 'SIDCO Kurichi', 'Thudiyalur', 'Ganapathy', 'Ramanathapuram', 'Sulur Logistics Park', 'Madukkarai Industrial Belt'],
    'Bangalore': ['Whitefield EPIP Zone', 'Electronic City Phase 1 & 2', 'Outer Ring Road (ORR)', 'Koramangala CBD', 'Indiranagar Tech Hub', 'Manyata Tech Park', 'HSR Layout Sector 1-7', 'Bagmane Tech Park', 'Bannerghatta Road', 'Peenya Industrial Area', 'MG Road Commercial', 'Hebbal Business Park'],
    'Chennai': ['OMR IT Corridor', 'Guindy Industrial Estate', 'Ambattur Industrial Estate', 'Tidel Park Tharamani', 'Mount Road CBD', 'Nungambakkam High Road', 'Porur Tech Park', 'DLF Cybercity', 'Perungudi', 'Sholinganallur Junction', 'Anna Nagar Commercial', 'Siruseri SIPCOT'],
    'Mumbai': ['Bandra Kurla Complex (BKC)', 'Lower Parel Commercial Hub', 'Andheri East MIDC', 'Nariman Point Financial District', 'Powai Hiranandani Tech Park', 'Mindspace Malad', 'Goregaon Nesco IT Park', 'Navi Mumbai Vashi Infotech', 'Airoli Mindspace', 'Thane Wagle Estate', 'Kanjurmarg Business Hub', 'Worli Corporate Enclave'],
    'Hyderabad': ['Hitec City', 'Gachibowli Financial District', 'Madhapur Tech Zone', 'Kondapur Commercial Hub', 'Jubilee Hills Checkpost', 'Banjara Hills Road No 1-12', 'Begumpet Airport Plaza', 'Sanathnagar Industrial Area', 'Kukatpally Y-Junction', 'Mindspace Madhapur', 'Kokapet SEZ', 'Nanakramguda Tech Park'],
    'Pune': ['Hinjewadi IT Park Phase 1-3', 'Magarpatta Cybercity', 'Kharadi EON Free Zone', 'Viman Nagar Corporate Park', 'Kalyani Nagar Business Bay', 'Senapati Bapat Road', 'Bhosari MIDC', 'Chakan Industrial Zone', 'Baner High Street', 'Pimpri Commercial Belt', 'Hadapsar Industrial Estate', 'Yerwada Commerzone'],
    'Delhi': ['Connaught Place CBD', 'Nehru Place IT Hub', 'Bhikaji Cama Place', 'Okhla Industrial Area Phase 1-3', 'Saket District Centre', 'Jasola Business District', 'Barakhamba Road', 'Rajendra Place', 'Aerocity Hospitality District', 'Netaji Subhash Place', 'Patparganj Industrial Area', 'Mayapuri Industrial Area'],
    'Ahmedabad': ['SG Highway Corporate Hub', 'Prahlad Nagar Commercial Belt', 'GIFT City Gandhinagar', 'C.G. Road CBD', 'Ashram Road Financial Enclave', 'Sanand Industrial Estate', 'Vatva GIDC', 'Changodar Logistics Park', 'Sindhu Bhavan Road', 'Science City Road', 'Naroda Industrial Zone', 'Makarba Tech Zone'],
    'Kolkata': ['Sector V Salt Lake IT Hub', 'Rajarhat New Town Financial Eco-hub', 'Dalhousie BBD Bagh CBD', 'Park Street Commercial', 'Camac Street Business Belt', 'Taratala Industrial Area', 'Kasba Industrial Estate', 'Chinar Park Tech Zone', 'Howrah Commercial Hub', 'Strand Road Logistics Hub'],
    'Kochi': ['Infopark Kakkanad Phase 1-2', 'SmartCity Kochi', 'MG Road Commercial', 'Kaloor Business Hub', 'Willingdon Island Port Area', 'Edapally Toll Junction', 'Kalamassery Industrial Belt', 'Marine Drive Financial Street', 'Vyttila Mobility Hub', 'Aluva Industrial Corridor']
  };

  return areas[city] || [
    'Central Business District (CBD)',
    'IT / Software Tech Park',
    'Industrial & Manufacturing Estate',
    'Special Economic Zone (SEZ)',
    'Logistics & Warehousing Hub',
    'Commercial Shopping Complex',
    'Financial District',
    'Expressway Business Corridor'
  ];
};

const POPULAR_OFFICE_CITIES = [
  'Coimbatore', 'Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Kochi'
];

export const OfficeShiftingServiceContent: React.FC<OfficeShiftingServiceContentProps> = ({
  selectedCity,
  activeService,
  onSelectCity,
  onSelectService,
  onOpenEnquiry,
  onOpenLoginModal
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const city = selectedCity || 'Coimbatore';
  const commercialAreas = getCommercialServiceAreas(city);

  return (
    <div className="space-y-12" id="office-shifting-details-view">
      
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
            Office Shifting Services – Zero Downtime &amp; Secure Relocation in {city}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            Relocate your workspace seamlessly with Packer Solutions&apos; enterprise-grade office shifting services. From server rooms and IT workstations to executive modular furniture, sensitive archives, and conference setups, we provide turnkey corporate relocation solutions engineered for zero business disruption.
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-normal">
            Whether shifting within commercial hubs of {city} or executing intercity headquarters relocation across India, our certified project managers and technical crews deliver structured, weekend/night transitions with complete asset accountability.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="office-hero-quote-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Free Corporate Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiry}
              id="office-hero-survey-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-blue-400" />
              <span>Book Free On-Site / Digital Survey</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL & COMPLETE OFFICE SHIFTING SERVICES
         ========================================================================= */}
      <section id="section-professional-services" className="space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>2. Professional Office Shifting Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            End-to-End Corporate &amp; Workspace Relocation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Corporate office relocations demand strategic timeline management, multi-team coordination, and specialized equipment handling. Packer Solutions delivers bespoke shifting for startups, software development centers, corporate headquarters, call centers, and commercial retail establishments in {city}.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our comprehensive corporate moving scope covers floor-wise surveys, anti-static IT packing, modular workstation dismantling, server rack decommissioning, secure containerized transport, and designated desk reassembly with cable management.
          </p>
        </div>

        {/* 7 Complete Service Process Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">IT &amp; Server Room Relocation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Specialized anti-static multi-layer packing and shock-cushioned transit for server racks, switches, UPS, monitors, and networking hardware.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Workstation Dismantling &amp; Setup</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Experienced carpenters systematically dismantle modular cubicles, partitions, executive desks, and conference tables with alphanumeric labeling.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Document &amp; Archive Management</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Confidential records, legal files, and financial dockets packed in heavy-duty 5-ply cartons with security tamper seals and department barcodes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dedicated Container Fleet</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fleet of weather-proof, sealed container trucks (14ft, 17ft, 20ft, 22ft) with hydraulic tail-lifts for smooth commercial transport.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Floor-Wise Systematic Unloading</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Goods are delivered to designated departments, floors, and rooms in accordance with the pre-approved floor plan layout.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Workspace Assembly &amp; Reinstallation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Complete reassembly of executive desks, chairs, storage racks, cafeteria units, and conference suites ready for immediate business resumption.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-xs space-y-2 hover:border-blue-400 transition-all sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Commercial &amp; Archive Warehousing</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Fire-compliant, CCTV-secured climate-controlled commercial warehouse vaults available for transitional office assets, surplus furniture, and long-term legal archives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE PACKER SOLUTIONS (FOR OFFICE SHIFTING)
         ========================================================================= */}
      <section id="section-why-choose" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Why Choose Packer Solutions?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            The Corporate Relocation Standard of Excellence
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered enterprise moving workflows prioritizing zero downtime, asset protection, and guaranteed project timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#001261] dark:text-blue-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Free On-Site &amp; Digital Survey</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Comprehensive inventory assessment, CFT volume calculation, lift access audit, and parking logistics analyzed before sharing transparent quotes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Corporate Pricing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Itemized billing with GST invoicing, covering packing materials, manpower, technical carpenters, and transport with zero hidden costs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero-Downtime Weekend Relocation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Execute overnight or weekend moving schedules Friday evening through Sunday night so your team resumes work on Monday morning without disruption.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Certified IT &amp; Electrical Handlers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Trained technical crews trained in anti-static packing, cable color-coding, server rack bracing, and fragile electronic handling protocols.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Barcode &amp; Department Tagging</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every workstation, PC, monitor, and carton is indexed with employee IDs and department color tags for instant room matching at destination.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dedicated Move Project Manager</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A single point of contact coordinates manpower, security passes, facility manager clearances, fleet dispatch, and handover checklists.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW OFFICE SHIFTING WORKS (9 STAGES)
         ========================================================================= */}
      <section id="section-how-it-works" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>4. How Office Relocation Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Step-by-Step Corporate Moving Process (9 Stages)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A structured 9-stage execution methodology engineered for speed, safety, and business continuity.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: 1, title: 'Pre-Move Survey & Audit', desc: 'Assess workspace layout, workstation count, IT infrastructure, lift capacity and building access rules.' },
              { num: 2, title: 'Floor-Wise Relocation Plan', desc: 'Formulate timeline milestones, department shifts, fleet sizing, and transit insurance dockets.' },
              { num: 3, title: 'Color-Coded Asset Tagging', desc: 'Issue color tags and digital QR codes matching employee desks, departments and target floor layouts.' },
              { num: 4, title: 'IT & Electronic Packing', desc: 'Secure laptops, monitors, servers, switches and wiring with specialized anti-static cushioning.' },
              { num: 5, title: 'Furniture Dismantling', desc: 'Carefully dismantle modular workstations, cubicles, executive cabins and conference setups.' },
              { num: 6, title: 'Safe Loading & Transport', desc: 'Load items into container trucks using cargo belts, floor blankets and hydraulic lift equipment.' },
              { num: 7, title: 'Floor-Wise Unloading', desc: 'Unload goods systematically and distribute cartons to designated department bays.' },
              { num: 8, title: 'Reassembly & Setup', desc: 'Reinstall workstations, adjust desk partitions, position conference suites and clear debris.' },
              { num: 9, title: 'Final Handover & Audit', desc: 'Conduct department-by-department asset verification and sign-off with facility managers.' }
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
          5. SPECIALIZED CORPORATE PACKING
         ========================================================================= */}
      <section id="section-premium-packing" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span>5. Specialized Corporate Packing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Multi-Layer Protection for Sensitive Office Assets
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Protecting high-value IT equipment, glass architectural fixtures, executive furniture, and confidential documents requires industry-grade packing materials. Packer Solutions deploys multi-tier packing standards custom-fitted for corporate assets.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our packing arsenal includes anti-static bubble wrap, 5-ply corrugated cartons, high-density edge guards, stretch film moisture wraps, and heavy-duty padded moving blankets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">⚡</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Anti-Static Bubble Wrap</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Shields servers, PCBs, microchips &amp; dual monitors</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">📦</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">5-Ply Archive Cartons</h4>
            <p className="text-[10px] text-slate-400 leading-tight">High crush resistance for confidential files &amp; records</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🛡️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Edge Guards &amp; Foam</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Scratch prevention for glass desks &amp; boardroom tables</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center space-y-1.5 shadow-xs">
            <div className="text-2xl">🏷️</div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Department Barcodes</h4>
            <p className="text-[10px] text-slate-400 leading-tight">Color-coded labels for rapid room &amp; desk allocation</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SAFE IT & SERVER HANDLING
         ========================================================================= */}
      <section id="section-safe-loading" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>6. Safe IT &amp; Server Handling</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Secure IT Infrastructure &amp; Server Relocation
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Server className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Data center and server relocation requires specialized shock-absorption handling. Our crews follow strict ESD (electrostatic discharge) safety standards, utilizing padded server chassis cradles, rack-mount securing harnesses, and customized foam flight cases for zero transit shock.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ ESD Anti-Static Wrapping</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Cable Labeling &amp; Bundling</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Shock-Absorbing Transit Base</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. REAL-TIME FLEET TRACKING
         ========================================================================= */}
      <section id="section-realtime-tracking" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>7. Real-Time Fleet Tracking</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            GPS Fleet Telemetry &amp; Move Coordination
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
            <Smartphone className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Monitor commercial convoy movements with continuous GPS tracking. Stay in constant communication with your appointed Project Lead, receiving real-time convoy checkpoints, vehicle arrival ETAs, and building loading dock clearance alerts.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Live GPS Truck Telemetry</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Dedicated Project Lead</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Dock Clearance Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. WORKSPACE SETUP & FURNITURE ASSEMBLY
         ========================================================================= */}
      <section id="section-unpacking-placement" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>8. Workspace Setup &amp; Reassembly</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Complete Desk Reassembly &amp; Floor Setup
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Turn key delivery ensures zero employee idle time. Our carpentry technicians reassemble modular desks, align office partitions, place executive furniture in designated managerial cabins, setup conference table AV mountings, and clear all discarded packing waste.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Workstation Reassembly</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Conference Table AV Mounts</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ 100% Debris &amp; Packing Removal</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. COMMERCIAL SHIFTING OPTIONS (4 OPTIONS)
         ========================================================================= */}
      <section id="section-shifting-options" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>9. Office Shifting Models</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Tailored Commercial Relocation Models
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select the appropriate relocation tier based on your office scale, seat count, and transition timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Small Office & Startups */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#001261] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                Option 1
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Same-Day Move
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Startup &amp; Small Office Shifting (1–10 Seats)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Agile relocation for co-working cabins, small startups, and boutique agency offices in <strong>{city}</strong> using Tata Ace or 8ft Pickups for rapid same-day transition.
            </p>
          </div>

          {/* IT Offices & Development Centers */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md">
                Option 2
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Weekend Zero-Downtime
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">IT &amp; Tech Park Shifting (10–50 Workstations)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Comprehensive tech moving with server rack de-racking, dual-monitor workstation protection, and dedicated 14ft–17ft closed containers.
            </p>
          </div>

          {/* Corporate Multi-Floor Enterprise */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-md">
                Option 3
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono">
                Multi-Floor Project
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Corporate Enterprise &amp; BPO Relocation (50–200+ Desks)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Phased multi-stage moves with dedicated project managers, multiple 20ft–22ft container convoys, full facility clearance, and employee desktop tagging.
            </p>
          </div>

          {/* Retail Showrooms & Commercial Stores */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-2 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-md">
                Option 4
              </span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded font-mono">
                Store Fixtures
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Commercial Showroom &amp; Retail Relocation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Specialized shifting for display fixtures, glass counters, inventory stock, POS billing counters, and commercial warehouse administrative units.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. DOMESTIC OFFICE SHIFTING ACROSS INDIA
         ========================================================================= */}
      <section id="section-domestic-shifting" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>10. Domestic Office Shifting</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Domestic Corporate Relocation Across India
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Expanding your branch footprint or moving regional headquarters to another tier-1 metro? Packer Solutions manages interstate corporate relocation with dedicated closed container vehicles and inter-branch tracking.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Every long-distance corporate shipment is backed by comprehensive transit risk insurance, digital consignment notes, E-way bill compliance, and destination facility management coordination.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Digital Asset Survey</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>E-Way Bill Compliance</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Dedicated Container</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Facility Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. DIGITAL DOCKET & ASSET INVENTORY MANAGEMENT
         ========================================================================= */}
      <section id="section-digital-docket" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Digital Docket &amp; Asset Management</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Digital Inventory &amp; Asset Tracking
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <FileCheck className="w-7 h-7" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Eliminate missing items with our digital corporate inventory manifest. Every carton, monitor, and server is cataloged with barcode identifiers linked to specific department heads, ensuring instant verification during origin dispatch and destination unloading.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Department Asset Registers</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Barcode Scanned Manifests</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">✓ Compliant GST Corporate Invoicing</span>
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
            Office Shifting Charges &amp; Pricing ({city})
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Commercial relocation pricing depends on total square footage, workstation count, IT infrastructure density, vehicle capacity, elevator access, and technical carpentry requirements. Below is our transparent reference rate matrix for {city}.
          </p>
        </div>

        {/* Pricing Matrix Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001261] text-white text-[11px] uppercase tracking-wider font-mono">
                  <th className="p-3.5">Office Scale</th>
                  <th className="p-3.5">Approx. Area</th>
                  <th className="p-3.5">Recommended Vehicle</th>
                  <th className="p-3.5">Intracity Estimate</th>
                  <th className="p-3.5">Intercity Starting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-medium">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Small Office (1–10 Seats)</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">Up to 500 Sq.ft</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">Tata Ace / Pickup</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹8,999 – ₹12,500</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹18,000 – ₹28,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Medium IT Office (10–25 Seats)</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">500–1,200 Sq.ft</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">14 Ft / 17 Ft Container</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹18,999 – ₹24,999</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹32,000 – ₹48,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Corporate Space (25–50 Seats)</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">1,200–2,500 Sq.ft</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">17 Ft / 20 Ft Container</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹29,999 – ₹39,999</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹52,000 – ₹78,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Large Enterprise (50–100 Desks)</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">2,500–5,000 Sq.ft</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">20 Ft / 22 Ft Multi-Convoy</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹44,999 – ₹65,000</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">₹85,000 – ₹1,40,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Enterprise Head Office (100+ Desks)</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">5,000+ Sq.ft</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">Dedicated Fleet Management</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">Custom Audit Plan</td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200">Custom Turnkey Quote</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Banner inside rate chart */}
          <div className="bg-blue-50 dark:bg-blue-950/60 p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left space-y-0.5">
              <span className="font-bold text-xs text-[#001261] dark:text-blue-300 block">
                Planning an upcoming office relocation?
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Get an exact quotation tailored to your workstation count and IT inventory.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="bg-[#001261] hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Request Free Corporate Survey
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. OFFICE ASSETS & EQUIPMENT WE HANDLE
         ========================================================================= */}
      <section id="section-items-we-move" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
            <span>13. Office Items We Handle</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Commercial Inventory &amp; Equipment Handled
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Certified safe packing and zero-scratch relocation for all enterprise workspace goods categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { icon: Building2, name: 'Workstations & Cubicles', desc: 'Modular linear desks, partitions & screens' },
            { icon: Briefcase, name: 'Executive Cabins', desc: 'MD desks, credenzas & leather chairs' },
            { icon: Table, name: 'Conference Suites', desc: 'Boardroom tables & presentation furniture' },
            { icon: Monitor, name: 'Desktops & Monitors', desc: 'Dual-monitor setups with screen foam guards' },
            { icon: Server, name: 'Servers & IT Racks', desc: 'Data center switches, patch panels & UPS' },
            { icon: HardDrive, name: 'Printers & Photocopiers', desc: 'Heavy multifunction commercial copiers' },
            { icon: FileText, name: 'Legal & HR Archives', desc: 'Tamper-sealed document boxes & compactors' },
            { icon: Boxes, name: 'Cafeteria & Pantry Units', desc: 'Coffee machines, water dispensers & fridges' },
            { icon: ShieldCheck, name: 'Glass & Acoustic Panels', desc: 'Tempered glass dividers & reception signage' },
            { icon: Zap, name: 'UPS & Power Inverters', desc: 'Heavy commercial power backup batteries' },
            { icon: Warehouse, name: 'Storage Cabinets', desc: 'Steel almirahs, pedestals & locker units' },
            { icon: Truck, name: 'Showroom Fixtures', desc: 'Retail merchandise racks & display gondolas' }
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
          14. ADDITIONAL CORPORATE SERVICES
         ========================================================================= */}
      <section id="section-additional-services" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>14. Additional Corporate Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Value-Added Corporate Solutions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            One-stop enterprise convenience with technical handyman, IT cable layout, and post-move facility support.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            'Server De-racking & Re-racking',
            'Data Cable Organization',
            'Floor-Wise Workstation Setup',
            'Conference Room AV Setup',
            'Commercial Deep Cleaning',
            'Carpet & Floor Surface Guard',
            'AC Dismantling & Installation',
            'E-Waste Certified Disposal',
            'Secure Document Shredding',
            'Transit Risk Insurance'
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
          15. POPULAR CITIES (OFFICE SHIFTING BY CITY)
         ========================================================================= */}
      <section id="section-popular-cities" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>15. Popular Cities</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            Office Shifting Services by Commercial Hub
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated corporate relocation branches across India&apos;s leading technology and business corridors.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Your Business Location for Corporate Dispatch:
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_OFFICE_CITIES.map((c) => {
              const isSelected = c.toLowerCase() === city.toLowerCase() || 
                (c === 'Bengaluru' && city.toLowerCase() === 'bangalore');
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    const normalizedCity = c === 'Bengaluru' ? 'Bangalore' : c;
                    if (onSelectCity) onSelectCity(normalizedCity);
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
                  <span>{c}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Commercial Corridors &amp; IT Clusters in {city}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {commercialAreas.slice(0, 8).map((area, idx) => (
                <span key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          16. POPULAR INTERCITY BUSINESS ROUTES
         ========================================================================= */}
      <section id="section-popular-routes" className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 text-[#001261] dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full text-[11px] font-bold">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>16. Popular Corporate Routes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#001261] dark:bg-blue-500 rounded-full" />
            High-Volume Intercity Corporate Shifting Routes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated containerized line-hauls between major IT parks and commerce hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { origin: 'Coimbatore', dest: 'Chennai IT Hub', time: '1–2 Days', fare: '₹22,000' },
            { origin: 'Coimbatore', dest: 'Bengaluru ORR', time: '1–2 Days', fare: '₹19,500' },
            { origin: 'Coimbatore', dest: 'Hyderabad Hitec', time: '2–3 Days', fare: '₹28,500' },
            { origin: 'Coimbatore', dest: 'Kochi Infopark', time: '1 Day', fare: '₹16,500' },
            { origin: city, dest: 'Bengaluru Tech SEZ', time: '1–2 Days', fare: '₹24,000' },
            { origin: city, dest: 'Mumbai BKC', time: '3–4 Days', fare: '₹38,000' },
            { origin: city, dest: 'Pune Cybercity', time: '2–3 Days', fare: '₹34,000' },
            { origin: city, dest: 'Delhi NCR Gurugram', time: '3–5 Days', fare: '₹45,000' }
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
            Clear answers regarding zero-downtime shifting, IT server moves, workstation carpentry, and insurance.
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            {
              q: 'How does Packer Solutions guarantee zero business downtime?',
              a: 'We conduct physical/digital surveys in advance, prepare floor-wise alphanumeric asset tags, and execute moves during weekends (Friday evening to Sunday night) so your teams arrive at fully operational desks on Monday morning.'
            },
            {
              q: 'How do you handle sensitive servers and IT infrastructure?',
              a: 'Our certified technical crews use anti-static ESD bubble cushioning, specialized server rack cradles, tagged cable organizers, and air-suspension covered container vehicles for zero transit vibration.'
            },
            {
              q: 'Do you dismantle and reassemble modular workstations and conference tables?',
              a: 'Yes. Our experienced modular furniture carpenters dismantle workstations, number every component, and precisely reassemble them in your new office matching your approved layout plan.'
            },
            {
              q: 'How are commercial office shifting charges estimated?',
              a: 'Pricing is based on office square footage, workstation count, IT infrastructure density, container vehicle size, manpower requirement, and building access conditions (lifts, floor levels).'
            },
            {
              q: 'Can we book a free on-site physical survey for our corporate office?',
              a: 'Yes. A senior Move Consultant will visit your facility to inspect equipment volume, calculate CFT, examine loading docks, and provide an itemized corporate proposal.'
            },
            {
              q: 'Do you provide transit insurance for commercial relocations?',
              a: 'Yes. We offer comprehensive all-risk transit insurance covering electronic hardware, office furniture, architectural glass, and commercial assets.'
            },
            {
              q: 'Can you move office branches between different cities?',
              a: 'Yes. We manage domestic intercity office relocations nationwide with dedicated locked container trucks, digital dockets, and E-way bill compliance.'
            },
            {
              q: 'Do you offer temporary commercial warehouse storage?',
              a: 'Yes. Secure, CCTV-monitored, fire-compliant warehouse space is available for short-term and long-term storage of office inventory, surplus desks, and archived documents.'
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
              Ready to Relocate Your Office with Zero Downtime?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 w-full leading-relaxed">
              Partner with Packer Solutions for seamless, organized corporate office relocation. Schedule a free on-site survey, understand your logistics plan, and receive a competitive, transparent quotation tailored to your enterprise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenEnquiry}
              id="office-final-cta-btn"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Your Free Office Relocation Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3.5 rounded-2xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Corporate Desk: +91 98765 43210</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Corporate Support: <strong>+91 98765 43210</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Corporate: <strong>Instant Chat</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Operations: <strong>24/7 Weekend Shifts</strong></span>
          </div>
        </div>
      </section>

    </div>
  );
};
