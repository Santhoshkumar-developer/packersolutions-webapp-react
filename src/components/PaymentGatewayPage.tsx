import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  MapPin, 
  Package, 
  ChevronRight, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Printer, 
  Share2, 
  ExternalLink,
  Shield,
  HelpCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface PaymentGatewayBookingData {
  ticketId?: string;
  pickupAddress: string;
  dropAddress: string;
  dropOption?: 'single' | 'multi';
  multiDropAddresses?: string[];
  pickupDate: string;
  pickupSlot: string;
  serviceName?: string;
  houseSize?: string;
  basePrice?: number;
  totalOrderAmount?: number;
  finalTotalAmount?: number;
  bookingAdvanceAmount?: number;
  remainingAtUnloading?: number;
  isProtectAdded?: boolean;
  isPackagingAdded?: boolean;
  isCashRedeemed?: boolean;
  selectedInventory?: Array<{ name: string; category?: string; quantity: number; subtext?: string }>;
  totalItemCount?: number;
  specialInstructions?: string;
}

export interface PaymentResult {
  transactionId: string;
  paymentMethod: string;
  paymentDetails: string;
  amountPaid: number;
  remainingAmount: number;
  paymentDate: string;
  status: 'SUCCESS' | 'FAILED';
  bookingRecord: any;
}

interface PaymentGatewayPageProps {
  bookingData?: PaymentGatewayBookingData;
  onBack: () => void;
  onPaymentSuccess?: (result: PaymentResult) => void;
  onNavigate?: (page: string, serviceId?: string) => void;
}

type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet';

const POPULAR_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC', badge: 'Fastest' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBI', badge: 'Popular' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICICI', badge: 'Instant' },
  { id: 'axis', name: 'Axis Bank', code: 'UTIB', badge: 'Instant' },
  { id: 'kotak', name: 'Kotak Mahindra', code: 'KKBK', badge: 'Popular' },
  { id: 'pnb', name: 'Punjab National Bank', code: 'PUNB', badge: 'Secure' },
];

const ALL_BANKS = [
  'AU Small Finance Bank',
  'Bank of Baroda',
  'Bank of India',
  'Bank of Maharashtra',
  'Canara Bank',
  'Central Bank of India',
  'City Union Bank',
  'Federal Bank',
  'IDBI Bank',
  'IDFC FIRST Bank',
  'Indian Bank',
  'Indian Overseas Bank',
  'IndusInd Bank',
  'Jammu & Kashmir Bank',
  'Karnataka Bank',
  'Karur Vysya Bank',
  'RBL Bank',
  'South Indian Bank',
  'UCO Bank',
  'Union Bank of India',
  'Yes Bank'
];

