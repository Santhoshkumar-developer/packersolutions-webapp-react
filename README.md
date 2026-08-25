# Packer Solutions - Enterprise Logistics & Relocation Web Application

A modern, full-stack React and TypeScript application for Packers and Movers services across India.

## 📁 Project Structure

```text
packer-solutions/
├── public/                  # Static assets served directly
│   ├── images/              # Public image assets
│   ├── icons/               # SVG & icon files
│   └── robots.txt           # Search engine crawler instructions
│
├── src/
│   ├── assets/              # Static bundled assets (images, truck illustrations)
│   ├── components/          # Reusable UI & section components
│   ├── pages/               # Page-level view components
│   ├── layouts/             # Layout wrappers (Header, Footer, Navigation)
│   ├── routes/              # Routing definitions and configuration
│   ├── services/            # API services & backend communications
│   ├── hooks/               # Custom React hooks (theme, booking state)
│   ├── utils/               # Helper functions, formatters, and constants
│   ├── styles/              # Global styling & Tailwind configuration
│   ├── data/                # Static data models (services, cities, addons)
│   ├── App.tsx              # Root application component
│   └── main.tsx             # Application bootstrap entry point
│
├── .env                     # Local environment variables
├── package.json             # NPM dependencies & scripts
├── vite.config.ts           # Vite bundler configuration
└── README.md                # Project documentation
```

## 🚀 Key Features

- **Multi-Category Shifting**: House relocation, Office shifting, Truck booking, Vehicle transportation, Packing & Unpacking, Loading & Unloading, Warehousing storage, and Parcel courier.
- **Interactive Shift Price Calculator**: Real-time fare calculation based on distance, floor level, lift availability, truck sizing, and packaging materials.
- **Driver & Vehicle Partner Portal**: Dedicated onboarding registration for single drivers, fleet operators, and mini-truck owners.
- **Enterprise / B2B Relocation**: Tailored commercial and office movement solutions.
- **City-Specific SEO Landing Pages**: Targeted logistics coverage for Tier 1 and Tier 2 cities across India.
- **Live Shipment Tracking**: Track shipments and instant moving quote generators.
- **Dark Mode & Responsive UI**: Built with Tailwind CSS and responsive design.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
- **Backend / API**: Express.js (Node.js) with Google GenAI SDK integration
- **Bundler**: Vite 6, esbuild
