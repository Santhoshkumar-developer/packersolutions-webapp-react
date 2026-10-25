import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Check, Boxes } from 'lucide-react';
import { BookingModel, InventoryCategory } from './types';

interface InventoryEditModalProps {
  booking: BookingModel;
  onClose: () => void;
  onSave: (bookingId: string, updatedInventory: InventoryCategory[]) => void;
}

export const InventoryEditModal: React.FC<InventoryEditModalProps> = ({
  booking,
  onClose,
  onSave,
}) => {
  const [inventoryState, setInventoryState] = useState<InventoryCategory[]>(
    JSON.parse(JSON.stringify(booking.inventory))
  );
  const [newItemName, setNewItemName] = useState('');
  const [selectedCatIdx, setSelectedCatIdx] = useState(0);

  const updateQuantity = (catIdx: number, itemId: string, delta: number) => {
    setInventoryState(prev => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const cat = cloned[catIdx];
      if (cat) {
        const item = cat.items.find((it: any) => it.id === itemId);
        if (item) {
          item.quantity = Math.max(1, item.quantity + delta);
        }
      }
      return cloned;
    });
  };

  const removeItem = (catIdx: number, itemId: string) => {
    setInventoryState(prev => {
      const cloned = JSON.parse(JSON.stringify(prev));
      if (cloned[catIdx]) {
        cloned[catIdx].items = cloned[catIdx].items.filter((it: any) => it.id !== itemId);
      }
      return cloned;
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setInventoryState(prev => {
      const cloned = JSON.parse(JSON.stringify(prev));
      if (!cloned[selectedCatIdx]) {
        cloned[selectedCatIdx] = { categoryName: 'General Household', items: [] };
      }
      cloned[selectedCatIdx].items.push({
        id: `custom-${Date.now()}`,
        name: newItemName.trim(),
        quantity: 1
      });
      return cloned;
    });
    setNewItemName('');
  };

  const handleSave = () => {
    onSave(booking.id, inventoryState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-left flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="text-base font-black text-slate-900">Modify Inventory List</h3>
            <p className="text-xs text-slate-500 font-mono">#{booking.ticketId} • {booking.serviceType}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Inventory Categories */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {inventoryState.map((cat, catIdx) => (
            <div key={catIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
                {cat.categoryName}
              </h4>
              <div className="space-y-2">
                {cat.items.map((it) => (
                  <div key={it.id} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-slate-800 truncate">{it.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(catIdx, it.id, -1)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-black text-slate-900 w-5 text-center">{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(catIdx, it.id, 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(catIdx, it.id)}
                        className="w-6 h-6 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Add Custom Item */}
          <form onSubmit={handleAddItem} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g. Study Table, Recliner Chair, Cycle..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0"
            >
              + Add Item
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save Updated Inventory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
