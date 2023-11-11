import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import PageHeader from "common/components/PageHeader/PageHeader";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { INewNote, notesApi } from "../api/notes.api";
import NoteForm from "../components/NoteForm/NoteForm";

const NewNotePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  // Mutation for creating a new note
  const { mutateAsync: createNote, isPending: isCreating } = useMutation({
    mutationKey: ["create-note"],
    mutationFn: (body: INewNote) => {
      return notesApi.create(body);
    },
    onSuccess: (res) => {
      navigate(`/notes/${res.data._id}`);
    },
    onError: () => {
      addToast("Something went wrong", { appearance: "error" });
    },
  });

  return (
    <Container className="mt-3">
      {isCreating && <LoadingSpinner />}
      <PageHeader title="New note" />
      <NoteForm handleSubmit={createNote} />
    </Container>
  );
};

export default NewNotePage;
