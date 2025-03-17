import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem.tsx";
import { PropsWithChildren } from "react";
import { ISingleTodo } from "@/types";

vi.mock("framer-motion", () => ({
  Reorder: {
    Item: ({ children, ...rest }: PropsWithChildren) => (
      <div {...rest}>{children}</div>
    ),
  },
}));

describe("TaskItem", () => {
  const mockTodo: ISingleTodo = {
    id: 1,
    title: "Buy groceries",
    completed: false,
  };

  it("renders todo item with correct title", () => {
    render(<TaskItem data={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  it("calls onToggle function when checkbox is clicked", () => {
    const mockToggle = vi.fn();
    render(
      <TaskItem data={mockTodo} onToggle={mockToggle} onDelete={() => {}} />,
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete function when delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(
      <TaskItem data={mockTodo} onToggle={() => {}} onDelete={mockDelete} />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("displays checkbox with checkmark when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TaskItem data={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText(completedTodo.title)).toHaveClass("line-through");
  });

  it("displays todo without checkmark when not completed", () => {
    render(
      <TaskItem data={mockTodo} onToggle={() => {}} onDelete={() => {}} />,
    );

    expect(screen.getByText(mockTodo.title)).not.toHaveClass("line-through");
  });

  // it('handles todo with missing completed property', () => {
  //   const todoWithoutCompletedProp = { id: '2', title: 'Test todo' };
  //   render(<TaskItem data={todoWithoutCompletedProp} onToggle={() => {}} onDelete={() => {}} />);
  //
  //   expect(screen.getByText('Test todo')).toBeInTheDocument();
  //   expect(screen.getByText('Test todo')).not.toHaveClass('line-through');
  // });
});
