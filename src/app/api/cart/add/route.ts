import { getOrCreateCart, insertOrUpdateCartItem } from "@/lib/action/cart";
import { getUserAuth } from "@/lib/auth/utils";
import { addToCartSchema } from "@/lib/validations/cart-vals";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = true
export async function POST(req: NextRequest): Promise<any> {
  try {
    const body = await req.json();
    const { productId, size } = addToCartSchema.parse(body)

    const { session } = await getUserAuth();
    if (!session) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const profileId = session?.user.id;
    const { cart } = await getOrCreateCart(profileId!);
    await insertOrUpdateCartItem(productId, cart.id, size);

    const path = req.nextUrl.searchParams.get('path') || '/'
    revalidatePath(path)

    return NextResponse.json({
      msg: "added to cart successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "something went wrong!" },
      { status: 500 }
    );
  }
}
