import React from "react";
import { shortAddress } from "../../utils/format/address.format";

function VestingTable({token}) {
  return (
    <>
      <>
        <div className="table-row medium">
          <div className="table-column padded">
            <p className="table-title">{token?.name}</p>
          </div>
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
                {token?.amount}
            </p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{token?.cliffPeriod}</p>
          </div>
          <div className="table-column padded">
            <p className="table-title">{token?.vestingPeriod}</p>
          </div>
        </div>
      </>
    </>
  );
}

export default VestingTable;
