import { categories } from "./categories";

export type Product = {
  id: string;
  handle: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  categorySlug: string;
  isNew?: boolean;
  createdAt: string;
};

// A deterministic array of colors for the mock generator
const MOCK_COLORS = [
  { name: "Ivory", hex: "#F7F3EC" },
  { name: "Gold", hex: "#A9752F" },
  { name: "Silver", hex: "#B8BCC2" },
  { name: "Walnut", hex: "#3A2E22" },
  { name: "Sage", hex: "#8F9779" },
  { name: "Dusty Rose", hex: "#DCAE96" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Navy", hex: "#000080" },
];

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];
  
  categories.forEach((cat, catIndex) => {
    // Generate 8 products per category
    for (let i = 1; i <= 8; i++) {
      // Deterministic price between 800 and 4500
      const basePrice = 800 + ((catIndex * 137 + i * 251) % 3700);
      const price = Math.round(basePrice / 100) * 100 - 1; // e.g. 1499, 2999
      
      // Some products are new
      const isNew = i % 3 === 0;
      
      // Some products are on sale
      const originalPrice = i % 4 === 0 ? price + 500 : undefined;

      // Assign 1-3 deterministic colors
      const colorCount = (i % 3) + 1;
      const productColors = [];
      for (let c = 0; c < colorCount; c++) {
        productColors.push(MOCK_COLORS[(i + c * 3 + catIndex) % MOCK_COLORS.length]);
      }

      // Base date is Jan 1, 2026. Subtract days to make some "newer"
      const date = new Date("2026-01-01T00:00:00Z");
      date.setDate(date.getDate() - (i * 7 + catIndex));

      products.push({
        id: `gid://shopify/Product/${1000000 + catIndex * 100 + i}`,
        handle: `${cat.slug}-item-${i}`,
        title: `Premium ${cat.name} Collection ${String.fromCharCode(64 + i)}`,
        price,
        originalPrice,
        images: [cat.image], // Reuse category tile image as requested
        colors: productColors,
        categorySlug: cat.slug,
        isNew,
        createdAt: date.toISOString(),
      });
    }
  });

  return products;
};

export const products = generateMockProducts();
