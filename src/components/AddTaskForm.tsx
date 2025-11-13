"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/Provider";
import { addTask } from "../store/taskSlice";
import { selectSelectedListId } from "../store/listSlice";
import { Task } from "../types/task";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const selectedListId = useAppSelector(selectSelectedListId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const newTaskPayload: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      title: title.trim(),
      listId: selectedListId,
      completed: false,
      important: selectedListId === "important",
      isMyDay: selectedListId === "my-day",
    };

    dispatch(addTask(newTaskPayload));
    setTitle(""); // Clear the input field
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex items-center bg-neutral-800 p-3 rounded-md shadow-lg border border-neutral-700">
        <button
          type="submit"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-colors mr-3"
          aria-label="Add Task"
        >
          +
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500"
          required
        />
      </div>
    </form>
  );
}
