import React, { useContext, useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";

import toast from "react-hot-toast";
import { copy } from "../../utils/copy-text";
import { shortAddress } from "../../utils/format/address.format";
import { IconCopy } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { CountdownTimer } from "../UI/Ticker";
import { isTimestampGreaterOrEqualToCurrentDateTime } from "../../helpers/time-compare";
import { unlockToken } from "../../services/lock-nft.services";
import { MetamaskContext } from "../../context/MetamaskContext";

const WithdrawTableNFT = ({ lockID, assetContact, unlockTime }) => {
  const [ftInfo, setFtInfo] = useState({});

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [withdrawID, setWithdrawID] = useState(undefined);

  const { accountID } = useContext(MetamaskContext);

  const canUnlock = isTimestampGreaterOrEqualToCurrentDateTime(
    Number(unlockTime)
  );

  const handleWithdraw = async ({ assetContact, lockID }) => {
    setIsButtonLoading(true);
    try {
      await unlockToken({
        accountAddress: accountID,
        lockID,
        tokenAddress: assetContact,
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

  useEffect(() => {
    if (withdrawID !== undefined) {
      setFtInfo({
        ...ftInfo,
        unlocked: true,
      });
    }
  }, []);

  return (
    <>
      <>
        {" "}
        <div className="table-row medium">
          <div className="table-column" key={lockID}>
            <div className="product-preview tiny">
              <div className="product-preview-info">
                <p className="product-preview-title">{"NFT"}</p>
              </div>
            </div>
          </div>
          <div className="table-column padded">
            <p className="table-title">{shortAddress(assetContact)}</p>
          </div>

          <div className="table-column padded">
            <p className="table-title">
              {ftInfo.unlocked ? "unlocked" : "locked"}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{lockID}</p>
          </div>

          <div className="table-column padded">
            <div id="clockdiv">
              <CountdownTimer
                targetDateTime={new Date(Number(unlockTime) * 1000)}
              />
            </div>
          </div>

          <div className="table-column padded-left">
            <div className="table-actions">
              <ButtonWithLoading
                disabled={!canUnlock || withdrawID}
                style={{
                  cursor: !canUnlock || withdrawID ? "not-allowed" : "pointer",
                }}
                isLoading={isButtonLoading}
                onClick={() => handleWithdraw({ assetContact, lockID })}
                marginLft="28px"
                loaderColor="blue"
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

export { WithdrawTableNFT };
