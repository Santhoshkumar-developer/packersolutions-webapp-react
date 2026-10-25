import { BookingModel, AddonService } from './types';

export const INITIAL_ADDON_CATALOG: AddonService[] = [
  { id: 'add-1', name: 'Packing', shortDesc: '3-layer heavy bubble wrap & waterproof film', price: 1800, iconName: 'Package', added: true },
  { id: 'add-2', name: 'Unpacking', shortDesc: 'Neat box unsealing and item placement', price: 1200, iconName: 'BoxSelect', added: false },
  { id: 'add-3', name: 'Furniture Dismantling', shortDesc: 'Safe breakdown of modular beds and wardrobes', price: 500, iconName: 'Wrench', added: true },
  { id: 'add-4', name: 'Furniture Assembly', shortDesc: 'Precision allen-key & power tool setup', price: 600, iconName: 'Hammer', added: false },
  { id: 'add-5', name: 'Transit Insurance', shortDesc: 'All-risk comprehensive coverage up to ₹5,00,000', price: 500, iconName: 'ShieldCheck', added: true },
  { id: 'add-6', name: 'Warehouse Storage', shortDesc: '30-day climate secured CCTV monitored space', price: 3500, iconName: 'Warehouse', added: false },
  { id: 'add-7', name: 'Home Deep Cleaning', shortDesc: 'Pre-move or post-move sanitization', price: 1500, iconName: 'Sparkles', added: false },
  { id: 'add-8', name: 'Extra Heavy Boxes', shortDesc: '5 heavy-duty double-wall corrugated cartons', price: 450, iconName: 'Boxes', added: false },
  { id: 'add-9', name: 'Vehicle Transportation', shortDesc: 'Closed hydraulic carrier for 2-wheelers or cars', price: 4000, iconName: 'Truck', added: false },
  { id: 'add-10', name: 'Loading Assistance', shortDesc: 'Dedicated heavy lifters with trolley support', price: 800, iconName: 'ArrowUpRight', added: false },
  { id: 'add-11', name: 'Unloading Assistance', shortDesc: 'Room-wise placement and heavy appliance positioning', price: 800, iconName: 'CheckCircle2', added: false },
];

