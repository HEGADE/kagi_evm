import React from "react";

const TableHeading = ({ type = "ft" }) => {
  return <>{type === "ft" ? <FtTableHeading /> : <NFTTableHeading />}</>;
};

const FtTableHeading = () => {
  return (
    <>
      <div className="table-header">
        <div className="table-header-column">
          <p className="table-header-title">Token Name</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Tokens Address</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Taker Address</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Tokens Locked</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Status</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title"> Locked Time</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title"> Unlocked Time</p>
        </div>
        <div className="table-header-column padded-left"></div>
      </div>
    </>
  );
};
const NFTTableHeading = () => {
  return (
    <>
      <div className="table-header">
        <div className="table-header-column">
          <p className="table-header-title">NFT Name</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">NFT Address</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Taker Address </p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Status</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Locked Time</p>
        </div>
        <div className="table-header-column padded">
          <p className="table-header-title">Unlocked Time</p>
        </div>{" "}
        <div className="table-header-column padded-left"></div>
      </div>
    </>
  );
};

export { TableHeading };
