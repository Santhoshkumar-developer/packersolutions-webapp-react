import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, Tag, Copy, Check, Sparkles } from 'lucide-react';

// Import all discount offer banners provided in src/assets/images/discount_offers
import offerImg1 from '../assets/images/discount_offers/1755153534-720x360(1)-1.jpg';
import offerImg2 from '../assets/images/discount_offers/1779702774-Visacard_.webp';
import offerImg3 from '../assets/images/discount_offers/1761964355-720x360.webp';
import offerImg4 from '../assets/images/discount_offers/1778045762-720X360_RBL.webp';
import offerImg5 from '../assets/images/discount_offers/1788518609-720_360(4).jpg';
import offerImg6 from '../assets/images/discount_offers/1788853004-720_360-1(1).jpg';
import offerImg7 from '../assets/images/discount_offers/1789048504-720_360.jpg';
import offerImg8 from '../assets/images/discount_offers/1755153534-720x360(1).jpg';

export interface DiscountOfferItem {
  id: string;
  image: string;
  title: string;
  code: string;
  discount: string;
  validity: string;
  description: string;
  category: 'bank' | 'festival' | 'special' | 'first-time';
}

const OFFERS_DATA: DiscountOfferItem[] = [
  {
    id: 'offer-1',
    image: offerImg1,
    title: 'Visa Cardholders Shifting Special',
    code: 'VISADC',
    discount: 'Up to ₹1,500 Off',
    validity: 'Valid on Visa Debit & Credit Cards',
    description: 'Flat 10% instant discount up to ₹1,500 on all home & vehicle relocations.',
    category: 'bank',
  },
  {
    id: 'offer-2',
    image: offerImg2,
    title: 'Visa Exclusive Relocation Benefit',
    code: 'VISAPACK',
    discount: 'Flat 12% Off',
    validity: 'Limited period offer',
    description: 'Enjoy exclusive concessions on multi-city packing and warehouse bookings with Visa.',
    category: 'bank',
  },
  {
    id: 'offer-3',
    image: offerImg3,
    title: 'Mega Relocation Savings Fest',
    code: 'MOVEFEST',
    discount: 'Up to 25% Off',
    validity: 'Valid till month end',
    description: 'Special seasonal price drops across intercity shifting, mini truck rentals, and storage.',
    category: 'festival',
  },
  {
    id: 'offer-4',
    image: offerImg4,
    title: 'RBL Bank Card Shifting Deal',
    code: 'RBLMOVE',
    discount: 'Flat ₹1,000 Off',
    validity: 'Valid on RBL Cards',
    description: 'Instant discount of ₹1,000 on minimum move order value of ₹7,500.',
    category: 'bank',
  },
  {
    id: 'offer-5',
    image: offerImg5,
    title: 'First-Time Moving Welcome Bonus',
    code: 'FIRSTMOVE',
    discount: 'Flat 15% Off',
    validity: 'On first booking',
    description: 'Book your maiden house shifting or parcel pickup with Packersolutions & save instant 15%.',
    category: 'first-time',
  },
  {
    id: 'offer-6',
    image: offerImg6,
    title: 'Smart Tuesday Shifting Express',
    code: 'ASSURED',
    discount: 'Get 20% Off',
    validity: 'Every Tuesday & Wednesday',
    description: 'Schedule your move for mid-week relocation dates and grab maximum discount rates.',
    category: 'special',
  },
  {
    id: 'offer-7',
    image: offerImg7,
    title: 'Festive Relocation Bonanza',
    code: 'UTSAV20',
    discount: '20% + 10% Off',
    validity: 'Limited festival season slots',
    description: 'Special celebratory package includes free packing material upgrades on full home shifting.',
    category: 'festival',
  },
  {
    id: 'offer-8',
    image: offerImg8,
    title: 'Long-Distance & Storage Discount',
    code: 'STORESAFE',
    discount: 'Up to 30% Off',
    validity: 'On 30+ days storage',
    description: 'Get deep savings on monthly household item warehousing and climate-controlled storage.',
    category: 'special',
  },
];

interface DiscountOffersSectionProps {
  onOpenBooking?: (serviceId?: string) => void;
  onNavigate?: (page: string) => void;
}

