import React, { useContext, useState } from "react";
import { shortAddress } from "../../utils/format/address.format";
import { fromUnixTimeStamp, fromWei } from "../../helpers/convertion";
import { format } from "date-fns";
import ButtonWithLoading from "../UI/LoaderButton";
import toast from "react-hot-toast";
import { MetamaskContext } from "../../context/MetamaskContext";
import { isTimestampGreaterOrEqualToCurrentDateTime } from "../../helpers/time-compare";
import { releaseToken } from "../../services/tradable-vest.services";

function TradableTable({ token, vestID }) {
  console.log(token?.cliffTime);
  let cliff = format(fromUnixTimeStamp(Number(token?.cliffTime)), "yyyy-MM-dd");
  
  let vestingPeriodStart = format(
    fromUnixTimeStamp(Number(token?.startTime)),
    "yyyy-MM-dd"
  );

  const canUnlock = isTimestampGreaterOrEqualToCurrentDateTime(
    Number(token?.cliffTime)
  );

  const [withdrawID, setWithdrawID] = useState(false);

  const { accountID } = useContext(MetamaskContext);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleWithdraw = async ({ lockID }) => {
    setIsButtonLoading(true);
    try {
      await releaseToken({
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
          <div className="table-column padded">
            <p className="table-title">{shortAddress(token?.tokenAddress)}</p>
          </div>
          <div className="table-column padded">
            <p
              className="table-title"
              //   style={{
              //     display: "contents",
              //   }}
            >
              {fromWei(Number(token?.amount))}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{cliff}</p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{vestingPeriodStart}</p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{Number(token?.duration)} Months</p>
          </div>

          <div
            className="table-column padded"
            style={{
              padding: "10px",
            }}
          >
            <ButtonWithLoading
              isLoading={isButtonLoading || isPending}
              loaderColor="blue"
              disabled={!canUnlock || withdrawID}
              style={{
                width: "100px",
              }}
              onClick={() =>
                handleWithdraw({
                  vestID,
                })
              }
              text={"Release"}
              className="button secondary"
            />
          </div>
        </div>
      </>
    </>
  );
}

export default TradableTable;
