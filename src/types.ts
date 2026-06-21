export interface Product {
  id: string;
  name: string;
  scientificName?: string;
  category: 'plants' | 'wares' | 'supplies';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tag: string; // e.g. "Best Seller", "Rare Collector", "Pet Friendly", "Handcrafted"
  careLevel?: 'Easy' | 'Medium' | 'Expert';
  sunlight?: string;
  inStock: boolean;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingHistory: {
    status: string;
    details: string;
    date: string;
    time: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
