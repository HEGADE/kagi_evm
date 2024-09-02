import React, { useContext, useEffect, useState } from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { Approve } from "../components/approve/Aprrove";
import { TradableVestingContractAddress } from "../lib/constants";
import { TradableVest } from "../components/TradableVesting/TradableVest";
import { MetamaskContext } from "../context/MetamaskContext";

function TradableVesting() {
  const [margin, setMargin] = useState(false);
  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [showTokenLockForm, setShowTokenLockForm] = useState(true);
  const [tokenAddress, setTokenAddress] = useState("");
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });

  const { accountID } = useContext(MetamaskContext);

  useEffect(() => {
    setTokenAddress("")
    setMoveToLockPage(false)
  }, [accountID])

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
            <h2 className="section-title">Vest Your Token</h2>
            {/* <p className="section-pretitle"></p> */}
          </div>
        </div>
        {!moveToLockPage ? (
          <Approve
            contractAddress={TradableVestingContractAddress}
            setData={setData}
            setTokenAddress={setTokenAddress}
            tokenAddress={tokenAddress}
            setMoveToLockPage={setMoveToLockPage}
            setMargin={setMargin}
          />
        ) : (
        <TradableVest data={data} tokenAddress={tokenAddress}/>
        )}
      </div>
    </>
  );
}

export default TradableVesting;
