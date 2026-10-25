import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Check,
  X,
  Eye,
  Package,
  Sofa,
  Bed,
  Tv,
  Refrigerator,
  Layers,
  Boxes,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Info,
  Calendar,
  Clock,
  MapPin,
  CircleDot,
  ArrowRight,
} from "lucide-react";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  subtext?: string;
  isPopular?: boolean;
}

export interface SelectedItem {
  item: InventoryItem;
  quantity: number;
}

interface InventorySelectionScreenProps {
  bookingData: {
    ticketId?: string;
    pickupAddress: string;
    dropAddress: string;
    pickupDate: string;
    pickupSlot: string;
    serviceName?: string;
    houseSize?: string;
    basePrice?: number;
  };
  initialSelectedItems?: SelectedItem[];
  onBackToDateTime: () => void;
  onProceedToConfirmation: (
    selectedItems: SelectedItem[],
    notes?: string,
  ) => void;
}

// Initial Standard Relocation Inventory Catalog
const INVENTORY_CATALOG: InventoryItem[] = [
  // Living Room
  {
    id: "sofa-3",
    name: "3 Seater Sofa",
    category: "Living Room",
    subtext: "Fabric / Leatherette",
    isPopular: true,
  },
  {
    id: "sofa-2",
    name: "2 Seater Sofa / Loveseat",
    category: "Living Room",
    subtext: "Fabric / Leatherette",
  },
  {
    id: "sofa-1",
    name: "1 Seater Recliner / Armchair",
    category: "Living Room",
    subtext: "Single Recliner",
  },
  {
    id: "coffee-table",
    name: "Center / Coffee Table",
    category: "Living Room",
    subtext: "Glass / Wooden Top",
    isPopular: true,
  },
  {
    id: "tv-unit",
    name: "TV Entertainment Unit",
    category: "Living Room",
    subtext: "Wall Mount / Floor Cabinet",
  },
  {
    id: "bookshelf",
    name: "Bookshelf / Display Rack",
    category: "Living Room",
    subtext: "Multi-tier storage",
  },
  {
    id: "carpet",
    name: "Carpet / Large Living Rug",
    category: "Living Room",
    subtext: "Rolled & Wrapped",
  },

  // Bedroom
  {
    id: "bed-king",
    name: "King Size Bed with Mattress",
    category: "Bedroom",
    subtext: "Disassembly & Reassembly included",
    isPopular: true,
  },
  {
    id: "bed-queen",
    name: "Queen Size Bed with Mattress",
    category: "Bedroom",
    subtext: "Disassembly & Reassembly included",
    isPopular: true,
  },
  {
    id: "bed-single",
    name: "Single Bed with Mattress",
    category: "Bedroom",
    subtext: "Metal / Wood frame",
  },
  {
    id: "wardrobe-3",
    name: "3-Door Wardrobe",
    category: "Bedroom",
    subtext: "Large Cupboard",
    isPopular: true,
  },
  {
    id: "wardrobe-2",
    name: "2-Door Wardrobe",
    category: "Bedroom",
    subtext: "Medium Cupboard",
  },
  {
    id: "dressing-table",
    name: "Dressing Table with Mirror",
    category: "Bedroom",
    subtext: "Protective Bubble Foam Wrap",
  },
  {
    id: "bedside-table",
    name: "Bedside Nightstand",
    category: "Bedroom",
    subtext: "Single Drawer unit",
  },

  // Kitchen & Dining
  {
    id: "fridge-double",
    name: "Double Door Refrigerator",
    category: "Kitchen & Dining",
    subtext: "250L - 450L Frost Free",
    isPopular: true,
  },
  {
    id: "fridge-single",
    name: "Single Door Refrigerator",
    category: "Kitchen & Dining",
    subtext: "180L - 220L Direct Cool",
  },
  {
    id: "dining-4",
    name: "4-Seater Dining Table & Chairs",
    category: "Kitchen & Dining",
    subtext: "Table with 4 dining chairs",
    isPopular: true,
  },
  {
    id: "dining-6",
    name: "6-Seater Dining Table & Chairs",
    category: "Kitchen & Dining",
    subtext: "Large dining set",
  },
  {
    id: "microwave",
    name: "Microwave / OTG",
    category: "Kitchen & Dining",
    subtext: "Bubble & corrugated packaging",
  },
  {
    id: "water-purifier",
    name: "Water Purifier (RO/UV)",
    category: "Kitchen & Dining",
    subtext: "Wall mounted unit",
  },
  {
    id: "gas-stove",
    name: "Gas Stove & LPG Cylinder",
    category: "Kitchen & Dining",
    subtext: "2/3/4 Burner cooktop",
  },
  {
    id: "crockery-box",
    name: "Fragile Crockery Box",
    category: "Kitchen & Dining",
    subtext: "5-Ply Multi-layer packed",
    isPopular: true,
  },

  // Electronics & Appliances
  {
    id: "tv-55",
    name: '55" - 65" Smart LED TV',
    category: "Electronics",
    subtext: "Wooden crate & foam screen protector",
    isPopular: true,
  },
  {
    id: "tv-43",
    name: '32" - 43" LED TV',
    category: "Electronics",
    subtext: "Heavy foam casing",
  },
  {
    id: "washing-front",
    name: "Front Load Washing Machine",
    category: "Electronics",
    subtext: "Drum transit bolts & wrap",
    isPopular: true,
  },
  {
    id: "washing-top",
    name: "Top Load Washing Machine",
    category: "Electronics",
    subtext: "Heavy duty wrapping",
  },
  {
    id: "ac-split",
    name: "Split Air Conditioner (1.5T)",
    category: "Electronics",
    subtext: "Indoor unit + Outdoor unit",
  },
  {
    id: "ac-window",
    name: "Window AC (1.5T)",
    category: "Electronics",
    subtext: "Single heavy unit",
  },
  {
    id: "inverter",
    name: "Home Inverter + Battery",
    category: "Electronics",
    subtext: "Heavy lead battery unit",
  },
  {
    id: "desktop-pc",
    name: "Desktop PC / Dual Monitors",
    category: "Electronics",
    subtext: "Antistatic packaging",
  },

  // Boxes & Luggage
  {
    id: "box-large",
    name: "Large Carton Box (24x18x18)",
    category: "Boxes & Luggage",
    subtext: "Clothes, bedsheets, blankets",
    isPopular: true,
  },
  {
    id: "box-medium",
    name: "Medium Carton Box (18x14x14)",
    category: "Boxes & Luggage",
    subtext: "Books, documents, toys",
    isPopular: true,
  },
  {
    id: "luggage-large",
    name: "Large Suitcase / Trolley Bag",
    category: "Boxes & Luggage",
    subtext: "Hard/Soft luggage",
  },
];

