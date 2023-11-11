import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmationModal from "../ConfirmationModal/Confirmation.modal";

describe("ConfirmationModal", () => {
  const confirmationText = "Test content";
  const testId = "modal-template-test-id";
  const mockOnOk = jest.fn();
  const mockCloseModal = jest.fn();

  const setup = () =>
    render(
      <ConfirmationModal
        confirmationText={confirmationText}
        onOk={mockOnOk}
        closeModal={mockCloseModal}
      />
    );

  it("should renders without crashing", () => {
    setup();

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("should have title, content & modal buttons", () => {
    setup();

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText(confirmationText)).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it('should calls onOk when "Confirm" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText("Confirm"));

    expect(mockOnOk).toHaveBeenCalled();
  });

  it('should calls closeModal when "Close" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText("Close"));

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