export const PaymentGatewayPage: React.FC<PaymentGatewayPageProps> = ({
  bookingData: propBookingData,
  onBack,
  onPaymentSuccess,
  onNavigate
}) => {
  // Fallback booking data if accessed directly via URL or draft
  const defaultBookingData: PaymentGatewayBookingData = {
    ticketId: 'PS-' + Math.floor(100000 + Math.random() * 900000),
    pickupAddress: '462, Ramalakshmi Nagar 2nd Street, Coimbatore',
    dropAddress: 'Peelamedu, Coimbatore, Tamil Nadu',
    pickupDate: 'Tomorrow',
    pickupSlot: '9AM',
    serviceName: 'Household Shifting',
    houseSize: '2 BHK',
    basePrice: 6050,
    totalOrderAmount: 6550,
    finalTotalAmount: 5945,
    bookingAdvanceAmount: 907,
    remainingAtUnloading: 5038,
    isProtectAdded: true,
    isPackagingAdded: false,
    isCashRedeemed: true,
    totalItemCount: 14,
    selectedInventory: [
      { name: 'Double Bed with Mattress', category: 'Bedroom', quantity: 1 },
      { name: '3-Seater Sofa', category: 'Living Room', quantity: 1 },
      { name: 'Double Door Refrigerator', category: 'Kitchen', quantity: 1 },
      { name: 'Fully Automatic Washing Machine', category: 'Appliances', quantity: 1 },
      { name: 'Carton Boxes (Medium)', category: 'Boxes', quantity: 10 },
    ]
  };

  const bookingData = propBookingData || defaultBookingData;

  // Payment plan options: Advance (15%) vs Full Payment (with extra ₹150 discount)
  const [paymentPlan, setPaymentPlan] = useState<'advance' | 'full'>('advance');
  const fullPaymentDiscount = 150;
  
  const payableAmount = paymentPlan === 'advance' 
    ? (bookingData.bookingAdvanceAmount || Math.round((bookingData.finalTotalAmount || 6050) * 0.15))
    : Math.max(100, (bookingData.finalTotalAmount || 6050) - fullPaymentDiscount);

  const remainingBalance = paymentPlan === 'advance'
    ? ((bookingData.finalTotalAmount || 6050) - payableAmount)
    : 0;

  // Payment method selection
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi');
  const [upiSubTab, setUpiSubTab] = useState<'apps' | 'qr' | 'vpa'>('apps');

  // UPI State
  const [upiId, setUpiId] = useState('');
  const [upiIdVerified, setUpiIdVerified] = useState(false);
  const [upiError, setUpiError] = useState('');
  const [qrTimer, setQrTimer] = useState(300); // 5 minutes timer

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [cardError, setCardError] = useState('');

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('hdfc');
  const [otherBankSearch, setOtherBankSearch] = useState('');

  // Wallet State
  const [selectedWallet, setSelectedWallet] = useState<'paytm' | 'phonepe' | 'amazon' | 'simpl'>('paytm');

  // Interactive Flow States: 'checkout' | 'otp_modal' | 'processing' | 'confirmed' | 'failed'
  const [paymentState, setPaymentState] = useState<'checkout' | 'otp_modal' | 'processing' | 'confirmed' | 'failed'>('checkout');
  const [processingStep, setProcessingStep] = useState('Connecting to banking server...');
  const [testModeSuccess, setTestModeSuccess] = useState(true);
  const [otpInput, setOtpInput] = useState('849201');
  const [copiedId, setCopiedId] = useState(false);
  const [confirmedTransaction, setConfirmedTransaction] = useState<PaymentResult | null>(null);

  // Security session countdown (15 min timer)
  const [sessionSeconds, setSessionSeconds] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // QR Code Timer countdown
  useEffect(() => {
    if (selectedMethod === 'upi' && upiSubTab === 'qr') {
      const qrInterval = setInterval(() => {
        setQrTimer(prev => (prev > 0 ? prev - 1 : 300));
      }, 1000);
      return () => clearInterval(qrInterval);
    }
  }, [selectedMethod, upiSubTab]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    setCardError('');
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
    setCardError('');
  };

  const detectCardBrand = (number: string) => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'Mastercard';
    if (/^60|^65|^8[1-2]/.test(clean)) return 'RuPay';
    if (/^3[47]/.test(clean)) return 'Amex';
    return 'Card';
  };

  // UPI verification simulation
  const handleVerifyUpi = () => {
    if (!upiId.includes('@')) {
      setUpiError('Please enter a valid UPI ID (e.g., name@okhdfcbank)');
      setUpiIdVerified(false);
      return;
    }
    setUpiError('');
    setUpiIdVerified(true);
  };

  // Initiate payment execution
  const handleInitiatePayment = () => {
    if (selectedMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 15) {
        setCardError('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setCardError('Please enter card expiry (MM/YY)');
        return;
      }
      if (cardCvv.length < 3) {
        setCardError('Please enter 3-digit CVV');
        return;
      }
      // Show simulated 3D secure bank OTP
      setPaymentState('otp_modal');
      return;
    }

    if (selectedMethod === 'upi' && upiSubTab === 'vpa') {
      if (!upiId.includes('@')) {
        setUpiError('Please enter and verify a valid UPI ID');
        return;
      }
    }

    startProcessingSimulation();
  };

  const startProcessingSimulation = () => {
    setPaymentState('processing');
    setProcessingStep('Initializing 256-bit encrypted gateway...');

    setTimeout(() => {
      setProcessingStep('Authorizing with Indian Banking Switch / NPCI...');
    }, 1200);

    setTimeout(() => {
      setProcessingStep('Confirming reservation & generating e-receipt...');
    }, 2400);

    setTimeout(() => {
      if (testModeSuccess) {
        const txnId = 'TXN-PS-' + Math.floor(10000000 + Math.random() * 90000000);
        let methodLabel = 'UPI - Instant';
        let detailLabel = 'UPI / QR Payment';
        if (selectedMethod === 'card') {
          methodLabel = `${detectCardBrand(cardNumber)} ending in ${cardNumber.slice(-4) || '4242'}`;
          detailLabel = 'Credit/Debit Card';
        } else if (selectedMethod === 'netbanking') {
          const bankObj = POPULAR_BANKS.find(b => b.id === selectedBank);
          methodLabel = bankObj ? bankObj.name : otherBankSearch || 'Net Banking';
          detailLabel = 'Internet Banking';
        } else if (selectedMethod === 'wallet') {
          methodLabel = selectedWallet.toUpperCase() + ' Wallet';
          detailLabel = 'Digital Wallet';
        }

        const finalResult: PaymentResult = {
          transactionId: txnId,
          paymentMethod: methodLabel,
          paymentDetails: detailLabel,
          amountPaid: payableAmount,
          remainingAmount: remainingBalance,
          paymentDate: new Date().toLocaleString('en-IN', { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
          }),
          status: 'SUCCESS',
          bookingRecord: {
            ...bookingData,
            paymentStatus: 'PAID',
            transactionId: txnId,
            paidAmount: payableAmount,
            remainingBalance: remainingBalance,
            paymentMethod: methodLabel,
            status: 'Confirmed',
            bookedAt: new Date().toLocaleString()
          }
        };

        // Save to localStorage ps_user_bookings & packers_bookings
        try {
          const existing = localStorage.getItem('ps_user_bookings');
          const list = existing ? JSON.parse(existing) : [];
          list.unshift(finalResult.bookingRecord);
          localStorage.setItem('ps_user_bookings', JSON.stringify(list));

          const allBookings = localStorage.getItem('packers_bookings');
          const allList = allBookings ? JSON.parse(allBookings) : [];
          allList.unshift({
            id: bookingData.ticketId || finalResult.bookingRecord.ticketId,
            serviceName: bookingData.serviceName || 'Household Shifting',
            movingFrom: bookingData.pickupAddress,
            movingTo: bookingData.dropAddress,
            status: 'Confirmed & Advance Paid',
            amount: payableAmount,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('packers_bookings', JSON.stringify(allList));
        } catch (err) {
          console.error('Error recording booking:', err);
        }

        setConfirmedTransaction(finalResult);
        setPaymentState('confirmed');
        if (onPaymentSuccess) {
          onPaymentSuccess(finalResult);
        }
      } else {
        setPaymentState('failed');
      }
    }, 3600);
  };

  const handleCopyTicket = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadReceipt = () => {
    if (!confirmedTransaction) return;
    const content = `=========================================
PACKERSOLUTION - PAYMENT RECEIPT & BOOKING PASS
=========================================
Booking Ticket ID: ${bookingData.ticketId}
Transaction ID:    ${confirmedTransaction.transactionId}
Payment Status:    SUCCESS (256-bit Encrypted)
Payment Date:      ${confirmedTransaction.paymentDate}
Payment Method:    ${confirmedTransaction.paymentMethod}

Amount Paid Now:   INR ${confirmedTransaction.amountPaid.toLocaleString('en-IN')}
Balance on Drop:   INR ${confirmedTransaction.remainingAmount.toLocaleString('en-IN')}
Total Relocation:  INR ${(confirmedTransaction.amountPaid + confirmedTransaction.remainingAmount).toLocaleString('en-IN')}

SERVICE & SCHEDULE DETAILS:
Service:           ${bookingData.serviceName} (${bookingData.houseSize || '2 BHK'})
Pickup Date:       ${bookingData.pickupDate}
Time Slot:         ${bookingData.pickupSlot}
Pickup Address:    ${bookingData.pickupAddress}
Delivery Address:  ${bookingData.dropAddress}

ASSISTANCE & SUPPORT:
Toll-Free Helpline: 1800-PACKERS (1800-722-5377)
Live Chat:          https://packersolution.in/support
Free Rescheduling: Up to 24h before pickup.
=========================================
Thank you for trusting Packersolution!`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${bookingData.ticketId}_${confirmedTransaction.transactionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      id="payment-gateway-page" 
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16 transition-colors"
    >
      {/* ================= TOP SECURITY HEADER ================= */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="btn-back-to-summary"
              type="button"
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                Packer<span className="text-[#f0142f]">solution</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Secure Checkout
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Session Expiry Timer */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Session valid for {formatTimer(sessionSeconds)}</span>
            </div>

            {/* PCI-DSS & 256-bit Badge */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="hidden md:inline">256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CHECKOUT CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">

        {/* ----------------- STATE: CONFIRMED ----------------- */}
        {paymentState === 'confirmed' && confirmedTransaction ? (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-9 text-center relative overflow-hidden">
              {/* Top celebration badge */}
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3.5 py-1 rounded-full mb-2">
                Payment Successful &amp; Booking Confirmed
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                You're All Set for Moving Day!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                We have received your advance payment of <span className="font-bold text-slate-900 dark:text-white">₹{confirmedTransaction.amountPaid.toLocaleString('en-IN')}</span>. A dedicated move coordinator has been assigned.
              </p>

              {/* Transaction & Ticket Pill Box */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Booking Ticket ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-[#1e74e6] dark:text-blue-400">
                      {bookingData.ticketId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyTicket(bookingData.ticketId || '')}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title="Copy Ticket ID"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {confirmedTransaction.transactionId}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Payment Method</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {confirmedTransaction.paymentMethod}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Paid At</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {confirmedTransaction.paymentDate}
                  </span>
                </div>

                {confirmedTransaction.remainingAmount > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <span>Remaining Balance at Delivery:</span>
                    <span>₹{confirmedTransaction.remainingAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Shifting Details Recap */}
              <div className="mt-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-left bg-white dark:bg-slate-900 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Scheduled Pickup: {bookingData.pickupDate} at {bookingData.pickupSlot}</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Pickup Location</span>
                      <span>{bookingData.pickupAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Delivery Destination</span>
                      <span>{bookingData.dropAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  id="btn-download-receipt"
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>

                <button
                  id="btn-go-to-moves"
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('order-tracking', bookingData?.ticketId);
                    } else {
                      window.location.hash = bookingData?.ticketId ? `#order-tracking/${bookingData.ticketId}` : '#order-tracking';
                    }
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <span>Track Live Relocation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Free cancellation &amp; 100% refund up to 24 hours before pickup</span>
              </div>
            </div>
          </div>
        ) : paymentState === 'failed' ? (
          /* ----------------- STATE: FAILED / DECLINED ----------------- */
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-rose-100 dark:border-rose-950/60 p-6 sm:p-8">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-rose-50 dark:ring-rose-950/30">
                <AlertCircle className="w-8 h-8" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Payment Unsuccessful</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                The bank or UPI switch declined the transaction. No amount has been deducted from your account.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setTestModeSuccess(true);
                    setPaymentState('checkout');
                  }}
                  className="w-full bg-[#1e74e6] hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Retry Payment
                </button>

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold py-3 rounded-xl text-xs cursor-pointer"
                >
                  Change Shifting Options
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ----------------- STATE: CHECKOUT FORM ----------------- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: Payment Methods Selector (7 cols) */}
            <div className="lg:col-span-7 space-y-5">

              {/* Payment Split / Plan Options Box */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Select Payment Plan
                  </h2>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                    Zero Risk Guarantee
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Advance Booking (Recommended) */}
                  <label 
                    onClick={() => setPaymentPlan('advance')}
                    className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      paymentPlan === 'advance'
                        ? 'border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Pay Advance (15%)</span>
                          <span className="text-[9px] font-extrabold uppercase bg-purple-600 text-white px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Lock truck &amp; crew. Pay rest after unloading.
                        </p>
                      </div>
                      <input 
                        type="radio" 
                        name="payment_plan" 
                        checked={paymentPlan === 'advance'} 
                        onChange={() => setPaymentPlan('advance')}
                        className="w-4 h-4 text-purple-600 accent-purple-600"
                      />
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-500">Pay Now</span>
                      <span className="text-base font-extrabold text-purple-700 dark:text-purple-400">
                        ₹ {payableAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </label>

                  {/* Option 2: 100% Full Payment */}
                  <label 
                    onClick={() => setPaymentPlan('full')}
                    className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      paymentPlan === 'full'
                        ? 'border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Full Payment</span>
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                            Save ₹150
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Get instant ₹150 prepaid cashback waiver.
                        </p>
                      </div>
                      <input 
                        type="radio" 
                        name="payment_plan" 
                        checked={paymentPlan === 'full'} 
                        onChange={() => setPaymentPlan('full')}
                        className="w-4 h-4 text-purple-600 accent-purple-600"
                      />
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-500">Pay Now</span>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          ₹ {payableAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Methods Tabs Navigation */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                {/* Method selector tabs */}
                <div className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`py-3.5 px-2 text-center text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer border-b-2 ${
                      selectedMethod === 'upi'
                        ? 'border-[#1e74e6] text-[#1e74e6] bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`py-3.5 px-2 text-center text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer border-b-2 ${
                      selectedMethod === 'card'
                        ? 'border-[#1e74e6] text-[#1e74e6] bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`py-3.5 px-2 text-center text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer border-b-2 ${
                      selectedMethod === 'netbanking'
                        ? 'border-[#1e74e6] text-[#1e74e6] bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('wallet')}
                    className={`py-3.5 px-2 text-center text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer border-b-2 ${
                      selectedMethod === 'wallet'
                        ? 'border-[#1e74e6] text-[#1e74e6] bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Wallets</span>
                  </button>
                </div>

                {/* Tab Body */}
                <div className="p-5 sm:p-6">
                  {/* ================= METHOD 1: UPI ================= */}
                  {selectedMethod === 'upi' && (
                    <div className="space-y-4">
                      {/* Sub-tabs: Apps, QR Code, VPA */}
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setUpiSubTab('apps')}
                          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                            upiSubTab === 'apps' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          UPI Apps
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiSubTab('qr')}
                          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                            upiSubTab === 'qr' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          Scan QR Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiSubTab('vpa')}
                          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                            upiSubTab === 'vpa' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          UPI ID / VPA
                        </button>
                      </div>

                      {/* UPI Apps Grid */}
                      {upiSubTab === 'apps' && (
                        <div className="space-y-3 pt-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Select any UPI app to authorize ₹{payableAmount.toLocaleString('en-IN')} instantly:
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { name: 'Google Pay', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                              { name: 'PhonePe', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                              { name: 'Paytm UPI', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                              { name: 'BHIM UPI', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                            ].map((app) => (
                              <button
                                key={app.name}
                                type="button"
                                onClick={handleInitiatePayment}
                                className={`p-3.5 rounded-xl border text-center font-bold text-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${app.color} dark:bg-slate-800 dark:border-slate-700 dark:text-white`}
                              >
                                <Smartphone className="w-5 h-5" />
                                <span>{app.name}</span>
                              </button>
                            ))}
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Payment request will be routed straight to your UPI app with 0% extra fee.</span>
                          </div>
                        </div>
                      )}

                      {/* QR Code Pay */}
                      {upiSubTab === 'qr' && (
                        <div className="pt-2 text-center space-y-3">
                          <div className="inline-block p-4 bg-white rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 shadow-sm">
                            {/* Realistic SVG QR Code Display */}
                            <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100" height="100" fill="white" />
                              {/* Corner Squares */}
                              <rect x="5" y="5" width="26" height="26" fill="#1e1b4b" rx="4" />
                              <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                              <rect x="13" y="13" width="10" height="10" fill="#1e1b4b" rx="1" />

                              <rect x="69" y="5" width="26" height="26" fill="#1e1b4b" rx="4" />
                              <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                              <rect x="77" y="13" width="10" height="10" fill="#1e1b4b" rx="1" />

                              <rect x="5" y="69" width="26" height="26" fill="#1e1b4b" rx="4" />
                              <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                              <rect x="13" y="77" width="10" height="10" fill="#1e1b4b" rx="1" />

                              {/* Simulated QR data grid */}
                              <rect x="36" y="8" width="6" height="6" fill="#1e1b4b" />
                              <rect x="48" y="12" width="6" height="6" fill="#1e1b4b" />
                              <rect x="58" y="6" width="6" height="6" fill="#1e1b4b" />
                              <rect x="36" y="24" width="6" height="6" fill="#1e1b4b" />
                              <rect x="44" y="28" width="6" height="6" fill="#1e1b4b" />
                              <rect x="56" y="20" width="6" height="6" fill="#1e1b4b" />

                              <rect x="8" y="38" width="6" height="6" fill="#1e1b4b" />
                              <rect x="20" y="44" width="6" height="6" fill="#1e1b4b" />
                              <rect x="12" y="54" width="6" height="6" fill="#1e1b4b" />

                              {/* Center Logo badge */}
                              <rect x="40" y="40" width="20" height="20" fill="#f0142f" rx="4" />
                              <text x="50" y="54" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">PS</text>

                              <rect x="68" y="38" width="6" height="6" fill="#1e1b4b" />
                              <rect x="78" y="48" width="6" height="6" fill="#1e1b4b" />
                              <rect x="86" y="56" width="6" height="6" fill="#1e1b4b" />

                              <rect x="36" y="68" width="6" height="6" fill="#1e1b4b" />
                              <rect x="46" y="74" width="6" height="6" fill="#1e1b4b" />
                              <rect x="58" y="82" width="6" height="6" fill="#1e1b4b" />
                              <rect x="72" y="72" width="6" height="6" fill="#1e1b4b" />
                              <rect x="84" y="80" width="6" height="6" fill="#1e1b4b" />
                            </svg>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                              Scan with GPay, PhonePe, Paytm or Any Banking App
                            </span>
                            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center justify-center gap-1 mt-1">
                              <Clock className="w-3.5 h-3.5" />
                              QR Code expires in {formatTimer(qrTimer)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleInitiatePayment}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            Simulate Payment Done via QR
                          </button>
                        </div>
                      )}

                      {/* VPA / UPI ID */}
                      {upiSubTab === 'vpa' && (
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              Enter UPI ID / VPA
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="e.g. mobileNumber@upi or yourname@okhdfcbank"
                                value={upiId}
                                onChange={(e) => {
                                  setUpiId(e.target.value);
                                  setUpiError('');
                                  setUpiIdVerified(false);
                                }}
                                className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyUpi}
                                className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                              >
                                {upiIdVerified ? 'Verified' : 'Verify'}
                              </button>
                            </div>
                            {upiError && <p className="text-[11px] text-rose-500 mt-1 font-medium">{upiError}</p>}
                            {upiIdVerified && (
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Verified: Santhosh Kumar M. (Account linked)
                              </p>
                            )}
                          </div>

                          {/* Quick handle suffixes */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['@okaxis', '@okhdfcbank', '@paytm', '@ybl', '@ibl'].map((handle) => (
                              <button
                                key={handle}
                                type="button"
                                onClick={() => {
                                  const prefix = upiId.split('@')[0] || 'yourname';
                                  setUpiId(`${prefix}${handle}`);
                                  setUpiError('');
                                }}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px] font-medium rounded-lg cursor-pointer transition-colors"
                              >
                                {handle}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ================= METHOD 2: CREDIT / DEBIT CARDS ================= */}
                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      {/* Visual Card Preview */}
                      <div className="relative w-full max-w-sm mx-auto h-44 rounded-2xl p-4 text-white bg-gradient-to-tr from-slate-900 via-purple-950 to-indigo-900 shadow-xl overflow-hidden border border-white/10">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs tracking-wider opacity-80">DEBIT / CREDIT</span>
                          </div>
                          <span className="font-extrabold text-sm tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded">
                            {detectCardBrand(cardNumber)}
                          </span>
                        </div>

                        <div className="mt-6">
                          <span className="font-mono text-base sm:text-lg tracking-widest block drop-shadow-sm">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </span>
                        </div>

                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <span className="text-[9px] uppercase opacity-70 block">Cardholder</span>
                            <span className="text-xs font-bold tracking-wide truncate max-w-[150px] block">
                              {cardName || 'YOUR FULL NAME'}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase opacity-70 block">Expires</span>
                            <span className="text-xs font-mono font-bold tracking-wide">
                              {cardExpiry || 'MM/YY'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="4111 2222 3333 4444"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                              {detectCardBrand(cardNumber)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="Name as printed on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              Valid Thru
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              maxLength={5}
                              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              maxLength={4}
                              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                          </div>
                        </div>

                        {cardError && (
                          <p className="text-[11px] text-rose-500 font-medium">{cardError}</p>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="save-card-toggle"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                          />
                          <label htmlFor="save-card-toggle" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
                            Securely save card as per RBI tokenization guidelines
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= METHOD 3: NET BANKING ================= */}
                  {selectedMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Select your bank to pay securely through Internet Banking:
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {POPULAR_BANKS.map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              selectedBank === bank.id
                                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-500/30'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300 text-xs'
                            }`}
                          >
                            <span className="text-xs">{bank.name}</span>
                            <span className="text-[10px] text-slate-400 mt-1 font-mono">
                              {bank.badge}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Dropdown for All Other Banks */}
                      <div className="pt-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Or Select Other Bank
                        </label>
                        <select
                          value={otherBankSearch}
                          onChange={(e) => {
                            setOtherBankSearch(e.target.value);
                            if (e.target.value) {
                              setSelectedBank('other');
                            }
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="">Select from 50+ other Indian banks...</option>
                          {ALL_BANKS.map(bank => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>You will be safely redirected to your bank's 256-bit encrypted authentication page.</span>
                      </div>
                    </div>
                  )}

                  {/* ================= METHOD 4: WALLETS ================= */}
                  {selectedMethod === 'wallet' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Choose a popular wallet or PayLater partner:
                      </p>

                      <div className="space-y-2">
                        {[
                          { id: 'paytm', name: 'Paytm Wallet', desc: 'Instant debit with OTP verification' },
                          { id: 'phonepe', name: 'PhonePe Wallet', desc: 'Pre-loaded wallet balance' },
                          { id: 'amazon', name: 'Amazon Pay', desc: 'Fast Amazon 1-Click checkout' },
                          { id: 'simpl', name: 'Simpl PayLater', desc: 'Pay in 15 days, 0% interest' },
                        ].map((w) => (
                          <label
                            key={w.id}
                            onClick={() => setSelectedWallet(w.id as any)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              selectedWallet === w.id
                                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Wallet className="w-4 h-4 text-slate-500" />
                              <div>
                                <span className="text-xs font-bold text-slate-900 dark:text-white block">{w.name}</span>
                                <span className="text-[11px] text-slate-400">{w.desc}</span>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="wallet_option"
                              checked={selectedWallet === w.id}
                              onChange={() => setSelectedWallet(w.id as any)}
                              className="w-4 h-4 text-blue-600 accent-blue-600"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Primary Pay CTA Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      id="btn-pay-now-action"
                      type="button"
                      onClick={handleInitiatePayment}
                      className="w-full bg-[#f0142f] hover:bg-[#d90d26] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-white/90" />
                      <span>Pay ₹ {payableAmount.toLocaleString('en-IN')} &amp; Confirm Booking</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      By proceeding, you agree to our transparent moving terms and free cancellation guarantee.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dev/Demo Simulation Bar */}
              <div className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Demo Simulator:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTestModeSuccess(true)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                      testModeSuccess ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    Simulate Success
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestModeSuccess(false)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                      !testModeSuccess ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    Simulate Failure
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Transaction & Booking Summary Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-left sticky top-20">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Transaction Summary
                  </h3>
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {bookingData.ticketId}
                  </span>
                </div>

                {/* Service and Route brief */}
                <div className="py-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {bookingData.serviceName}
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                      {bookingData.houseSize || '2 BHK'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="truncate">{bookingData.pickupAddress}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="truncate">{bookingData.dropAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {bookingData.pickupDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {bookingData.pickupSlot}
                    </span>
                    {bookingData.totalItemCount ? (
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        {bookingData.totalItemCount} Items
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Line Item Pricing Breakdown */}
                <div className="py-3 border-b border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Shifting &amp; Truck</span>
                    <span>₹ {(bookingData.basePrice || 6050).toLocaleString('en-IN')}</span>
                  </div>

                  {bookingData.isProtectAdded && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Full Damage Protection</span>
                      <span>₹ 500</span>
                    </div>
                  )}

                  {bookingData.isPackagingAdded && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Premium Multi-layer Packing</span>
                      <span>₹ 1,000</span>
                    </div>
                  )}

                  {bookingData.isCashRedeemed && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>PS Cash / Coupon Discount</span>
                      <span>- ₹ 605</span>
                    </div>
                  )}

                  {paymentPlan === 'full' && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Full Prepaid Cashback Bonus</span>
                      <span>- ₹ {fullPaymentDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-800 dark:text-slate-200 font-bold pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span>Total Move Cost</span>
                    <span>
                      ₹ {paymentPlan === 'full' 
                        ? payableAmount.toLocaleString('en-IN') 
                        : (bookingData.finalTotalAmount || 6050).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Payable Now Highlight Box */}
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between items-center bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-100 dark:border-purple-900/60">
                    <div>
                      <span className="text-xs font-extrabold text-purple-900 dark:text-purple-200 block">
                        Amount Payable Now
                      </span>
                      <span className="text-[10px] text-purple-700 dark:text-purple-300">
                        {paymentPlan === 'advance' ? 'Advance to confirm crew' : '100% Fully Paid'}
                      </span>
                    </div>
                    <span className="text-lg font-black text-purple-700 dark:text-purple-300">
                      ₹ {payableAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {remainingBalance > 0 && (
                    <div className="flex justify-between text-[11px] text-slate-500 px-1 font-medium">
                      <span>Remaining at Destination Unloading:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        ₹ {remainingBalance.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Trust Seal Banner */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Free rescheduling anytime until 24 hrs prior to shift.</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <Shield className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>100% money-back guarantee in case of cancellation.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ================= SIMULATED 3D SECURE OTP MODAL ================= */}
      {paymentState === 'otp_modal' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setPaymentState('checkout')}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Bank 3D-Secure Authentication
              </h3>
            </div>

            <div className="py-4 space-y-3 text-left">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                An SMS with an authorization code was sent to your registered mobile ending in <span className="font-bold">**9041</span>.
              </p>

              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Packersolution India Pvt Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-bold text-purple-600">₹ {payableAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Enter One-Time Password (OTP)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    maxLength={6}
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-base tracking-widest font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setOtpInput('849201')}
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Auto-fill
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPaymentState('checkout')}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startProcessingSimulation}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Confirm OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BANK PROCESSING OVERLAY ================= */}
      {paymentState === 'processing' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 animate-spin" />
              <Lock className="w-6 h-6 text-purple-600 absolute inset-0 m-auto" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Processing Payment
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[32px] transition-all">
              {processingStep}
            </p>

            <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl text-[11px] text-slate-400">
              Please do not press back or close this window while we secure your shifting crew.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
