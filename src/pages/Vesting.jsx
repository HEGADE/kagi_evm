import React, { useContext, useEffect, useState } from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { VestToken } from "../components/VestToken/Vest";
import { Approve } from "../components/approve/Aprrove";
import { vestingContractAddress } from "../lib/constants";

import { MetamaskContext } from "../context/MetamaskContext";

export const Vesting = () => {
  const [margin, setMargin] = useState(false);

  const { accountID } = useContext(MetamaskContext);

  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });

  useEffect(() => {
    setTokenAddress("");
    setMoveToLockPage(false);
  }, [accountID]);

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
