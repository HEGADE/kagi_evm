import React, { useContext, useEffect } from "react";
import { createContext } from "react";
// import { isConnected, switchNetwork } from "../services/metamsk.services";
// import db from "../helpers/persist";
// import { clearCurrentWallet } from "../helpers/clean";
import Web3 from "web3";
import { GlobalContext } from "./GobalContext";
// import { getAccountName } from "../helpers/getCurrentAccName";

export const MetamaskContext = createContext();

const MetamaskContextProvider = ({ children }) => {
  const {
    accountID,
    setAccountID,
    networkID,
    setNetworkID,
    netName,
    setConnectedAccount,
    setNetName,
    setPrimaryAccount,
    trigger,
    setTrigger,
    setShowFullAddr,
  } = useContext(GlobalContext);

  const connectMetamask = async () => {
    try {
      let acc = await window?.ethereum?.request({
        method: "eth_requestAccounts",
      });
      if (Boolean(acc.length)) {
        setAccountID(acc[0]);
        setPrimaryAccount("metamask");
      }
    } catch (err) {
      setAccountID(null);
      console.log(err);
    }
  };

  const onChange = () => {
    window?.ethereum?.on("networkChanged", function (networkId) {
      console.log(networkId, "networkId changed");

      setNetworkID(networkId);
    });

    window?.ethereum?.on("accountsChanged", function (accounts) {
      setAccountID(accounts[0]);
      if (!accounts[0]) {
        // clearCurrentWallet("metamask");
        setAccountID(accounts[0]);
        setTrigger("metamask");
        setPrimaryAccount(null);
        return;
      }

      setShowFullAddr(true);
      setTimeout(() => {
        setShowFullAddr(false);
      }, 1000 * 4);
    });
  };

  const getInitialAccountInfo = async () => {
    try {
      // const { accountId, connectAccount, primaryAccount } = await isConnected();
      let web3 = new Web3(window.ethereum);
      let acc = await web3.eth.getAccounts();
      console.log(acc[0], "sssss");

      setAccountID(acc[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const switchNetwork = async (netId) => {
    try {
      let web3 = new Web3(window.ethereum);
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(netId) }],
      });
      setNetworkID(netId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onChange();
    connectMetamask();
  }, []);

  useEffect(() => {
    window?.ethereum?.on("disconnect", function (err) {
      console.log("disconnect");
      // clearCurrentWallet("metamask");
    });
  }, []);

  useEffect(() => {
    getInitialAccountInfo();
  }, [trigger]);

  useEffect(() => {
    (async () => {
      // const { accountId, connectAccount } = await isConnected();
      // setConnectedAccount(connectAccount);
    })();
  }, [accountID]);

  // useEffect(() => {
  //   (async () => {
  //     const { network, error } = await getAccountName();
  //     setNetName(network);
  //   })();
  // }, [networkID]);

  // const changeNetwork = async () => {
  //   await switchNetwork("0x61");
  // };

  return (
    <MetamaskContext.Provider
      value={{
        switchNetwork,
        connectMetamask,
        accountID,
        netName,
        networkID,
        setNetworkID,
        setAccountID,
        // changeNetwork,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskContextProvider;
