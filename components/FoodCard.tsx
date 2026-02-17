
import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, Flame, Layers, Check } from 'lucide-react';
import { FoodItem, FoodCategory, CartItem, ProteinOption } from '../types';
import { FOOD_ITEMS, PROTEIN_OPTIONS } from '../constants';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem, proteins?: ProteinOption[]) => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item: initialItem, onAddToCart, cart, onUpdateQuantity, onRemoveFromCart }) => {
  const isGrainItem = initialItem.category === FoodCategory.GRAINS;
  const [selectedItem, setSelectedItem] = useState<FoodItem>(initialItem);
  const [selectedProteins, setSelectedProteins] = useState<ProteinOption[]>([]);

  useEffect(() => {
    setSelectedItem(initialItem);
  }, [initialItem]);

  const getQuantity = (id: string) => cart.find(c => c.id === id)?.quantity || 0;



  const toggleProtein = (protein: ProteinOption) => {
    setSelectedProteins(prev =>
      prev.find(p => p.id === protein.id)
        ? prev.filter(p => p.id !== protein.id)
        : [...prev, protein]
    );
  };

  const calculateTotalPrice = () => {
    const proteinTotal = selectedProteins.reduce((sum, p) => sum + p.price, 0);
    return selectedItem.price + proteinTotal;
  };

  const mainQty = getQuantity(selectedItem.id);

  return (
    <div className="group relative bg-white rounded-[2.5rem] p-4 flex flex-col h-full transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(69,26,3,0.12)] border border-stone-100/40 hover:border-amber-200">
      {/* Refined Image */}
      <div className="relative h-72 rounded-[2rem] overflow-hidden mb-8 shadow-md">
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div className="absolute top-5 left-5 flex gap-2">
          {selectedItem.tags.includes('Legendary') && (
            <div className="bg-amber-400 text-amber-950 text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl uppercase tracking-tighter">
              <Flame size={12} fill="currentColor" /> BEST IN ATMOS
            </div>
          )}
        </div>
        <div className="absolute bottom-5 right-5">
          <div className="bg-white/95 backdrop-blur-md text-amber-950 text-[12px] font-black px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5">
            <Star size={14} className="text-amber-500 fill-amber-500" /> {selectedItem.rating}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif font-black text-2xl text-amber-950 leading-tight pr-4">
            {selectedItem.name}
          </h3>
          <span className="text-xl font-black text-amber-800 shrink-0">
            ₦{calculateTotalPrice().toLocaleString()}
          </span>
        </div>

        <p className="text-stone-400 text-base mb-8 leading-relaxed font-medium line-clamp-2">
          {selectedItem.description}
        </p>



        {/* Protein Selection */}
        {isGrainItem && (
          <div className="mb-6 space-y-6">
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-950 block mb-4">Choose Your Protein</span>
              <div className="space-y-3">
                {PROTEIN_OPTIONS.map(protein => {
                  const isActive = selectedProteins.find(p => p.id === protein.id);
                  return (
                    <button
                      key={protein.id}
                      onClick={() => toggleProtein(protein)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isActive ? 'bg-amber-100 border-amber-400' : 'bg-white border-stone-200 hover:border-amber-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isActive ? 'bg-amber-950 border-amber-950 text-white' : 'bg-white border-stone-300'}`}>
                          {isActive && <Check size={12} strokeWidth={4} />}
                        </div>
                        <span className="text-xs font-black text-amber-950">{protein.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-950">+₦{protein.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-stone-300 font-black">Energy Scale</span>
            <span className="text-sm text-stone-600 font-bold">{selectedItem.calories} kcal</span>
          </div>

          {mainQty > 0 ? (
            <div className="flex items-center gap-3 bg-amber-50 p-1.5 rounded-2xl border border-amber-100 shadow-inner">
              <button
                onClick={() => mainQty === 1 ? onRemoveFromCart(selectedItem.id) : onUpdateQuantity(selectedItem.id, -1)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-stone-100 text-stone-500 hover:text-red-500 transition-all active:scale-95"
              >
                <Minus size={16} />
              </button>
              <span className="font-black text-amber-400 text-base min-w-[28px] text-center">{mainQty}</span>
              <button
                onClick={() => onUpdateQuantity(selectedItem.id, 1)}
                className="w-10 h-10 flex items-center justify-center bg-amber-400 text-white rounded-xl shadow-lg hover:bg-black transition-all active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(selectedItem, selectedProteins)}
              className="bg-amber-400 text-white flex items-center gap-3 px-10 py-4.5 rounded-[1.5rem] font-black hover:bg-black transition-all group/btn shadow-xl active:scale-95"
            >
              <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-500" />
              <span className="text-xs uppercase tracking-[0.2em]">Add to Pack</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
