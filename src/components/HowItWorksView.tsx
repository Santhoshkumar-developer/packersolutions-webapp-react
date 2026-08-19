import React, { useState } from 'react';
import { 
  ClipboardCopy, 
  PhoneCall, 
  Truck, 
  PackageCheck, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  ThumbsUp,
  MapPin,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (page: string) => void;
  onOpenBooking: (serviceId: string, city: string) => void;
}

type StepType = 'survey' | 'quote' | 'packing' | 'loading' | 'transit' | 'unpacking';

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<StepType>('survey');

  // Milestone stages
  const steps = [
    {
      id: 'survey' as StepType,
      number: '01',
      title: 'Free Digital Survey',
      shortDesc: 'Instant inventory logging with our smart checklist or phone call.',
      detailedDesc: 'Tell us what you need to move via our user-friendly online form, or schedule a brief 5-minute video call. Our AI-assisted pricing estimator categorizes your items to recommend the perfect vehicle size (e.g. Tata Ace, Bolero, or 14-ft container) and crew count.',
      icon: ClipboardCopy,
      color: 'from-blue-500 to-indigo-500',
      duration: '5 - 10 Minutes',
      checklist: [
        'Interactive items logging sheet',
        'Optional video inspection for large villas',
        'Dedicated shifting supervisor assigned instantly',
        'Zero-obligation estimation'
      ]
    },
    {
      id: 'quote' as StepType,
      number: '02',
      title: 'Guaranteed Quoted Tariff',
      shortDesc: 'Transparent cost matrix with absolute zero hidden fees.',
      detailedDesc: 'Receive a legally binding, itemized digital quotation. Unlike traditional movers who inflate prices on shifting day, our price is locked. This covers tolls, regional road permits, parking fees, fuel surcharge, and premium carton box allowance.',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-500',
      duration: 'Instant Output',
      checklist: [
        'Locked-in quote with zero surprise surcharges',
        'Fully itemized GST-compliant invoices',
        'Customize insurance coverage options',
        'Flexible reschedule window up to 24h prior'
      ]
    },
    {
      id: 'packing' as StepType,
      number: '03',
      title: 'Multi-Layer Guard Packing',
      shortDesc: 'High-grade bubble wraps, heavy-duty cartons & edge guards.',
      detailedDesc: 'Our trained crew arrives on time with professional packing gear. We use 3-ply corrugated cartons for general items, foam wrappers for glasswares, thermocol sheets for fragile electronics, and heavy-duty edge guards to safeguard wooden/marble furniture.',
      icon: PackageCheck,
      color: 'from-teal-500 to-emerald-500',
      duration: '1 - 3 Hours',
      checklist: [
        '5-layer protection for luxury furniture & TVs',
        'Crush-resistant carton packaging for books & crockery',
        'Waterproof stretch film wraps for fabric sofas & mattresses',
        'Clear labeling and custom tracking barcodes'
      ]
    },
    {
      id: 'loading' as StepType,
      number: '04',
      title: 'Safe Loading & Securing',
      shortDesc: 'Perfect weight distribution to prevent shifting damage.',
      detailedDesc: 'Loading is a science. Our loaders organize heavy furniture at the bottom, distribute weight uniformly to avoid lateral movement during transit, and securely fasten fragile packages. We use modern tail-lifts and ramp loaders to avoid shocks.',
      icon: Truck,
      color: 'from-violet-500 to-purple-500',
      duration: '45 - 90 Minutes',
      checklist: [
        'Professional rubber-padded security straps',
        'Heavy items positioned to stabilize the truck center',
        'Trained loaders with safety harnesses and grip gloves',
        'Sanitized, closed-body dry container trucks'
      ]
    },
    {
      id: 'transit' as StepType,
      number: '05',
      title: 'Real-Time Tracked Transit',
      shortDesc: 'Constant GPS tracking & continuous route updates.',
      detailedDesc: 'Your belongings travel safely inside our weather-proof container vehicles. We monitor regional road delays, city entry restriction timings, and bad weather loops to ensure smooth, uninterrupted transit. You receive SMS notifications with active milestones.',
      icon: MapPin,
      color: 'from-rose-500 to-pink-500',
      duration: 'Varies by Distance',
      checklist: [
        'SMS & digital tracking links',
        'Experienced national route drivers',
        'All-weather closed-container safety protection',
        'Instant helpline for continuous driver coordination'
      ]
    },
    {
      id: 'unpacking' as StepType,
      number: '06',
      title: 'Unpacking & Room Placement',
      shortDesc: 'Careful unloading and structural furniture assembly.',
      detailedDesc: 'We don’t just drop boxes at your doorstep. Our team carries all items inside, unboxes and checks each package against the checklist, assembles main beds/tables, and places major appliances exactly where you want them in your new home.',
      icon: ThumbsUp,
      color: 'from-sky-500 to-cyan-500',
      duration: '1 - 2 Hours',
      checklist: [
        'Systematic unloading and home cartage',
        'Assisted structural furniture re-assembly',
        'Unpacking of designated premium fragile cartons',
        'Debris cleanup and immediate box removal options'
      ]
    }
  ];

  const currentStep = steps.find(s => s.id === activeTab) || steps[0];
  const StepIcon = currentStep.icon;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans transition-colors duration-200">
      
      {/* ==================== HERO HEADER ==================== */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 px-4 text-center relative overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/25 text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Seamless 6-Step Logistics Blueprint
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans leading-tight">
            How Shifting Works: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-teal-400">Step-by-Step</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            From the initial digital inventory log to setting up your heavy furniture at the new destination, discover how our premium container fleet ensures an absolute damage-free shifting experience.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onOpenBooking('household-shifting', 'Bangalore')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center gap-2"
            >
              Start Shifting Flow <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('interactive-timeline-hub');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Explore Interactive Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* ==================== VALUE STATS GRID ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 shrink-0 border border-orange-100 dark:border-orange-900/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">₹10 Lakh Safe Warranty</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Full accidental coverage for luxury goods, glassware, electronics, and heavy sofas during national road travel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:border-l md:border-slate-100 dark:md:border-slate-800 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 border border-teal-100 dark:border-teal-900/50">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">On-Time Arrival Guarantee</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                If our packing crew delays arrival by more than 30 minutes without prior notice, get ₹500 instant cashback deduction.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:border-l md:border-slate-100 dark:md:border-slate-800 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100 dark:border-blue-900/50">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">No-Broker Direct Pricing</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We own our trucks and warehouse hubs. Bypassing third-party brokers saves up to 40% on local and interstate moves.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE TIMELINE PORTAL ==================== */}
      <section id="interactive-timeline-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-10">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-widest block">Interactive Walkthrough</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
            Explore the Moving Process
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
            Click through our operational milestones below to understand exactly what happens at each stage of your relocations.
          </p>
        </div>

        {/* Outer Grid for tabs and content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Step Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {steps.map((st) => {
              const isActive = st.id === activeTab;
              const StepIconCmp = st.icon;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveTab(st.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all border flex items-center gap-4 cursor-pointer relative overflow-hidden group ${
                    isActive 
                      ? 'bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-900/50 shadow-lg ring-2 ring-orange-500/10' 
                      : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Active background highlight strip */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-amber-500" />
                  )}

                  {/* Icon Circle */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    isActive ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}>
                    <StepIconCmp className="w-5 h-5" />
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider">MILESTONE {st.number}</span>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      isActive ? 'text-orange-600 dark:text-orange-400 font-bold' : 'text-slate-700 dark:text-slate-200'
                    }`}>
                      {st.title}
                    </h3>
                  </div>

                  <ChevronRight className={`w-4 h-4 ml-auto text-slate-300 dark:text-slate-600 transition-transform ${
                    isActive ? 'text-orange-500 translate-x-1' : 'group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Content Window */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/70 dark:border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
            {/* Background absolute graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-800/40 rounded-bl-full pointer-events-none -z-10" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStep.color} text-white flex items-center justify-center shadow-md`}>
                  <StepIcon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Operational Phase {currentStep.number}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{currentStep.title}</h3>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 inline-flex items-center gap-1.5 self-start sm:self-center">
                <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                Est. Duration: {currentStep.duration}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">How it actually works</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  {currentStep.detailedDesc}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Phase Checklist & Quality Guard</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentStep.checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100/70 dark:border-slate-700/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Ready to begin?</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Book household shifting now and locks this transparent flow.</p>
              </div>
              <button 
                onClick={() => onOpenBooking('household-shifting', 'Bangalore')}
                className="bg-slate-900 dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                Instant Digitized Estimation <ChevronRight className="w-3.5 h-3.5 text-orange-400 dark:text-white" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== DETAILED FAQS AND GUARANTEES ==================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8 relative overflow-hidden">
          {/* Subtle background grids */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest block">Customer Support Guard</span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Transparency & Safety Policies</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Shifting homes is highly stressful. We built custom safeguards into our step-by-step processes to ensure you never have to deal with missing items, rude crews, or double-priced bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 relative z-10">
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                What if an item is damaged during packing?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Our packing crews take complete accountability. Every item is verified and matched against barcodes. If any item is accidentally damaged during loading, packing, or road transit, we compensate you with a direct insurance claim payout of up to ₹10 Lakhs.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Do you charge extra for stairs/lifts?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Absolutely not. Our quotation includes all local ground factors such as high floors, long walking distance to society gate, lift accessibility, or staircase labor. There are zero surprise surcharges on moving day.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Can I reschedule my shifting slot?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Yes, completely free of charge! You can reschedule your booking date or timing window up to 24 hours prior to the slot. Simply click on your ticket tracking link or call your personal shifting supervisor.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Do packers help in wall-mounting TVs?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Our standard team disassembles beds, dining tables, and handles appliances. If you require specialized electrician or carpenter services (like drill-mounting TVs, fitting wall-clocks, or geyser uninstallations), you can add these add-ons during checkout.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center relative z-10 space-y-4">
            <p className="text-xs text-slate-400 font-medium">Have an unusual moving scenario or heavy cargo requirement?</p>
            <button 
              onClick={() => onOpenBooking('domestic-relocation', 'Bangalore')}
              className="bg-white text-slate-900 font-semibold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer hover:bg-slate-100 shadow-lg inline-flex items-center gap-1.5"
            >
              Consult Shifting Expert Now <PhoneCall className="w-4 h-4 text-orange-500" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
