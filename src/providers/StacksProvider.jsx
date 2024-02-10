import { AppConfig, UserData, UserSession } from "@stacks/connect";
import {
  StacksNetwork,
  StacksTestnet,
  StacksMainnet,
  StacksDevnet,
} from "@stacks/network";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { NETWORK } from "../lib/constants";
import { fetchFromVestingContract } from "../lib/fetch-data";

const AuthContext = createContext(undefined);

export default function StacksProvider({ children }) {
  const [userData, setUserData] = useState(undefined);

  const [currentBlockHeight, setCurrentBlockHeight] = useState(0);

  const network =
    NETWORK === "TESTNET" ? new StacksDevnet() : new StacksMainnet();
  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });
  const address = userData?.profile?.stxAddress?.testnet;

  const fetch = async (addr) => {
    try {
      let currentBlockHeight = await fetchFromVestingContract({
        network,
        address: addr,
        contractFunctionName: "get-current-block-height",
      });

      console.log("current Block height", currentBlockHeight);

      setCurrentBlockHeight(Number(currentBlockHeight?.value));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let int = null;

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        console.log(userData, "StacksProvider");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());

      fetch(userSession.loadUserData().profile?.stxAddress?.testnet);
      int = setInterval(() => {
        fetch(userSession.loadUserData().profile?.stxAddress?.testnet);
      }, 3000 * 60);
    }

    return () => {
      clearInterval(int);
    };
  }, []);

  const value = { network, address, userSession, currentBlockHeight };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useStacks() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
