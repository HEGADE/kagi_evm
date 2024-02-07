export const getFinalAmount = (decimal, amount) => {
  return Math.pow(10, Number(decimal)) * Number(amount);
};
