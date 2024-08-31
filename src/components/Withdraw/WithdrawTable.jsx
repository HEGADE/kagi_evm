import React, { useContext, useEffect, useState } from "react";
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
import { isTimestampGreaterOrEqualToCurrentDateTime } from "../../helpers/time-compare.js";
import { fromUnixTimeStamp, fromWei } from "../../helpers/convertion.js";
import { unlockToken } from "../../services/lock.services.js";
import { MetamaskContext } from "../../context/MetamaskContext.js";
import { format } from "date-fns";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const WithdrawTable = ({
  lockID,
  assetName,
  amount,
  assetContact,
  lockedTime,
  unlockTime,
}) => {
  const [withdrawID, setWithdrawID] = useState(false);

  const { accountID } = useContext(MetamaskContext);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const canUnlock = isTimestampGreaterOrEqualToCurrentDateTime(
    Number(unlockTime)
  );

  const handleWithdraw = async ({ lockID }) => {
    setIsButtonLoading(true);
    try {
      await unlockToken({
        accountAddress: accountID,
        lockID,
      });
      toast.success("Withdrawn successfully", {
        position: "bottom-right",
      });
      setWithdrawID(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <>
        <div className="table-row medium">
          <div className="table-column" key={lockID}>
            <div className="product-preview tiny">
              <div className="product-preview-info">
                <p className="table-title">{shortAddress(assetContact)}</p>
              </div>
            </div>
          </div>

          <div className="table-column padded">
            <p
              className="table-title"
              style={{
                display: "contents",
              }}
            >
              {fromWei((amount))}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{lockID}</p>
          </div>

          <div className="table-column padded">
            <p className="table-title">
              {format(fromUnixTimeStamp(Number(lockedTime)), "yyyy-MM-dd")}
            </p>
          </div>
          <div className="table-column padded">
            <div className="table-column padded">
              <p className="table-title">
                {format(fromUnixTimeStamp(Number(unlockTime)), "yyyy-MM-dd")}
              </p>
            </div>
          </div>
          <div className="table-column padded-left">
            <div className="table-actions">
              <ButtonWithLoading
                isLoading={isButtonLoading || isPending}
                loaderColor="blue"
                disabled={!canUnlock || withdrawID}
                style={{
                  cursor: !canUnlock || withdrawID ? "not-allowed" : "pointer",
                }}
                marginLft="28px"
                onClick={() =>
                  handleWithdraw({
                    lockID,
                  })
                }
                text={!withdrawID ? "Withdraw" : "Withdrawn"}
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
