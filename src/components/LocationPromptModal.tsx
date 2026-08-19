import React, { useState } from 'react';
import { MapPin, Navigation, Search, CheckCircle2, X, Compass, Building2, Sparkles, AlertCircle } from 'lucide-react';
import { CITIES_DATA } from '../data/cities';

interface LocationPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

// Major cities list with badges and landmarks
const POPULAR_CITIES = [
  { name: 'Bangalore', tag: 'HQ Hub', state: 'Karnataka', code: 'BLR' },
  { name: 'Chennai', tag: 'Regional Hub', state: 'Tamil Nadu', code: 'MAA' },
  { name: 'Coimbatore', tag: 'Zonal Hub', state: 'Tamil Nadu', code: 'CJB' },
  { name: 'Mumbai', tag: 'Financial Hub', state: 'Maharashtra', code: 'BOM' },
  { name: 'Pune', tag: 'Tech Hub', state: 'Maharashtra', code: 'PNQ' },
  { name: 'Delhi NCR', tag: 'Capital Zone', state: 'Delhi', code: 'DEL' },
  { name: 'Hyderabad', tag: 'Cyber Zone', state: 'Telangana', code: 'HYD' },
  { name: 'Mysore', tag: 'Heritage Hub', state: 'Karnataka', code: 'MYQ' },
  { name: 'Kochi', tag: 'Coastal Hub', state: 'Kerala', code: 'COK' },
];

export const LocationPromptModal: React.FC<LocationPromptModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState<string | null>(null);
  const [detectionError, setDetectionError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleCityChoose = (cityName: string) => {
    onSelectCity(cityName);
    try {
      localStorage.setItem('ps_user_city', cityName);
      localStorage.setItem('ps_location_set', 'true');
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
    onClose();
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setDetectionError(null);
    setDetectionMessage('Requesting GPS location access...');

    if (!navigator.geolocation) {
      setIsDetecting(false);
      setDetectionError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDetectionMessage('Finding closest service hub...');

        // Approximate geographic matching for Indian regions
        let matchedCity = 'Bangalore'; // default fallback

        if (latitude >= 12.5 && latitude <= 13.5 && longitude >= 77.3 && longitude <= 78.0) {
          matchedCity = 'Bangalore';
        } else if (latitude >= 12.8 && latitude <= 13.3 && longitude >= 79.8 && longitude <= 80.5) {
          matchedCity = 'Chennai';
        } else if (latitude >= 10.8 && latitude <= 11.2 && longitude >= 76.8 && longitude <= 77.2) {
          matchedCity = 'Coimbatore';
        } else if (latitude >= 18.8 && latitude <= 19.3 && longitude >= 72.7 && longitude <= 73.2) {
          matchedCity = 'Mumbai';
        } else if (latitude >= 18.3 && latitude <= 18.7 && longitude >= 73.7 && longitude <= 74.0) {
          matchedCity = 'Pune';
        } else if (latitude >= 28.2 && latitude <= 28.9 && longitude >= 76.8 && longitude <= 77.5) {
          matchedCity = 'Delhi NCR';
        } else if (latitude >= 17.1 && latitude <= 17.6 && longitude >= 78.2 && longitude <= 78.6) {
          matchedCity = 'Hyderabad';
        } else if (latitude >= 12.1 && latitude <= 12.5 && longitude >= 76.5 && longitude <= 76.8) {
          matchedCity = 'Mysore';
        } else if (latitude >= 9.8 && latitude <= 10.2 && longitude >= 76.1 && longitude <= 76.4) {
          matchedCity = 'Kochi';
        } else if (latitude < 14.0 && longitude < 78.0) {
          matchedCity = 'Bangalore';
        } else if (latitude < 14.0 && longitude >= 78.0) {
          matchedCity = 'Chennai';
        } else if (latitude >= 14.0 && latitude < 22.0) {
          matchedCity = 'Mumbai';
        } else {
          matchedCity = 'Delhi NCR';
        }

        setTimeout(() => {
          setIsDetecting(false);
          setDetectionMessage(`Location detected: ${matchedCity}`);
          handleCityChoose(matchedCity);
        }, 600);
      },
      (error) => {
        setIsDetecting(false);
        if (error.code === error.PERMISSION_DENIED) {
          setDetectionError('Location access was denied. Please select your city manually below.');
        } else {
          setDetectionError('Unable to retrieve location automatically. Please choose your city.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const filteredCities = CITIES_DATA.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
              <MapPin className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-100 block">
                Packer Solutions Network
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Select Your Location
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close location modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Detect Location CTA Card */}
          <div className="bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-blue-50/50 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/90 rounded-2xl p-4 sm:p-5 border border-orange-200/60 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Automatic GPS Detection
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 leading-relaxed">
                  Allow location access to instantly find your nearest Packer Solutions branch and available vehicles.
                </p>
                {detectionMessage && (
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-1 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 animate-pulse" /> {detectionMessage}
                  </p>
                )}
                {detectionError && (
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {detectionError}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleDetectLocation}
              disabled={isDetecting}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
            >
              <Navigation className="w-4 h-4" />
              <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
            </button>
          </div>

          {/* Search Input */}
          <div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city name (e.g. Bangalore, Chennai, Mumbai)..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Popular Hubs Grid */}
          {!searchQuery && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-500" /> Major Service Hubs
                </span>
                <span className="text-[11px] font-semibold text-slate-400">100% Doorstep Coverage</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {POPULAR_CITIES.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                  return (
                    <button
                      key={city.name}
                      onClick={() => handleCityChoose(city.name)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 dark:border-orange-500 shadow-xs'
                          : 'bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {city.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                          {city.state}
                        </span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                          {city.code}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Filtered Results */}
          {searchQuery && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                All Matching Cities ({filteredCities.length})
              </span>
              <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                {filteredCities.map((c) => {
                  const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCityChoose(c.name)}
                      className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-bold flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                        isSelected ? 'text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-950/20' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{c.name}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                    </button>
                  );
                })}
                {filteredCities.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-400 font-medium">
                    No city found matching "{searchQuery}". You can select any major hub above.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Selected:</span>
            <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800">
              {selectedCity}
            </span>
          </div>

          <button
            onClick={() => handleCityChoose(selectedCity)}
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            Confirm & Continue
          </button>
        </div>

      </div>
    </div>
  );
};
