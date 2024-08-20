import Web3 from "web3";

export const initWeb3 = async (
  { blockchain, network, instance } = {
    blockchain: "bsc",
    network: "mainnet",
    instance: "metamask",
  }
) => {
  try {
    let web3;

    if (instance === "metamask" && typeof window.ethereum !== "undefined") {
      // web3 instance for metamask
      web3 = new Web3(window.ethereum);

      //   await window.ethereum.request({ method: "eth_requestAccounts" });

      return web3;
    }
  } catch (err) {
    console.error("Error: initWeb3: ", err);
  }
};
