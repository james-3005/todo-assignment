import { ISingleTodo } from "@/types";
import TaskItem from "@/components/TaskItem/TaskItem.tsx";
import { deleteTodo, markComplete } from "@/stores/todoSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { useMemo, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";

interface Props {
  todos: ISingleTodo[];
}

enum SortByEnum {
  TIME = "TIME",
  STATUS = "STATUS",
}

const SORT_OPTIONS = [
  { title: "Time", value: SortByEnum.TIME },
  { title: "Status", value: SortByEnum.STATUS },
];

export default function TaskList({ todos }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.TIME);

  const sortedTodos = useMemo(() => {
    const newTodos = structuredClone(todos);
    if (sortBy === SortByEnum.TIME) {
      return newTodos.sort((a, b) => b.id - a.id);
    } else {
      return newTodos.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
      );
    }
  }, [todos, sortBy]);

  return (
    <>
      <div className="flex items-center justify-end gap-1.5 py-0.5 px-2 sm:py-1 sm:px-4 text-sm">
        Sort by:
        <div className="grid grid-cols-2 shadow-sm ring ring-green-600 rounded-md overflow-hidden">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`h-9 cursor-pointer transition-all px-2.5 text-gray-800 hover:bg-green-700 hover:text-white inline-flex items-center justify-center ${sortBy === option.value ? "bg-green-600 !text-white" : ""}`}
              onClick={() => setSortBy(option.value)}
            >
              {option.title}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 h-4/5 overflow-auto py-2">
        {sortedTodos.length ? (
          <AnimatePresence>
            <Reorder.Group axis="y" values={todos} onReorder={() => {}}>
              {sortedTodos.map((todo) => (
                <TaskItem
                  key={todo.id}
                  data={todo}
                  onDelete={() => dispatch(deleteTodo(todo.id))}
                  onToggle={() => dispatch(markComplete(todo.id))}
                />
              ))}
            </Reorder.Group>
          </AnimatePresence>
        ) : (
          <p className="text-gray-800 text-center py-10">Task List is Empty</p>
        )}
      </div>
    </>
  );
}
