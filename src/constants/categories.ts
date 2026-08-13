export type Category = {
  name: string;
  slug: string;
  image: string;
};

export const categories: Category[] = [
  { name: "Bedsheets", slug: "bedsheets", image: "/images/categories/bedsheets.jpg" },
  { name: "Curtains", slug: "curtains", image: "/images/categories/curtains.jpg" },
  { name: "Cushion Covers", slug: "cushion-covers", image: "/images/categories/cushion-covers.jpg" },
  { name: "Runners", slug: "runners", image: "/images/categories/runners.jpg" },
  { name: "Kids", slug: "kids", image: "/images/categories/kids.jpg" },
  { name: "Towels & Kitchen", slug: "towels-and-kitchen", image: "/images/categories/towels-kitchen.jpg" },
  { name: "Quilts", slug: "quilts", image: "/images/categories/quilts.jpg" },
  { name: "Dohar Sets", slug: "dohar-sets", image: "/images/categories/dohar-sets.jpg" },
];
