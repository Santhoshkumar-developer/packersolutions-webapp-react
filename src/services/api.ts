/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Booking } from '../types';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  createdAt: string;
}

export interface PartnerRegistration {
  id: string;
  name: string;
  phone: string;
  city: string;
  vehicle: string;
  createdAt: string;
}

/**
 * Centralized API Service client for the Packersolution platform.
 * Routes point to the full-stack server proxy endpoints (/api/*).
 * Graceful LocalStorage fallbacks are implemented to keep the offline/static preview fully responsive.
 */
export const apiService = {
  /**
   * Submit a new moving & shifting booking estimate
   */
  async createBooking(bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
    const payload = {
      ...bookingData,
      id: 'PS-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('API Gateway offline. Saving to local storage fallback.', error);
    }

    // Fallback: Store in localStorage
    const currentStr = localStorage.getItem('packers_bookings');
    const bookings = currentStr ? JSON.parse(currentStr) : [];
    bookings.unshift(payload);
    localStorage.setItem('packers_bookings', JSON.stringify(bookings));
    return payload as Booking;
  },

  /**
   * Fetch all booking estimates (Admin console)
   */
  async getBookings(): Promise<Booking[]> {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('API Gateway offline. Fetching from local storage fallback.', error);
    }

    const currentStr = localStorage.getItem('packers_bookings');
    return currentStr ? JSON.parse(currentStr) : [];
  },

  /**
   * Submit contact form inquiry
   */
  async submitContact(contactData: Omit<ContactSubmission, 'id' | 'createdAt'>): Promise<ContactSubmission> {
    const payload: ContactSubmission = {
      ...contactData,
      id: 'CON-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('API Gateway offline. Saving to local storage fallback.', error);
    }

    const currentStr = localStorage.getItem('packers_contact_inquiries');
    const inquiries = currentStr ? JSON.parse(currentStr) : [];
    inquiries.unshift(payload);
    localStorage.setItem('packers_contact_inquiries', JSON.stringify(inquiries));
    return payload;
  },

  /**
   * Register a logistics fleet partner
   */
  async registerPartner(partnerData: Omit<PartnerRegistration, 'id' | 'createdAt'>): Promise<PartnerRegistration> {
    const payload: PartnerRegistration = {
      ...partnerData,
      id: 'PRT-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('API Gateway offline. Saving to local storage fallback.', error);
    }

    const currentStr = localStorage.getItem('packers_partners');
    const partners = currentStr ? JSON.parse(currentStr) : [];
    partners.unshift(payload);
    localStorage.setItem('packers_partners', JSON.stringify(partners));
    return payload;
  }
};
