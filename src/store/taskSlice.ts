import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_LIST_IDS, selectSelectedListId } from "./listSlice";
import { Task } from "../types/task";
import { RootState } from "./store";

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
        task.updatedAt = new Date();
      }
    },

    toggleImportant: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const task = state.tasks.find((t) => t.id === idToToggle);
      if (task) {
        task.important = !task.important;
        task.updatedAt = new Date();
      }
    },

    toggleMyDay: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const task = state.tasks.find((t) => t.id === idToToggle);
      if (task) {
        task.isMyDay = !task.isMyDay;
        task.updatedAt = new Date();
      }
    },

    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
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
    const isToday = (date: Date | undefined): boolean => {
      if (!date) return false;
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

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
