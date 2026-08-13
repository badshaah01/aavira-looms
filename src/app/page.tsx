import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { categories } from "@/constants/categories";
import { Hero } from "@/components/layout/Hero";
import { BrandStory } from "@/components/layout/BrandStory";
import { ShopByRoom } from "@/components/layout/ShopByRoom";
import { Newsletter } from "@/components/layout/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-16">
        
        <h2 className="text-3xl font-heading text-primary mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              href={`/shop/${cat.slug}`}
              key={cat.slug} 
              className="group relative overflow-hidden bg-card rounded-lg font-body shadow-sm hover:shadow-md transition-shadow aspect-square block"
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent to-50% flex flex-col justify-end p-4">
                <span className="text-white font-medium text-lg drop-shadow-sm">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <ShopByRoom />
      <BrandStory />
      <Newsletter />
    </div>
  );
}
