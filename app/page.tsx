"use client";

import TaskList from "@/src/components/TaskList";
import AddTaskForm from "@/src/components/AddTaskForm";
import { useAppSelector } from "@/src/store/Provider";
import { selectAllLists, selectSelectedListId } from "@/src/store/listSlice";

export default function Page() {
  const selectedListId = useAppSelector(selectSelectedListId);
  const list = useAppSelector(selectAllLists).find((l) => l.id === selectedListId);
  const listName = list ? list.name : "Unknown List";

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
  const dateString = today.toLocaleDateString("en-US", options);

  return (
    <section className="h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-1">{listName}</h1>
      <p className="text-gray-400 mb-6">{dateString}</p>
      <div className=" flex-1 | flex flex-col justify-between gap-3">
        <TaskList />
        <AddTaskForm />
      </div>
    </section>
  );
}
