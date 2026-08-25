import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Plus, 
  Home, 
  Building2, 
  Warehouse, 
  Store, 
  Factory, 
  Star, 
  Trash2, 
  Edit3, 
  X, 
  ShieldCheck, 
  Phone, 
  User, 
  CheckCircle2, 
  Search,
  Tag
} from 'lucide-react';
import { UserAddress, AddressLabelType, ServiceTagType } from '../types';
import { useAddress } from '../context/AddressContext';
import { CITIES_DATA } from '../data/cities';
import { SERVICE_TAG_LABELS } from '../data/addressMockData';

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

export const SavedAddressesModal: React.FC = () => {
  const { 
    isSavedAddressesModalOpen, 
    closeSavedAddressesModal, 
    savedAddresses, 
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress,
    isLoggedIn,
    currentUser
  } = useAddress();

  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  // Form State
  const [formLabel, setFormLabel] = useState<AddressLabelType>('Home');
  const [formCustomLabel, setFormCustomLabel] = useState('');
  const [formFlatBuilding, setFormFlatBuilding] = useState('');
  const [formStreetLocality, setFormStreetLocality] = useState('');
  const [formLandmark, setFormLandmark] = useState('');
  const [formCity, setFormCity] = useState('Bangalore');
  const [formState, setFormState] = useState('');
  const [formPincode, setFormPincode] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactPhone, setFormContactPhone] = useState('');
  const [formServiceTags, setFormServiceTags] = useState<ServiceTagType[]>(['household-shifting']);
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSavedAddressesModalOpen) return null;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormLabel('Home');
    setFormCustomLabel('');
    setFormFlatBuilding('');
    setFormStreetLocality('');
    setFormLandmark('');
    setFormCity('Bangalore');
    setFormState('');
    setFormPincode('');
    setFormContactName(currentUser?.name || '');
    setFormContactPhone(currentUser?.mobile || '');
    setFormServiceTags(['household-shifting']);
    setFormIsDefault(savedAddresses.length === 0);
    setFormError('');
    setIsAddingOrEditing(true);
  };

  const handleOpenEdit = (addr: UserAddress) => {
    setEditingId(addr.id);
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
    setFormServiceTags(addr.serviceTags || ['household-shifting']);
    setFormIsDefault(!!addr.isDefault);
    setFormError('');
    setIsAddingOrEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFlatBuilding.trim()) {
      setFormError('Please enter Flat / Building Name');
      return;
    }
    if (!formStreetLocality.trim()) {
      setFormError('Please enter Street, Locality or Area');
      return;
    }
    if (!formCity.trim()) {
      setFormError('Please enter City');
      return;
    }
    if (formContactPhone && formContactPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit contact number');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      if (editingId) {
        await updateAddress(editingId, {
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
          isDefault: formIsDefault
        });
      } else {
        await addAddress({
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
          isDefault: formIsDefault
        });
      }
      setIsAddingOrEditing(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAddresses = savedAddresses.filter(a => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      a.label.toLowerCase().includes(q) ||
      a.flatBuilding.toLowerCase().includes(q) ||
      a.streetLocality.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      (a.contactName && a.contactName.toLowerCase().includes(q))
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSavedAddressesModal}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        >
          {/* Header */}
          <div className="px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/90 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 mr-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight truncate">
                  Saved Addresses
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  {isLoggedIn ? `Manage saved locations for ${currentUser?.name || currentUser?.mobile}` : 'Manage your saved addresses (Stored locally)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {!isAddingOrEditing && (
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-extrabold text-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer min-h-[36px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add New</span>
                  <span className="sm:hidden">Add</span>
                </button>
              )}
              <button
                type="button"
                onClick={closeSavedAddressesModal}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 space-y-4 overscroll-contain">
            
            {isAddingOrEditing ? (
              /* Add/Edit Form */
              <form onSubmit={handleSave} className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {editingId ? 'Edit Address' : 'Add New Address'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingOrEditing(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>

                {formError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                    {formError}
                  </div>
                )}

                {/* Label selector */}
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

                {/* Flat / Building */}
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

                {/* Street / Locality */}
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

                {/* Landmark, City & Pincode */}
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

                {/* Contact Person & Phone */}
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

                {/* Service tags */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Applicable Services
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

                {/* Default checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-700 dark:text-slate-300 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={formIsDefault}
                    onChange={(e) => setFormIsDefault(e.target.checked)}
                    className="w-4 h-4 text-[#001261] rounded border-slate-300 focus:ring-[#001261]"
                  />
                  <span>Set as default primary address</span>
                </label>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddingOrEditing(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{editingId ? 'Update Address' : 'Save Address'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* List View */
              <div className="space-y-3">
                {/* Search Bar */}
                {savedAddresses.length > 3 && (
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                      placeholder="Filter saved addresses..."
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 sm:py-1.5 text-sm sm:text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600"
                    />
                  </div>
                )}

                {filteredAddresses.length === 0 ? (
                  <div className="py-8 sm:py-10 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      No saved addresses yet
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto px-4">
                      Save your home, office, and warehouse locations to easily autofill bookings.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAdd}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-[#001261] hover:bg-blue-900 text-white font-extrabold text-xs transition-colors min-h-[44px]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add First Address</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredAddresses.map((addr) => {
                      const IconComp = LABEL_ICONS[addr.label] || MapPin;
                      return (
                        <div
                          key={addr.id}
                          className="p-3 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start justify-between gap-2.5 sm:gap-3 shadow-2xs"
                        >
                          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                              <IconComp className="w-4 h-4" />
                            </div>

                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                <span className="text-xs font-black text-slate-900 dark:text-white">
                                  {addr.label === 'Other' && addr.customLabel ? addr.customLabel : addr.label}
                                </span>
                                {addr.isDefault && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded-md">
                                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                    Default Address
                                  </span>
                                )}
                                {addr.serviceTags && addr.serviceTags.length > 0 && (
                                  <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                                    {addr.serviceTags.map(t => SERVICE_TAG_LABELS[t] || t).join(', ')}
                                  </span>
                                )}
                              </div>

                              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                {addr.flatBuilding}
                              </div>

                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {addr.streetLocality}{addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city} {addr.pincode ? `- ${addr.pincode}` : ''}
                              </div>

                              {(addr.contactName || addr.contactPhone) && (
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
                                  {addr.contactName && (
                                    <span className="flex items-center gap-1">
                                      <User className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                      <span className="truncate max-w-[120px] sm:max-w-none">{addr.contactName}</span>
                                    </span>
                                  )}
                                  {addr.contactPhone && (
                                    <span className="flex items-center gap-1">
                                      <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                      {addr.contactPhone}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-1 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
                            {!addr.isDefault && (
                              <button
                                type="button"
                                onClick={() => setDefaultAddress(addr.id)}
                                className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
                                title="Set as default address"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(addr)}
                              className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
                              title="Edit address"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Delete this address?')) {
                                  deleteAddress(addr.id);
                                }
                              }}
                              className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
                              title="Delete address"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px] truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Stored safely in account vault</span>
            </span>
            <button
              type="button"
              onClick={closeSavedAddressesModal}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-2 py-1"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
