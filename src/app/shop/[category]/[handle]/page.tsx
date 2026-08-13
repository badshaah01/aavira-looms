import { notFound } from "next/navigation";
import { products } from "@/constants/products";
import { categories } from "@/constants/categories";
import { ProductDetail } from "@/components/shop/ProductDetail";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    category: string;
    handle: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: categorySlug, handle } = await params;
  const product = products.find(
    (p) => p.handle === handle && p.categorySlug === categorySlug
  );
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const category = categories.find((c) => c.slug === categorySlug);

  return {
    title: `${product.title} | ${category?.name || "Aavira Looms"}`,
    description: `Shop the ${product.title}. Premium quality and design, crafted with care for your home.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, handle } = await params;
  const product = products.find(
    (p) => p.handle === handle && p.categorySlug === categorySlug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
