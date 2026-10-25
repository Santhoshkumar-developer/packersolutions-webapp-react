import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Truck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Check, 
  Navigation, 
  ShieldCheck, 
  Share2, 
  Maximize2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { BookingModel } from './types';

interface BookingTrackingViewProps {
  booking: BookingModel;
  onBack: () => void;
  onContactSupport: (booking: BookingModel) => void;
}

const TRACKING_STEPS = [
  { id: 'confirmed', label: 'Booking Confirmed' },
  { id: 'survey', label: 'Survey Completed' },
  { id: 'packing', label: 'Packing Completed' },
  { id: 'loaded', label: 'Items Loaded' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'destination', label: 'Reached Destination' },
  { id: 'unloading', label: 'Unloading' },
  { id: 'delivered', label: 'Delivered' },
];

export const BookingTrackingView: React.FC<BookingTrackingViewProps> = ({
  booking,
  onBack,
  onContactSupport,
}) => {
  const [copied, setCopied] = useState(false);
  const telemetry = booking.telemetry || {
    currentStage: 'In Transit',
    lastUpdated: '12 minutes ago',
    vehicleNumber: 'TN 38 BK 9021',
    driverName: 'K. Murugan',
    driverPhone: '+91 94432 10987',
    driverRating: 4.9,
    currentLocation: 'NH 544 Expressway near Salem Bypass Hub',
    eta: 'Today, 06:30 PM',
    speedKmH: 62,
    distanceRemainingKm: 210
  };

  // Determine current index based on booking status
  let activeIndex = 4; // Default 'In Transit'
  if (booking.status === 'Delivered') activeIndex = 7;
  else if (booking.status === 'Confirmed') activeIndex = 1;
  else if (booking.status === 'Packing Scheduled') activeIndex = 2;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">Booking:</span>
              <span className="text-sm font-black font-mono text-slate-900">#{booking.ticketId}</span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                ● {booking.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">Track Your Move</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Tracking'}</span>
          </button>

          <button
            type="button"
            onClick={() => onContactSupport(booking)}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Support Desk</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid: Left Map + Vehicle Card, Right Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Map & Driver Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Map Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Map Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Live Satellite GPS Telemetry</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Last Updated: {telemetry.lastUpdated}
              </span>
            </div>

            {/* Simulated Live Route Canvas */}
            <div className="relative h-72 sm:h-80 bg-slate-950 flex items-center justify-center overflow-hidden p-6">
              {/* Map grid lines background */}
              <div 
                className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
              />

              {/* Highway Route Arc */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                <path
                  d="M 60 220 Q 300 70 540 180"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 220 Q 300 70 540 180"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>

              {/* Origin Marker */}
              <div className="absolute left-10 bottom-12 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-emerald-950">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-white mt-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                  {booking.pickup.city}
                </span>
              </div>

              {/* Active Truck Marker */}
              <div className="absolute left-[54%] top-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-red-400/40 animate-bounce">
                  <Truck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs font-black text-white bg-red-600 px-2.5 py-1 rounded-full shadow-md font-mono">
                    {telemetry.speedKmH} km/h • {telemetry.distanceRemainingKm} km to drop
                  </span>
                </div>
              </div>

              {/* Destination Marker */}
              <div className="absolute right-10 bottom-24 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-red-950">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-white mt-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                  {booking.drops[0]?.city}
                </span>
              </div>
            </div>

            {/* Real-time Location Bar */}
            <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-600" />
                <span className="text-slate-500">Current Position:</span>
                <span className="font-extrabold text-slate-900">{telemetry.currentLocation}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-slate-500">Estimated Arrival:</span>
                <span className="font-black text-slate-900">{telemetry.eta}</span>
              </div>
            </div>
          </div>

          {/* Vehicle & Driver Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Logistics Pilot</span>
                <h4 className="text-base font-black text-slate-900">{telemetry.driverName}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                  <span className="font-mono font-bold text-slate-800">{telemetry.vehicleNumber}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">★ {telemetry.driverRating} Rating</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${telemetry.driverPhone}`}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </a>

              <button
                type="button"
                onClick={() => onContactSupport(booking)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Progress Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-black text-slate-900">Relocation Journey</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {booking.status}
            </span>
          </div>

          <div className="relative pl-7 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx < activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.id} className="relative">
                  {/* Node Icon on spine */}
                  <div className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : isCurrent 
                      ? 'bg-red-600 text-white ring-4 ring-red-100 animate-pulse' 
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </div>

                  <div className={`p-3 rounded-xl border transition-colors ${
                    isCurrent 
                      ? 'bg-red-50/50 border-red-200 shadow-2xs' 
                      : isCompleted 
                      ? 'bg-slate-50 border-slate-100' 
                      : 'border-transparent text-slate-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-extrabold ${isCurrent ? 'text-red-700' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase text-red-600 bg-red-100 px-2 py-0.5 rounded">
                          Live Now
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
