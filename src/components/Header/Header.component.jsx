import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { shortAddress } from "../../utils/format/address.format";
import { PageLoader } from "../UI/PageLoader";
import ConnectWallet from "../UI/ConnectWallet";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

// console.info("mainnet address: ", userSession.loadUserData().profile.stxAddress.mainnet);
// console.info("testnet address: ", userSession.loadUserData().profile.stxAddress.testnet);

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/dash-board" />;
  }

  return (
    <>
      <Toaster />
      <header className="header">
        <div className="header-actions">
          <div className="header-brand">
            <div className="logo">
              <svg className="icon-logo-vikinger small" />
              {/* <use xlink:href="#svg-logo-vikinger"></use> */}
            </div>
            <h1 className="header-brand-text">Token</h1>
          </div>
        </div>
        <div className="header-actions"></div>
        <div className="header-actions search-bar">
          <div className="interactive-input dark">
            <input
              type="text"
              id="search-main"
              name="search_main"
              placeholder="Search..."
            />
            <div className="interactive-input-icon-wrap">
              <svg className="interactive-input-icon icon-magnifying-glass">
                {/* <use xlink:href="#svg-magnifying-glass"></use> */}
              </svg>
            </div>
            <div className="interactive-input-action">
              <svg className="interactive-input-action-icon icon-cross-thin">
                {/* <use xlink:href="#svg-cross-thin"></use> */}
              </svg>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <ConnectWallet />
          {!!userSession.isUserSignedIn() && (
            <button
              className="button primary wallet-connect"
              onClick={disconnect}
            >
              {shortAddress(
                userSession.loadUserData().profile.stxAddress.testnet,
                8
              )}
            </button>
          )}
          <div className="action-list">
            <div className="action-list-item-wrap">
              <div className="action-list-item header-dropdown-trigger ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "20",
                    height: "20",
                    fill: "#fff",
                    viewBox: "0 0 16 16",
                  }}
                  className="bi bi-moon theme-color"
                >
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                </svg>
              </div>
            </div>
          </div>
          <div className="action-item-wrap"></div>
          <div className="mobilemenu-trigger navigation-widget-mobile-trigger">
            <div className="burger-icon inverted">
              <div className="burger-icon-bar"></div>
              <div className="burger-icon-bar"></div>
              <div className="burger-icon-bar"></div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
