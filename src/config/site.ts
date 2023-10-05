import { linkify } from "@/lib/utils";
import { productCategories, productGenderCategories } from "./product";
import { z } from "zod";
import { Sedgwick_Ave_Display } from "next/font/google";

const titleFont = Sedgwick_Ave_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});
export const NavConfig: NavConfigType = {
  name: "SoleCrafted",
  description: "An e-commerce shoes website.",
  headingFont: titleFont,
  url: "/",
  NavItems: productGenderCategories.map((category) => ({
    title: category.title,
    items: [
      {
        title: "All",
        href: `/gender/${linkify(category.title)}`,
      },
      ...category.subcategories.map((subCategory) => ({
        title: subCategory,
        href: `/gender/${linkify(category.title)}/${linkify(subCategory)}`,
      })),
    ],
  })) as NavConfigType["NavItems"],
};

export const categoryTab = productCategories.map((category) => ({
  title: category,
  href: `/category/${linkify(category)}`,
  image: `/images/categories/${linkify(category)}.jpg`
})) as CategoryTabItem[];
