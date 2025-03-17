import { useActionState } from "react";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";

interface Props {
  onAdd: (title: string) => void;
  error?: string;
}

export default function AddTaskForm({ onAdd, error }: Props) {
  const [actionState, submitAction, isPending] = useActionState<
    FormData | undefined,
    FormData
  >((_, formData) => {
    const title = formData?.get("title") as string;
    onAdd(title);
    return formData;
  }, undefined);

  return (
    <form
      className="px-2 py-1.5 sm:py-3 sm:px-4 "
      action={submitAction}
      data-testid="form"
    >
      <div className={`flex items-center gap-2`}>
        <input
          type="text"
          name="title"
          className={`flex-1 flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 md:text-sm focus:outline-0 ${error && "!border-red-400 focus-visible:!ring-red-500"}`}
          placeholder="Add a new todo"
          defaultValue={actionState?.get("title") as string}
        />
        <button
          className={`h-9 cursor-pointer transition-all rounded-md gap-2 shadow-md px-3 bg-green-600 text-white hover:bg-green-700 inline-flex items-center justify-center ${isPending && "pointer-events-none brightness-75 "}`}
        >
          {isPending ? (
            <LoaderCircleIcon
              className="animate-spin"
              data-testid="loader-icon"
            />
          ) : (
            <PlusIcon data-testid="add-icon" />
          )}
          Add
        </button>
      </div>
      <p
        className={`text-red-400 text-sm mt-0.5 opacity-0 ${error && "opacity-100"}`}
      >
        {error}
      </p>
    </form>
  );
}
