import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Filter, 
  Plus, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageCircle, 
  Headphones, 
  ChevronRight, 
  SlidersHorizontal,
  X,
  CreditCard,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { BookingModel, FilterCategory, InventoryCategory } from './manage-booking/types';
import { MOCK_BOOKINGS } from './manage-booking/mockData';
import { BookingCard } from './manage-booking/BookingCard';
import { BookingDetailsDrawer } from './manage-booking/BookingDetailsDrawer';
import { BookingTrackingView } from './manage-booking/BookingTrackingView';
import { ManageBookingModal } from './manage-booking/ManageBookingModal';
import { SupportModal } from './manage-booking/SupportModal';
import { PaymentModal } from './manage-booking/PaymentModal';
import { InventoryEditModal } from './manage-booking/InventoryEditModal';

export interface OrderTrackingPageProps {
  ticketId?: string;
  onNavigate: (page: string, serviceId?: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ 
  ticketId: propTicketId, 
  onNavigate 
}) => {
  // Master Bookings state
  const [bookings, setBookings] = useState<BookingModel[]>(MOCK_BOOKINGS);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  // Active View/Modal states
  const [trackingBooking, setTrackingBooking] = useState<BookingModel | null>(null);
  const [detailsBooking, setDetailsBooking] = useState<BookingModel | null>(null);
  const [manageBooking, setManageBooking] = useState<BookingModel | null>(null);
  const [paymentBooking, setPaymentBooking] = useState<BookingModel | null>(null);
  const [inventoryBooking, setInventoryBooking] = useState<BookingModel | null>(null);
  const [supportBooking, setSupportBooking] = useState<BookingModel | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Summary counts
  const summaryCounts = useMemo(() => {
    const upcoming = bookings.filter(b => b.statusCategory === 'Upcoming').length;
    const inProgress = bookings.filter(b => b.statusCategory === 'In Progress').length;
    const completed = bookings.filter(b => b.statusCategory === 'Completed').length;
    const total = bookings.filter(b => b.status !== 'Cancelled').length;
    return { total, upcoming, inProgress, completed };
  }, [bookings]);

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (booking.statusCategory !== selectedCategory) return false;
      }

      // Search query (Booking ID, pickup location, drop location)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = booking.ticketId.toLowerCase().includes(q);
        const matchesPickup = booking.pickup.city.toLowerCase().includes(q) || 
                              booking.pickup.state.toLowerCase().includes(q) ||
                              booking.pickup.fullAddress.toLowerCase().includes(q);
        const matchesDrop = booking.drops.some(d => 
          d.city.toLowerCase().includes(q) || 
          d.state.toLowerCase().includes(q) ||
          d.fullAddress.toLowerCase().includes(q)
        );
        const matchesService = booking.serviceType.toLowerCase().includes(q);
        if (!matchesId && !matchesPickup && !matchesDrop && !matchesService) return false;
      }

      // Service type filter
      if (serviceFilter !== 'All' && booking.serviceType !== serviceFilter) {
        return false;
      }

      // Payment filter
      if (paymentFilter !== 'All') {
        if (paymentFilter === 'Paid' && booking.pendingAmount > 0) return false;
        if (paymentFilter === 'Payment Pending' && booking.pendingAmount === 0) return false;
        if (paymentFilter === 'Partial' && booking.paymentStatus !== 'Partial') return false;
      }

      return true;
    });
  }, [bookings, selectedCategory, searchQuery, serviceFilter, paymentFilter]);

  // Action handlers
  const handleRescheduleDate = (bookingId: string, newDate: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          shiftingDate: newDate,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Date Rescheduled',
              description: `Moving date modified to ${newDate} by customer.`
            },
            ...b.activityLogs
          ]
        };
      }
      return b;
    }));
    showToast(`Shifting date successfully updated to ${newDate}`);
  };

  const handleRescheduleSlot = (bookingId: string, newSlot: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          timeSlot: newSlot,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Time Slot Rescheduled',
              description: `Moving window updated to ${newSlot} by customer.`
            },
            ...b.activityLogs
          ]
        };
      }
      return b;
    }));
    showToast(`Time slot updated to ${newSlot}`);
  };

  const handleCancelBooking = (bookingId: string, reason: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Cancelled',
          statusCategory: 'Cancelled',
          pendingAmount: 0,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Booking Cancelled',
              description: `Customer cancelled booking: "${reason}". 100% refund initiated.`
            },
            ...b.activityLogs
          ]
        };
      }
      return b;
    }));
    showToast('Booking cancelled. 100% refund initiated to source payment.');
  };

  const handleSaveInventory = (bookingId: string, updatedInventory: InventoryCategory[]) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const totalCount = updatedInventory.reduce(
          (acc, cat) => acc + cat.items.reduce((s, it) => s + it.quantity, 0),
          0
        );
        return {
          ...b,
          inventory: updatedInventory,
          totalItemsCount: totalCount,
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Inventory Updated',
              description: `Customer adjusted items list (${totalCount} total items).`
            },
            ...b.activityLogs
          ]
        };
      }
      return b;
    }));
    showToast('Inventory list updated successfully.');
  };

  const handlePaymentSuccess = (bookingId: string, paidAmount: number) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const newPaid = b.paidAmount + paidAmount;
        const newPending = Math.max(0, b.totalAmount - newPaid);
        return {
          ...b,
          paidAmount: newPaid,
          pendingAmount: newPending,
          paymentStatus: newPending === 0 ? 'Paid' : 'Partial',
          payments: [
            {
              id: `pay-${Date.now()}`,
              date: 'Just now',
              title: 'Balance Payment Clearance',
              amount: paidAmount,
              status: 'Successful',
              method: 'UPI Instant Gateway',
              transactionRef: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`
            },
            ...b.payments
          ],
          activityLogs: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              title: `Payment Received (₹${paidAmount.toLocaleString('en-IN')})`,
              description: `Payment confirmed via secure gateway. Pending balance: ₹${newPending.toLocaleString('en-IN')}`
            },
            ...b.activityLogs
          ]
        };
      }
      return b;
    }));
    showToast(`Payment of ₹${paidAmount.toLocaleString('en-IN')} confirmed!`);
  };

  // If currently viewing tracking for a specific booking, show the dedicated clean tracking UI
  if (trackingBooking) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BookingTrackingView
            booking={trackingBooking}
            onBack={() => setTrackingBooking(null)}
            onContactSupport={(b) => {
              setSupportBooking(b);
              setIsSupportModalOpen(true);
            }}
          />
        </div>

        {/* Global Support Modal */}
        {isSupportModalOpen && (
          <SupportModal
            booking={supportBooking}
            onClose={() => setIsSupportModalOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Manage Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Track, manage and view all your PackerSolutions bookings in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('pickup-datetime')}
            className="self-start md:self-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book a New Move</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Booking ID, pickup location or destination..."
            className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* BOOKING SUMMARY CARDS (4 compact summary cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          
          {/* Card 1: Total Bookings */}
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
              selectedCategory === 'All' 
                ? 'bg-white border-red-500 shadow-sm ring-2 ring-red-100' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Total Bookings</span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-mono">
              {summaryCounts.total}
            </span>
          </button>

          {/* Card 2: Upcoming */}
          <button
            type="button"
            onClick={() => setSelectedCategory('Upcoming')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
              selectedCategory === 'Upcoming' 
                ? 'bg-white border-red-500 shadow-sm ring-2 ring-red-100' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Upcoming</span>
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-red-600 block font-mono">
              {summaryCounts.upcoming}
            </span>
          </button>

          {/* Card 3: In Progress */}
          <button
            type="button"
            onClick={() => setSelectedCategory('In Progress')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
              selectedCategory === 'In Progress' 
                ? 'bg-white border-red-500 shadow-sm ring-2 ring-red-100' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">In Progress</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-blue-600 block font-mono">
              {summaryCounts.inProgress}
            </span>
          </button>

          {/* Card 4: Completed */}
          <button
            type="button"
            onClick={() => setSelectedCategory('Completed')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
              selectedCategory === 'Completed' 
                ? 'bg-white border-red-500 shadow-sm ring-2 ring-red-100' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Completed</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block font-mono">
              {summaryCounts.completed}
            </span>
          </button>

        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          
          {/* Horizontal category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
            {(['All', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'] as FilterCategory[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isSelected 
                      ? 'bg-red-600 text-white shadow-xs font-black' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Additional Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Service filter */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer shadow-2xs focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="All">All Services</option>
              <option value="Household Shifting">Household Shifting</option>
              <option value="Office Relocation">Office Relocation</option>
              <option value="Vehicle Transport">Vehicle Transport</option>
              <option value="Warehouse Storage">Warehouse Storage</option>
            </select>

            {/* Payment status filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer shadow-2xs focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Fully Paid</option>
              <option value="Payment Pending">Payment Pending</option>
              <option value="Partial">Partial Paid</option>
            </select>

            {(serviceFilter !== 'All' || paymentFilter !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setServiceFilter('All');
                  setPaymentFilter('All');
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* BOOKING LIST */}
        <div className="space-y-3 sm:space-y-3.5">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={(b) => setDetailsBooking(b)}
                onTrackBooking={(b) => setTrackingBooking(b)}
                onManageBooking={(b) => setManageBooking(b)}
                onPayNow={(b) => setPaymentBooking(b)}
                onViewPayments={(b) => {
                  setDetailsBooking(b);
                }}
                onDownloadReceipt={(b) => {
                  showToast(`Downloaded Official Receipt for ${b.ticketId}`);
                }}
              />
            ))
          ) : (
            /* EMPTY STATES */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto text-2xl">
                📦
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {selectedCategory === 'Upcoming' 
                    ? 'No Upcoming Bookings Found' 
                    : selectedCategory === 'In Progress'
                    ? 'No Moves Currently In Progress'
                    : 'No Bookings Found'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                  {searchQuery 
                    ? `No bookings matched your search "${searchQuery}". Try searching another booking ID or location.`
                    : 'Start your next stress-free household or office relocation with PackerSolutions.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('pickup-datetime')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book a New Service</span>
              </button>
            </div>
          )}
        </div>

        {/* CUSTOMER SUPPORT BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Need Help With Your Relocation?</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our customer relocation officers are available 24/7 to assist with rescheduling, tracking, and claims.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSupportBooking(bookings[0] || null);
                setIsSupportModalOpen(true);
              }}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Support (1800-123-PACK)</span>
            </button>

            <a
              href="https://wa.me/919443210987?text=Hi%20PackerSolutions,%20need%20assistance%20with%20my%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

      </div>

      {/* 8-TAB DETAILS DRAWER */}
      {detailsBooking && (
        <BookingDetailsDrawer
          booking={detailsBooking}
          onClose={() => setDetailsBooking(null)}
          onTrackBooking={(b) => {
            setDetailsBooking(null);
            setTrackingBooking(b);
          }}
          onContactSupport={(b) => {
            setSupportBooking(b);
            setIsSupportModalOpen(true);
          }}
          onPayNow={(b) => {
            setPaymentBooking(b);
          }}
          onManageBooking={(b) => {
            setDetailsBooking(null);
            setManageBooking(b);
          }}
          onDownloadDoc={(name) => showToast(`Downloaded ${name}`)}
          onViewDoc={(name) => showToast(`Viewing preview of ${name}`)}
          onUpdateInventory={() => {
            setInventoryBooking(detailsBooking);
          }}
        />
      )}

      {/* MANAGE BOOKING MODAL */}
      {manageBooking && (
        <ManageBookingModal
          booking={manageBooking}
          onClose={() => setManageBooking(null)}
          onRescheduleDate={handleRescheduleDate}
          onRescheduleSlot={handleRescheduleSlot}
          onCancelBooking={handleCancelBooking}
          onOpenInventory={(b) => {
            setManageBooking(null);
            setInventoryBooking(b);
          }}
          onOpenServices={(b) => {
            setManageBooking(null);
            setDetailsBooking(b);
          }}
        />
      )}

      {/* PAYMENT MODAL */}
      {paymentBooking && (
        <PaymentModal
          booking={paymentBooking}
          onClose={() => setPaymentBooking(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* INVENTORY EDIT MODAL */}
      {inventoryBooking && (
        <InventoryEditModal
          booking={inventoryBooking}
          onClose={() => setInventoryBooking(null)}
          onSave={handleSaveInventory}
        />
      )}

      {/* SUPPORT MODAL */}
      {isSupportModalOpen && (
        <SupportModal
          booking={supportBooking}
          onClose={() => setIsSupportModalOpen(false)}
        />
      )}

    </div>
  );
};
