"use client";

import TaskItem from "@/src/components/TaskItem";
import { useAppSelector } from "../store/Provider";
import { selectTasksForSelectedList } from "../store/taskSlice";

export default function TaskList() {
  const tasks = useAppSelector(selectTasksForSelectedList);

  return (
    <section className="mt-6 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </section>
  );
}
