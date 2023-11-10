import { createContext, useContext } from "react";
import { INote } from "../interfaces/Notes.interface";

interface INoteContext {
  setToUpdate: (note: INote) => void;
  setToRemove: (id: string) => void;
}

const NoteContext = createContext<INoteContext>({
  setToUpdate: (note: INote) => {},
  setToRemove: (id: string) => {},
});

export const useNoteContext = () => useContext(NoteContext);
export default NoteContext;
