import UserNotes from "@/models/User.model";
import { connectDb } from "@/utils/DbConnect";
import { generateRefreshToken } from "@/utils/GenerateRefreshToken";
import { hashPassword } from "@/utils/HashPassword";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { email, username, password } = await req.json();
  try {
    if (!email || !username || !password) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // password = await hashPassword(password);

    const refreshToken = generateRefreshToken();

    await connectDb();
    await UserNotes.create({
      email,
      username,
      password,
      refreshToken: refreshToken,
    });

    // Set refresh token in cookies (secure, HttpOnly)
    const cookieStore = cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating account : ", error.message);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
