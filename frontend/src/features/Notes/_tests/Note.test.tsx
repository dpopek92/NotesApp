import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteContext from "features/Notes/context/noteContext.context";
import dayjs from "dayjs";
import Note from "../components/NotesList/Note";

describe("Note", () => {
  const noteTestId = "note-test-id";
  const date = dayjs();
  const mockNote = {
    _id: "123",
    title: "Test Title",
    content: "Test Content",
    createdAt: date.toDate(),
  };
  const mockGoToNote = jest.fn();

  const setup = () =>
    render(
      <NoteContext.Provider value={{ goToNote: mockGoToNote }}>
        <Note note={mockNote} />
      </NoteContext.Provider>
    );

  it("should renders without crashing", () => {
    setup();
    expect(screen.getByTestId(noteTestId)).toBeInTheDocument();
  });

  it("should displays note details", () => {
    setup();

    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(
      screen.getByText(date.format("DD.MM.YYYY, HH:mm"))
    ).toBeInTheDocument();
    expect(screen.getByText(mockNote.content)).toBeInTheDocument();
  });

  it('should calls goToNote when "Show details" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: "Show details" }));

    expect(mockGoToNote).toHaveBeenCalledWith(mockNote);
  });
});
