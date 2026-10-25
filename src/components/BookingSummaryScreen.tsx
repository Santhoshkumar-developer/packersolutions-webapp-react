import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Gem, 
  Info, 
  Check, 
  ChevronRight, 
  X, 
  Coins, 
  Package, 
  Building2,
  FileText,
  User,
  Phone,
  Layers,
  Sparkles,
  Wrench,
  Fan,
  Truck,
  Warehouse,
  Plus,
  Minus,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import { SelectedItem } from './InventorySelectionScreen';
import truckImg from '../assets/images/trucks/container_14ft_28ton.jpg';

export interface AddonServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  popular?: boolean;
}

export const AVAILABLE_ADDONS: AddonServiceItem[] = [
  {
    id: 'addon-ac',
    name: 'AC Dismantling & Installation',
    category: 'Appliances',
    description: 'Certified technician for split / window AC uninstall & re-mount',
    price: 1499,
    popular: true,
  },
  {
    id: 'addon-carpenter',
    name: 'Carpenter Furniture Assembly',
    category: 'Carpentry',
    description: 'Expert carpenter to dismantle & assemble king bed, modular wardrobe',
    price: 899,
    popular: true,
  },
  {
    id: 'addon-electrical',
    name: 'Appliance & Electrical Setup',
    category: 'Electrical',
    description: 'Geyser, TV wall-mounting, chimney & ceiling fan installations',
    price: 699,
  },
  {
    id: 'addon-cleaning',
    name: 'Home Deep Cleaning & Sanitization',
    category: 'Cleaning',
    description: 'Full kitchen, bathroom, and floor sanitization before move-in',
    price: 1299,
  },
  {
    id: 'addon-protect',
    name: 'Transit Protection Cover (GoDigit)',
    category: 'Insurance',
    description: 'Zero deductible 100% loss/damage insurance for all declared goods',
    price: 499,
    popular: true,
  },
  {
    id: 'addon-storage',
    name: 'Short-Term Secure Warehouse Storage',
    category: 'Warehousing',
    description: '15-day climate-controlled safe storage with 24/7 CCTV surveillance',
    price: 1999,
  },
  {
    id: 'addon-crating',
    name: 'Custom Wooden Crating for Fragile Items',
    category: 'Packaging',
    description: 'Solid wooden crating for imported TV, marble tops, antique glass',
    price: 599,
  }
];

interface BookingSummaryScreenProps {
  bookingData: {
    ticketId?: string;
    relocateType?: 'within-city' | 'between-city';
    originCity?: string;
    destinationCity?: string;
    pickupAddress: string;
    dropAddress: string;
    dropOption?: 'single' | 'multi';
    multiDropAddresses?: string[];
    pickupFloor?: string;
    dropFloor?: string;
    isPickupLiftAvailable?: boolean;
    isDropLiftAvailable?: boolean;
    receiverType?: 'myself' | 'others';
    receiverName?: string;
    receiverPhone?: string;
    pickupDate: string;
    pickupSlot: string;
    serviceName?: string;
    houseSize?: string;
    packingType?: 'standard' | 'premium';
    inspectionType?: 'video' | 'physical';
    inspectionDate?: string;
    inspectionSlot?: string;
    basePrice?: number;
    specialInstructions?: string;
  };
  selectedInventory: SelectedItem[];
  onBackToInventory: () => void;
  onEditStep: (stepNumber: 1 | 2 | 3) => void;
  onConfirmBooking: (finalBookingData: any) => void;
}

