import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Package, 
  Video, 
  Home, 
  Sparkles, 
  Layers, 
  Box, 
  Award,
  Info,
  CalendarCheck
} from 'lucide-react';

export interface SchedulePackingInspectionData {
  pickupDateId: string;
  pickupDateLabel: string;
  pickupDateValue: string;
  pickupSlot: string;
  packingType: 'standard' | 'premium';
  inspectionType: 'video' | 'physical';
  inspectionDate: string;
  inspectionSlot: string;
}

interface SchedulePackingInspectionScreenProps {
  initialData: Partial<SchedulePackingInspectionData>;
  basePrice?: number;
  onBack: () => void;
  onProceed: (data: SchedulePackingInspectionData) => void;
}

export const SchedulePackingInspectionScreen: React.FC<SchedulePackingInspectionScreenProps> = ({
  initialData,
  basePrice = 6050,
  onBack,
  onProceed,
}) => {
  // Generate date options
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateOptions = [
    {
      id: 'today',
      label: `Today, ${today.getDate()} ${monthNames[today.getMonth()]}`,
      shortLabel: `Today (${today.getDate()})`,
      dateStr: today.toISOString().split('T')[0],
      tag: 'Fastest'
    },
    {
      id: 'tomorrow',
      label: `Tomorrow, ${new Date(Date.now() + 86400000).getDate()} ${monthNames[new Date(Date.now() + 86400000).getMonth()]}`,
      shortLabel: `Tomorrow (${new Date(Date.now() + 86400000).getDate()})`,
      dateStr: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      tag: 'Recommended'
    },
    ...[2, 3, 4, 5].map(i => {
      const d = new Date(Date.now() + i * 86400000);
      return {
        id: `day-${i}`,
        label: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`,
        shortLabel: `${dayNames[d.getDay()]} (${d.getDate()})`,
        dateStr: d.toISOString().split('T')[0],
        tag: ''
      };
    })
  ];

  // 1. Pickup Date & Slot State
  const [selectedDateId, setSelectedDateId] = useState<string>(initialData.pickupDateId || 'tomorrow');
  const [customDate, setCustomDate] = useState<string>(
    initialData.pickupDateId === 'custom' ? (initialData.pickupDateValue || '') : ''
  );
  const [isCustomMode, setIsCustomMode] = useState<boolean>(initialData.pickupDateId === 'custom');

  const timeSlots = [
    { id: '7AM-9AM', label: '7:00 AM - 9:00 AM', tag: 'Early Morning' },
    { id: '9AM-11AM', label: '9:00 AM - 11:00 AM', tag: 'Most Popular' },
    { id: '11AM-1PM', label: '11:00 AM - 1:00 PM', tag: 'Midday' },
    { id: '2PM-4PM', label: '2:00 PM - 4:00 PM', tag: 'Afternoon' },
    { id: '4PM-6PM', label: '4:00 PM - 6:00 PM', tag: 'Late Afternoon' },
    { id: '6PM-8PM', label: '6:00 PM - 8:00 PM', tag: 'Evening' },
  ];
  const [selectedSlot, setSelectedSlot] = useState<string>(initialData.pickupSlot || '9AM-11AM');

  // 2. Packing Type State (Standard vs Premium)
  const [packingType, setPackingType] = useState<'standard' | 'premium'>(
    initialData.packingType || 'standard'
  );

  // 3. Inspection State
  const [inspectionType, setInspectionType] = useState<'video' | 'physical'>(
    initialData.inspectionType || 'video'
  );

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [inspectionDate, setInspectionDate] = useState<string>(
    initialData.inspectionDate || tomorrowStr
  );
  const inspectionSlots = [
    '10:00 AM - 12:00 PM',
    '02:00 PM - 04:00 PM',
    '05:00 PM - 07:00 PM',
  ];
  const [inspectionSlot, setInspectionSlot] = useState<string>(
    initialData.inspectionSlot || '10:00 AM - 12:00 PM'
  );

  const handleContinue = () => {
    let dateLabel = '';
    let dateValue = '';

    if (isCustomMode && customDate) {
      const d = new Date(customDate);
      dateLabel = `${d.getDate()} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
      dateValue = customDate;
    } else {
      const opt = dateOptions.find(o => o.id === selectedDateId) || dateOptions[1];
      dateLabel = opt.label;
      dateValue = opt.dateStr;
    }

    onProceed({
      pickupDateId: isCustomMode ? 'custom' : selectedDateId,
      pickupDateLabel: dateLabel,
      pickupDateValue: dateValue,
      pickupSlot: selectedSlot,
      packingType,
      inspectionType,
      inspectionDate,
      inspectionSlot,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-8 text-left transition-all pb-28">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Back to Inventory"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
              Step 3 of 4: Schedule &amp; Packing
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Select Shifting Date, Packing &amp; Inspection
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize your move date, packaging grade, and pre-move audit preference
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Free Rescheduling up to 48 hrs</span>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {/* ================= SECTION 1: SHIFTING DATE SELECTION ================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                1. Shifting Date Selection
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Select preferred pickup day
            </span>
          </div>

          {/* Quick Date Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {dateOptions.map((opt) => {
              const isSelected = !isCustomMode && selectedDateId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedDateId(opt.id);
                    setIsCustomMode(false);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/30 scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt.tag && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full mb-1 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {opt.tag}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-bold block truncate w-full">
                    {opt.shortLabel}
                  </span>
                  <span className={`text-[10px] mt-0.5 block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    Available
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Date Picker Toggle */}
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isCustomMode
                  ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{isCustomMode ? 'Using Custom Date' : 'Choose Custom Calendar Date'}</span>
            </button>

            {isCustomMode && (
              <input
                type="date"
                min={today.toISOString().split('T')[0]}
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-blue-400 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Time Slot Selection */}
          <div className="mt-4">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Select Preferred Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm font-black'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400 font-semibold'
                    }`}
                  >
                    <div className="text-xs leading-tight">{slot.label}</div>
                    <div className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}>
                      {slot.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: PACKING TYPE (STANDARD VS PREMIUM) ================= */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                2. Packing Type Selection
              </h2>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.5 rounded-full">
              Professional Materials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Standard Packing Card */}
            <div
              onClick={() => setPackingType('standard')}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                packingType === 'standard'
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Standard Packing
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Included in Base Fare (₹0)
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                  Ideal for normal residential goods, sturdy furniture, and durable belongings.
                </p>

                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Multi-layer bubble wrap for TV &amp; appliances</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>3-Ply corrugated carton boxes for kitchen &amp; clothes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Heavy-duty stretch film wrap to protect against dust</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reinforced adhesive sealing tape</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Upgrade Cost:</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
            </div>

            {/* Premium Packing Card */}
            <div
              onClick={() => setPackingType('premium')}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                packingType === 'premium'
                  ? 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/30 shadow-md ring-2 ring-orange-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Zero Damage Guarantee</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Premium 5-Layer Packing
                    </h3>
                  </div>
                  <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-2 py-0.5 rounded-full">
                    + ₹999 Only
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                  Best for luxury furniture, expensive electronics, glassware, and long-distance shifting.
                </p>

                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>5-Ply heavy duty export grade boxes &amp; corner guards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Thick EPE foam cushioning for screens &amp; glassware</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Wardrobe carton boxes for wrinkle-free clothes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Custom fragile labeling &amp; priority top-stack handling</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Damage Protection:</span>
                <span className="text-xs font-black text-orange-600 dark:text-orange-400">100% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: INSPECTION (VIDEO VS PHYSICAL) ================= */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                3. Pre-Move Inspection Audit
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Guarantees accurate truck sizing &amp; zero surprise fees
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Video Inspection */}
            <div
              onClick={() => setInspectionType('video')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                inspectionType === 'video'
                  ? 'border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 shadow-md ring-2 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                <Video className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Video Call Inspection
                  </h4>
                  <span className="text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full">
                    Instant &amp; Fast
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Quick 10-min WhatsApp/Google Meet video walkthrough with a moving expert. No home visit needed.
                </p>
              </div>
            </div>

            {/* Physical Home Audit */}
            <div
              onClick={() => setInspectionType('physical')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                inspectionType === 'physical'
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Physical Home Audit Visit
                  </h4>
                  <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    In-Person
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Our surveyor visits your premises in uniform to assess furniture, staircases, and truck parking access.
                </p>
              </div>
            </div>
          </div>

          {/* Inspection Date and Slot Picker */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Preferred Inspection Slot:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <input
                type="date"
                value={inspectionDate}
                min={today.toISOString().split('T')[0]}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />

              <select
                value={inspectionSlot}
                onChange={(e) => setInspectionSlot(e.target.value)}
                className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {inspectionSlots.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STEP 3: STICKY BOTTOM ACTION BAR ================= */}
      <div 
        id="schedule-packing-bottom-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-3 transition-all"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-xs shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isCustomMode ? customDate : (dateOptions.find(d => d.id === selectedDateId)?.label || 'Selected Date')}</span>
                <span className="text-blue-600 dark:text-blue-400 font-black">({selectedSlot})</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[190px] sm:max-w-xs">
                {packingType === 'premium' ? 'Premium 5-Layer' : 'Standard'} Packing • {inspectionType === 'video' ? 'Video Audit' : 'Physical Visit'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition-colors hidden sm:flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              id="btn-proceed-to-step4"
              type="button"
              onClick={handleContinue}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Continue (Step 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
