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
