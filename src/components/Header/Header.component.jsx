import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Outlet, useLocation, Navigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { shortAddress } from "../../utils/format/address.format";
import { PageLoader } from "../UI/PageLoader";
import ConnectWallet, { ConnectWalletWithDropDown } from "../UI/ConnectWallet";
import { IconBackArrow, IconBulb, IconClose } from "../UI/Icons";

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

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <PageLoader />;

  if (location.pathname === "/") {
    return <Navigate to="/dash-board" />;
  }

  const toggleSideBar = () => {
    setOpen((pre) => !pre);
    const sidebar = document.querySelector("#navigation-widget-mobile");
    sidebar.classList.toggle("hidden");
  };

  return (
    <>
      <Toaster />
      <header className="header">
        <div className="header-actions">
          <div className="header-brand">
            <div className="logo">
              <svg className="icon-logo-vikinger small" />
            </div>
            <h1 className="header-brand-text " style={{ cursor: "pointer" }}>
              {location.pathname === "/token-lock" ? (
                <Link
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                  to={"/dash-board"}
                >
                  <IconBackArrow />
                </Link>
              ) : (
                "Token"
              )}
            </h1>
          </div>
        </div>
        <div className="header-actions"></div>
        <div className="header-actions search-bar">
          {/* <div className="interactive-input dark">
            <input
              type="text"
              id="search-main"
              name="search_main"
              placeholder="Search..."
            />
            <div className="interactive-input-icon-wrap">
              <svg className="interactive-input-icon icon-magnifying-glass">
                <use xlink:href="#svg-magnifying-glass"></use>
              </svg>
            </div>
            <div className="interactive-input-action">
              <svg className="interactive-input-action-icon icon-cross-thin">
                <use xlink:href="#svg-cross-thin"></use>
              </svg>
            </div>
          </div> */}
        </div>
        <div className="header-actions">
          <ConnectWallet />
          {!!userSession.isUserSignedIn() && <ConnectWalletWithDropDown />}
          <div className="action-list">
            <div className="action-list-item-wrap">
              <div className="action-list-item header-dropdown-trigger ">
                <IconBulb />
              </div>
            </div>
          </div>
          <div className="action-item-wrap"></div>
          <div className="mobilemenu-trigger navigation-widget-mobile-trigger">
            <div className="burger-icon inverted" onClick={toggleSideBar}>
              {!open ? (
                <>
                  <div className="burger-icon-bar"></div>
                  <div className="burger-icon-bar"></div>
                  <div className="burger-icon-bar"></div>
                </>
              ) : (
                <IconClose />
              )}
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
