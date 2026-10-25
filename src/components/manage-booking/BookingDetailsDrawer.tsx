import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Home, 
  ShieldCheck, 
  Download, 
  Eye, 
  Edit3, 
  Plus, 
  Check, 
  CreditCard, 
  FileText, 
  UserCheck, 
  ArrowRight,
  Package,
  Wrench,
  Sparkles,
  Boxes,
  Warehouse,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BookingModel, AddonService } from './types';
import { INITIAL_ADDON_CATALOG } from './mockData';

interface BookingDetailsDrawerProps {
  booking: BookingModel;
  onClose: () => void;
  onTrackBooking: (booking: BookingModel) => void;
  onContactSupport: (booking: BookingModel) => void;
  onPayNow: (booking: BookingModel) => void;
  onManageBooking: (booking: BookingModel) => void;
  onDownloadDoc: (docName: string) => void;
  onViewDoc: (docName: string) => void;
  onUpdateInventory: (bookingId: string) => void;
}

type TabKey = 
  | 'overview' 
  | 'inventory' 
  | 'addresses' 
  | 'schedule' 
  | 'services' 
  | 'payments' 
  | 'documents' 
  | 'activity';

export const BookingDetailsDrawer: React.FC<BookingDetailsDrawerProps> = ({
  booking,
  onClose,
  onTrackBooking,
  onContactSupport,
  onPayNow,
  onManageBooking,
  onDownloadDoc,
  onViewDoc,
  onUpdateInventory,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [addonsList, setAddonsList] = useState<AddonService[]>(INITIAL_ADDON_CATALOG);

  const toggleAddon = (addonId: string) => {
    setAddonsList(prev => prev.map(item => {
      if (item.id === addonId) {
        return { ...item, added: !item.added };
      }
      return item;
    }));
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'inventory', label: `Inventory (${booking.totalItemsCount})` },
    { key: 'addresses', label: 'Addresses' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'services', label: 'Services' },
    { key: 'payments', label: 'Payments' },
    { key: 'documents', label: 'Documents' },
    { key: 'activity', label: 'Activity' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col overflow-hidden text-left border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-xl font-black font-mono text-slate-900">
                Booking #{booking.ticketId}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                booking.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                booking.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {booking.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {booking.serviceType} • {booking.houseSize} • Booked on {booking.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onTrackBooking(booking)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Move</span>
            </button>

            <button
              type="button"
              onClick={() => onContactSupport(booking)}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Contact Support</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer ml-1"
              title="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 border-b border-slate-200 overflow-x-auto no-scrollbar bg-white shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-50/50">

          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Route Summary Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Relocation Route</span>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">{booking.pickup.city}, {booking.pickup.state}</span>
                  <ArrowRight className="w-5 h-5 text-red-600 stroke-[2.5]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 ring-4 ring-red-100 shrink-0" />
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">{booking.drops[0]?.city}, {booking.drops[0]?.state}</span>
                </div>
              </div>

              {/* Grid of Key Properties */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">Service</span>
                  <span className="text-sm font-black text-slate-900">{booking.serviceType}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">House Size</span>
                  <span className="text-sm font-black text-slate-900">{booking.houseSize}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">Shifting Date</span>
                  <span className="text-sm font-black text-red-600">{booking.shiftingDate}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">Time Slot</span>
                  <span className="text-sm font-black text-slate-900">{booking.timeSlot}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">Booking Created</span>
                  <span className="text-sm font-bold text-slate-700">{booking.createdAt}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block">Booking Status</span>
                  <span className="text-sm font-black text-emerald-600">{booking.status}</span>
                </div>
              </div>

              {/* Assigned Team */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Team</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {booking.assignedTeam ? `${booking.assignedTeam.leadName} (Lead) + ${booking.assignedTeam.crewCount} Handlers` : 'Assignment in progress'}
                    </span>
                  </div>
                </div>

                {booking.assignedTeam && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ✓ Verified Crew
                  </span>
                )}
              </div>

              {/* Manage shortcut */}
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-extrabold text-red-900 block">Need to reschedule or update items?</span>
                  <span className="text-red-700">Free changes permitted up to 24 hours before shifting.</span>
                </div>
                <button
                  type="button"
                  onClick={() => onManageBooking(booking)}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Manage Booking
                </button>
              </div>
            </div>
          )}

          {/* 2. INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h4 className="text-sm font-black text-slate-900">Registered Inventory Items</h4>
                  <p className="text-xs text-slate-500">Categorized list submitted for packing & volume calculation</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold bg-slate-100 text-slate-800 px-3 py-1 rounded-lg">
                    Total: {booking.totalItemsCount} items
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateInventory(booking.id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Inventory</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {booking.inventory.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
                      {cat.categoryName}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {cat.items.map((it) => (
                        <div key={it.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="font-medium text-slate-800">{it.name}</span>
                          <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            × {it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Pickup Address Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Pickup Location</span>
                </div>

                <h4 className="text-base font-black text-slate-900 mb-1">{booking.pickup.city}, {booking.pickup.state}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{booking.pickup.fullAddress}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Floor</span>
                    <span className="font-bold text-slate-800">{booking.pickup.floor}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Lift Available</span>
                    <span className="font-bold text-slate-800">{booking.pickup.liftAvailable ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Parking Access</span>
                    <span className="font-bold text-slate-800">{booking.pickup.parkingAvailable ? 'Available' : 'Restricted'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contact</span>
                    <span className="font-bold text-slate-800">{booking.pickup.contactPerson}</span>
                  </div>
                </div>
              </div>

              {/* Destination Drop Cards (Supports multiple drops) */}
              {booking.drops.map((drop, dIdx) => (
                <div key={dIdx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-red-700 bg-red-50 px-2.5 py-1 rounded-md w-fit mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Drop Location {booking.drops.length > 1 ? `#${dIdx + 1}` : ''}</span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 mb-1">{drop.city}, {drop.state}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{drop.fullAddress}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Floor</span>
                      <span className="font-bold text-slate-800">{drop.floor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Lift Available</span>
                      <span className="font-bold text-slate-800">{drop.liftAvailable ? 'Yes' : 'No'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Parking Access</span>
                      <span className="font-bold text-slate-800">{drop.parkingAvailable ? 'Available' : 'Restricted'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contact</span>
                      <span className="font-bold text-slate-800">{drop.contactPerson}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
                  Confirmed Move Schedule
                </h4>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Calendar className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Shifting Date</span>
                    <span className="text-sm font-black text-slate-900">{booking.shiftingDate}</span>
                    <p className="text-xs text-slate-500 mt-0.5">Please ensure home society gate pass is pre-authorized for moving day.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Time Slot</span>
                    <span className="text-sm font-black text-slate-900">{booking.timeSlot}</span>
                    <p className="text-xs text-slate-500 mt-0.5">Crew arrival window: 30 minutes prior to packing start.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Expected Delivery</span>
                    <span className="text-sm font-black text-emerald-900">Same Day / Next Morning Express Delivery</span>
                    <p className="text-xs text-emerald-700 mt-0.5">Standard interstate transit with live tracking checkpoints.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. SERVICES TAB (Add-on Services Catalog) */}
          {activeTab === 'services' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-black text-slate-900">Additional Services Catalog</h4>
                <p className="text-xs text-slate-500">Enhance your move with certified PackerSolutions value-add solutions</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((addon) => (
                  <div 
                    key={addon.id} 
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      addon.added ? 'border-red-500 shadow-xs ring-1 ring-red-200 bg-red-50/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h5 className="text-xs font-bold text-slate-900">{addon.name}</h5>
                      <span className="text-xs font-black font-mono text-red-600">₹{addon.price.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">{addon.shortDesc}</p>
                    <button
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full py-1.5 px-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                        addon.added 
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                          : 'bg-slate-100 text-slate-800 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      {addon.added ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Service Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Service</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Payment Breakdown Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs text-xs space-y-3">
                <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                  Payment Summary &amp; Bill Details
                </h4>

                <div className="flex justify-between py-1 text-slate-600">
                  <span>Base Quotation (Transport &amp; Crew)</span>
                  <span className="font-bold text-slate-900">₹{booking.quotationAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-600">
                  <span>Add-on Services</span>
                  <span className="font-bold text-slate-900">₹{booking.addonAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-600">
                  <span>Comprehensive Transit Insurance</span>
                  <span className="font-bold text-slate-900">₹{booking.insuranceAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-black text-slate-900">
                  <span>Final Amount</span>
                  <span className="text-base text-red-600">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span>Amount Paid</span>
                  <span>₹{booking.paidAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 text-red-700 font-black bg-red-50 p-2.5 rounded-xl border border-red-200">
                  <span>Pending Balance</span>
                  <span className="text-base">₹{booking.pendingAmount.toLocaleString('en-IN')}</span>
                </div>

                {booking.pendingAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => onPayNow(booking)}
                    className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Pending Balance ₹{booking.pendingAmount.toLocaleString('en-IN')}</span>
                  </button>
                )}
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h4 className="text-sm font-black text-slate-900 mb-3">Payment History</h4>
                <div className="space-y-2 text-xs">
                  {booking.payments.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-slate-900 block">{p.title}</span>
                        <span className="text-[11px] text-slate-500">{p.date} • {p.method}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 block">₹{p.amount.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          ✓ {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-black text-slate-900">Official Move Documentation</h4>
                <p className="text-xs text-slate-500">Government compliant invoices, bilty and insurance guarantees</p>
              </div>

              <div className="space-y-2.5">
                {booking.documents.map((doc) => (
                  <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{doc.name}</span>
                        <span className="text-[11px] text-slate-400">{doc.date} • {doc.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDoc(doc.name)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDownloadDoc(doc.name)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-150">
              <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                Order Activity Log
              </h4>

              <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {booking.activityLogs.map((act) => (
                  <div key={act.id} className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-red-600 border-2 border-white ring-2 ring-red-100" />
                    <div className="text-xs">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-extrabold text-slate-900">{act.title}</span>
                        <span className="text-[11px] font-mono text-slate-400">{act.timestamp}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
