import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Boxes, 
  Plus, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BookingModel } from './types';

interface ManageBookingModalProps {
  booking: BookingModel;
  onClose: () => void;
  onRescheduleDate: (bookingId: string, newDate: string) => void;
  onRescheduleSlot: (bookingId: string, newSlot: string) => void;
  onCancelBooking: (bookingId: string, reason: string) => void;
  onOpenInventory: (booking: BookingModel) => void;
  onOpenServices: (booking: BookingModel) => void;
}

type ManageAction = 'menu' | 'date' | 'slot' | 'cancel';

export const ManageBookingModal: React.FC<ManageBookingModalProps> = ({
  booking,
  onClose,
  onRescheduleDate,
  onRescheduleSlot,
  onCancelBooking,
  onOpenInventory,
  onOpenServices,
}) => {
  const [currentAction, setCurrentAction] = useState<ManageAction>('menu');
  const [selectedDate, setSelectedDate] = useState(booking.shiftingDate);
  const [selectedSlot, setSelectedSlot] = useState(booking.timeSlot);
  const [cancelReason, setCancelReason] = useState('Change in moving plan');
  const [confirmedSuccess, setConfirmedSuccess] = useState('');

  const isEligibleForChange = booking.status !== 'Cancelled' && booking.status !== 'Delivered';

  const handleDateSave = () => {
    onRescheduleDate(booking.id, selectedDate);
    setConfirmedSuccess(`Moving date successfully rescheduled to ${selectedDate}`);
    setTimeout(() => {
      setConfirmedSuccess('');
      setCurrentAction('menu');
    }, 1500);
  };

  const handleSlotSave = () => {
    onRescheduleSlot(booking.id, selectedSlot);
    setConfirmedSuccess(`Time slot updated to ${selectedSlot}`);
    setTimeout(() => {
      setConfirmedSuccess('');
      setCurrentAction('menu');
    }, 1500);
  };

  const handleCancel = () => {
    onCancelBooking(booking.id, cancelReason);
    setConfirmedSuccess('Booking cancelled. 100% refund initiated to source account.');
    setTimeout(() => {
      setConfirmedSuccess('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-left flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Manage Your Booking</h3>
            <p className="text-xs text-slate-500 font-mono">#{booking.ticketId} • {booking.serviceType}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedSuccess && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
            <span>{confirmedSuccess}</span>
          </div>
        )}

        {/* Action Menu */}
        {currentAction === 'menu' && (
          <div className="py-4 space-y-3">
            {!isEligibleForChange ? (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800">
                This booking has already been {booking.status.toLowerCase()}. Further modifications are restricted.
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentAction('date')}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600">Change Shifting Date</h4>
                      <p className="text-[11px] text-slate-500">Current: {booking.shiftingDate}. Select another date.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentAction('slot')}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600">Change Time Slot</h4>
                      <p className="text-[11px] text-slate-500">Current: {booking.timeSlot}. Choose morning or afternoon.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenInventory(booking)}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600">Modify Inventory</h4>
                      <p className="text-[11px] text-slate-500">Add or remove household items ({booking.totalItemsCount} items currently).</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenServices(booking)}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600">Add Services</h4>
                      <p className="text-[11px] text-slate-500">Add packing, insurance, storage, or unpacking.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentAction('cancel')}
                  className="w-full p-4 rounded-2xl bg-rose-50/50 hover:bg-rose-50 border border-rose-200 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-rose-700">Cancel Booking</h4>
                      <p className="text-[11px] text-rose-600/80">Check cancellation policy &amp; 100% refund eligibility.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-400 group-hover:text-rose-600" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Change Date Screen */}
        {currentAction === 'date' && (
          <div className="py-4 space-y-4">
            <h4 className="text-sm font-black text-slate-900">Select New Shifting Date</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['29 Sep 2026', '30 Sep 2026', '01 Oct 2026', '02 Oct 2026', '05 Oct 2026', '08 Oct 2026'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className={`p-3 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                    selectedDate === d ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentAction('menu')}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleDateSave}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        )}

        {/* Change Slot Screen */}
        {currentAction === 'slot' && (
          <div className="py-4 space-y-4">
            <h4 className="text-sm font-black text-slate-900">Choose Available Time Slot</h4>
            <div className="space-y-2 text-xs">
              {[
                '7:00 AM – 9:00 AM (Early Morning Express)',
                '9:00 AM – 11:00 AM (Standard Morning)',
                '11:00 AM – 1:00 PM (Mid-Day)',
                '2:00 PM – 4:00 PM (Afternoon Slot)'
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSlot(s.split(' (')[0])}
                  className={`w-full p-3 rounded-xl border font-bold text-left transition-all cursor-pointer ${
                    selectedSlot.includes(s.split(' (')[0]) ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentAction('menu')}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSlotSave}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Save New Slot
              </button>
            </div>
          </div>
        )}

        {/* Cancel Booking Screen */}
        {currentAction === 'cancel' && (
          <div className="py-4 space-y-4">
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs">
              <span className="font-extrabold text-rose-800 block mb-1">PackerSolutions Cancellation Policy</span>
              <p className="text-rose-700 leading-relaxed">
                Free cancellation with 100% instant refund if cancelled more than 24 hours before shifting slot. Your advance of ₹{booking.paidAmount.toLocaleString('en-IN')} will be refunded to your original payment method within 2-4 hours.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option value="Change in moving plan">Change in moving plan</option>
                <option value="Postponed to future date">Postponed to future date</option>
                <option value="Found alternative arrangement">Found alternative arrangement</option>
                <option value="Other personal reasons">Other personal reasons</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentAction('menu')}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Keep My Booking
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
