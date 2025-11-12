export type List = Readonly<{
  id: string;
  createdAt: string;
}> & {
  name: string;
  icon?: string;
  color?: string;
  updatedAt: string;
};
