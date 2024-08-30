import { addDays, getUnixTime } from "date-fns";
import Web3 from "web3";
export const toWei = (value, par = "ether") => {
  return Web3.utils.toWei(value, "ether");
};
export const fromWei = (value, par = "ether") => {
  return Web3.utils.fromWei(String(value), par);
};

export const unixTimeStamp = (dateTime) => {
  const date = new Date(dateTime); // Or any Date('YYYY-MM-DD')
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
};

export const fromUnixTimeStamp = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp * 1000);
  return date;
};

function daysToFutureTimestamp(days) {
  const currentDate = new Date();

  const futureDate = addDays(currentDate, days);

  const unixTimestamp = getUnixTime(futureDate);

  return unixTimestamp;
}
