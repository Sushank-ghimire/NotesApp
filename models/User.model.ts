import mongoose, { Schema, model } from "mongoose";
import { noteSchema } from "./Notes.model";

// Define the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be required"],
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      unique: true,
    },
    password: {
      type: String,
      unique: [true, "Password is similar and can be cracked by others"],
      required: [true, "Password must be required"],
    },
    notes: [noteSchema],
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Use mongoose.models to prevent overwriting the model
const UserNotes = mongoose.models.UserNotes || model("UserNotes", userSchema);

export default UserNotes;
