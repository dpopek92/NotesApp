import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import NoteForm, { INoteData } from "../components/NoteForm/NoteForm";

describe("NoteForm", () => {
  const mockHandleSubmit = jest.fn();

  const setup = (initData?: INoteData) => {
    render(<NoteForm initData={initData} handleSubmit={mockHandleSubmit} />);
  };

  const fillForm = async (title: string, content: string) => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Title..."), {
        target: { value: title },
      });
      fireEvent.change(screen.getByPlaceholderText("Note content..."), {
        target: { value: content },
      });
    });
  };

  it("should renders form with initial data", () => {
    const initData = { title: "Test Title", content: "Test Content" };
    setup(initData);

    expect(screen.getByLabelText("Title")).toHaveValue(initData.title);
    expect(screen.getByLabelText("Content")).toHaveValue(initData.content);
  });

  it("should validates and submits the form successfully", async () => {
    setup();

    await fillForm("Valid Title", "Valid Content");

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it("should displays validation errors for invalid input", async () => {
    setup();

    await fillForm("", "");

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Note is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockHandleSubmit).not.toHaveBeenCalled();
    });
  });

  it("should displays character count for title and content", async () => {
    setup();

    await fillForm("Title", "Content");

    expect(screen.getByText("5/50")).toBeInTheDocument();
    expect(screen.getByText("7/500")).toBeInTheDocument();
  });
});
