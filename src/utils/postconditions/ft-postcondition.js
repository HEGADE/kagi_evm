import {
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo,
} from "@stacks/transactions";

/*
@param {string} address
@param {number} amount
@param {string} contractAddress
@param {string} contractName
@param {string} fungibleTokenName this should be actual token name
*/
export const getFtPostCondition = (
  address,
  amount,
  contractAddress,
  contractName,
  fungibleTokenName
) => {
  const tokenPostCondition = makeStandardFungiblePostCondition(
    address,
    FungibleConditionCode.Equal,
    amount,
    createAssetInfo(contractAddress, contractName, fungibleTokenName)
  );

  return tokenPostCondition;
};
