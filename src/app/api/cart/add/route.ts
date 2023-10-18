import { getOrCreateCart, insertOrUpdateCartItem } from "@/lib/action/cart";
import { getUserAuth } from "@/lib/auth/utils";
import { addTOCartSchema } from "@/lib/validations/cart-vals";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, size } = addTOCartSchema.parse(body)
    
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
