import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../types/list";
import { RootState } from "./store";

export const DEFAULT_LIST_IDS = {
  MY_DAY: "my-day",
  IMPORTANT: "important",
  PLANNED: "planned",
  ALL: "all",
};

const initialLists: List[] = [
  {
    id: DEFAULT_LIST_IDS.MY_DAY,
    name: "My Day",
    icon: "☀️",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: DEFAULT_LIST_IDS.IMPORTANT,
    name: "Important",
    icon: "⭐",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: DEFAULT_LIST_IDS.PLANNED,
    name: "Planned",
    icon: "🗓️",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: DEFAULT_LIST_IDS.ALL,
    name: "All",
    icon: "📋",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
];

interface ListsState {
  lists: List[];
  selectedListId: string;
}

const initialState: ListsState = {
  lists: initialLists,
  selectedListId: DEFAULT_LIST_IDS.MY_DAY,
};

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    selectList: (state, action: PayloadAction<string>) => {
      state.selectedListId = action.payload;
    },
    addList: (state, action: PayloadAction<Omit<List, "createdAt" | "updatedAt">>) => {
      const newList: List = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.lists.push(newList);
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
      if (action.payload === state.selectedListId) {
        state.selectedListId = DEFAULT_LIST_IDS.MY_DAY;
      }
    },

    customizeList: (state, action: PayloadAction<List>) => {
      const updatedAtList = { ...action.payload, updatedAt: new Date().toISOString() };

      state.lists = state.lists.map((list) =>
        list.id === updatedAtList.id ? updatedAtList : list
      );
    },
  },
});

export const { selectList, addList, removeList, customizeList } = listSlice.actions;
export const selectAllLists = (state: RootState) => state.lists.lists;
export const selectSelectedListId = (state: RootState) => state.lists.selectedListId;

export default listSlice.reducer;
