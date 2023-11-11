import CustomPagination from "common/components/CustomPagination/CustomPagination";
import Empty from "common/components/Empty/Empty";
import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import PageHeader from "common/components/PageHeader/PageHeader";
import { useControlledDebounce } from "common/hooks/useControlledDebounce";
import usePagination from "common/hooks/usePagination";
import { useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import NotesList from "../components/NotesList/NotesList";
import NoteContext from "../context/noteContext.context";
import useNotes from "../hooks/useNotes";

const NotesPage = () => {
  const navigate = useNavigate();
  const {
    itemsPerPage,
    pageNumber,
    totalPages,
    setTotalItems,
    handlePagination,
    handleItemsPerPage,
  } = usePagination({ pageNumber: 1, itemsPerPage: 5 });

  const { value, debouncedValue, handleDebouncedValue } =
    useControlledDebounce();
  const { notes, totalItems, isLoading, isError, redirectToNote } = useNotes({
    itemsPerPage,
    pageNumber,
    title: debouncedValue,
  });

  useEffect(() => {
    if (totalItems) {
      setTotalItems(totalItems);
    }
  }, [totalItems]);

  const redirectToNewNote = () => navigate("/new-note");

  if (isError)
    return (
      <Alert className="m-3" variant="danger">
        Something went wrong
      </Alert>
    );
  return (
    <Container className="my-3">
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
          <Button
            key={1}
            size="sm"
            className="w-50"
            variant="outline-primary"
            onClick={redirectToNewNote}
          >
            Add note
          </Button>,
        ]}
      />

      {!notes?.length && !isLoading ? (
        <Empty />
      ) : (
        <NoteContext.Provider
          value={{
            goToNote: redirectToNote,
          }}
        >
          <NotesList notes={notes} />
        </NoteContext.Provider>
      )}
      <div className="d-flex justify-content-end mt-3">
        <CustomPagination
          pageNumber={pageNumber}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          handleItemsPerPage={handleItemsPerPage}
          handlePagination={handlePagination}
        />
      </div>
    </Container>
  );
};

export default NotesPage;
