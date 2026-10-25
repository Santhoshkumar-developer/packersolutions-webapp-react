import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Lightbulb,
  Calendar,
  CircleDot,
  MapPin,
  Pencil,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
  ListChecks,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Home,
  Building2,
  Building,
  User,
  Phone,
  Layers,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  InventorySelectionScreen,
  SelectedItem,
} from "./InventorySelectionScreen";
import { BookingSummaryScreen } from "./BookingSummaryScreen";
import {
  PaymentGatewayPage,
  PaymentGatewayBookingData,
  PaymentResult,
} from "./PaymentGatewayPage";
import {
  SchedulePackingInspectionScreen,
  SchedulePackingInspectionData,
} from "./SchedulePackingInspectionScreen";

export interface BookingDraft {
  relocateType?: "within-city" | "between-city";
  originCity?: string;
  destinationCity?: string;
  houseSize?: string;
  pickupLoc?: string;
  dropLoc?: string;
  shiftingDate?: string;
  serviceName?: string;
  basePrice?: number;
  dropOption?: "single" | "multi";
  multiDropAddresses?: string[];
}

interface PickupDateTimePageProps {
  bookingDraft?: BookingDraft | null;
  onBack: () => void;
  onProceed?: (bookingSummary: any) => void;
  onNavigate?: (page: string, serviceId?: string) => void;
}

const CITIES_DATA = [
  { id: "cbe", name: "Coimbatore" },
  { id: "blr", name: "Bengaluru" },
  { id: "chn", name: "Chennai" },
  { id: "hyd", name: "Hyderabad" },
  { id: "mum", name: "Mumbai" },
  { id: "del", name: "Delhi NCR" },
  { id: "pune", name: "Pune" },
  { id: "kol", name: "Kolkata" },
  { id: "mdr", name: "Madurai" },
  { id: "trc", name: "Trichy" },
  { id: "slm", name: "Salem" },
  { id: "koc", name: "Kochi" },
];

const HOUSE_SIZE_OPTIONS = [
  { id: "1 RK", label: "1 RK", sub: "Studio / Single Room", base: 3800 },
  { id: "1 BHK", label: "1 BHK", sub: "Compact Flat", base: 4900 },
  {
    id: "2 BHK",
    label: "2 BHK",
    sub: "Standard Family Home",
    base: 6050,
    popular: true,
  },
  { id: "3 BHK", label: "3 BHK", sub: "Large Apartment", base: 8400 },
  {
    id: "4+ BHK",
    label: "4+ BHK / Villa",
    sub: "Independent Bungalow",
    base: 12500,
  },
];

