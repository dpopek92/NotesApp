import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ISearchNotes, notesApi } from "../api/notes.api";
import { INote } from "../interfaces/Notes.interface";

// Custom hook for managing notes data
const useNotes = (searchQuery: ISearchNotes) => {
  const navigate = useNavigate();

  // Fetch the notes data
  const {
    data,
    isLoading: isNotesLoading,
    isError,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["get-notes", searchQuery],
    queryFn: () => notesApi.getAll(searchQuery),
  });

  const notes = data?.data.content;
  const totalItems = data?.data.totalItems;
  const isLoading = isNotesLoading;
  const redirectToNote = (note: INote) =>
    navigate(`/notes/${note._id}`, { state: note });

  return {
    notes,
    totalItems,
    isLoading,
    isError,
    refetchNotes,
    redirectToNote,
  };
};

export default useNotes;
