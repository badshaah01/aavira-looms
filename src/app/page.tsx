import { siteConfig } from "@/constants/site";
import { categories } from "@/constants/categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-heading text-primary mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-xl text-foreground mb-8">
          {siteConfig.tagline} - {siteConfig.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {categories.map((cat) => (
            <div key={cat.slug} className="bg-card text-card-foreground p-6 rounded-lg text-center font-body shadow-sm hover:shadow-md transition-shadow">
              {cat.name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
