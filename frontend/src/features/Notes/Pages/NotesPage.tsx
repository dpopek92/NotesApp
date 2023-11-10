import Empty from "common/components/Empty/Empty";
import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import PageHeader from "common/components/PageHeader/PageHeader";
import { useControledDebounce } from "common/hooks/useControledDebounce";
import usePagination from "common/hooks/usePagination";
import React, { useEffect } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";
import NotesList from "../components/NotesList/NotesList";
import useNotes from "../hooks/useNotes";

const NotesPage = () => {
  const { itemsPerPage, pageNumber, setTotalItems, Pagination } = usePagination(
    { pageNumber: 1, itemsPerPage: 5 }
  );
  const { value, debouncedValue, handleDebouncedValue } =
    useControledDebounce();
  const {
    notes,
    totalItems,
    isLoading,
    isError,
    refetchNotes,
    redirectToNote,
    updateNote,
    removeNote,
  } = useNotes({ itemsPerPage, pageNumber, title: debouncedValue });

  useEffect(() => {
    if (totalItems) {
      setTotalItems(totalItems);
    }
  }, [totalItems]);

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
        title="Notes page"
        menu={[
          <Form.Control
            key={0}
            size="sm"
            onChange={(e) => handleDebouncedValue(e.target.value)}
            value={value}
            placeholder="Title..."
          />,
          <Button key={1} size="sm" className="w-50">
            Add note
          </Button>,
        ]}
      />
      {!notes?.length ? (
        <Empty />
      ) : (
        <>
          <NotesList notes={notes} />
          <div className="d-flex justify-content-end mt-3">
            <Pagination />
          </div>
        </>
      )}
    </Container>
  );
};

export default NotesPage;
