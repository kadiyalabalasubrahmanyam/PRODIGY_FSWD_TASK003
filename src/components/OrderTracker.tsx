import React, { useState } from 'react';
import { Order } from '../types';
import { ClipboardList, Check, Package, Bike, HeartHandshake, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderTrackerProps {
  orders: Order[];
  onAdvanceOrderStatus: (orderId: string) => void;
  onAddDemoOrder: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  orders,
  onAdvanceOrderStatus,
  onAddDemoOrder,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');

  // Automatically update selected order if none yet
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'out-for-delivery': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = activeOrder ? getStatusStep(activeOrder.status) : 0;

  return (
    <div id="order-tracker-root" className="bg-[#FDFCFB] text-[#1C1C1C] border border-[#1C1C1C]/10 rounded-none p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1C1C1C]/10">
        <div>
          <h3 className="font-serif text-2xl font-bold italic text-[#1C1C1C] flex items-center gap-2">
            <ClipboardList className="w-5.5 h-5.5 text-[#1C1C1C]/70" />
            Greenhouse Order Dispatch
          </h3>
          <p className="text-xs font-sans text-[#1C1C1C]/55 mt-1">
            Observe the real-time preparation, soil dressing, and local bicycle courier handling of your botanical speciments.
          </p>
        </div>

        {/* Demo order placement for quick testing */}
        {orders.length === 0 && (
          <button
            id="btn-add-demo-order"
            onClick={onAddDemoOrder}
            className="px-4 py-2.5 bg-[#F9F7F2] border border-[#1C1C1C]/15 text-[#1C1C1C] rounded-none text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Simulate Demo Order
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div id="no-orders-view" className="text-center py-12 bg-[#F9F7F2]/50 border border-dashed border-[#1C1C1C]/10">
          <p className="text-[#1C1C1C]/60 text-xs font-sans">No botanical dispatches have been registered in this session.</p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#1C1C1C]/40 mt-1">Your orders will persist via standard local container cache.</p>
        </div>
      ) : (
        <div id="active-tracker-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Quick order selector & invoice summary */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label className="block text-[8px] uppercase tracking-widest text-[#1C1C1C]/50 font-bold mb-1.5">Active Dispatch Code</label>
              <select
                id="order-select-dropdown"
                value={activeOrder?.id || ''}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C] text-[#1C1C1C] font-mono font-semibold"
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.id.substring(0, 12).toUpperCase()}... ({o.items.length} items)
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Specimen Invoice */}
            {activeOrder && (
              <div className="bg-[#F9F7F2] p-4 rounded-none border border-[#1C1C1C]/10 space-y-3.5">
                <div className="flex justify-between items-center pb-2 border-b border-[#1C1C1C]/10">
                  <span className="text-[9px] font-mono text-[#1C1C1C]/50 uppercase">SPECIMEN LOG {activeOrder.id.substring(0, 8).toUpperCase()}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-none uppercase bg-[#1C1C1C] text-[#FDFCFB] font-sans font-bold tracking-widest">
                    {activeOrder.status}
                  </span>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {activeOrder.items.map((it) => (
                    <div key={it.productId} className="flex items-center gap-2.5 text-xs text-[#1C1C1C]">
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 object-cover rounded-none border border-[#1C1C1C]/10 flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold truncate">{it.name}</p>
                        <p className="text-[10px] text-[#1C1C1C]/50 font-mono">Qty {it.quantity} • ${it.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivered to address block */}
                <div className="pt-2 border-t border-[#1C1C1C]/10 text-[11px] text-[#1C1C1C]/70 space-y-1">
                  <span className="block font-sans font-bold text-[#1C1C1C]/60 uppercase text-[8px] tracking-widest mb-1">Mailing Address</span>
                  <p className="font-semibold text-[#1C1C1C]">{activeOrder.shippingAddress.fullName}</p>
                  <p className="truncate">{activeOrder.shippingAddress.street}</p>
                  <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.zip}</p>
                </div>

                {/* Total paid */}
                <div className="pt-2 border-t border-[#1C1C1C]/10 flex justify-between text-xs text-[#1C1C1C]">
                  <span className="font-sans text-[#1C1C1C]/60">Total Specimen Investment</span>
                  <span className="font-serif italic font-bold text-[#1C1C1C] text-sm">${activeOrder.total.toFixed(2)}</span>
                </div>

                {/* Simulated forwarder button */}
                {activeOrder.status !== 'delivered' && (
                  <button
                    id="btn-simulate-order-step"
                    onClick={() => onAdvanceOrderStatus(activeOrder.id)}
                    className="w-full mt-2 py-2 bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-90 rounded-none text-[9px] font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-[#FDFCFB]" />
                    Simulate Next Stage
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right panel: Elegant check progress timeline */}
          {activeOrder && (
            <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6 text-[#1C1C1C]">
              
              {/* Stepper Header */}
              <div className="relative flex justify-between items-center w-full mb-10 max-w-xl mx-auto">
                <div className="absolute top-1/2 left-0 h-0.5 bg-[#1C1C1C]/10 w-full -translate-y-1/2 -z-10" />
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-[#1C1C1C] transition-all duration-500 -translate-y-1/2 -z-10"
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                />

                {/* Step icons with Editorial custom angular boundaries */}
                {[
                  { step: 1, icon: ClipboardList, label: 'Confirmed' },
                  { step: 2, icon: Package, label: 'Potting Studio' },
                  { step: 3, icon: Bike, label: 'Cargo Route' },
                  { step: 4, icon: HeartHandshake, label: 'Transferred' }
                ].map((s) => {
                  const IconComp = s.icon;
                  const isDone = currentStep >= s.step;
                  const isNext = currentStep === s.step - 1;
                  return (
                    <div key={s.step} className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-none flex items-center justify-center transition-all duration-300 border ${
                          isDone
                            ? 'bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] shadow-xs'
                            : isNext
                            ? 'bg-[#F9F7F2] text-[#1C1C1C] border-[#1C1C1C] animate-pulse duration-1000'
                            : 'bg-[#FDFCFB] text-stone-300 border-stone-200'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`text-[8px] font-sans font-bold uppercase tracking-widest mt-2 bg-[#F9F7F2] px-1 ${isDone ? 'text-[#1C1C1C]' : 'text-stone-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Detail */}
              <div className="space-y-4">
                <span className="block text-[8px] font-sans font-bold uppercase tracking-widest text-[#1C1C1C]/50 mb-1 border-b border-[#1C1C1C]/5 pb-1">Historical Courier logs</span>
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {activeOrder.trackingHistory.slice().reverse().map((hist, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-[#F9F7F2] border border-[#1C1C1C]/10 rounded-none animate-fade-in text-xs text-[#1C1C1C]">
                      <div className="flex-shrink-0 text-[#1C1C1C]/50 flex flex-col items-center min-w-[70px]">
                        <span className="font-bold text-[#1C1C1C]/70 font-mono">{hist.time}</span>
                        <span className="text-[8px] font-mono text-stone-400 mt-0.5">{hist.date}</span>
                      </div>
                      
                      <div className="w-px bg-[#1C1C1C]/10 self-stretch my-1" />

                      <div className="flex-grow">
                        <h5 className="font-serif italic font-bold text-[#1C1C1C] flex items-center gap-1.5 text-xs">
                          {index === 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-ping" />}
                          {hist.status}
                        </h5>
                        <p className="text-[#1C1C1C]/70 text-xs mt-1 leading-relaxed">{hist.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
};
