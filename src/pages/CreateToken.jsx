import React from "react";
import SideNavBar from "../components/UI/SideNavBar";
import { CreateTokenContainer } from "../components/CreateToken/CreateTokenContainer";

const CreateToken = () => {
  return (
    <>
      <SideNavBar />
      <CreateTokenContainer />
    </>
  );
};

export { CreateToken };
