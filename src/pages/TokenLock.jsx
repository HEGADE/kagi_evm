import React from "react";
import Header from "../components/Header/Header.component";
import { LockTokenForm } from "../components/Vesting/LockTokenForm";

const TokenLock = () => {
  return (
    <>
      <div className="landing">
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
              Project Tokens
            </p>
            <p
              style={{
                visibility: "hidden",
              }}
              className="tab-switch-button login-register-form-trigger"
            >
              Liquidty Tokens
            </p>
          </div>
        </div>
        <div
          className="landing-form"
          style={{
            marginTop: "150px",
          }}
        >
          <div className="form-box login-register-form-element">
            <LockTokenForm />
          </div>
          <div className="form-box login-register-form-element">
            <img
              className="form-box-decoration"
              src="img/landing/rocket.png"
              alt="rocket"
            />
            <h2 className="form-box-title">Project Tokens</h2>
            <p className="text-center mt-10">
              Project Tokens Generated from App
            </p>

            {/* <LockTokenForm /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenLock };
