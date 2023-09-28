import { linkify } from "@/lib/utils";
import { productCategories } from "./product";
import { z } from "zod";
import { Sedgwick_Ave_Display } from "next/font/google";

const titleFont = Sedgwick_Ave_Display({weight: '400', subsets:['latin'] ,display: 'swap', adjustFontFallback: false})
export const NavConfig: NavConfigType = {
  name: "SoleCrafted",
  description: "An e-commerce shoes website.",
  headingFont: titleFont,
  url: "/",
  NavItems: productCategories.map((category) => ({
    title: category.title,
    items: [
      {
        title: "All",
        href: `/categories/${linkify(category.title)}`,
      },
      ...category.subcategories.map((subCategory) => ({
        title: subCategory,
        href: `/categories/${linkify(category.title)}/${linkify(subCategory)}`,
      })),
    ]
  })) as NavConfigType['NavItems']
}

