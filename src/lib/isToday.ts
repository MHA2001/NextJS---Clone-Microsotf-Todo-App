export const isToday = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const dateObject = new Date(dateString);
  const today = new Date();
  return (
    dateObject.getDate() === today.getDate() &&
    dateObject.getMonth() === today.getMonth() &&
    dateObject.getFullYear() === today.getFullYear()
  );
};
