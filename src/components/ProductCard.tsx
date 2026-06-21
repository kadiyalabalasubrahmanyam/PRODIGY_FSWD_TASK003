import React from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingCart, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#FDFCFB] border border-[#1C1C1C]/10 rounded-none hover:shadow-sm hover:border-[#1C1C1C]/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Tag/Badge */}
      {product.tag && (
        <span id={`product-tag-${product.id}`} className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-sans font-bold tracking-widest uppercase bg-[#1C1C1C] text-[#FDFCFB] rounded-none">
          {product.tag}
        </span>
      )}

      {/* Image Container with Zoom & Hover Overlay */}
      <div id={`product-img-container-${product.id}`} className="relative h-64 overflow-hidden bg-[#F9F7F2] cursor-pointer border-b border-[#1C1C1C]/10" onClick={() => onViewDetails(product)}>
        <img
          id={`product-img-${product.id}`}
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-550"
        />
        <div className="absolute inset-0 bg-[#545E4D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            id={`btn-quickview-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 bg-[#FDFCFB] hover:bg-[#1C1C1C] text-[#1C1C1C] hover:text-[#FDFCFB] border border-[#1C1C1C]/15 rounded-none shadow-xs transition-all duration-205 cursor-pointer"
            title="Quick View"
          >
            <Eye id={`icon-quickview-${product.id}`} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Details */}
      <div id={`product-body-${product.id}`} className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1.5">
          <span id={`product-category-${product.id}`} className="text-[10px] font-sans font-bold text-[#1C1C1C]/50 uppercase tracking-widest">
            {product.category === 'plants' ? 'Live Plant' : product.category === 'wares' ? 'Ceramics' : 'Care & Supplies'}
          </span>
          <div id={`product-rating-box-${product.id}`} className="flex items-center gap-1 text-[#1C1C1C]/80">
            <Star className="w-3 h-3 fill-[#1C1C1C] text-[#1C1C1C]" />
            <span className="text-[10px] font-sans font-bold">{product.rating}</span>
          </div>
        </div>

        <h3 id={`product-name-${product.id}`} className="font-serif text-lg text-[#1C1C1C] font-semibold group-hover:opacity-80 transition-opacity line-clamp-1">
          {product.name}
        </h3>
        
        {product.scientificName && (
          <p id={`product-scientific-${product.id}`} className="text-xs italic text-[#1C1C1C]/60 mt-0.5 line-clamp-1">
            {product.scientificName}
          </p>
        )}

        <p id={`product-desc-${product.id}`} className="text-xs text-[#1C1C1C]/70 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Product Meta badging if live plant */}
        {product.category === 'plants' && (
          <div id={`product-meta-${product.id}`} className="mt-4 flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 bg-[#F9F7F2] text-[9px] font-sans font-bold uppercase tracking-wider text-[#1C1C1C]/60 rounded-none border border-[#1C1C1C]/10 flex items-center gap-1">
              <Leaf className="w-2.5 h-2.5" /> Care: {product.careLevel}
            </span>
            <span className="px-2.5 py-1 bg-[#F9F7F2] text-[9px] font-sans font-bold uppercase tracking-wider text-[#1C1C1C]/60 rounded-none border border-[#1C1C1C]/10">
              {product.sunlight}
            </span>
          </div>
        )}

        {/* Price and Cart Button align bottom */}
        <div id={`product-footer-${product.id}`} className="mt-auto pt-4 flex items-center justify-between border-t border-[#1C1C1C]/10">
          <div>
            <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#1C1C1C]/40">Price</span>
            <p id={`product-price-${product.id}`} className="font-serif text-base font-semibold italic text-[#1C1C1C]">${product.price.toFixed(2)}</p>
          </div>
          
          <button
            id={`btn-add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 font-sans text-[10px] uppercase font-bold tracking-widest rounded-none flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              product.inStock
                ? 'bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-85'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
