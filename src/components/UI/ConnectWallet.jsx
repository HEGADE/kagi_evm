import React from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

import { shortAddress } from "../../utils/format/address.format";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}
const ConnectWallet = () => {
  return (
    <>
      {!userSession.isUserSignedIn() && (
        <button
          className="button primary wallet-connect"
          onClick={authenticate}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
