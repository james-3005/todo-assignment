import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo } from "@/stores/todoSlice";
import AddTaskForm from "@/components/AddTaskForm/AddTaskForm.tsx";
import { AppDispatch, RootState } from "@/stores";
import { ClipboardCheckIcon, LoaderCircleIcon } from "lucide-react";
import TaskList from "@/components/TaskList/TaskList.tsx";

export default function Task() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, isLoading, error } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    if (!todos.length) dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onAdd = (title: string) => {
    dispatch(addTodo(title));
  };

  return (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-blue-500 p-2.5 sm:p-4">
      <section className="max-w-sm rounded-lg bg-white overflow-hidden w-full relative">
        <div className="flex gap-2 py-2.5 px-2 sm:p-4 text-gray-900 items-center">
          <h1 className="text-2xl font-bold ">Task List</h1>
          <ClipboardCheckIcon className="text-green-600" />
        </div>
        <AddTaskForm onAdd={onAdd} error={error} />
        <TaskList todos={todos} />
        {isLoading && (
          <div
            data-testid="loading"
            className="absolute inset-0 size-full backdrop-blur-xs bg-white/30 flex items-center justify-center text-green-500"
          >
            <LoaderCircleIcon className="animate-spin size-10" />
          </div>
        )}
      </section>
    </div>
  );
}
