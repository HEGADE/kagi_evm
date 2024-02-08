import React, { useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import { getFtPostCondition } from "../../utils/postconditions/ft-postcondition";
import {
  appDetails,
  contractOwnerAddress,
  deployedContractName,
} from "../../lib/constants";

import {
  uintCV,
  principalCV,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  createAssetInfo,
  makeContractFungiblePostCondition,
  makeContractSTXPostCondition
} from "@stacks/transactions";
import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { openContractCall } from "@stacks/connect";
import { withDrawData } from "../../lib/withdraw-data";
import { shortAddress } from "../../utils/format/address.format";
import { ContentLoader } from "../UI/ContentLoader";

import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "../UI/ConnectWallet";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTable = ({
  lockID,
  assetName,
  amount,
  assetContact,
  lockTime,
  lockedTime,
}) => {
  const { network, address } = useStacks();

  const {
    addTransactionToast,
    transactionLoading,
  } = useTransactionToasts({success:`Successfully Withdrawn ${assetName} Token`});

  const [loading, setLoading] = useState(true);

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleWithdraw = async ({ amount, assetName, tokenAddress }) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);

    setIsButtonLoading(true);
   
    try {
      const stxPostCondition = makeContractSTXPostCondition(
        contractOwnerAddress,
        deployedContractName,
        FungibleConditionCode.Equal,
        0
      );
      const tokenPostCondition = makeContractFungiblePostCondition(
        contractOwnerAddress,
        deployedContractName,
        FungibleConditionCode.Greater,
        0,
        createAssetInfo(contractAddress,contractName,assetName)
      );

      const options = {
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "unlock-ft",
        functionArgs: [principalCV(tokenAddress), uintCV(lockID)],
        postConditions: [stxPostCondition, tokenPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
       
          addTransactionToast(txId, `Withdrawing ${assetName} Token `);
        
        },
      };
      await openContractCall(options);
    } catch (err) {
      console.log("error", err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  if (!userSession.isUserSignedIn()) return <ConnectWallet />;

  return (
    <>
      <>
        {" "}
        <div className="table-row medium">
          <div className="table-column" key={lockID}>
            <div className="product-preview tiny">
              <a>
                <figure
                  className="product-preview-image short liquid"
                  style={{ background: "url('img/btc-logo.svg')" }}
                >
                  <img
                    src="img/btc-logo.svg"
                    alt="item-11"
                    style={{ display: "none" }}
                  />
                </figure>
              </a>
              <div className="product-preview-info">
                <p className="product-preview-title">{assetName}</p>
              </div>
            </div>
          </div>
          <div className="table-column padded">
            <p className="table-title">
              {shortAddress(assetContact?.split(".")[0])}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{amount} $BRCL</p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{lockedTime}</p>
          </div>
          <div className="table-column padded">
            <div id="clockdiv" style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              
            }}>
              {/* <div>
                <span className="days">99</span>
                <div className="smalltext">D</div>
              </div>
              <div>
                <span className="hours">23</span>
                <div className="smalltext">H</div>
              </div>
              <div>
                <span className="minutes">54</span>
                <div className="smalltext">M</div>
              </div>
              <div>
                <span className="seconds">57</span>
                <div className="smalltext">S</div>
              </div> */}
              <p className="table-title">{lockTime}</p>
            </div>
          </div>
          <div className="table-column padded-left">
            <div className="table-actions">
              <ButtonWithLoading
                isLoading={isButtonLoading}
                loaderColor="blue"
                ingBtn={true}
                onClick={() =>
                
                  handleWithdraw({
                    amount: amount,
                    tokenAddress: assetContact,
                    assetName: assetName?.toLowerCase(),
                  })
                }
                text="withdraw"
                className="button secondary"
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export { WithdrawTable };
