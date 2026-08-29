/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem } from '../types';
import householdShiftingImg from '../assets/images/household_shifting_packers_1786285006837.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'packers-and-movers',
    name: 'Household Shifting',
    tagline: 'Fast & Safe Relocation',
    shortDescription: 'Reliable and affordable household relocation for apartments, villas, and independent houses — whether moving locally within your city or intercity nationwide with multi-layer protective packing.',
    detailedDescription: 'Our complete household shifting service caters to both local moves within your city (Intracity) and long-distance moves between cities across India (Intercity). We handle everything from dismantling furniture to 3-layer or 5-layer protective packing, safe loading in enclosed container trucks, live GPS tracking, transit insurance coverage, and complete furniture reassembly at your new destination.',
    iconName: 'Home',
    image: householdShiftingImg,
    benefits: [
      'Flexible options for Within City (Same-Day) and Between City (Express Pan-India)',
      'Multi-layer heavy-duty bubble wrap, corrugated sheets, and waterproof wrapping',
      'Experienced city & long-haul drivers with trained professional moving crew',
      'Free disassembly and reassembly of beds, wardrobes, and modular furniture',
      'Comprehensive transit insurance coverage with optional 15-day free warehousing'
    ],
    processSteps: [
      { title: 'Free Survey & Estimation', description: 'Our expert assesses your inventory size and route (Within City or Between City) to provide an accurate transparent quote.' },
      { title: 'Multi-layer Protective Packing', description: 'Our skilled crew packs electronics, glassware, and furniture with customized materials suited for local or highway transit.' },
      { title: 'Containerized Transit & Tracking', description: 'Goods are stacked strategically inside enclosed container trucks with real-time GPS tracking.' },
      { title: 'Unpacking & Reassembly', description: 'We safely unload, unwrap, and assemble your furniture and set up appliances in your new home.' }
    ],
    basePrice: 3500,
    priceMetric: 'Starting from',
    faq: [
      { question: 'What is the difference between Within City and Between City shifting?', answer: 'Within City (Intracity) shifting is completed on the same day within local city boundaries using city tempos/trucks. Between City (Intercity) shifting covers long-distance moves between different cities/states using dedicated or shared container trucks with 5-layer packing and transit insurance.' },
      { question: 'Do you offer shared truck options for intercity home moves to reduce cost?', answer: 'Yes! For smaller loads (1 BHK or partial household), you can choose Shared Container Truck (Part Load) to save up to 40% on intercity moving costs, or Dedicated Container Truck for instant direct dispatch.' },
      { question: 'How many days in advance should I book my move?', answer: 'For local within city moves, booking 1 to 3 days prior is sufficient. For intercity moves across states, we recommend booking 3 to 7 days in advance for smooth schedule planning.' },
      { question: 'Do you disassemble and reassemble furniture like beds and wardrobes?', answer: 'Yes, our trained carpenters disassemble and reassemble standard furniture such as wooden beds, dining tables, and modular wardrobes at both source and destination.' }
    ],
    seo: {
      title: 'Professional Packers and Movers & House Shifting Services | Packersolution',
      description: 'Book professional packers and movers & household shifting services for local within city moves or intercity relocation across India. Safe multi-layer packing, container trucks, and carpenter assistance.',
      keywords: ['packers and movers', 'household shifting', 'local home moving', 'intercity packers and movers', 'within city house shifting', 'best packers and movers', 'packers and movers near me'],
      canonicalUrl: 'https://packersolution.com/#service/packers-and-movers',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Packers and Movers & Household Shifting',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Reliable household relocation for local city moves or intercity moves with premium multi-layer protective packing.',
        'areaServed': 'Pan India',
        'offers': {
          '@type': 'Offer',
          'price': '3500',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'shiftingScope',
        label: 'Shifting Scope',
        type: 'select',
        options: ['Within City (Intracity Local Move)', 'Between City (Intercity / Outstation)'],
        required: true
      },
      {
        name: 'apartmentSize',
        label: 'Apartment Size / Type of Home',
        type: 'select',
        options: ['1 BHK Apartment', '2 BHK Apartment', '3 BHK Apartment', '4+ BHK / Villa', 'Few Household Items Only'],
        required: true
      },
      {
        name: 'originFloor',
        label: 'Current Floor (Origin)',
        type: 'select',
        options: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th to 7th Floor', '8th+ Floor'],
        required: true
      },
      {
        name: 'hasOriginElevator',
        label: 'Elevator Available at Origin?',
        type: 'select',
        options: ['Yes, elevator available', 'No, stairs only'],
        required: true
      },
      {
        name: 'destinationFloor',
        label: 'New Floor (Destination)',
        type: 'select',
        options: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th to 7th Floor', '8th+ Floor'],
        required: true
      },
      {
        name: 'hasDestinationElevator',
        label: 'Elevator Available at Destination?',
        type: 'select',
        options: ['Yes, elevator available', 'No, stairs only'],
        required: true
      },
      {
        name: 'approxDistance',
        label: 'Estimated Shifting Distance (in km)',
        type: 'number',
        placeholder: 'e.g., 15 for local or 350 for intercity',
        required: true
      }
    ]
  },
  {
    id: 'domestic-relocation',
    name: 'Truck Booking',
    tagline: 'Instant mini truck, tempo & heavy vehicle hire with verified drivers',
    shortDescription: 'Book mini trucks (Tata Ace, Pickup, Bolero) and heavy commercial trucks for local goods transport, shifting, or intercity freight.',
    detailedDescription: 'Need a reliable truck for goods movement or household transport? Packersolution offers instant, hassle-free Truck Booking services for both local intracity trips and long-distance intercity freight. Choose from a comprehensive fleet ranging from Tata Ace (Chhota Hathi), 8ft Pickup, 14ft Eicher trucks, to 19ft/32ft multi-ton closed containers. Enjoy transparent fixed rates, real-time GPS tracking, verified professional drivers, and option for helper/labour assistance for easy loading and unloading.',
    iconName: 'Truck',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Truck+Booking+Services',
    benefits: [
      'Comprehensive fleet: Tata Ace, 8ft Pickup, 14ft Eicher & 32ft Containers',
      'Instant booking for local intracity and pan-India intercity transport',
      'Transparent distance-based and vehicle-based flat pricing',
      'Real-time GPS tracking and direct driver communication',
      'Optional verified loading & unloading helpers on demand'
    ],
    processSteps: [
      { title: 'Select Truck & Route', description: 'Choose vehicle size (Tata Ace, 8ft, 14ft, etc.) and enter pick-up and drop locations.' },
      { title: 'Driver & Truck Assigned', description: 'A verified professional driver with a clean, well-maintained vehicle is assigned instantly.' },
      { title: 'Loading & Transit', description: 'Load your goods or opt for helper assistance. Track the vehicle live in real-time till destination.' },
      { title: 'Safe Delivery & Receipt', description: 'Driver reaches drop location, assists in unloading, and collects digital delivery confirmation.' }
    ],
    basePrice: 850,
    priceMetric: 'Base Rate',
    faq: [
      { question: 'Which truck size should I select for my goods?', answer: 'Tata Ace (Chhota Hathi) is ideal for 1 BHK or up to 750 kg; 8ft Pickup for 1-2 BHK or up to 1200 kg; 14ft Eicher for 2-3 BHK or up to 3500 kg; and 19ft-32ft containers for heavy commercial load or 3+ BHK long distance.' },
      { question: 'Do truck bookings include helpers for loading and unloading?', answer: 'Standard truck booking covers driver & transport. You can easily add 1 or 2 helpers during booking for loading and unloading assistance.' },
      { question: 'Are toll taxes and fuel surcharges included in the fare?', answer: 'Yes, all estimated fares are transparent and include fuel expenses with no hidden surcharges.' }
    ],
    seo: {
      title: 'Instant Truck Booking & Goods Transport | Packersolution Fleet Hire',
      description: 'Book mini trucks, Tata Ace, Pickup, and commercial containers online at best rates. Verified drivers, live GPS tracking, and instant dispatch.',
      keywords: ['truck booking', 'hire mini truck', 'tata ace booking', 'goods transport truck', 'intercity truck hire', 'tempo booking'],
      canonicalUrl: 'https://packersolution.com/services/truck-booking',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Truck Booking Services',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Instant mini truck, tempo & heavy vehicle hire with verified drivers and live GPS tracking.',
        'areaServed': 'Nationwide / All Major Cities',
        'offers': {
          '@type': 'Offer',
          'price': '850',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'truckType',
        label: 'Select Truck Type / Capacity',
        type: 'select',
        options: ['Tata Ace / Chhota Hathi (750 kg)', '8ft Pickup / Bolero (1200 kg)', '14ft Eicher (3500 kg)', '19ft Closed Container (7000 kg)', '32ft Multi-Axle Container (15 Ton)'],
        required: true
      },
      {
        name: 'pickupArea',
        label: 'Pickup Address / Landmark',
        type: 'text',
        placeholder: 'e.g., Street, Landmark or Area Name',
        required: true
      },
      {
        name: 'dropArea',
        label: 'Drop-off Address / Landmark',
        type: 'text',
        placeholder: 'e.g., Destination Area Name',
        required: true
      },
      {
        name: 'helpersNeeded',
        label: 'Helper Assistance Needed?',
        type: 'select',
        options: ['Driver only (Self loading)', '1 Helper for Loading & Unloading', '2 Helpers for Heavy Goods'],
        required: true
      },
      {
        name: 'goodsCategory',
        label: 'Type of Goods Being Transported',
        type: 'select',
        options: ['Household Furniture & Appliances', 'Commercial Freight / Boxes', 'Industrial Equipment / Machinery', 'Single Heavy Appliance or Bike'],
        required: true
      }
    ]
  },
  {
    id: 'office-relocation',
    name: 'Office Shifting Services',
    tagline: 'Zero-downtime, safe and planned IT & office space relocation',
    shortDescription: 'Professional workspace transition handling server racks, IT networks, premium executive furniture, and office files with minimal operational disruption.',
    detailedDescription: 'Corporate relocation requires meticulous timeline coordination and structural precision to eliminate operational downtime. Packersolution provides specialized commercial moving solutions tailored to your organization. Our teams are highly trained to handle delicate IT infrastructure, server racks, network equipment, modular workstations, secure documents, and glass cabins. We work during weekends, overnight shifts, or holidays to ensure your business remains functional. With asset tagging, barcode tracking, and expert project managers, we guarantee a structured transition that gets your company back to work immediately.',
    iconName: 'Building',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Office+Shifting+Services',
    benefits: [
      'Tailored timeline planning including overnight or weekend shifting',
      'Advanced anti-static wrapping for computers, servers, and sensitive electronics',
      'Structured asset-tagging to ensure every desk item ends up in the correct layout',
      'Safe shredding and secured files/confidential documents transport',
      'Post-move setup assistance for furniture layout and electrical/cabling work'
    ],
    processSteps: [
      { title: 'Project Consultation & Inventory', description: 'Our commercial shifting manager evaluates the layout, lists the workstations, IT equipment, and drafts a custom migration schedule.' },
      { title: 'Color-Coded Labeling', description: 'We tag all desks, chairs, crates, and storage units with unique colors and barcodes matching the destination floor layout.' },
      { title: 'Secure Server & Tech Dismantling', description: 'Our technical team safely powers down, packs, and wraps servers, routers, and workstation PCs in protective anti-static cases.' },
      { title: 'Transit & Systematic Installation', description: 'We transport under active monitoring, unload, assemble workstations, and place personal crates right at the corresponding employee desks.' }
    ],
    basePrice: 8999,
    priceMetric: 'Starting from',
    faq: [
      { question: 'Can you handle overnight shifting so our operations aren’t affected?', answer: 'Absolutely. Over 80% of our office relocations are completed during weekends or nighttime hours to guarantee that your employees experience zero downtime.' },
      { question: 'Do you provide specialized crates for employees to pack their desk items?', answer: 'Yes, we supply heavy-duty, reusable plastic crates to all employees in advance, along with custom labels, to pack their personal desk items and documents safely.' },
      { question: 'Are you fully compliant with corporate vendor requirements?', answer: 'Yes, Packersolution is a registered business entity. We provide formal GST invoices, detailed itemized contracts, corporate liability insurance, and compliant safety documentation.' }
    ],
    seo: {
      title: 'Expert Office Shifting & Corporate Relocation | Packersolution Business',
      description: 'Minimize downtime with Packersolution commercial movers. Expert server packing, workstation assembly, office filing systems, and detailed project tracking for corporate clients.',
      keywords: ['office shifting', 'corporate relocation', 'commercial moving services', 'IT shifting', 'office packers and movers'],
      canonicalUrl: 'https://packersolution.com/services/office-relocation',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Office Shifting Services',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Zero-downtime, safe and planned IT & office space relocation for corporate clients.',
        'offers': {
          '@type': 'Offer',
          'price': '8999',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'shiftingScope',
        label: 'Relocation Scope',
        type: 'select',
        options: ['Within City (Intracity Local Relocation)', 'Between City (Intercity / Interstate Move)'],
        required: true
      },
      {
        name: 'officeSize',
        label: 'Office Size & Capacity',
        type: 'select',
        options: [
          'Small Office (5–10 Employees) - Up to 300 Sq.ft',
          'Startup Office - 300–500 Sq.ft',
          'Small Corporate Office - 500–800 Sq.ft',
          'Medium Office - 800–1,200 Sq.ft',
          'Large Corporate Office - 1,200–2,000 Sq.ft',
          'IT Office - Up to 25 Workstations',
          'Call Center / BPO - 25–50 Workstations',
          'Showroom / Retail Store - Up to 1,500 Sq.ft',
          'Warehouse Office - Up to 2,500 Sq.ft',
          'Corporate Head Office - Custom Survey'
        ],
        required: true
      },
      {
        name: 'pickupAddress',
        label: 'Current Pickup Address / IT Park',
        type: 'text',
        placeholder: 'Current Office Building, Floor, Tech Park & City',
        required: true
      },
      {
        name: 'dropAddress',
        label: 'New Drop Address / Destination',
        type: 'text',
        placeholder: 'Destination Building, Floor & Business Zone',
        required: true
      },
      {
        name: 'companyName',
        label: 'Company / Organization Name',
        type: 'text',
        placeholder: 'e.g., Acme Tech Private Limited',
        required: false
      },
      {
        name: 'hasServerRoom',
        label: 'Server Room & IT Networking Racks?',
        type: 'select',
        options: ['Yes, we have server racks, firewalls & IT networking', 'Standard desktop PCs & office furniture only'],
        required: true
      }
    ]
  },
  {
    id: 'vehicle-transportation',
    name: 'Vehicle Transportation (Car & Bike)',
    tagline: 'Scratch-free, secure and fully enclosed vehicle carriage',
    shortDescription: 'State-of-the-art specialized multi-car carriers and secure single-bike wood crates to transport your automobiles across India.',
    detailedDescription: 'Your car or motorcycle is a valuable asset that deserves the highest security during transport. Packersolution provides specialized automobile carriage services. For motorcycles, we construct custom wooden crates with heavy tie-downs to ensure the suspension is stabilized and paintwork remains pristine. For luxury cars, we utilize modern hydraulic car-carrier trailers with robust securing mechanisms. We complete a thorough pre-transport inspection report tracking existing scratches, fluid levels, and tire condition, giving you absolute transparency before the journey begins.',
    iconName: 'Bike',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Vehicle+Transportation+Car+Bike',
    benefits: [
      'Specially designed hydraulic closed car trailers for complete weather protection',
      'Heavy-duty custom wooden crates and foam wrapping for premium motorcycles',
      'Detailed pre-loading inspection checklist with digital photographic evidence',
      'Live tracking of carriers with regular sms or WhatsApp notifications',
      'Door-to-door pickup and delivery at any location nationwide'
    ],
    processSteps: [
      { title: 'Condition Assessment', description: 'We perform a rigorous vehicle inspection, note fuel/odometer readings, photograph current condition, and issue an official handover certificate.' },
      { title: 'Custom SECURE Packing', description: 'Bikes are wrapped in foam sheets and secure bubble film before being strapped tightly or crated; cars are locked inside the carriage.' },
      { title: 'Transit via Carrier', description: 'Vehicles are securely transported using specialized long-distance multi-vehicle trailers along premium highway networks.' },
      { title: 'Inspected Delivery', description: 'We deliver the vehicle straight to your new doorstep, re-verify the condition checklist together, and complete the official delivery sign-off.' }
    ],
    basePrice: 6000,
    priceMetric: 'Starting from',
    faq: [
      { question: 'Do I need to leave fuel in the vehicle during transportation?', answer: 'We advise keeping around 1/4th (one-quarter) of fuel in the tank for loading and unloading purposes. Do not fill the tank completely as it adds unnecessary weight and presents a minor safety hazard.' },
      { question: 'What documents do you need for inter-state vehicle transport?', answer: 'We require a clear copy of the Vehicle Registration Certificate (RC), valid Insurance Policy document, Pollution Under Control (PUC) certificate, and the owner’s ID proof.' },
      { question: 'Can I pack personal items inside my car during transit?', answer: 'We strongly discourage storing personal belongings, luggage, or valuables inside the car. Car carriers are designed for cars only, and transit insurance does not cover personal items left inside the cabin.' }
    ],
    seo: {
      title: 'Safe Car & Bike Transportation | Packersolution Vehicle Carrier',
      description: 'Looking to transport your car or bike across states? Packersolution offers secure multi-car carriers, custom motorcycle wood crating, door-to-door delivery, and comprehensive transit insurance.',
      keywords: ['car carrier service', 'bike transport', 'vehicle movers', 'transport car to another city', 'motorcycle shifting'],
      canonicalUrl: 'https://packersolution.com/services/vehicle-transportation',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Vehicle Transportation (Car & Bike)',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Scratch-free, secure and fully enclosed vehicle carriage for luxury cars and motorcycles.',
        'offers': {
          '@type': 'Offer',
          'price': '6000',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'vehicleCategory',
        label: 'Vehicle Category',
        type: 'select',
        options: ['Motorcycle / Two-Wheeler (Under 150cc)', 'Premium Bike / Cruiser (Over 150cc)', 'Hatchback Car', 'Sedan Car', 'SUV / MUV Car', 'Luxury Sports Car'],
        required: true
      },
      {
        name: 'vehicleModel',
        label: 'Vehicle Make & Model',
        type: 'text',
        placeholder: 'e.g., Royal Enfield Classic 350 / Hyundai Creta',
        required: true
      },
      {
        name: 'originCity',
        label: 'Pickup City',
        type: 'text',
        placeholder: 'e.g., Delhi',
        required: true
      },
      {
        name: 'destinationCity',
        label: 'Delivery City',
        type: 'text',
        placeholder: 'e.g., Bangalore',
        required: true
      },
      {
        name: 'workingCondition',
        label: 'Is the vehicle in working condition?',
        type: 'select',
        options: ['Yes, fully operational', 'No, non-runner (requires towing)'],
        required: true
      }
    ]
  },
  {
    id: 'packing-unpacking',
    name: 'Packing Service',
    tagline: 'Expert packing using industry-standard durable materials',
    shortDescription: 'Avoid physical stress. Hire our specialized crew to pack your entire household items securely, or unpack them neatly into shelves.',
    detailedDescription: 'The foundation of any successful move lies in the quality of packing. At Packersolution, we offer dedicated Packing and Unpacking services as standalone options or add-ons. Our packing specialists are trained in the science of item protection. We use specific box styles, including wardrobe boxes that let you hang your suits, heavy-duty double-wall cartons for heavy kitchen books, bubble wrap for exquisite dinner sets, and stretch film to shield sofas from ambient dust. Once delivered, our unpacking specialists unbox, wipe, organize, and sort your items, placing them into your cupboards, wardrobes, and kitchen counters so your new house feels like home instantly.',
    iconName: 'Package',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packing+Service',
    benefits: [
      'Trained packing experts with specialized knowledge of fragile items',
      'Premium industrial-grade materials: five-ply carton boxes, foam sheets, bubble wraps',
      'Wardrobe boxes provided to move premium clothing without creasing',
      'Unboxing, sorting, and organized placement in designated shelves',
      'Eco-friendly disposal of all empty packaging boxes post-move'
    ],
    processSteps: [
      { title: 'Sorting & Labeling', description: 'Our crew categorizes goods by room, fragility level, and size, labeling each section to ensure organized unboxing.' },
      { title: 'Systematic Packing', description: 'We wrap fragile items individually, pack heavy objects at the bottom of heavy-duty boxes, and fill gaps with premium packing peanuts.' },
      { title: 'Taped & Sealed Security', description: 'Boxes are fully bound with high-tensile packaging tapes, color-coded, and shrink-wrapped together if needed.' },
      { title: 'Detailed Unpacking', description: 'At the destination, we open the boxes, clean the items, organize them into cabinets, and collect and dispose of all packaging residue.' }
    ],
    basePrice: 3000,
    priceMetric: 'Starting from',
    faq: [
      { question: 'Can I hire you just to pack my kitchen and fragile items?', answer: 'Yes! We offer partial packing services where our crew focuses strictly on your high-value or fragile segments, such as kitchen china, glassware, paintings, and home theater gear.' },
      { question: 'Are the packing materials included in the base quote?', answer: 'Yes, our standalone packing quote includes the cost of all packing materials like premium bubble wrap, carton boxes, adhesive tapes, and wrapping paper.' },
      { question: 'Do you take back the empty carton boxes after unpacking?', answer: 'Yes, if you choose our full unpacking service, our team will pack, clean up, and remove all empty boxes and packing waste from your home, keeping it clutter-free.' }
    ],
    seo: {
      title: 'Professional Packing Service | Packersolution Material Experts',
      description: 'Ensure safety with expert packing services from Packersolution. We utilize heavy-duty 5-ply cartons, bubble wrap, and wardrobe boxes for maximum item safety.',
      keywords: ['packing service', 'packing and moving companies', 'wooden box packing company', 'professional packing service', 'best packing company in coimbatore', 'packing services', 'professional home packers', 'bubble wrapping service', 'box packing movers'],
      canonicalUrl: 'https://packersolution.com/services/packing-unpacking',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Packing Service',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Expert packing using five-ply carton boxes, foam sheets, bubble wraps, and systematic unpacking.',
        'offers': {
          '@type': 'Offer',
          'price': '3000',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'packingScope',
        label: 'Shifting packing scope required',
        type: 'select',
        options: ['Full House Packing & Unpacking', 'Packing Only (No Unpacking)', 'Unpacking Only (We do not pack)', 'Fragile & Kitchen Items Only', 'Single Room / Custom Packing'],
        required: true
      },
      {
        name: 'propertyScale',
        label: 'Approximate Size of Property',
        type: 'select',
        options: ['1 BHK or Small Office', '2 BHK', '3 BHK', '4+ BHK / Large Office', 'Just a few specific items'],
        required: true
      },
      {
        name: 'hasGlassware',
        label: 'Contains High-Volume Fragile/Glassware?',
        type: 'select',
        options: ['Yes, extensive fragile/antique items', 'Normal household amounts', 'No fragile items'],
        required: true
      },
      {
        name: 'preferredDate',
        label: 'Preferred Packing Date',
        type: 'date',
        required: true
      }
    ]
  },
  {
    id: 'loading-unloading',
    name: 'Loading & Unloading Services',
    tagline: 'Injury-free heavy lifting by physically fit expert handlers',
    shortDescription: 'Hire our robust team equipped with trolleys, ramps, and belts to safely handle heavy objects, pianos, safes, and appliances.',
    detailedDescription: 'Improper loading and unloading are the leading causes of self-injury and damage to heavy furniture during a move. Packersolution provides specialized loading and unloading crews equipped with the proper tools. Our movers use heavy-duty hand trucks, appliance dollies, slider sheets, lifting straps, and non-slip loading ramps. Whether you have hired your own transport vehicle and need experienced muscle to pack it strategically, or require professional unloading from an interstate container, our physically fit, trained crews ensure your items are handled with perfect ergonomics and loaded without any shift risk.',
    iconName: 'UserCheck',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Loading+Unloading+Services',
    benefits: [
      'Highly trained, physically fit local loaders with absolute safety discipline',
      'Use of professional equipment: furniture dollies, ramp sliders, and shoulder straps',
      'Strategic vehicle stacking to maximize space and prevent road transit shifts',
      'Protection of home staircases, door frames, and elevator walls from scratches',
      'On-demand hourly rates or fixed inventory-based packages'
    ],
    processSteps: [
      { title: 'Worksite Assessment', description: 'Our supervisor inspects the weight of heavy items, checks staircase widths, doorways, and identifies the safest pathway.' },
      { title: 'Meticulous Carrying', description: 'Using specialized shoulder lifting harnesses, we carry refrigerators, wardrobes, and safes with zero floor-dragging.' },
      { title: 'Strategic Loading Stack', description: 'Heavy goods go on the bottom, locked tightly; medium boxes fill the middle; and light fragile parcels sit safely on top.' },
      { title: 'Secure Unloading', description: 'At destination, we remove items systematically from the truck, preventing collapses, and transport them right into your rooms.' }
    ],
    basePrice: 2000,
    priceMetric: 'Starting from',
    faq: [
      { question: 'Do you provide loading-only services if we have rented our own truck?', answer: 'Yes! We frequently assist customers who have rented their own commercial trucks or containers. Our professional crew will arrive, load your truck strategically to prevent damage, and secure it with ropes.' },
      { question: 'What specialized equipment do you use for very heavy items?', answer: 'We use industrial-grade hydraulic hand trolleys, furniture dollies, customized non-slip ramps, and padded lifting straps to handle heavy objects like commercial printers, pianos, or steel safes.' },
      { question: 'What happens if a loader accidentally damages a door frame during loading?', answer: 'Our team is trained to walk cautiously, and we use protective edge guards. In the rare event of accidental damage to your building property, our supervisor is on site to document it and resolve it according to our clear service-guarantee guidelines.' }
    ],
    seo: {
      title: 'Movers for Loading & Unloading | Packersolution Heavy Lifters',
      description: 'Hire trained, physically fit loaders from Packersolution. We utilize specialized appliance dollies, loading ramps, and lifting belts to handle heavy furniture with ease.',
      keywords: ['best machinery loading service company in coimbatore', 'loading and unloading services', 'small load movers', 'loading and unloading movers in coimbatore', 'loading services', 'unloading movers', 'heavy furniture lifting', 'hire movers only', 'truck loading packers'],
      canonicalUrl: 'https://packersolution.com/services/loading-unloading',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Loading & Unloading Services',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'Injury-free heavy lifting by physically fit expert handlers using modern moving gear.',
        'offers': {
          '@type': 'Offer',
          'price': '2000',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'crewSizeNeeded',
        label: 'Movers / Labor count preferred',
        type: 'select',
        options: ['2 Professional Movers (Standard)', '4 Movers (Recommended for 2-3 BHK)', '6+ Movers (For heavy loads / office)', 'Decide based on my items'],
        required: true
      },
      {
        name: 'volumeDescription',
        label: 'Approximate weight / Volume of Goods',
        type: 'select',
        options: ['Few Heavy Appliances only', '1 BHK Apartment Inventory', '2 BHK Apartment Inventory', '3+ BHK / Large Office Shifting'],
        required: true
      },
      {
        name: 'staircaseOrigin',
        label: 'Staircase or Narrow passages at site?',
        type: 'select',
        options: ['No, easy access / wide elevators', 'Yes, narrow stairs only (No elevator)', 'Ground floor loading only'],
        required: true
      },
      {
        name: 'truckType',
        label: 'Truck Size to Load/Unload',
        type: 'select',
        options: ['Tata Ace / Small Pickup Truck', '14 Feet Closed Container', '17 Feet Closed Container', '19-24 Feet Multi-Axle Container', 'Other / No Truck yet'],
        required: true
      }
    ]
  },
  {
    id: 'warehousing-storage',
    name: 'Warehousing & Storage Solutions',
    tagline: 'CCTV monitored, moisture-free, pest-controlled storage',
    shortDescription: 'Safe, clean, and flexible short-term and long-term storage facilities for your home furniture, business inventory, or seasonal goods.',
    detailedDescription: 'Whether you are traveling abroad for a temporary project, waiting for your new villa to be completed, or needing additional storage space for your business merchandise, Packersolution offers premium, secure warehousing facilities. Our warehouses are climate-controlled, dry, fully pest-controlled, and under continuous 24/7 CCTV surveillance with active fire security systems. We index every single item and store them in custom palletized wooden vaults. You can store your items for a few weeks or several years, with comprehensive insurance coverage and structured pick-up and delivery services whenever you need them.',
    iconName: 'Warehouse',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Warehousing+Storage+Solutions',
    benefits: [
      '24/7 continuous CCTV monitoring and physical security guards',
      'Weekly pest-control and deep cleaning to ensure dust-free environment',
      'Detailed inventory index receipt with photos provided upon entry',
      'Flexible storage terms starting from 1 week to unlimited years',
      'Comprehensive fire, water, and burglary insurance coverage included'
    ],
    processSteps: [
      { title: 'Secure Pickup', description: 'Our packers arrive at your home, wrap your entire inventory in long-term storage plastic, load, and transport them to our warehouse.' },
      { title: 'Cataloging & Inventory', description: 'Each item is tagged with a distinct barcode, entered into our warehouse management system, and an official inventory document is shared.' },
      { title: 'Safe Vault Placement', description: 'Your goods are placed on clean wooden pallets, shrink-wrapped securely, and housed in highly safe, dedicated storage racks.' },
      { title: 'On-Demand Retrieval', description: 'When you are ready, notify us 48 hours in advance, and our crew will load, deliver, and set up your items at your new location.' }
    ],
    basePrice: 3000,
    priceMetric: 'Per Month Starting from',
    faq: [
      { question: 'Can I visit the warehouse to check on my stored items?', answer: 'Yes! You can visit our warehouse during standard business hours (Monday to Saturday, 9 AM to 6 PM) with a prior 24-hour notification so our manager can assist you.' },
      { question: 'How is the storage fee calculated?', answer: 'Our storage fees are calculated on a monthly basis, based on the volume in cubic feet or square feet that your goods occupy. We offer substantial discounts for commitments longer than 6 months.' },
      { question: 'What safety measures do you have against fire and water damage?', answer: 'Our modern warehouses are equipped with automated smoke detectors, wet sprinkler systems, high-elevation concrete flooring to prevent water logging, and a comprehensive insurance contract.' }
    ],
    seo: {
      title: 'Secure Warehousing & Storage | Packersolution Self Storage',
      description: 'Need storage space for your home furniture or business stock? Packersolution offers safe, pest-controlled, CCTV-monitored warehouse storage with flexible monthly terms.',
      keywords: ['warehousing services', 'furniture storage', 'self storage space', 'secure warehouse storage', 'packers and movers storage'],
      canonicalUrl: 'https://packersolution.com/services/warehousing-storage',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Warehousing & Storage Solutions',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packersolution',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution'
        },
        'description': 'CCTV monitored, moisture-free, pest-controlled storage for short or long-term durations.',
        'offers': {
          '@type': 'Offer',
          'price': '3000',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'storageDuration',
        label: 'Intended Storage Duration',
        type: 'select',
        options: ['Short term (1 to 4 Weeks)', 'Medium term (1 to 6 Months)', 'Long term (6 to 12 Months)', 'Extended Storage (12+ Months)', 'Not sure / Flexible'],
        required: true
      },
      {
        name: 'storageVolume',
        label: 'Approximate Space Needed / Inventory Size',
        type: 'select',
        options: ['1 BHK / Single Room Contents', '2 BHK Contents', '3 BHK Contents', 'Office Stock / Equipment', 'Few Carton Boxes Only'],
        required: true
      },
      {
        name: 'needsPickupService',
        label: 'Do you need Packersolution to pick up your goods?',
        type: 'select',
        options: ['Yes, fully pack and transport to warehouse', 'No, I will deliver the goods myself'],
        required: true
      },
      {
        name: 'insuranceDeclaredValue',
        label: 'Estimated Declared Value of Stored Goods',
        type: 'select',
        options: ['Up to 1,00,000', '1,00,000 to 5,00,000', '5,00,000 to 15,00,000', 'Above 15,00,000'],
        required: true
      }
    ]
  },
  {
    id: 'parcel-courier',
    name: 'Parcel & Courier Services',
    tagline: 'Fast & Secure Intercity & Door-to-Door Parcel Delivery by Packer Solutions',
    shortDescription: 'Send documents, personal belongings, business parcels, e-commerce orders, and commercial cargo with doorstep pickup, secure 5-ply packing, and real-time tracking.',
    detailedDescription: 'Packer Solutions provides professional intercity and door-to-door Parcel Services for individuals, businesses, offices, retailers, e-commerce sellers, and commercial customers. Our parcel transportation service is designed for documents, personal belongings, small packages, business parcels, commercial goods, and other eligible shipments. Whether you need to send a parcel from your home, office, shop, warehouse, or business location to any destination across India, Packer Solutions provides a systematic process covering parcel booking, doorstep pickup, verification, multi-layer protective packaging, secure handling, scheduled transit, delivery updates, and digital delivery confirmation.',
    iconName: 'Package',
    image: 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Parcel+Courier+Services',
    benefits: [
      'Dedicated Intercity Corridors (e.g. Coimbatore to Madurai, Chennai, Bangalore)',
      'Standard, Express, Document & Bulk Parcel Options',
      'Door-to-Door Pickup and Drop Where Accessible',
      'Heavy-duty 5-Ply Carton & Bubble Wrap Packaging Support',
      'Tamper-Proof Barcode Labeling & Package Identification',
      'Real-time Live GPS Tracking & Milestone SMS/WhatsApp Alerts',
      '100% Transparent Distance & Weight Based Rates (Zero Hidden Fees)'
    ],
    processSteps: [
      { title: '1. Enter Pickup & Delivery Details', description: 'Provide origin city / address and destination delivery location with pincode.' },
      { title: '2. Provide Parcel Details', description: 'Enter parcel category, weight, dimensions, and quantity of packages.' },
      { title: '3. Select Required Service', description: 'Choose between Standard, Express, Document, or Bulk Freight services.' },
      { title: '4. Get Quotation', description: 'Transparent pricing calculated based on actual weight, volume, and route schedule.' },
      { title: '5. Doorstep Parcel Pickup', description: 'Verified executive collects parcel from your home, office, or shop.' },
      { title: '6. Packaging & Labeling', description: '5-ply carton box packing, waterproof stretch film, and barcode labeling.' },
      { title: '7. Scheduled Transit', description: 'Transported through dedicated express highway and logistics networks.' },
      { title: '8. Destination Delivery', description: 'Safely delivered to the recipient address with digital OTP verification.' },
      { title: '9. Delivery Confirmation', description: 'Instant confirmation alert sent to sender and receiver upon handover.' }
    ],
    basePrice: 150,
    priceMetric: 'Starting from',
    faq: [
      { question: 'What is the Intercity Parcel Service?', answer: 'It is an intercity parcel transportation service provided by Packer Solutions for sending eligible documents, personal packages, business parcels, and commercial shipments between major city hubs.' },
      { question: 'Can I send a parcel from Coimbatore to Madurai / Intercity?', answer: 'Yes. Packer Solutions provides dedicated parcel transportation across Coimbatore, Madurai, Chennai, Bangalore, and all major corridors for eligible shipments.' },
      { question: 'Do you provide door-to-door parcel delivery?', answer: 'Yes, door-to-door pickup and delivery can be provided where the pickup and delivery locations support the service.' },
      { question: 'Do you provide parcel pickup from my home or office?', answer: 'Yes. Parcel pickup can be arranged from eligible homes, offices, shops, warehouses, and business locations.' },
      { question: 'Do you provide parcel delivery to residential and commercial addresses?', answer: 'Yes. Parcels can be delivered to eligible residential, office, commercial, and business addresses.' },
      { question: 'Can I send a business parcel / commercial goods?', answer: 'Yes. Businesses can use the service for documents, product samples, spare parts, customer orders, commercial packages, and retail inventory.' },
      { question: 'Do you provide Express Parcel Service?', answer: 'Yes. Express parcel transportation can be arranged for time-sensitive documents and eligible priority shipments based on the available transportation schedule.' },
      { question: 'Can I send fragile items?', answer: 'Fragile items (glassware, electronics, artwork) may be accepted subject to shipment assessment and applicable transportation requirements. Additional protective cushioning is provided.' },
      { question: 'Do you provide parcel packaging support?', answer: 'Yes. Packaging support can be provided using 5-ply cartons, bubble wrap, foam sheets, stretch film, and fragile stickers based on the parcel type.' },
      { question: 'How are intercity parcel charges calculated?', answer: 'Charges depend on actual weight, volumetric weight (L x W x H / 5000), dimensions, number of parcels, service speed, pickup location, delivery location, and packaging requirements.' },
      { question: 'Can I send multiple / bulk parcels?', answer: 'Yes. Bulk parcel transportation and dedicated part-load trucks can be arranged for customers and businesses with multiple packages.' },
      { question: 'Can I track my parcel status in real-time?', answer: 'Yes. You receive booking confirmation, pickup alerts, transit milestone notifications, and final delivery confirmation.' }
    ],
    seo: {
      title: 'Coimbatore to Madurai Parcel Service | Door-to-Door Parcel Delivery | Packer Solutions',
      description: 'Book Coimbatore to Madurai Parcel Service with Packer Solutions. Send personal, business and commercial parcels with doorstep pickup, secure packaging, tracking, and delivery updates.',
      keywords: ['Coimbatore to Madurai Parcel Service', 'Coimbatore to Madurai Parcel Delivery', 'Parcel Service from Coimbatore to Madurai', 'Coimbatore to Madurai Courier Service', 'Coimbatore to Madurai Express Parcel', 'Coimbatore to Madurai Door-to-Door Parcel', 'Coimbatore to Madurai Parcel Charges', 'Coimbatore to Madurai Courier Charges', 'Coimbatore to Madurai Parcel Pickup', 'Coimbatore to Madurai Business Parcel Service', 'Coimbatore to Madurai Parcel Transportation', 'Coimbatore to Madurai Package Delivery', 'Coimbatore to Madurai Parcel Company'],
      canonicalUrl: 'https://packersolution.com/coimbatore-to-madurai-parcel-service/',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Coimbatore to Madurai Parcel Service',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Packer Solutions',
          'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packer+Solutions+Parcel+Service'
        },
        'description': 'Professional Coimbatore to Madurai parcel and courier delivery with doorstep pickup, 5-ply packing, and live tracking.',
        'areaServed': 'Coimbatore, Madurai, Tamil Nadu',
        'offers': {
          '@type': 'Offer',
          'price': '150',
          'priceCurrency': 'INR'
        }
      }
    },
    formFields: [
      {
        name: 'parcelWeight',
        label: 'Approximate Weight of Parcel',
        type: 'select',
        options: ['Under 1 kg (Documents / Small Gift)', '1 to 5 kg', '5 to 20 kg', '20 to 50 kg', '50+ kg Commercial Parcel'],
        required: true
      },
      {
        name: 'pickupAddress',
        label: 'Pickup City & Pincode',
        type: 'text',
        placeholder: 'e.g., Bangalore - 560001',
        required: true
      },
      {
        name: 'deliveryAddress',
        label: 'Destination City & Pincode',
        type: 'text',
        placeholder: 'e.g., Mumbai - 400001',
        required: true
      },
      {
        name: 'deliverySpeed',
        label: 'Delivery Speed Preference',
        type: 'select',
        options: ['Express Air Cargo (1-2 Days)', 'Standard Highway Express (3-5 Days)', 'Economical Surface Transport (5-7 Days)'],
        required: true
      }
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    name: 'Rohan Sharma',
    role: 'Senior Product Manager',
    location: 'Bangalore',
    rating: 5,
    comment: 'Exceptional service for local home shifting! The crew dismantled my modular double bed, loaded everything, and reassembled it at my new flat in whitefield within 5 hours. Completely scratch-free and very professional.',
    service: 'Household Shifting (Within City)'
  },
  {
    id: 't2',
    name: 'Priya Deshmukh',
    role: 'HR Consultant',
    location: 'Pune',
    rating: 5,
    comment: 'Booked a 14ft Eicher truck for moving commercial stock and furniture. The driver was punctual, polite, and assisted smoothly in loading. Transparent rate card without any surprise toll or fuel surcharges!',
    service: 'Truck Booking'
  },
  {
    id: 't3',
    name: 'Vikram Aditya',
    role: 'Operations Lead, TechSolutions',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Corporate shifting is a nightmare, but Packersolution finished shifting our 40-seater office over a single Sunday! No downtime for our developers. All server racks and workstations were color-tagged and placed perfectly.',
    service: 'Office Shifting Services'
  },
  {
    id: 't4',
    name: 'Sanjeev Goel',
    role: 'Chartered Accountant',
    location: 'Mumbai',
    rating: 5,
    comment: 'I was extremely worried about sending my Royal Enfield and sedan to Chennai. Packersolution did a thorough pre-inspection with photographs. The vehicles were loaded onto closed trailer carriages and arrived without a single spot.',
    service: 'Vehicle Transportation (Car & Bike)'
  }
];

