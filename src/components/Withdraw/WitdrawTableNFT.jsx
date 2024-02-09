import React, { useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";

import {
  AVG_BLOCK_MINED_PER_DAY,
  appDetails,
  contractOwnerAddress,
  deployedContractName,
} from "../../lib/constants";

import {
  uintCV,
  principalCV,
  FungibleConditionCode,
  createAssetInfo,
  NonFungibleConditionCode,
  makeContractNonFungiblePostCondition,
  makeContractSTXPostCondition,
} from "@stacks/transactions";
import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { openContractCall } from "@stacks/connect";
import { shortAddress } from "../../utils/format/address.format";

import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "../UI/ConnectWallet";
import { addDaysToGivenDate } from "../../utils/format/format-date-time";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTableNFT = ({
  lockID,
  assetName,
  assetContact,
  lockTime,
  assetID,
  lockedTime,
  taker,
  lockedBlockHeight,
}) => {
  const { network, currentBlockHeight } = useStacks();

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully withdrawn ${assetName} NFT`,
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const unlockTokenInDays =
    (lockTime - lockedBlockHeight) / AVG_BLOCK_MINED_PER_DAY;

  const unlockDateTime = addDaysToGivenDate(
    String(lockedTime),
    unlockTokenInDays
  );

  const handleWithdraw = async ({ assetName, tokenAddress }) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);

    setIsButtonLoading(true);

    try {
      const stxPostCondition = makeContractSTXPostCondition(
        contractOwnerAddress,
        deployedContractName,
        FungibleConditionCode.GreaterEqual,
        0
      );

      const nftPostCondition = makeContractNonFungiblePostCondition(
        contractOwnerAddress,
        deployedContractName,
        NonFungibleConditionCode.Sends,
        createAssetInfo(contractAddress, contractName, assetName),
        uintCV(assetID)
      );

      const options = {
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "unlock-nft",
        functionArgs: [principalCV(tokenAddress), uintCV(lockID)],
        postConditions: [stxPostCondition, nftPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
          addTransactionToast(txId, `Withdrawing ${assetName} NFT `);
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
            <p className="table-title">{shortAddress(taker)} </p>
          </div>

          <div className="table-column padded">
            <p className="table-title">{lockedTime}</p>
          </div>
          <div className="table-column padded">
            <div
              id="clockdiv"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
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
              <p className="table-title">{unlockDateTime}</p>
            </div>
          </div>
          <div className="table-column padded-left">
            <div className="table-actions">
              <ButtonWithLoading
                ingBtn={true}
                isLoading={isButtonLoading}
                loaderColor="blue"
                disabled={lockTime > currentBlockHeight ? true : false}
                onClick={() =>
                  handleWithdraw({
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

export { WithdrawTableNFT };
