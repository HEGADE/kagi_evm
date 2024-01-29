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
              Liquidty Tokens
            </p>
            <p className="tab-switch-button login-register-form-trigger">
              Project Tokens
            </p>
          </div>
        </div>
        <div className="landing-form">
          <div className="form-box login-register-form-element">
            <img
              className="form-box-decoration overflowing"
              src="img/landing/rocket.png"
              alt="rocket"
            />
            <h2 className="form-box-title">Liquidty Tokens</h2>
            <p className="text-center mt-10">LP Tokens Generated from App</p>
            <div className="form">
              <LockTokenForm />
            </div>
          </div>
          <div className="form-box login-register-form-element">
            <img
              className="form-box-decoration"
              src="img/landing/rocket.png"
              alt="rocket"
            />
            <h2 className="form-box-title">Project Tokens</h2>
            <p className="text-center mt-10">LP Tokens Generated from App</p>
            <div className="form">
              <div className="form-row">
                <div className="form-item">
                  <div className="form-select">
                    <label for="billing-country">Blockchain</label>
                    <select id="billing-country">
                      <option value="0">Select your blockchain</option>
                      <option value="1">Bitcoin</option>
                      <option value="2">Ethereum</option>
                    </select>
                    <svg className="form-select-icon icon-small-arrow">
                      {/* <use xlink:href="#svg-small-arrow"></use> */}
                    </svg>
                  </div>
                </div>
              </div>

              <LockTokenForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenLock };
