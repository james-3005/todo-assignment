import { render, screen } from "@testing-library/react";
import Todo from "./index";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo } from "@/stores/todoSlice";
import { Mock, vi } from "vitest";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/stores/todoSlice", () => ({
  fetchTodos: vi.fn(),
  addTodo: vi.fn(),
}));

vi.mock("@/components/AddTaskForm/AddTaskForm.tsx", () => ({
  default: ({ onAdd, error }: { onAdd: Mock; error: string }) => (
    <div data-testid="todo-form" data-error={error}>
      <button onClick={() => onAdd("New Task")}>Add</button>
    </div>
  ),
}));
vi.mock("@/components/TaskList/TaskList.tsx", () => ({
  default: ({ todos }: { todos: Mock }) => (
    <div data-testid="todo-list" data-count={todos.length}></div>
  ),
}));

describe("Task", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (fetchTodos as unknown as Mock).mockReturnValue("fetchTodos-action");
    (addTodo as unknown as Mock).mockReturnValue("addTodo-action");
  });

  it("fetches todos on mount when todos list is empty", () => {
    (useSelector as unknown as Mock).mockReturnValue({
      todos: [],
      isLoading: false,
      error: null,
    });
    render(<Todo />);

    expect(mockDispatch).toHaveBeenCalledWith("fetchTodos-action");
  });

  it("dispatches addTodo action when new todo is added", () => {
    render(<Todo />);

    screen.getByText("Add").click();

    expect(addTodo).toHaveBeenCalledWith("New Task");
    expect(mockDispatch).toHaveBeenCalledWith("addTodo-action");
  });

  it("displays loading spinner when isLoading is true", () => {
    (useSelector as unknown as Mock).mockReturnValue({
      todos: [],
      isLoading: true,
      error: null,
    });
    render(<Todo />);

    expect(screen.getByTestId("loading")).toBeVisible();
  });
});
