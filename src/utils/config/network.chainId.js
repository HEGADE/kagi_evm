export const metamaskNetworkChainID = (chainId) => {
    let network = "";
    let error = false;
  
    switch (chainId) {
      case "0x1":
        network = "MAINNET";
        break;
      case "0x3":
        network = "ROPSTEN";
        break;
      case "0x4":
        network = "RINKEBY";
        break;
      case "0x5":
        network = "GOERLI";
        break;
      case "0x2a":
        network = "KOVAN";
        break;
      case "0xa86a":
        network = "Avalanche Mainnet";
        break;
      case "0xa869":
        network = "Avalanche Testnet";
        break;
      case "0x38":
        network = "BSC Mainnet";
        break;
      case "0x61":
        network = { name: "BSC Tn", id: "0x61" };
        break;
      case "0xfa":
        network = "Fantom Mainnet";
        break;
      case "0xfa2":
        network = "Fantom Testnet";
        break;
      default:
        error = true;
    }
  
    return {
      network,
      error,
    };
  };
  
  // Networks Associated ChainIds:
  // 0x1 	    1 	    Ethereum Main Network (Mainnet)
  // 0x3 	    3 	    Ropsten Test Network
  // 0x4 	    4 	    Rinkeby Test Network
  // 0x5 	    5 	    Goerli Test Network
  // 0x2a 	  42 	    Kovan Test Network
  // 0xa869 	43113 	Avalanche Test Network
  // 0xa86a 	43114 	Avalanche Main Network
  // 0x61 	  97 	    BSC Test Network
  // 0x38 	  56 	    BSC Main Network
  