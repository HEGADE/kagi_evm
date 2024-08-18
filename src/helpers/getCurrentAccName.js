import detectEthereumProvider from "@metamask/detect-provider";
import { metamaskNetworkChainID } from "../utils/config/network.chainId";

export const getAccountName=async()=>{

    let provider = await detectEthereumProvider();
    const { network, error } = metamaskNetworkChainID(provider.chainId);
    console.log("network", error);
    return {network,error}
}