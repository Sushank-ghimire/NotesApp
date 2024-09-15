import { NextRequest, NextResponse } from "next/server";
import UserNotes from "@/models/User.model";
import { connectDb } from "@/utils/DbConnect";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  const id = searchParams.get("id");

  // Check if both email and note ID are provided
  if (!email || !id) {
    return NextResponse.json(
      { message: "Email and note ID are required." },
      { status: 400 }
    );
  }

  // Parse the request body to get the updated note details
  const {
    editedTitle,
    editedDescription,
  }: { editedTitle: string; editedDescription: string } = await req.json();

  console.log(editedDescription, editedTitle);

   const noteId = new mongoose.Types.ObjectId(id);

  await connectDb();

  try {
    // Find the user by email and update the note with the matching _id
    const result = await UserNotes.findOneAndUpdate(
      { email, "notes._id": noteId }, // Find the user by email and the note by its _id
      {
        $set: {
          "notes.$.title": editedTitle, // Update the title of the note
          "notes.$.description": editedDescription, // Update the description of the note
          "notes.$.time": `${new Date()}`,
        },
      },
      { new: true } // Return the updated document
    );

    if (!result) {
      return NextResponse.json(
        { message: "Failed to update the note." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully.", note: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the note." },
      { status: 500 }
    );
  }
}
