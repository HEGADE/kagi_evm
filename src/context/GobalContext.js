import { useEffect } from "react";
import { createContext, useState } from "react";
// import { getBal } from "../services/token.service";
import { getAccountName } from "../helpers/getCurrentAccName";
import Web3 from 'web3'
import { fromWei } from "../helpers/convertion";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [accountID, setAccountID] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [networkID, setNetworkID] = useState(0);
  const [netName, setNetName] = useState(null);
  const [primaryAccount, setPrimaryAccount] = useState("");
  const [trigger, setTrigger] = useState("");
  const [err, setError] = useState(null);
  const [showFullAddr, setShowFullAddr] = useState(false);
  const [balance, setBalance] = useState(null);

  const [connectedAccount, setConnectedAccount] = useState({
    metamask: false,
    pontem: false,
    aptos: false,
  });
  useEffect(() => {
    if (!accountID) return;
    (async () => {
      let { network, error } = await getAccountName();
      console.log(network);
      
      setNetName(network);
      setBalance(await getBal(accountID));
    })();
  }, [accountID, networkID]);

  const getBal = async (accountID) => {
    try {
      let web3 = new Web3(window.ethereum);
      let bal = await web3?.eth?.getBalance(accountID);
      return Number(fromWei(bal));
    } catch (err) {
      console.log("Some error occured", err);
      return new Error(err);
    }
  };

  useEffect(() => {
    let tm = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(tm);
      setLoading(true);
      setError(null);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        accountID,
        setAccountID,
        networkID,
        err,
        netName,
        setNetName,
        setNetworkID,
        connectedAccount,
        loading,
        setConnectedAccount,
        primaryAccount,
        setPrimaryAccount,
        trigger,
        balance,
        showFullAddr,
        setShowFullAddr,
        setTrigger,
        showMobileSidebar,
        setShowMobileSidebar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
