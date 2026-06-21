import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'plants',
    price: 48,
    rating: 4.8,
    reviewsCount: 14,
    description: 'The iconic split-leaf giant, celebrated for its dramatic, heart-shaped leaves and adaptability to indoor environments.',
    longDescription: 'Monstera Deliciosa is a tropical stunner prized for its iconic leaf fenestrations. Native to northern South America and southern Mexico, this quick-climbing split-leaf philodendron relative thrives in warm, humid spaces. Its air-purifying qualities and effortless sophistication make it an essential centerpiece for any curated living room.',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600',
    tag: 'Best Seller',
    careLevel: 'Easy',
    sunlight: 'Bright Indirect Light',
    inStock: true,
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor V.',
        rating: 5,
        date: 'June 12, 2026',
        comment: 'Absolutely stunning! Arrived in perfect health, and a new leaf started unfurling within three days of taking it home.'
      },
      {
        id: 'r2',
        author: 'James K.',
        rating: 4,
        date: 'May 28, 2026',
        comment: 'Beautiful, large leaves. It was slightly larger than expected, which is great but I had to rearrange the corner!'
      }
    ]
  },
  {
    id: 'olea-europaea',
    name: 'Grecian Olive Tree',
    scientificName: 'Olea europaea',
    category: 'plants',
    price: 75,
    rating: 4.9,
    reviewsCount: 8,
    description: 'An elegant statement tree with slender, silvery-green leaves, evoking the serene hillsides of the Mediterranean.',
    longDescription: 'Bring a touch of Tuscany in-doors. Celebrated for its slender, rustic branching and pale oval leaves, our Grecian Olive Tree adds a soft, breezy texture to brighten up empty sunny corners. They are highly adaptable and thrive best when situated near a south-facing window with direct sun rays.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
    tag: 'Trending',
    careLevel: 'Medium',
    sunlight: 'Direct Sunlight',
    inStock: true,
    reviews: [
      {
        id: 'r3',
        author: 'Marcus S.',
        rating: 5,
        date: 'June 05, 2026',
        comment: 'The olive tree is the pride of my kitchen. Very healthy root structure and delightful silver reflections in the sun.'
      }
    ]
  },
  {
    id: 'ficus-lyrata',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'plants',
    price: 58,
    rating: 4.6,
    reviewsCount: 22,
    description: 'An Architectural statement plant featuring broad, fiddle-shaped leaves with distinct structural cream veins.',
    longDescription: 'The Fiddle Leaf Fig is the quintessential designer plant. Known for its upright form and large, violin-shaped foliage, it makes a commanding focal point. It thrives strictly in consistent bright indirect sunlight and prefers to dry out between deep waterings to avoid root stress.',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&q=80&w=600',
    tag: 'Architectural',
    careLevel: 'Expert',
    sunlight: 'Bright Indirect Light',
    inStock: true,
    reviews: [
      {
        id: 'r4',
        author: 'Julian T.',
        rating: 5,
        date: 'May 14, 2026',
        comment: 'I was nervous about the Expert rating, but their detailed care guide made it super simple. Six months later, it is thriving!'
      }
    ]
  },
  {
    id: 'monstera-albo',
    name: 'Variegated Monstera Albo',
    scientificName: 'Monstera deliciosa borsigiana Albo',
    category: 'plants',
    price: 185,
    rating: 5.0,
    reviewsCount: 5,
    description: 'An ultra-rare botanical collector\'s treasure, exhibiting blocky, high-contrast pure white and emerald variegation.',
    longDescription: 'For the ultimate plant collector. Each Variegated Albo boasts completely unique marbled splatters and broad blocks of pure starch white against vibrant, healthy green. Rooted thoroughly in custom premium porous medium, these plants are highly valued and require cautious, attentive handling to preserve their exquisite mutations.',
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=600',
    tag: 'Rare Collector',
    careLevel: 'Expert',
    sunlight: 'Bright Indirect Light',
    inStock: true,
    reviews: [
      {
        id: 'r5',
        author: 'Clarissa P.',
        rating: 5,
        date: 'June 18, 2026',
        comment: 'A true investment but so worth it! The variegation is incredibly bold. Highly recommended if you have suitable grow lights.'
      }
    ]
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    scientificName: 'Goeppertia orbifolia',
    category: 'plants',
    price: 34,
    rating: 4.7,
    reviewsCount: 16,
    description: 'Stunning round leaves adorned with delicate metallic pinstripes. A pet-friendly tropical gem that shifts slowly at night.',
    longDescription: 'Prized for its dramatic pin-striped markings, Calathea Orbifolia is a luxurious safe-haven plant. Safe for curious cats and dogs, it moves its leaves up at dusk (hence the name "prayer plant") and opens them down in the morning light. It loves higher ambient humidity and ambient soft shaded light.',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600',
    tag: 'Pet Friendly',
    careLevel: 'Medium',
    sunlight: 'Partial Shade',
    inStock: true,
    reviews: [
      {
        id: 'r6',
        author: 'Sarah M.',
        rating: 5,
        date: 'June 01, 2026',
        comment: 'Absolutely love that it is safe for my kitten! The stripes look almost silver. It folds up beautifully at night.'
      }
    ]
  },
  {
    id: 'juniper-bonsai',
    name: 'Japanese Juniper Bonsai',
    scientificName: 'Juniperus procumbens',
    category: 'plants',
    price: 95,
    rating: 4.9,
    reviewsCount: 9,
    description: 'A timeless miniature juniper tree, carefully hand-wired and trained with a cascading weathered ancient branch look.',
    longDescription: 'An ancient living art form. This Japanese Procumbens Juniper Bonsai tree encapsulates strength, patience, and visual harmony. Presented in a premium rectangular hand-glazed ceramic dish, it makes a serene addition to home offices or patios, offering refreshing deep forest scents.',
    imageUrl: 'https://images.unsplash.com/photo-1512428813824-f7253df4e167?auto=format&fit=crop&q=80&w=600',
    tag: 'Handcrafted',
    careLevel: 'Expert',
    sunlight: 'Bright Indirect Light',
    inStock: true,
    reviews: [
      {
        id: 'r7',
        author: 'Daisuke O.',
        rating: 5,
        date: 'April 20, 2026',
        comment: 'Exquisite branch structure. It is well-established and arrived safely insulated with a humidity tray.'
      }
    ]
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant \'Laurentii\'',
    scientificName: 'Sansevieria trifasciata',
    category: 'plants',
    price: 28,
    rating: 4.8,
    reviewsCount: 37,
    description: 'Sleek, structural upright spears with crisp golden margins. An near-indestructible air-purifying companion for any spot.',
    longDescription: 'The champion of low-light adaptability. The Laurentii Snake Plant is practically unkillable, making it our gold standard selection for beginners, dim bedrooms, or frequent travelers. Not only is it structural and geometric, but it actively filters airborne toxins even in total darkness.',
    imageUrl: 'https://images.unsplash.com/photo-1593487568522-746db8894941?auto=format&fit=crop&q=80&w=600',
    tag: 'Beginner Friendly',
    careLevel: 'Easy',
    sunlight: 'Low to Bright indirect',
    inStock: true,
    reviews: [
      {
        id: 'r8',
        author: 'Oliver N.',
        rating: 4,
        date: 'May 02, 2026',
        comment: 'Left it alone during a 3-week trip and came back to find dual new sprouts! The root system is robust, and the yellow edges are beautifully vivid.'
      }
    ]
  },
  {
    id: 'ribbed-clay-pot',
    name: 'Artisanal Ribbed Clay Pot',
    category: 'wares',
    price: 32,
    rating: 4.9,
    reviewsCount: 31,
    description: 'Custom breathable natural terracotta pot featuring subtle exterior ribs and a matching premium water saucer.',
    longDescription: 'Hand-pressed with dense natural terracotta clays, our signature ribbed series provides exceptional aeration that roots crave. Unlike standard plastic equivalents, terracotta allows root networks to engage in natural transpiration, preventing soggy pockets and promoting healthy soil microbes.',
    imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
    tag: 'Handcrafted',
    inStock: true,
    reviews: [
      {
        id: 'r9',
        author: 'Lillian G.',
        rating: 5,
        date: 'June 09, 2026',
        comment: 'The textured clay has a gorgeous dusty peach-beige glaze. Looks stunning paired with my Pothos.'
      }
    ]
  },
  {
    id: 'watering-can-brass',
    name: 'Handwritten Brass Watering Can',
    category: 'supplies',
    price: 64,
    rating: 5.0,
    reviewsCount: 15,
    description: 'Polished genuine solid brass with an elegant slender spout, enabling precise watering directly to delicate root zones.',
    longDescription: 'Invest in functional heirloom beauty. With a sleek 1.2-liter capacity and perfectly counter-balanced curved handle, this watering can controls rate of flow flawlessly. The ultra-narrow, long drip-proof nozzle slides underneath leaves to water dense soil roots without splashing.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    tag: 'Premium Goods',
    inStock: true,
    reviews: [
      {
        id: 'r10',
        author: 'Arthur D.',
        rating: 5,
        date: 'May 30, 2026',
        comment: 'An art piece on my shelf and an incredibly practical watering tool. Worth every penny of its price tag.'
      }
    ]
  },
  {
    id: 'neem-oil-polish',
    name: 'Neem Oil & Natural Foliage Shine Kit',
    category: 'supplies',
    price: 22,
    rating: 4.7,
    reviewsCount: 42,
    description: 'Cold-pressed organic neem formulation with pure lavender essential oils, plus an premium organic linen leaf buffing cloth.',
    longDescription: 'Restore your leaves\' natural glow whereas keeping standard garden intruders at bay. Made with cold-pressed organic neem and gentle therapeutic soap, this ready-to-spray mixture clears dust, water-spots, and structural buildup while adding an inviting pleasant botanical aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=600',
    tag: 'Organic',
    inStock: true,
    reviews: [
      {
        id: 'r11',
        author: 'Rachel W.',
        rating: 5,
        date: 'June 15, 2026',
        comment: 'Smells of natural lavender, not harsh minerals. Cleans off hard water scale on my rubber tree leaves beautifully!'
      }
    ]
  },
  {
    id: 'sovereign-soil',
    name: 'Sovereign Well-Draining Aroid Soil Mix',
    category: 'supplies',
    price: 16,
    rating: 4.9,
    reviewsCount: 56,
    description: 'Professional grade porous potting soil made with dense kiln-dried orchid bark, perlite, and nutrient-rich worm castings.',
    longDescription: 'The golden ratio of chunkiness and moisture retention. Built specifically for Aroids (Monsteras, Philodendrons, Alocasias), this signature mix allows roots to breathe, preventing damp environments and rot while delivering continuous micro-nutrients via structural worm humus castings.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600', // Gardening related layout
    tag: 'Organic',
    inStock: true,
    reviews: [
      {
        id: 'r12',
        author: 'Gavin B.',
        rating: 5,
        date: 'June 17, 2026',
        comment: 'A complete lifesaver. Standard nursery soils killed many plants of mine due to waterlogging, but this organic bark mix keeps things dry and happy.'
      }
    ]
  }
];
