import React from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { VestToken } from "../components/VestToken/Vest";

export const Vesting = () => {
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
        <VestToken />
      </div>
    </>
  );
};
