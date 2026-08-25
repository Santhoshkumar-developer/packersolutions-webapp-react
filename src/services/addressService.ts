import { 
  UserAddress, 
  RecentAddressItem, 
  LocationSearchResult, 
  ServiceTagType,
  AddressLabelType 
} from '../types';
import { INITIAL_MOCK_SAVED_ADDRESSES, MOCK_LOCALITIES_DATABASE } from '../data/addressMockData';

/**
 * Address Service Interface
 * Designed for future plug-and-play replacement by:
 * 1. Google Places Autocomplete API (for places autocomplete/geocoding)
 * 2. Python FastAPI + PostgreSQL backend (/api/v1/addresses)
 */
export interface IAddressService {
  getSavedAddresses(userMobile?: string | null): Promise<UserAddress[]>;
  saveAddress(
    addressData: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt' | 'formattedAddress'> & { formattedAddress?: string },
    userMobile?: string | null
  ): Promise<UserAddress>;
  updateAddress(
    id: string,
    updates: Partial<Omit<UserAddress, 'id' | 'createdAt'>>,
    userMobile?: string | null
  ): Promise<UserAddress>;
  deleteAddress(id: string, userMobile?: string | null): Promise<void>;
  setDefaultAddress(id: string, userMobile?: string | null): Promise<void>;
  
  getRecentAddresses(userMobile?: string | null): Promise<RecentAddressItem[]>;
  addRecentAddress(
    recentItem: Omit<RecentAddressItem, 'id' | 'usedAt'>,
    userMobile?: string | null
  ): Promise<RecentAddressItem[]>;
  clearRecentAddresses(userMobile?: string | null): Promise<void>;

  searchLocations(query: string, cityContext?: string): Promise<LocationSearchResult[]>;
  migrateGuestDataToUser(userMobile: string): Promise<{ migratedCount: number }>;
}

/**
 * Helper to build standard clean formatted address string
 */
export function formatAddressString(addr: {
  flatBuilding: string;
  streetLocality: string;
  landmark?: string;
  city: string;
  state?: string;
  pincode?: string;
}): string {
  const parts = [
    addr.flatBuilding.trim(),
    addr.streetLocality.trim(),
    addr.landmark?.trim() ? `Near ${addr.landmark.trim()}` : null,
    addr.city.trim(),
    addr.state?.trim() ? addr.state.trim() : null,
    addr.pincode?.trim() ? `- ${addr.pincode.trim()}` : null,
  ].filter(Boolean);
  return parts.join(', ').replace(', -', ' -');
}

/**
 * LocalStorage Address Service Implementation
 */
class LocalStorageAddressService implements IAddressService {
  private GUEST_ADDRESSES_KEY = 'ps_guest_saved_addresses';
  private GUEST_RECENTS_KEY = 'ps_guest_recent_addresses';
  private USER_ADDR_PREFIX = 'ps_user_addresses_';
  private USER_RECENTS_PREFIX = 'ps_user_recents_';
  private MAX_RECENTS = 5;

  private getStorageKey(prefix: string, userMobile?: string | null): string {
    const cleanMobile = userMobile?.replace(/\D/g, '');
    if (cleanMobile) {
      return `${prefix}${cleanMobile}`;
    }
    return prefix === this.USER_ADDR_PREFIX ? this.GUEST_ADDRESSES_KEY : this.GUEST_RECENTS_KEY;
  }

  /**
   * Retrieve saved addresses
   */
  async getSavedAddresses(userMobile?: string | null): Promise<UserAddress[]> {
    const key = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading saved addresses from storage', e);
    }

    // If logged in as demo user or first time, populate initial mock addresses
    if (userMobile) {
      const initialUserAddresses = INITIAL_MOCK_SAVED_ADDRESSES.filter(
        a => !a.contactPhone || a.contactPhone === userMobile || userMobile.includes('98765')
      );
      const defaults = initialUserAddresses.length > 0 ? initialUserAddresses : INITIAL_MOCK_SAVED_ADDRESSES.slice(0, 3);
      try {
        localStorage.setItem(key, JSON.stringify(defaults));
      } catch (e) {
        console.error(e);
      }
      return defaults;
    }

