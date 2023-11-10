import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { ISearchNotes, IUpdateNote, notesApi } from "../api/notes.api";

const useNotes = (searchQuery: ISearchNotes) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const {
    data,
    isLoading: isNotesLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-notes", searchQuery],
    queryFn: () => notesApi.getAll(searchQuery),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: updateNoteData, isPending: isUpdating } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: ({ id, body }: { id: string; body: IUpdateNote }) => {
      return notesApi.update(id, body);
    },
    onSuccess: async () => {
      await refetch();
    },
    onError: () => {
      addToast("Something went wrong", { appearance: "error" });
    },
  });

  const { mutateAsync: removeNote, isPending: isRemoving } = useMutation({
    mutationKey: ["remove-note"],
    mutationFn: (noteId: string) => {
      return notesApi.remove(noteId);
    },
    onSuccess: async () => {
      await refetch();
    },
    onError: () => {
      addToast("Something went wrong", { appearance: "error" });
    },
  });

  const notes = data?.data.content;
  const totalItems = data?.data.totalItems;
  const isLoading = isNotesLoading || isUpdating || isRemoving;
  const refetchNotes = refetch;
  const redirectToNote = (noteId: string) => navigate(`notes/${noteId}`);
  const updateNote = (id: string, body: IUpdateNote) => {
    return updateNoteData({ id, body });
  };

  return {
    notes,
    totalItems,
    isLoading,
    isError,
    refetchNotes,
    redirectToNote,
    updateNote,
    removeNote,
  };
};

export default useNotes;
