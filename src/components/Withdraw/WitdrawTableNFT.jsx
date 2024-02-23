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
import { useTableData } from "../../store/table-data.store";
import { useEvent } from "../../store/event.store";
import { CountdownTimer } from "../UI/Ticker";
import { IconCopy } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import toast from "react-hot-toast";
import { copy } from "../../utils/copy-text";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTableNFT = ({
  lockID,
  assetName,
  assetContact,
  lockTime,
  unlocked,
  assetID,
  lockedTime,
  taker,
  lockedBlockHeight,
}) => {
  const { network, currentBlockHeight, address } = useStacks();

  const [ftInfo, setFtInfo] = useState({
    unlocked,
  });

  const isEventEmitted = useEvent((state) => state.emitted);
  const restEvent = useEvent((state) => state.reset);

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully withdrawn ${assetName} NFT`,
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [withdrawID, setWithdrawID] = useState(undefined);

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
    setIsPending(true);
    setWithdrawID(lockID);
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
  useEffect(() => {
    if (isEventEmitted && withdrawID !== undefined) {
      setFtInfo({
        ...ftInfo,
        unlocked: true,
      });
    }
    return () => {
      restEvent();
    };
  }, [isEventEmitted]);

  if (!userSession.isUserSignedIn()) return <ConnectWallet />;

  return (
    <>
      <>
        {" "}
        <div className="table-row medium">
          <div className="table-column" key={lockID}>
            <div className="product-preview tiny">
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
            <p
              className="table-title"
              onClick={() => {
                copy(taker);
                toast.success("Copied!", {
                  position: "bottom-right",
                });
              }}
            >
              {shortAddress(taker)}
              {address !== taker && (
                <IconCopy
                  style={{
                    marginLeft: "5px",
                    width: rem(17),
                    height: rem(17),
                    cursor: "pointer",
                  }}
                />
              )}{" "}
            </p>
          </div>

          <div className="table-column padded">
            <p className="table-title">
              {ftInfo.unlocked ? "unlocked" : "locked"}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{assetID}</p>
          </div>

          <div className="table-column padded">
            <p className="table-title">{lockedTime}</p>
          </div>
          <div className="table-column padded">
            <div id="clockdiv">
              <CountdownTimer targetDateTime={unlockDateTime} />
            </div>
          </div>

          <div className="table-column padded-left">
            {!ftInfo.unlocked ? (
              <div className="table-actions">
                {taker === address ? (
                  <ButtonWithLoading
                    marginLft="28px"
                    isLoading={isButtonLoading || isPending}
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
                ) : (
                  <button className="button secondary">Your not a taker</button>
                )}
              </div>
            ) : (
              <button
                className="button "
                style={{
                  cursor: "not-allowed",
                  backgroundColor: "grey",
                  padding: "0px 1rem",
                }}
                disabled
              >
                withdrawn
              </button>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export { WithdrawTableNFT };