export const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({
  bookingData,
  selectedInventory,
  onBackToInventory,
  onEditStep,
  onConfirmBooking
}) => {
  // Add-on states (list with Add buttons)
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-protect']);
  const [isCashRedeemed, setIsCashRedeemed] = useState(false);

  // Inventory modal viewer state
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  // Pricing calculations
  const baseOrderPrice = bookingData.basePrice && bookingData.basePrice > 0 ? bookingData.basePrice : 6050;
  const originalStrikethroughPrice = Math.round(baseOrderPrice * 1.15);

  // Premium packing upgrade fee (+₹999 if premium)
  const packingUpgradePrice = bookingData.packingType === 'premium' ? 999 : 0;

  // Addons total
  const selectedAddonsList = AVAILABLE_ADDONS.filter(a => selectedAddonIds.includes(a.id));
  const addonsTotalPrice = selectedAddonsList.reduce((sum, a) => sum + a.price, 0);

  // Discounts & totals
  const cashDiscount = isCashRedeemed ? 605 : 0;
  const totalOrderAmount = baseOrderPrice + packingUpgradePrice + addonsTotalPrice;
  const finalTotalAmount = Math.max(0, totalOrderAmount - cashDiscount);

  // Advance booking amount is 15% of final amount
  const bookingAdvanceAmount = Math.round(finalTotalAmount * 0.15);
  const remainingAtUnloading = finalTotalAmount - bookingAdvanceAmount;

  const totalItemCount = selectedInventory.reduce((sum, item) => sum + item.quantity, 0);

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter(item => item !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const handleFinalConfirm = () => {
    const finalRecord = {
      ...bookingData,
      selectedAddons: selectedAddonsList,
      addonsTotalPrice,
      packingUpgradePrice,
      isCashRedeemed,
      baseOrderPrice,
      totalOrderAmount,
      finalTotalAmount,
      bookingAdvanceAmount,
      remainingAtUnloading,
      selectedInventory: selectedInventory.map(s => ({
        name: s.item.name,
        category: s.item.category,
        quantity: s.quantity,
        subtext: s.item.subtext
      })),
      totalItemCount
    };
    onConfirmBooking(finalRecord);
  };

  return (
    <div 
      id="booking-summary-screen" 
      className="w-full max-w-5xl mx-auto font-sans text-left animate-in fade-in duration-200 pb-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ================= LEFT MAIN CARD ================= */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Main Review Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-7">
            {/* Header with Back button */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  id="btn-back-to-step3"
                  type="button"
                  onClick={() => onEditStep(3)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Back to Schedule & Packing"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                    Step 4 of 4: Booking Summary
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    Review Your Shifting Details
                  </h1>
                </div>
              </div>
            </div>

            {/* Section 1: Move Type & House Size (Step 1) */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Move Type &amp; Scale
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(1)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {bookingData.houseSize || '2 BHK'} - {bookingData.serviceName || 'Household Shifting'}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Mode: <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {bookingData.relocateType === 'between-city' ? 'Between City Move' : 'Within City Move'}
                    </span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center p-0.5">
                  <img src={truckImg} alt="Truck" className="w-full h-full object-cover rounded-md" />
                </div>
              </div>
            </div>

            {/* Section 2: Route & Receiver Details (Step 1) */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Addresses &amp; Contact Person
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(1)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-2.5 rounded-xl">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                    <span>Pickup Address</span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {bookingData.isPickupLiftAvailable !== false ? 'Service Lift Available' : 'No Lift'}
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 font-semibold mt-0.5">
                    {bookingData.pickupAddress}
                  </div>
                </div>

                <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 p-2.5 rounded-xl">
                  <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center justify-between">
                    <span>Drop Destination</span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {bookingData.isDropLiftAvailable !== false ? 'Service Lift Available' : 'No Lift'}
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 font-semibold mt-0.5">
                    {bookingData.dropAddress}
                  </div>
                </div>

                {/* Receiver Info */}
                <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Receiver: <strong className="text-slate-900 dark:text-white">{bookingData.receiverType === 'others' ? (bookingData.receiverName || 'Nominated Contact') : 'MySelf'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Phone className="w-3 h-3" />
                    <span>{bookingData.receiverPhone || '+91 98765 43210'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Inventory Summary (Step 2) */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Inventory Items ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(2)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Items</span>
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="truncate max-w-sm">
                  {selectedInventory.length > 0 ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {selectedInventory.slice(0, 4).map(s => `${s.item.name} (${s.quantity})`).join(', ')}
                      {selectedInventory.length > 4 ? ` +${selectedInventory.length - 4} more` : ''}
                    </span>
                  ) : (
                    <span className="text-slate-400">Standard 2 BHK essential items included</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowInventoryModal(true)}
                  className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-2"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Section 4: Schedule, Packing & Inspection (Step 3) */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Schedule, Packing &amp; Inspection
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(3)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Shifting Date</span>
                  <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {bookingData.pickupDate}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Slot: {bookingData.pickupSlot}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Packing Grade</span>
                  <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5 capitalize">
                    {bookingData.packingType === 'premium' ? 'Premium 5-Layer (+₹999)' : 'Standard Packing (Free)'}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    Verified Materials
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Inspection Audit</span>
                  <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5 capitalize">
                    {bookingData.inspectionType === 'physical' ? 'Physical Home Audit' : 'Instant Video Call'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {bookingData.inspectionSlot || 'Morning 10-12 PM'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ADDON SERVICES CONTAINER ================= */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-7 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Recommended Add-on Services
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add certified experts to handle appliances, carpentry, and sanitization
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-full">
                {selectedAddonIds.length} Added
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_ADDONS.map((addon) => {
                const isAdded = selectedAddonIds.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isAdded
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm ring-1 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {addon.name}
                        </span>
                        {addon.popular && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {addon.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        ₹ {addon.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                          isAdded
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 border border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================= RIGHT SUMMARY & PRICING CARD ================= */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 text-left">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center justify-between">
              <span>Price Breakdown</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Guaranteed Fare
              </span>
            </h3>

            {/* Price Line Items */}
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span>Base Moving Charge</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ₹ {baseOrderPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {packingUpgradePrice > 0 && (
                <div className="flex justify-between items-center text-orange-600 dark:text-orange-400 font-semibold">
                  <span>Premium 5-Layer Packaging</span>
                  <span className="font-bold">+ ₹ {packingUpgradePrice.toLocaleString('en-IN')}</span>
                </div>
              )}

              {addonsTotalPrice > 0 && (
                <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Add-on Services ({selectedAddonsList.length})</span>
                  <span className="font-bold">+ ₹ {addonsTotalPrice.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Promotional Voucher */}
              <div className="pt-2">
                <div 
                  onClick={() => setIsCashRedeemed(!isCashRedeemed)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCashRedeemed
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        FIRSTMOVE Promo Coupon
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Instant ₹605 discount applied
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold ${isCashRedeemed ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {isCashRedeemed ? 'APPLIED ✓' : 'APPLY'}
                  </span>
                </div>
              </div>

              {cashDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>- ₹ {cashDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Total Fare */}
            <div className="py-3.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
              <div>
                <span className="text-sm font-black text-slate-900 dark:text-white block">
                  Total Order Amount
                </span>
                <span className="text-[11px] text-slate-400">
                  All taxes, tolls &amp; loading included
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  ₹ {finalTotalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Split Highlight */}
            <div className="my-4 p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-blue-900 dark:text-blue-300">
                <span>Advance to Confirm Booking (15%):</span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  ₹ {bookingAdvanceAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]">
                <span>Remaining at Unloading / Delivery:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  ₹ {remainingAtUnloading.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Free Rescheduling Assurance */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-4">
              Pay advance amount to lock your truck &amp; crew. Free date rescheduling available up to 48 hours before move.
            </div>

            {/* Proceed to Payment CTA */}
            <button
              id="btn-confirm-final-booking"
              type="button"
              onClick={handleFinalConfirm}
              className="w-full bg-[#f0142f] hover:bg-[#d90d26] text-white font-black text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-white/90" />
              <span>Proceed to Payment (₹ {bookingAdvanceAmount.toLocaleString('en-IN')})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ================= STEP 4: STICKY BOTTOM ACTION BAR ================= */}
      <div 
        id="booking-summary-bottom-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-3 transition-all"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Advance: ₹ {bookingAdvanceAmount.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(Total: ₹ {finalTotalAmount.toLocaleString('en-IN')})</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[190px] sm:max-w-xs">
                Remaining ₹ {remainingAtUnloading.toLocaleString('en-IN')} at delivery • Free Reschedule
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowInventoryModal(true)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition-colors hidden sm:inline-block"
            >
              View Items
            </button>

            <button
              id="btn-confirm-final-booking-bar"
              type="button"
              onClick={handleFinalConfirm}
              className="px-5 py-2.5 bg-[#f0142f] hover:bg-[#d90d26] active:bg-[#bd081d] text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-98"
            >
              <span>Proceed to Payment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= VIEW INVENTORY MODAL ================= */}
      {showInventoryModal && (
        <div 
          id="inventory-view-modal-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Inventory Items ({totalItemCount})
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed catalog of items marked for relocation
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInventoryModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 my-3">
              {selectedInventory.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Standard household items for {bookingData.houseSize || '2 BHK'} selected
                </div>
              ) : (
                selectedInventory.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        {item.item.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {item.item.category} {item.item.subtext ? `• ${item.item.subtext}` : ''}
                      </span>
                    </div>
                    <span className="font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInventoryModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
