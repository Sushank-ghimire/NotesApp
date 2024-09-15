import UserNotes from "@/models/User.model";
import { connectDb } from "@/utils/DbConnect";
import { isSamePass } from "@/utils/HashPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } =
      await req.json();
    await connectDb();

    const user = await UserNotes.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const isPasswordValid = await isSamePass(password, user.password);

    const userData = {
      username: user.username,
      email: user.email,
    };

    if (isPasswordValid) {
      return NextResponse.json(
        { message: "User logged in successfully", userData: userData },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error:", error); // Optional: Log the error for debugging
    return NextResponse.json(
      { message: "Error occurred", error: error.message },
      { status: 500 }
    );
  }
}
