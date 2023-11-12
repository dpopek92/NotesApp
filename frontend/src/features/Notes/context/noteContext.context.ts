import { createContext, useContext } from "react";
import { INote } from "../interfaces/Notes.interface";

interface INoteContext {
  goToNote: (note: INote) => void;
}

const NoteContext = createContext<INoteContext>({
  goToNote: (note: INote) => {},
});

export const useNoteContext = () => useContext(NoteContext);
export default NoteContext;
