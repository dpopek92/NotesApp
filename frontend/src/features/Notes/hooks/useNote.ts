import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { IUpdateNote, notesApi } from "../api/notes.api";

// Custom hook for managing note data
const useNote = (id?: string) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  // Fetch the note data
  const {
    data,
    isLoading: isNoteLoading,
    isError,
    refetch: refetchNote,
  } = useQuery({
    queryKey: ["get-note", id],
    queryFn: () => notesApi.get(id),
    enabled: !!id,
  });

  const handleError = () =>
    addToast("Something went wrong", { appearance: "error" });

  // Mutation for updating a note
  const { mutateAsync: updateNote, isPending: isUpdating } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: ({ title, content }: IUpdateNote) => {
      return notesApi.update(id, { title, content });
    },
    onSuccess: async () => {
      navigate(`/notes/${id}`);
    },
    onError: () => {
      handleError();
    },
  });

  // Mutation for removing a note
  const { mutateAsync: removeNote, isPending: isRemoving } = useMutation({
    mutationKey: ["remove-note"],
    mutationFn: () => {
      return notesApi.remove(id);
    },
    onSuccess: async () => {
      navigate("/notes");
    },
    onError: () => {
      handleError();
    },
  });

  const note = data?.data;
  const isLoading = isNoteLoading || isUpdating || isRemoving;
  const redirectToEditNote = () => navigate(`/notes/${id}/edit`);

  return {
    note,
    isLoading,
    isError,
    refetchNote,
    updateNote,
    removeNote,
    redirectToEditNote,
  };
};

export default useNote;
