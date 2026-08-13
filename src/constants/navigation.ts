import { categories } from "./categories";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const categoryNavLinks = categories.map(c => ({
  name: c.name,
  href: `/shop/${c.slug}`
}));
