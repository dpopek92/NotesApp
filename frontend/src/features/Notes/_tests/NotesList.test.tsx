import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import NotesList from "../components/NotesList/NotesList";
import { INote } from "../interfaces/Notes.interface";

describe("NotesList", () => {
  const listTestId = "notes-list-test-id";
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

  const setup = (notes?: INote[]) => render(<NotesList notes={notes} />);

  it("should renders without crashing", () => {
    setup();

    expect(screen.getByTestId(listTestId)).toBeInTheDocument();
  });

  it("should renders with notes", () => {
    setup(mockNotes);

    for (const mockNote of mockNotes) {
      expect(screen.getByText(mockNote.title)).toBeInTheDocument();
      expect(screen.getByText(mockNote.content)).toBeInTheDocument();
      expect(
        screen.getByText(dayjs(mockNote.createdAt).format("DD.MM.YYYY, HH:mm"))
      ).toBeInTheDocument();
    }
  });
});
