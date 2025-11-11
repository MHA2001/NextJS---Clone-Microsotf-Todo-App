"use client";

import { useState } from "react";
import { Task } from "@/src/types/task";
import TaskItem from "@/src/components/TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Finish NextJS setup", completed: true },
    { id: "2", title: "Design task UI", completed: false },
    { id: "3", title: "Connect database", completed: false },
  ]);

  function toggleTask(id: string) {
    console.log("toggleTask start ");
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
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
