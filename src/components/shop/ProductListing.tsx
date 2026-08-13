"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { categories } from "@/constants/categories";
import { products as allProducts } from "@/constants/products";
import { ProductCard } from "./ProductCard";

interface ProductListingProps {
  categorySlug: string;
}

const PRICE_BUCKETS = [
  { id: "under-1500", label: "Under ₹1,500", min: 0, max: 1500 },
  { id: "1500-3000", label: "₹1,500 - ₹3,000", min: 1500, max: 3000 },
  { id: "over-3000", label: "Over ₹3,000", min: 3000, max: Infinity },
];

type SortOption = "newest" | "price-asc" | "price-desc";

export function ProductListing({ categorySlug }: ProductListingProps) {
  const category = categories.find((c) => c.slug === categorySlug);
  const categoryProducts = allProducts.filter((p) => p.categorySlug === categorySlug);

  const availableColors = useMemo(() => {
    const colorsMap = new Map<string, string>();
    categoryProducts.forEach((p) => {
      p.colors.forEach((c) => colorsMap.set(c.name, c.hex));
    });
    return Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [categoryProducts]);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedPriceBucket, setSelectedPriceBucket] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFiltersOpen]);

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Filter by Price
    if (selectedPriceBucket) {
      const bucket = PRICE_BUCKETS.find((b) => b.id === selectedPriceBucket);
      if (bucket) {
        result = result.filter((p) => p.price >= bucket.min && p.price < bucket.max);
      }
    }

    // Filter by Color
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [categoryProducts, selectedPriceBucket, selectedColors, sortOption]);

  const clearFilters = () => {
    setSelectedPriceBucket(null);
    setSelectedColors([]);
  };

  const activeFilterCount = (selectedPriceBucket ? 1 : 0) + selectedColors.length;

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      {/* Price Filter */}
      <div>
        <h3 className="font-heading text-lg text-primary mb-4">Price</h3>
        <div className="flex flex-col gap-3 font-body text-sm">
          {PRICE_BUCKETS.map((bucket) => (
            <label key={bucket.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                selectedPriceBucket === bucket.id ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'
              }`}>
                {selectedPriceBucket === bucket.id && <Check className="w-3 h-3" />}
              </div>
              <input 
                type="radio" 
                name="price" 
                className="hidden"
                checked={selectedPriceBucket === bucket.id}
                onChange={() => setSelectedPriceBucket(selectedPriceBucket === bucket.id ? null : bucket.id)}
              />
              <span className="text-foreground">{bucket.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-gray-200 w-full" />

      {/* Color Filter */}
      <div>
        <h3 className="font-heading text-lg text-primary mb-4">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                  isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="w-3.5 h-3.5 rounded-full border border-black/10" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-body font-medium text-foreground">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {activeFilterCount > 0 && (
        <button 
          onClick={clearFilters}
          className="text-sm font-body text-gray-500 hover:text-primary transition-colors text-left underline underline-offset-4"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  if (!category) return null;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 min-h-[70vh]">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading text-primary mb-4">
          {category.name}
        </h1>
        <p className="text-gray-500 font-body text-sm uppercase tracking-wider">
          {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-[120px]">
          <FilterContent />
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between lg:justify-end mb-8 pb-4 border-b border-gray-200">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-foreground font-body text-sm font-medium border border-gray-200 px-4 py-2 rounded-full hover:bg-card transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter {activeFilterCount > 0 && <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{activeFilterCount}</span>}
            </button>

            {/* Sort Dropdown */}
            <div className="relative z-20">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 text-foreground font-body text-sm font-medium border border-transparent hover:border-gray-200 px-4 py-2 rounded-full transition-colors"
              >
                Sort by: {sortOption === 'newest' ? 'Newest' : sortOption === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isSortDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-2 flex flex-col font-body text-sm"
                  >
                    <button 
                      onClick={() => { setSortOption("newest"); setIsSortDropdownOpen(false); }}
                      className={`text-left px-4 py-2 hover:bg-card transition-colors ${sortOption === "newest" ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      Newest
                    </button>
                    <button 
                      onClick={() => { setSortOption("price-asc"); setIsSortDropdownOpen(false); }}
                      className={`text-left px-4 py-2 hover:bg-card transition-colors ${sortOption === "price-asc" ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      Price: Low to High
                    </button>
                    <button 
                      onClick={() => { setSortOption("price-desc"); setIsSortDropdownOpen(false); }}
                      className={`text-left px-4 py-2 hover:bg-card transition-colors ${sortOption === "price-desc" ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      Price: High to Low
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center text-gray-400 mb-6">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">No products found</h3>
              <p className="font-body text-gray-500 max-w-md mb-8">
                We couldn't find anything matching your current filters. Try adjusting them or clear all filters to see more products.
              </p>
              <button 
                onClick={clearFilters}
                className="bg-primary text-white font-body font-medium px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[85%] max-w-sm h-full bg-background z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-heading text-primary">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent />
              </div>

              <div className="p-6 border-t border-gray-200 bg-white">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-primary text-white font-body font-medium px-4 py-4 rounded-md shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Show {filteredAndSortedProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
