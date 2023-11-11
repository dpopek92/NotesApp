import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import { INote } from "../interfaces/Notes.interface";
import NotesPage from "../Pages/NotesPage";

jest.mock("../hooks/useNotes", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../common/hooks/usePagination", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("NotesPage", () => {
  const loadingSpinnerTestId = "spinner-test-id";
  const mockNotes: INote[] = [
    {
      _id: "123",
      createdAt: dayjs().toDate(),
      title: "Test Title",
      content: "Test Content",
    },
    {
      _id: "321",
      createdAt: dayjs().add(1, "day").toDate(),
      title: "Test Title2",
      content: "Test Content2",
    },
  ];
  const mockRedirectToNote = jest.fn();
  const mockUseNotesValue = {
    notes: mockNotes,
    isLoading: false,
    isError: false,
    redirectToNote: mockRedirectToNote,
  };

  const setup = () => render(<NotesPage />);
  const mockUseNotesReturnValue = (value: any) =>
    require("../hooks/useNotes").default.mockReturnValue(value);
  const mockUsePaginationReturnValue = () =>
    require("../../../common/hooks/usePagination").default.mockReturnValue({
      itemsPerPage: 5,
      pageNumber: 1,
      totalPages: 3,
      setTotalItems: jest.fn(),
      handlePagination: jest.fn(),
      handleItemsPerPage: jest.fn(),
    });

  beforeEach(() => {
    mockUsePaginationReturnValue();
  });
  beforeAll(() => jest.clearAllMocks());

  it("should renders loading spinner when fetching notes", async () => {
    mockUseNotesReturnValue({
      isLoading: true,
    });

    setup();

    expect(screen.getByTestId(loadingSpinnerTestId)).toBeInTheDocument();
  });

  it("should renders error message when fetching fails", async () => {
    mockUseNotesReturnValue({
      isError: true,
    });
    setup();

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should displays notes", async () => {
    mockUseNotesReturnValue(mockUseNotesValue);
    setup();

    for (const mockNote of mockNotes) {
      expect(screen.getByText(mockNote.title)).toBeInTheDocument();
      expect(screen.getByText(mockNote.content)).toBeInTheDocument();
      expect(
        screen.getByText(dayjs(mockNote.createdAt).format("DD.MM.YYYY, HH:mm"))
      ).toBeInTheDocument();
    }
  });

  it('should call redirectToNote on "Show details" button click', async () => {
    mockUseNotesReturnValue(mockUseNotesValue);
    setup();

    fireEvent.click(screen.getAllByRole("button", { name: "Show details" })[0]);

    expect(mockRedirectToNote).toHaveBeenCalled();
  });
});
