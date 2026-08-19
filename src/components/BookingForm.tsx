/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ServiceItem, Booking } from '../types';
import { LucideIcon } from './LucideIcon';
import { apiService } from '../services/api';

interface BookingFormProps {
  service: ServiceItem;
  onSuccess: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ service, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [movingDate, setMovingDate] = useState('');
  
  // Dynamic fields stored as key-value pairs
  const [details, setDetails] = useState<Record<string, string>>({});
  const [estimatedCost, setEstimatedCost] = useState(service.basePrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Set default form values when service changes
  useEffect(() => {
    const initialDetails: Record<string, string> = {};
    service.formFields.forEach(field => {
      if (field.type === 'select' && field.options && field.options.length > 0) {
        initialDetails[field.name] = field.options[0];
      } else {
        initialDetails[field.name] = '';
      }
    });
    setDetails(initialDetails);
    setStep(1);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setMovingDate('');
    setFormError('');
  }, [service]);

  // Handle dynamic input changes
  const handleDetailChange = (fieldName: string, value: string) => {
    setDetails(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Perform dynamic real-time price calculations based on selected variables
  useEffect(() => {
    let cost = service.basePrice;

    if (service.id === 'household-shifting') {
      const scope = details['shiftingScope'];
      const isIntercity = scope === 'Between City (Intercity / Outstation)';

      if (isIntercity) {
        cost = 7500; // Base starting freight for intercity
      }

      // 1. Apartment Size multiplier
      const size = details['apartmentSize'];
      if (size === '2 BHK Apartment') cost += isIntercity ? 5000 : 2500;
      else if (size === '3 BHK Apartment') cost += isIntercity ? 9500 : 5000;
      else if (size === '4+ BHK / Villa') cost += isIntercity ? 16000 : 9000;
      else if (size === 'Few Household Items Only') cost -= isIntercity ? 2500 : 1500;

      // 2. Stairs charge if elevator not available
      const originElevator = details['hasOriginElevator'];
      const destElevator = details['hasDestinationElevator'];
      const originFlr = details['originFloor'];
      const destFlr = details['destinationFloor'];

      let floorLevelMultiplier = 0;
      const extractFloor = (flrStr: string) => {
        if (!flrStr) return 0;
        if (flrStr.includes('Ground')) return 0;
        const match = flrStr.match(/\d+/);
        return match ? parseInt(match[0]) : 1;
      };

      if (originElevator === 'No, stairs only') {
        floorLevelMultiplier += extractFloor(originFlr) * 400;
      }
      if (destElevator === 'No, stairs only') {
        floorLevelMultiplier += extractFloor(destFlr) * 400;
      }
      cost += floorLevelMultiplier;

      // 3. Distance pricing
      const distance = parseFloat(details['approxDistance']) || 0;
      if (isIntercity) {
        if (distance > 50) {
          cost += (distance - 50) * 32; // Intercity highway rate per km
        }
      } else {
        if (distance > 10) {
          cost += (distance - 10) * 45; // Local excess km rate
        }
      }
    } 
    else if (service.id === 'domestic-relocation') {
      const size = details['houseSize'];
      if (size === '2 BHK Apartment') cost += 5500;
      else if (size === '3 BHK Apartment') cost += 11000;
      else if (size === '4+ BHK / Villa') cost += 18000;
      else if (size === 'Few Cartons / Box Shipment Only') cost -= 4000;

      const vehicle = details['needsVehicleTransport'];
      if (vehicle === 'Yes, transport Bike as well') cost += 4500;
      else if (vehicle === 'Yes, transport Car as well') cost += 9500;
      else if (vehicle === 'Yes, both Car & Bike') cost += 13500;

      const insurance = details['insuranceNeeded'];
      if (insurance === 'Yes, protect my goods (Recommended)') {
        cost += 1500; // standard base insurance premium
      }
    } 
    else if (service.id === 'office-relocation') {
      const size = details['officeSize'] || '';
      if (size.includes('Startup Office')) cost = 9999;
      else if (size.includes('Small Corporate Office')) cost = 18999;
      else if (size.includes('Medium Office')) cost = 21999;
      else if (size.includes('Large Corporate Office')) cost = 29999;
      else if (size.includes('IT Office')) cost = 24999;
      else if (size.includes('Call Center / BPO')) cost = 34999;
      else if (size.includes('Showroom / Retail Store')) cost = 26999;
      else if (size.includes('Warehouse Office')) cost = 39999;
      else if (size.includes('Corporate Head Office')) cost = 49999;
      else cost = 8999; // Small Office default

      const scope = details['shiftingScope'];
      if (scope && scope.includes('Between City')) {
        cost += 12000; // Intercity transit premium
      }

      const server = details['hasServerRoom'];
      if (server && server.includes('Yes')) {
        cost += 8000; // Server rack & IT anti-static wrap
      }
    } 
    else if (service.id === 'vehicle-transportation') {
      const cat = details['vehicleCategory'];
      if (cat === 'Premium Bike / Cruiser (Over 150cc)') cost += 2000;
      else if (cat === 'Hatchback Car') cost += 4000;
      else if (cat === 'Sedan Car') cost += 6000;
      else if (cat === 'SUV / MUV Car') cost += 8500;
      else if (cat === 'Luxury Sports Car') cost += 15000;

      const working = details['workingCondition'];
      if (working === 'No, non-runner (requires towing)') {
        cost += 3500;
      }
    } 
    else if (service.id === 'packing-unpacking') {
      const scope = details['packingScope'];
      if (scope === 'Full House Packing & Unpacking') cost += 3500;
      else if (scope === 'Fragile & Kitchen Items Only') cost -= 1000;
      else if (scope === 'Single Room / Custom Packing') cost -= 1500;

      const prop = details['propertyScale'];
      if (prop === '2 BHK') cost += 2000;
      else if (prop === '3 BHK') cost += 4000;
      else if (prop === '4+ BHK / Large Office') cost += 7500;
      else if (prop === 'Just a few specific items') cost -= 1000;
    } 
    else if (service.id === 'loading-unloading') {
      const crew = details['crewSizeNeeded'];
      if (crew === '4 Movers (Recommended for 2-3 BHK)') cost += 2000;
      else if (crew === '6+ Movers (For heavy loads / office)') cost += 5000;

      const vol = details['volumeDescription'];
      if (vol === '2 BHK Apartment Inventory') cost += 1500;
      else if (vol === '3+ BHK / Large Office Shifting') cost += 4000;
      else if (vol === 'Few Heavy Appliances only') cost -= 500;

      const truck = details['truckType'];
      if (truck === '14 Feet Closed Container') cost += 1500;
      else if (truck === '17 Feet Closed Container') cost += 2500;
      else if (truck === '19-24 Feet Multi-Axle Container') cost += 5000;
    } 
    else if (service.id === 'warehousing-storage') {
      const dur = details['storageDuration'];
      let monthlyRate = 3000;
      const vol = details['storageVolume'];
      if (vol === '2 BHK Contents') monthlyRate += 2000;
      else if (vol === '3 BHK Contents') monthlyRate += 4500;
      else if (vol === 'Office Stock / Equipment') monthlyRate += 6000;
      else if (vol === 'Few Carton Boxes Only') monthlyRate -= 1500;

      let months = 1;
      if (dur === 'Medium term (1 to 6 Months)') {
        months = 3;
        cost = (monthlyRate * months) * 0.90; // 10% discount
      } else if (dur === 'Long term (6 to 12 Months)') {
        months = 8;
        cost = (monthlyRate * months) * 0.85; // 15% discount
      } else if (dur === 'Extended Storage (12+ Months)') {
        months = 12;
        cost = (monthlyRate * months) * 0.80; // 20% discount
      } else {
        cost = monthlyRate;
      }

      const pickup = details['needsPickupService'];
      if (pickup === 'Yes, fully pack and transport to warehouse') {
        cost += 5000;
      }
    }

    setEstimatedCost(Math.max(cost, 1000));
  }, [details, service]);

  const validateStep1 = () => {
    // Check if all visible dynamic fields are filled
    for (const field of service.formFields) {
      if (field.required && !details[field.name]) {
        setFormError(`Please select or enter the value for: ${field.label}`);
        return false;
      }
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !movingDate) {
      setFormError('Please fill out all required contact fields.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await apiService.createBooking({
        serviceId: service.id,
        serviceName: service.name,
        customerName,
        customerEmail,
        customerPhone,
        date: movingDate,
        details,
        estimatedCost
      });
      setIsSubmitting(false);
      onSuccess();
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while scheduling your shifting appointment.');
      setIsSubmitting(false);
    }
  };

  return (
    <div id={`booking-card-${service.id}`} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Form Progress Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-6 text-white relative">
        <div className="absolute right-6 top-6 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          Digit Inspired Cost Estimator
        </div>
        <h3 className="text-xl font-bold font-sans">Get Your Shifting Quote</h3>
        <p className="text-sm text-orange-50/90 mt-1">Get custom, clear estimates with zero hidden overheads.</p>
        
        {/* Progress Dots */}
        <div className="flex gap-2 mt-4">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}></div>
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}></div>
        </div>
      </div>

      <div className="p-6">
        {formError && (
          <div id="form-error-banner" className="mb-4 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 p-3.5 rounded-xl text-xs flex gap-2 items-center border border-red-100 dark:border-red-900/50">
            <LucideIcon name="AlertTriangle" className="w-4 h-4 text-red-500 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Service Variables details */
          <div id="booking-step-1" className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Specify Requirements</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={`input-${field.name}`}
                      value={details[field.name] || ''}
                      onChange={(e) => handleDetailChange(field.name, e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all cursor-pointer"
                    >
                      {field.options?.map((opt, idx) => (
                        <option key={idx} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`input-${field.name}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={details[field.name] || ''}
                      onChange={(e) => handleDetailChange(field.name, e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Simulated Live Quote Estimator box */}
            <div id="live-estimator-box" className="mt-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 dark:bg-orange-950/20 rounded-full blur-xl"></div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-full">
                    Estimated Cost Calculator
                  </span>
                  <h5 className="text-slate-800 dark:text-slate-200 font-bold text-sm mt-2 flex items-center gap-1">
                    Estimated Transit Pricing
                    <span className="group relative cursor-help">
                      <LucideIcon name="Info" className="w-3.5 h-3.5 text-slate-400" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-normal shadow-lg z-10">
                        Based on typical transport tariffs, fuel index, and packing scopes. Final invoice may adjust on site inspection.
                      </span>
                    </span>
                  </h5>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-semibold">INR (₹)</span>
                  <span id="calculated-price-display" className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                    ₹{estimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                id="btn-goto-step-2"
                onClick={() => {
                  if (validateStep1()) {
                    setStep(2);
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer group"
              >
                Proceed to Contact Info
                <LucideIcon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Customer Contact info details */
          <form id="booking-step-2" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
              <button
                id="btn-back-to-step-1"
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Contact & Moving Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Your Full Name *</label>
                <div className="relative">
                  <LucideIcon name="UserCheck" className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    id="input-customer-name"
                    type="text"
                    required
                    placeholder="e.g., Rohan Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Email Address *</label>
                <div className="relative">
                  <LucideIcon name="Mail" className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    id="input-customer-email"
                    type="email"
                    required
                    placeholder="e.g., rohan@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Mobile Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 font-bold text-sm select-none">
                    +91
                  </span>
                  <input
                    id="input-customer-phone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={customerPhone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setCustomerPhone(val);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl pl-12 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Target Shifting Date *</label>
                <div className="relative">
                  <LucideIcon name="Calendar" className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="input-moving-date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Estimate Breakdown Summary box */}
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 mt-2">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Estimate Breakdown</h5>
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <div className="flex justify-between">
                  <span>Base Booking Rate</span>
                  <span className="font-mono">₹{service.basePrice.toLocaleString()}</span>
                </div>
                {Object.entries(details).map(([key, val]) => {
                  if (!val || key.toLowerCase().includes('address') || key.toLowerCase().includes('model')) return null;
                  return (
                    <div key={key} className="flex justify-between border-t border-dashed border-slate-200 dark:border-slate-800 pt-1">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')} ({val})</span>
                      <span className="text-slate-600 dark:text-slate-400 font-mono">Included</span>
                    </div>
                  );
                })}
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-slate-800 dark:text-slate-200 font-bold">
                  <span>Total Calculated Estimate</span>
                  <span className="text-orange-600 dark:text-orange-400 font-mono text-sm">₹{estimatedCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Digit inspired claims guarantee text */}
            <div className="flex gap-2 p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 text-teal-800 dark:text-teal-300 rounded-xl text-[11px] font-medium leading-normal">
              <LucideIcon name="Shield" className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong>GoDigit Shifting Guarantee:</strong> 100% item safety guarantee, verified carpenter teams on board, and instant claim tracking.
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                id="btn-edit-details"
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-semibold hover:underline"
              >
                Change details
              </button>
              
              <button
                id="btn-submit-booking"
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-80 cursor-wait' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculating & Booking...
                  </>
                ) : (
                  <>
                    Submit Booking Request
                    <LucideIcon name="Send" className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
