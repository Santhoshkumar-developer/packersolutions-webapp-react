import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  Plus, 
  Home, 
  Building2, 
  Warehouse, 
  Store, 
  Factory, 
  MoreHorizontal, 
  Check, 
  Star, 
  Trash2, 
  Edit3, 
  X, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Phone, 
  User, 
  Compass, 
  CheckCircle2,
  Sparkles,
  Tag
} from 'lucide-react';
import { 
  UserAddress, 
  RecentAddressItem, 
  LocationSearchResult, 
  AddressLabelType, 
  ServiceTagType 
} from '../types';
import { useAddress } from '../context/AddressContext';
import { CITIES_DATA } from '../data/cities';
import { SERVICE_TAG_LABELS } from '../data/addressMockData';

interface AddressPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'pickup' | 'drop' | 'single';
  serviceId?: string;
  cityContext?: string;
  currentValue?: string;
  onSelect: (addressStr: string, details?: UserAddress | RecentAddressItem | LocationSearchResult) => void;
  title?: string;
  subtitle?: string;
}

const LABEL_ICONS: Record<AddressLabelType, React.ComponentType<{ className?: string }>> = {
  Home: Home,
  Office: Building2,
  Warehouse: Warehouse,
  Shop: Store,
  Factory: Factory,
  Other: MapPin,
};

const ALL_SERVICE_TAGS: { id: ServiceTagType; label: string }[] = [
  { id: 'household-shifting', label: 'House Shifting' },
  { id: 'office-shifting', label: 'Office Shifting' },
  { id: 'parcel-courier', label: 'Parcel & Courier' },
  { id: 'truck-booking', label: 'Truck Booking' },
  { id: 'vehicle-transportation', label: 'Vehicle Transport' },
  { id: 'warehousing-storage', label: 'Warehousing & Storage' },
  { id: 'loading-unloading', label: 'Loading & Unloading' },
  { id: 'packing-unpacking', label: 'Packing & Unpacking' },
];

