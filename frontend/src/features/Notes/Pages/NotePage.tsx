import ConfirmationModal from "common/components/ConfirmationModal/Confirmation.modal";
import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import PageHeader from "common/components/PageHeader/PageHeader";
import dayjs from "dayjs";
import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import useNote from "../hooks/useNote";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, isLoading, isError, removeNote, redirectToEditNote } =
    useNote(id);

  const [confirmRemoveNoteModal, setConfirmRemoveNoteModal] =
    useState<boolean>(false);

  const handleRemoveNote = async () => {
    await removeNote();
    navigate("/notes");
  };

  if (isError)
    return (
      <Alert className="m-3" variant="danger">
        Something went wrong
      </Alert>
    );
  return (
    <Container className="mt-3">
      {isLoading && <LoadingSpinner />}
      <PageHeader
        title={note?.title || "Note"}
        subtitle={note ? dayjs(note.createdAt).format("DD.MM.YYYY, HH:mm") : ""}
        menu={[
          <Button
            key={0}
            size="sm"
            variant="outline-primary"
            onClick={redirectToEditNote}
          >
            Edit
          </Button>,
          <Button
            key={1}
            size="sm"
            variant="outline-danger"
            onClick={() => setConfirmRemoveNoteModal(true)}
          >
            Remove
          </Button>,
        ]}
      />

      <div className="p-3">{note?.content}</div>

      {/* NOTE MODALS */}
      {confirmRemoveNoteModal && (
        <ConfirmationModal
          onOk={handleRemoveNote}
          closeModal={() => setConfirmRemoveNoteModal(false)}
          confirmationText="Deleting a note is irreversible."
        />
      )}
    </Container>
  );
};

export default NotePage;
