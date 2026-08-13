import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/constants/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link 
      href={`/shop/${product.categorySlug}/${product.handle}`} 
      className={cn(
        "group flex flex-col gap-4 p-3 -m-3 rounded-xl transition-all duration-300 hover:bg-card hover:shadow-lg", 
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-sm z-10">
            New
          </div>
        )}
        {product.originalPrice && !product.isNew && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-sm z-10">
            Sale
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-1.5 mb-1">
          {product.colors.map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
          </span>
        </div>
        
        <h3 className="font-heading text-lg text-foreground truncate group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 font-body text-sm">
          <span className="font-medium text-foreground">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
