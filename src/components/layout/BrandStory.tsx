"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/constants/site";

export function BrandStory() {
  const { brandStory } = siteConfig;

  return (
    <section className="bg-background py-24 md:py-32 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content - Top on mobile, Left on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col items-start order-1"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {brandStory.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary leading-tight mb-6">
              {brandStory.heading}
            </h2>
            <p className="text-lg text-[#3A2E22]/80 font-body leading-relaxed mb-10">
              {brandStory.body}
            </p>
            <Link 
              href={brandStory.ctaLink} 
              className="group flex items-center text-primary font-medium text-lg hover:text-primary/80 transition-colors"
            >
              <span className="relative inline-block pb-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                {brandStory.ctaLabel}
              </span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Image - Bottom on mobile, Right on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-lg order-2"
          >
            <Image
              src="/images/hero/hero-3.jpg"
              alt="Brand Story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