export const MOCK_BOOKINGS: BookingModel[] = [
  {
    id: 'b-1',
    ticketId: 'PS-2026-00125',
    serviceType: 'Household Shifting',
    houseSize: '2 BHK',
    status: 'Confirmed',
    statusCategory: 'Upcoming',
    shiftingDate: '28 Sep 2026',
    timeSlot: '9:00 AM – 11:00 AM',
    createdAt: '20 Sep 2026, 10:32 AM',
    progressStage: 0, // 0: Booking Confirmed, 1: Survey, 2: Packing, 3: Loading, 4: In Transit, 5: Delivered
    
    pickup: {
      label: 'Pickup Address',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      fullAddress: 'Flat 402, Green Meadows Enclave, Avinashi Road, Peelamedu, Coimbatore - 641004',
      floor: '4th Floor',
      liftAvailable: true,
      parkingAvailable: true,
      contactPerson: 'Santhosh Kumar',
      contactPhone: '+91 98765 43210'
    },
    drops: [
      {
        label: 'Drop Address',
        city: 'Chennai',
        state: 'Tamil Nadu',
        fullAddress: 'Tower B, 7th Floor, Olympia Opaline, Rajiv Gandhi Salai (OMR), Navalur, Chennai - 600130',
        floor: '7th Floor',
        liftAvailable: true,
        parkingAvailable: true,
        contactPerson: 'Santhosh Kumar',
        contactPhone: '+91 98765 43210'
      }
    ],

    quotationAmount: 18500,
    addonAmount: 2000,
    insuranceAmount: 500,
    totalAmount: 21000,
    paidAmount: 5000,
    pendingAmount: 16000,
    paymentStatus: 'Partial',

    payments: [
      {
        id: 'pay-1',
        date: '20 Sep 2026, 11:15 AM',
        title: 'Advance Slot Booking Deposit',
        amount: 5000,
        status: 'Successful',
        method: 'UPI / Google Pay (Ref: HDFC984201)',
        transactionRef: 'TXN-984210398'
      }
    ],

    inventory: [
      {
        categoryName: 'Living Room',
        items: [
          { id: 'i-1', name: '3-Seater Fabric Sofa', quantity: 1 },
          { id: 'i-2', name: '55" 4K Smart LED TV', quantity: 1 },
          { id: 'i-3', name: 'Solid Teak Center Coffee Table', quantity: 1 },
          { id: 'i-4', name: 'Floor Lamp & Carpet', quantity: 2 }
        ]
      },
      {
        categoryName: 'Bedroom',
        items: [
          { id: 'i-5', name: 'Queen Size Hydraulic Bed with Mattress', quantity: 2 },
          { id: 'i-6', name: 'Modular Engineered Wood Wardrobe', quantity: 2 },
          { id: 'i-7', name: 'Bedside Nightstands', quantity: 2 },
          { id: 'i-8', name: 'Dressing Mirror Unit', quantity: 1 }
        ]
      },
      {
        categoryName: 'Kitchen & Appliances',
        items: [
          { id: 'i-9', name: 'Double-Door Frost-Free Refrigerator (340L)', quantity: 1 },
          { id: 'i-10', name: 'Front-Load Washing Machine (7.5 Kg)', quantity: 1 },
          { id: 'i-11', name: 'Microwave Convection Oven', quantity: 1 },
          { id: 'i-12', name: 'Crockery & Utensil Cartons', quantity: 4 }
        ]
      }
    ],
    totalItemsCount: 18,

    addons: [
      { id: 'add-1', name: 'Packing', shortDesc: '3-layer heavy bubble wrap & waterproof film', price: 1800, iconName: 'Package', added: true },
      { id: 'add-3', name: 'Furniture Dismantling', shortDesc: 'Safe breakdown of modular beds and wardrobes', price: 500, iconName: 'Wrench', added: true },
      { id: 'add-5', name: 'Transit Insurance', shortDesc: 'All-risk comprehensive coverage up to ₹5,00,000', price: 500, iconName: 'ShieldCheck', added: true }
    ],

    documents: [
      { id: 'doc-1', name: 'Official Quotation Estimate', type: 'PDF', date: '20 Sep 2026', size: '240 KB' },
      { id: 'doc-2', name: 'Advance Payment Receipt (#REC-00125)', type: 'PDF', date: '20 Sep 2026', size: '180 KB' },
      { id: 'doc-3', name: 'PackerSolutions Transit Insurance Policy', type: 'PDF', date: '20 Sep 2026', size: '512 KB' },
      { id: 'doc-4', name: 'Pre-Move Consignment Form (Draft)', type: 'PDF', date: '20 Sep 2026', size: '310 KB' }
    ],

    activityLogs: [
      { id: 'act-1', timestamp: '20 Sep, 10:32 AM', title: 'Booking Created', description: 'Customer initiated household shifting request for Coimbatore to Chennai.' },
      { id: 'act-2', timestamp: '20 Sep, 10:40 AM', title: 'Inventory Submitted', description: '18 household items categorized and verified for logistics sizing.' },
      { id: 'act-3', timestamp: '20 Sep, 11:10 AM', title: 'Quotation Generated', description: 'Guaranteed fixed pricing of ₹21,000 locked with zero hidden costs.' },
      { id: 'act-4', timestamp: '20 Sep, 11:15 AM', title: '₹5,000 Advance Payment Received', description: 'Advance token confirmed via UPI transaction TXN-984210398.' },
      { id: 'act-5', timestamp: '20 Sep, 11:17 AM', title: 'Booking Confirmed', description: 'Slot locked for 28 Sep 2026 (9:00 AM – 11:00 AM).' },
      { id: 'act-6', timestamp: '20 Sep, 11:20 AM', title: 'Confirmation Sent to Customer', description: 'SMS & WhatsApp alert dispatched with booking ID #PS-2026-00125.' }
    ],

    assignedTeam: {
      leadName: 'Ramesh S.',
      leadPhone: '+91 94421 88301',
      crewCount: 4,
      verified: true
    },

    telemetry: {
      currentStage: 'Booking Confirmed',
      lastUpdated: '10 mins ago',
      vehicleNumber: 'TN 38 BK 9021',
      driverName: 'K. Murugan',
      driverPhone: '+91 94432 10987',
      driverRating: 4.9,
      currentLocation: 'Coimbatore Logistics Depot (Pre-dispatch bay)',
      eta: '28 Sep 2026, 09:00 AM',
      speedKmH: 0,
      distanceRemainingKm: 510
    }
  },

  {
    id: 'b-2',
    ticketId: 'PS-2026-00142',
    serviceType: 'Household Shifting',
    houseSize: '3 BHK',
    status: 'In Transit',
    statusCategory: 'In Progress',
    shiftingDate: '20 Sep 2026',
    timeSlot: '7:00 AM – 9:00 AM',
    createdAt: '15 Sep 2026, 02:15 PM',
    progressStage: 4, // In Transit
    
    pickup: {
      label: 'Pickup Address',
      city: 'Bangalore',
      state: 'Karnataka',
      fullAddress: '#104, Sobha Silicon Oasis, Hosa Road, Electronic City, Bangalore - 560100',
      floor: '2nd Floor',
      liftAvailable: true,
      parkingAvailable: true,
      contactPerson: 'Santhosh Kumar',
      contactPhone: '+91 98765 43210'
    },
    drops: [
      {
        label: 'Drop Address',
        city: 'Hyderabad',
        state: 'Telangana',
        fullAddress: 'Villa 18, Aparna Western Meadows, Kondapur, Hyderabad - 500084',
        floor: 'Ground Floor',
        liftAvailable: true,
        parkingAvailable: true,
        contactPerson: 'Priya Kumar',
        contactPhone: '+91 98765 43211'
      }
    ],

    quotationAmount: 31000,
    addonAmount: 3000,
    insuranceAmount: 500,
    totalAmount: 34500,
    paidAmount: 34500,
    pendingAmount: 0,
    paymentStatus: 'Paid',

    payments: [
      {
        id: 'pay-2a',
        date: '15 Sep 2026, 03:00 PM',
        title: 'Advance Booking Token',
        amount: 5000,
        status: 'Successful',
        method: 'NetBanking (HDFC)',
        transactionRef: 'TXN-773192011'
      },
      {
        id: 'pay-2b',
        date: '20 Sep 2026, 08:30 AM',
        title: 'Final Loading Clearance',
        amount: 29500,
        status: 'Successful',
        method: 'UPI AutoPay',
        transactionRef: 'TXN-773891220'
      }
    ],

    inventory: [
      {
        categoryName: 'Living Room & Electronics',
        items: [
          { id: 'i-21', name: 'L-Shape Recliner Leather Sofa', quantity: 1 },
          { id: 'i-22', name: '65" OLED TV in Wooden Reinforced Crate', quantity: 1 },
          { id: 'i-23', name: 'Bookshelf & Display Cabinet', quantity: 2 }
        ]
      },
      {
        categoryName: '3 Bedrooms',
        items: [
          { id: 'i-24', name: 'King Size Teak Bed & Memory Foam Mattress', quantity: 3 },
          { id: 'i-25', name: 'Study Desks & Ergonomic Chairs', quantity: 2 },
          { id: 'i-26', name: 'Wardrobes Dismantled & Bubble Wrapped', quantity: 3 }
        ]
      },
      {
        categoryName: 'Kitchen & Utility',
        items: [
          { id: 'i-27', name: 'Side-by-Side 570L Smart Refrigerator', quantity: 1 },
          { id: 'i-28', name: 'Front Load Washer & Dryer Set', quantity: 2 },
          { id: 'i-29', name: 'Pre-Packaged Kitchen Essentials Cartons', quantity: 8 }
        ]
      }
    ],
    totalItemsCount: 26,

    addons: [
      { id: 'add-1', name: 'Packing', shortDesc: 'Premium 3-layer protective wrapping', price: 1800, iconName: 'Package', added: true },
      { id: 'add-3', name: 'Furniture Dismantling', shortDesc: 'Teak beds & study unit breakdown', price: 500, iconName: 'Wrench', added: true },
      { id: 'add-4', name: 'Furniture Assembly', shortDesc: 'Full setup at Hyderabad destination', price: 600, iconName: 'Hammer', added: true }
    ],

    documents: [
      { id: 'doc-21', name: 'Complete Tax Invoice #INV-2026-00142', type: 'PDF', date: '20 Sep 2026', size: '340 KB' },
      { id: 'doc-22', name: 'Full Payment Receipt (₹34,500 Paid)', type: 'PDF', date: '20 Sep 2026', size: '195 KB' },
      { id: 'doc-23', name: 'Electronic Consignment Note / Bilty (LR #BL-9921)', type: 'PDF', date: '20 Sep 2026', size: '420 KB' },
      { id: 'doc-24', name: 'Driver Physical Inspection Checklist', type: 'PDF', date: '20 Sep 2026', size: '280 KB' }
    ],

    activityLogs: [
      { id: 'act-21', timestamp: 'Today, 06:45 AM', title: 'Crew Reached Electronic City', description: 'Driver Murugan & team checked in at Bangalore residence.' },
      { id: 'act-22', timestamp: 'Today, 08:30 AM', title: 'Loading & GPS Tamper Seal Locked', description: 'Cargo door secured with OTP security seal #PS-88190.' },
      { id: 'act-23', timestamp: 'Today, 09:10 AM', title: 'Vehicle Departed Bangalore Toll', description: 'Container truck en route via NH 44 Expressway towards Hyderabad.' },
      { id: 'act-24', timestamp: '12 minutes ago', title: 'Kurnool Bypass Checkpoint Cleared', description: 'Smooth transit at 62 km/h. On-time delivery anticipated.' }
    ],

    assignedTeam: {
      leadName: 'K. Murugan',
      leadPhone: '+91 94432 10987',
      crewCount: 4,
      verified: true
    },

    telemetry: {
      currentStage: 'In Transit',
      lastUpdated: '12 minutes ago',
      vehicleNumber: 'TN 38 BK 9021',
      driverName: 'K. Murugan',
      driverPhone: '+91 94432 10987',
      driverRating: 4.9,
      currentLocation: 'NH 44 Expressway near Kurnool Bypass Hub',
      eta: 'Today, 06:30 PM',
      speedKmH: 62,
      distanceRemainingKm: 210
    }
  },

  {
    id: 'b-3',
    ticketId: 'PS-2026-00098',
    serviceType: 'Household Shifting',
    houseSize: '1 BHK',
    status: 'Delivered',
    statusCategory: 'Completed',
    shiftingDate: '12 Sep 2026',
    timeSlot: '10:00 AM – 12:00 PM',
    createdAt: '05 Sep 2026, 11:20 AM',
    progressStage: 5, // Delivered
    
    pickup: {
      label: 'Pickup Address',
      city: 'Mumbai',
      state: 'Maharashtra',
      fullAddress: 'Flat 603, Sai Krupa Heights, Link Road, Andheri West, Mumbai - 400053',
      floor: '6th Floor',
      liftAvailable: true,
      parkingAvailable: false,
      contactPerson: 'Santhosh Kumar',
      contactPhone: '+91 98765 43210'
    },
    drops: [
      {
        label: 'Drop Address',
        city: 'Pune',
        state: 'Maharashtra',
        fullAddress: 'Building C, Magarpatta City, Hadapsar, Pune - 411028',
        floor: '3rd Floor',
        liftAvailable: true,
        parkingAvailable: true,
        contactPerson: 'Santhosh Kumar',
        contactPhone: '+91 98765 43210'
      }
    ],

    quotationAmount: 12500,
    addonAmount: 1200,
    insuranceAmount: 500,
    totalAmount: 14200,
    paidAmount: 14200,
    pendingAmount: 0,
    paymentStatus: 'Paid',

    payments: [
      {
        id: 'pay-3',
        date: '12 Sep 2026, 04:30 PM',
        title: 'Full Settlement & Handover',
        amount: 14200,
        status: 'Successful',
        method: 'Credit Card (Axis Bank)',
        transactionRef: 'TXN-66190284'
      }
    ],

    inventory: [
      {
        categoryName: 'All Household Items',
        items: [
          { id: 'i-31', name: 'Queen Wooden Bed', quantity: 1 },
          { id: 'i-32', name: 'Wardrobe & Study Chair', quantity: 2 },
          { id: 'i-33', name: 'Single Door Fridge (190L)', quantity: 1 },
          { id: 'i-34', name: 'Packaged Household Boxes', quantity: 7 }
        ]
      }
    ],
    totalItemsCount: 11,

    addons: [
      { id: 'add-1', name: 'Packing', shortDesc: 'Standard bubble packaging', price: 1200, iconName: 'Package', added: true }
    ],

    documents: [
      { id: 'doc-31', name: 'Signed Delivery Proof & Acceptance', type: 'PDF', date: '12 Sep 2026', size: '480 KB' },
      { id: 'doc-32', name: 'Tax Invoice #INV-2026-00098', type: 'PDF', date: '12 Sep 2026', size: '210 KB' }
    ],

    activityLogs: [
      { id: 'act-31', timestamp: '12 Sep, 05:15 PM', title: 'Delivered & Handed Over', description: 'Customer confirmed complete undamaged receipt of all 11 items.' },
      { id: 'act-32', timestamp: '12 Sep, 05:30 PM', title: '5-Star Rating Received', description: 'Customer rated driver Suresh V. 5/5 for on-time delivery.' }
    ],

    assignedTeam: {
      leadName: 'Suresh V.',
      leadPhone: '+91 98220 19283',
      crewCount: 3,
      verified: true
    }
  },

  {
    id: 'b-4',
    ticketId: 'PS-2026-00076',
    serviceType: 'Household Shifting',
    houseSize: '2 BHK',
    status: 'Delivered',
    statusCategory: 'Completed',
    shiftingDate: '28 Aug 2026',
    timeSlot: '8:00 AM – 10:00 AM',
    createdAt: '22 Aug 2026, 09:00 AM',
    progressStage: 5, // Delivered
    
    pickup: {
      label: 'Pickup Address',
      city: 'Delhi',
      state: 'Delhi NCR',
      fullAddress: 'Pocket B, Mayur Vihar Phase 2, New Delhi - 110091',
      floor: '1st Floor',
      liftAvailable: false,
      parkingAvailable: true,
      contactPerson: 'Santhosh Kumar',
      contactPhone: '+91 98765 43210'
    },
    drops: [
      {
        label: 'Drop Address',
        city: 'Gurgaon',
        state: 'Haryana',
        fullAddress: 'Tower 4, Sector 54, Golf Course Road, Gurgaon - 122002',
        floor: '12th Floor',
        liftAvailable: true,
        parkingAvailable: true,
        contactPerson: 'Santhosh Kumar',
        contactPhone: '+91 98765 43210'
      }
    ],

    quotationAmount: 8800,
    addonAmount: 500,
    insuranceAmount: 500,
    totalAmount: 9800,
    paidAmount: 9800,
    pendingAmount: 0,
    paymentStatus: 'Paid',

    payments: [
      {
        id: 'pay-4',
        date: '28 Aug 2026, 02:00 PM',
        title: 'Full Move Clearance',
        amount: 9800,
        status: 'Successful',
        method: 'UPI / PhonePe',
        transactionRef: 'TXN-55419011'
      }
    ],

    inventory: [
      {
        categoryName: 'Living & Bedroom',
        items: [
          { id: 'i-41', name: '2 BHK Core Furniture Set', quantity: 8 },
          { id: 'i-42', name: 'Television & Soundbar', quantity: 2 },
          { id: 'i-43', name: 'Heavy Kitchen Ware Cartons', quantity: 5 }
        ]
      }
    ],
    totalItemsCount: 15,

    addons: [
      { id: 'add-5', name: 'Transit Insurance', shortDesc: 'Accidental transit protection', price: 500, iconName: 'ShieldCheck', added: true }
    ],

    documents: [
      { id: 'doc-41', name: 'Final Delivery Receipt #DEL-00076', type: 'PDF', date: '28 Aug 2026', size: '180 KB' },
      { id: 'doc-42', name: 'Tax Invoice #INV-2026-00076', type: 'PDF', date: '28 Aug 2026', size: '215 KB' }
    ],

    activityLogs: [
      { id: 'act-41', timestamp: '28 Aug, 02:30 PM', title: 'Delivery Completed', description: 'Cargo safely placed and assembled on the 12th floor.' }
    ]
  },

  {
    id: 'b-5',
    ticketId: 'PS-2026-00055',
    serviceType: 'Household Shifting',
    houseSize: '1 BHK',
    status: 'Cancelled',
    statusCategory: 'Cancelled',
    shiftingDate: '15 Aug 2026',
    timeSlot: '9:00 AM – 11:00 AM',
    createdAt: '10 Aug 2026, 04:00 PM',
    progressStage: 0,
    
    pickup: {
      label: 'Pickup Address',
      city: 'Jaipur',
      state: 'Rajasthan',
      fullAddress: 'C-Scheme, Ashok Nagar, Jaipur - 302001',
      floor: '2nd Floor',
      liftAvailable: true,
      parkingAvailable: true,
      contactPerson: 'Santhosh Kumar',
      contactPhone: '+91 98765 43210'
    },
    drops: [
      {
        label: 'Drop Address',
        city: 'Ahmedabad',
        state: 'Gujarat',
        fullAddress: 'Satellite, SG Highway, Ahmedabad - 380015',
        floor: '4th Floor',
        liftAvailable: true,
        parkingAvailable: true,
        contactPerson: 'Santhosh Kumar',
        contactPhone: '+91 98765 43210'
      }
    ],

    quotationAmount: 16000,
    addonAmount: 0,
    insuranceAmount: 0,
    totalAmount: 16000,
    paidAmount: 0,
    pendingAmount: 0,
    paymentStatus: 'Payment Pending',

    payments: [
      {
        id: 'pay-5',
        date: '11 Aug 2026, 10:00 AM',
        title: 'Full 100% Refund Issued',
        amount: 2000,
        status: 'Successful',
        method: 'Refund to Original UPI Account',
        transactionRef: 'REF-88319022'
      }
    ],

    inventory: [],
    totalItemsCount: 0,
    addons: [],
    documents: [
      { id: 'doc-51', name: 'Cancellation & 100% Refund Certificate', type: 'PDF', date: '11 Aug 2026', size: '150 KB' }
    ],

    activityLogs: [
      { id: 'act-51', timestamp: '11 Aug, 09:30 AM', title: 'Booking Cancelled by Customer', description: 'Customer cancelled move due to date rescheduling. 100% token refund processed.' }
    ]
  }
];
