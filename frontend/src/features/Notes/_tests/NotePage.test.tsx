import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NotePage from "../Pages/NotePage";
import dayjs from "dayjs";

jest.mock("../hooks/useNote", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router", () => ({
  useParams: () => ({ id: "1" }),
  useNavigate: () => jest.fn(),
  useLocation: () => ({}),
}));

describe("NotePage", () => {
  const loadingSpinnerTestId = "spinner-test-id";
  const modalTestId = "modal-template-test-id";
  const date = dayjs();
  const mockNote = {
    _id: "123",
    title: "Test Title",
    content: "Test Content",
    createdAt: date.toDate(),
  };
  const mockRemoveNote = jest.fn();
  const mockRedirectToEditNote = jest.fn();
  const mockUseNoteValue = {
    note: mockNote,
    isLoading: false,
    isError: false,
    removeNote: mockRemoveNote,
    redirectToEditNote: mockRedirectToEditNote,
  };

  const setup = () => render(<NotePage />);
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

  it("should displays note details", async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(mockNote.content)).toBeInTheDocument();
    expect(
      screen.getByText(date.format("DD.MM.YYYY, HH:mm"))
    ).toBeInTheDocument();
  });

  it('should opens confirmation modal on "Remove" button click', async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
  });

  it("should call removeNote when confirmed in modal", async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(mockRemoveNote).toHaveBeenCalled();
    });
  });

  it('should call goToEditNote on "Edit" button click', async () => {
    mockUseNoteReturnValue(mockUseNoteValue);
    setup();

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect(mockRedirectToEditNote).toHaveBeenCalled();
    });
  });
});
