import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Tag, Star, RefreshCw, Smartphone, User, Mail, ArrowRight, UserPlus } from 'lucide-react';
import loginPackersImg from '../assets/images/login_popup_packers_1786289109238.jpg';
import { useAddress } from '../context/AddressContext';

interface RegisteredUser {
  name: string;
  email: string;
  mobile: string;
}

interface LoginOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (mobile: string) => void;
  titleText?: string;
  subtitleText?: string;
}

export const LoginOtpModal: React.FC<LoginOtpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  titleText = "Enter mobile number to continue",
  subtitleText = "Never shared, never spammed."
}) => {
  const { loginUser } = useAddress();
  const [step, setStep] = useState<'mobile' | 'register' | 'otp' | 'success'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Helper to get registered users map from localStorage
  const getRegisteredUsersMap = (): Record<string, RegisteredUser> => {
    try {
      const data = localStorage.getItem('ps_registered_users_db');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error(e);
    }
    // Pre-populate demo user
    return {
      '9876543210': { name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', mobile: '9876543210' },
      '9999999999': { name: 'Priya Patel', email: 'priya.patel@gmail.com', mobile: '9999999999' }
    };
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      const savedMobile = localStorage.getItem('ps_user_mobile');
      if (savedMobile) {
        setMobileNumber(savedMobile);
      }
      setStep('mobile');
      setFullName('');
      setEmail('');
      setIsExistingUser(false);
      setOtpDigits(['1', '2', '3', '4']);
      setErrorMsg('');
      setIsSubmitting(false);
      setResendTimer(30);
      setCanResend(false);
    }
  }, [isOpen]);

  // Resend timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const registeredMap = getRegisteredUsersMap();
      const existingUser = registeredMap[cleanMobile];

      if (existingUser) {
        // Existing user flow -> straight to OTP
        setIsExistingUser(true);
        setFullName(existingUser.name);
        setEmail(existingUser.email);
        setStep('otp');
        setResendTimer(30);
        setCanResend(false);
        setTimeout(() => {
          otpInputRefs[0].current?.focus();
        }, 100);
      } else {
        // New user flow -> prompt for Name and Email first
        setIsExistingUser(false);
        setStep('register');
      }
    }, 500);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const cleanMobile = mobileNumber.replace(/\D/g, '');
      const registeredMap = getRegisteredUsersMap();
      
      // Save newly registered user
      registeredMap[cleanMobile] = {
        name: fullName.trim(),
        email: email.trim(),
        mobile: cleanMobile
      };
      localStorage.setItem('ps_registered_users_db', JSON.stringify(registeredMap));
      localStorage.setItem('ps_user_name', fullName.trim());
      localStorage.setItem('ps_user_email', email.trim());

      // Navigate to OTP verification screen
      setStep('otp');
      setResendTimer(30);
      setCanResend(false);
      setTimeout(() => {
        otpInputRefs[0].current?.focus();
      }, 100);
    }, 600);
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter 4-digit OTP');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      const cleanMobile = mobileNumber.replace(/\D/g, '');
      // Store logged in user info in localStorage & migrate guest addresses
      loginUser(cleanMobile, fullName, email);

      setStep('success');

      setTimeout(() => {
        if (onSuccess) {
          onSuccess(mobileNumber);
        }
        onClose();
      }, 1200);
    }, 800);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtpDigits(['1', '2', '3', '4']);
    setResendTimer(30);
    setCanResend(false);
    setErrorMsg('A new OTP has been sent (Default OTP: 1234)');
    setTimeout(() => setErrorMsg(''), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            
            {/* LEFT SIDE: Image with Curved Wave Divider */}
            <div className="md:col-span-5 relative bg-slate-900 overflow-hidden min-h-[220px] md:min-h-full flex items-center justify-center">
              <img
                src={loginPackersImg}
                alt="Packersolution Indian Movers Shifting"
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Overlay Brand Logo Tag */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40 shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight">
                  Packersolution
                </span>
              </div>

              {/* Bottom Quote Banner in Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 hidden md:block">
                <p className="text-xs font-black tracking-wide leading-tight drop-shadow-md">
                  Professional Indian Packers &amp; Movers
                </p>
                <p className="text-[10px] text-amber-300 font-semibold mt-0.5">
                  100% Damage-Free Shifting Guaranteed
                </p>
              </div>

              {/* Curved SVG Divider for Desktop Layout */}
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-12 text-white dark:text-slate-900 pointer-events-none fill-current">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 C60,40 40,60 100,100 L100,0 Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* RIGHT SIDE: Form Content */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div>
                {/* STEP 1: Enter Mobile Number */}
                {step === 'mobile' && (
                  <form onSubmit={handleMobileSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {titleText}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {subtitleText}
                      </p>
                    </div>

                    {/* Country Code + Mobile Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 bg-white dark:bg-slate-950 overflow-hidden transition-all shadow-xs">
                        {/* Country Code Pill */}
                        <div className="flex items-center gap-1.5 px-3 py-3 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0 select-none">
                          <span className="text-base leading-none">🇮🇳</span>
                          <span>+91</span>
                          <span className="text-[10px] text-slate-400">▾</span>
                        </div>

                        <input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            setErrorMsg('');
                          }}
                          maxLength={10}
                          autoFocus
                          className="w-full px-3 py-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-xs text-rose-500 font-bold pl-1">{errorMsg}</p>
                      )}
                    </div>

                    {/* Red / Rose CTA Button matching reference image */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" /> Checking account...
                        </span>
                      ) : (
                        <span>Continue</span>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 2: New User Registration (Name & Email) */}
                {step === 'register' && (
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-extrabold text-[10px] uppercase tracking-wider">
                          <UserPlus className="w-3 h-3" /> New User Profile
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep('mobile')}
                          className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          Change Number
                        </button>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Complete Registration
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Please enter your details to register <span className="font-bold text-slate-800 dark:text-slate-200">+91 {mobileNumber}</span>
                      </p>
                    </div>

                    {/* Full Name Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 bg-white dark:bg-slate-950 transition-all">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="e.g. Santhosh Kumar"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setErrorMsg('');
                          }}
                          autoFocus
                          className="w-full text-sm font-bold text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 bg-white dark:bg-slate-950 transition-all">
                        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="email"
                          placeholder="e.g. santhosh@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMsg('');
                          }}
                          className="w-full text-sm font-bold text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" /> Registering &amp; Sending OTP...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span>Register &amp; Proceed to OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 3: Enter OTP */}
                {step === 'otp' && (
                  <form onSubmit={handleOtpVerify} className="space-y-5">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          Verify Mobile Number
                        </h3>
                        <button
                          type="button"
                          onClick={() => setStep('mobile')}
                          className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          Change Number
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {isExistingUser && fullName ? (
                          <span>Welcome back, <strong className="text-slate-800 dark:text-slate-200">{fullName}</strong>! OTP sent to </span>
                        ) : (
                          <span>OTP sent to </span>
                        )}
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">+91 {mobileNumber}</span>
                      </p>
                    </div>

                    {/* Default OTP Banner Box */}
                    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-2.5 rounded-xl flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Default OTP pre-filled for testing:</span>
                      </span>
                      <span className="font-mono font-black text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded text-xs">
                        1234
                      </span>
                    </div>

                    {/* 4 Digit OTP Inputs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-3">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            ref={otpInputRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-12 text-center text-xl font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl outline-none transition-all shadow-xs"
                          />
                        ))}
                      </div>

                      {errorMsg && (
                        <p className="text-xs text-rose-500 font-bold text-center">{errorMsg}</p>
                      )}
                    </div>

                    {/* Resend OTP Link */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Didn't receive code?</span>
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <span className="font-mono text-slate-400">Resend in {resendTimer}s</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                        </span>
                      ) : (
                        <span>Verify &amp; Continue</span>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 4: Success View */}
                {step === 'success' && (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        Mobile Verified Successfully!
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {fullName ? `Welcome ${fullName}! ` : ''}Loading your instant shifting price calculator...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM SECTION: "Why to choose Packersolution Services?" */}
              {step !== 'success' && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* Title with subtle line */}
                  <div className="relative text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200/80 dark:border-slate-800" />
                    </div>
                    <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Why to choose Packersolution Services?
                    </span>
                  </div>

                  {/* 2x2 Feature Grid matching reference image */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">⇩</span>
                      <span>Lowest Price Guaranteed.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-500" />
                      <span>5 Star Rated Partners.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Free Reschedule.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Support Assistance.</span>
                    </div>
                  </div>

                  {/* Footer Terms & WhatsApp Disclaimer */}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-normal pt-1 leading-normal">
                    By continuing, you agree to our <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-300">Terms &amp; Conditions</a> and opting in to receive updates on <span className="text-emerald-600 dark:text-emerald-400 font-bold">💬 WhatsApp</span>.
                  </p>
                </div>
              )}

            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

