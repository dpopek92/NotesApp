import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ISearchNotes, notesApi } from "../api/notes.api";

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
  const redirectToNote = (id: string) => navigate(`/notes/${id}`);

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
