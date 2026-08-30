export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  popular?: boolean;
  tags?: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'all',
    name: 'All Questions',
    iconName: 'HelpCircle',
    description: 'Browse all frequently asked questions across our services'
  },
  {
    id: 'general',
    name: 'General',
    iconName: 'Info',
    description: 'General questions about Packersolution services and operations'
  },
  {
    id: 'packers-and-movers',
    name: 'Packers & Movers',
    iconName: 'Package',
    description: 'End-to-end relocation and shifting service queries'
  },
  {
    id: 'household-shifting',
    name: 'Household Shifting',
    iconName: 'Home',
    description: '1 BHK, 2 BHK, 3 BHK, and villa home shifting solutions'
  },
  {
    id: 'office-shifting',
    name: 'Office Shifting',
    iconName: 'Briefcase',
    description: 'Corporate, IT equipment, server, and workspace relocation'
  },
  {
    id: 'vehicle-transportation',
    name: 'Vehicle Transportation',
    iconName: 'Car',
    description: 'Bike, scooter, and car carrier transport between cities'
  },
  {
    id: 'packing-unpacking',
    name: 'Packing & Unpacking',
    iconName: 'Layers',
    description: 'Multi-layer packing materials, boxes, and unpacking assistance'
  },
  {
    id: 'loading-unloading',
    name: 'Loading & Unloading',
    iconName: 'Truck',
    description: 'Skilled labour, hydraulic lifters, and floor-to-floor handling'
  },
  {
    id: 'warehouse-storage',
    name: 'Warehouse & Storage',
    iconName: 'Warehouse',
    description: 'Short-term and long-term secure warehousing and storage units'
  },
  {
    id: 'pricing-payment',
    name: 'Pricing & Payment',
    iconName: 'CreditCard',
    description: 'Cost calculation, payment methods, GST invoices, and quotes'
  },
  {
    id: 'insurance-safety',
    name: 'Insurance & Safety',
    iconName: 'ShieldCheck',
    description: 'Transit insurance coverage, safety protocols, and claims'
  },
  {
    id: 'booking-cancellation',
    name: 'Booking & Cancellation',
    iconName: 'CalendarCheck',
    description: 'Booking procedures, date changes, and cancellation policies'
  }
];

