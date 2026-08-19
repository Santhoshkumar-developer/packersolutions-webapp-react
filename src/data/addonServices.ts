/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AddonSubService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  unit: string;
  popular?: boolean;
  included: string[];
}

export interface AddonCategory {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  rating: number;
  reviewsCount: string;
  startingPrice: number;
  badge: string;
  subCategories: AddonSubService[];
}

export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    id: 'carpenter',
    title: 'Carpenter & Woodwork',
    tagline: 'Assembly, dismantling, lock repair & custom furniture adjustments',
    iconName: 'Wrench',
    rating: 4.88,
    reviewsCount: '24.5k+',
    startingPrice: 299,
    badge: '100% Damage Safe Guarantee',
    subCategories: [
      {
        id: 'bed-assembly',
        title: 'Bed Dismantling & Assembly',
        description: 'Complete unbolting, transport prep, and sturdy re-erection for King/Queen size beds.',
        price: 599,
        duration: '45 mins',
        unit: 'per bed',
        popular: true,
        included: [
          'Unbolting wooden slats & headboard',
          'Safe hardware tagging in labeled pouches',
          'Precise level alignment at destination',
          'Free thread tightening & noise lubrication'
        ]
      },
      {
        id: 'wardrobe-assembly',
        title: 'Wardrobe & Closet Reassembly',
        description: 'Professional assembly of 2/3/4-door wooden & sliding wardrobes.',
        price: 899,
        duration: '60 mins',
        unit: 'per wardrobe',
        popular: true,
        included: [
          'Hinge alignment & magnetic latching',
          'Internal drawer runner check',
          'Floor leveling adjusters fitting',
          'Mirror & handle attachment'
        ]
      },
      {
        id: 'tv-wall-mounting',
        title: 'TV Wall Mounting & Shelf Fitting',
        description: 'Heavy-duty wall drilling and level-checked bracket fitting for LED/OLED TVs.',
        price: 349,
        duration: '30 mins',
        unit: 'per TV',
        included: [
          'Concrete/brick wall precision drilling',
          'Cable concealment routing prep',
          'Anchor bolt verification up to 75"',
          'Free spirit-level balancing'
        ]
      },
      {
        id: 'modular-kitchen-repair',
        title: 'Modular Kitchen Hinge & Drawer Repair',
        description: 'Fixing sagging hydraulic pumps, soft-close hinges, and cutlery trays.',
        price: 399,
        duration: '40 mins',
        unit: 'per visit',
        included: [
          'Soft-close hydraulic hinge replacement',
          'Telescopic channel alignment',
          'Cabinet door gap calibration'
        ]
      },
      {
        id: 'sofa-dining-repair',
        title: 'Sofa Leg & Dining Table Fitting',
        description: 'Tightening loose legs, wood polish touchups, and sturdy leg replacement.',
        price: 299,
        duration: '30 mins',
        unit: 'per furniture piece',
        included: [
          'High-tensile steel screw replacement',
          'Leg padding for scratch-free floors',
          'Joint strengthening glue application'
        ]
      }
    ]
  },
  {
    id: 'ac-appliances',
    title: 'AC Service & Appliance Setup',
    tagline: 'Uninstallation, foam jet wash, gas refill & home appliance fitting',
    iconName: 'Wind',
    rating: 4.92,
    reviewsCount: '41.2k+',
    startingPrice: 499,
    badge: '30-Day Service Warranty',
    subCategories: [
      {
        id: 'ac-foam-jet-service',
        title: 'AC Power Jet Wash Service (Split/Window)',
        description: 'Deep high-pressure foam jet wash for cooling coils, blower & filters.',
        price: 599,
        duration: '45 mins',
        unit: 'per AC',
        popular: true,
        included: [
          'Deep cleaning with non-toxic antibacterial foam',
          'High-pressure water jet washing of indoor coils',
          'Outdoor unit condenser jet flushing',
          'Drain pipe clearing & airflow measurement'
        ]
      },
      {
        id: 'ac-uninstallation-reinstallation',
        title: 'AC Uninstallation & Reinstallation Combo',
        description: 'End-to-end relocation setup for 1.0 to 2.0 Ton split or window ACs.',
        price: 1499,
        duration: '90 mins',
        unit: 'per unit combo',
        popular: true,
        included: [
          'Safe refrigerant pump-down & lock',
          'Copper pipe insulation check',
          'Outdoor wall bracket drilling & mounting',
          'Cooling efficiency & current draw check'
        ]
      },
      {
        id: 'washing-machine-setup',
        title: 'Washing Machine Uninstallation & Fitting',
        description: 'Plumbing inlet valve fitting, transit bolt locks, and drain outlet setup.',
        price: 349,
        duration: '30 mins',
        unit: 'per machine',
        included: [
          'Transit bolt locking for motor protection during shift',
          'Inlet tap adapter & filter mesh cleaning',
          'Drain hose clamp fitting & trial spin run'
        ]
      },
      {
        id: 'ro-water-purifier',
        title: 'RO Water Purifier Mounting & Filter Check',
        description: 'Wall mounting, inlet valve connection, and TDS level check.',
        price: 399,
        duration: '35 mins',
        unit: 'per RO system',
        included: [
          'Pre-filter candle flush & leak test',
          'TDS measurement & mineral balance check',
          'Food-grade pipe connection & tap adapter'
        ]
      },
      {
        id: 'geyser-fitting',
        title: 'Geyser Fitting & Uninstallation',
        description: 'Safe power cutoff, water tank drainage, and wall anchor mounting.',
        price: 449,
        duration: '40 mins',
        unit: 'per geyser',
        included: [
          'Heavy-duty wall hook anchor fitting',
          'Flexi-pipe braided hose connection',
          'Pressure release valve safety check'
        ]
      }
    ]
  },
  {
    id: 'painting',
    title: 'Painting & Touchup Services',
    tagline: 'Move-in wall touchups, waterproofing, accent walls & full house painting',
    iconName: 'Palette',
    rating: 4.85,
    reviewsCount: '18.9k+',
    startingPrice: 999,
    badge: 'Asian Paints Authorized Pros',
    subCategories: [
      {
        id: 'rental-moveout-touchup',
        title: 'Rental Move-Out Wall Touchup & Patching',
        description: 'Fixing nail holes, furniture scuffs, and matching paint for landlord inspection.',
        price: 1299,
        duration: '2-3 hours',
        unit: 'per 1 BHK / 2 BHK',
        popular: true,
        included: [
          'Wall putty filling for all nail holes & cracks',
          'Sanding & shade-matched paint coats',
          'Switchboard & door frame masking',
          'Zero-mess floor cloth protection'
        ]
      },
      {
        id: 'accent-wall-design',
        title: 'Single Room / Accent Wall Fresh Paint',
        description: 'Premium Royale/Lustre finish for living room accent or master bedroom.',
        price: 1899,
        duration: '3 hours',
        unit: 'per room',
        included: [
          '2 coats of premium washable emulsion',
          'Laser tape clean line edges',
          'Anti-fungal primer coat inclusion'
        ]
      },
      {
        id: 'waterproofing-patchwork',
        title: 'Waterproofing & Dampness Patch Treatment',
        description: 'Treating damp walls, paint peeling, and efflorescence before shifting.',
        price: 1499,
        duration: '2 hours',
        unit: 'per wall section',
        included: [
          'Damaged plaster scraping & wire brushing',
          'Polymer-based waterproofing membrane coat',
          'Quick-drying sealer & topcoat finish'
        ]
      },
      {
        id: 'wood-furniture-polish',
        title: 'Wooden Furniture & Door Polish',
        description: 'Melamyne/PU varnish polish for dining tables, main doors & wooden beds.',
        price: 999,
        duration: '1.5 hours',
        unit: 'per item',
        included: [
          'Fine grain sandpaper smooth buffing',
          'Stain repair & wood grain accentuation',
          'Glossy / Matt protective seal coat'
        ]
      }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical & Smart Lighting',
    tagline: 'Switchboards, fan installation, wiring check & chandelier mounting',
    iconName: 'Zap',
    rating: 4.90,
    reviewsCount: '32.1k+',
    startingPrice: 199,
    badge: 'Background-Verified Electricians',
    subCategories: [
      {
        id: 'switchboard-replacement',
        title: 'Switchboard Repair & Modular Socket Fitting',
        description: 'Replacing burnt switches, adding 16A heavy appliance power sockets.',
        price: 249,
        duration: '20 mins',
        unit: 'per switchboard',
        popular: true,
        included: [
          'FR-grade copper wiring check',
          'Earthing voltage & neutral line test',
          'Modular switch plate snap fitting'
        ]
      },
      {
        id: 'fan-chandelier-mounting',
        title: 'Ceiling Fan & Decorative Lighting Assembly',
        description: 'Downrod assembly, canopy adjustment, and heavy light fitting.',
        price: 299,
        duration: '30 mins',
        unit: 'per fixture',
        popular: true,
        included: [
          'Fan hook weight rating test',
          'Blade balance alignment to prevent wobble',
          'Regulator & wire insulation taping'
        ]
      },
      {
        id: 'inverter-battery-setup',
        title: 'Inverter & Tubular Battery Wiring Setup',
        description: 'Connecting home backup inverter to distribution board (DB) bypass switch.',
        price: 699,
        duration: '45 mins',
        unit: 'per setup',
        included: [
          'Heavy gauge battery lug crimping',
          'Petroleum jelly terminal anti-corrosion coating',
          'MCB bypass switch safety verification'
        ]
      },
      {
        id: 'smart-doorbell-lock',
        title: 'Smart Home Lock & Video Doorbell Installation',
        description: 'Fitting digital fingerprint locks, smart doorbells & Wi-Fi sync.',
        price: 799,
        duration: '50 mins',
        unit: 'per lock',
        included: [
          'Door mortise precision cutting',
          'Wi-Fi bridge pairing & app registration',
          'Emergency mechanical key test'
        ]
      }
    ]
  },
  {
    id: 'deep-cleaning',
    title: 'Deep House & Appliance Cleaning',
    tagline: 'Post-shift deep cleaning, sofa shampooing, kitchen degreasing & sanitization',
    iconName: 'Sparkles',
    rating: 4.89,
    reviewsCount: '29.8k+',
    startingPrice: 799,
    badge: 'Eco-Friendly Non-Toxic Agents',
    subCategories: [
      {
        id: 'full-home-deep-clean',
        title: 'Full House Deep Cleaning (Move-In Ready)',
        description: 'Thorough scrub-down of floors, windows, balconies, kitchen cabinets & toilets.',
        price: 3499,
        duration: '4-5 hours',
        unit: 'per 2 BHK',
        popular: true,
        included: [
          'Single-disc floor scrubbing machine pass',
          'Kitchen tile oil degreasing & cabinet wiping',
          'Bathroom descaling & hard water stain removal',
          'Balcony jet wash & cobweb removal'
        ]
      },
      {
        id: 'sofa-carpet-shampoo',
        title: 'Fabric Sofa & Carpet Vacuum Shampooing',
        description: 'Hot water extraction & fabric shampooing for dirt, pet hair, and stain removal.',
        price: 899,
        duration: '60 mins',
        unit: 'per 5-seater sofa',
        popular: true,
        included: [
          'High-power dry vacuuming for dust mites',
          'Foam injection & stain emulsification',
          'Suction extraction & fast drying prep'
        ]
      },
      {
        id: 'kitchen-degreasing',
        title: 'Kitchen Chimney & Stove Deep Degreasing',
        description: 'Removing sticky oil layers from chimney mesh, gas stove & countertops.',
        price: 999,
        duration: '90 mins',
        unit: 'per kitchen',
        included: [
          'Chimney filter baffle removal & caustic dip wash',
          'Exhaust fan blade grease removal',
          'Stainless steel polish finish'
        ]
      },
      {
        id: 'bathroom-descaling',
        title: 'Bathroom Scale & Tile Grout Whitening',
        description: 'Deep tile scrubbing, glass partition buffing, and disinfectant spray.',
        price: 699,
        duration: '45 mins',
        unit: 'per bathroom',
        included: [
          'Acid-free tile stain scrubbing',
          'Chrome tap & showerhead shine polishing',
          'Exhaust fan & window vent cleaning'
        ]
      }
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Sanitary Solutions',
    tagline: 'Tap fittings, drain unclogging, water tank cleaning & leak repairs',
    iconName: 'Droplets',
    rating: 4.87,
    reviewsCount: '15.7k+',
    startingPrice: 199,
    badge: 'Certified Master Plumbers',
    subCategories: [
      {
        id: 'tap-mixer-fitting',
        title: 'Tap, Sink & Wall Mixer Fitting',
        description: 'Replacing old taps, installing kitchen sink swan-neck faucets.',
        price: 249,
        duration: '25 mins',
        unit: 'per fitting',
        popular: true,
        included: [
          'Teflon tape seal against thread leaks',
          'Aerator mesh cleaning for high pressure',
          'Angle valve check & hot/cold line test'
        ]
      },
      {
        id: 'drain-unclogging',
        title: 'Sink & Bathroom Drain Pipe Unclogging',
        description: 'Mechanized drain snake clearing for hair, grease, and soap blockage.',
        price: 399,
        duration: '30 mins',
        unit: 'per blockage point',
        popular: true,
        included: [
          'Heavy wire auger rotation insertion',
          'P-trap cleaning & gully trap flushing',
          'Odor neutralizer flush'
        ]
      },
      {
        id: 'flush-tank-toilet-repair',
        title: 'Flush Tank Siphon & Toilet Seat Fitting',
        description: 'Fixing continuous water overflow, replacing flush push buttons.',
        price: 349,
        duration: '35 mins',
        unit: 'per toilet',
        included: [
          'Dual flush valve replacement',
          'Soft-close toilet seat cover fitting',
          'Wax ring leak seal for floor bowl'
        ]
      }
    ]
  },
  {
    id: 'pest-control',
    title: 'Pest Control & Sanitization',
    tagline: 'Cockroach gel, termite treatment, bed bug eradication & mosquito misting',
    iconName: 'ShieldAlert',
    rating: 4.91,
    reviewsCount: '21.0k+',
    startingPrice: 699,
    badge: '100% Odorless Chemical Safe',
    subCategories: [
      {
        id: 'cockroach-ant-treatment',
        title: 'Cockroach & Ant Defense Treatment',
        description: 'Odorless herbal gel baiting in kitchen cabinets, drains & corners.',
        price: 899,
        duration: '45 mins',
        unit: 'per 2 BHK',
        popular: true,
        included: [
          'Bayer gel dots in all cabinet hinges',
          'Drain chemical spray flushing',
          '3-month pest-free guarantee'
        ]
      },
      {
        id: 'bedbug-spray-service',
        title: 'Bed Bug Eradication (2-Stage Spray)',
        description: 'Intense spray treatment targeting mattress seams, bed frames & skirting boards.',
        price: 1299,
        duration: '60 mins',
        unit: 'per 2 BHK',
        included: [
          'Deep crack & crevice chemical injection',
          'Egg-killing larvicide formulation',
          'Free follow-up inspection call'
        ]
      },
      {
        id: 'termite-proofing',
        title: 'Wooden Furniture Termite Proofing',
        description: 'Drilling & chemical pressure injection into wooden frames and walls.',
        price: 1599,
        duration: '90 mins',
        unit: 'per room',
        included: [
          'Precision micro-hole drilling',
          'Imidacloprid chemical pressure pumping',
          'Wood color matching hole capping'
        ]
      }
    ]
  }
];
