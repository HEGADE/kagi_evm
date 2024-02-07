import { format } from "date-fns";

// Get the current date and time

export const formatDate = (currentDate) => {
  return format(currentDate, "yyyy-MM-dd HH:mm:ss");
};
// Format the date and time
