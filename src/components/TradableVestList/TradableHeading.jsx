import React from "react";

function TradableHeading() {
  return (
    <>
      <div className="table-header">
        <div className="table-header-column padded">
          <p className="table-header-title">Token Address</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Token Amount</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Cliff Period</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Vesting Period Start</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Total Duration</p>
        </div>
      </div>
    </>
  );
}

export default TradableHeading;
