import React, { useRef, useState } from "react";
import Header from "../components/Header/Header.component";
import { LockTokenForm } from "../components/Vesting/LockTokenForm";

const TokenLock = () => {
  const [margin, setMargin] = useState(false);
  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [showTokenLockForm, setShowTokenLockForm] = useState(true);
  const ftRef = useRef(null);
  const nftRef = useRef(null);

  const handlePageNFT = () => {
    nftRef.current.classList.add("active");
    ftRef.current.classList.remove("active");
    setMargin(false);
    setMoveToLockPage(false);
    setShowTokenLockForm(false);
  };
  const handlePageFT = () => {
    ftRef.current.classList.add("active");
    nftRef.current.classList.remove("active");
    setMargin(false);
    setShowTokenLockForm(true);
    setMoveToLockPage(false);
  };
  return (
    <>
      <div
        className="landing"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
            marginTop: margin ? "-140px" : "1%",
          }}
        >
          {showTokenLockForm ? (
            <div className="form-box login-register-form-element">
              <LockTokenForm
                setMoveToLockPage={setMoveToLockPage}
                moveToLockPage={moveToLockPage}
                setMargin={setMargin}
              />
            </div>
          ) : (
            <div className="form-box login-register-form-element">
              <LockTokenForm
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
