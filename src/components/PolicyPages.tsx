import React from 'react';
import { ArrowLeft, ShieldCheck, Scale, RefreshCw, Truck, Calendar, AlertTriangle, FileText, Lock } from 'lucide-react';

interface PolicyPagesProps {
  page: 'cancellation-refund' | 'terms-conditions' | 'shipment-policy' | 'privacy-policy';
  onNavigate: (page: string) => void;
  selectedCity: string;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ page, onNavigate, selectedCity }) => {
  const getPolicyContent = () => {
    switch (page) {
      case 'cancellation-refund':
        return {
          title: 'Cancellation & Refund Policy',
          tagline: 'Transparent guidelines for booking changes, cancellations, and premium reversals',
          icon: <RefreshCw className="w-12 h-12 text-orange-500" />,
          sections: [
            {
              title: '1. Booking Reservation Deposit',
              content: 'A token booking reservation deposit (typically 10% of the total estimate or a fixed ₹1,000) is required to secure your packing team, truck allotment, and premium materials. This guarantees your shifting slot on the scheduled day.'
            },
            {
              title: '2. Standard Cancellation Window',
              content: 'We understand that plans change. You are eligible for a refund or hassle-free cancellation under the following terms:',
              bullets: [
                'Cancellation > 48 Hours before Shifting: 100% full refund of the reservation deposit.',
                'Cancellation 24 - 48 Hours before Shifting: 50% refund of the booking reservation deposit. Alternatively, you can opt for 100% free rescheduling.',
                'Cancellation < 24 Hours before Shifting: The booking deposit is non-refundable as resources, vehicle allotment, and labor crews are locked and compensated.',
                'Immediate Rescheduling: Rescheduling is free up to 24 hours prior to the slot. Within 24 hours, a nominal rescheduling charge of ₹500 may apply depending on truck availability.'
              ]
            },
            {
              title: '3. Refund Processing Timelines',
              content: 'All eligible refunds are processed instantly from our system. Depending on your financial institution, the credits will reflect in your origin payment mode (Credit Card, Debit Card, UPI, NetBanking, or Wallet) within 5 to 7 business working days.'
            },
            {
              title: '4. Non-Refundable Surcharges',
              content: 'Custom packing material customized specifically for your high-value items (such as tailor-made wooden crates for art or piano carriers) are non-refundable once crafted, even if the primary shifting is cancelled.'
            },
            {
              title: '5. Claims & Resolution Support',
              content: `For any instant queries regarding your cancellation, slot adjustment, or partial refund status in ${selectedCity}, please reach out to our dedicated Customer Resolution Desk at refunds@packersolution.com or call our hotline directly.`
            }
          ]
        };

      case 'terms-conditions':
        return {
          title: 'Terms and Conditions',
          tagline: 'Legal frameworks, user liabilities, and carrier guidelines of Packersolution Services',
          icon: <Scale className="w-12 h-12 text-orange-500" />,
          sections: [
            {
              title: '1. Services Agreement',
              content: 'Packersolution Logistics Private Limited acts as a high-security professional logistics platform. By scheduling a shift, you agree to these comprehensive terms of service, creating a binding contract between yourself and the carrier network.'
            },
            {
              title: '2. Customer Guarantees & Ownership',
              content: 'The user guarantees and confirms that they are either the legal owner or the authorized custodian of all goods being declared for shifting. Packersolution is not responsible for any ownership disputes or legal challenges regarding the consignment.'
            },
            {
              title: '3. Strictly Prohibited & Hazardous Goods',
              content: 'For supreme public road safety and regulatory compliance, the following items are strictly banned from our transport vehicles. Any hidden loading of these items will invalidate insurance coverage and result in immediate termination of carriage:',
              bullets: [
                'Flammables, toxic substances, cylinders, kerosene, matches, and chemicals.',
                'Illegal substances, contraband, firearms, ammunition, or restricted items under Indian law.',
                'Perishable items, raw meats, or live animals.',
                'High-value personal currency, original deeds, physical gold jewelry, and original academic degrees (these must be personally moved by the customer).'
              ]
            },
            {
              title: '4. Physical Stairs Walking & Lift Access Surcharges',
              content: `Estimates are generated based on elevator accessibility at both source and destination in ${selectedCity}. If elevator access is not available and stairs climbing is required beyond the 1st floor, a standard labor physical handling fee (₹150 to ₹300 per floor depending on volume) will be appended to the final invoice.`
            },
            {
              title: '5. Limitation of Liability',
              content: 'While we apply standard triple-layer military-grade bubble and foam wrap to all delicate items, our liability for any accidental transit collision, road damage, or act of God is strictly limited to the insured value declared on the digital shipment manifest prior to starting the trip.'
            }
          ]
        };

      case 'shipment-policy':
        return {
          title: 'Shipment & Carriage Policy',
          tagline: 'Packaging protocols, transit rules, and timeline estimates for national moving',
          icon: <Truck className="w-12 h-12 text-orange-500" />,
          sections: [
            {
              title: '1. Premium Packaging Standards',
              content: 'We take pride in our extreme packing standards. Every household relocation shipment includes premium materials. Our crew utilizes high-density foam, heavy-duty 5-ply corrugated sheets, bubble wrap, stretch wraps, and high-impact corner protectors.'
            },
            {
              title: '2. Transit Timelines & Delays',
              content: 'While we maintain a 98.7% on-time delivery rate, transit timelines are estimates. Actual duration may be affected by:',
              bullets: [
                'Heavy seasonal rains, extreme weather advisories, or poor visibility.',
                'Inter-state commercial checkpoint clearance delays, octroi, or high-density traffic.',
                'Local administration entry time restrictions for commercial trucks (No-Entry zones during daytime hours).'
              ]
            },
            {
              title: '3. Vehicle Choice & Logistics Sizing',
              content: 'Our team assigns professional transport vehicles based on the exact material checklist declared in the Estimator. This ranges from closed-body Tata Ace and Mahindra Bolero pickups for micro-shifting, to standard 14/17-feet Eicher closed containers for full 2-BHK or 3-BHK premium movements.'
            },
            {
              title: '4. Inter-state Documents (E-Way Bill & GST)',
              content: `For movements extending outside ${selectedCity} borders or across state limits, customers must provide valid identity records (Aadhaar, PAN) alongside any company transfer documents. Packersolution complies with GST norms and issues comprehensive e-way bills for worry-free highway checkposts transit.`
            },
            {
              title: '5. Consignee Unloading Verification',
              content: 'Upon arrival, the customer or their authorized representative must verify the condition of all packages against the master inventory list. Any discrepancy, damage, or missing item must be noted directly on the delivery receipt to process claims.'
            }
          ]
        };

      case 'privacy-policy':
        return {
          title: 'Privacy & Data Protection Policy',
          tagline: 'How we safeguard your personal details, shifting coordinates, and digital telemetry',
          icon: <Lock className="w-12 h-12 text-orange-500" />,
          sections: [
            {
              title: '1. Personal Information We Collect',
              content: 'To calculate real-time logistics estimates and dispatch our shifting fleets, we collect standard inputs including:',
              bullets: [
                'Full Name, active mobile phone number, and verified email address.',
                'Exact geographical address coordinates of your pick-up home and drop-off destination.',
                'Complete household item inventory list (to calculate the appropriate weight, volume, and truck sizing).'
              ]
            },
            {
              title: '2. Core Utilization of Customer Data',
              content: 'Your coordinates, phone numbers, and declared materials are utilized strictly for executing logistics orders. We share your moving schedule with authorized logistics coordinators and dispatch drivers exclusively during the active shifting window.'
            },
            {
              title: '3. Data Security and SSL Shielding',
              content: 'All data transmitted via our platform is secured using bank-grade AES 256-bit SSL encryption. This ensures your private coordinates and phone numbers are completely shielded from third-party interception.'
            },
            {
              title: '4. Strictly No Selling or Leasing of Personal Data',
              content: 'Unlike local aggregator models, we maintain strict privacy boundaries. Packersolution Logistics will never sell, lease, lease-purchase, or trade your personal phone numbers or household item details to third-party marketing companies, telemarketers, or cold-call networks.'
            },
            {
              title: '5. Cookies & Local Storage Usage',
              content: `Our web applet utilizes essential cookies and browser localStorage to securely remember your current shifting city selection (${selectedCity}), your reference booking IDs, and dynamic estimates, ensuring you do not lose your configurations on reload.`
            }
          ]
        };

      default:
        return {
          title: 'Policy Document',
          tagline: 'Legal terms and carrier rules',
          icon: <FileText className="w-12 h-12 text-orange-500" />,
          sections: []
        };
    }
  };

  const policy = getPolicyContent();

  const allPages = [
    { id: 'cancellation-refund', name: 'Cancellation & Refund' },
    { id: 'terms-conditions', name: 'Terms & Conditions' },
    { id: 'shipment-policy', name: 'Shipment Policy' },
    { id: 'privacy-policy', name: 'Privacy Policy' }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Page Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Navigation Menu */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 pl-2">Legal documents</h4>
              <nav className="space-y-1">
                {allPages.map((p) => {
                  const isCurrent = p.id === page;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onNavigate(p.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all text-left cursor-pointer ${
                        isCurrent 
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10' 
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-transparent'
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-lg">➔</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="bg-orange-500/5 dark:bg-orange-950/20 rounded-2xl p-4 border border-orange-100 dark:border-orange-900/40">
                  <ShieldCheck className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal font-medium">
                    Our platform is 100% compliant with IBA and GST standards across India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Policy Document Main Content */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500" />
            
            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-start gap-5 pb-8 border-b border-slate-100 dark:border-slate-800 mb-8 mt-2">
              <div className="p-3.5 bg-orange-500/10 dark:bg-orange-950/40 rounded-2xl shrink-0">
                {policy.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block font-mono">
                  Official Legal Document
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {policy.title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                  {policy.tagline}
                </p>
              </div>
            </div>

            {/* Main Detailed Sections */}
            <div className="space-y-8">
              {policy.sections.map((sect, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                    {sect.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium pl-3.5">
                    {sect.content}
                  </p>
                  
                  {sect.bullets && (
                    <ul className="pl-7 space-y-2.5">
                      {sect.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2.5 font-medium">
                          <span className="text-orange-500 text-xs mt-1 shrink-0">■</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Stamp footer */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-bold font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Digitally Certified: PACKERSOLUTION-TRUST-v4</span>
              </div>
              <span>Last Revised: July 16, 2026</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
