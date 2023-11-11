import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ISearchNotes, notesApi } from "../api/notes.api";

const useNotes = (searchQuery: ISearchNotes) => {
  const navigate = useNavigate();

  const {
    data,
    isLoading: isNotesLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-notes", searchQuery],
    queryFn: () => notesApi.getAll(searchQuery),
  });

  // const { mutateAsync: createNote, isPending: isCreating } = useMutation({
  //   mutationKey: ["create-note"],
  //   mutationFn: (body: INewNote) => {
  //     return notesApi.create(body);
  //   },
  //   onSuccess: async () => {
  //     await refetch();
  //   },
  //   onError: () => {
  //     addToast("Something went wrong", { appearance: "error" });
  //   },
  // });

  const notes = data?.data.content;
  const totalItems = data?.data.totalItems;
  const isLoading = isNotesLoading;
  const refetchNotes = refetch;
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
