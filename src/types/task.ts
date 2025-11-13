import { List } from "./list";
export type Task = Readonly<{
  id: string;
  listId: List["id"] | null;
  createdAt: string;
}> & {
  title: string;
  completed: boolean;
  important: boolean;
  dueDate?: string;
  updatedAt: string;
  isMyDay: boolean;
};
