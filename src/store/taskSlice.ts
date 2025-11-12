import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const { deleteTask, addTask, toggleCompletion, toggleMyDay, toggleImportant } =
  taskSlice.actions;
export default taskSlice.reducer;
