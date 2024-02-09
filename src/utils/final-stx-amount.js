export const getFinalAmount = (decimal, amount) => {
  return Math.pow(10, Number(decimal)) * Number(amount);
};

export const reduceToPowerOf = (number, decimal) => {
  const result = Math.pow(10, Number(decimal));

  const reducedNumber = Number(number) / result;

  return reducedNumber;
};
