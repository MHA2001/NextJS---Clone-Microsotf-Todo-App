export type List = Readonly<{
  id: string;
  createdAt: Date;
}> & {
  name: string;
  icon?: string;
  color?: string;
  updatedAt: Date;
};
