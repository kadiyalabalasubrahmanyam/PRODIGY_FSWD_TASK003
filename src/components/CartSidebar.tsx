import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Truck, Sparkles, Loader } from 'lucide-react';
import { motion } from 'motion/react';

interface CartSidebarProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutComplete: (address: { fullName: string; street: string; city: string; state: string; zip: string }) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cartItems,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutComplete,
}) => {
  // Shipping Form State
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('WA');
  const [zip, setZip] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isEcoEligible = subtotal >= 75;
  const ecoTax = subtotal * 0.05; // 5% eco and preservation tax
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 8.50;
  const total = subtotal + ecoTax + shippingFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    
    // Simulate real local courier assignment
    setTimeout(() => {
      onCheckoutComplete({
        fullName,
        street,
        city,
        state,
        zip,
      });
      setIsProcessing(false);
      // Reset form
      setFullName('');
      setStreet('');
      setCity('');
      setZip('');
    }, 2000);
  };

  return (
    <div id="cart-sidebar-backdrop" className="fixed inset-0 z-50 flex justify-end bg-[#1C1C1C]/65 backdrop-blur-xs">
      {/* Click-outside zone */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <motion.div
        id="cart-sidebar-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="bg-[#FDFCFB] text-[#1C1C1C] w-full max-w-md h-full flex flex-col shadow-2xl relative border-l border-[#1C1C1C]/15"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1C1C1C]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tracking-tight italic">Your Basket</span>
            <span className="bg-[#1C1C1C] text-[#FDFCFB] px-2.5 py-0.5 rounded-none text-[10px] font-mono font-bold">
              {cartItems.reduce((n, c) => n + c.quantity, 0)}
            </span>
          </div>
          <button
            id="btn-close-cart"
            onClick={onClose}
            className="p-2 text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#1C1C1C]/5 rounded-none transition-colors border border-transparent hover:border-[#1C1C1C]/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contents Area (Scrollable) */}
        <div id="cart-items-container" className="flex-grow overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-none bg-[#F9F7F2] border border-[#1C1C1C]/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-[#1C1C1C]/40" />
              </div>
              <p className="font-serif text-lg italic font-semibold text-[#1C1C1C]">Empty Planter</p>
              <p className="text-xs font-sans text-[#1C1C1C]/60 max-w-xs mt-2">
                Browse our curated collection of botanical components and handcrafted stoneware to begin your collection.
              </p>
              <button
                id="btn-cart-back-shopping"
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-[#1C1C1C] text-[#FDFCFB] text-xs font-sans uppercase font-bold tracking-widest rounded-none hover:opacity-90 transition cursor-pointer"
              >
                Back to Plant Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Promo notice */}
              {isEcoEligible ? (
                <div className="p-3 bg-[#F9F7F2] text-[#1C1C1C] rounded-none text-xs flex items-center gap-2 border border-[#1C1C1C]/15">
                  <Sparkles className="w-4 h-4 text-emerald-800" />
                  <span className="font-sans text-[11px] leading-relaxed">Complimentary Seattle organic bio-grow nutrient package added free!</span>
                </div>
              ) : (
                <div className="p-3 bg-[#F9F7F2] rounded-none text-[11px] font-sans text-[#1C1C1C]/60 text-center border border-[#1C1C1C]/10">
                  Add <span className="font-bold text-[#1C1C1C]">${(75 - subtotal).toFixed(2)}</span> more to earn complimentary organic bio-nutrients.
                </div>
              )}

              {/* List Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-[#F9F7F2] p-3 border border-[#1C1C1C]/10 rounded-none">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-none border border-[#1C1C1C]/10 flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-semibold text-[#1C1C1C] truncate">{item.product.name}</h4>
                          {item.product.scientificName && (
                            <p className="text-[10px] text-[#1C1C1C]/60 italic truncate font-serif">{item.product.scientificName}</p>
                          )}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#1C1C1C]/35 hover:text-[#1C1C1C] transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#1C1C1C]/20 rounded-none bg-[#FDFCFB]">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#1C1C1C] font-bold hover:bg-[#1C1C1C]/5 disabled:opacity-30 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-sans font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#1C1C1C] font-bold hover:bg-[#1C1C1C]/5 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-serif text-sm italic font-semibold text-[#1C1C1C]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Checkout & Bill Area (Strict bottom align) */}
        {cartItems.length > 0 && (
          <div id="cart-footer" className="border-t border-[#1C1C1C]/10 bg-[#F9F7F2] p-5 space-y-4">
            {/* Bill Details */}
            <div className="space-y-1.5 text-xs text-[#1C1C1C]/70">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Preservation & Safety Tax (5%)</span>
                <span className="font-semibold text-[#1C1C1C]">${ecoTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Seattle Courier Freight / Mail</span>
                <span className="font-semibold text-[#1C1C1C]">
                  {shippingFee === 0 ? <span className="text-emerald-850 font-bold uppercase text-[9px] tracking-wider">Complimentary</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#1C1C1C] font-bold pt-2 border-t border-[#1C1C1C]/10">
                <span>Estimated Absolute Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Courier Delivery Details input form */}
            <form id="shipping-courier-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
              <span className="block text-[9px] font-sans font-bold text-[#1C1C1C] uppercase tracking-widest border-b border-[#1C1C1C]/5 pb-1">Seattle Courier Delivery Details</span>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name / Plant Parent"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                />
                <input
                  type="text"
                  required
                  placeholder="Mailing Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="col-span-1 text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="col-span-1 text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                  >
                    <option value="WA">WA</option>
                    <option value="OR">OR</option>
                    <option value="CA">CA</option>
                    <option value="ID">ID</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="col-span-1 text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                  />
                </div>
              </div>

              {/* Submit Checkout button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-90 rounded-none text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition disabled:opacity-45 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin text-[#FDFCFB]" />
                    Routing Local Bike Courier...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5 text-[#FDFCFB]" />
                    Secure Checkout • ${total.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
