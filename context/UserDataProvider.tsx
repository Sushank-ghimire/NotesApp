"use client";
import { NoteTypes } from "@/types/Note.types";
import { UserContextData } from "@/types/UserDataContext.types";
import { createContext, useContext, useEffect, useState } from "react";

const userDataContext = createContext<UserContextData | null>(null);

export const ContextProvider: any = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
  });

  const [notes, setNotes] = useState<NoteTypes[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `/api/getAllNotes?email=${userData.email}`
        ); // Replace with actual email
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error: any) {
        console.error("Error while fetching notes : ", error.message);
      }
    };

    if (userData.email !== "" && userData.userName !== "") fetchNotes();
  }, []);

  return (
    <userDataContext.Provider
      value={{ userData, setUserData, notes, setNotes }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(userDataContext);
  if (!context) {
    throw new Error(
      "useUserDataContext must be used within a ContextProvider!"
    );
  }
  return context;
};
