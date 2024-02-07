import React from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { TokenDashBoard } from "../components/DashBoard/TokenDashBoard";
const DashBoard = () => {
  return (
    <>
      <SideNavBar />
      <TokenDashBoard />
    </>
  );
};

export default DashBoard;
