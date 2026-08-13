"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { categoryNavLinks, navigation } from "@/constants/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Placeholder for future search functionality
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setIsSearchExpanded(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 bg-background ${
          isScrolled ? "shadow-md py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-4 lg:w-1/4">
              <button
                className="lg:hidden text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Link href="/" className="text-2xl md:text-3xl font-heading text-primary whitespace-nowrap">
                {siteConfig.name}
              </Link>
            </div>

            {/* Desktop Navigation (Category Links) */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
              {categoryNavLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-body text-foreground hover:text-primary transition-colors whitespace-nowrap relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              {/* Dropdown for remaining categories if too many */}
              <div className="relative group">
                <span className="text-sm font-body text-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                  More
                </span>
                <div className="absolute top-full left-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                  <div className="bg-white shadow-lg rounded-md p-4 flex flex-col gap-3 min-w-[150px]">
                    {categoryNavLinks.slice(6).map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-body text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right: Search & Cart */}
            <div className="flex items-center justify-end gap-4 lg:w-1/4 relative">
              
              {/* Inline Search UI */}
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearchSubmit}
                    className="hidden md:flex absolute right-[80px] bg-white border border-gray-200 rounded-full overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 text-sm font-body focus:outline-none"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                className="text-foreground hover:text-primary transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-out Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-background z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Link href="/" className="text-2xl font-heading text-primary">
                  {siteConfig.name}
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-lg text-primary">Shop</h3>
                  {categoryNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-foreground font-body hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="h-[1px] bg-gray-200 w-full" />
                
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-lg text-primary">Menu</h3>
                  {navigation.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-foreground font-body hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
