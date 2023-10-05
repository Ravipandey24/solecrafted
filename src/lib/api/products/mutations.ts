import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  NewProduct,
  ProductId,
  productIdSchema,
  insertProductSchema,
  products,
} from "@/lib/db/schema/schema";


export const createProduct = async (product: NewProduct) => {
  const newProduct = insertProductSchema.parse(product);
  try {
    // @ts-ignore
    await db.insert(products).values(newProduct);
    return { success: true };
  } catch (error: any) {
    if ((error as Error).message && (error as Error).message.includes('AlreadyExists')){
      return { error: 'Product already exists!' };
    }
    console.error('new product', error);
    return { error: "Something went wrong!" };
  }
};

export const updateProduct = async (id: ProductId, product: NewProduct) => {
  const { id: productId } = productIdSchema.parse({ id });
  const newProduct = insertProductSchema.parse(product);
  try {
    // @ts-ignore
    await db.update(products).set(newProduct).where(eq(products.id, productId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteProduct = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  try {
    await db.delete(products).where(eq(products.id, productId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
