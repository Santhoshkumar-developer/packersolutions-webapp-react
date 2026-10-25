import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Home, 
  Truck, 
  CreditCard, 
  Download, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Check, 
  Sliders, 
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';
import { BookingModel } from './types';

interface BookingCardProps {
  booking: BookingModel;
  onViewDetails: (booking: BookingModel) => void;
  onTrackBooking: (booking: BookingModel) => void;
  onManageBooking: (booking: BookingModel) => void;
  onPayNow: (booking: BookingModel) => void;
  onViewPayments: (booking: BookingModel) => void;
  onDownloadReceipt: (booking: BookingModel) => void;
}

const STAGES = [
  'Booking Confirmed',
  'Survey',
  'Packing',
  'Loading',
  'In Transit',
  'Delivered'
];

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewDetails,
  onTrackBooking,
  onManageBooking,
  onPayNow,
  onViewPayments,
  onDownloadReceipt,
}) => {
  // Toggle for tracker & extra details
  const [showTrackerDetails, setShowTrackerDetails] = useState(false);

  const isPaid = booking.pendingAmount <= 0;
  const paymentPercent = Math.round((booking.paidAmount / booking.totalAmount) * 100);

  // Status badge colors
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Transit':
        return 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Payment Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all p-3.5 sm:p-4 text-left">
      
      {/* 1. Main Header & Front Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        
        {/* Left Meta: ID, Service, Route */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-black text-xs shrink-0">
            PS
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-extrabold text-slate-900">{booking.ticketId}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-sans font-medium">{booking.serviceType}</span>
          </div>

          <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusBadge()}`}>
            ● {booking.status}
          </span>

          {/* Inline Route Display */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <span className="text-emerald-700">{booking.pickup.city}</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />
            <span className="text-red-700">{booking.drops[0]?.city}</span>
          </div>
        </div>

        {/* Right Side: Primary Actions displayed in front */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
          {booking.pendingAmount > 0 && (
            <button
              type="button"
              onClick={() => onPayNow(booking)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay ₹{booking.pendingAmount.toLocaleString('en-IN')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onTrackBooking(booking)}
            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Track</span>
          </button>

          <button
            type="button"
            onClick={() => onManageBooking(booking)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sliders className="w-3 h-3 text-slate-500" />
            <span>Manage</span>
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(booking)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 2. Compact Data Strip (Shifting details + Payment summary side-by-side) */}
      <div className="pt-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
        
        {/* Shifting metadata tags */}
        <div className="flex flex-wrap items-center gap-2 text-slate-600">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 font-medium">
            <Calendar className="w-3 h-3 text-red-600" />
            <span>{booking.shiftingDate}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 font-medium">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>{booking.timeSlot}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 font-medium">
            <Home className="w-3 h-3 text-orange-600" />
            <span>{booking.houseSize}</span>
          </div>

          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-500 text-[11px]">
            {booking.totalItemsCount} items
          </span>
        </div>

        {/* Compact Payment Info & Tracker Toggle Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[11px] text-slate-400 font-sans">Total:</span>
            <span className="font-extrabold text-slate-900">₹{booking.totalAmount.toLocaleString('en-IN')}</span>

            <span className="text-slate-300">|</span>

            <span className="text-[11px] text-emerald-600 font-sans">Paid:</span>
            <span className="font-extrabold text-emerald-700">₹{booking.paidAmount.toLocaleString('en-IN')}</span>

            {booking.pendingAmount > 0 ? (
              <>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-amber-600 font-sans">Pending:</span>
                <span className="font-extrabold text-red-600">₹{booking.pendingAmount.toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-sans">
                Fully Paid
              </span>
            )}
          </div>

          {/* Toggle Button for Tracker & Breakdown */}
          <button
            type="button"
            onClick={() => setShowTrackerDetails(!showTrackerDetails)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border ${
              showTrackerDetails 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{showTrackerDetails ? 'Hide Tracker' : 'View Tracker'}</span>
            {showTrackerDetails ? (
              <ChevronUp className="w-3.5 h-3.5 text-red-600" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>

      </div>

      {/* 3. Collapsible Details & Progress Tracker */}
      {showTrackerDetails && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3.5 animate-in fade-in duration-150">
          
          {/* Horizontal Booking Progress Indicator (hidden on Cancelled) */}
          {booking.status !== 'Cancelled' && (
            <div className="py-2 px-1">
              <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute left-3 right-3 top-3 h-0.5 bg-slate-200 -z-0" />
                
                {/* Active filled line */}
                <div 
                  className="absolute left-3 top-3 h-0.5 bg-emerald-500 -z-0 transition-all duration-300" 
                  style={{ width: `${Math.min(100, (booking.progressStage / (STAGES.length - 1)) * 100)}%` }} 
                />

                {STAGES.map((stg, idx) => {
                  const isCompleted = idx < booking.progressStage;
                  const isCurrent = idx === booking.progressStage;

                  return (
                    <div key={stg} className="relative z-10 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                        isCompleted 
                          ? 'bg-emerald-500 text-white shadow-2xs ring-2 ring-emerald-100' 
                          : isCurrent 
                          ? 'bg-red-600 text-white shadow-xs ring-3 ring-red-100 scale-105' 
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}>
                        {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] mt-1 font-bold text-center whitespace-nowrap ${
                        isCurrent 
                          ? 'text-red-600 font-extrabold' 
                          : isCompleted 
                          ? 'text-slate-800' 
                          : 'text-slate-400 font-normal'
                      }`}>
                        {stg}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Info Strip in Toggled Details */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-slate-500">Move Lead:</span>
              <span className="font-bold text-slate-800">{booking.assignedTeam?.leadName || 'Assigned on packing day'}</span>
              {booking.assignedTeam?.verified && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onViewPayments(booking)}
                className="text-slate-600 hover:text-slate-900 font-semibold underline text-[11px] cursor-pointer"
              >
                Payment Breakdown
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => onDownloadReceipt(booking)}
                className="text-red-600 hover:text-red-700 font-semibold underline text-[11px] cursor-pointer flex items-center gap-0.5"
              >
                <Download className="w-3 h-3" />
                <span>Receipt</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
