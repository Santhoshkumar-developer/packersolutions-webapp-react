import { UserAddress, LocationSearchResult, ServiceTagType } from '../types';

export const INITIAL_MOCK_SAVED_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-demo-1',
    label: 'Home',
    flatBuilding: 'Flat 402, Green Glen Heights, Block B',
    streetLocality: 'Outer Ring Road, Bellandur',
    landmark: 'Opposite Central Mall',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560103',
    contactName: 'Rahul Sharma',
    contactPhone: '9876543210',
    formattedAddress: 'Flat 402, Green Glen Heights, Block B, Outer Ring Road, Bellandur, Bangalore, Karnataka - 560103',
    serviceTags: ['household-shifting', 'parcel-courier', 'vehicle-transportation'],
    isDefault: true,
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
    placeId: 'mock-blr-bellandur-1'
  },
  {
    id: 'addr-demo-2',
    label: 'Office',
    flatBuilding: '8th Floor, Tower C, RMZ Ecospace',
    streetLocality: 'Sarjapur Outer Ring Road, Devarabisanahalli',
    landmark: 'Near Shell Petrol Bunk',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560103',
    contactName: 'Rahul Sharma (Admin)',
    contactPhone: '9876543210',
    formattedAddress: '8th Floor, Tower C, RMZ Ecospace, Sarjapur Outer Ring Road, Devarabisanahalli, Bangalore, Karnataka - 560103',
    serviceTags: ['office-shifting', 'truck-booking', 'parcel-courier', 'warehousing-storage'],
    isDefault: false,
    createdAt: '2026-08-05T14:30:00.000Z',
    updatedAt: '2026-08-05T14:30:00.000Z',
    placeId: 'mock-blr-ecospace-2'
  },
  {
    id: 'addr-demo-3',
    label: 'Warehouse',
    flatBuilding: 'Plot No. 45 & 46, Logistics Hub',
    streetLocality: 'Peenya Industrial Area, 2nd Stage',
    landmark: 'Behind TVS Showroom',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560058',
    contactName: 'Suresh Kumar (Logistics Mgr)',
    contactPhone: '9876543210',
    formattedAddress: 'Plot No. 45 & 46, Logistics Hub, Peenya Industrial Area, 2nd Stage, Bangalore, Karnataka - 560058',
    serviceTags: ['warehousing-storage', 'truck-booking', 'loading-unloading'],
    isDefault: false,
    createdAt: '2026-08-10T09:15:00.000Z',
    updatedAt: '2026-08-10T09:15:00.000Z',
    placeId: 'mock-blr-peenya-3'
  },
  {
    id: 'addr-demo-4',
    label: 'Home',
    flatBuilding: 'Door No. 12/4, Lakshmi Nivas',
    streetLocality: 'DB Road, RS Puram West',
    landmark: 'Near Annapoorna Hotel',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641002',
    contactName: 'Manikandan S.',
    contactPhone: '9876543210',
    formattedAddress: 'Door No. 12/4, Lakshmi Nivas, DB Road, RS Puram West, Coimbatore, Tamil Nadu - 641002',
    serviceTags: ['household-shifting', 'vehicle-transportation', 'parcel-courier'],
    isDefault: false,
    createdAt: '2026-08-12T11:00:00.000Z',
    updatedAt: '2026-08-12T11:00:00.000Z',
    placeId: 'mock-cbe-rspuram-4'
  },
  {
    id: 'addr-demo-5',
    label: 'Shop',
    flatBuilding: 'Shop 18, Commercial Plaza',
    streetLocality: 'Cross Cut Road, Gandhipuram',
    landmark: 'Opposite City Bus Stand',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641012',
    contactName: 'Manikandan (Store)',
    contactPhone: '9876543210',
    formattedAddress: 'Shop 18, Commercial Plaza, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu - 641012',
    serviceTags: ['parcel-courier', 'truck-booking', 'office-shifting'],
    isDefault: false,
    createdAt: '2026-08-15T16:20:00.000Z',
    updatedAt: '2026-08-15T16:20:00.000Z',
    placeId: 'mock-cbe-gandhipuram-5'
  },
  {
    id: 'addr-demo-6',
    label: 'Home',
    flatBuilding: 'No. 24, 2nd Avenue, Shanthi Colony',
    streetLocality: 'Anna Nagar West',
    landmark: 'Near Roundtana Metro Station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    contactName: 'Priya Patel',
    contactPhone: '9999999999',
    formattedAddress: 'No. 24, 2nd Avenue, Shanthi Colony, Anna Nagar West, Chennai, Tamil Nadu - 600040',
    serviceTags: ['household-shifting', 'packing-unpacking'],
    isDefault: true,
    createdAt: '2026-08-18T10:00:00.000Z',
    updatedAt: '2026-08-18T10:00:00.000Z',
    placeId: 'mock-chn-annanagar-6'
  }
];

