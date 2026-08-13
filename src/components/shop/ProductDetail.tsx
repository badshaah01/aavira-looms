"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ChevronDown, Check, Home, ChevronRight } from "lucide-react";
import { categories } from "@/constants/categories";
import type { Product } from "@/constants/products";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const category = categories.find((c) => c.slug === product.categorySlug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    // Placeholder action for UI
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-body"
          >
            <Check className="w-5 h-5" />
            <span>Added {quantity} item(s) to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-body text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop/${category?.slug}`} className="hover:text-primary transition-colors">
          {category?.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">
          {product.title}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-sm z-10">
                New
              </div>
            )}
            {product.originalPrice && !product.isNew && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-sm z-10">
                Sale
              </div>
            )}
          </div>

          {/* Thumbnail Strip (Gracefully handles single images) */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors snap-start",
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-gray-300"
                  )}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-3 font-body mb-8">
            <span className="text-2xl font-medium text-foreground">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading text-lg text-primary">Color</span>
                <span className="font-body text-sm text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center relative",
                        isSelected ? "border-primary scale-110" : "border-transparent hover:scale-105"
                      )}
                      aria-label={`Select ${color.name}`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full border border-black/10 shadow-sm" 
                        style={{ backgroundColor: color.hex }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Check className="w-5 h-5 text-white mix-blend-difference drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-3 sm:w-32 shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-body font-medium text-foreground w-8 text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white font-body font-medium rounded-md py-4 hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              Add to Cart
            </button>
          </div>

          <div className="h-[1px] bg-gray-200 w-full mb-8" />

          {/* Accordions */}
          <div className="flex flex-col gap-2">
            
            {/* Description Accordion */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion("description")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-card/50 transition-colors"
              >
                <span className="font-heading text-lg text-primary">Description</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-500 transition-transform duration-300", openAccordion === "description" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openAccordion === "description" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-sm font-body text-[#3A2E22]/80 leading-relaxed">
                      <p>Experience the perfect blend of comfort and style with our premium {category?.name.toLowerCase()} collection. Woven by master artisans using time-honored techniques, this piece adds an unmistakable touch of elegance to any living space.</p>
                      <ul className="list-disc pl-5 mt-4 space-y-1">
                        <li>100% premium quality material</li>
                        <li>Hand-finished edges for durability</li>
                        <li>Designed to soften beautifully with time</li>
                      </ul>
                      <p className="mt-4 italic text-xs text-gray-400">*Placeholder text - swap via CMS or Shopify integration later.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Care Instructions Accordion */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion("care")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-card/50 transition-colors"
              >
                <span className="font-heading text-lg text-primary">Care Instructions</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-500 transition-transform duration-300", openAccordion === "care" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openAccordion === "care" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-sm font-body text-[#3A2E22]/80 leading-relaxed">
                      <p>To ensure the longevity of your home textiles, we recommend:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Machine wash cold with mild detergent</li>
                        <li>Tumble dry on low heat</li>
                        <li>Do not bleach</li>
                        <li>Warm iron if necessary</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping Accordion */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-card/50 transition-colors"
              >
                <span className="font-heading text-lg text-primary">Shipping & Returns</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-500 transition-transform duration-300", openAccordion === "shipping" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openAccordion === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-sm font-body text-[#3A2E22]/80 leading-relaxed">
                      <p><strong>Standard Shipping:</strong> Dispatches within 2-3 business days. Delivery within 5-7 days across India.</p>
                      <p className="mt-2"><strong>Returns:</strong> We offer an easy 7-day return policy on unused items in their original packaging. Please retain all tags.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
