"use client";

import { useAppDispatch, useAppSelector } from "../store/Provider";
import { selectAllLists, selectList, selectSelectedListId } from "../store/listSlice";
import { selectUncompletedTaskCountsByListId } from "../store/taskSlice";
import { List } from "@/src/types/list";

export default function Sidebar() {
  const lists = useAppSelector(selectAllLists);
  const selectedListId = useAppSelector(selectSelectedListId);
  const taskCounts = useAppSelector(selectUncompletedTaskCountsByListId);
  const dispatch = useAppDispatch();

  function handleListClick(listId: string) {
    dispatch(selectList(listId));
  }

  function renderListItem(item: List) {
    const isSelected = item.id === selectedListId;
    const count = taskCounts[item.id] || 0;

    const showCount = count > 0;

    const className = `w-full flex items-center gap-2 py-2 px-3 rounded-md transition cursor-pointer ${
      isSelected ? "bg-neutral-800 text-white font-semibold" : "hover:bg-neutral-800 text-gray-300"
    }`;

    return (
      <button key={item.id} onClick={() => handleListClick(item.id)} className={className}>
        <span>{item.icon}</span>
        <span>{item.name}</span>

        {showCount && (
          <span
            className={`ml-auto text-sm font-medium  ${isSelected ? "text-white" : "text-gray-400"}`}
          >
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside className="w-64 bg-neutral-900 text-gray-200 min-h-screen flex flex-col p-4 border-r border-neutral-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Microsoft To Do</h2>
      <nav>{lists.map(renderListItem)}</nav>
    </aside>
  );
}
