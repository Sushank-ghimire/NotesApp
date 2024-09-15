import UserNotes from "@/models/User.model";
import { connectDb } from "@/utils/DbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description }: { title: string; description: string } =
    await req.json();

  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  const note = {
    title: title,
    description: description,
  };

  await connectDb();
  const result = await UserNotes.findOneAndUpdate(
    { email }, // Filter: find the user by email
    { $push: { notes: note } }, // Push the new note object to the notes array
    { new: true, useFindAndModify: false } // Return the updated document
  );

  if (!result) {
    return NextResponse.json(
      { message: "Failed to add the notes." },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      message: "Note added successfully.",
    },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  const id = searchParams.get("id");

  if (!id || !email) {
    return NextResponse.json(
      { message: "Note ID and email are required." },
      { status: 400 }
    );
  }

  await connectDb();

  // Remove the note with the specified _id from the notes array of the user
  const result = await UserNotes.findOneAndUpdate(
    { email },
    { $pull: { notes: { _id: id } } }, // Pull the note with the matching _id from the notes array
    { new: true }
  );

  if (!result) {
    return NextResponse.json(
      { message: "Failed to delete the note." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: "Note deleted successfully.",
    },
    { status: 200 }
  );
}
