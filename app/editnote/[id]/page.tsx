"use client";
import React, { useEffect, useState } from "react";
import EditNotes from "@/components/EditNotes";
import { NoteEditParams } from "@/types/Noteparams.types";
import { useUserDataContext } from "@/context/UserDataProvider";
import { NoteTypes } from "@/types/Note.types";

const Editor = ({ params }: { params: NoteEditParams }) => {
  const { id } = params;
  const [editingNote, setEditingNote] = useState<NoteTypes []>([]);
  const { notes } = useUserDataContext();
  useEffect(() => {
    setEditingNote(notes.filter((note) => note._id === id));
  }, [notes])
  
  notes.length === 0 && (
    <div>Loading....</div>
  )
  return editingNote.length > 0 && <EditNotes note={editingNote[0]} />;
  
};

export default Editor;
