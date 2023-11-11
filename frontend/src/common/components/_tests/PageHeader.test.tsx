import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "react-bootstrap";
import PageHeader from "../PageHeader/PageHeader";

describe("PageHeader", () => {
  const title = "Test title";
  const subtitle = "Test subtitle";
  const testId = "page-header-test-id";

  const setup = () =>
    render(
      <PageHeader
        title={title}
        subtitle={subtitle}
        menu={[<Button key={1}>Action</Button>]}
      />
    );

  it("should renders without crashing", () => {
    setup();
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("should displays title, subtitle & menu correctly", () => {
    setup();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
