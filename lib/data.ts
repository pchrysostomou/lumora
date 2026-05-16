export type ProductCategory = "wedding" | "travel" | "baby" | "anniversary" | "family" | "graduation";

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  basePrice: number;
  category: ProductCategory;
  coverImage: string;
  images: string[];
  availableSizes: Size[];
  availableCovers: CoverType[];
  minPages: number;
  maxPages: number;
  isBestseller: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export type Size = "A5" | "A4_portrait" | "A4_landscape" | "square_20";
export type CoverType = "softcover" | "hardcover" | "leather";

export const SIZE_LABELS: Record<Size, string> = {
  A5: "A5 (14.8 × 21 cm)",
  A4_portrait: "A4 Portrait (21 × 29.7 cm)",
  A4_landscape: "A4 Landscape (29.7 × 21 cm)",
  square_20: "Square (20 × 20 cm)",
};

export const COVER_LABELS: Record<CoverType, string> = {
  softcover: "Softcover",
  hardcover: "Hardcover",
  leather: "Premium Leather",
};

export const SIZE_UPGRADES: Record<Size, number> = {
  A5: 0,
  A4_portrait: 5.0,
  A4_landscape: 5.0,
  square_20: 7.99,
};

export const COVER_UPGRADES: Record<CoverType, number> = {
  softcover: 0,
  hardcover: 9.99,
  leather: 24.99,
};

export const PRICE_PER_EXTRA_PAGE = 0.5;

export function calculatePrice(
  basePrice: number,
  minPages: number,
  pageCount: number,
  size: Size,
  cover: CoverType
): number {
  const extraPages = Math.max(0, pageCount - minPages);
  return (
    basePrice +
    extraPages * PRICE_PER_EXTRA_PAGE +
    SIZE_UPGRADES[size] +
    COVER_UPGRADES[cover]
  );
}