    return [];
  }

  /**
   * Save a new address
   */
  async saveAddress(
    addressData: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt' | 'formattedAddress'> & { formattedAddress?: string },
    userMobile?: string | null
  ): Promise<UserAddress> {
    const addresses = await this.getSavedAddresses(userMobile);
    const key = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);

    const formattedAddress = addressData.formattedAddress || formatAddressString(addressData);

    const now = new Date().toISOString();
    const newAddress: UserAddress = {
      ...addressData,
      id: `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      formattedAddress,
      createdAt: now,
      updatedAt: now,
      isDefault: addressData.isDefault || addresses.length === 0,
    };

    // If set as default, unset previous default
    let updatedList = addresses;
    if (newAddress.isDefault) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
    }

    updatedList = [newAddress, ...updatedList];
    try {
      localStorage.setItem(key, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving address', e);
    }

    return newAddress;
  }

  /**
   * Update an existing address
   */
  async updateAddress(
    id: string,
    updates: Partial<Omit<UserAddress, 'id' | 'createdAt'>>,
    userMobile?: string | null
  ): Promise<UserAddress> {
    const addresses = await this.getSavedAddresses(userMobile);
    const key = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);

    const existingIndex = addresses.findIndex(a => a.id === id);
    if (existingIndex === -1) {
      throw new Error(`Address with id ${id} not found`);
    }

    const existing = addresses[existingIndex];
    const merged = { ...existing, ...updates, updatedAt: new Date().toISOString() };

    if (!updates.formattedAddress && (updates.flatBuilding || updates.streetLocality || updates.landmark || updates.city || updates.pincode)) {
      merged.formattedAddress = formatAddressString(merged);
    }

    let updatedList = [...addresses];
    if (merged.isDefault) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: a.id === id }));
    }
    updatedList[existingIndex] = merged;

    try {
      localStorage.setItem(key, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error updating address', e);
    }

    return merged;
  }

  /**
   * Delete an address
   */
  async deleteAddress(id: string, userMobile?: string | null): Promise<void> {
    const addresses = await this.getSavedAddresses(userMobile);
    const key = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);

    const filtered = addresses.filter(a => a.id !== id);
    // If we deleted the default and there are remaining addresses, make the first one default
    if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
      filtered[0].isDefault = true;
    }

    try {
      localStorage.setItem(key, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error deleting address', e);
    }
  }

  /**
   * Set address as default
   */
  async setDefaultAddress(id: string, userMobile?: string | null): Promise<void> {
    const addresses = await this.getSavedAddresses(userMobile);
    const key = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);

    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));

    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error('Error setting default address', e);
    }
  }

  /**
   * Get latest recent addresses (max 5)
   */
  async getRecentAddresses(userMobile?: string | null): Promise<RecentAddressItem[]> {
    const key = this.getStorageKey(this.USER_RECENTS_PREFIX, userMobile);
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored).slice(0, this.MAX_RECENTS);
      }
    } catch (e) {
      console.error('Error getting recent addresses', e);
    }
    return [];
  }

  /**
   * Record a recent address usage, keeping max 5 and removing duplicates
   */
  async addRecentAddress(
    recentItem: Omit<RecentAddressItem, 'id' | 'usedAt'>,
    userMobile?: string | null
  ): Promise<RecentAddressItem[]> {
    const currentRecents = await this.getRecentAddresses(userMobile);
    const key = this.getStorageKey(this.USER_RECENTS_PREFIX, userMobile);

    const cleanFormatted = recentItem.formattedAddress.trim().toLowerCase();

    // Remove duplicates matching the formatted address
    const deduped = currentRecents.filter(
      r => r.formattedAddress.trim().toLowerCase() !== cleanFormatted
    );

    const newRecent: RecentAddressItem = {
      ...recentItem,
      id: `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      usedAt: new Date().toISOString()
    };

    const updated = [newRecent, ...deduped].slice(0, this.MAX_RECENTS);

    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving recent address', e);
    }

    return updated;
  }

  /**
   * Clear recent addresses
   */
  async clearRecentAddresses(userMobile?: string | null): Promise<void> {
    const key = this.getStorageKey(this.USER_RECENTS_PREFIX, userMobile);
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error clearing recent addresses', e);
    }
  }

  /**
   * Search mock locations (with fuzzy matching and city priority)
   * This is structured so Google Places Autocomplete API can be plugged in directly.
   */
  async searchLocations(query: string, cityContext?: string): Promise<LocationSearchResult[]> {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      // If query is empty, return top locations for the selected city
      if (cityContext) {
        const cityMatches = MOCK_LOCALITIES_DATABASE.filter(
          l => l.city.toLowerCase() === cityContext.toLowerCase()
        );
        return cityMatches.length > 0 ? cityMatches : MOCK_LOCALITIES_DATABASE.slice(0, 8);
      }
      return MOCK_LOCALITIES_DATABASE.slice(0, 8);
    }

    const matches = MOCK_LOCALITIES_DATABASE.filter(loc => {
      const matchTitle = loc.title.toLowerCase().includes(cleanQuery);
      const matchSubtitle = loc.subtitle.toLowerCase().includes(cleanQuery);
      const matchArea = loc.area.toLowerCase().includes(cleanQuery);
      const matchCity = loc.city.toLowerCase().includes(cleanQuery);
      const matchPin = loc.pincode.includes(cleanQuery);
      const matchFull = loc.fullAddress.toLowerCase().includes(cleanQuery);
      return matchTitle || matchSubtitle || matchArea || matchCity || matchPin || matchFull;
    });

    // If cityContext is specified, rank results from that city first
    if (cityContext) {
      matches.sort((a, b) => {
        const aInCity = a.city.toLowerCase() === cityContext.toLowerCase() ? 1 : 0;
        const bInCity = b.city.toLowerCase() === cityContext.toLowerCase() ? 1 : 0;
        return bInCity - aInCity;
      });
    }

    // Also generate a dynamic exact query match if user typed custom address
    if (cleanQuery.length >= 3 && !matches.some(m => m.fullAddress.toLowerCase() === cleanQuery)) {
      const userCity = cityContext || 'Bangalore';
      const dynamicResult: LocationSearchResult = {
        id: `dyn-search-${Date.now()}`,
        title: query.trim(),
        subtitle: `${userCity}, India`,
        city: userCity,
        state: 'India',
        pincode: '',
        area: query.trim(),
        fullAddress: `${query.trim()}, ${userCity}`,
        placeId: `place-dyn-${encodeURIComponent(query.trim())}`
      };
      return [dynamicResult, ...matches];
    }

    return matches;
  }

  /**
   * Migrate guest addresses & recents to the user account on login
   */
  async migrateGuestDataToUser(userMobile: string): Promise<{ migratedCount: number }> {
    if (!userMobile) return { migratedCount: 0 };

    let migratedCount = 0;
    try {
      // 1. Migrate guest saved addresses
      const guestAddressesRaw = localStorage.getItem(this.GUEST_ADDRESSES_KEY);
      if (guestAddressesRaw) {
        const guestAddresses: UserAddress[] = JSON.parse(guestAddressesRaw);
        if (guestAddresses.length > 0) {
          const userAddresses = await this.getSavedAddresses(userMobile);
          const existingFormatted = new Set(userAddresses.map(a => a.formattedAddress.trim().toLowerCase()));

          const newToAdd = guestAddresses.filter(ga => !existingFormatted.has(ga.formattedAddress.trim().toLowerCase()));
          if (newToAdd.length > 0) {
            const combined = [...userAddresses, ...newToAdd];
            const userKey = this.getStorageKey(this.USER_ADDR_PREFIX, userMobile);
            localStorage.setItem(userKey, JSON.stringify(combined));
            migratedCount += newToAdd.length;
          }
          // Clear guest key
          localStorage.removeItem(this.GUEST_ADDRESSES_KEY);
        }
      }

      // 2. Migrate guest recent addresses
      const guestRecentsRaw = localStorage.getItem(this.GUEST_RECENTS_KEY);
      if (guestRecentsRaw) {
        const guestRecents: RecentAddressItem[] = JSON.parse(guestRecentsRaw);
        if (guestRecents.length > 0) {
          const userRecents = await this.getRecentAddresses(userMobile);
          const existingRecents = new Set(userRecents.map(r => r.formattedAddress.trim().toLowerCase()));

          const newRecentsToAdd = guestRecents.filter(gr => !existingRecents.has(gr.formattedAddress.trim().toLowerCase()));
          const combinedRecents = [...newRecentsToAdd, ...userRecents].slice(0, this.MAX_RECENTS);
          const userRecentsKey = this.getStorageKey(this.USER_RECENTS_PREFIX, userMobile);
          localStorage.setItem(userRecentsKey, JSON.stringify(combinedRecents));
          // Clear guest key
          localStorage.removeItem(this.GUEST_RECENTS_KEY);
        }
      }
    } catch (e) {
      console.error('Error during guest data migration', e);
    }

    return { migratedCount };
  }
}

// Singleton export
export const addressService: IAddressService = new LocalStorageAddressService();
