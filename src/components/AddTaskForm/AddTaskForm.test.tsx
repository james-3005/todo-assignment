import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTaskForm from "./AddTaskForm.tsx";
import { useActionState } from "react";
import { beforeEach, Mock } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...(actual as object),
    useActionState: vi.fn(),
  };
});
describe("AddTaskForm", () => {
  beforeEach(() => {
    (useActionState as unknown as Mock).mockImplementationOnce(
      (func: () => void) => [new FormData(), func, false],
    );
  });
  it("displays error message when error prop is provided", () => {
    render(<AddTaskForm onAdd={vi.fn()} error="This is an error message" />);
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
    expect(screen.getByTestId("add-icon")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("adds red border to input when error is present", () => {
    render(<AddTaskForm onAdd={() => {}} error="Invalid input" />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    expect(input).toHaveClass("!border-red-400");
  });

  it("shows loading spinner when form submission is pending", async () => {
    vi.restoreAllMocks();
    (useActionState as unknown as Mock).mockImplementationOnce(
      (func: () => void) => [new FormData(), func, true],
    );
    render(<AddTaskForm onAdd={() => {}} />);

    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
  });

  it("calls onAdd with input value when form is submitted", () => {
    const handleAdd = vi.fn();
    render(<AddTaskForm onAdd={handleAdd} />);
    const input = screen.getByPlaceholderText(/add a new todo/i);

    fireEvent.change(input, { target: { value: "Buy groceries" } });

    fireEvent.click(screen.getByRole("button"));

    waitFor(() => {
      expect(handleAdd).toHaveBeenCalledWith("Buy groceries");
    });
  });
});
