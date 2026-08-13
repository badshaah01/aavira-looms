import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { categories } from "@/constants/categories";
import { 
  MessageCircle, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  HeadphonesIcon 
} from "lucide-react";

const SUPPORT_LINKS = [
  { name: "Contact Us", href: "/pages/contact" },
  { name: "Shipping Policy", href: "/pages/shipping" },
  { name: "Returns & Refunds", href: "/pages/returns" },
  { name: "Privacy Policy", href: "/pages/privacy" },
  { name: "Terms & Conditions", href: "/pages/terms" },
];

export function Footer() {
  const { footer, name } = siteConfig;
  const shopCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(4);

  const badgeIcons = [Truck, RefreshCcw, ShieldCheck, HeadphonesIcon];

  return (
    <footer className="bg-background pt-16">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Brand + Trust Badges + Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-16 border-b border-gray-200">
          
          {/* Brand & Social */}
          <div className="w-full lg:w-1/3 flex flex-col items-start">
            <Link href="/" className="text-3xl font-heading text-primary mb-4">
              {name}
            </Link>
            <p className="text-[#3A2E22]/80 font-body mb-6 max-w-sm">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-4">
              <Link href={footer.socialLinks.instagram} aria-label="Instagram" className="text-[#3A2E22] hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href={footer.socialLinks.facebook} aria-label="Facebook" className="text-[#3A2E22] hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href={footer.socialLinks.whatsapp} aria-label="WhatsApp" className="text-[#3A2E22] hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1: Shop */}
            <div className="flex flex-col">
              <h3 className="font-heading text-xl text-primary mb-6">Shop</h3>
              <ul className="space-y-3 font-body">
                {shopCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/${cat.slug}`} className="text-[#3A2E22] hover:text-primary transition-colors text-sm">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: More */}
            <div className="flex flex-col">
              <h3 className="font-heading text-xl text-primary mb-6">More</h3>
              <ul className="space-y-3 font-body">
                {moreCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/${cat.slug}`} className="text-[#3A2E22] hover:text-primary transition-colors text-sm">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="flex flex-col col-span-2 md:col-span-1 mt-4 md:mt-0">
              <h3 className="font-heading text-xl text-primary mb-6">Support</h3>
              <ul className="space-y-3 font-body">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#3A2E22] hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="py-12 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {footer.trustBadges.map((badge, index) => {
              const Icon = badgeIcons[index];
              return (
                <div key={index} className="flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[#3A2E22] font-medium font-body text-sm">
                    {badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#E7E0D2] py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#3A2E22]/70 font-body text-sm">
            {footer.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
