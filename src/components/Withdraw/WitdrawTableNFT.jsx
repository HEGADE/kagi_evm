import React, { useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import {
  getFtPostCondition,
  getFtPostConditionNFT,
} from "../../utils/postconditions/ft-postcondition";
import {
  AVG_BLOCK_MINED_PER_DAY,
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
  NonFungibleConditionCode,
  makeContractNonFungiblePostCondition,
  makeContractSTXPostCondition,
} from "@stacks/transactions";
import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { openContractCall } from "@stacks/connect";
import { withDrawData } from "../../lib/withdraw-data";
import { shortAddress } from "../../utils/format/address.format";
import { ContentLoader } from "../UI/ContentLoader";

import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "../UI/ConnectWallet";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";
import { addDaysToGivenDate } from "../../utils/format/format-date-time";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

// (define-map nft-lockings
//     uint
//     {
//       nft-contract: principal,
//       token-id: uint,
//       maker: principal,
//       taker: principal,
//       lock-expiry: uint,
//       locked-time: (string-ascii 257),
//     }
//   )
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
  const { network, address } = useStacks();

  const { addTransactionToast, transactionLoading } = useTransactionToasts({
    success: `Successfully withdrawn ${assetName} NFT`,
  });

  const [loading, setLoading] = useState(true);

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

    console.log(
      "tokenAddress",
      tokenAddress,
      "assetN",
      assetName,
      "contractAddress",
      contractAddress,
      "contractName",
      contractName,
      "lockID",
      lockID,
      "taker",
      taker
    );
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
