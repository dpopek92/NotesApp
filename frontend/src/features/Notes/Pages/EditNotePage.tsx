import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import PageHeader from "common/components/PageHeader/PageHeader";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router";
import NoteForm from "../components/NoteForm/NoteForm";
import useNote from "../hooks/useNote";

const EditNotePage = () => {
  const { id } = useParams();
  const { note, isLoading, isError, updateNote } = useNote(id);

  if (isError)
    return (
      <Alert className="m-3" variant="danger">
        Something went wrong
      </Alert>
    );
  return (
    <Container className="mt-3">
      {isLoading && <LoadingSpinner />}
      <PageHeader title="Edit note" />
      {!!note && <NoteForm handleSubmit={updateNote} initData={note} />}
    </Container>
  );
};

export default EditNotePage;
