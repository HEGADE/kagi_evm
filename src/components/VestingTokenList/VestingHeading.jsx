import React from "react";

function VestingHeading() {
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
          <p className="table-header-title">Cliff period ends</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Vesting Period Start</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Vesting Duration</p>
        </div>
      </div>
    </>
  );
}

export default VestingHeading;
