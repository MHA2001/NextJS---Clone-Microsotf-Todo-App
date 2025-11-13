import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_LIST_IDS, selectSelectedListId } from "./listSlice";
import { Task } from "../types/task";
import { RootState } from "./store";
import { isToday } from "../lib/isToday";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const task = state.tasks.find((t) => t.id === idToToggle);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },

    toggleImportant: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const task = state.tasks.find((t) => t.id === idToToggle);
      if (task) {
        task.important = !task.important;
        task.updatedAt = new Date().toISOString();
      }
    },

    toggleMyDay: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const task = state.tasks.find((t) => t.id === idToToggle);
      if (task) {
        task.isMyDay = !task.isMyDay;
        task.updatedAt = new Date().toISOString();
      }
    },

    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter((t) => t.id !== idToDelete);
    },
  },
});
export const { deleteTask, addTask, toggleCompletion, toggleMyDay, toggleImportant } =
  taskSlice.actions;
export default taskSlice.reducer;

// Task Selectors
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export const selectTasksForSelectedList = createSelector(
  [selectAllTasks, selectSelectedListId],
  (allTasks, selectedId) => {
    switch (selectedId) {
      case DEFAULT_LIST_IDS.MY_DAY:
        return allTasks.filter((task) => task.isMyDay || isToday(task.dueDate));

      case DEFAULT_LIST_IDS.IMPORTANT:
        return allTasks.filter((task) => task.important);

      case DEFAULT_LIST_IDS.PLANNED:
        return allTasks.filter((task) => task.dueDate);

      case DEFAULT_LIST_IDS.ALL:
        return allTasks;

      default:
        return allTasks.filter((task) => task.listId === selectedId);
    }
  }
);

export const selectUncompletedTaskCountsByListId = createSelector([selectAllTasks], (allTasks) => {
  const counts: Record<string, number> = {};

  Object.values(DEFAULT_LIST_IDS).forEach((id) => {
    counts[id] = 0;
  });

  allTasks.forEach((task) => {
    if (task.completed) return;

    if (task.listId) {
      counts[task.listId] = (counts[task.listId] || 0) + 1;
    }

    counts[DEFAULT_LIST_IDS.ALL] = (counts[DEFAULT_LIST_IDS.ALL] || 0) + 1;

    if (task.important) {
      counts[DEFAULT_LIST_IDS.IMPORTANT] = (counts[DEFAULT_LIST_IDS.IMPORTANT] || 0) + 1;
    }
    if (task.dueDate) {
      counts[DEFAULT_LIST_IDS.PLANNED] = (counts[DEFAULT_LIST_IDS.PLANNED] || 0) + 1;
    }
    if (task.isMyDay || isToday(task.dueDate)) {
      counts[DEFAULT_LIST_IDS.MY_DAY] = (counts[DEFAULT_LIST_IDS.MY_DAY] || 0) + 1;
    }
  });

  return counts;
});
