import { List } from "./list";
export type Task = Readonly<{
  id: string;
  listId: List["id"]; // Connects the task to a specific list
  createdAt: Date;
}> & {
  title: string;
  completed: boolean;
  important: boolean;
  dueDate?: Date;
  updatedAt: Date;
  isMyDay: boolean;
};
