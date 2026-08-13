import { notFound } from "next/navigation";
import { categories } from "@/constants/categories";
import { ProductListing } from "@/components/shop/ProductListing";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: `Shop our premium collection of ${category.name.toLowerCase()}. Crafted with care for your home.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  return <ProductListing categorySlug={categorySlug} />;
}
