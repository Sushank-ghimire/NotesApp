import { Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

export { noteSchema };