export const PickupDateTimePage: React.FC<PickupDateTimePageProps> = ({
  bookingDraft,
  onBack,
  onProceed,
  onNavigate,
}) => {
  // Booking flow step: location (1) -> inventory (2) -> schedule (3) -> summary (4) -> payment (5) -> success (6)
  const [bookingStep, setBookingStep] = useState<
    "location" | "inventory" | "schedule" | "summary" | "payment" | "success"
  >("location");

  // Local draft resolver
  const [resolvedDraft, setResolvedDraft] = useState<BookingDraft | null>(
    bookingDraft || null,
  );

  // ================= STEP 1 STATE: MOVE DETAILS =================
  const [relocateType, setRelocateType] = useState<
    "within-city" | "between-city"
  >("within-city");
  const [selectedCity, setSelectedCity] = useState<string>("Coimbatore");
  const [destinationCity, setDestinationCity] = useState<string>("Coimbatore");
  const [selectedHouseSize, setSelectedHouseSize] = useState<string>("2 BHK");

  // Location inputs
  const [dropOption, setDropOption] = useState<"single" | "multi">("single");
  const [pickupAddress, setPickupAddress] = useState<string>(
    "462, Ramalakshmi Nagar 2nd Street",
  );
  const [dropAddress, setDropAddress] = useState<string>(
    "Peelamedu, Coimbatore",
  );
  const [multiDropAddresses, setMultiDropAddresses] = useState<string[]>([
    "Peelamedu, Coimbatore",
    "Gandhipuram, Coimbatore",
  ]);

  // Floor & Lift
  const [pickupFloor, setPickupFloor] = useState<string>("1st Floor");
  const [dropFloor, setDropFloor] = useState<string>("2nd Floor");
  const [isPickupLiftAvailable, setIsPickupLiftAvailable] =
    useState<boolean>(true);
  const [isDropLiftAvailable, setIsDropLiftAvailable] = useState<boolean>(true);

  // Receiver Contact Info: MySelf or Others
  const [receiverType, setReceiverType] = useState<"myself" | "others">(
    "myself",
  );
  const [receiverName, setReceiverName] = useState<string>("Suresh Kumar");
  const [receiverPhone, setReceiverPhone] = useState<string>("9876543210");
  const [step1Error, setStep1Error] = useState<string>("");

  // ================= STEP 2 STATE: INVENTORY =================
  const [selectedInventorySummary, setSelectedInventorySummary] = useState<
    SelectedItem[]
  >([]);
  const [specialNotesState, setSpecialNotesState] = useState<string>("");

  // ================= STEP 3 STATE: SCHEDULE, PACKING & INSPECTION =================
  const [scheduleData, setScheduleData] =
    useState<SchedulePackingInspectionData>({
      pickupDateId: "tomorrow",
      pickupDateLabel: `Tomorrow, ${new Date(Date.now() + 86400000).getDate()}`,
      pickupDateValue: new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0],
      pickupSlot: "9:00 AM - 11:00 AM",
      packingType: "standard",
      inspectionType: "video",
      inspectionDate: new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0],
      inspectionSlot: "10:00 AM - 12:00 PM",
    });

  // ================= STEP 4 & 5 STATE: SUMMARY & PAYMENT =================
  const [pendingPaymentData, setPendingPaymentData] =
    useState<PaymentGatewayBookingData | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [finalBookingSnapshot, setFinalBookingSnapshot] = useState<any>(null);

  // Initialize draft
  useEffect(() => {
    let activeDraft = bookingDraft;
    if (!activeDraft) {
      try {
        const stored = localStorage.getItem("ps_house_shifting_draft");
        if (stored) activeDraft = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse draft from localStorage:", e);
      }
    }
    setResolvedDraft(activeDraft || null);

    if (activeDraft) {
      if (activeDraft.relocateType) setRelocateType(activeDraft.relocateType);
      if (activeDraft.originCity) setSelectedCity(activeDraft.originCity);
      if (activeDraft.destinationCity)
        setDestinationCity(activeDraft.destinationCity);
      if (activeDraft.houseSize) setSelectedHouseSize(activeDraft.houseSize);
      if (activeDraft.pickupLoc) setPickupAddress(activeDraft.pickupLoc);
      if (activeDraft.dropLoc) setDropAddress(activeDraft.dropLoc);
      if (activeDraft.dropOption) setDropOption(activeDraft.dropOption);
      if (
        activeDraft.multiDropAddresses &&
        activeDraft.multiDropAddresses.length > 0
      ) {
        setMultiDropAddresses(activeDraft.multiDropAddresses);
      }
    }
  }, [bookingDraft]);

  // Compute current base price based on selected house size
  const currentBasePrice =
    HOUSE_SIZE_OPTIONS.find((h) => h.label === selectedHouseSize)?.base || 6050;

  // Validation for Step 1
  const handleProceedFromStep1 = () => {
    if (!pickupAddress.trim()) {
      setStep1Error("Please enter your pickup address.");
      return;
    }
    if (dropOption === "single" && !dropAddress.trim()) {
      setStep1Error("Please enter your drop address.");
      return;
    }
    if (dropOption === "multi" && multiDropAddresses.some((a) => !a.trim())) {
      setStep1Error("Please provide all destination stop addresses.");
      return;
    }
    if (receiverType === "others") {
      if (!receiverName.trim()) {
        setStep1Error("Please enter the contact person's name.");
        return;
      }
      if (!receiverPhone.trim() || receiverPhone.trim().length < 10) {
        setStep1Error("Please enter a valid 10-digit mobile number.");
        return;
      }
    }
    setStep1Error("");
    setBookingStep("inventory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 Proceed
  const handleProceedFromStep2 = (items: SelectedItem[], notes?: string) => {
    setSelectedInventorySummary(items);
    if (notes) setSpecialNotesState(notes);
    setBookingStep("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 Proceed
  const handleProceedFromStep3 = (data: SchedulePackingInspectionData) => {
    setScheduleData(data);
    setBookingStep("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 4 Proceed to Payment
  const handleProceedToPayment = (finalBookingData: any) => {
    setFinalBookingSnapshot(finalBookingData);

    const generatedTicketId = `PS-${Date.now().toString().slice(-6)}`;
    const effectiveDrop =
      dropOption === "multi"
        ? multiDropAddresses.filter(Boolean).join(" -> ")
        : dropAddress;

    const paymentPayload: PaymentGatewayBookingData = {
      ticketId: generatedTicketId,
      serviceName: `${selectedHouseSize} Household Shifting`,
      houseSize: selectedHouseSize,
      pickupAddress: `${pickupAddress} (${selectedCity})`,
      dropAddress: `${effectiveDrop} (${destinationCity})`,
      dropOption,
      multiDropAddresses,
      pickupDate: scheduleData.pickupDateLabel,
      pickupSlot: scheduleData.pickupSlot,
      basePrice: currentBasePrice,
      totalOrderAmount: finalBookingData.totalOrderAmount || 6050,
      finalTotalAmount: finalBookingData.finalTotalAmount || 6050,
      bookingAdvanceAmount: finalBookingData.bookingAdvanceAmount || 907,
      remainingAtUnloading: finalBookingData.remainingAtUnloading || 5143,
      selectedInventory: selectedInventorySummary.map((s) => ({
        name: s.item.name,
        category: s.item.category,
        quantity: s.quantity,
        subtext: s.item.subtext,
      })),
      totalItemCount: selectedInventorySummary.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      ),
    };

    setPendingPaymentData(paymentPayload);
    setBookingStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 5 Payment Success Handler
  const handlePaymentSuccess = (paymentResult: PaymentResult) => {
    const finalRecord = {
      ticketId: pendingPaymentData?.ticketId || paymentResult.transactionId,
      paymentId: paymentResult.transactionId,
      paymentMethod: paymentResult.paymentMethod,
      amountPaid: paymentResult.amountPaid,
      paidAt: paymentResult.paymentDate,
      relocateType,
      selectedCity,
      destinationCity,
      houseSize: selectedHouseSize,
      pickupAddress,
      dropAddress:
        dropOption === "multi" ? multiDropAddresses.join(" -> ") : dropAddress,
      pickupFloor,
      dropFloor,
      isPickupLiftAvailable,
      isDropLiftAvailable,
      receiverType,
      receiverName: receiverType === "others" ? receiverName : "Self",
      receiverPhone: receiverType === "others" ? receiverPhone : "9876543210",
      pickupDate: scheduleData.pickupDateLabel,
      pickupSlot: scheduleData.pickupSlot,
      packingType: scheduleData.packingType,
      inspectionType: scheduleData.inspectionType,
      inspectionSlot: scheduleData.inspectionSlot,
      inventoryItems: selectedInventorySummary,
      totalInventoryCount: selectedInventorySummary.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      ),
      totalAmount: finalBookingSnapshot?.finalTotalAmount || 6050,
      advancePayable: finalBookingSnapshot?.bookingAdvanceAmount || 907,
      remainingPayable: finalBookingSnapshot?.remainingAtUnloading || 5143,
    };

    setConfirmedBooking(finalRecord);
    setBookingStep("success");
    if (onProceed) onProceed(finalRecord);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="pickup-datetime-page"
      className="min-h-screen bg-gradient-to-b from-[#102048] via-[#152a5f] to-[#0c1836] py-6 px-3 sm:px-6 transition-colors font-sans text-white relative"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Render Step Screen */}
        {bookingStep === "success" ? (
          /* ================= STEP 6: BOOKING SUCCESS SCREEN ================= */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 text-center text-slate-900 dark:text-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">
              Booking Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Your relocation order{" "}
              <span className="font-mono font-bold text-blue-600">
                #{confirmedBooking?.ticketId}
              </span>{" "}
              is officially locked with our crew &amp; truck.
            </p>

            {/* Confirmation Overview Box */}
            <div className="my-6 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 text-left max-w-xl mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Service &amp; Scale:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {confirmedBooking?.houseSize} Household Shifting
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Pickup Date &amp; Slot:</span>
                <span className="font-bold text-blue-600">
                  {confirmedBooking?.pickupDate} ({confirmedBooking?.pickupSlot}
                  )
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Pickup Address:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[280px]">
                  {confirmedBooking?.pickupAddress}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Drop Destination:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[280px]">
                  {confirmedBooking?.dropAddress}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Packing Grade:</span>
                <span className="font-bold capitalize text-slate-900 dark:text-white">
                  {confirmedBooking?.packingType} Packing
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Advance Paid:</span>
                <span className="font-black text-emerald-600">
                  ₹ {confirmedBooking?.amountPaid?.toLocaleString("en-IN")}{" "}
                  (Confirmed)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate("home");
                  else onBack();
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : bookingStep === "payment" ? (
          /* ================= STEP 5: PAYMENT GATEWAY ================= */
          pendingPaymentData && (
            <PaymentGatewayPage
              bookingData={pendingPaymentData}
              onBack={() => {
                setBookingStep("summary");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onNavigate={onNavigate}
            />
          )
        ) : bookingStep === "summary" ? (
          /* ================= STEP 4: SUMMARY & ADDONS SCREEN ================= */
          <BookingSummaryScreen
            bookingData={{
              relocateType,
              originCity: selectedCity,
              destinationCity,
              houseSize: selectedHouseSize,
              serviceName: "Household Shifting",
              pickupAddress,
              dropAddress:
                dropOption === "multi"
                  ? multiDropAddresses.join(" -> ")
                  : dropAddress,
              dropOption,
              multiDropAddresses,
              pickupFloor,
              dropFloor,
              isPickupLiftAvailable,
              isDropLiftAvailable,
              receiverType,
              receiverName,
              receiverPhone,
              pickupDate: scheduleData.pickupDateLabel,
              pickupSlot: scheduleData.pickupSlot,
              packingType: scheduleData.packingType,
              inspectionType: scheduleData.inspectionType,
              inspectionDate: scheduleData.inspectionDate,
              inspectionSlot: scheduleData.inspectionSlot,
              basePrice: currentBasePrice,
              specialInstructions: specialNotesState,
            }}
            selectedInventory={selectedInventorySummary}
            onBackToInventory={() => {
              setBookingStep("inventory");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onEditStep={(stepNum) => {
              if (stepNum === 1) setBookingStep("location");
              else if (stepNum === 2) setBookingStep("inventory");
              else if (stepNum === 3) setBookingStep("schedule");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onConfirmBooking={handleProceedToPayment}
          />
        ) : bookingStep === "schedule" ? (
          /* ================= STEP 3: SCHEDULE, PACKING & INSPECTION ================= */
          <SchedulePackingInspectionScreen
            initialData={scheduleData}
            basePrice={currentBasePrice}
            onBack={() => {
              setBookingStep("inventory");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onProceed={handleProceedFromStep3}
          />
        ) : bookingStep === "inventory" ? (
          /* ================= STEP 2: INVENTORY SELECTION ================= */
          <InventorySelectionScreen
            bookingData={{
              pickupAddress,
              dropAddress:
                dropOption === "multi"
                  ? multiDropAddresses.join(" -> ")
                  : dropAddress,
              pickupDate: scheduleData.pickupDateLabel,
              pickupSlot: scheduleData.pickupSlot,
              serviceName: "Household Shifting",
              houseSize: selectedHouseSize,
              basePrice: currentBasePrice,
            }}
            initialSelectedItems={selectedInventorySummary}
            onBackToDateTime={() => {
              setBookingStep("location");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onProceedToConfirmation={handleProceedFromStep2}
          />
        ) : (
          /* ================= STEP 1: MOVE DETAILS (LOCATION, HOUSE SIZE, RECEIVER) ================= */
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-8 text-slate-900 dark:text-white text-left transition-all animate-in fade-in duration-200 pb-28">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                    Step 1 of 4: Move Details
                  </span>
                  <h1 className="text-base sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    Configure Your Shifting Requirements
                  </h1>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-xs text-slate-400 font-medium block">
                  Starting From
                </span>
                <span className="text-base font-black text-blue-600 dark:text-blue-400">
                  ₹ {currentBasePrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {step1Error && (
              <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{step1Error}</span>
              </div>
            )}

            <div className="mt-6 space-y-7">
              {/* 1) WITHIN CITY / BETWEEN CITY TOGGLE */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    1. Shifting Relocation Type
                  </label>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Selected:{" "}
                    {relocateType === "within-city"
                      ? "Within City (Local)"
                      : "Between City (Intercity)"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setRelocateType("within-city")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      relocateType === "within-city"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Within City</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRelocateType("between-city")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      relocateType === "between-city"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Between City</span>
                  </button>
                </div>
              </div>

              {/* 2) HOUSE SIZE OPTIONS (SELECTED) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    2. House Size Options
                  </label>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Currently Selected:{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      {selectedHouseSize}
                    </strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {HOUSE_SIZE_OPTIONS.map((house) => {
                    const isSelected = selectedHouseSize === house.label;
                    return (
                      <div
                        key={house.id}
                        onClick={() => setSelectedHouseSize(house.label)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left relative ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500/20"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 hover:border-slate-300"
                        }`}
                      >
                        {house.popular && (
                          <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs">
                            Popular
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-black text-slate-900 dark:text-white">
                              {house.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">
                            {house.sub}
                          </span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                          <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">
                            ₹ {house.base.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3) LOCATION SELECTION (PICKUP & DROP SAME LIKE OFFICE SHIFTING FORM) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    3. Shifting Route &amp; Locations
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDropOption("single")}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                        dropOption === "single"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "text-slate-500"
                      }`}
                    >
                      Single Drop
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => setDropOption("multi")}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                        dropOption === "multi"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "text-slate-500"
                      }`}
                    >
                      Multiple Stops
                    </button>
                  </div>
                </div>

                {/* Origin & Destination City Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Origin City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    >
                      {CITIES_DATA.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Destination City
                    </label>
                    <select
                      value={
                        relocateType === "within-city"
                          ? selectedCity
                          : destinationCity
                      }
                      disabled={relocateType === "within-city"}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white ${
                        relocateType === "within-city"
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {CITIES_DATA.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Office-Shifting Style Visual Connector Card */}
                <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 relative">
                  {/* Visual Connector Axis */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-between pt-2.5 shrink-0">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div className="w-0.5 h-16 border-l-2 border-dashed border-slate-300 dark:border-slate-700 my-1" />
                      <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-rose-600" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Pickup Address Field */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Pickup Address ({selectedCity})
                          </span>
                        </div>
                        <input
                          type="text"
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="Flat/House No, Building name, Street name, Locality"
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floor & Lift for Pickup */}
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-500">
                              Floor:
                            </span>
                            <select
                              value={pickupFloor}
                              onChange={(e) => setPickupFloor(e.target.value)}
                              className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200"
                            >
                              {[
                                "Ground Floor",
                                "1st Floor",
                                "2nd Floor",
                                "3rd Floor",
                                "4th Floor",
                                "5th+ Floor",
                              ].map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </div>

                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isPickupLiftAvailable}
                              onChange={(e) =>
                                setIsPickupLiftAvailable(e.target.checked)
                              }
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              Service Lift Available
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Drop Destination Field */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Drop Destination (
                            {relocateType === "within-city"
                              ? selectedCity
                              : destinationCity}
                            )
                          </span>
                        </div>

                        {dropOption === "single" ? (
                          <input
                            type="text"
                            value={dropAddress}
                            onChange={(e) => setDropAddress(e.target.value)}
                            placeholder="Destination Apartment, Road, Area, Landmark"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="space-y-2">
                            {multiDropAddresses.map((addr, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="text"
                                  value={addr}
                                  onChange={(e) => {
                                    const copy = [...multiDropAddresses];
                                    copy[idx] = e.target.value;
                                    setMultiDropAddresses(copy);
                                  }}
                                  placeholder={`Delivery Stop #${idx + 1}`}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white"
                                />
                                {multiDropAddresses.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setMultiDropAddresses(
                                        multiDropAddresses.filter(
                                          (_, i) => i !== idx,
                                        ),
                                      )
                                    }
                                    className="text-rose-500 hover:text-rose-700 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {multiDropAddresses.length < 4 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setMultiDropAddresses([
                                    ...multiDropAddresses,
                                    "",
                                  ])
                                }
                                className="text-xs font-bold text-blue-600 flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Another Delivery Stop</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Floor & Lift for Drop */}
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-500">
                              Floor:
                            </span>
                            <select
                              value={dropFloor}
                              onChange={(e) => setDropFloor(e.target.value)}
                              className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200"
                            >
                              {[
                                "Ground Floor",
                                "1st Floor",
                                "2nd Floor",
                                "3rd Floor",
                                "4th Floor",
                                "5th+ Floor",
                              ].map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </div>

                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isDropLiftAvailable}
                              onChange={(e) =>
                                setIsDropLiftAvailable(e.target.checked)
                              }
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              Service Lift Available
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4) WHO WILL RECEIVE THE ITEMS: MYSELF / OTHERS */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    4. Who will receive the items?
                  </label>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Receiver:{" "}
                    {receiverType === "myself" ? "MySelf" : "Other Person"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3">
                  <button
                    type="button"
                    onClick={() => setReceiverType("myself")}
                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      receiverType === "myself"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>MySelf</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReceiverType("others")}
                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      receiverType === "others"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Others</span>
                  </button>
                </div>

                {/* Contact Name and Mobile inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {receiverType === "myself"
                        ? "Your Name"
                        : "Receiver Contact Name"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {receiverType === "myself"
                        ? "Your Mobile Number"
                        : "Receiver Mobile Number"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={receiverPhone}
                        onChange={(e) =>
                          setReceiverPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="10-digit mobile number"
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= STEP 1: STICKY BOTTOM ACTION BAR ================= */}
            <div
              id="step1-move-details-bottom-bar"
              className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-3 transition-all"
            >
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-xs shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{selectedHouseSize} Shifting</span>
                      <span className="text-blue-600 dark:text-blue-400 font-black">
                        ₹ {currentBasePrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate max-w-[190px] sm:max-w-xs">
                      {relocateType === "within-city"
                        ? `Within ${selectedCity} • Local Move`
                        : `${selectedCity} → ${destinationCity} • Intercity`}
                      {receiverType === "others" && receiverName
                        ? ` • Recv: ${receiverName}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-continue-to-step2"
                    type="button"
                    onClick={handleProceedFromStep1}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <span>Continue (Step 2)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
