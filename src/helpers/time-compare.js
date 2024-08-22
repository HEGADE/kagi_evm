
export function isTimestampGreaterOrEqualToCurrentDateTime(unixTimestamp) {
  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime >= unixTimestamp;
}
