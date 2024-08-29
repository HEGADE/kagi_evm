import { initWeb3 } from "./web3.service";
import { tokenABI } from "../abi/token.abi";
import { fromWei, toWei } from "../helpers/convertion";
import Web3 from "web3";

export const getBal = async (accountID) => {
  try {
    let web3 = new Web3(window.ethereum);
    let bal = await web3?.eth?.getBalance(accountID);
    return Number(fromWei(bal));
  } catch (err) {
    console.log("Some error occured", err);
    return new Error(err);
  }
};

export const requestAllowance = async (
  accountAddress,
  contractAddress,
  tokenAddress,
  blockchain = null,
  network = null,
  instance = "metamask"
) => {
  try {
    console.log(
      tokenAddress,
      contractAddress,
      accountAddress,
      blockchain,
      "from instance"
    );

    const web3 = await initWeb3();

    const contractInstance = new web3.eth.Contract(tokenABI, tokenAddress);

    const res = await contractInstance?.methods
      ?.allowance(accountAddress, contractAddress)
      .call();
    console.log("request allowances result", res);
    return Number(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTokenBalance = async (
  accountAddress,
  tokenAddress,
  blockchain,
  network,
  par = "ether",
  instance = "metamask"
) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(tokenABI, tokenAddress);

  const res = await contractInstance?.methods?.balanceOf(accountAddress).call();

  console.log("token balance from....", res);
  return Number(fromWei(res, par));
};
export const getTokenSymbol = async (
  accountAddress,
  tokenAddress,
  blockchain,
  network,
  par = "ether",
  instance = "metamask"
) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(tokenABI, tokenAddress);

  const res = await contractInstance?.methods?.symbol().call();

  console.log("token symbol from....", res);
  return res;
};
export const getTokenName = async (
  accountAddress,
  tokenAddress,
  blockchain,
  network,
  par = "ether",
  instance = "metamask"
) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(tokenABI, tokenAddress);

  const res = await contractInstance?.methods?.name().call();

  console.log("token name from....", res);
  return res;
};

export const requestApprove = async ({
  tokenAddress,
  contractAddress,
  amount = "99999999999999999",
  accountAddress,
  blockchain,
  network,
  instance = "metamask",
}) => {
  try {
    console.log(
      "Contract address",
      contractAddress,
      tokenAddress,
      accountAddress
    );

    const web3 = await initWeb3();

    const contractInstance = new web3.eth.Contract(tokenABI, tokenAddress);

    const res = await contractInstance?.methods
      ?.approve(contractAddress, toWei(amount))
      .send({ from: accountAddress });
    console.log("approved res", res);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