// Gradient placeholders — Lumora brand: deep navy / cool tones (not warm pastel)
export const CATEGORY_GRADIENTS: Record<ProductCategory, string> = {
  wedding:     "linear-gradient(140deg, #1E2E5C 0%, #3B5EA6 60%, #5B7EC4 100%)",
  travel:      "linear-gradient(140deg, #0F3320 0%, #1B6B44 60%, #3A9970 100%)",
  baby:        "linear-gradient(140deg, #3A1F56 0%, #7040A0 60%, #A06BD0 100%)",
  anniversary: "linear-gradient(140deg, #5C2A14 0%, #A0491E 60%, #C97840 100%)",
  family:      "linear-gradient(140deg, #143350 0%, #2B6CA0 60%, #4A8FC0 100%)",
  graduation:  "linear-gradient(140deg, #1A3A6B 0%, #2B5BA0 60%, #4A7BC0 100%)",
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Golden Hour Wedding Book",
    slug: "golden-hour-wedding-book",
    description: "Preserve your wedding day in a timeless hardcover book. Elegant layouts designed to showcase your most precious moments.",
    basePrice: 34.99,
    category: "wedding",
    coverImage: "/covers/golden-hour-wedding-book.jpg",
    images: ["/covers/wedding.jpg", "/covers/golden-hour-wedding-book.jpg"],
    availableSizes: ["A5", "A4_portrait", "A4_landscape", "square_20"],
    availableCovers: ["softcover", "hardcover", "leather"],
    minPages: 20, maxPages: 80,
    isBestseller: true, isNew: false,
    rating: 4.9, reviewCount: 284,
    tags: ["wedding", "romantic", "elegant"],
  },
  {
    id: "2",
    title: "Wanderlust Travel Magazine",
    slug: "wanderlust-travel-magazine",
    description: "Turn your travel photos into a stunning magazine-style photobook. Perfect for documenting adventures around the world.",
    basePrice: 29.99,
    category: "travel",
    coverImage: "/covers/wanderlust-travel-magazine.jpg",
    images: ["/covers/travel.jpg", "/covers/wanderlust-travel-magazine.jpg"],
    availableSizes: ["A4_landscape", "A4_portrait", "square_20"],
    availableCovers: ["softcover", "hardcover"],
    minPages: 20, maxPages: 60,
    isBestseller: true, isNew: false,
    rating: 4.8, reviewCount: 197,
    tags: ["travel", "adventure", "magazine"],
  },
  {
    id: "3",
    title: "Baby's First Year",
    slug: "babys-first-year",
    description: "Capture every precious milestone of your baby's first year in this beautifully designed keepsake book.",
    basePrice: 32.99,
    category: "baby",
    coverImage: "/covers/babys-first-year.jpg",
    images: ["/covers/baby.jpg", "/covers/babys-first-year.jpg"],
    availableSizes: ["A5", "A4_portrait", "square_20"],
    availableCovers: ["softcover", "hardcover", "leather"],
    minPages: 20, maxPages: 60,
    isBestseller: false, isNew: true,
    rating: 5.0, reviewCount: 89,
    tags: ["baby", "milestones", "family"],
  },
  {
    id: "4",
    title: "Silver Anniversary Collection",
    slug: "silver-anniversary-collection",
    description: "Celebrate 25 years of love with an anniversary photobook that tells your unique love story through the years.",
    basePrice: 39.99,
    category: "anniversary",
    coverImage: "/covers/silver-anniversary-collection.jpg",
    images: ["/covers/anniversary.jpg", "/covers/silver-anniversary-collection.jpg"],
    availableSizes: ["A4_portrait", "A4_landscape", "square_20"],
    availableCovers: ["hardcover", "leather"],
    minPages: 30, maxPages: 80,
    isBestseller: false, isNew: false,
    rating: 4.7, reviewCount: 142,
    tags: ["anniversary", "love", "memories"],
  },
  {
    id: "5",
    title: "Family Chronicle",
    slug: "family-chronicle",
    description: "Document your family's story across generations. A beautiful heirloom to pass down for years to come.",
    basePrice: 27.99,
    category: "family",
    coverImage: "/covers/family-chronicle.jpg",
    images: ["/covers/family.jpg", "/covers/family-chronicle.jpg"],
    availableSizes: ["A5", "A4_portrait", "A4_landscape", "square_20"],
    availableCovers: ["softcover", "hardcover"],
    minPages: 20, maxPages: 80,
    isBestseller: false, isNew: false,
    rating: 4.8, reviewCount: 213,
    tags: ["family", "memories", "generations"],
  },
  {
    id: "6",
    title: "Class of 2026",
    slug: "class-of-2026",
    description: "Mark this incredible milestone with a premium graduation photobook filled with memories, achievements and friendships.",
    basePrice: 24.99,
    category: "graduation",
    coverImage: "/covers/class-of-2026.jpg",
    images: ["/covers/graduation.jpg", "/covers/class-of-2026.jpg"],
    availableSizes: ["A5", "A4_portrait", "square_20"],
    availableCovers: ["softcover", "hardcover"],
    minPages: 20, maxPages: 40,
    isBestseller: false, isNew: true,
    rating: 4.9, reviewCount: 67,
    tags: ["graduation", "achievement", "friends"],
  },
  {
    id: "7",
    title: "Paris Je T'Aime",
    slug: "paris-je-taime",
    description: "A magazine-style photobook inspired by the city of light. Perfect for your Paris or any romantic city getaway.",
    basePrice: 31.99,
    category: "travel",
    coverImage: "/covers/paris-je-taime.jpg",
    images: ["/covers/travel.jpg", "/covers/paris-je-taime.jpg"],
    availableSizes: ["A4_portrait", "A4_landscape"],
    availableCovers: ["softcover", "hardcover"],
    minPages: 20, maxPages: 60,
    isBestseller: false, isNew: true,
    rating: 4.9, reviewCount: 44,
    tags: ["paris", "travel", "romantic"],
  },
  {
    id: "8",
    title: "Forever & Always",
    slug: "forever-and-always",
    description: "A minimalist wedding photobook with clean, modern layouts that let your photos speak for themselves.",
    basePrice: 29.99,
    category: "wedding",
    coverImage: "/covers/forever-and-always.jpg",
    images: ["/covers/wedding.jpg", "/covers/forever-and-always.jpg"],
    availableSizes: ["A4_portrait", "square_20"],
    availableCovers: ["softcover", "hardcover", "leather"],
    minPages: 20, maxPages: 80,
    isBestseller: false, isNew: false,
    rating: 4.8, reviewCount: 156,
    tags: ["wedding", "minimalist", "modern"],
  },
  // ── Destination Travel Series ─────────────────────────────────────
  {
    id: "9", title: "Paris Je T'Aime", slug: "paris-book",
    description: "Capture the magic of Paris — the Eiffel Tower, Montmartre cafés, and golden sunsets on the Seine.",
    basePrice: 31.99, category: "travel" as ProductCategory,
    coverImage: "/covers/paris.jpg", images: ["/covers/paris.jpg"],
    availableSizes: ["A4_portrait","A4_landscape","square_20"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 60, isBestseller: true, isNew: false,
    rating: 4.9, reviewCount: 312, tags: ["paris","france","romance"],
  },
  {
    id: "10", title: "Greece — Summer In Santorini", slug: "greece-book",
    description: "Whitewashed walls, cobalt domes, and Aegean blue water. Your Santorini story, printed and bound.",
    basePrice: 29.99, category: "travel" as ProductCategory,
    coverImage: "/covers/greece.jpg", images: ["/covers/greece.jpg"],
    availableSizes: ["A4_portrait","A4_landscape","square_20"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 60, isBestseller: true, isNew: false,
    rating: 4.8, reviewCount: 228, tags: ["greece","santorini","summer"],
  },
  {
    id: "11", title: "Italy — La Dolce Vita", slug: "italy-book",
    description: "From the Amalfi Coast to the Colosseum — a photobook that smells like espresso and sunshine.",
    basePrice: 29.99, category: "travel" as ProductCategory,
    coverImage: "/covers/italy.jpg", images: ["/covers/italy.jpg"],
    availableSizes: ["A4_portrait","A4_landscape","square_20"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 60, isBestseller: false, isNew: true,
    rating: 4.9, reviewCount: 187, tags: ["italy","amalfi","rome"],
  },
  {
    id: "12", title: "Japan — Land of the Rising Sun", slug: "japan-book",
    description: "Cherry blossoms in Kyoto, neon Tokyo nights, serene temples. Your Japanese adventure, beautifully preserved.",
    basePrice: 31.99, category: "travel" as ProductCategory,
    coverImage: "/covers/japan.jpg", images: ["/covers/japan.jpg"],
    availableSizes: ["A4_portrait","square_20"],
    availableCovers: ["softcover","hardcover","leather"],
    minPages: 20, maxPages: 60, isBestseller: false, isNew: true,
    rating: 5.0, reviewCount: 94, tags: ["japan","tokyo","kyoto","sakura"],
  },
  {
    id: "13", title: "Bali — Island of the Gods", slug: "bali-book",
    description: "Rice terraces, jungle temples, and golden sunsets over the Indian Ocean. Bali, immortalised in print.",
    basePrice: 27.99, category: "travel" as ProductCategory,
    coverImage: "/covers/bali.jpg", images: ["/covers/bali.jpg"],
    availableSizes: ["A4_portrait","square_20","A5"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 40, isBestseller: false, isNew: true,
    rating: 4.8, reviewCount: 76, tags: ["bali","indonesia","tropical"],
  },
  {
    id: "14", title: "New York — The City That Never Sleeps", slug: "nyc-book",
    description: "Central Park, Brooklyn Bridge, Manhattan skyline at midnight. New York energy, bound in hardcover.",
    basePrice: 29.99, category: "travel" as ProductCategory,
    coverImage: "/covers/nyc.jpg", images: ["/covers/nyc.jpg"],
    availableSizes: ["A4_portrait","A4_landscape","square_20"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 60, isBestseller: false, isNew: false,
    rating: 4.7, reviewCount: 145, tags: ["new york","nyc","usa"],
  },
  {
    id: "15", title: "Spain — Viva España", slug: "spain-book",
    description: "Flamenco, Gaudí, Rioja wine, and Mediterranean coast. Bold as the culture, beautiful as the country.",
    basePrice: 27.99, category: "travel" as ProductCategory,
    coverImage: "/covers/spain.jpg", images: ["/covers/spain.jpg"],
    availableSizes: ["A4_portrait","square_20","A5"],
    availableCovers: ["softcover","hardcover"],
    minPages: 20, maxPages: 40, isBestseller: false, isNew: false,
    rating: 4.8, reviewCount: 103, tags: ["spain","barcelona","madrid"],
  },
  {
    id: "16", title: "Maldives — Paradise Found", slug: "maldives-book",
    description: "Overwater bungalows, crystal-clear lagoons, and coral reefs. The most breathtaking destination, forever in your hands.",
    basePrice: 34.99, category: "travel" as ProductCategory,
    coverImage: "/covers/maldives.jpg", images: ["/covers/maldives.jpg"],
    availableSizes: ["A4_landscape","square_20","A4_portrait"],
    availableCovers: ["softcover","hardcover","leather"],
    minPages: 20, maxPages: 60, isBestseller: false, isNew: true,
    rating: 5.0, reviewCount: 52, tags: ["maldives","beach","paradise"],
  },
];



export const REVIEWS = [
  {
    id: "r1",
    productId: "1",
    author: "Sophia M.",
    date: "March 2026",
    rating: 5,
    title: "Absolutely breathtaking quality",
    body: "I ordered this for our wedding anniversary and the quality exceeded every expectation. The printing is sharp, colors are vivid, and the hardcover feels premium. Will order again!",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "James K.",
    date: "February 2026",
    rating: 5,
    title: "Perfect wedding gift",
    body: "Gave this as a gift to my sister for her wedding. She cried happy tears when she opened it. The editor was super easy to use and the delivery was fast. Highly recommend.",
    verified: true,
  },
  {
    id: "r3",
    productId: "2",
    author: "Elena T.",
    date: "April 2026",
    rating: 5,
    title: "My Japan trip in a book",
    body: "Uploaded 60 photos from Japan and used the magazine template. The result looks like a real travel magazine. Friends keep asking where I bought it!",
    verified: true,
  },
];
