import React from 'react';
import { Check, ShieldCheck, MapPin, Package, Calendar, FileText, CreditCard } from 'lucide-react';

export type BookingStepId = 'location' | 'inventory' | 'schedule' | 'summary' | 'payment';

interface BookingStepHeaderProps {
  currentStep: BookingStepId;
  onStepClick: (step: BookingStepId) => void;
  canNavigateToStep?: (step: BookingStepId) => boolean;
}

export const BookingStepHeader: React.FC<BookingStepHeaderProps> = ({
  currentStep,
  onStepClick,
  canNavigateToStep,
}) => {
  const steps: Array<{ id: BookingStepId; stepNum: number; label: string; icon: any }> = [
    { id: 'location', stepNum: 1, label: 'Move Details', icon: MapPin },
    { id: 'inventory', stepNum: 2, label: 'Inventory', icon: Package },
    { id: 'schedule', stepNum: 3, label: 'Schedule & Packing', icon: Calendar },
    { id: 'summary', stepNum: 4, label: 'Summary & Addons', icon: FileText },
    { id: 'payment', stepNum: 5, label: 'Payment', icon: CreditCard },
  ];

  const getStepIndex = (step: BookingStepId) => {
    switch (step) {
      case 'location': return 0;
      case 'inventory': return 1;
      case 'schedule': return 2;
      case 'summary': return 3;
      case 'payment': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="w-full mb-6 sm:mb-8 select-none">
      {/* Top Banner with Trust & Editable Guarantee */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/15 text-white text-xs mb-4 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">
            Packer Solutions Guaranteed Booking
          </span>
        </div>
        <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Information is 100% editable until payment screen</span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 sm:p-4 shadow-xl">
        <div className="flex items-center justify-between relative">
          {/* Background progress track line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
          {/* Active progress fill line */}
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 transition-all duration-300 -z-0"
            style={{ width: `${Math.min(100, (currentIndex / (steps.length - 1)) * 100)}%` }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isClickable = canNavigateToStep ? canNavigateToStep(step.id) : idx <= currentIndex;
            const IconComponent = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`flex flex-col items-center relative z-10 transition-all group ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
                title={isClickable ? `Click to go to Step ${step.stepNum}: ${step.label}` : undefined}
              >
                {/* Circle Badge */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-200 border-2 ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-110 ring-4 ring-blue-100 dark:ring-blue-950/50'
                      : isCompleted
                      ? 'bg-emerald-600 text-white border-emerald-600 hover:scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                  ) : (
                    <span className="flex items-center gap-0.5">
                      {step.stepNum}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-1.5 text-center">
                  <span
                    className={`block text-[10px] sm:text-xs font-bold leading-tight transition-colors whitespace-nowrap ${
                      isCurrent
                        ? 'text-blue-600 dark:text-blue-400 font-black'
                        : isCompleted
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="hidden md:block text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                    Step {step.stepNum}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
