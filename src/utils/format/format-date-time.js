import { format, addDays } from "date-fns";

// Get the current date and time

export const formatDate = (currentDate) => {
  return format(currentDate, "yyyy-MM-dd HH:mm:ss");
};
// Format the date and time

export const addDaysToGivenDate = (dateTimeString, days) => {
  const inputDateString = dateTimeString;

  const numberOfDaysToAdd = days;

  const inputDate = new Date(inputDateString);

  const newDate = addDays(inputDate, numberOfDaysToAdd);

  return format(newDate, "yyyy-MM-dd HH:mm:ss");
};
