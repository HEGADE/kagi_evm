import React from "react";
import { CreateTokenForm } from "../components/CreateToken/FT/CreateTokenForm";
import SideNavBar from "../components/UI/SideNavBar";

const CreateToken = () => {
  return (
    <>
      <SideNavBar />
      <CreateTokenForm />
    </>
  );
};

export { CreateToken };
