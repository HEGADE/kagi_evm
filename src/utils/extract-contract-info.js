export const getContractAddressAndName = (contract) => {
  const [contractAddress, contractName] = contract.split(".");
  return { contractAddress, contractName };
};
