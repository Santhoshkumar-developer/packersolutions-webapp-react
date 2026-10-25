export type BookingStatus =
  | 'Draft'
  | 'Quote Ready'
  | 'Payment Pending'
  | 'Confirmed'
  | 'Survey Scheduled'
  | 'Survey Completed'
  | 'Packing Scheduled'
  | 'Packing Completed'
  | 'Loading'
  | 'In Transit'
  | 'Reached Destination'
  | 'Unloading'
  | 'Delivered'
  | 'Cancelled';

export type FilterCategory = 'All' | 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export interface InventoryCategory {
  categoryName: string;
  items: InventoryItem[];
}

export interface AddressPoint {
  label: string;
  city: string;
  state: string;
  fullAddress: string;
  floor: string;
  liftAvailable: boolean;
  parkingAvailable: boolean;
  contactPerson: string;
  contactPhone: string;
}

export interface AddonService {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  iconName: string;
  added: boolean;
}

export interface PaymentRecord {
  id: string;
  date: string;
  title: string;
  amount: number;
  status: 'Successful' | 'Pending' | 'Failed';
  method: string;
  transactionRef: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
}

export interface TrackingTelemetry {
  currentStage: string;
  lastUpdated: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  currentLocation: string;
  eta: string;
  speedKmH: number;
  distanceRemainingKm: number;
}

export interface BookingModel {
  id: string;
  ticketId: string;
  serviceType: string;
  houseSize: string;
  status: BookingStatus;
  statusCategory: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
  shiftingDate: string;
  timeSlot: string;
  createdAt: string;
  
  pickup: AddressPoint;
  drops: AddressPoint[]; // Supports multiple drops
  
  // Progress stages: 0 to 5
  progressStage: number; // 0: Confirmed, 1: Survey, 2: Packing, 3: Loading, 4: In Transit, 5: Delivered
  
  // Payment
  quotationAmount: number;
  addonAmount: number;
  insuranceAmount: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  paymentStatus: 'Paid' | 'Payment Pending' | 'Partial';
  payments: PaymentRecord[];
  
  // Inventory
  inventory: InventoryCategory[];
  totalItemsCount: number;
  
  // Services
  addons: AddonService[];
  
  // Documents
  documents: DocumentItem[];
  
  // Activity
  activityLogs: ActivityEvent[];
  
  // Telemetry (for In Transit / Tracking)
  telemetry?: TrackingTelemetry;
  
  assignedTeam?: {
    leadName: string;
    leadPhone: string;
    crewCount: number;
    verified: boolean;
  };
}
