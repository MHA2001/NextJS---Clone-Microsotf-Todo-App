import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import listReducer from "./listSlice";
export const store = configureStore({
  reducer: { tasks: taskReducer, lists: listReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
