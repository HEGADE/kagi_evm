import Web3 from "web3";
export const toWei = (value, par = "ether") => {
  return Web3.utils.toWei(value, "ether");
};
export const fromWei = (value, par = "ether") => {
  return Web3.utils.fromWei(String(value), par);
};
