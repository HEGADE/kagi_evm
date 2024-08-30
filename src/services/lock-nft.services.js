import { lockNftAbi } from "../abi/nft-lock.abi";
import { lockNftContractAddress } from "../lib/constants";
import { initWeb3 } from "./web3.service";

export const lockNFT = async ({
  accountAddress,
  nftAddress,
  tokenID,
  lockingPeriod,
  note = "locking",
}) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    lockNftAbi,
    lockNftContractAddress
  );

  let lockRes = await contractInstance.methods
    .lockNFT(nftAddress, tokenID, lockingPeriod)
    .send({ from: accountAddress, to: lockNftContractAddress });

  return lockRes;
};

export const getLockedNftList = async ({ accountAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    lockNftAbi,
    lockNftContractAddress
  );

  let lockedNftList = await contractInstance.methods
    .getLockedNFTs(accountAddress)
    .call();

  console.log(lockedNftList, "lockedNftList");

  return lockedNftList;
};

export const unlockToken = async ({ accountAddress, lockID, tokenAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    lockNftAbi,
    lockNftContractAddress
  );

  let unlockRes = await contractInstance.methods
    .unlockNFT(tokenAddress, lockID)
    .send({ from: accountAddress, to: lockNftContractAddress });

  return unlockRes;
};
