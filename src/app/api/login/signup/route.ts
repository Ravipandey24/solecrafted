import { createProfile } from "@/lib/api/profiles/mutations";
import { hash } from "@/lib/hash";
import { signUpFormSchema } from "@/lib/validations/client-vals";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = signUpFormSchema.parse(body);

    const hashedPassword = await hash(password);
    const result = await createProfile({ name, email, password: hashedPassword });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    if(result.success) {
      return NextResponse.json({
        msg: ["user added successfully"],
        success: true,
      });
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "something went wrong!" },
      { status: 500 }
    );
  }
}
