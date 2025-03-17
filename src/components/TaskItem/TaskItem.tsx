import { ISingleTodo } from "@/types";
import { DeleteIcon, CheckIcon } from "lucide-react";
import { Reorder } from "framer-motion";

interface Props {
  data: ISingleTodo;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ data, onToggle, onDelete }: Props) {
  const { title, completed = false, id } = data;
  return (
    <Reorder.Item
      value={data}
      key={id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      onClick={onToggle}
      className="flex items-center overflow-hidden gap-3 py-1 px-2 sm:py-1.5 sm:px-4 bg-white group hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div
        role="checkbox"
        aria-checked={completed}
        className={`flex flex-shrink-0 group-hover:ring-4 transition-all ring-green-300/50 group-hover:border-green-600 items-center justify-center size-6 rounded-full cursor-pointer border border-gray-400 text-white  ${completed ? "!border-green-600 bg-green-600" : ""}`}
      >
        {completed && <CheckIcon className="size-5" />}
      </div>
      <span
        data-testid="todo-item-title"
        className={`text-base flex-1 truncate ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
      >
        {title}
      </span>
      <button
        className="ml-auto p-2 flex-shrink-0 hover:text-red-400 transition-all cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        data-testid="delete-button"
      >
        <DeleteIcon />
      </button>
    </Reorder.Item>
  );
}
