export const getContractAddressAndName = (contract) => {
  const [contractAddress, contractName] = contract.split(".");
  return { contractAddress, contractName };
};


export  function extractContractNameAndAddress(contractAddress) {
  const [contractOwnerAddress, contractName] = contractAddress.split(".");
  return { contractOwnerAddress, contractName };
}
