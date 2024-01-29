import { AppConfig, UserData, UserSession } from "@stacks/connect";
import { StacksNetwork, StacksTestnet,StacksMainnet } from "@stacks/network";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { NETWORK } from "../lib/constants";

const AuthContext = createContext(undefined);

export default function StacksProvider({ children }) {
  const [userData, setUserData] = useState(undefined);

  const network =
  NETWORK === "TESTNET" ? new StacksTestnet() : new StacksMainnet();  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });
  const address = userData?.profile?.stxAddress?.testnet;

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        console.log(userData,"StacksProvider");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const value = { network, address, userSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useStacks() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
