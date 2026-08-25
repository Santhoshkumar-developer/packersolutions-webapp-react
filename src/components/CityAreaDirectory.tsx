import React, { useState } from 'react';

interface AreaLink {
  name: string;
  cityName: string;
}

interface CityColumn {
  cityTitle: string;
  cityName: string;
  areas: string[];
}

interface DirectoryTab {
  id: string;
  label: string;
  cityColumns: CityColumn[];
}

const directoryData: DirectoryTab[] = [
  {
    id: 'house-shifting',
    label: 'House Shifting',
    cityColumns: [
      {
        cityTitle: 'House Shifting in Bangalore',
        cityName: 'Bangalore',
        areas: [
          '1 BHK House Shifting in Koramangala',
          '2 BHK House Shifting in Whitefield',
          '3 BHK House Shifting in HSR Layout',
          'Villa Relocation in Indiranagar',
          'House Shifting in Marathahalli',
          'House Shifting in Bellandur',
          'House Shifting in Electronic City',
          'House Shifting in JP Nagar',
        ],
      },
      {
        cityTitle: 'House Shifting in Mumbai',
        cityName: 'Mumbai',
        areas: [
          'House Shifting in Andheri West',
          'Flat Relocation in Bandra',
          'House Shifting in Powai',
          '1 BHK Shifting in Thane West',
          '2 BHK Shifting in Navi Mumbai',
          'House Shifting in Malad East',
          'House Shifting in Goregaon',
          'House Shifting in Kandivali',
        ],
      },
      {
        cityTitle: 'House Shifting in Chennai',
        cityName: 'Chennai',
        areas: [
          'House Shifting in Velachery',
          'Apartment Shifting in OMR',
          'House Shifting in Adyar',
          'House Shifting in Anna Nagar',
          'House Shifting in Porur',
          'House Shifting in Tambaram',
          'House Shifting in Nungambakkam',
          'House Shifting in T Nagar',
        ],
      },
      {
        cityTitle: 'House Shifting in Pune',
        cityName: 'Pune',
        areas: [
          'House Shifting in Wakad',
          'House Shifting in Hinjewadi',
          'Flat Relocation in Baner',
          'House Shifting in Kharadi',
          'House Shifting in Viman Nagar',
          'House Shifting in Hadapsar',
          'House Shifting in Bavdhan',
          'House Shifting in PCMC',
        ],
      },
      {
        cityTitle: 'House Shifting in Coimbatore',
        cityName: 'Coimbatore',
        areas: [
          'House Shifting in Peelamedu',
          'House Shifting in Saravanampatti',
          'House Shifting in RS Puram',
          'Villa Shifting in Race Course',
          'House Shifting in Vadavalli',
          'House Shifting in Kovaipudur',
          'House Shifting in Ramanathapuram',
          'House Shifting in Ganapathy',
        ],
      },
    ],
  },
  {
    id: 'office-relocation',
    label: 'Office Relocation',
    cityColumns: [
      {
        cityTitle: 'Office Moving in Bangalore',
        cityName: 'Bangalore',
        areas: [
          'Office Moving in Manyata Tech Park',
          'IT Park Relocation in Whitefield',
          'Office Shifting in Electronic City',
          'Corporate Moving in MG Road',
          'Office Relocation in Indiranagar',
          'Office Moving in Outer Ring Road',
          'Commercial Shifting in Koramangala',
          'Office Moving in Hebbal',
        ],
      },
      {
        cityTitle: 'Office Moving in Mumbai',
        cityName: 'Mumbai',
        areas: [
          'Office Relocation in BKC Bandra',
          'Corporate Shifting in Lower Parel',
          'Office Moving in Nariman Point',
          'Office Shifting in Andheri East',
          'Commercial Moving in Navi Mumbai',
          'Office Relocation in Thane West',
          'Office Moving in Goregaon East',
          'Corporate Moving in Powai',
        ],
      },
      {
        cityTitle: 'Office Moving in Chennai',
        cityName: 'Chennai',
        areas: [
          'Office Moving in Guindy Industrial Estate',
          'IT Office Shifting in OMR',
          'Office Relocation in T Nagar',
          'Commercial Moving in Nungambakkam',
          'Office Moving in Perungudi',
          'Office Shifting in Mount Road',
          'Corporate Moving in Ambattur',
          'Office Relocation in Chennai One',
        ],
      },
      {
        cityTitle: 'Office Moving in Pune',
        cityName: 'Pune',
        areas: [
          'Office Moving in Hinjewadi IT Park',
          'Office Relocation in Magarpatta',
          'Corporate Moving in Kharadi EON',
          'Office Shifting in Baner',
          'Office Moving in SB Road',
          'Commercial Shifting in Viman Nagar',
          'Office Relocation in Kalyani Nagar',
          'Office Moving in Yerwada',
        ],
      },
      {
        cityTitle: 'Office Moving in Coimbatore',
        cityName: 'Coimbatore',
        areas: [
          'Office Moving in TIDEL Park',
          'Office Relocation in Avinashi Road',
          'Corporate Moving in RS Puram',
          'Office Shifting in Peelamedu',
          'Commercial Moving in Gandhipuram',
          'Office Relocation in Eachanari',
          'Office Moving in Trichy Road',
          'Corporate Moving in Kurichi',
        ],
      },
    ],
  },
  {
    id: 'vehicle-transport',
    label: 'Vehicle Transport',
    cityColumns: [
      {
        cityTitle: 'Car & Bike Transport in Bangalore',
        cityName: 'Bangalore',
        areas: [
          'Car Transport in Koramangala',
          'Bike Transport in Whitefield',
          'Car Relocation in HSR Layout',
          'Vehicle Transport in Electronic City',
          'Car Carrier Service in Hebbal',
          'Bike Courier in Indiranagar',
          'Vehicle Shifting in Yelahanka',
          'Car Transport in Sarjapur',
        ],
      },
      {
        cityTitle: 'Car & Bike Transport in Mumbai',
        cityName: 'Mumbai',
        areas: [
          'Car Transport in Andheri',
          'Bike Relocation in Thane',
          'Car Shipping in Navi Mumbai',
          'Vehicle Shifting in Borivali',
          'Car Carrier in Malad',
          'Bike Transport in Bandra',
          'Vehicle Transport in Dadar',
          'Car Transport in Powai',
        ],
      },
      {
        cityTitle: 'Car & Bike Transport in Chennai',
        cityName: 'Chennai',
        areas: [
          'Car Transport in Velachery',
          'Bike Transport in Tambaram',
          'Car Shipping in Anna Nagar',
          'Vehicle Relocation in OMR',
          'Car Carrier Service in Porur',
          'Bike Shifting in Guindy',
          'Vehicle Transport in Chromepet',
          'Car Transport in Adyar',
        ],
      },
      {
        cityTitle: 'Car & Bike Transport in Pune',
        cityName: 'Pune',
        areas: [
          'Car Transport in Wakad',
          'Bike Transport in Hadapsar',
          'Car Carrier in Hinjewadi',
          'Vehicle Shifting in Kharadi',
          'Bike Courier in Baner',
          'Car Transport in Chinchwad',
          'Vehicle Relocation in Kothrud',
          'Car Shipping in Viman Nagar',
        ],
      },
      {
        cityTitle: 'Car & Bike Transport in Coimbatore',
        cityName: 'Coimbatore',
        areas: [
          'Car Transport in Peelamedu',
          'Bike Transport in Saravanampatti',
          'Car Relocation in RS Puram',
          'Vehicle Shifting in Gandhipuram',
          'Car Carrier in Singanallur',
          'Bike Courier in Vadavalli',
          'Vehicle Transport in Thudiyalur',
          'Car Shipping in Sulur',
        ],
      },
    ],
  },
  {
    id: 'storage-warehousing',
    label: 'Storage & Warehousing',
    cityColumns: [
      {
        cityTitle: 'Warehouse & Storage in Bangalore',
        cityName: 'Bangalore',
        areas: [
          'Luggage Storage in Whitefield',
          'Household Storage in Electronic City',
          'Warehouse Facility in Peenya',
          'Self Storage in Koramangala',
          'Goods Storage in Hebbal',
          'Furniture Storage in HSR Layout',
          'Secure Warehousing in Hosur Road',
          'Storage Units in Yelahanka',
        ],
      },
      {
        cityTitle: 'Warehouse & Storage in Mumbai',
        cityName: 'Mumbai',
        areas: [
          'Storage Facility in Thane West',
          'Household Storage in Navi Mumbai',
          'Warehouse Service in Bhiwandi',
          'Self Storage in Andheri',
          'Goods Storage in Malad',
          'Furniture Storage in Powai',
          'Short Term Storage in Chembur',
          'Warehouse Units in Panvel',
        ],
      },
      {
        cityTitle: 'Warehouse & Storage in Chennai',
        cityName: 'Chennai',
        areas: [
          'Household Storage in Velachery',
          'Warehouse Facility in Redhills',
          'Self Storage in OMR',
          'Goods Storage in Sriperumbudur',
          'Furniture Storage in Tambaram',
          'Secure Storage in Poonamallee',
          'Storage Service in Porur',
          'Warehouse Units in Madhavaram',
        ],
      },
      {
        cityTitle: 'Warehouse & Storage in Pune',
        cityName: 'Pune',
        areas: [
          'Household Storage in Wakad',
          'Warehouse Units in Chakan',
          'Self Storage in Hinjewadi',
          'Goods Storage in Hadapsar',
          'Furniture Storage in Kharadi',
          'Secure Warehousing in Wagholi',
          'Storage Service in Baner',
          'Warehouse Facility in Talegaon',
        ],
      },
      {
        cityTitle: 'Warehouse & Storage in Coimbatore',
        cityName: 'Coimbatore',
        areas: [
          'Household Storage in Peelamedu',
          'Warehouse Facility in Neelambur',
          'Self Storage in Saravanampatti',
          'Goods Storage in Malumichampatti',
          'Furniture Storage in RS Puram',
          'Storage Units in Sulur',
          'Secure Storage in Kurichi',
          'Warehouse Service in Eachanari',
        ],
      },
    ],
  },
  {
    id: 'local-moving',
    label: 'Local Moving',
    cityColumns: [
      {
        cityTitle: 'Local Shifting in Bangalore',
        cityName: 'Bangalore',
        areas: [
          'Local Packers in Koramangala',
          'Local House Shifting in Indiranagar',
          'Local Packers in HSR Layout',
          'Local Shifting in BTM Layout',
          'Local Packers in Jayanagar',
          'Local House Shifting in Whitefield',
          'Local Packers in Malleshwaram',
          'Local Shifting in Banashankari',
        ],
      },
      {
        cityTitle: 'Local Shifting in Mumbai',
        cityName: 'Mumbai',
        areas: [
          'Local Packers in Andheri',
          'Local Shifting in Bandra',
          'Local Packers in Dadar',
          'Local Shifting in Thane',
          'Local Packers in Borivali',
          'Local House Shifting in Malad',
          'Local Packers in Powai',
          'Local Shifting in Chembur',
        ],
      },
      {
        cityTitle: 'Local Shifting in Chennai',
        cityName: 'Chennai',
        areas: [
          'Local Packers in Velachery',
          'Local House Shifting in T Nagar',
          'Local Packers in Anna Nagar',
          'Local Shifting in Adyar',
          'Local Packers in Mylapore',
          'Local House Shifting in Porur',
          'Local Packers in Tambaram',
          'Local Shifting in OMR',
        ],
      },
      {
        cityTitle: 'Local Shifting in Pune',
        cityName: 'Pune',
        areas: [
          'Local Packers in Kothrud',
          'Local House Shifting in Wakad',
          'Local Packers in Baner',
          'Local Shifting in Hadapsar',
          'Local Packers in Aundh',
          'Local House Shifting in Viman Nagar',
          'Local Packers in Deccan',
          'Local Shifting in Sinhagad Road',
        ],
      },
      {
        cityTitle: 'Local Shifting in Coimbatore',
        cityName: 'Coimbatore',
        areas: [
          'Local Packers in RS Puram',
          'Local House Shifting in Peelamedu',
          'Local Packers in Gandhipuram',
          'Local Shifting in Saibaba Colony',
          'Local Packers in Vadavalli',
          'Local House Shifting in Saravanampatti',
          'Local Packers in Singanallur',
          'Local Shifting in Ramanathapuram',
        ],
      },
    ],
  },
];

