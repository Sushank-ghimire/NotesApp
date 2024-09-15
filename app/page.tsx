"use client";
import NoteCard from "@/components/NoteCard";
import { Button } from "@/components/ui/button";
import { useUserDataContext } from "@/context/UserDataProvider";
import { NoteTypes } from "@/types/Note.types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const { userData, notes } = useUserDataContext();

  const router = useRouter();

  useEffect(() => {
    if (userData.email === "" || userData.userName === "") {
      router.push("/login");
    }
    router.refresh();
  }, [userData, router, notes]);

  if (userData.email === "" || userData.userName === "") return <></>;

  return (
    <main className="w-[90vw] md:w-[80vw] mx-auto flex gap-4 flex-col">
      <div className="flex justify-between p-4 w-full items-center">
        <h1 className="font-bold">Your's Notes</h1>
        <Button onClick={() => router.push("/add")}>Add Notes</Button>
      </div>
      <div className="p-4 w-full">
        {notes.length === 0 && (
          <h1 className="text-center font-bold">You don't have any notes!</h1>
        )}
        <div className="flex space-y-4 md:flex-row flex-col w-full mx-auto flex-wrap gap-4">
          {notes.length > 0 &&
            notes.map((note: NoteTypes) => (
              <NoteCard notes={note} key={note._id} />
            ))}
        </div>
      </div>
    </main>
  );
}
