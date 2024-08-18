import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "./ConnectWallet";
import { ConnectWalletMetamask } from "./Modal";
import { MetamaskContext } from "../../context/MetamaskContext";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const ButtonWithLoading = ({
  ingBtn = false,
  isLoading,
  text,
  loaderColor = "white",
  disabled = false,
  marginLft = 0,
  ...rest
}) => {
  const {accountID} = useContext(MetamaskContext)
  
  if (!accountID) {
    return <ConnectWalletMetamask />;
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginLeft: marginLft,
          }}
        >
          {!ingBtn ? (
            <ThreeDots
              style={{ margin: "10px" }}
              color={loaderColor}
              width={"50px"}
              height={"50px"}
            />
          ) : (
            <button {...rest} style={{ cursor: "not-allowed" }} disabled>
              {text}ing...
            </button>
          )}
        </div>
      ) : (
        <button
          {...rest}
          disabled={disabled}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonWithLoading;
