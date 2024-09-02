import React, { useRef, useState } from "react";
import { LockTokenForm } from "../components/Vesting/LockTokenForm";
import { MobileSideBar } from "../components/UI/SideNavBar";

const TokenLock = () => {
  const [margin, setMargin] = useState(false);
  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [showTokenLockForm, setShowTokenLockForm] = useState(true);

  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });
  const ftRef = useRef(null);
  const nftRef = useRef(null);

  const clearTokenDetails = () => {
    setData({
      assetName: "",
      decimals: "",
      currentBlockHeight: 0,
      balance: 0,
      symbol: "",
    });
  };

  const handlePageNFT = () => {
    nftRef.current.classList.add("active");
    ftRef.current.classList.remove("active");
    setMargin(false);
    setMoveToLockPage(false);
    setShowTokenLockForm(false);
    clearTokenDetails();
  };
  const handlePageFT = () => {
    ftRef.current.classList.add("active");
    nftRef.current.classList.remove("active");
    setMargin(false);
    setShowTokenLockForm(true);
    setMoveToLockPage(false);
    clearTokenDetails();
  };
  return (
    <>
      <MobileSideBar />
      <div className="landing landing-container">
        <div className="landing-decoration"></div>
        <div className="landing-info">
          <div className="logo">
            <svg className="icon-logo-vikinger">
              <use></use>
            </svg>
          </div>
          <h2 className="landing-info-pretitle">Create New Lock</h2>
          <p className="landing-info-text">
            Enter the token address you would like to lock for and Lock your
            Tokens
          </p>
          <div className="tab-switch">
            <p
              ref={ftRef}
              onClick={handlePageFT}
              className="tab-switch-button active "
            >
              Fungible Tokens
            </p>
            <p
              ref={nftRef}
              onClick={handlePageNFT}
              className="tab-switch-button "
            >
              NFT
            </p>
          </div>
        </div>
        <div
          className="landing-form "
          style={{
            marginTop: margin ? "-40px" : "1%",
          }}
        >
          {showTokenLockForm ? (
            <div className="form-box login-register-form-element">
              <LockTokenForm
                data={data}
                setData={setData}
                handlePage={handlePageFT}
                setMoveToLockPage={setMoveToLockPage}
                moveToLockPage={moveToLockPage}
                setMargin={setMargin}
              />
            </div>
          ) : (
            <div className="form-box login-register-form-element">
              <LockTokenForm
                data={data}
                setData={setData}
                handlePage={handlePageNFT}
                setMoveToLockPage={setMoveToLockPage}
                moveToLockPage={moveToLockPage}
                setMargin={setMargin}
                nft={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { TokenLock };
