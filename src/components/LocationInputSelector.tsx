import React, { useState } from 'react';
import { MapPin, Search, ChevronRight, X, Bookmark, Compass, Sparkles } from 'lucide-react';
import { AddressPickerModal } from './AddressPickerModal';
import { UserAddress, RecentAddressItem, LocationSearchResult } from '../types';
import { useAddress } from '../context/AddressContext';

interface LocationInputSelectorProps {
  label?: string;
  value: string;
  onChange: (addressStr: string, details?: UserAddress | RecentAddressItem | LocationSearchResult) => void;
  placeholder?: string;
  type?: 'pickup' | 'drop' | 'single';
  serviceId?: string;
  cityContext?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export const LocationInputSelector: React.FC<LocationInputSelectorProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'pickup',
  serviceId = 'household-shifting',
  cityContext = 'Bangalore',
  className = '',
  inputClassName = '',
  required = false,
  disabled = false,
  id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { savedAddresses, recentAddresses } = useAddress();

  const handleSelectAddress = (
    addressStr: string,
    details?: UserAddress | RecentAddressItem | LocationSearchResult
  ) => {
    onChange(addressStr, details);
  };

  const getBorderFocusClass = () => {
    if (type === 'pickup') return 'focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20';
    if (type === 'drop') return 'focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500/20';
    return 'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20';
  };

  const defaultPlaceholder = placeholder || (
    type === 'pickup' 
      ? 'Enter Pickup locality, apartment or landmark' 
      : type === 'drop' 
      ? 'Enter Drop locality, apartment or landmark' 
      : 'Enter locality, street or landmark'
  );

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
          {label}
        </label>
      )}

      <div 
        className={`relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl transition-all shadow-2xs group ${getBorderFocusClass()} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {/* Clickable input textbox */}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => !disabled && setIsModalOpen(true)}
          placeholder={defaultPlaceholder}
          required={required}
          disabled={disabled}
          className={`w-full bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal outline-none cursor-pointer pr-16 truncate ${inputClassName}`}
        />

        {/* Action icons on right side */}
        <div className="absolute right-1.5 flex items-center gap-1 shrink-0">
          {value ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Clear input"
            >
              <X className="w-3 h-3" />
            </button>
          ) : null}

          {/* Quick Select from Saved / Search Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsModalOpen(true);
            }}
            className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold transition-colors flex items-center gap-0.5 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer"
            title="Choose from saved addresses or search location"
          >
            <Search className="w-2.5 h-2.5" />
            <span>Select</span>
          </button>
        </div>
      </div>

      {/* Address Picker Modal */}
      {isModalOpen && (
        <AddressPickerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={type}
          serviceId={serviceId}
          cityContext={cityContext}
          currentValue={value}
          onSelect={handleSelectAddress}
        />
      )}
    </div>
  );
};