export const FAQS_DATA: FAQ[] = [
  // 1. General
  {
    id: 'faq-gen-1',
    category: 'general',
    question: 'How do I book a Packers & Movers service with Packersolution?',
    answer: 'Booking a move with Packersolution is fast and simple: 1) Select your service (Home Shifting, Office Relocation, Vehicle Transport, or Storage). 2) Enter your pickup and delivery locations along with your preferred shifting date. 3) Choose your inventory or home size to receive an instant transparent price estimate. 4) Confirm your slot with a minimal token advance. Our move coordinator will contact you immediately to assign a dedicated crew and vehicle.',
    popular: true,
    tags: ['booking', 'how to book', 'packers and movers', 'process']
  },
  {
    id: 'faq-gen-2',
    category: 'general',
    question: 'Do you provide a free moving estimate?',
    answer: 'Yes, 100% free! You can generate an instant free quote through our online estimate calculator in under 60 seconds, or request a complimentary physical or video pre-move survey for large 3+ BHK homes and corporate office relocations.',
    popular: true,
    tags: ['free quote', 'estimate', 'cost', 'survey']
  },
  {
    id: 'faq-gen-3',
    category: 'general',
    question: 'Do you provide interstate and intercity relocation across India?',
    answer: 'Yes. Packersolution operates an extensive nationwide logistics network covering over 100+ cities including Coimbatore, Chennai, Bangalore, Hyderabad, Mumbai, Delhi NCR, Pune, and Kolkata with verified container trucks and dedicated GPS tracking.',
    popular: true,
    tags: ['intercity', 'interstate', 'long distance', 'pan india', 'coimbatore', 'chennai']
  },
  {
    id: 'faq-gen-4',
    category: 'general',
    question: 'Can I track my shipment during transit?',
    answer: 'Yes! All Packersolution dedicated moving trucks and intercity consignments are equipped with real-time GPS tracking. You receive automated SMS and WhatsApp milestone alerts from pickup, highway checkpoints, city hub arrival, to final doorstep delivery.',
    popular: false,
    tags: ['tracking', 'gps', 'live tracking', 'status']
  },
  {
    id: 'faq-gen-5',
    category: 'general',
    question: 'What are your operating working hours and support timings?',
    answer: 'Our shifting crews and transportation operations run 24 hours a day, 7 days a week, including weekends and public holidays. Our customer support helpline (+91 95009-55237) is active from 7:00 AM to 11:00 PM daily for instant assistance.',
    popular: false,
    tags: ['timings', 'support', 'contact', 'hours']
  },

  // 2. Packers & Movers
  {
    id: 'faq-pm-1',
    category: 'packers-and-movers',
    question: 'What makes Packersolution different from other local moving companies?',
    answer: 'Packersolution provides professional corporate standards with guaranteed zero hidden charges, multi-layer premium packing (corrugated sheets, bubble wrap, foam, waterproof stretch film), verified background-checked staff, guaranteed transit insurance, and dedicated GPS-monitored sealed container vehicles.',
    popular: false,
    tags: ['packers and movers', 'advantages', 'quality', 'safety']
  },
  {
    id: 'faq-pm-2',
    category: 'packers-and-movers',
    question: 'How early should I book a moving service?',
    answer: 'For local city shifting within Coimbatore, Chennai, or Bangalore, we recommend booking 24 to 48 hours in advance. For intercity/interstate relocation, booking 3 to 5 days in advance guarantees your preferred container size, experienced supervisor, and convenient morning moving slot.',
    popular: true,
    tags: ['how early', 'booking advance', 'time frame', 'slot']
  },
  {
    id: 'faq-pm-3',
    category: 'packers-and-movers',
    question: 'What items cannot be transported by Packers & Movers?',
    answer: 'For safety and legal compliance, we cannot transport hazardous substances, flammable materials (petrol, diesel, kerosene, fireworks), gas cylinders with gas, open chemical bottles, perishable cooked food items, valuable jewelry, cash, and original legal documents. We advise customers to carry valuables and important certificates personally.',
    popular: false,
    tags: ['restricted items', 'hazardous', 'forbidden', 'jewelry', 'safety']
  },
  {
    id: 'faq-pm-4',
    category: 'packers-and-movers',
    question: 'Do you provide dismantling and reassembly of furniture?',
    answer: 'Yes! Our trained technicians dismantle standard beds (king/queen with storage), dining tables, modular wardrobes, and study desks at the pickup location, pack them with edge protectors, and reassemble them securely in your new home at no extra charge.',
    popular: false,
    tags: ['furniture dismantling', 'bed reassembly', 'carpenter', 'assembly']
  },

  // 3. Household Shifting
  {
    id: 'faq-house-1',
    category: 'household-shifting',
    question: 'How long does a local household shifting take?',
    answer: 'A standard local household shift within the same city typically takes: 1 RK / 1 BHK: 3 to 5 hours; 2 BHK: 4 to 6 hours; 3 BHK / Villa: 6 to 9 hours. Our team works continuously without unnecessary breaks to ensure you settle into your new home on the same day.',
    popular: false,
    tags: ['house shifting duration', '1bhk', '2bhk', '3bhk', 'local shifting']
  },
  {
    id: 'faq-house-2',
    category: 'household-shifting',
    question: 'How do you protect fragile items like glassware, TVs, and crockery?',
    answer: 'We follow a specialized 4-layer fragile packaging protocol: 1) High-density bubble wrap. 2) Soft foam padding sheets. 3) Heavy-duty 5-ply corrugated cardboard boxes with partition dividers. 4) Waterproof stretch film with prominent "FRAGILE / HANDLE WITH CARE" bright warning labels. For large OLED/QLED TVs, we use customized wooden crates or heavy-duty TV flight boxes.',
    popular: true,
    tags: ['fragile packing', 'crockery', 'tv packing', 'glassware', 'bubble wrap']
  },
  {
    id: 'faq-house-3',
    category: 'household-shifting',
    question: 'Do I need to empty my refrigerator and washing machine before shifting?',
    answer: 'Yes. Please defrost and empty your refrigerator at least 4 to 6 hours before shifting to prevent water leakage during transit. Washing machines must be drained completely, and drum transit bolts should be secured where applicable.',
    popular: false,
    tags: ['appliances', 'fridge defrost', 'washing machine', 'preparation']
  },

  // 4. Office Shifting
  {
    id: 'faq-office-1',
    category: 'office-shifting',
    question: 'Can I book office shifting services with zero business downtime?',
    answer: 'Yes! We specialize in weekend and overnight office relocations. Over 80% of our corporate shifting in Coimbatore, Chennai, and Bangalore is scheduled on Friday evenings or Saturdays, allowing your IT systems and workstations to be fully operational by Monday morning.',
    popular: false,
    tags: ['office shifting', 'corporate relocation', 'zero downtime', 'weekend shifting']
  },
  {
    id: 'faq-office-2',
    category: 'office-shifting',
    question: 'How do you handle sensitive IT equipment, servers, and office records?',
    answer: 'Our trained corporate moving squad uses anti-static bubble wrap, padded server transit crates, color-coded tagging for departmental workstations, and serialized security seals on filing boxes to maintain strict confidentiality and inventory control.',
    popular: false,
    tags: ['it equipment', 'server racks', 'confidential records', 'workstations']
  },

  // 5. Vehicle Transportation
  {
    id: 'faq-veh-1',
    category: 'vehicle-transportation',
    question: 'Do you provide vehicle transportation for bikes and cars?',
    answer: 'Yes, Packersolution provides door-to-door two-wheeler (scooters, superbikes) and four-wheeler (hatchbacks, sedans, SUVs, luxury cars) transportation across India using enclosed car carriers and specialized bike hydraulic ramp trucks.',
    popular: true,
    tags: ['vehicle transport', 'car carrier', 'bike shifting', 'intercity car transport']
  },
  {
    id: 'faq-veh-2',
    category: 'vehicle-transportation',
    question: 'Can I move my bike or car to another city? What documents are needed?',
    answer: 'Yes. To transport your vehicle, you will need to provide: 1) Copy of Vehicle RC (Registration Certificate), 2) Valid Insurance policy copy, 3) Valid PUC (Pollution Certificate), 4) Owner ID proof (Aadhaar or Driving License). Please keep fuel level at approximately 15-20% (reserve mark) for transport safety.',
    popular: true,
    tags: ['documents for vehicle transport', 'rc copy', 'car shifting', 'bike courier']
  },
  {
    id: 'faq-veh-3',
    category: 'vehicle-transportation',
    question: 'How is my car or bike protected against scratches during transport?',
    answer: 'Bikes are packed using corrugated sheets, bubble wrap around mirrors and indicators, and strapped with high-tensile ratchet tie-downs inside the truck. Cars are loaded on covered car carrier trailers with wheel-locking chocks and inspected before and after with a pre-transit condition sheet.',
    popular: false,
    tags: ['scratch protection', 'car trailer', 'tie downs', 'inspection sheet']
  },

  // 6. Packing & Unpacking
  {
    id: 'faq-pack-1',
    category: 'packing-unpacking',
    question: 'Do you provide packing materials, or do I need to arrange boxes?',
    answer: 'Packersolution provides all required packing supplies as part of our full-service package. We bring heavy-duty 5-ply cartons, bubble wrap rolls, corrugated sheets, thermocol sheets, stretch wrap, high-strength adhesive tapes, foam sheets, and mattress protection bags.',
    popular: true,
    tags: ['packing materials', 'boxes', 'cartons', 'bubble wrap', 'supplies']
  },
  {
    id: 'faq-pack-2',
    category: 'packing-unpacking',
    question: 'Do you pack and unpack household items at the destination?',
    answer: 'Yes! Our full-service shifting package includes complete packing at your origin address, careful loading, transit, safe unloading, and unpacking of all major furniture and boxes into your designated rooms at the destination.',
    popular: true,
    tags: ['unpacking', 'full service', 'room placement', 'household items']
  },
  {
    id: 'faq-pack-3',
    category: 'packing-unpacking',
    question: 'Can I choose to do my own packing and only hire your truck & loading crew?',
    answer: 'Yes, we offer flexible service options! You can opt for "Transport Only", "Loading + Transport", or "Complete End-to-End Packing & Moving" depending on your budget and preference.',
    popular: false,
    tags: ['self packing', 'transport only', 'customized package', 'budget shifting']
  },

  // 7. Loading & Unloading
  {
    id: 'faq-load-1',
    category: 'loading-unloading',
    question: 'Do you provide loading and unloading services if my building has no elevator/lift?',
    answer: 'Yes. Our experienced loaders are trained in staircase navigation and heavy lifting techniques. When booking, simply specify your floor number and lift availability so we can allocate sufficient crew members and specialized lifting belts.',
    popular: false,
    tags: ['loading unloading', 'no lift', 'stairs', 'floor charges', 'labour']
  },
  {
    id: 'faq-load-2',
    category: 'loading-unloading',
    question: 'Are your loaders and drivers background verified and trained?',
    answer: 'Yes, 100%. Every crew member undergoes police verification, Aadhaar KYC verification, and rigorous hands-on training in handling heavy appliances, electronics, delicate antiques, and furniture safety.',
    popular: false,
    tags: ['background verified', 'trained staff', 'police verification', 'safety']
  },

  // 8. Warehouse & Storage
  {
    id: 'faq-store-1',
    category: 'warehouse-storage',
    question: 'Do you provide warehouse storage facilities?',
    answer: 'Yes. Packersolution manages modern, clean, pest-controlled, and 24/7 CCTV-monitored warehouse facilities in Coimbatore, Chennai, Bangalore, and major metropolitan hubs for household goods, commercial stock, and vehicle storage.',
    popular: true,
    tags: ['warehouse', 'storage', 'household storage', 'coimbatore warehouse']
  },
  {
    id: 'faq-store-2',
    category: 'warehouse-storage',
    question: 'How long can I store my belongings in your warehouse?',
    answer: 'You can store your belongings for as short as 7 days or as long as several years. We offer flexible daily, monthly, quarterly, and annual storage rental plans with secure pallet storage and individual wooden vaults.',
    popular: true,
    tags: ['storage duration', 'monthly storage', 'flexible warehouse', 'rent']
  },
  {
    id: 'faq-store-3',
    category: 'warehouse-storage',
    question: 'How is security and moisture protection managed in the warehouse?',
    answer: 'Our storage facilities feature 24/7 manned security, multi-angle HD CCTV surveillance, fire-retardant systems, periodic pest control treatments, elevated wooden pallets, and waterproof shrink-wrapped industrial protection on every item.',
    popular: false,
    tags: ['warehouse security', 'cctv', 'pest control', 'moisture protection']
  },

  // 9. Pricing & Payment
  {
    id: 'faq-price-1',
    category: 'pricing-payment',
    question: 'How much does Packers & Movers service cost?',
    answer: 'Local shifting costs typically range from ₹2,499 to ₹4,999 for 1 BHK, ₹4,499 to ₹8,999 for 2 BHK, and ₹7,999 to ₹14,999 for 3 BHK homes depending on distance, volume of items, and packing materials required. Intercity moves are calculated based on route distance and container truck size.',
    popular: true,
    tags: ['cost', 'pricing', 'how much', '1bhk price', '2bhk price', 'rates']
  },
  {
    id: 'faq-price-2',
    category: 'pricing-payment',
    question: 'How is the moving cost calculated?',
    answer: 'Our pricing is calculated transparently using 5 factors: 1) Total volume/weight of goods, 2) Transit distance between locations, 3) Level of packing required (Standard vs. Premium 4-layer), 4) Floor level and elevator availability at both locations, 5) Optional value-added services (vehicle carrier, appliance installation, insurance).',
    popular: true,
    tags: ['cost calculation', 'pricing factors', 'distance', 'rates']
  },
  {
    id: 'faq-price-3',
    category: 'pricing-payment',
    question: 'Do you provide official GST invoices for company relocation claims?',
    answer: 'Yes! Packersolution is a registered corporate logistics enterprise. We provide 100% compliant 18% GST invoices, lorry receipts (LR / Bilty), money receipts, and itemized packing lists required for employer or defense relocation allowance reimbursement claims.',
    popular: true,
    tags: ['gst invoice', 'company claim', 'tax invoice', 'reimbursement', 'bills']
  },
  {
    id: 'faq-price-4',
    category: 'pricing-payment',
    question: 'What payment methods are accepted?',
    answer: 'We accept all secure payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, and Bank NEFT/IMPS transfers. Invoices can be settled directly online with instant receipt generation.',
    popular: false,
    tags: ['payment methods', 'upi', 'gpay', 'credit card', 'net banking']
  },
  {
    id: 'faq-price-5',
    category: 'pricing-payment',
    question: 'Are there any hidden costs or surprise charges added on moving day?',
    answer: 'No. We follow a strict Zero Hidden Charges policy. Once your inventory and scope are finalized in the written quotation, your price is guaranteed. Minor adjustments only apply if you add extra heavy furniture or change the destination address.',
    popular: false,
    tags: ['hidden costs', 'surprise charges', 'transparency', 'fixed price']
  },

  // 10. Insurance & Safety
  {
    id: 'faq-ins-1',
    category: 'insurance-safety',
    question: 'Is my household goods movement insured?',
    answer: 'Yes. We offer comprehensive Transit Insurance and All-Risk Insurance through licensed national insurance partners. Transit insurance covers damages due to road accidents, fire, collision, or overturn during transit for total financial peace of mind.',
    popular: true,
    tags: ['transit insurance', 'damage protection', 'coverage', 'safety']
  },
  {
    id: 'faq-ins-2',
    category: 'insurance-safety',
    question: 'How do I file an insurance claim if an item gets damaged?',
    answer: 'In the rare event of damage, note the item on the delivery receipt and notify our claims support within 48 hours with clear photos and your booking ticket ID. Our dedicated claims officer will process the assessment and settlement swiftly.',
    popular: false,
    tags: ['insurance claim', 'damage report', 'settlement', 'compensation']
  },

  // 11. Booking & Cancellation
  {
    id: 'faq-book-1',
    category: 'booking-cancellation',
    question: 'Can I change or reschedule my shifting date after booking?',
    answer: 'Yes! We understand that moving schedules can change. You can reschedule your shifting date free of cost by informing our team at least 24 hours before your scheduled pickup time.',
    popular: true,
    tags: ['reschedule', 'change date', 'postpone move', 'flexibility']
  },
  {
    id: 'faq-book-2',
    category: 'booking-cancellation',
    question: 'What happens if I cancel my booking? Is the advance refundable?',
    answer: 'If you cancel your booking more than 24 hours prior to the scheduled pickup slot, 100% of your advance booking amount is refunded to your original payment method within 2-3 business days without cancellation penalties.',
    popular: true,
    tags: ['cancellation policy', 'refund', 'advance money', 'cancel booking']
  }
];

export const POPULAR_FAQ_IDS = [
  'faq-price-1',
  'faq-gen-1',
  'faq-gen-2',
  'faq-pack-1',
  'faq-veh-1',
  'faq-store-1'
];
