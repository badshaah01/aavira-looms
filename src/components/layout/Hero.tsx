"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/constants/site";
import Link from "next/link";

const TILE_A_IMAGES = ["/images/hero/hero-1.jpg", "/images/hero/hero-4.jpg", "/images/hero/hero-7.jpg"];
const TILE_B_IMAGES = ["/images/hero/hero-2.jpg", "/images/hero/hero-5.jpg", "/images/hero/hero-8.jpg"];
const TILE_C_IMAGES = ["/images/hero/hero-3.jpg", "/images/hero/hero-6.jpg", "/images/hero/hero-9.jpg"];

function useImageCycle(images: string[], intervalMs: number, offsetMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // The initial timeout creates the stagger effect so they don't all change at once
    const initialTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      
      // Start the regular interval after the staggered first transition
      timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, intervalMs);
    }, intervalMs + offsetMs);

    return () => {
      clearTimeout(initialTimer);
      if (timer) clearInterval(timer);
    };
  }, [images.length, intervalMs, offsetMs]);

  return index;
}

function CrossfadeImage({ images, currentIndex, priority = false }: { images: string[], currentIndex: number, priority?: boolean }) {
  return (
    <div className="relative w-full h-full bg-muted">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Hero image"
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  // 5-second interval for all tiles, but staggered start times
  const indexA = useImageCycle(TILE_A_IMAGES, 5000, 0); 
  const indexB = useImageCycle(TILE_B_IMAGES, 5000, 1500); 
  const indexC = useImageCycle(TILE_C_IMAGES, 5000, 3000);

  return (
    <section className="relative w-full bg-background flex flex-col lg:flex-row overflow-hidden min-h-screen lg:h-[85vh]">
      
      {/* Left side: Text Panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 py-12 md:py-16 lg:px-16 lg:py-20 z-10 order-1">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary mb-6 leading-tight">
            {siteConfig.hero.headline}
          </h1>
          <p className="text-lg md:text-xl font-body text-foreground/80 mb-10 leading-relaxed">
            {siteConfig.hero.subheadline}
          </p>
          <Link 
            href={siteConfig.hero.ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
          >
            {siteConfig.hero.ctaText}
          </Link>
        </motion.div>
      </div>

      {/* Right side: Image Grid */}
      <div className="w-full lg:w-[55%] h-[60vh] lg:h-full p-4 md:p-6 lg:p-8 lg:pl-0 order-2">
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3 lg:gap-6">
          
          {/* Tile A: Wide top on mobile, large left on desktop */}
          <div className="col-span-2 row-span-1 lg:col-span-1 lg:row-span-2 rounded-2xl overflow-hidden shadow-md relative">
             <CrossfadeImage images={TILE_A_IMAGES} currentIndex={indexA} priority={true} />
          </div>
          
          {/* Tile B: Bottom left on mobile, top right on desktop */}
          <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md relative">
             <CrossfadeImage images={TILE_B_IMAGES} currentIndex={indexB} />
          </div>
          
          {/* Tile C: Bottom right on mobile, bottom right on desktop */}
          <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md relative">
             <CrossfadeImage images={TILE_C_IMAGES} currentIndex={indexC} />
          </div>

        </div>
      </div>

    </section>
  );
}