export const DiscountOffersSection: React.FC<DiscountOffersSectionProps> = ({
  onOpenBooking,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'bank' | 'festival' | 'special'>('all');
  const [showAllModal, setShowAllModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredOffers = activeFilter === 'all' 
    ? OFFERS_DATA 
    : OFFERS_DATA.filter(o => o.category === activeFilter || (activeFilter === 'special' && o.category === 'first-time'));

  // Update scroll navigation indicators
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredOffers.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.75, 300);
    el.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleCardClick = (offer: DiscountOfferItem) => {
    if (onOpenBooking) {
      onOpenBooking('packers-and-movers');
    }
  };

  return (
    <section 
      id="discount-offers-section"
      className="py-6 sm:py-8 md:py-10 bg-white dark:bg-slate-950 font-roboto relative overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header matching user reference image: Title on Left, "View All >" on Right */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
           <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 block font-sans">
            SPECIAL OFFERS & SAVINGS
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
            Exclusive Deals for Your Move
          </h2>
        </div>

          <button
            type="button"
            id="view-all-discount-offers-btn"
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-[#ff6200] hover:text-[#e05600] transition-colors group cursor-pointer shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Carousel Viewport with Right Arrow Navigation Button */}
        <div className="relative group/slider">
          
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              id="discount-offers-scroll-left"
              onClick={() => scroll('left')}
              aria-label="Previous offers"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </button>
          )}

          {/* Right Arrow Button matching user reference image */}
          {canScrollRight && (
            <button
              type="button"
              id="discount-offers-scroll-right"
              onClick={() => scroll('right')}
              aria-label="Next offers"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 shadow-xl border border-slate-200/90 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#ff6200]" />
            </button>
          )}

          {/* Scrollable Container with Snap */}
          <div
            ref={scrollContainerRef}
            id="discount-offers-carousel-track"
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredOffers.map((offer, index) => (
              <div
                key={offer.id}
                id={`discount-offer-card-${index}`}
                onClick={() => handleCardClick(offer)}
                className="shrink-0 w-[220px] sm:w-[250px] md:w-[270px] snap-start bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 hover:border-[#ff6200]/50 dark:hover:border-[#ff6200]/50 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
              >
                {/* Visual Banner Image matching reference design aspect ratio */}
                <div className="relative w-full aspect-[2/1] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Offer Details / Action Footer */}
                <div className="p-2.5 sm:p-3 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {offer.validity}
                    </p>
                  </div>

                  {/* Copy Promo Code Pill */}
                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(offer.code, e)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-wide transition-all cursor-pointer shrink-0 ${
                      copiedCode === offer.code
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-[#ff6200]/10 dark:bg-[#ff6200]/20 text-[#ff6200] hover:bg-[#ff6200] hover:text-white border border-[#ff6200]/30'
                    }`}
                    title="Click to copy coupon code"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 opacity-70" />
                        <span>{offer.code}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Horizontal Pill Indicator matching the red/pink bar in the user image */}
          <div className="flex justify-center items-center gap-1.5 mt-3 sm:mt-4">
            <div className="w-8 sm:w-10 h-1 sm:h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-[#ff6200] rounded-full transition-all duration-300"
                style={{
                  width: '45%',
                  transform: `translateX(${scrollProgress * 120}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          VIEW ALL OFFERS MODAL
          ======================================================== */}
      {showAllModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowAllModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  All Moving &amp; Storage Discount Offers
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Exclusive verified bank coupons and seasonal relocation deals
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: All Cards Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {OFFERS_DATA.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#ff6200]/50 transition-all flex flex-col"
                  >
                    <div className="relative aspect-[2/1] bg-slate-100 dark:bg-slate-800">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow gap-3">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {offer.title}
                          </h4>
                          <span className="text-xs font-extrabold text-[#ff6200] shrink-0 bg-[#ff6200]/10 px-2 py-0.5 rounded">
                            {offer.discount}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {offer.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] text-slate-400">
                          {offer.validity}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => handleCopyCode(offer.code, e)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wide transition-all cursor-pointer ${
                              copiedCode === offer.code
                                ? 'bg-emerald-500 text-white'
                                : 'bg-[#ff6200]/10 text-[#ff6200] hover:bg-[#ff6200] hover:text-white border border-[#ff6200]/30'
                            }`}
                          >
                            {copiedCode === offer.code ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 opacity-70" />
                                <span>{offer.code}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setShowAllModal(false);
                              if (onOpenBooking) onOpenBooking('packers-and-movers');
                            }}
                            className="text-xs font-bold text-white bg-[#001261] hover:bg-[#000d47] dark:bg-blue-600 dark:hover:bg-blue-500 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
