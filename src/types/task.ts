import { List } from "./list";
export type Task = Readonly<{
  id: string;
  listId: List["id"]; // Connects the task to a specific list
  createdAt: string;
}> & {
  title: string;
  completed: boolean;
  important: boolean;
  dueDate?: string;
  updatedAt: string;
  isMyDay: boolean;
};
