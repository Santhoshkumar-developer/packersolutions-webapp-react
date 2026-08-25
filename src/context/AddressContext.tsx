import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserAddress, 
  RecentAddressItem, 
  LocationSearchResult, 
  ServiceTagType,
  AddressLabelType 
} from '../types';
import { addressService } from '../services/addressService';

export interface CurrentUser {
  mobile: string;
  name: string;
  email: string;
}

export interface AddressPickerConfig {
  isOpen: boolean;
  type: 'pickup' | 'drop' | 'single';
  serviceId?: ServiceTagType | string;
  cityContext?: string;
  currentValue?: string;
  title?: string;
  subtitle?: string;
  onSelect: (addressStr: string, details?: UserAddress | RecentAddressItem | LocationSearchResult) => void;
}

interface AddressContextType {
  savedAddresses: UserAddress[];
  recentAddresses: RecentAddressItem[];
  isLoading: boolean;
  isLoggedIn: boolean;
  currentUser: CurrentUser | null;
  
  // CRUD & Actions
  addAddress: (
    data: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt' | 'formattedAddress'> & { formattedAddress?: string }
  ) => Promise<UserAddress>;
  updateAddress: (id: string, updates: Partial<UserAddress>) => Promise<UserAddress>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  recordRecentAddress: (item: Omit<RecentAddressItem, 'id' | 'usedAt'>) => Promise<RecentAddressItem[]>;
  clearRecentAddresses: () => Promise<void>;
  searchLocations: (query: string, cityContext?: string) => Promise<LocationSearchResult[]>;
  
  // Auth Integration
  loginUser: (mobile: string, name?: string, email?: string) => Promise<void>;
  logoutUser: () => void;
  refreshAddresses: () => Promise<void>;

  // Global UI Picker state
  pickerConfig: AddressPickerConfig | null;
  openPicker: (config: Omit<AddressPickerConfig, 'isOpen'>) => void;
  closePicker: () => void;

  // Saved Addresses Manager Modal (Account Settings)
  isSavedAddressesModalOpen: boolean;
  openSavedAddressesModal: () => void;
  closeSavedAddressesModal: () => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [recentAddresses, setRecentAddresses] = useState<RecentAddressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Address Picker Modal State
  const [pickerConfig, setPickerConfig] = useState<AddressPickerConfig | null>(null);

