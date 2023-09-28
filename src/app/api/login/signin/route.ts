import { getProfileByEmail } from "@/lib/api/profiles/queries";
import { validatePassword } from "@/lib/hash";
import { signInFormSchema } from "@/lib/validations/client-vals";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = signInFormSchema.parse(body);

    const { profile } = await getProfileByEmail(email);
    if (profile) {
      const isPasswordCorrect = await validatePassword(password, profile.password);
      if (isPasswordCorrect) {
        return NextResponse.json({
          msg: "login succesfull!",
          success: true,
          data: profile
        });
      }
      return NextResponse.json(
        { error: "Incorrect Password!" },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "user does not exists!" }, { status: 404 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "something went wrong!" },
      { status: 500 }
    );
  }
}
