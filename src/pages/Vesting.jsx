import React, { useState } from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { VestToken } from "../components/VestToken/Vest";
import { Approve } from "../components/approve/Aprrove";
import { vestingContractAddress } from "../lib/constants";

export const Vesting = () => {
  const [margin, setMargin] = useState(false);

  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });

  return (
    <>
      <SideNavBar />
      <div className="content-grid">
        <div
          className="section-header"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="section-header-info">
            <h2 className="section-title">Vest Your Token </h2>
            {/* <p className="section-pretitle"></p> */}
          </div>
        </div>
        {!moveToLockPage ? (
          <Approve
            contractAddress={vestingContractAddress}
            setData={setData}
            setTokenAddress={setTokenAddress}
            tokenAddress={tokenAddress}
            setMoveToLockPage={setMoveToLockPage}
            setMargin={setMargin}
          />
        ) : (
          <VestToken data={data} tokenAddress={tokenAddress} />
        )}
      </div>
    </>
  );
};
