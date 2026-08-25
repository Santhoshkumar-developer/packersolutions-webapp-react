/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Truck, 
  TrendingUp, 
  Wallet, 
  CalendarCheck, 
  ShieldCheck, 
  Fuel, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  FileCheck2, 
  UserCheck, 
  Clock, 
  PhoneCall, 
  Award,
  Sparkles,
  MapPin,
  Car,
  Check,
  Percent,
  Calculator,
  Headphones,
  BellRing,
  Navigation,
  DollarSign
} from 'lucide-react';
import { CITIES_DATA } from '../data/cities';

interface DrivingPartnerViewProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenRegisterModal?: () => void;
  onRegisterSuccess?: (partnerData: { name: string; phone: string; city: string; vehicle: string; ticketId: string }) => void;
}

export const DrivingPartnerView: React.FC<DrivingPartnerViewProps> = ({
  onNavigate,
  onOpenRegisterModal,
  onRegisterSuccess
}) => {
  // Inline Quick Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCity, setApplicantCity] = useState('Bangalore');
  const [applicantVehicleType, setApplicantVehicleType] = useState('Tata Ace / 8ft Pickup');
  const [applicantFleetSize, setApplicantFleetSize] = useState('1 Vehicle (Owner-cum-Driver)');
  const [applicantExperience, setApplicantExperience] = useState('1-3 Years');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState('');

  // Interactive Earning Calculator State
  const [calcVehicle, setCalcVehicle] = useState<'small' | 'medium' | 'large'>('small');
  const [calcDaysPerWeek, setCalcDaysPerWeek] = useState(6);
  const [calcTripsPerDay, setCalcTripsPerDay] = useState(3);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Vehicle Earning Rates Matrix
  const vehicleOptions = [
    {
      id: 'small',
      name: '6–10 feet Mini-Trucks',
      examples: 'Tata Ace, Chota Hathi, Mahindra Bolero Maxx, 8ft Pickup',
      metroRate: '₹16–21/km',
      outstationRate: '₹18–23/km',
      weeklyAvg: 11500,
      monthlyAvg: 42000,
      badge: 'Most Popular for Intra-City',
      icon: '🚚',
      ratePerTrip: 850
    },
    {
      id: 'medium',
      name: '12–20 feet Heavy Pickups',
      examples: 'Eicher 14ft, 17ft, 19ft, Tata 407, Ashok Leyland Dost/Bada Dost',
      metroRate: '₹21–32/km',
      outstationRate: '₹24–38/km',
      weeklyAvg: 16500,
      monthlyAvg: 68000,
      badge: 'High Demand for 2-3 BHKs',
      icon: '🚛',
      ratePerTrip: 1450
    },
    {
      id: 'large',
      name: '20+ feet Commercial Containers',
      examples: '20ft, 24ft, 32ft MXL Multi-Axle, Taurus Containers',
      metroRate: '₹35–42/km',
      outstationRate: '₹38–42+/km',
      weeklyAvg: 23000,
      monthlyAvg: 95000,
      badge: 'Maximum Interstate Earnings',
      icon: '🏢',
      ratePerTrip: 2400
    }
  ];

  // Earning Calculations
  const currentVehicleData = vehicleOptions.find(v => v.id === calcVehicle) || vehicleOptions[0];
  const calculatedWeeklyEarnings = currentVehicleData.ratePerTrip * calcTripsPerDay * calcDaysPerWeek;
  const calculatedMonthlyEarnings = Math.round(calculatedWeeklyEarnings * 4.33);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    const generatedId = `PARTNER-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPartner = {
      id: generatedId,
      userName: applicantName,
      userPhone: applicantPhone,
      serviceName: `Delivery Partner Application (${applicantVehicleType})`,
      movingFrom: applicantCity,
      movingTo: applicantFleetSize,
      status: "Application Under Review",
      createdAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('packers_bookings') || '[]';
      const parsed = JSON.parse(stored);
      parsed.unshift(newPartner);
      localStorage.setItem('packers_bookings', JSON.stringify(parsed));
    } catch (err) {
      console.error('Storage error:', err);
    }

    setSubmittedTicketId(generatedId);
    setFormSubmitted(true);

    if (onRegisterSuccess) {
      onRegisterSuccess({
        name: applicantName,
        phone: applicantPhone,
        city: applicantCity,
        vehicle: applicantVehicleType,
        ticketId: generatedId
      });
    }
  };

  const partnerTestimonials = [
    {
      id: 'rajesh-blr',
      name: 'Rajesh Kumar',
      city: 'Bangalore',
      locality: 'Koramangala & Whitefield',
      journey: 'Started with 1 Tata Ace in 2018 → Now owns 3 commercial vehicles',
      earnings: '₹16,000 → ₹38,000/mo per truck',
      quote: 'Joined with 1 truck, now own 3 vehicles. Earn ₹30,000 to ₹38,000 per truck monthly. Weekly payouts are credited without single day delay.',
      rating: 5,
      vehicleType: 'Tata Ace & 14ft Eicher Fleet',
      verifiedYears: 'Partner since 2018'
    },
    {
      id: 'vikram-delhi',
      name: 'Vikram Singh',
      city: 'Delhi NCR',
      locality: 'Gurgaon, Noida & Faridabad',
      journey: 'Single Bolero Pickup owner → 2 Eicher Trucks',
      earnings: '₹18,000 → ₹35,000/mo',
      quote: 'Payment is reliable since 2015. Consistent trips keep my vehicle running every single day with zero dry runs or idle stand waits.',
      rating: 5,
      vehicleType: 'Mahindra Bolero Pickup',
      verifiedYears: 'Partner since 2015'
    },
    {
      id: 'priya-mumbai',
      name: 'Priya Patel',
      city: 'Mumbai',
      locality: 'Thane, Navi Mumbai & Andheri',
      journey: 'Fleet Manager running 4 commercial vehicles',
      earnings: '₹22,000 → ₹42,000/mo per truck',
      quote: 'Better than street bookings or stand waiting. Packer Solutions keeps orders flowing daily with transparent customer loading coordination.',
      rating: 5,
      vehicleType: 'Tata 407 & 17ft Container',
      verifiedYears: 'Partner since 2019'
    },
    {
      id: 'murugan-cbe',
      name: 'Murugan Selvam',
      city: 'Coimbatore',
      locality: 'Gandhipuram & RS Puram',
      journey: 'Local tempo operator → Certified Intercity Relocation Captain',
      earnings: '₹14,000 → ₹32,000/mo',
      quote: 'No need to beg for loads at goods sheds. App gives automated route assignments for Coimbatore to Bangalore & Chennai moves.',
      rating: 5,
      vehicleType: 'Tata Ace HT',
      verifiedYears: 'Partner since 2020'
    },
    {
      id: 'santosh-hyd',
      name: 'Santosh Reddy',
      city: 'Hyderabad',
      locality: 'Hitech City & Gachibowli',
      journey: 'Attached 1 Bolero in 2021 → Added 3 more vehicles in 2024',
      earnings: '₹17,000 → ₹36,000/mo',
      quote: 'The fuel discount card and commercial insurance subsidies saved me ₹6,000 extra per month. Very supportive driver helpdesk team.',
      rating: 5,
      vehicleType: 'Bolero Maxx Maxi Truck',
      verifiedYears: 'Partner since 2021'
    },
    {
      id: 'aniket-pune',
      name: 'Aniket Deshmukh',
      city: 'Pune',
      locality: 'Hinjewadi, Wakad & Kharadi',
      journey: 'Independent driver → Full-time Packer Solutions logistics partner',
      earnings: '₹15,000 → ₹34,000/mo',
      quote: 'Zero idle days. Back-to-back corporate apartment shifting trips in Pune IT corridors. Payouts arrive directly into my SBI account every Tuesday.',
      rating: 5,
      vehicleType: 'Ashok Leyland Dost+',
      verifiedYears: 'Partner since 2022'
    }
  ];

  const faqs = [
    {
      q: "How much is the registration fee?",
      a: "The registration requires only a nominal onboarding charge of ₹500 which covers your vehicle background verification, safety inspection badge, and official driver uniform kit. This fee is 100% fully refundable upon completing your first 10 successful shifting trips!"
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Earnings are automatically settled every single Tuesday directly to your registered bank account via IMPS/NEFT without any manual withdrawal hassle or hidden platform commission deductions. You can track real-time trip fare balances inside the Driver App."
    },
    {
      q: "Can I own or attach multiple vehicles?",
      a: "Yes! Packer Solutions offers a dedicated Fleet Vendor Management portal. You can onboard from 1 single vehicle to a fleet of 50+ trucks with individual driver assignments, supervisor tracking dashboards, and consolidated weekly company statements."
    },
    {
      q: "What if my vehicle breaks down during an active shifting trip?",
      a: "Our 24/7 on-road vendor support team provides immediate breakdown assistance and dispatches an emergency backup relief vehicle from our nearest local hub. Your trip fare is protected, and customers receive seamless handover without penalizing your driver rating."
    },
    {
      q: "Can I refer other driver friends and earn bonuses?",
      a: "Yes! Under our 'Saathi Referral Program', you earn an instant cash bonus of ₹2,000 for every commercial vehicle owner you refer once they complete 5 successful trips on the network. There is zero limit to how many partners you can refer."
    },
    {
      q: "What are the working hours or shift commitments?",
      a: "You have 100% flexibility. You can drive full-time (6-7 days/week for maximum earnings), part-time during weekends, or choose specialized high-earning outstation highway long-haul routes as per your personal schedule."
    }
  ];

  const scrollToApply = () => {
    document.getElementById('partner-apply-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLearnMore = () => {
    document.getElementById('partner-value-props')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="driving-partner-landing-page" className="bg-white dark:bg-[#070d19] text-slate-900 dark:text-slate-100 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Earnings Potential + Trust Signals */}
      {/* ========================================================================= */}
      <section id="partner-hero-section" className="relative bg-gradient-to-b from-[#001261] via-[#051870] to-[#001261] text-white pt-12 sm:pt-16 pb-20 sm:pb-24 overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-300">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>B2B Logistics &amp; Delivery Partner Network</span>
                <span className="text-white/40">•</span>
                <span className="text-white">Pan-India Hiring</span>
              </div>

              {/* Exact Primary Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.15] text-white">
                Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">₹30,000–₹40,000/month</span> as a Packer Solutions Delivery Partner
              </h1>

              {/* Exact Subheading */}
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl">
                Join India&apos;s fastest-growing household shifting logistics network with <strong className="text-white font-bold">900+ vehicles</strong> &amp; consistent orders.
              </p>

              {/* 4 Quick Stat Micro-Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                  <div className="text-xl sm:text-2xl font-black text-amber-300">900+</div>
                  <div className="text-[11px] font-semibold text-slate-300">Active Vehicles</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                  <div className="text-xl sm:text-2xl font-black text-emerald-300">₹15K/wk</div>
                  <div className="text-[11px] font-semibold text-slate-300">Avg Weekly Earn</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                  <div className="text-xl sm:text-2xl font-black text-cyan-300">48-72h</div>
                  <div className="text-[11px] font-semibold text-slate-300">Fast Approval</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                  <div className="text-xl sm:text-2xl font-black text-orange-300">Every Tue</div>
                  <div className="text-[11px] font-semibold text-slate-300">Weekly Payouts</div>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  id="btn-hero-join-partner"
                  onClick={scrollToApply}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Join as Partner</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                <button
                  id="btn-hero-learn-more"
                  onClick={scrollToLearnMore}
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  No security deposit risk
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Fuel &amp; toll subsidies
                </span>
              </div>
            </div>

            {/* Right Hero Lead Capture Form Card */}
            <div id="partner-apply-section" className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                  Express Registration
                </div>

                {!formSubmitted ? (
                  <>
                    <div className="text-left mb-5">
                      <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Attach Your Vehicle &amp; Start
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Fill in basic details for instant callback &amp; document pickup.
                      </p>
                    </div>

                    <form onSubmit={handleApplicationSubmit} className="space-y-3.5 text-left">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Driver / Owner Full Name *
                        </label>
                        <input
                          id="partner-input-name"
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Active WhatsApp / Mobile Number *
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
                            +91
                          </span>
                          <input
                            id="partner-input-phone"
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="10-digit mobile number"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Operating City *
                          </label>
                          <select
                            id="partner-select-city"
                            value={applicantCity}
                            onChange={(e) => setApplicantCity(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            {CITIES_DATA.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Vehicle Category *
                          </label>
                          <select
                            id="partner-select-vehicle"
                            value={applicantVehicleType}
                            onChange={(e) => setApplicantVehicleType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="Tata Ace / 8ft Pickup">Tata Ace / 8ft Pickup (6–10 ft)</option>
                            <option value="Mahindra Bolero Pickup">Bolero Pickup (8–10 ft)</option>
                            <option value="Eicher 14ft / 17ft">Eicher 14ft / 17ft (12–20 ft)</option>
                            <option value="Tata 407 / Dost">Tata 407 / Ashok Leyland Dost</option>
                            <option value="20ft+ Container Truck">20ft / 32ft Container Truck (20+ ft)</option>
                            <option value="Two Wheeler / Express Rider">Two Wheeler (Cargo Rider)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Fleet Size / Ownership
                        </label>
                        <select
                          id="partner-select-fleet"
                          value={applicantFleetSize}
                          onChange={(e) => setApplicantFleetSize(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="1 Vehicle (Owner-cum-Driver)">1 Vehicle (Owner-cum-Driver)</option>
                          <option value="2-5 Vehicles (Small Fleet Vendor)">2-5 Vehicles (Small Fleet Vendor)</option>
                          <option value="6+ Vehicles (Enterprise Transporter)">6+ Vehicles (Enterprise Transporter)</option>
                        </select>
                      </div>

                      <button
                        id="btn-submit-partner-application"
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Register as Delivery Partner</span>
                      </button>

                      <p className="text-[10px] text-center text-slate-400 pt-1 font-medium">
                        By submitting, you agree to receive verification calls &amp; WhatsApp trip alerts.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      Application Submitted Successfully
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Welcome aboard, {applicantName}!
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="text-slate-400 font-semibold uppercase text-[10px]">Partner Reference ID</div>
                      <div className="font-mono text-sm font-black text-slate-900 dark:text-white">{submittedTicketId}</div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Our logistics onboarding manager in <strong>{applicantCity}</strong> will call your registered number (+91 {applicantPhone}) within <strong>24 hours</strong> for vehicle inspection and app login credentials.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline"
                    >
                      Submit another vehicle application
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VALUE PROPOSITION CARDS (4 Benefits) */}
      {/* ========================================================================= */}
      <section id="partner-value-props" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-3 py-1 rounded-full">
              Why Drive With Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              4 Proven Partner Advantages
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Modeled after India&apos;s leading logistics benchmarks to ensure maximum daily earnings, reliable payments, and zero dry-runs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: High Earnings */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-slate-700 transition-all text-left group">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                Earning Power
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                High Earnings
              </h3>
              <div className="mt-2 mb-3 inline-block bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-200/80 dark:border-amber-800/60">
                ₹12,000–₹15,000/week
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Earn healthy rates per kilometer and transparent loading/unloading allowances. High surge bonuses during peak month-end moving weekends.
              </p>
            </div>

            {/* Card 2: On-Time Payment */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-slate-700 transition-all text-left group">
              <div className="w-13 h-13 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Wallet className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                Guaranteed Cashflow
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                On-Time Payment
              </h3>
              <div className="mt-2 mb-3 inline-block bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-teal-200/80 dark:border-teal-800/60">
                Weekly Direct Deposits
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Weekly guaranteed payouts directly credited every Tuesday via driver app. Zero deductions, transparent fare audits, and instant trip breakdown.
              </p>
            </div>

            {/* Card 3: More Trips */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition-all text-left group">
              <div className="w-13 h-13 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                High Fleet Utilization
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                More Trips
              </h3>
              <div className="mt-2 mb-3 inline-block bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-blue-200/80 dark:border-blue-800/60">
                Zero Customer Hunting
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Consistent daily assignments pushed directly to your phone. Never waste fuel or hours waiting at dusty roadside tempo stands.
              </p>
            </div>

            {/* Card 4: Low Operating Costs */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-slate-700 transition-all text-left group">
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Fuel className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                Subsidies &amp; Perks
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Low Operating Costs
              </h3>
              <div className="mt-2 mb-3 inline-block bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-800/60">
                Insurance + Fuel Support
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Enjoy partner discounts on commercial vehicle insurance, fuel cards with up to ₹3/L cashback, and tire/spare part discounts at partner garages.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PARTNER SUCCESS STORIES (6+ Testimonials) */}
      {/* ========================================================================= */}
      <section id="partner-success-stories" className="py-16 sm:py-20 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                Real Partner Journeys
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Partner Success Stories
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Hear from commercial vehicle owners and fleet managers earning consistently with Packer Solutions.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              <span>20+ Top Fleet Vendors Nationwide</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTestimonials.map((story) => (
              <div 
                key={story.id}
                className="bg-slate-50/60 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between text-left hover:border-orange-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                <div>
                  {/* Top Rating & City Badge */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">5.0</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {story.city}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed my-4 italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  {/* Growth Progression Pill */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-2.5 my-3 flex items-center justify-between gap-2 text-xs">
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">Monthly Progression:</span>
                    <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">{story.earnings}</span>
                  </div>

                  {/* Journey Details */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-start gap-1.5 pt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{story.journey}</span>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {story.name}
                    </h4>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {story.vehicleType}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-1 rounded-md">
                    {story.verifiedYears}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SHIPMENT TYPES & EARNING TIERS + INTERACTIVE CALCULATOR */}
      {/* ========================================================================= */}
      <section id="partner-earning-tiers" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full">
              Rate Chart &amp; Vehicle Tiers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              Shipment Types &amp; Earning Tiers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              &ldquo;Different vehicle sizes = different income tiers. Grow your fleet as you scale.&rdquo;
            </p>
          </div>

          {/* Rate Matrix Comparison Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-black uppercase tracking-wider">
                    <th className="py-4 px-5">Vehicle Category</th>
                    <th className="py-4 px-5">Popular Models</th>
                    <th className="py-4 px-5">Metro Rate</th>
                    <th className="py-4 px-5">Outstation Rate</th>
                    <th className="py-4 px-5 text-right">Example Earning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                  {vehicleOptions.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{v.icon}</span>
                          <div>
                            <div>{v.name}</div>
                            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">{v.badge}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-400 font-medium max-w-xs">
                        {v.examples}
                      </td>
                      <td className="py-4 px-5 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.metroRate}
                      </td>
                      <td className="py-4 px-5 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.outstationRate}
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                        ₹{(v.weeklyAvg / 1000).toFixed(0)}K–₹{((v.weeklyAvg * 1.3) / 1000).toFixed(0)}K/week
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Partner Earning Potential Calculator */}
          <div className="bg-gradient-to-br from-[#001261] via-[#051870] to-[#001261] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 text-left">
            <div className="flex items-center gap-2.5 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Earnings Estimator</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Calculate Your Custom Monthly Earnings
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Select your vehicle category, weekly working days, and average daily shifting trips to view real-time income estimates.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
              
              {/* Calculator Inputs */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Vehicle Selection Chips */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    1. Select Vehicle Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {vehicleOptions.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setCalcVehicle(v.id as 'small' | 'medium' | 'large')}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          calcVehicle === v.id
                            ? 'bg-white text-slate-900 border-white shadow-lg font-bold'
                            : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                        }`}
                      >
                        <div className="text-sm font-black">{v.name.split(' ')[0]}</div>
                        <div className="text-[10px] opacity-80 truncate">{v.name.split(' ').slice(1).join(' ')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days Per Week Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      2. Working Days Per Week
                    </label>
                    <span className="text-sm font-black font-mono text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-lg">
                      {calcDaysPerWeek} Days / Week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="7"
                    step="1"
                    value={calcDaysPerWeek}
                    onChange={(e) => setCalcDaysPerWeek(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                    <span>4 Days (Part-Time)</span>
                    <span>5 Days</span>
                    <span>6 Days (Standard)</span>
                    <span>7 Days (Maximum Output)</span>
                  </div>
                </div>

                {/* Trips Per Day Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      3. Average Trips Per Day
                    </label>
                    <span className="text-sm font-black font-mono text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-lg">
                      {calcTripsPerDay} Trips / Day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={calcTripsPerDay}
                    onChange={(e) => setCalcTripsPerDay(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                    <span>1 Long Trip</span>
                    <span>2 Trips</span>
                    <span>3 Trips (Recommended)</span>
                    <span>4 Trips</span>
                    <span>5+ Express Moves</span>
                  </div>
                </div>

              </div>

              {/* Calculator Output Projection Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-center space-y-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                    Estimated Net Take-Home
                  </span>

                  <div>
                    <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Estimated Monthly Earnings</div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300 mt-1">
                      ₹{calculatedMonthlyEarnings.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/15 text-left">
                    <div className="bg-white/10 p-3 rounded-2xl">
                      <div className="text-[10px] text-slate-300 font-semibold uppercase">Weekly Payout</div>
                      <div className="text-base font-black font-mono text-white">₹{calculatedWeeklyEarnings.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl">
                      <div className="text-[10px] text-slate-300 font-semibold uppercase">Annual Gross</div>
                      <div className="text-base font-black font-mono text-emerald-300">₹{(calculatedMonthlyEarnings * 12).toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={scrollToApply}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for this Earning Tier</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS (Partner Journey) */}
      {/* ========================================================================= */}
      <section id="partner-how-it-works" className="py-16 sm:py-20 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/60 px-3 py-1 rounded-full">
              Seamless 4-Step Funnel
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              How It Works (Partner Journey)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Start earning in 4 simple steps with zero unnecessary paperwork or prolonged waiting periods.
            </p>
          </div>

          {/* 4-Step Funnel with clean horizontal flow on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg mb-5 shadow-md shadow-orange-500/20">
                  1
                </div>
                <div className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
                  Online Registration
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  Register Online
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Submit your vehicle and driver details online or via WhatsApp. Upload photo copies of RC, DL, and bank passbook.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Takes &lt; 3 Minutes</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-lg mb-5 shadow-md shadow-teal-500/20">
                  2
                </div>
                <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                  Fast Verification
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  Get Approval (48–72h)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Our local fleet team verifies commercial documents and conducts a quick 10-point vehicle safety check.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                <span>Zero Physical Red Tape</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#001261] text-white flex items-center justify-center font-black text-lg mb-5 shadow-md shadow-blue-900/20">
                  3
                </div>
                <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  App Setup &amp; Kit
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  Download Driver App
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Get your official login credentials, GPS tracking setup, safety ropes, and Packer Solutions partner uniform kit.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                <span>Android App + Free Training</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg mb-5 shadow-md shadow-emerald-500/20">
                  4
                </div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  Immediate Payouts
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  Start Earning
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Accept nearby moving bookings, complete trips with automated navigation, and receive direct bank payouts every Tuesday.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                <span>₹12K–15K/week Payout</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ONBOARDING REQUIREMENTS (Side-by-Side Comparison) */}
      {/* ========================================================================= */}
      <section id="partner-onboarding-requirements" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-3 py-1 rounded-full">
              Standard Documentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              Onboarding Requirements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              &ldquo;All standard requirements. No hidden surprises.&rdquo; Keep these documents ready for rapid 48-hour approval.
            </p>
          </div>

          {/* Side-by-Side 2 Column Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Vehicle Documents */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Vehicle Documents
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Commercial carrier registration and road fitness
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  {
                    title: 'Vehicle Registration Certificate (RC)',
                    desc: 'Commercial/Transport vehicle RC registered in driver or vendor name.',
                    icon: '📄'
                  },
                  {
                    title: 'Valid Fitness Certificate (FC)',
                    desc: 'Government RTO certified vehicle fitness certificate.',
                    icon: '🛠️'
                  },
                  {
                    title: 'Commercial Vehicle Insurance',
                    desc: 'Active comprehensive or 3rd party commercial goods insurance policy.',
                    icon: '🛡️'
                  },
                  {
                    title: 'Pollution Under Control (PUC)',
                    desc: 'Current emission test certificate with valid expiry date.',
                    icon: '💨'
                  },
                  {
                    title: 'State / National Goods Carrier Permit',
                    desc: 'Valid goods transport permit for intra-city or intercity highways.',
                    icon: '🗺️'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{item.title}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                        {item.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Owner / Driver Documents */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Owner / Driver Documents
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Driver identity, bank details &amp; background verification
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  {
                    title: 'Commercial Driving License (DL)',
                    desc: 'Valid Transport (TR) or Light Commercial Vehicle (LMV-TR) license.',
                    icon: '🪪'
                  },
                  {
                    title: 'Aadhaar Card / Address Proof',
                    desc: 'Government verified UIDAI Aadhaar card for KYC verification.',
                    icon: '🆔'
                  },
                  {
                    title: 'PAN Card (Permanent Account Number)',
                    desc: 'Required for automated TDS compliance and direct weekly payouts.',
                    icon: '💳'
                  },
                  {
                    title: 'Bank Passbook / Cancelled Cheque',
                    desc: 'Direct bank account details for automated Tuesday IMPS settlements.',
                    icon: '🏦'
                  },
                  {
                    title: 'Driver Passport Size Photo',
                    desc: 'Clear front-facing passport photo for your in-app driver profile.',
                    icon: '📷'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{item.title}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 ml-1" />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                        {item.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 text-center max-w-2xl mx-auto text-xs text-blue-900 dark:text-blue-300 font-medium">
            💡 <strong>Need help with document scan?</strong> Simply WhatsApp photos of your documents to <strong className="font-mono">+91 98765 43210</strong> and our fleet verification officer will format them for you free!
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DRIVER APP FEATURES */}
      {/* ========================================================================= */}
      <section id="partner-driver-app-features" className="py-16 sm:py-20 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full">
              Platform Technology
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              Driver App Features
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Purpose-built smartphone app designed for smooth navigation, instant bookings, and total financial transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1: Real-time GPS Tracking */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-blue-400 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">
                Real-time GPS Tracking
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Know shipment status anytime with voice-guided heavy vehicle route optimization avoiding narrow streets, low bridges, and toll congestion.
              </p>
            </div>

            {/* Feature 2: Instant Notifications */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-amber-400 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <BellRing className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">
                Instant Notifications
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Receive high-value trip offers, nearby return load matchings, weekend peak surge alerts, and incentive bonus targets straight to your screen.
              </p>
            </div>

            {/* Feature 3: Weekly Payout Tracking */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-emerald-400 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">
                Weekly Payout Tracking
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                See your earnings history, completed trip fares, toll reimbursements, customer tips, and bank settlement status in a single unified wallet.
              </p>
            </div>

            {/* Feature 4: 24/7 Dedicated Support */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-teal-400 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">
                24/7 Support
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Dedicated bilingual vendor partner helpdesk, on-road accident assistance, breakdown relief truck dispatch, and loading coordinator support.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="partner-faqs" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
              Partner Clarity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Everything you need to know about partnering with Packer Solutions.
            </p>
          </div>

          <div className="space-y-3.5 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Final CTA Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#001261] via-[#051870] to-[#001261] text-white text-center space-y-4 shadow-xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Start Earning ₹30,000–₹40,000 Every Month?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-medium">
              Join 900+ trusted vehicle captains. Register your commercial truck in 3 minutes and get verified within 48 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={scrollToApply}
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Join as Partner Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <a
                href="tel:+919876543210"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Fleet Desk (+91 98765 43210)</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
