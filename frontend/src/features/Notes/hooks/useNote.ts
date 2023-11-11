import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { IUpdateNote, notesApi } from "../api/notes.api";

const useNote = (id?: string) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const {
    data,
    isLoading: isNoteLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-note", id],
    queryFn: () => notesApi.get(id),
    enabled: !!id,
  });

  const { mutateAsync: updateNote, isPending: isUpdating } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: (body: IUpdateNote) => {
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
    mutationFn: () => {
      return notesApi.remove(id);
    },
    onSuccess: async () => {
      navigate("/notes");
    },
    onError: () => {
      addToast("Something went wrong", { appearance: "error" });
    },
  });

  const note = data?.data;
  const isLoading = isNoteLoading || isUpdating || isRemoving;
  const refetchNote = refetch;
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
