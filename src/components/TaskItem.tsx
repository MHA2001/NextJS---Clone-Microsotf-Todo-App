"use client";

import { Task } from "@/src/types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-800 cursor-pointer"
      onClick={() => onToggle(task.id)}
    >
      <input
        name="TaskCompletionInput"
        type="checkbox"
        checked={task.completed}
        onChange={() => 0}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />
      <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
    </div>
  );
}
