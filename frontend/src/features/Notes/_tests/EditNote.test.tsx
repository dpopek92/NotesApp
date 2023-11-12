import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import dayjs from "dayjs";
import EditNotePage from "../Pages/EditNotePage";

jest.mock("../hooks/useNote", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router", () => ({
  useParams: () => ({ id: "1" }),
  useLocation: () => ({}),
}));

describe("EditNotePage", () => {
  const loadingSpinnerTestId = "spinner-test-id";
  const noteFormTestId = "note-form-test-id";

  const date = dayjs();
  const mockNote = {
    _id: "123",
    title: "Test Title",
    content: "Test Content",
    createdAt: date.toDate(),
  };
  const mockUpdateNote = jest.fn();
  const mockUseNoteValue = {
    note: mockNote,
    isLoading: false,
    isError: false,
    updateNote: mockUpdateNote,
  };

  const setup = () => render(<EditNotePage />);
  const mockUseNoteReturnValue = (value: any) =>
    require("../hooks/useNote").default.mockReturnValue(value);

  it("should renders loading spinner when fetching note", async () => {
    mockUseNoteReturnValue({
      isLoading: true,
    });
    setup();

    expect(screen.getByTestId(loadingSpinnerTestId)).toBeInTheDocument();
  });

  it("should renders error message when fetching fails", async () => {
    mockUseNoteReturnValue({
      isError: true,
    });
    setup();

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should renders PageHader with title", async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    expect(screen.getByText("Edit note")).toBeInTheDocument();
  });

  it("should renders NoteForm", async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    expect(screen.getByTestId(noteFormTestId)).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue("Test Title");
    expect(screen.getByLabelText("Content")).toHaveValue("Test Content");
  });

  it("calls updateNote on NoteForm submission", async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalled();
    });
  });
});
