import React from "react";
import { CreateTokenFormFT } from "../components/CreateToken/FT/CreateTokenForm";
import SideNavBar from "../components/UI/SideNavBar";
import { CreateTokenFormNFT } from "../components/CreateToken/NFT/CreateTokenFormNFT";
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
