import { bulkTransferContractAddress } from "../lib/constants";
import { initWeb3 } from "./web3.service";

import { bulkTransferAbi } from "../abi/bulk-transfer";

export const sendTokensToMultipleAddresses = async ({
  accountAddress,
  tokenAddress,
  addressArray = [],
  amountArray = [],
}) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    bulkTransferAbi,
    bulkTransferContractAddress
  );

  let res = await contractInstance.methods
    .sendTokensToMultipleAddresses(tokenAddress, addressArray, amountArray)
    .send({ from: accountAddress, to: bulkTransferContractAddress });

  return res;
};
