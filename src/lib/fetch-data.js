import { callReadOnlyFunction, cvToValue } from "@stacks/transactions";
import { contractOwnerAddress, deployedContractName } from "./constants";
import { getContractAddressAndName } from "../utils/extract-contract-info";

export const fetchFromContract = async ({
  network,
  address,
  contractFunctionName,
  contract,
  args = [],
}) => {
  const { contractAddress, contractName } = getContractAddressAndName(contract);

  const result = await callReadOnlyFunction({
    contractAddress: contractAddress,
    contractName: contractName,
    functionName: contractFunctionName,
    functionArgs: args,
    network,
    senderAddress: address,
  });

  console.log("result", result);

  return cvToValue(result);
};

export const fetchFromVestingContract = async ({
  network,
  address,
  contractFunctionName,
  args = [],
}) => {
  const result = await callReadOnlyFunction({
    contractAddress: contractOwnerAddress,
    contractName: deployedContractName,
    functionName: contractFunctionName,
    functionArgs: args,
    network,
    senderAddress: address,
  });

  return cvToValue(result);
};