export const FAQS_GENERAL = [
  {
    question: 'How do Packersolutions Packers and Movers work?',
    answer: 'Packersolutions provides seamless, end-to-end shifting and logistics services. Simply select your service, enter pickup and drop locations, choose your shifting date and goods inventory, and get an instant transparent quote. Our verified partner drivers and professional packing team handle dismantling, multi-layer packing, loading, transit, unloading, and reassembly at your destination.'
  },
  {
    question: 'How are the charges calculated for Packersolutions house shifting?',
    answer: 'Our house shifting charges depend on the total volume/weight of your inventory, distance between origin and destination, vehicle type required (e.g. Tata Ace, Pickup, 14ft Truck), floor levels, elevator availability, and packaging materials selected. We offer 100% transparent pricing with zero hidden fees.'
  },
  {
    question: 'Does Packersolutions provide packing materials and carpenter assistance?',
    answer: 'Yes! Our Packers and Movers service includes premium multi-layer protective packaging (bubble wrap, corrugated sheets, stretch film, and heavy-duty cartons) along with skilled carpenters to disassemble and reassemble furniture like beds, wardrobes, and dining tables.'
  },
  {
    question: 'How far in advance should I book Packersolutions Packers and Movers?',
    answer: 'For instant local mini-truck deliveries, you can book on-demand with pickup in under 15 minutes. For complete house or office shifting with full packing services, we recommend booking at least 24 to 48 hours in advance to secure your preferred time slot and dedicated crew.'
  },
  {
    question: 'Can I track my shifting vehicle in real-time?',
    answer: 'Yes! Once your booking is confirmed, Packersolutions provides live GPS tracking links and direct telephone contact with your assigned movement manager and driver, allowing you to monitor your consignment in real-time.'
  },
  {
    question: 'What items are restricted or not allowed to be transported?',
    answer: 'For safety and legal compliance, Packersolutions does not transport hazardous materials, gas cylinders, flammable liquids, explosives, illegal items, physical cash, jewelry, or irreplaceable personal legal documents. Please carry personal valuables directly with you.'
  },
  {
    question: 'Is transit insurance available for my goods and vehicle transport?',
    answer: 'Yes, we offer comprehensive transit insurance options covering your household goods, office assets, cars, and two-wheelers against accidental damage or unforeseen incidents during transit for complete peace of mind.'
  },
  {
    question: 'What happens if I need to cancel or reschedule my booking?',
    answer: 'We offer free and hassle-free rescheduling. You can modify your shifting date or time slot up to 24 hours prior to the scheduled moving time with zero penalty fees by contacting our customer support team.'
  },
  {
    question: 'Are there any hidden charges like tolls, fuel surcharges, or entry taxes?',
    answer: 'No. All formal estimates from Packersolutions are all-inclusive, covering road tolls, state taxes, driver allowance, fuel, and standard packaging costs. The upfront quote is the exact final price you pay.'
  },
  {
    question: 'What types of vehicles are available in the Packersolutions fleet?',
    answer: 'Our versatile logistics fleet includes 2-Wheelers (for instant parcel deliveries), 3-Wheelers/Piaggio Ape, Tata Ace (Chota Hathi), 8ft Pickup, Bolero, 14ft Eicher, and 19ft/24ft heavy container trucks for large intercity moves.'
  }
];
