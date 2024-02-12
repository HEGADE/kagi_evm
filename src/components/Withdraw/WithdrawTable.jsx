import React, { useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import { getFtPostCondition } from "../../utils/postconditions/ft-postcondition";
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
import { withDrawData } from "../../lib/withdraw-data";
import { shortAddress } from "../../utils/format/address.format";
import { ContentLoader } from "../UI/ContentLoader";

import { AppConfig, UserSession } from "@stacks/connect";
import ConnectWallet from "../UI/ConnectWallet";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";
import { addDaysToGivenDate } from "../../utils/format/format-date-time";
import { reduceToPowerOf } from "../../utils/final-stx-amount";
import { useEvent } from "../../store/event.store";
import { useTableData } from "../../store/table-data.store";
import { CountdownTimer } from "../UI/Ticker";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTable = ({
  lockID,
  assetName,
  amount,
  taker,
  assetContact,
  lockTime,
  lockedTime,
  lockedBlockHeight,
}) => {
  const { network, currentBlockHeight } = useStacks();

  const [withdrawID, setWithdrawID] = useState("");

  const setData = useTableData((state) => state.setData);
  const data = useTableData((state) => state.data);

  const isEventEmitted = useEvent((state) => state.emitted);
  const restEvent = useEvent((state) => state.reset);

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully withdrawn ${assetName} FT`,
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const unlockTokenInDays =
    (lockTime - lockedBlockHeight) / AVG_BLOCK_MINED_PER_DAY;

  const unlockDateTime = addDaysToGivenDate(
    String(lockedTime),
    unlockTokenInDays
  );

  const handleWithdraw = async ({ amount, assetName, tokenAddress }) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);

    setIsButtonLoading(true);
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
    if (isEventEmitted) {
      setData({
        result: data.result.filter(
          (item) => !(item?.["lock-id"]?.value === lockID)
        ),
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
            <p className="table-title">{shortAddress(taker)}</p>
          </div>
          <div
            className="table-column padded"
            style={{
              textAlign: "center",
              width: "max-content",
              padding: "0px 20px !important",
            }}
          >
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
            <p className="table-title">{lockedTime}</p>
          </div>
          <div className="table-column padded">
            <div id="clockdiv">
              <CountdownTimer targetDateTime={unlockDateTime} />
              {/* <p className="table-title">{unlockDateTime}</p> */}
            </div>
          </div>
          <div className="table-column padded-left">
            <div className="table-actions">
              <ButtonWithLoading
                isLoading={isButtonLoading}
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
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export { WithdrawTable };
