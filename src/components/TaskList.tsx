"use client";

import TaskItem from "@/src/components/TaskItem";
import { useAppSelector, useAppDispatch } from "../store/Provider";
import { selectAllTasks, toggleCompletion } from "../store/taskSlice";

export default function TaskList() {
  const tasks = useAppSelector(selectAllTasks);
  const dispatch = useAppDispatch();

  function toggleTask(id: string) {
    console.log("toggleTask start ");
    dispatch(toggleCompletion(id));
    console.log("toggleTask finish ");
  }

  return (
    <section className="mt-6 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </section>
  );
}
