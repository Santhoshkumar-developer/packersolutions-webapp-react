import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Truck, 
  Radio, 
  Layers, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface BrandedCoverageMapProps {
  selectedCity: string;
  onSelectCity: (cityName: string) => void;
  onOpenBooking: (serviceId: string, city: string) => void;
}

interface MapCityNode {
  id: string;
  name: string;
  x: number; // percentage left (0 - 100)
  y: number; // percentage top (0 - 100)
  coords: string;
  hubType: string;
  fleetCount: number;
  coverageRadiusKm: number;
  avgDispatchMins: number;
  isMajorMetro?: boolean;
}

const CITY_MAP_NODES: MapCityNode[] = [
  { id: 'delhi', name: 'Delhi', x: 38, y: 23, coords: '28.6139° N, 77.2090° E', hubType: 'National Capital Hub', fleetCount: 110, coverageRadiusKm: 85, avgDispatchMins: 15, isMajorMetro: true },
  { id: 'ludhiana', name: 'Ludhiana', x: 34, y: 15, coords: '30.9010° N, 75.8573° E', hubType: 'Punjab Freight Hub', fleetCount: 22, coverageRadiusKm: 45, avgDispatchMins: 25 },
  { id: 'chandigarh', name: 'Chandigarh', x: 36, y: 17, coords: '30.7333° N, 76.7794° E', hubType: 'Northern Express Depot', fleetCount: 28, coverageRadiusKm: 50, avgDispatchMins: 20 },
  { id: 'jaipur', name: 'Jaipur', x: 32, y: 31, coords: '26.9124° N, 75.7873° E', hubType: 'Heritage Corridor Base', fleetCount: 35, coverageRadiusKm: 60, avgDispatchMins: 20 },
  { id: 'lucknow', name: 'Lucknow', x: 52, y: 28, coords: '26.8467° N, 80.9462° E', hubType: 'Avadh Regional Depot', fleetCount: 32, coverageRadiusKm: 55, avgDispatchMins: 22 },
  { id: 'kanpur', name: 'Kanpur', x: 50, y: 32, coords: '26.4499° N, 80.3319° E', hubType: 'Ganga Valley Unit', fleetCount: 24, coverageRadiusKm: 40, avgDispatchMins: 25 },
  { id: 'ahmedabad', name: 'Ahmedabad', x: 22, y: 44, coords: '23.0225° N, 72.5714° E', hubType: 'Western Commercial Base', fleetCount: 45, coverageRadiusKm: 70, avgDispatchMins: 18, isMajorMetro: true },
  { id: 'vadodara', name: 'Vadodara', x: 23, y: 48, coords: '22.3072° N, 73.1812° E', hubType: 'Central Gujarat Depot', fleetCount: 20, coverageRadiusKm: 40, avgDispatchMins: 22 },
  { id: 'surat', name: 'Surat', x: 22, y: 52, coords: '21.1702° N, 72.8311° E', hubType: 'Textile Corridor Base', fleetCount: 30, coverageRadiusKm: 50, avgDispatchMins: 20 },
  { id: 'indore', name: 'Indore', x: 34, y: 45, coords: '22.7196° N, 75.8577° E', hubType: 'Central Logistics Base', fleetCount: 26, coverageRadiusKm: 50, avgDispatchMins: 22 },
  { id: 'nagpur', name: 'Nagpur', x: 47, y: 48, coords: '21.1458° N, 79.0882° E', hubType: 'Zero Mile Transit Hub', fleetCount: 38, coverageRadiusKm: 65, avgDispatchMins: 18 },
  { id: 'mumbai', name: 'Mumbai', x: 23, y: 60, coords: '19.0760° N, 72.8777° E', hubType: 'Financial Capital Base', fleetCount: 94, coverageRadiusKm: 90, avgDispatchMins: 15, isMajorMetro: true },
  { id: 'nashik', name: 'Nashik', x: 26, y: 55, coords: '20.0059° N, 73.7898° E', hubType: 'North Maharashtra Unit', fleetCount: 22, coverageRadiusKm: 45, avgDispatchMins: 24 },
  { id: 'pune', name: 'Pune', x: 27, y: 63, coords: '18.5204° N, 73.8567° E', hubType: 'IT & Industrial Division', fleetCount: 48, coverageRadiusKm: 65, avgDispatchMins: 18 },
  { id: 'hyderabad', name: 'Hyderabad', x: 45, y: 64, coords: '17.3850° N, 78.4867° E', hubType: 'Deccan Cargo Base', fleetCount: 62, coverageRadiusKm: 75, avgDispatchMins: 18, isMajorMetro: true },
  { id: 'visakhapatnam', name: 'Visakhapatnam', x: 60, y: 62, coords: '17.6868° N, 83.2185° E', hubType: 'East Coast Terminal', fleetCount: 25, coverageRadiusKm: 50, avgDispatchMins: 22 },
  { id: 'kolkata', name: 'Kolkata', x: 74, y: 48, coords: '22.5726° N, 88.3639° E', hubType: 'Eastern Gateway Terminal', fleetCount: 58, coverageRadiusKm: 75, avgDispatchMins: 20, isMajorMetro: true },
  { id: 'bangalore', name: 'Bangalore', x: 40, y: 78, coords: '12.9716° N, 77.5946° E', hubType: 'Silicon Valley Mega Vault', fleetCount: 82, coverageRadiusKm: 95, avgDispatchMins: 12, isMajorMetro: true },
  { id: 'mysore', name: 'Mysore', x: 37, y: 82, coords: '12.2958° N, 76.6394° E', hubType: 'Southern Heritage Hub', fleetCount: 18, coverageRadiusKm: 40, avgDispatchMins: 20 },
  { id: 'chennai', name: 'Chennai', x: 52, y: 80, coords: '13.0827° N, 80.2707° E', hubType: 'Port City Logistics Hub', fleetCount: 56, coverageRadiusKm: 70, avgDispatchMins: 18, isMajorMetro: true },
  { id: 'coimbatore', name: 'Coimbatore', x: 38, y: 86, coords: '11.0168° N, 76.9558° E', hubType: 'Textile Belt Division', fleetCount: 25, coverageRadiusKm: 45, avgDispatchMins: 22 },
  { id: 'kochi', name: 'Kochi', x: 37, y: 90, coords: '9.9312° N, 76.2673° E', hubType: 'Coastal Shipping Hub', fleetCount: 28, coverageRadiusKm: 50, avgDispatchMins: 20 },
  { id: 'trivandrum', name: 'Trivandrum', x: 39, y: 94, coords: '8.5241° N, 76.9366° E', hubType: 'Southern Terminal', fleetCount: 20, coverageRadiusKm: 40, avgDispatchMins: 25 },
];

