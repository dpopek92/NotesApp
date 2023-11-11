import { createContext, useContext } from "react";

interface INoteContext {
  goToNote: (id: string) => void;
}

const NoteContext = createContext<INoteContext>({
  goToNote: (id: string) => {},
});

export const useNoteContext = () => useContext(NoteContext);
export default NoteContext;
