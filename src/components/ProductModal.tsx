import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, Check, MessageSquare, Leaf, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAddReview,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviewSuccess(true);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    setTimeout(() => {
      setReviewSuccess(false);
    }, 3000);
  };

  return (
    <div id="product-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/65 backdrop-blur-xs">
      <motion.div
        id="product-modal-dialog"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FDFCFB] text-[#1C1C1C] rounded-none shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative border border-[#1C1C1C]/15"
      >
        {/* Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors border border-transparent hover:border-[#1C1C1C]/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div id="product-modal-image-col" className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-[#F9F7F2] border-b md:border-b-0 md:border-r border-[#1C1C1C]/10">
          <div className="relative aspect-square max-h-[400px] overflow-hidden rounded-none border border-[#1C1C1C]/10">
            <img
              id="product-modal-img"
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-fade-in"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-widest bg-[#1C1C1C] text-[#FDFCFB] rounded-none">
                {product.tag}
              </span>
            )}
          </div>
          
          {/* Detailed care specs */}
          {product.category === 'plants' && (
            <div id="product-modal-specs-grid" className="mt-6 grid grid-cols-3 gap-2 text-center text-[#1C1C1C]/80">
              <div className="p-3 bg-[#FDFCFB] rounded-none border border-[#1C1C1C]/10 flex flex-col justify-center">
                <span className="block text-[8px] font-sans font-bold text-[#1C1C1C]/45 uppercase tracking-widest mb-1">Care</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wide text-stone-800">{product.careLevel}</span>
              </div>
              <div className="p-3 bg-[#FDFCFB] rounded-none border border-[#1C1C1C]/10 flex flex-col justify-center">
                <span className="block text-[8px] font-sans font-bold text-[#1C1C1C]/45 uppercase tracking-widest mb-1">Sunlight</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wide text-stone-800 line-clamp-1">{product.sunlight}</span>
              </div>
              <div className="p-3 bg-[#FDFCFB] rounded-none border border-[#1C1C1C]/10 flex flex-col justify-center">
                <span className="block text-[8px] font-sans font-bold text-[#1C1C1C]/45 uppercase tracking-widest mb-1">Moisture</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wide text-stone-800">Dry-Packed</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Information Section */}
        <div id="product-modal-info-col" className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div className="mb-4">
            <span className="text-[10px] font-sans font-bold text-[#1C1C1C]/45 uppercase tracking-widest">
              {product.category === 'plants' ? 'Live Botanical Specimen' : product.category === 'wares' ? 'Artisanal Clay ware' : 'Greenhouse supplies'}
            </span>
            <h2 id="product-modal-title" className="font-serif text-3xl font-semibold text-[#1C1C1C] mt-1 leading-snug">
              {product.name}
            </h2>
            {product.scientificName && (
              <p id="product-modal-scientific" className="text-xs italic text-[#1C1C1C]/65 mt-0.5 font-serif">
                {product.scientificName}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-2.5">
              <div className="flex items-center text-[#1C1C1C]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(product.rating) ? 'fill-[#1C1C1C] text-[#1C1C1C]' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-sans font-bold text-[#1C1C1C]">{product.rating}</span>
              <span className="text-[10px] font-sans text-[#1C1C1C]/50 uppercase tracking-wider">({product.reviews.length} reviews)</span>
            </div>
            
            <p id="product-modal-price" className="font-serif text-3xl font-semibold italic text-[#1C1C1C] mt-4">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-[9px] font-sans font-bold text-[#1C1C1C]/55 uppercase tracking-widest mb-2 border-b border-[#1C1C1C]/10 pb-1">Specimen Profile</h4>
            <p id="product-modal-long-desc" className="text-xs text-[#1C1C1C]/80 leading-relaxed font-sans">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div id="product-modal-purchase-controls" className="p-4 bg-[#F9F7F2] border border-[#1C1C1C]/10 rounded-none mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-sans font-bold text-[#1C1C1C]/55 uppercase tracking-wider">Select quantity</span>
              <div className="flex items-center border border-[#1C1C1C]/15 rounded-none bg-[#FDFCFB] overflow-hidden">
                <button
                  id="btn-qty-dec"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(q => q - 1)}
                  className="px-3 py-1 text-[#1C1C1C] hover:bg-[#1C1C1C]/5 disabled:opacity-30 disabled:hover:bg-transparent font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-sans font-bold">{quantity}</span>
                <button
                  id="btn-qty-inc"
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1 text-[#1C1C1C] hover:bg-[#1C1C1C]/5 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <button
              id="btn-modal-add-to-cart"
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              disabled={!product.inStock}
              className={`w-full py-2.5 font-sans text-[10px] uppercase font-bold tracking-widest rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer ${
                product.inStock
                  ? 'bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-85'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {product.inStock ? `Add to Cart • $${(product.price * quantity).toFixed(2)}` : 'Temporarily Out of Stock'}
            </button>
          </div>

          {/* Customer Reviews & Feedback */}
          <div id="product-modal-reviews-section" className="border-t border-[#1C1C1C]/10 pt-5 mt-auto">
            <h4 className="text-[10px] font-sans font-bold text-[#1C1C1C] uppercase tracking-widest flex items-center gap-1.5 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-[#1C1C1C]/70" />
              Flora Journal entries
            </h4>

            {/* List Reviews */}
            <div id="product-reviews-list" className="space-y-3 max-h-[160px] overflow-y-auto mb-6 pr-1">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="bg-[#F9F7F2] p-3 rounded-none border border-[#1C1C1C]/10 text-xs text-[#1C1C1C]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#1C1C1C]/80 font-sans">{rev.author}</span>
                    <span className="text-[9px] text-[#1C1C1C]/50 font-mono">{rev.date}</span>
                  </div>
                  <div className="flex text-[#1C1C1C] mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-[#1C1C1C]' : 'text-stone-300'}`} />
                    ))}
                  </div>
                  <p className="text-[#1C1C1C]/80 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* Leave a review form */}
            <form id="product-add-review-form" onSubmit={handleSubmitReview} className="p-4 bg-[#F9F7F2] rounded-none border border-[#1C1C1C]/10">
              <span className="block text-[9px] font-sans font-bold text-[#1C1C1C] uppercase tracking-widest mb-3">Record your experience</span>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[8px] uppercase text-[#1C1C1C]/50 font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Flora S."
                    className="w-full text-xs p-2 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C]"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-[#1C1C1C]/50 font-bold mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none"
                  >
                    <option value={5}>5 Stars - Perfect</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Fair</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Unsatisfied</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-[8px] uppercase text-[#1C1C1C]/50 font-bold mb-1">Review Description</label>
                <textarea
                  required
                  rows={2}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How does this specimen thrive?"
                  className="w-full text-xs p-2 bg-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none focus:outline-none resize-none"
                />
              </div>

              {reviewSuccess ? (
                <div className="text-xs bg-emerald-50 text-emerald-800 p-2 text-center flex items-center justify-center gap-1 font-sans font-bold">
                  <Check className="w-4 h-4" /> Entry logged successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-90 rounded-none text-[9px] font-sans font-bold uppercase tracking-widest cursor-pointer"
                >
                  Submit Journal Entry
                </button>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
