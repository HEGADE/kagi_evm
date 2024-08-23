import { lockAbi } from "../abi/lock.abi";
import { toWei } from "../helpers/convertion";
import { lockContractAddress } from "../lib/constants";
import { initWeb3 } from "./web3.service";

export const lockToken = async ({
  accountAddress,
  ert20TokenAddress,
  amount,
  duration,
  note = "locking",
}) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(lockAbi, lockContractAddress);

  const actualAmount = toWei(amount, "ether");

  let lockRes = await contractInstance.methods
    .lock(ert20TokenAddress, actualAmount, duration, note)
    .send({ from: accountAddress, to: lockContractAddress });

  return lockRes;
};

export const getTokenList = async ({ accountAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(lockAbi, lockContractAddress);

  let tokenList = await contractInstance.methods.locked(accountAddress).call();

  console.log(tokenList, "tokenList lock");

  return tokenList;
};

export const unlockToken = async ({ accountAddress, lockID }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(lockAbi, lockContractAddress);

  let unlockRes = await contractInstance.methods
    .unlock(lockID)
    .send({ from: accountAddress, to: lockContractAddress });

  return unlockRes;
};
