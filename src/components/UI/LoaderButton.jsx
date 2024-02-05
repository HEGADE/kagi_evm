import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "./ConnectWallet";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const ButtonWithLoading = ({
  isLoading,
  text,
  loaderColor = "white",
  ...rest
}) => {
  if (!userSession.isUserSignedIn()) {
    return <ConnectWallet />;
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ThreeDots color={loaderColor} width={"50px"} height={"50px"} />
        </div>
      ) : (
        <button {...rest}>{text}</button>
      )}
    </>
  );
};

export default ButtonWithLoading;
