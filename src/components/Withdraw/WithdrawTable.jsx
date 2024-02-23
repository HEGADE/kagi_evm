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
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  createAssetInfo,
  makeContractFungiblePostCondition,
  makeContractSTXPostCondition,
} from "@stacks/transactions";
import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { openContractCall } from "@stacks/connect";
import { shortAddress } from "../../utils/format/address.format";

import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "../UI/ConnectWallet";
import { addDaysToGivenDate } from "../../utils/format/format-date-time";
import { reduceToPowerOf } from "../../utils/final-stx-amount";
import { useEvent } from "../../store/event.store";
import { useTableData } from "../../store/table-data.store";
import { CountdownTimer } from "../UI/Ticker";
import { IconCopy } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { copy } from "../../utils/copy-text.js";
import toast from "react-hot-toast";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTable = ({
  lockID,
  assetName,
  amount,
  taker,
  maker,
  unlocked,
  assetContact,
  lockTime,
  lockedTime,
  lockedBlockHeight,
}) => {
  const { network, currentBlockHeight, address } = useStacks();

  const [withdrawID, setWithdrawID] = useState(undefined);

  const [ftInfo, setFtInfo] = useState({
    unlocked,
  });

  const setData = useTableData((state) => state.setData);
  const data = useTableData((state) => state.data);

  const isEventEmitted = useEvent((state) => state.emitted);
  const restEvent = useEvent((state) => state.reset);

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully withdrawn ${assetName} FT`,
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const unlockTokenInDays =
    (lockTime - lockedBlockHeight) / AVG_BLOCK_MINED_PER_DAY;

  const unlockDateTime = addDaysToGivenDate(
    String(lockedTime),
    unlockTokenInDays
  );

  const handleWithdraw = async ({ amount, assetName, tokenAddress }) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);
    console.log("lock id", lockID);
    setIsButtonLoading(true);
    setIsPending(true);
    setWithdrawID(lockID);

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
        createAssetInfo(contractAddress, contractName, assetName)
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
          addTransactionToast(txId, `Withdrawing ${assetName} FT `);
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
      setFtInfo({ ...ftInfo, unlocked: true });
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
              {/* <a>
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
              </a> */}
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
              )}
            </p>
          </div>
          <div className="table-column padded">
            {/* decimal 6 should be come from contract */}
            <p
              className="table-title"
              style={{
                display: "contents",
              }}
            >
              {reduceToPowerOf(amount, 6)}{" "}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{lockID}</p>
          </div>
          <div className="table-column padded">
            <p className="table-title">
              {ftInfo.unlocked ? "Unlocked" : "Locked"}
            </p>
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
                    isLoading={isButtonLoading || isPending}
                    loaderColor="blue"
                    marginLft="28px"
                    disabled={lockTime > currentBlockHeight ? true : false}
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
                ) : (
                  <button
                    className="button"
                    style={{
                      cursor: "not-allowed",
                      backgroundColor: "grey",
                      padding: "0px 1rem",
                    }}
                    disabled
                  >
                    Your not a taker
                  </button>
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

export { WithdrawTable };
