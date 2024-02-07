import {
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  NonFungibleConditionCode,
  makeStandardNonFungiblePostCondition,
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

/*
@param {string} address
@param {number} amount
@param {string} contractAddress
@param {string} contractName
@param {string} nonFungibleTokenName this should be actual token name
*/
export const getFtPostConditionNFT = (
  address,
  contractAddress,
  contractName,
  nonFungibleTokenName,
  tokenID
) => {
  const tokenPostCondition = makeStandardNonFungiblePostCondition(
    address,
    NonFungibleConditionCode.Sends,
    createAssetInfo(contractAddress, contractName, nonFungibleTokenName),
    tokenID
  );

  return tokenPostCondition;
};
