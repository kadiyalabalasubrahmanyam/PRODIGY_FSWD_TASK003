import { useState, useEffect } from 'react';
import { Product, CartItem, Order, Review } from './types';
import { PRODUCTS } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartSidebar } from './components/CartSidebar';
import { OrderTracker } from './components/OrderTracker';
import { ChatAssistant } from './components/ChatAssistant';
import { ShoppingBag, Search, Sparkles, Filter, SlidersHorizontal, MapPin, Compass, Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- STATE ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pacific_flora_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pacific_flora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pacific_flora_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI States
  const [activeTab, setActiveTab] = useState<'browse' | 'tracker'>('browse');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutNotification, setCheckoutNotification] = useState<string | null>(null);

  // Filters & Sorting States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  // --- LOCAL STORAGE SYNCS ---
  useEffect(() => {
    localStorage.setItem('pacific_flora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pacific_flora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pacific_flora_orders', JSON.stringify(orders));
  }, [orders]);

  // --- HANDLERS ---
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckoutComplete = (address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const ecoTax = subtotal * 0.05;
    const shippingFee = subtotal > 100 ? 0 : 8.5;
    const grandAbsoluteTotal = subtotal + ecoTax + shippingFee;

    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substring(2, 11)}`,
      date: formattedDate,
      status: 'processing',
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      })),
      total: grandAbsoluteTotal,
      shippingAddress: address,
      trackingHistory: [
        {
          status: 'Order Received',
          details: `Pacific Flora greenhouse registration clerk confirmed this selection. Root conditions and soil moisture check completed at baseline.`,
          date: formattedDate,
          time: formattedTime,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Reset Cart
    setIsCartOpen(false); // Close Cart
    setActiveTab('tracker'); // Move view to tracker

    // Set notification toast
    setCheckoutNotification(`Specimen selection booked successfully! Checked in order ${newOrder.id.toUpperCase().substring(0, 8)}`);
    setTimeout(() => {
      setCheckoutNotification(null);
    }, 6000);
  };

  // Simulated stepper to advance statuses
  const handleAdvanceOrderStatus = (orderId: string) => {
    const timeNow = new Date();
    const formattedDate = timeNow.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        let nextStatus: Order['status'] = 'processing';
        let detailText = '';

        if (ord.status === 'processing') {
          nextStatus = 'shipped';
          detailText = 'Specimen leaves prepped. Root ball secured under a layer of dense moistened moss. Transferred to clean bike courier packing.';
        } else if (ord.status === 'shipped') {
          nextStatus = 'out-for-delivery';
          detailText = 'Cargo rider dispatched from Spruce St greenhouse. Specimen is kept in thermostatic, humidity-shielded container moving through Seattle.';
        } else if (ord.status === 'out-for-delivery') {
          nextStatus = 'delivered';
          detailText = 'Handover accomplished! Specimen placed gently in ambient shaded entryway. Rehydrate in natural light zones within 24 hours.';
        } else {
          return ord; // Already delivered
        }

        const newLog = {
          status: nextStatus === 'shipped' ? 'Handed to Courier' : nextStatus === 'out-for-delivery' ? 'Out for Delivery' : 'Delivered Thriving',
          details: detailText,
          date: formattedDate,
          time: formattedTime,
        };

        return {
          ...ord,
          status: nextStatus,
          trackingHistory: [...ord.trackingHistory, newLog],
        };
      })
    );
  };

  // Demo order booster
  const handleAddDemoOrder = () => {
    const demoItems = [products[0], products[2]];
    const demoAddress = {
      fullName: 'Gwen Finch',
      street: '1412 East Spruce St',
      city: 'Seattle',
      state: 'WA',
      zip: '98122',
    };

    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const demoOrder: Order = {
      id: `ord-demo${Math.random().toString(36).substring(2, 5)}`,
      date: formattedDate,
      status: 'processing',
      items: demoItems.map((p) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        imageUrl: p.imageUrl,
      })),
      total: 112.5,
      shippingAddress: demoAddress,
      trackingHistory: [
        {
          status: 'Greenhouse Checked',
          details: 'Verified foliage vitality. Clean water spray applied.',
          date: formattedDate,
          time: formattedTime,
        },
      ],
    };

    setOrders((prev) => [demoOrder, ...prev]);
  };

  const handleAddReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      rating: reviewData.rating,
      date: new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }),
      comment: reviewData.comment,
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;

        const updatedReviews = [...prod.reviews, newReview];
        const averageRating = parseFloat(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );

        return {
          ...prod,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: averageRating,
        };
      })
    );

    // Sync modal active data if open
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [...prev.reviews, newReview];
        const averageRating = parseFloat(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: averageRating,
        };
      });
    }
  };

  const handleResetCatalog = () => {
    setProducts(PRODUCTS);
    localStorage.removeItem('pacific_flora_products');
  };

  // --- SELECTION & FILTER MATH ---
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.scientificName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesLevel = selectedCareLevel === 'all' || p.careLevel === selectedCareLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div id="app-root" className="min-h-screen bg-[#FDFCFB] text-[#1C1C1C] font-sans flex flex-col selection:bg-[#1C1C1C] selection:text-white">
      
      {/* 1. Header & Quick Brand coordinates */}
      <header id="app-header" className="sticky top-0 z-30 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#1C1C1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 id="brand-header-title" className="font-serif text-2xl font-bold tracking-tight italic text-[#1C1C1C]">
                Pacific Flora
              </h1>
              <span className="text-[9px] text-[#1C1C1C]/60 font-mono tracking-widest uppercase flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5" /> Seattle, WA • Spruce St Greenhouse
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="hidden sm:flex items-center gap-8 text-xs font-sans uppercase font-bold tracking-widest text-[#1C1C1C]/60">
            <button
              id="tab-browse-btn"
              onClick={() => setActiveTab('browse')}
              className={`pb-1 transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'text-[#1C1C1C] border-b-2 border-[#1C1C1C]'
                  : 'hover:text-[#1C1C1C]'
              }`}
            >
              Browse Catalog
            </button>
            <button
              id="tab-tracker-btn"
              onClick={() => setActiveTab('tracker')}
              className={`pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tracker'
                  ? 'text-[#1C1C1C] border-b-2 border-[#1C1C1C]'
                  : 'hover:text-[#1C1C1C]'
              }`}
            >
              Order Tracker
              {orders.filter(o => o.status !== 'delivered').length > 0 && (
                <span className="w-1.5 h-1.5 bg-[#1C1C1C] rounded-full animate-ping" />
              )}
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            <button
              id="btn-basket-trigger"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:opacity-75 transition cursor-pointer"
            >
              <span className="font-sans text-xs uppercase font-bold tracking-widest text-[#1C1C1C]">Basket</span>
              <span className="bg-[#1C1C1C] text-[#FDFCFB] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-sans font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Checkout Notification banner */}
      <AnimatePresence>
        {checkoutNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#1C1C1C] text-white text-center py-3 px-4 text-xs font-sans uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 border-b border-white/10"
          >
            <Sparkles className="w-4 h-4 text-white/80 animate-pulse" />
            {checkoutNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Tab bar menu */}
      <div className="sm:hidden flex border-b border-[#1C1C1C]/10 bg-[#F9F7F2]">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-3 text-xs uppercase font-bold tracking-widest text-center transition-all ${
            activeTab === 'browse' ? 'bg-[#1C1C1C] text-white' : 'text-[#1C1C1C]/50'
          }`}
        >
          Catalog
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 py-3 text-xs uppercase font-bold tracking-widest text-center transition-all ${
            activeTab === 'tracker' ? 'bg-[#1C1C1C] text-white' : 'text-[#1C1C1C]/50'
          }`}
        >
          Track ({orders.length})
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toggleable Tabs Area */}
        {activeTab === 'browse' ? (
          <div id="browse-viewport" className="space-y-8 animate-fade-in">
            
            {/* Elegant Editorial Hero Header */}
            <div className="border border-[#1C1C1C]/10 bg-[#F9F7F2] p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="md:w-1/2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1C1C1C]/40 block mb-3">
                  Spruce St Greenhouse • Est. 2026
                </span>
                <h2 className="font-serif text-5xl sm:text-6xl leading-[1.0] text-[#1C1C1C] font-semibold">
                  Botanist <br />
                  <span className="italic font-light">Collection</span>
                </h2>
              </div>
              <div className="md:w-1/2 flex flex-col justify-between h-full pt-2">
                <p className="font-sans text-sm leading-relaxed text-[#1C1C1C]/70 max-w-md">
                  Carefully curated, premium indoor specimens, tactile clay wares, and hand-blended organic soil mixes. Cultivated with patience under natural shaded light in Seattle.
                </p>
                <div className="mt-8 pt-6 border-t border-[#1C1C1C]/10 grid grid-cols-2 gap-4 text-[9px] font-mono uppercase font-bold tracking-widest text-[#1C1C1C]/50">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1C1C1C]/60" />
                    <span>In-Store Pickups 10 AM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1C1C1C]/60" />
                    <span>Bicycle Freight WA</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Filter and Sorting Toolbox bar */}
            <div id="filter-toolbox" className="bg-[#F9F7F2] border border-[#1C1C1C]/10 p-6 rounded-none space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search query box */}
                <div className="relative flex-grow max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#1C1C1C]/40 pointer-events-none">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search botanical specimens, clay wares..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-[#FDFCFB] border border-[#1C1C1C]/10 rounded-none focus:outline-none focus:border-[#1C1C1C] font-sans text-[#1C1C1C]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1C1C1C]/50 hover:text-[#1C1C1C] text-xs font-sans uppercase font-bold tracking-widest"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Grid controls */}
                <div className="flex flex-wrap items-center gap-6 font-sans">
                  <div className="flex items-center gap-2 border-b border-[#1C1C1C]/20 pb-1">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#1C1C1C]/40" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1C1C1C]/50">Care:</span>
                    <select
                      value={selectedCareLevel}
                      onChange={(e) => setSelectedCareLevel(e.target.value)}
                      className="text-xs bg-transparent focus:outline-none py-0.5 pr-2 font-medium text-[#1C1C1C] border-none"
                    >
                      <option value="all">Check all levels</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 border-b border-[#1C1C1C]/20 pb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1C1C1C]/50">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-xs bg-transparent focus:outline-none py-0.5 pr-2 font-medium text-[#1C1C1C] border-none"
                    >
                      <option value="rating">Highest Rating</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Reset Catalog configuration */}
                  <button
                    onClick={handleResetCatalog}
                    title="Reset catalog state"
                    className="p-1 px-2 border border-[#1C1C1C]/10 text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#FDFCFB] transition cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Categorization tab list filter */}
              <div className="flex gap-6 overflow-x-auto pb-1 border-t border-[#1C1C1C]/10 pt-4">
                {[
                  { id: 'all', label: 'All Curated Goods' },
                  { id: 'plants', label: 'Botanical Specimens' },
                  { id: 'wares', label: 'Artisanal Clay Pottery' },
                  { id: 'supplies', label: 'Botanical Fertilizers' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs uppercase font-bold tracking-widest pb-1 transition whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'text-[#1C1C1C] border-b-2 border-[#1C1C1C]'
                        : 'text-[#1C1C1C]/40 hover:text-[#1C1C1C]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            {sortedProducts.length === 0 ? (
              <div id="no-products-view" className="bg-white border rounded-2xl p-16 text-center shadow-xs">
                <p className="font-serif text-lg text-stone-700">No goods match your query</p>
                <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                  Try adjusting categories, search vocabulary, or care filters to find your desired plant companions.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedCareLevel('all');
                  }}
                  className="mt-6 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold rounded-lg"
                >
                  Clear Active Filters
                </button>
              </div>
            ) : (
              <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onViewDetails={(prod) => setSelectedProduct(prod)}
                    onAddToCart={(prod) => handleAddToCart(prod)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Tracker Viewpoint */
          <div id="tracker-viewport" className="animate-fade-in space-y-6">
            <OrderTracker
              orders={orders}
              onAdvanceOrderStatus={handleAdvanceOrderStatus}
              onAddDemoOrder={handleAddDemoOrder}
            />
          </div>
        )}
      </main>

      {/* Floating Messenger Helper Module */}
      <ChatAssistant />

      {/* Active Basket Panel Sliding Drawer */}
      <CartSidebar
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Focus Detailed Product Lightbox Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
          />
        )}
      </AnimatePresence>

      {/* Stable signature page footer */}
      <footer id="app-footer" className="bg-stone-900 text-stone-400 py-10 border-t border-stone-855 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs tracking-wider uppercase text-stone-200 font-serif font-bold">
            Pacific Flora Botanicals Est. 2026
          </p>
          <p className="text-[10px] text-stone-500 max-w-sm mx-auto leading-relaxed">
            All specimens are packed following dry soil shipping best practices. For regional bicycle delivery or standard courier mail questions, ask our instant AI Specialist 'Sage' anytime.
          </p>
        </div>
      </footer>
    </div>
  );
}