const CATEGORIES = [
  "All Items",
  "Living Room",
  "Bedroom",
  "Kitchen & Dining",
  "Electronics",
  "Boxes & Luggage",
];

export const InventorySelectionScreen: React.FC<
  InventorySelectionScreenProps
> = ({
  bookingData,
  initialSelectedItems = [],
  onBackToDateTime,
  onProceedToConfirmation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  // Quantities state
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (initialSelectedItems && initialSelectedItems.length > 0) {
      initialSelectedItems.forEach((item) => {
        initial[item.item.id] = item.quantity;
      });
    } else {
      // Default pre-populated items based on house size for convenience
      const houseSize = (bookingData.houseSize || "").toLowerCase();
      if (houseSize.includes("3") || houseSize.includes("4")) {
        initial["sofa-3"] = 1;
        initial["bed-king"] = 2;
        initial["wardrobe-3"] = 2;
        initial["fridge-double"] = 1;
        initial["tv-55"] = 1;
        initial["washing-front"] = 1;
        initial["dining-6"] = 1;
        initial["box-large"] = 8;
        initial["box-medium"] = 10;
      } else if (houseSize.includes("1") || houseSize.includes("rk")) {
        initial["bed-single"] = 1;
        initial["fridge-single"] = 1;
        initial["tv-43"] = 1;
        initial["box-large"] = 4;
        initial["box-medium"] = 4;
      } else {
        // Standard 2 BHK default
        initial["sofa-3"] = 1;
        initial["coffee-table"] = 1;
        initial["bed-king"] = 1;
        initial["bed-queen"] = 1;
        initial["wardrobe-3"] = 1;
        initial["fridge-double"] = 1;
        initial["dining-4"] = 1;
        initial["tv-55"] = 1;
        initial["washing-front"] = 1;
        initial["box-large"] = 6;
        initial["box-medium"] = 6;
      }
    }
    return initial;
  });

  const [customItems, setCustomItems] = useState<InventoryItem[]>([]);
  const [isAddingCustomItem, setIsAddingCustomItem] = useState(false);
  const [customItemName, setCustomItemName] = useState("");
  const [customItemCategory, setCustomItemCategory] = useState("Living Room");
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("");

  // Combined Catalog
  const fullCatalog = useMemo(() => {
    return [...customItems, ...INVENTORY_CATALOG];
  }, [customItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return fullCatalog.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtext &&
          item.subtext.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All Items" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [fullCatalog, searchQuery, selectedCategory]);

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: current - 1,
      };
    });
  };

  const handleRemoveItem = (id: string) => {
    setQuantities((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleAddCustomItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    const newId = `custom-${Date.now()}`;
    const newItem: InventoryItem = {
      id: newId,
      name: customItemName.trim(),
      category: customItemCategory,
      subtext: "Custom added item",
    };

    setCustomItems((prev) => [newItem, ...prev]);
    setQuantities((prev) => ({ ...prev, [newId]: 1 }));
    setCustomItemName("");
    setIsAddingCustomItem(false);
  };

  // Build current selected items list
  const selectedItemsList: SelectedItem[] = useMemo(() => {
    return Object.entries(quantities)
      .filter(([_, qty]) => typeof qty === "number" && qty > 0)
      .map(([id, qty]) => {
        const item = fullCatalog.find((i) => i.id === id) || {
          id,
          name: "Custom Item",
          category: "Miscellaneous",
        };
        return { item, quantity: qty as number };
      });
  }, [quantities, fullCatalog]);

  const totalQuantity = useMemo(() => {
    return Object.values(quantities).reduce(
      (acc: number, curr: number) => acc + (curr || 0),
      0,
    );
  }, [quantities]);

  const handleProceed = () => {
    onProceedToConfirmation(selectedItemsList, specialNotes);
  };

  return (
    <div
      id="inventory-selection-screen"
      className="w-full max-w-5xl mx-auto font-sans text-left animate-in fade-in duration-200 pb-24"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6 transition-all">
        {/* Compact Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <button
              id="btn-back-to-datetime-slot"
              type="button"
              onClick={onBackToDateTime}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Back to Step 1"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  Step 2 of 4: Inventory Selection
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">
                  {bookingData.houseSize || "2 BHK"}
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Select Items to Move
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 font-bold">
            <span>{totalQuantity} Items</span>
          </div>
        </div>

        {/* Compact Search & Filter Toolbar */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="inventory-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items (Sofa, Bed, Fridge, TV, Dining Table, Boxes)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="sm:col-span-4 flex items-center justify-end">
            <button
              id="btn-open-custom-item"
              type="button"
              onClick={() => setIsAddingCustomItem(!isAddingCustomItem)}
              className="w-full sm:w-auto px-3 py-2 bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 hover:bg-orange-100 border border-orange-200 dark:border-orange-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Item</span>
            </button>
          </div>
        </div>

        {/* Inline Add Custom Item Form */}
        {isAddingCustomItem && (
          <form
            onSubmit={handleAddCustomItemSubmit}
            className="mt-2.5 p-2.5 bg-orange-50/60 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-900 flex flex-wrap items-center gap-2 animate-in fade-in duration-150"
          >
            <input
              type="text"
              value={customItemName}
              onChange={(e) => setCustomItemName(e.target.value)}
              placeholder="Enter item name (e.g. Exercise Bike, Fish Tank)..."
              className="flex-1 min-w-[180px] px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
              autoFocus
            />
            <select
              value={customItemCategory}
              onChange={(e) => setCustomItemCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
            >
              {CATEGORIES.filter((c) => c !== "All Items").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCustomItem(false)}
              className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Compact Category Tabs */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Compact Inventory Items Grid */}
        <div className="mt-3.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 px-4">
              <Package className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No matching items found
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Use "Add Custom Item" above to add your item.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredItems.map((item) => {
                const qty = quantities[item.id] || 0;
                const isSelected = qty > 0;

                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 shadow-2xs ring-1 ring-blue-500/20"
                        : "border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850/40 hover:border-slate-300"
                    }`}
                  >
                    {/* Item Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </span>
                        {item.isPopular && (
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[8px] font-black px-1 rounded shrink-0">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {item.category}{" "}
                        {item.subtext ? `• ${item.subtext}` : ""}
                      </div>
                    </div>

                    {/* Plus / Minus Quantity Controller */}
                    <div className="shrink-0 flex items-center">
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          className="bg-white dark:bg-slate-800 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 dark:border-blue-800 hover:border-blue-600 font-bold text-[11px] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center bg-white dark:bg-slate-900 border border-blue-500 rounded-lg p-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                            className="w-6 h-6 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>

                          <span className="w-5 text-center font-bold text-xs text-slate-900 dark:text-white">
                            {qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleIncrement(item.id)}
                            className="w-6 h-6 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================= STICKY BOTTOM VIEW & PROCEED BAR ================= */}
      <div
        id="inventory-view-list-bottom-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-3 transition-all"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-xs shrink-0">
              {totalQuantity}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}{" "}
                Selected
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                {selectedItemsList
                  .slice(0, 3)
                  .map((s) => `${s.item.name} (${s.quantity})`)
                  .join(", ")}
                {selectedItemsList.length > 3 ? "..." : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              View List
            </button>

            <button
              id="btn-proceed-to-step3"
              type="button"
              onClick={handleProceed}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Continue (Step 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer / Modal */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-4 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Selected Inventory ({totalQuantity})
              </h3>
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 my-3">
              {selectedItemsList.map((item) => (
                <div
                  key={item.item.id}
                  className="py-2 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">
                      {item.item.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.item.id)}
                      className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleIncrement(item.item.id)}
                      className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.item.id)}
                      className="text-rose-500 hover:text-rose-700 ml-1 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
