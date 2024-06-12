import { callReadOnlyFunction, cvToValue } from "@stacks/transactions";
import { contractOwnerAddress, deployedContractName } from "./constants";
import {
  extractContractNameAndAddress,
  getContractAddressAndName,
} from "../utils/extract-contract-info";

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

  return cvToValue(result);
};

export const fetchFromVestingContract = async ({
  network,
  address,
  contractFunctionName,
  args = [],
}) => {
  console.log("args", args, "address", address, contractFunctionName, network);

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

export async function fetchFromContractForBulkTransfer(
  contractAddress,
  network,
  senderAddress,
  contractArgs
) {
  console.log("contractAddress", contractAddress);
  const { contractOwnerAddress, contractName } =
    extractContractNameAndAddress(contractAddress);

  const promisesArr = contractArgs.map(async (args) => {
    return callReadOnlyFunction({
      contractAddress: contractOwnerAddress.trim(),
      contractName: contractName.trim(),
      functionName: args.functionName,
      functionArgs: args.functionArgs || [],
      network,
      senderAddress,
    });
  });
  const info = await Promise.all(promisesArr);
  const contractInfo = info.map((value) => cvToValue(value));

  return {
    contractOwnerAddress,
    contractName,
    contractInfo,
  };
}
