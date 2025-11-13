"use client";

import { Task } from "@/src/types/task";
import { useAppDispatch } from "../store/Provider";
import { toggleImportant, deleteTask, toggleCompletion } from "../store/taskSlice";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useAppDispatch();

  function onToggle(id: string) {
    dispatch(toggleCompletion(id));
  }

  function handleToggleImportant(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(toggleImportant(task.id));
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  }

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-md hover:bg-neutral-800 cursor-pointer transition-all border border-neutral-700"
      onClick={() => onToggle(task.id)}
    >
      <input
        name="TaskCompletionInput"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />

      <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : "text-white"}`}>
        {task.title}
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleImportant}
          className={`text-xl transition-colors ${
            task.important ? "text-yellow-400" : "text-gray-600 hover:text-yellow-400"
          }`}
          aria-label="Toggle importance"
        >
          {task.important ? "⭐" : "☆"}
        </button>

        <button
          onClick={handleDelete}
          className="text-red-500/50 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
