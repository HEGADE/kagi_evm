import React from "react";
import Header from "../components/Header/Header.component";
import { LockTokenForm } from "../components/Vesting/LockTokenForm";

const TokenLock = () => {
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
            <p className="tab-switch-button login-register-form-trigger">
              Fungible Tokens
            </p>
            <p className="tab-switch-button login-register-form-trigger">NFT</p>
          </div>
        </div>
        <div className="landing-form ">
          <div className="form-box login-register-form-element">
            <LockTokenForm />
          </div>
          <div className="form-box login-register-form-element">
            <LockTokenForm nft={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenLock };
