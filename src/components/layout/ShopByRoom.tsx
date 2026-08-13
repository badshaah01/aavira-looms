"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/constants/site";

export function ShopByRoom() {
  const { eyebrow, heading, rooms } = siteConfig.shopByRoom;
  
  // Two-tone heading logic (assuming "Shop by Room", make "Room" primary)
  const headingWords = heading.split(" ");
  const lastWord = headingWords.pop();
  const firstPart = headingWords.join(" ");

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-primary font-body text-sm font-semibold tracking-widest uppercase mb-4 block"
          >
            {eyebrow}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-foreground"
          >
            {firstPart} <span className="text-primary italic">{lastWord}</span>
          </motion.h2>
        </div>

        {/* Room Blocks */}
        <div className="flex flex-col gap-20 md:gap-32">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={room.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-20`}
              >
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full lg:w-5/12 flex flex-col items-start"
                >
                  <h3 className="text-3xl md:text-4xl font-heading text-primary mb-3">
                    {room.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-body mb-6 font-medium">
                    {room.categoryList}
                  </p>
                  <p className="text-foreground/80 font-body text-lg leading-relaxed mb-8 max-w-md">
                    {room.description}
                  </p>
                  <Link 
                    href={room.ctaLink}
                    className="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-body font-medium px-8 py-3 rounded-md transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </motion.div>

                {/* Image Collage */}
                <div className="w-full lg:w-7/12">
                  <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[400px] sm:h-[500px] md:h-[600px]">
                    
                    {/* Large Main Image */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`relative rounded-xl overflow-hidden shadow-lg ${isEven ? 'col-span-8 row-span-12' : 'col-span-8 col-start-5 row-span-12'}`}
                    >
                      <Image 
                        src={room.images[0]} 
                        alt={`${room.name} primary view`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>

                    {/* Smaller Images Strip (Vertical) */}
                    <div className={`col-span-4 row-span-12 flex flex-col gap-4 ${isEven ? '' : 'col-start-1 row-start-1'}`}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative rounded-xl overflow-hidden flex-1 shadow-md"
                      >
                        <Image src={room.images[1]} alt={`${room.name} detail 1`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative rounded-xl overflow-hidden flex-1 shadow-md"
                      >
                        <Image src={room.images[2]} alt={`${room.name} detail 2`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative rounded-xl overflow-hidden flex-1 shadow-md"
                      >
                        <Image src={room.images[3]} alt={`${room.name} detail 3`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
                      </motion.div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
