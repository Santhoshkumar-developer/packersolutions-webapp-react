import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check, Smartphone, Building, Lock } from 'lucide-react';
import { BookingModel } from './types';

interface PaymentModalProps {
  booking: BookingModel;
  onClose: () => void;
  onSuccess: (bookingId: string, amount: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ booking, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const amountToPay = booking.pendingAmount > 0 ? booking.pendingAmount : booking.totalAmount;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      onSuccess(booking.id, amountToPay);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Secure Payment Gateway</h3>
            <p className="text-xs text-slate-500 font-mono">#{booking.ticketId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Payment Successful!</h4>
            <p className="text-xs text-slate-600">
              ₹{amountToPay.toLocaleString('en-IN')} successfully credited to booking #{booking.ticketId}. Receipt has been generated.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Payable Balance</span>
                <span className="text-xs text-slate-500">{booking.serviceType} ({booking.pickup.city} → {booking.drops[0]?.city})</span>
              </div>
              <span className="text-xl font-black text-red-600 font-mono">
                ₹{amountToPay.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold cursor-pointer transition-colors ${
                    method === 'upi' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI Apps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold cursor-pointer transition-colors ${
                    method === 'card' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold cursor-pointer transition-colors ${
                    method === 'netbanking' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>256-Bit SSL Encrypted &amp; RBI Compliant Payment Gateway</span>
            </div>

            <button
              type="button"
              disabled={processing}
              onClick={handlePay}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-black text-sm rounded-xl shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              {processing ? (
                <span>Processing Transaction...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{amountToPay.toLocaleString('en-IN')} Now</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
