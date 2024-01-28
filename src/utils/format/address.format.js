export const shortAddress = (address, limit = 8) => {
  const pre = address.substr(0, limit);
  const last = address.substr(-4);

  return `${pre}...${last}`;
};