import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import TaskList from "./TaskList.tsx";
import { useDispatch } from "react-redux";
import { deleteTodo, markComplete } from "@/stores/todoSlice";
import { PropsWithChildren } from "react";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("@/stores/todoSlice.ts", () => ({
  deleteTodo: vi.fn((id) => ({ type: "delete", payload: id })),
  markComplete: vi.fn((id) => ({ type: "complete", payload: id })),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: PropsWithChildren) => <>{children}</>,
  Reorder: {
    Group: ({ children, ...rest }: PropsWithChildren) => (
      <div data-testid="reorder-group" {...rest}>
        {children}
      </div>
    ),
    Item: ({ children, ...rest }: PropsWithChildren) => (
      <div data-testid="reorder-item" {...rest}>
        {children}
      </div>
    ),
  },
}));

describe("TaskList", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it("renders todos when provided", () => {
    const todos = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    render(<TaskList todos={todos} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task List is Empty")).not.toBeInTheDocument();
  });

  it("shows empty message when no todos exist", () => {
    render(<TaskList todos={[]} />);

    expect(screen.getByText("Task List is Empty")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

  it("dispatches delete action when delete button is clicked", () => {
    const todos = [{ id: 1, title: "Task 1", completed: false }];

    render(<TaskList todos={todos} />);

    fireEvent.click(screen.getAllByTestId("delete-button")[0]);

    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "delete", payload: 1 });
  });

  it("dispatches markComplete action when toggle button is clicked", () => {
    const todos = [{ id: 2, title: "Task 2", completed: false }];

    render(<TaskList todos={todos} />);

    fireEvent.click(screen.getAllByTestId("reorder-item")[0]);

    expect(markComplete).toHaveBeenCalledWith(2);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "complete", payload: 2 });
  });

  it("sorts todos by time (most recent first) by default", () => {
    const todos = [
      { id: 1, title: "Task 1", completed: true },
      { id: 2, title: "Task 2", completed: false },
    ];

    render(<TaskList todos={todos} />);

    const todoItems = screen.getAllByTestId(/todo-item-title/);
    expect(todoItems[0]).toHaveTextContent("Task 2");
    expect(todoItems[1]).toHaveTextContent("Task 1");
  });

  it("sorts todos by status when Status button is clicked", () => {
    const todos = [
      { id: 1, title: "Task 1", completed: true },
      { id: 2, title: "Task 2", completed: false },
    ];

    render(<TaskList todos={todos} />);

    fireEvent.click(screen.getByText("Status"));

    const todoItems = screen.getAllByTestId(/todo-item-title/);
    waitFor(() => {
      expect(todoItems[0]).toHaveTextContent("Task 1");
      expect(todoItems[1]).toHaveTextContent("Task 2");
    });
  });
});