export const AddressPickerModal: React.FC<AddressPickerModalProps> = ({
  isOpen,
  onClose,
  type = 'pickup',
  serviceId = 'household-shifting',
  cityContext = 'Bangalore',
  currentValue = '',
  onSelect,
  title,
  subtitle
}) => {
  const { 
    savedAddresses, 
    recentAddresses, 
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress, 
    recordRecentAddress,
    searchLocations,
    isLoggedIn,
    currentUser
  } = useAddress();

  // Active view: 'list' | 'search' | 'form'
  const [view, setView] = useState<'list' | 'search' | 'form'>('list');
  const [activeTab, setActiveTab] = useState<'relevant' | 'all'>('relevant');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCityFilter, setSelectedCityFilter] = useState(cityContext);

  // Add/Edit Form State
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formLabel, setFormLabel] = useState<AddressLabelType>('Home');
  const [formCustomLabel, setFormCustomLabel] = useState('');
  const [formFlatBuilding, setFormFlatBuilding] = useState('');
  const [formStreetLocality, setFormStreetLocality] = useState('');
  const [formLandmark, setFormLandmark] = useState('');
  const [formCity, setFormCity] = useState(cityContext);
  const [formState, setFormState] = useState('');
  const [formPincode, setFormPincode] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactPhone, setFormContactPhone] = useState('');
  const [formServiceTags, setFormServiceTags] = useState<ServiceTagType[]>([serviceId as ServiceTagType || 'household-shifting']);
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setView('list');
      setActiveTab('relevant');
      setSearchQuery('');
      setSelectedCityFilter(cityContext);
      setEditingAddressId(null);
      setFormError('');
    }
  }, [isOpen, cityContext]);

  // Debounced search
  useEffect(() => {
    if (view !== 'search') return;
    
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(searchQuery, selectedCityFilter);
        setSearchResults(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCityFilter, view, searchLocations]);

  // Filter saved addresses according to service relevance or all
  const filteredSavedAddresses = useMemo(() => {
    if (activeTab === 'all') return savedAddresses;
    
    // Normalize serviceId matching
    const normService = (serviceId || '').toLowerCase();
    return savedAddresses.filter(addr => {
      if (!addr.serviceTags || addr.serviceTags.length === 0) return true;
      return addr.serviceTags.some(tag => 
        tag.toLowerCase() === normService || 
        normService.includes(tag.toLowerCase()) || 
        tag.toLowerCase().includes(normService)
      );
    });
  }, [savedAddresses, activeTab, serviceId]);

  if (!isOpen) return null;

  // Handle address selection from saved list
  const handleSelectSaved = async (addr: UserAddress) => {
    // Record into recent addresses
    await recordRecentAddress({
      formattedAddress: addr.formattedAddress,
      shortAddress: `${addr.flatBuilding}, ${addr.streetLocality}`,
      city: addr.city,
      area: addr.streetLocality,
      label: addr.label,
      serviceId: serviceId,
      placeId: addr.placeId
    });

    onSelect(addr.formattedAddress, addr);
    onClose();
  };

  // Handle address selection from recent list
  const handleSelectRecent = async (recent: RecentAddressItem) => {
    await recordRecentAddress({
      formattedAddress: recent.formattedAddress,
      shortAddress: recent.shortAddress,
      city: recent.city,
      area: recent.area,
      label: recent.label,
      serviceId: serviceId,
      placeId: recent.placeId
    });

    onSelect(recent.formattedAddress, recent);
    onClose();
  };

  // Handle location selection from search results
  const handleSelectSearchResult = async (loc: LocationSearchResult) => {
    await recordRecentAddress({
      formattedAddress: loc.fullAddress,
      shortAddress: loc.title,
      city: loc.city,
      area: loc.area,
      serviceId: serviceId,
      placeId: loc.placeId
    });

    onSelect(loc.fullAddress, loc);
    onClose();
  };

  // Open Form to Add New Address
  const handleOpenAddForm = (prefillLocality?: LocationSearchResult) => {
    setEditingAddressId(null);
    setFormLabel('Home');
    setFormCustomLabel('');
    setFormFlatBuilding(prefillLocality ? '' : '');
    setFormStreetLocality(prefillLocality ? prefillLocality.subtitle || prefillLocality.area : '');
    setFormLandmark('');
    setFormCity(prefillLocality ? prefillLocality.city : (cityContext || 'Bangalore'));
    setFormState(prefillLocality ? prefillLocality.state : '');
    setFormPincode(prefillLocality ? prefillLocality.pincode : '');
    setFormContactName(currentUser?.name || localStorage.getItem('ps_user_name') || '');
    setFormContactPhone(currentUser?.mobile || localStorage.getItem('ps_user_mobile') || '');
    setFormServiceTags([serviceId as ServiceTagType || 'household-shifting']);
    setFormIsDefault(savedAddresses.length === 0);
    setFormError('');
    setView('form');
  };

  // Open Form to Edit Existing Address
  const handleOpenEditForm = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setFormLabel(addr.label);
    setFormCustomLabel(addr.customLabel || '');
    setFormFlatBuilding(addr.flatBuilding);
    setFormStreetLocality(addr.streetLocality);
    setFormLandmark(addr.landmark || '');
    setFormCity(addr.city);
    setFormState(addr.state || '');
    setFormPincode(addr.pincode || '');
    setFormContactName(addr.contactName || '');
    setFormContactPhone(addr.contactPhone || '');
    setFormServiceTags(addr.serviceTags || [serviceId as ServiceTagType || 'household-shifting']);
    setFormIsDefault(!!addr.isDefault);
    setFormError('');
    setView('form');
  };

  // Submit Add / Edit Form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFlatBuilding.trim()) {
      setFormError('Please enter Flat / House No / Building Name');
      return;
    }
    if (!formStreetLocality.trim()) {
      setFormError('Please enter Street, Locality or Area');
      return;
    }
    if (!formCity.trim()) {
      setFormError('Please select or enter City');
      return;
    }
    if (formContactPhone && formContactPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit contact number');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, {
          label: formLabel,
          customLabel: formLabel === 'Other' ? formCustomLabel.trim() : undefined,
          flatBuilding: formFlatBuilding.trim(),
          streetLocality: formStreetLocality.trim(),
          landmark: formLandmark.trim() || undefined,
          city: formCity.trim(),
          state: formState.trim() || undefined,
          pincode: formPincode.trim() || undefined,
          contactName: formContactName.trim() || undefined,
          contactPhone: formContactPhone.trim() || undefined,
          serviceTags: formServiceTags,
          isDefault: formIsDefault,
        });
      } else {
        const newAddr = await addAddress({
          label: formLabel,
          customLabel: formLabel === 'Other' ? formCustomLabel.trim() : undefined,
          flatBuilding: formFlatBuilding.trim(),
          streetLocality: formStreetLocality.trim(),
          landmark: formLandmark.trim() || undefined,
          city: formCity.trim(),
          state: formState.trim() || undefined,
          pincode: formPincode.trim() || undefined,
          contactName: formContactName.trim() || undefined,
          contactPhone: formContactPhone.trim() || undefined,
          serviceTags: formServiceTags,
          isDefault: formIsDefault,
        });

        // Optionally auto-select the newly added address
        await recordRecentAddress({
          formattedAddress: newAddr.formattedAddress,
          shortAddress: `${newAddr.flatBuilding}, ${newAddr.streetLocality}`,
          city: newAddr.city,
          area: newAddr.streetLocality,
          label: newAddr.label,
          serviceId: serviceId
        });
        onSelect(newAddr.formattedAddress, newAddr);
        onClose();
        return;
      }
      setView('list');
    } catch (err: any) {
      setFormError(err.message || 'Failed to save address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    if (title) return title;
    if (type === 'pickup') return 'Select Pickup Address';
    if (type === 'drop') return 'Select Drop / Delivery Address';
    return 'Select Service Address';
  };

  const serviceTagReadable = SERVICE_TAG_LABELS[serviceId as ServiceTagType] || 'Current Service';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        >
          {/* Top Header Bar */}
          <div className="px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/90 shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 mr-2">
              {view !== 'list' ? (
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="p-2 sm:p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
                  title="Back to addresses list"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4" />
                </button>
              ) : (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  type === 'pickup' 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400' 
                    : type === 'drop' 
                    ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400' 
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-white truncate leading-tight">
                  {view === 'search' ? 'Search New Location' : view === 'form' ? (editingAddressId ? 'Edit Address' : 'Add New Address') : getModalTitle()}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {view === 'search' ? `Type area, landmark or street in ${selectedCityFilter}` : view === 'form' ? 'Save address details for 1-click booking' : (subtitle || `City context: ${cityContext}`)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content based on active view */}
          <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 space-y-3.5 sm:space-y-4 overscroll-contain">

            {/* ===================== VIEW 1: LIST (SAVED & RECENT) ===================== */}
            {view === 'list' && (
              <div className="space-y-3.5 sm:space-y-4">
                
                {/* Search & Add Action Buttons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setView('search');
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Search New Location</div>
                        <div className="text-[10px] text-slate-400 truncate">Instant area &amp; landmark finder</div>
                      </div>
                    </div>
                    <Compass className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenAddForm()}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/50 hover:border-orange-500 text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-orange-950 dark:text-orange-200">Add New Address</div>
                        <div className="text-[10px] text-orange-700/80 dark:text-orange-400 truncate">Save Home, Office or Warehouse</div>
                      </div>
                    </div>
                    <Tag className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  </button>
                </div>

                {/* Filter Tabs for Saved Addresses */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 pt-0.5">
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('relevant')}
                      className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                        activeTab === 'relevant'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <span>Relevant ({filteredSavedAddresses.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                        activeTab === 'all'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <span>All Saved ({savedAddresses.length})</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 hidden md:inline ml-2">
                    Tag: {serviceTagReadable}
                  </span>
                </div>

                {/* SAVED ADDRESSES SECTION */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Saved Addresses
                    </span>
                    {!isLoggedIn && (
                      <span className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200/60">
                        Guest (Local Vault)
                      </span>
                    )}
                  </div>

                  {filteredSavedAddresses.length === 0 ? (
                    <div className="p-4 sm:p-5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {activeTab === 'relevant' && savedAddresses.length > 0 
                          ? `No saved addresses tagged for ${serviceTagReadable}` 
                          : 'No saved addresses yet'}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        {activeTab === 'relevant' && savedAddresses.length > 0 
                          ? 'Switch to "All Saved" tab to see all your addresses, or add a new one.' 
                          : 'Add your Home, Office or Warehouse address for rapid 1-click booking.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenAddForm()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#001261] hover:bg-blue-900 text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Address</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {filteredSavedAddresses.map((addr) => {
                        const IconComponent = LABEL_ICONS[addr.label] || MapPin;
                        const isMatchCurrent = currentValue && currentValue.trim() === addr.formattedAddress.trim();

                        return (
                          <div
                            key={addr.id}
                            className={`p-3 sm:p-3.5 rounded-2xl border transition-all relative ${
                              isMatchCurrent
                                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 shadow-2xs'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-2">
                              {/* Left Icon & Label */}
                              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                  <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-0.5">
                                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">
                                      {addr.label === 'Other' && addr.customLabel ? addr.customLabel : addr.label}
                                    </span>
                                    {addr.isDefault && (
                                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded-md">
                                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                        Default
                                      </span>
                                    )}
                                    {addr.serviceTags && addr.serviceTags.length > 0 && (
                                      <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md truncate max-w-[180px] sm:max-w-none">
                                        {addr.serviceTags.map(t => SERVICE_TAG_LABELS[t] || t).join(', ')}
                                      </span>
                                    )}
                                  </div>

                                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {addr.flatBuilding}
                                  </div>

                                  <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                    {addr.streetLocality}{addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city} {addr.pincode ? `- ${addr.pincode}` : ''}
                                  </div>

                                  {(addr.contactName || addr.contactPhone) && (
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-0.5 flex-wrap">
                                      {addr.contactName && (
                                        <span className="flex items-center gap-1">
                                          <User className="w-2.5 h-2.5 text-slate-400" />
                                          {addr.contactName}
                                        </span>
                                      )}
                                      {addr.contactPhone && (
                                        <span className="flex items-center gap-1">
                                          <Phone className="w-2.5 h-2.5 text-slate-400" />
                                          {addr.contactPhone}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Action Menu: On mobile, nicely aligned in a row */}
                              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1.5 shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60">
                                <div className="flex items-center gap-1 order-2 sm:order-2">
                                  {!addr.isDefault && (
                                    <button
                                      type="button"
                                      onClick={() => setDefaultAddress(addr.id)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                      title="Set as Default Address"
                                    >
                                      <Star className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditForm(addr)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Edit Address"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm('Are you sure you want to delete this address?')) {
                                        deleteAddress(addr.id);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Delete Address"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleSelectSaved(addr)}
                                  className="px-3 py-1.5 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-black text-xs transition-transform active:scale-95 cursor-pointer shadow-xs flex items-center gap-1 order-1 sm:order-1 min-h-[34px]"
                                >
                                  <span>Select Address</span>
                                  {isMatchCurrent && <Check className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* RECENT ADDRESSES SECTION (Max 5, deduplicated) */}
                {recentAddresses.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        Recent Locations ({recentAddresses.length}/5)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {recentAddresses.map((recent) => (
                        <button
                          key={recent.id}
                          type="button"
                          onClick={() => handleSelectRecent(recent)}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-left border border-slate-200/60 dark:border-slate-800/60 transition-all cursor-pointer group min-h-[44px]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                              <Clock className="w-3 h-3" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                                {recent.shortAddress || recent.formattedAddress}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {recent.formattedAddress}
                              </div>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                            Select →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ===================== VIEW 2: SEARCH NEW LOCATION ===================== */}
            {view === 'search' && (
              <div className="space-y-3">
                
                {/* Search Input and City Selector */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search locality, landmark, street in ${selectedCityFilter}...`}
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-8 py-2.5 text-sm sm:text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs min-h-[42px]"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* City Quick Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                      City:
                    </span>
                    {CITIES_DATA.slice(0, 8).map((c) => {
                      const isSelected = selectedCityFilter.toLowerCase() === c.name.toLowerCase();
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedCityFilter(c.name)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all shrink-0 ${
                            isSelected
                              ? 'bg-[#001261] text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search Results List */}
                <div className="space-y-1.5 max-h-[50vh] sm:max-h-72 overflow-y-auto pr-0.5">
                  {isSearching ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Searching locations in {selectedCityFilter}...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="py-8 text-center space-y-2">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        No predefined locations found for "{searchQuery}"
                      </div>
                      <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                        You can still use this as a custom address or save it directly.
                      </p>
                      {searchQuery.trim().length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const customFull = `${searchQuery.trim()}, ${selectedCityFilter}`;
                            handleSelectSearchResult({
                              id: `custom-${Date.now()}`,
                              title: searchQuery.trim(),
                              subtitle: selectedCityFilter,
                              city: selectedCityFilter,
                              state: 'India',
                              pincode: '',
                              area: searchQuery.trim(),
                              fullAddress: customFull
                            });
                          }}
                          className="px-3.5 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          Use "{searchQuery.trim()}, {selectedCityFilter}"
                        </button>
                      )}
                    </div>
                  ) : (
                    searchResults.map((loc) => (
                      <div
                        key={loc.id}
                        className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900 transition-all flex items-center justify-between gap-2 group shadow-2xs"
                      >
                        <div 
                          onClick={() => handleSelectSearchResult(loc)}
                          className="flex items-start gap-2.5 min-w-0 flex-1 cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {loc.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {loc.subtitle || loc.fullAddress}
                            </div>
                            <div className="text-[9px] text-slate-400">
                              {loc.city} {loc.pincode ? `• ${loc.pincode}` : ''}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSelectSearchResult(loc)}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors"
                          >
                            Select
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenAddForm(loc)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Save full address details"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Google Places API Ready Indicator */}
                <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center flex items-center justify-center gap-1 pt-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Ready for Google Places Autocomplete API Integration</span>
                </div>

              </div>
            )}

            {/* ===================== VIEW 3: ADD / EDIT ADDRESS FORM ===================== */}
            {view === 'form' && (
              <form onSubmit={handleSaveForm} className="space-y-3 sm:space-y-3.5">
                
                {formError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                    {formError}
                  </div>
                )}

                {/* 1. Label Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Address Label
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {(['Home', 'Office', 'Warehouse', 'Shop', 'Factory', 'Other'] as AddressLabelType[]).map((lbl) => {
                      const IconComp = LABEL_ICONS[lbl];
                      const isSelected = formLabel === lbl;
                      return (
                        <button
                          key={lbl}
                          type="button"
                          onClick={() => setFormLabel(lbl)}
                          className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all text-center min-h-[44px] ${
                            isSelected
                              ? 'bg-[#001261] text-white border-[#001261] shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold leading-none">{lbl}</span>
                        </button>
                      );
                    })}
                  </div>

                  {formLabel === 'Other' && (
                    <input
                      type="text"
                      value={formCustomLabel}
                      onChange={(e) => setFormCustomLabel(e.target.value)}
                      placeholder="e.g. Parents' House, Studio, Farmhouse"
                      className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600"
                    />
                  )}
                </div>

                {/* 2. Flat / House / Building */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Flat / House No. / Building Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formFlatBuilding}
                    onChange={(e) => setFormFlatBuilding(e.target.value)}
                    placeholder="e.g. Flat 402, Green Glen Heights, Block B"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>

                {/* 3. Street / Locality / Area */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Street / Locality / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStreetLocality}
                    onChange={(e) => setFormStreetLocality(e.target.value)}
                    placeholder="e.g. Outer Ring Road, Bellandur / DB Road, RS Puram"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>

                {/* 4. Landmark, City & Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={formLandmark}
                      onChange={(e) => setFormLandmark(e.target.value)}
                      placeholder="e.g. Opp Central Mall"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      City *
                    </label>
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600"
                    >
                      {CITIES_DATA.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Pincode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formPincode}
                      onChange={(e) => setFormPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 560103"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* 5. Contact Person & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Contact Person (Optional)
                    </label>
                    <input
                      type="text"
                      value={formContactName}
                      onChange={(e) => setFormContactName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formContactPhone}
                      onChange={(e) => setFormContactPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* 6. Applicable Service Tags */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Tag for Services
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_SERVICE_TAGS.map((tag) => {
                      const isChecked = formServiceTags.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => {
                            if (isChecked) {
                              setFormServiceTags(formServiceTags.filter(t => t !== tag.id));
                            } else {
                              setFormServiceTags([...formServiceTags, tag.id]);
                            }
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                            isChecked
                              ? 'bg-orange-500 text-white border-orange-500 shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isChecked ? `✓ ${tag.label}` : tag.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Default Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-700 dark:text-slate-300 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={formIsDefault}
                    onChange={(e) => setFormIsDefault(e.target.checked)}
                    className="w-4 h-4 text-[#001261] rounded border-slate-300 focus:ring-[#001261]"
                  />
                  <span>Set as default primary address</span>
                </label>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{editingAddressId ? 'Update Address' : 'Save Address'}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Modal Footer Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 truncate mr-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>100% Privacy • Encrypted Vault</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white shrink-0 px-1 py-0.5"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
