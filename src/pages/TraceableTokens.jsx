import React from "react";
import { TraceableTokenContainer } from "../components/TraceableToken/TraceableTokenContainer";
import SideNavBar from "../components/UI/SideNavBar";

const TraceableTokens = () => {
  return (
    <>
      <SideNavBar />
      <TraceableTokenContainer />
    </>
  );
};

export { TraceableTokens };
