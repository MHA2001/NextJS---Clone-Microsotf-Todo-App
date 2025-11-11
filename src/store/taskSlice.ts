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
  },
});
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const { toggleCompletion } = taskSlice.actions;
export default taskSlice.reducer;
