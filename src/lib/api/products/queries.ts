import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import {
  productIdSchema,
  products,
  ProductId,
  selectProductSchema,
  Product,
} from "@/lib/db/schema/schema";

export const getProducts = async (count: "all" | number) => {
  if (count == "all") {
    const c = await db.select().from(products);
    return { products: c };
  }
  const c = await db.select().from(products).limit(count);
  return { products: c };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const [c] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));
  return { product: c };
};

export const getProductBySlug = async (slug: Product["slug"]) => {
  const { slug: productSlug } = selectProductSchema
    .pick({ slug: true })
    .parse({ slug });
  const [c] = await db
    .select()
    .from(products)
    .where(eq(products.slug, productSlug!));
  return { product: c };
};

export const getProductCountByCategory = async (
  category: Product["category"]
) => {
  const { category: productCategory } = selectProductSchema
    .pick({ category: true })
    .parse({ category });
  const [c] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.category, productCategory!));
  return { productCount: c.count };
};

export const getProductByCategory = async (
    category: Product["category"]
  ) => {
    const { category: productCategory } = selectProductSchema
      .pick({ category: true })
      .parse({ category });
    const c = await db
      .select()
      .from(products)
      .where(eq(products.category, productCategory!));
    return { products: c };
  };