export const MOCK_LOCALITIES_DATABASE: LocationSearchResult[] = [
  // Bangalore
  {
    id: 'blr-indiranagar',
    title: 'Indiranagar 100ft Road',
    subtitle: '12th Main Road, HAL 2nd Stage, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    area: 'Indiranagar',
    fullAddress: '100ft Road, 12th Main Road, HAL 2nd Stage, Indiranagar, Bangalore, Karnataka - 560038',
    placeId: 'place-blr-indiranagar'
  },
  {
    id: 'blr-koramangala',
    title: 'Koramangala 4th Block',
    subtitle: '80 Feet Road, Sony World Junction, Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560034',
    area: 'Koramangala',
    fullAddress: '80 Feet Road, Near Sony World Signal, Koramangala 4th Block, Bangalore, Karnataka - 560034',
    placeId: 'place-blr-koramangala'
  },
  {
    id: 'blr-hsr',
    title: 'HSR Layout Sector 1',
    subtitle: '27th Main Road, Near Agara Lake, HSR Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102',
    area: 'HSR Layout',
    fullAddress: '27th Main Road, Sector 1, HSR Layout, Bangalore, Karnataka - 560102',
    placeId: 'place-blr-hsr'
  },
  {
    id: 'blr-whitefield',
    title: 'Whitefield Main Road',
    subtitle: 'ITPL Main Road, Near Hope Farm Junction, Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    area: 'Whitefield',
    fullAddress: 'ITPL Main Road, Hope Farm Junction, Whitefield, Bangalore, Karnataka - 560066',
    placeId: 'place-blr-whitefield'
  },
  {
    id: 'blr-bellandur',
    title: 'Bellandur Outer Ring Road',
    subtitle: 'Green Glen Layout, Bellandur',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560103',
    area: 'Bellandur',
    fullAddress: 'Green Glen Layout, Outer Ring Road, Bellandur, Bangalore, Karnataka - 560103',
    placeId: 'place-blr-bellandur'
  },
  {
    id: 'blr-electronic-city',
    title: 'Electronic City Phase 1',
    subtitle: 'Hosur Road, Near Wipro Gate 5, Electronic City',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560100',
    area: 'Electronic City',
    fullAddress: 'Hosur Main Road, Electronic City Phase 1, Bangalore, Karnataka - 560100',
    placeId: 'place-blr-ecity'
  },
  {
    id: 'blr-jayanagar',
    title: 'Jayanagar 4th Block',
    subtitle: '11th Main Road, Near Jayanagar Shopping Complex',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560011',
    area: 'Jayanagar',
    fullAddress: '11th Main Road, 4th Block, Jayanagar, Bangalore, Karnataka - 560011',
    placeId: 'place-blr-jayanagar'
  },
  {
    id: 'blr-marathahalli',
    title: 'Marathahalli Bridge',
    subtitle: 'Varthur Main Road, Near KLM Fashion Mall, Marathahalli',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560037',
    area: 'Marathahalli',
    fullAddress: 'Varthur Main Road, Near Bridge, Marathahalli, Bangalore, Karnataka - 560037',
    placeId: 'place-blr-marathahalli'
  },

  // Coimbatore
  {
    id: 'cbe-gandhipuram',
    title: 'Gandhipuram Central',
    subtitle: 'Cross Cut Road, 7th Street, Gandhipuram',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641012',
    area: 'Gandhipuram',
    fullAddress: 'Cross Cut Road, 7th Street, Gandhipuram, Coimbatore, Tamil Nadu - 641012',
    placeId: 'place-cbe-gandhipuram'
  },
  {
    id: 'cbe-rspuram',
    title: 'RS Puram West',
    subtitle: 'Diwan Bahadur (DB) Road, Near Post Office, RS Puram',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641002',
    area: 'RS Puram',
    fullAddress: 'DB Road, Near Head Post Office, RS Puram, Coimbatore, Tamil Nadu - 641002',
    placeId: 'place-cbe-rspuram'
  },
  {
    id: 'cbe-peelamedu',
    title: 'Peelamedu Airport Road',
    subtitle: 'Avinashi Road, Near PSG Tech, Peelamedu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641004',
    area: 'Peelamedu',
    fullAddress: 'Avinashi Road, Opp PSG College of Technology, Peelamedu, Coimbatore, Tamil Nadu - 641004',
    placeId: 'place-cbe-peelamedu'
  },
  {
    id: 'cbe-saravanampatti',
    title: 'Saravanampatti IT Corridor',
    subtitle: 'Sathy Road, Near CHIL SEZ IT Park, Saravanampatti',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641035',
    area: 'Saravanampatti',
    fullAddress: 'Sathy Road, Near KCT Tech Park, Saravanampatti, Coimbatore, Tamil Nadu - 641035',
    placeId: 'place-cbe-saravanampatti'
  },
  {
    id: 'cbe-singanallur',
    title: 'Singanallur Bus Stand Area',
    subtitle: 'Trichy Road, Near Singanallur Junction',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641005',
    area: 'Singanallur',
    fullAddress: 'Trichy Main Road, Singanallur, Coimbatore, Tamil Nadu - 641005',
    placeId: 'place-cbe-singanallur'
  },
  {
    id: 'cbe-saibaba-colony',
    title: 'Saibaba Colony',
    subtitle: 'NSR Road, Near Alagesan Road, Saibaba Colony',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641011',
    area: 'Saibaba Colony',
    fullAddress: 'NSR Road, Saibaba Colony, Coimbatore, Tamil Nadu - 641011',
    placeId: 'place-cbe-saibaba'
  },

  // Chennai
  {
    id: 'chn-annanagar',
    title: 'Anna Nagar West',
    subtitle: '2nd Avenue, Near Roundtana, Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    area: 'Anna Nagar',
    fullAddress: '2nd Avenue, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu - 600040',
    placeId: 'place-chn-annanagar'
  },
  {
    id: 'chn-tnagar',
    title: 'T. Nagar Commercial Hub',
    subtitle: 'Usman Road, Near Panagal Park, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    area: 'T. Nagar',
    fullAddress: 'North Usman Road, T. Nagar, Chennai, Tamil Nadu - 600017',
    placeId: 'place-chn-tnagar'
  },
  {
    id: 'chn-velachery',
    title: 'Velachery Main Road',
    subtitle: '100 Feet Bypass Road, Near Phoenix Marketcity, Velachery',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600042',
    area: 'Velachery',
    fullAddress: '100 Feet Bypass Road, Velachery, Chennai, Tamil Nadu - 600042',
    placeId: 'place-chn-velachery'
  },
  {
    id: 'chn-omr',
    title: 'OMR IT Expressway - Thoraipakkam',
    subtitle: 'Old Mahabalipuram Road, Near Cognizant / TCS, Thoraipakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600097',
    area: 'OMR Thoraipakkam',
    fullAddress: 'Rajiv Gandhi Salai (OMR), Thoraipakkam, Chennai, Tamil Nadu - 600097',
    placeId: 'place-chn-omr'
  },
  {
    id: 'chn-adyar',
    title: 'Adyar Gandhi Nagar',
    subtitle: '1st Main Road, Near Adyar Signal, Adyar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600020',
    area: 'Adyar',
    fullAddress: '1st Main Road, Gandhi Nagar, Adyar, Chennai, Tamil Nadu - 600020',
    placeId: 'place-chn-adyar'
  },

  // Mumbai
  {
    id: 'bom-bandra',
    title: 'Bandra West',
    subtitle: 'Hill Road / Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    area: 'Bandra West',
    fullAddress: 'Linking Road, Near Bandra Station, Bandra West, Mumbai, Maharashtra - 400050',
    placeId: 'place-bom-bandra'
  },
  {
    id: 'bom-andheri',
    title: 'Andheri East MIDC',
    subtitle: 'Chakala, Andheri-Kurla Road, Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400093',
    area: 'Andheri East',
    fullAddress: 'Andheri-Kurla Road, Chakala, Andheri East, Mumbai, Maharashtra - 400093',
    placeId: 'place-bom-andheri'
  },
  {
    id: 'bom-powai',
    title: 'Hiranandani Gardens, Powai',
    subtitle: 'Central Avenue, Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076',
    area: 'Powai',
    fullAddress: 'Central Avenue, Hiranandani Gardens, Powai, Mumbai, Maharashtra - 400076',
    placeId: 'place-bom-powai'
  },

  // Hyderabad
  {
    id: 'hyd-hitec-city',
    title: 'Hitec City Phase 2',
    subtitle: 'Madhapur Main Road, Near Cyber Towers, Hitec City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    area: 'Hitec City',
    fullAddress: 'Madhapur Main Road, Near Cyber Towers, Hitec City, Hyderabad, Telangana - 500081',
    placeId: 'place-hyd-hitec'
  },
  {
    id: 'hyd-gachibowli',
    title: 'Gachibowli Financial District',
    subtitle: 'ISB Road, Nanakramguda, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    area: 'Gachibowli',
    fullAddress: 'Financial District, Nanakramguda, Gachibowli, Hyderabad, Telangana - 500032',
    placeId: 'place-hyd-gachibowli'
  },
  {
    id: 'hyd-jubilee-hills',
    title: 'Jubilee Hills Check Post',
    subtitle: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    area: 'Jubilee Hills',
    fullAddress: 'Road No. 36, Jubilee Hills Check Post, Hyderabad, Telangana - 500033',
    placeId: 'place-hyd-jubilee'
  },

  // Pune
  {
    id: 'pun-hinjawadi',
    title: 'Hinjawadi IT Park Phase 1',
    subtitle: 'Hinjawadi Phase 1, Near Infosys Circle, Hinjawadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    area: 'Hinjawadi',
    fullAddress: 'Rajiv Gandhi Infotech Park, Hinjawadi Phase 1, Pune, Maharashtra - 411057',
    placeId: 'place-pun-hinjawadi'
  },
  {
    id: 'pun-kothrud',
    title: 'Kothrud DP Road',
    subtitle: 'Near Karve Statue, Paud Road, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    area: 'Kothrud',
    fullAddress: 'Paud Road, Near Karve Statue, Kothrud, Pune, Maharashtra - 411038',
    placeId: 'place-pun-kothrud'
  },
  {
    id: 'pun-viman-nagar',
    title: 'Viman Nagar Central',
    subtitle: 'Symbiosis Road, Near Phoenix Marketcity, Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    area: 'Viman Nagar',
    fullAddress: 'Symbiosis Road, Viman Nagar, Pune, Maharashtra - 411014',
    placeId: 'place-pun-viman'
  },

  // Delhi / NCR
  {
    id: 'del-connaught-place',
    title: 'Connaught Place (CP)',
    subtitle: 'Outer Circle, Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    area: 'Connaught Place',
    fullAddress: 'Barakhamba Road, Outer Circle, Connaught Place, New Delhi, Delhi - 110001',
    placeId: 'place-del-cp'
  },
  {
    id: 'del-gurgaon-cybercity',
    title: 'Cyber City DLF Phase 2',
    subtitle: 'DLF Cyber Hub, Sector 24, Gurugram',
    city: 'Delhi',
    state: 'Haryana',
    pincode: '122002',
    area: 'Gurgaon Cyber City',
    fullAddress: 'DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Delhi NCR - 122002',
    placeId: 'place-del-cybercity'
  },
  {
    id: 'del-noida-sec62',
    title: 'Noida Sector 62 IT Hub',
    subtitle: 'Block B, Industrial Area, Sector 62, Noida',
    city: 'Delhi',
    state: 'Uttar Pradesh',
    pincode: '201309',
    area: 'Noida Sector 62',
    fullAddress: 'Electronic City, Sector 62, Noida, Uttar Pradesh - 201309',
    placeId: 'place-del-noida62'
  },

  // Kochi
  {
    id: 'cok-kakkanad',
    title: 'Kakkanad Infopark',
    subtitle: 'Infopark Expressway, Kakkanad',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682030',
    area: 'Kakkanad',
    fullAddress: 'Infopark Phase 1, Kakkanad, Kochi, Kerala - 682030',
    placeId: 'place-cok-kakkanad'
  },
  {
    id: 'cok-edapally',
    title: 'Edapally Toll Junction',
    subtitle: 'Near LuLu Mall, NH 66, Edapally',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682024',
    area: 'Edapally',
    fullAddress: 'NH 66 Bypass, Near LuLu Mall, Edapally, Kochi, Kerala - 682024',
    placeId: 'place-cok-edapally'
  }
];

export const SERVICE_TAG_LABELS: Record<ServiceTagType, string> = {
  'household-shifting': 'House Shifting',
  'office-shifting': 'Office Shifting',
  'parcel-courier': 'Parcel & Courier',
  'truck-booking': 'Truck Booking',
  'vehicle-transportation': 'Vehicle Transport',
  'warehousing-storage': 'Warehousing & Storage',
  'loading-unloading': 'Loading & Unloading',
  'packing-unpacking': 'Packing & Unpacking'
};
