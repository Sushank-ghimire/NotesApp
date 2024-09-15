import { Dispatch, SetStateAction } from 'react';
import { NoteTypes } from './Note.types';

// Define the structure for user data
type UserData = {
    email: string;  // Use the lowercase 'string' for primitive types
    userName: string;  // Same for 'string' here
};

// Define the structure for the user context
export type UserContextData = {
    userData: UserData;  // Data type for userData
    setUserData: Dispatch<SetStateAction<UserData>>;  // Only a single semicolon needed
    notes: NoteTypes [];
    setNotes: Dispatch<SetStateAction<NoteTypes []>>;
};