export const BrandedCoverageMap: React.FC<BrandedCoverageMapProps> = ({
  selectedCity,
  onSelectCity,
  onOpenBooking,
}) => {
  const [showRoutes, setShowRoutes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [mapZoom, setMapZoom] = useState(false);

  // Find selected node or default to Bangalore
  const selectedNode = CITY_MAP_NODES.find(
    n => n.name.toLowerCase() === selectedCity.toLowerCase()
  ) || CITY_MAP_NODES.find(n => n.id === 'bangalore') || CITY_MAP_NODES[0];

  // Major metro connections to draw express transit lines
  const metroHubs = CITY_MAP_NODES.filter(n => n.isMajorMetro);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden font-sans transition-colors duration-200">
      
      {/* ==================== MAP HEADER & TOGGLES ==================== */}
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-orange-500 animate-pulse" />
              Live GIS Radar Network
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              24/7 Satellite Corridor Feed
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Interactive Operational Coverage Map
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Visualizing real-time hub status, transit express corridors, and local delivery zones across India.
          </p>
        </div>

        {/* Interactive Map Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              showRoutes 
                ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-600 dark:text-orange-400 shadow-xs' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Transit Lines</span>
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              showHeatmap 
                ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-600 dark:text-orange-400 shadow-xs' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Coverage Zone</span>
          </button>

          <button
            onClick={() => setMapZoom(!mapZoom)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              mapZoom 
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-orange-500 dark:border-orange-500' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{mapZoom ? 'Reset View' : 'Focus Active Hub'}</span>
          </button>
        </div>
      </div>

      {/* ==================== MAP CANVAS AREA ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[500px] bg-slate-950 text-white overflow-hidden">
        
        {/* MAP STYLED GRAPHIC CONTAINER */}
        <div className={`lg:col-span-8 relative w-full h-[450px] sm:h-[550px] bg-slate-950 p-4 sm:p-6 overflow-hidden transition-transform duration-500 ${
          mapZoom ? 'scale-105 origin-center' : 'scale-100'
        }`}>
          
          {/* Subtle Grid and Topo Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-950 to-slate-950 pointer-events-none" />

          {/* Latitude & Longitude Labels */}
          <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-600 select-none">35.0000° N LATITUDE</div>
          <div className="absolute bottom-2 left-4 text-[9px] font-mono text-slate-600 select-none">8.0000° N LATITUDE</div>
          <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-600 select-none">88.0000° E LONGITUDE</div>

          {/* Compass Rose Badge */}
          <div className="absolute top-4 right-4 bg-slate-900/80 border border-slate-800 backdrop-blur-md p-2 rounded-xl text-center select-none z-20">
            <span className="text-[10px] font-mono font-bold text-orange-400 block">N</span>
            <div className="w-3 h-3 border-t-2 border-r-2 border-orange-500 rotate-45 mx-auto my-0.5" />
            <span className="text-[8px] font-mono text-slate-500 block">GIS-4</span>
          </div>

          {/* SVG Express Transit Vector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Transit Route Vectors between Metro Hubs */}
            {showRoutes && metroHubs.map((mHub, idx) => {
              if (mHub.id === selectedNode.id) return null;
              return (
                <g key={`route-${mHub.id}-${idx}`}>
                  <line 
                    x1={`${selectedNode.x}%`} 
                    y1={`${selectedNode.y}%`} 
                    x2={`${mHub.x}%`} 
                    y2={`${mHub.y}%`} 
                    stroke="url(#routeGrad)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                    className="animate-[dash_20s_linear_infinite]"
                  />
                  {/* Pulse Dot along line */}
                  <circle 
                    r="2.5" 
                    fill="#f97316" 
                    filter="url(#glow)"
                  >
                    <animateMotion 
                      path={`M ${(selectedNode.x / 100) * 800} ${(selectedNode.y / 100) * 550} L ${(mHub.x / 100) * 800} ${(mHub.y / 100) * 550}`}
                      dur={`${3 + idx}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Coverage Radial Zone Overlay around Selected Node */}
          {showHeatmap && (
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-700 z-10"
              style={{
                left: `${selectedNode.x}%`,
                top: `${selectedNode.y}%`,
                width: `${selectedNode.coverageRadiusKm * 2.2}px`,
                height: `${selectedNode.coverageRadiusKm * 2.2}px`,
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(249, 115, 22, 0.08) 50%, rgba(249, 115, 22, 0) 70%)',
                border: '1px stroke rgba(249, 115, 22, 0.3)',
              }}
            >
              <div className="w-full h-full rounded-full border border-orange-500/30 animate-ping opacity-25" />
            </div>
          )}

          {/* Render All City Pins */}
          {CITY_MAP_NODES.map((node) => {
            const isSelected = node.id === selectedNode.id || node.name.toLowerCase() === selectedCity.toLowerCase();

            return (
              <div 
                key={node.id}
                onClick={() => onSelectCity(node.name)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 ${
                  isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-125'
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Custom Branded Pin for Selected City */}
                {isSelected ? (
                  <div className="relative flex flex-col items-center">
                    
                    {/* Pulsing Signal Radar Rings */}
                    <div className="absolute -inset-4 rounded-full bg-orange-500/20 animate-ping pointer-events-none" />
                    <div className="absolute -inset-8 rounded-full bg-orange-500/10 animate-pulse pointer-events-none" />

                    {/* Floating Callout Badge */}
                    <div className="mb-2 bg-slate-900/95 border border-orange-500/80 text-white rounded-2xl px-3 py-1.5 shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce whitespace-nowrap z-40">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-left">
                        <span className="text-[10px] font-extrabold text-orange-400 block leading-none">{node.name} Hub</span>
                        <span className="text-[9px] font-mono text-slate-300 block">{node.fleetCount} Active Trucks</span>
                      </div>
                    </div>

                    {/* Primary Branded Marker Pin Container */}
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 p-0.5 shadow-2xl ring-4 ring-orange-500/30 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Truck className="w-5 h-5 text-orange-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Pin Needle Anchor */}
                    <div className="w-2 h-3 bg-gradient-to-b from-orange-500 to-transparent clip-path-triangle -mt-0.5" />
                    <div className="w-4 h-1.5 bg-orange-500/40 rounded-full blur-[1px] mt-0.5" />

                  </div>
                ) : (
                  /* Standard City Marker Pin */
                  <div className="relative flex items-center justify-center group-hover:z-30">
                    <div className={`rounded-full transition-all flex items-center justify-center ${
                      node.isMajorMetro 
                        ? 'w-4 h-4 bg-slate-800 border-2 border-orange-400/80 shadow-md' 
                        : 'w-2.5 h-2.5 bg-slate-600 border border-slate-400'
                    }`}>
                      {node.isMajorMetro && <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
                    </div>

                    {/* Hover City Name Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap z-40">
                      {node.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Map Overlay Footer Legend */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 backdrop-blur-md p-3 rounded-2xl z-20 text-[11px]">
            <div className="flex items-center gap-4 text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 border border-white/20" />
                <strong className="text-white">Active Selected Hub</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-orange-400" />
                Major Metro Nodes
              </span>
              <span className="flex items-center gap-1.5 hidden sm:inline-flex">
                <span className="w-6 h-0.5 bg-orange-500/80 border-t border-dashed border-orange-300" />
                Express Highway Corridors
              </span>
            </div>

            <span className="text-[10px] font-mono text-orange-400 font-semibold bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg">
              GPS Verified Coverage: 100%
            </span>
          </div>

        </div>

        {/* ==================== SELECTED HUB DETAILS SIDE PANEL ==================== */}
        <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block font-bold">
                HUB SPECIFICATIONS
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-6 h-6 text-orange-500 shrink-0" />
                {selectedNode.name} Hub
              </h4>
              <p className="text-xs text-orange-400 font-mono mt-1">
                {selectedNode.coords}
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Hub Designation:</span>
                <span className="font-semibold text-slate-200">{selectedNode.hubType}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Active Container Fleet:</span>
                <span className="font-bold text-orange-400 font-mono">{selectedNode.fleetCount} GPS Vehicles</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Local Delivery Radius:</span>
                <span className="font-semibold text-slate-200">{selectedNode.coverageRadiusKm} km Radius</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Avg Crew Dispatch:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedNode.avgDispatchMins} Mins
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Operational Highlights</span>
              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>IBA Certified Carrier with local warehousing facility</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time GPS consignment tracking & automated SMS updates</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Door-to-door full packing, loading & unpacking support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => onOpenBooking('packers-and-movers', selectedNode.name)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Book Shifting in {selectedNode.name}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Zero booking fees • Instant digitized price calculation
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