  // Saved Addresses Modal (Account Settings)
  const [isSavedAddressesModalOpen, setIsSavedAddressesModalOpen] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const checkAuthAndLoad = async () => {
      setIsLoading(true);
      try {
        const loggedIn = localStorage.getItem('ps_user_logged_in') === 'true';
        const mobile = localStorage.getItem('ps_user_mobile') || '';
        const name = localStorage.getItem('ps_user_name') || '';
        const email = localStorage.getItem('ps_user_email') || '';

        if (loggedIn && mobile) {
          setIsLoggedIn(true);
          setCurrentUser({ mobile, name, email });
          const [saved, recents] = await Promise.all([
            addressService.getSavedAddresses(mobile),
            addressService.getRecentAddresses(mobile)
          ]);
          setSavedAddresses(saved);
          setRecentAddresses(recents);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
          const [saved, recents] = await Promise.all([
            addressService.getSavedAddresses(null),
            addressService.getRecentAddresses(null)
          ]);
          setSavedAddresses(saved);
          setRecentAddresses(recents);
        }
      } catch (err) {
        console.error('Failed to initialize address context', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, []);

  const refreshAddresses = useCallback(async () => {
    const mobile = currentUser?.mobile || (isLoggedIn ? localStorage.getItem('ps_user_mobile') : null);
    try {
      const [saved, recents] = await Promise.all([
        addressService.getSavedAddresses(mobile),
        addressService.getRecentAddresses(mobile)
      ]);
      setSavedAddresses(saved);
      setRecentAddresses(recents);
    } catch (e) {
      console.error('Error refreshing addresses', e);
    }
  }, [currentUser, isLoggedIn]);

  const addAddress = async (
    data: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt' | 'formattedAddress'> & { formattedAddress?: string }
  ) => {
    const mobile = currentUser?.mobile || null;
    const newAddress = await addressService.saveAddress(data, mobile);
    await refreshAddresses();
    return newAddress;
  };

  const updateAddress = async (id: string, updates: Partial<UserAddress>) => {
    const mobile = currentUser?.mobile || null;
    const updated = await addressService.updateAddress(id, updates, mobile);
    await refreshAddresses();
    return updated;
  };

  const deleteAddress = async (id: string) => {
    const mobile = currentUser?.mobile || null;
    await addressService.deleteAddress(id, mobile);
    await refreshAddresses();
  };

  const setDefaultAddress = async (id: string) => {
    const mobile = currentUser?.mobile || null;
    await addressService.setDefaultAddress(id, mobile);
    await refreshAddresses();
  };

  const recordRecentAddress = async (item: Omit<RecentAddressItem, 'id' | 'usedAt'>) => {
    const mobile = currentUser?.mobile || null;
    const updated = await addressService.addRecentAddress(item, mobile);
    setRecentAddresses(updated);
    return updated;
  };

  const clearRecentAddresses = async () => {
    const mobile = currentUser?.mobile || null;
    await addressService.clearRecentAddresses(mobile);
    setRecentAddresses([]);
  };

  const searchLocations = async (query: string, cityContext?: string) => {
    return addressService.searchLocations(query, cityContext);
  };

  const loginUser = async (mobile: string, name?: string, email?: string) => {
    const cleanMobile = mobile.replace(/\D/g, '');
    const userName = name || localStorage.getItem('ps_user_name') || 'Valued Customer';
    const userEmail = email || localStorage.getItem('ps_user_email') || '';

    localStorage.setItem('ps_user_logged_in', 'true');
    localStorage.setItem('ps_user_mobile', cleanMobile);
    if (userName) localStorage.setItem('ps_user_name', userName);
    if (userEmail) localStorage.setItem('ps_user_email', userEmail);

    setIsLoggedIn(true);
    setCurrentUser({ mobile: cleanMobile, name: userName, email: userEmail });

    // Migrate guest data to user account!
    await addressService.migrateGuestDataToUser(cleanMobile);
    
    // Refresh user's saved and recent addresses
    const [saved, recents] = await Promise.all([
      addressService.getSavedAddresses(cleanMobile),
      addressService.getRecentAddresses(cleanMobile)
    ]);
    setSavedAddresses(saved);
    setRecentAddresses(recents);
  };

  const logoutUser = () => {
    localStorage.removeItem('ps_user_logged_in');
    localStorage.removeItem('ps_user_mobile');
    localStorage.removeItem('ps_user_name');
    localStorage.removeItem('ps_user_email');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsSavedAddressesModalOpen(false);

    // Load guest addresses
    addressService.getSavedAddresses(null).then(setSavedAddresses);
    addressService.getRecentAddresses(null).then(setRecentAddresses);
  };

  const openPicker = (config: Omit<AddressPickerConfig, 'isOpen'>) => {
    setPickerConfig({ ...config, isOpen: true });
  };

  const closePicker = () => {
    setPickerConfig(null);
  };

  const openSavedAddressesModal = () => setIsSavedAddressesModalOpen(true);
  const closeSavedAddressesModal = () => setIsSavedAddressesModalOpen(false);

  return (
    <AddressContext.Provider
      value={{
        savedAddresses,
        recentAddresses,
        isLoading,
        isLoggedIn,
        currentUser,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        recordRecentAddress,
        clearRecentAddresses,
        searchLocations,
        loginUser,
        logoutUser,
        refreshAddresses,
        pickerConfig,
        openPicker,
        closePicker,
        isSavedAddressesModalOpen,
        openSavedAddressesModal,
        closeSavedAddressesModal
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
