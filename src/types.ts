/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  structuredData: Record<string, any>;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string; // Used to select a Lucide icon dynamically
  image: string;
  benefits: string[];
  processSteps: ProcessStep[];
  basePrice: number;
  priceMetric: string;
  faq: { question: string; answer: string }[];
  seo: SEOData;
  formFields: ServiceFormField[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  details: Record<string, any>;
  estimatedCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  service: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Household' | 'Office' | 'Fragile Items' | 'Logistics' | 'General';
  readTime: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  seo: SEOData;
}

export type AddressLabelType = 'Home' | 'Office' | 'Warehouse' | 'Shop' | 'Factory' | 'Other';

export type ServiceTagType = 
  | 'packers-and-movers'
  | 'household-shifting'
  | 'office-shifting'
  | 'parcel-courier'
  | 'truck-booking'
  | 'vehicle-transportation'
  | 'warehousing-storage'
  | 'loading-unloading'
  | 'packing-unpacking';

export interface UserAddress {
  id: string;
  label: AddressLabelType;
  customLabel?: string;
  flatBuilding: string;
  streetLocality: string;
  landmark?: string;
  city: string;
  state?: string;
  pincode?: string;
  contactName?: string;
  contactPhone?: string;
  formattedAddress: string;
  serviceTags: ServiceTagType[];
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
  placeId?: string;
  lat?: number;
  lng?: number;
}

export interface RecentAddressItem {
  id: string;
  formattedAddress: string;
  shortAddress: string;
  city: string;
  area: string;
  usedAt: string;
  label?: AddressLabelType;
  serviceId?: string;
  placeId?: string;
}

export interface LocationSearchResult {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  state: string;
  pincode: string;
  area: string;
  fullAddress: string;
  placeId?: string;
  lat?: number;
  lng?: number;
}

