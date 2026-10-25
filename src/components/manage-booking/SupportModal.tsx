import React from 'react';
import { X, Phone, MessageCircle, Headphones, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { BookingModel } from './types';

interface SupportModalProps {
  booking?: BookingModel | null;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">PackerSolutions Support</h3>
              <p className="text-xs text-slate-500">24/7 Dedicated Customer Relocation Desk</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {booking && (
          <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Selected Booking:</span>
            <span className="font-mono font-black text-slate-900">#{booking.ticketId} ({booking.pickup.city} → {booking.drops[0]?.city})</span>
          </div>
        )}

        <div className="space-y-3 my-4">
          <a
            href="tel:18001237225"
            className="w-full p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 flex items-center justify-between transition-colors cursor-pointer block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Call Support Desk</span>
                <span className="text-sm font-black font-mono">1800-123-PACK (Toll Free)</span>
              </div>
            </div>
            <span className="text-xs font-bold text-red-600">Connect Now →</span>
          </a>

          <a
            href={`https://wa.me/919443210987?text=Hi%20PackerSolutions,%20need%20assistance%20with%20booking%20${booking?.ticketId || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-between transition-colors cursor-pointer block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">WhatsApp Concierge</span>
                <span className="text-sm font-black">+91 94432 10987</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700">Chat →</span>
          </a>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Average response time: <strong>under 60 seconds</strong> on moving day.</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