interface CityAreaDirectoryProps {
  onSelectArea?: (cityName: string, areaName: string) => void;
}

export const CityAreaDirectory: React.FC<CityAreaDirectoryProps> = ({ onSelectArea }) => {
  const [activeTabId, setActiveTabId] = useState<string>(directoryData[0]?.id || 'house-shifting');

  const activeTabData = directoryData.find((tab) => tab.id === activeTabId) || directoryData[0];

  const handleLinkClick = (cityName: string, areaName: string) => {
    if (onSelectArea) {
      onSelectArea(cityName, areaName);
    } else {
      // Scroll smoothly to quote / contact form or show quick feedback
      const quoteElement = document.getElementById('quick-quote');
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="city-area-directory" className="w-full bg-slate-50 dark:bg-slate-950 border-t border-b border-slate-200/80 dark:border-slate-800 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Header */}
        <div className="mb-6 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
            EXPLORE LOCALITIES & SERVICES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Packers and Movers Service Areas
          </h2>
        </div>

        {/* Top Navigation Tabs Row (Matching screenshot styling: light neutral tabs row) */}
        <div className="overflow-x-auto scrollbar-none mb-8 bg-slate-200/70 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300/60 dark:border-slate-800">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {directoryData.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Column Grid Layout matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-2">
          {activeTabData.cityColumns.map((col, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              {/* Column Header */}
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 pb-1 border-b border-slate-200 dark:border-slate-800">
                {col.cityTitle}
              </h3>

              {/* Area Links List */}
              <ul className="space-y-1.5 pt-1">
                {col.areas.map((area, areaIdx) => (
                  <li key={areaIdx}>
                    <button
                      onClick={() => handleLinkClick(col.cityName, area)}
                      className="text-xs text-slate-600 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 text-left transition-colors font-normal sm:font-medium leading-relaxed block cursor-pointer hover:underline"
                    >
                      {area}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
