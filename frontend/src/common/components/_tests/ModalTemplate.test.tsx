import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ModalTemplate from "../ModalTemplate/ModalTemplate";

describe("ModalTemplate", () => {
  const title = "Test title";
  const content = "Test content";
  const testId = "modal-template-test-id";
  const mockOnOk = jest.fn();
  const mockCloseModal = jest.fn();

  const setup = () =>
    render(
      <ModalTemplate title={title} onOk={mockOnOk} closeModal={mockCloseModal}>
        {content}
      </ModalTemplate>
    );

  it("should renders without crashing", () => {
    setup();

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("should have title, content & buttons", () => {
    setup();

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it('should call onOk when "Confirm" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText("Confirm"));

    expect(mockOnOk).toHaveBeenCalled();
  });

  it('should call closeModal when "Close" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText("Close"));

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
