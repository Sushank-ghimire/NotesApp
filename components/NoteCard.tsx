"use client";
import { NoteTypes } from "@/types/Note.types";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import React from "react";
import { useUserDataContext } from "@/context/UserDataProvider";
import { useRouter } from "next/navigation";

const NoteCard = ({ notes }: { notes: NoteTypes }) => {
  const { userData, setNotes } = useUserDataContext();

  const router = useRouter();

  async function deleteNotes(id: string) {
    const deletion = confirm("Do you want to delete the note ?");
    if (deletion) {
      try {
        const response = await fetch(
          `/api/addnotes?email=${userData.email}&id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setNotes((prevNotes: NoteTypes[]) =>
            prevNotes.filter((note) => note._id !== id)
          );
        }

        alert(data.message);
        router.refresh();
      } catch (error: any) {
        console.error("Error on deletion of note : ", error.message);
      }
    } else return;
  }

  function editNotes(id: string) {
    router.push(`/editnote/${id}`);
  }

  const date = new Date(notes.date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // e.g., Saturday
    year: "numeric", // e.g., 2024
    month: "long", // e.g., September
    day: "numeric", // e.g., 14
    hour: "2-digit", // e.g., 06
    minute: "2-digit", // e.g., 32
    second: "2-digit", // e.g., 01
    hour12: true, // e.g., AM/PM format
  };

  const englishDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="bg-slate-200 rounded-lg p-3 text-xl flex flex-col space-y-4 mx-auto md:w-1/3">
      <h1 className="text-center w-full font-bold first-letter:capitalize mb-1">
        {notes.title}
      </h1>
      <p className="text-lg h-[100px] text-justify first-letter:capitalize">
        {notes.description}
      </p>
      <p className="text-right text-xs">{englishDate}</p>
      <div className="flex justify-between text-xs">
        <button
          onClick={() => editNotes(notes._id)}
          className="text-green-600 flex space-x-2"
        >
          <FaEdit color="green" size={20} />
        </button>
        <button
          onClick={async () => await deleteNotes(notes._id)}
          className="text-red-600 flex space-x-2"
        >
          <MdDelete color="red" size={20} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
