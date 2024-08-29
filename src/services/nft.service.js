import { initWeb3 } from "./web3.service";
import { nftAbi } from "../abi/nft.abi";
import { fromWei, toWei } from "../helpers/convertion";
import Web3 from "web3";
import { lockNftContractAddress } from "../lib/constants";

export const getApproved = async ({ tokenID, nftAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(nftAbi, nftAddress);

  const res = await contractInstance?.methods?.getApproved(tokenID).call();

  console.log("Approved address", res);
  return res;
};

export const requestApproveNft = async ({
  tokenID,
  nftAddress,
  accountAddress,
}) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(nftAbi, nftAddress);

  const res = await contractInstance?.methods
    ?.approve(lockNftContractAddress, tokenID)
    .send({ from: accountAddress });

  console.log("Approved address", res);
  return res;
};

export const getNFTName = async (nftAddress) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(nftAbi, nftAddress);

  const res = await contractInstance?.methods?.name().call();

  return res;
};

export const getNFTSymbol = async (nftAddress) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(nftAbi, nftAddress);

  const res = await contractInstance?.methods?.symbol().call();

  return res;
};
export const getNFTOwner = async (nftAddress, NftID) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(nftAbi, nftAddress);

  const res = await contractInstance?.methods?.ownerOf(NftID).call();

  return res;
};
