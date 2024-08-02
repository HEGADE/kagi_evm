import { Image } from "@mantine/core";
import React from "react";

const PageLoader = () => {
  return (
    <>
      <div className="page-loader">
        <Image src={"assets/img/kagi-logo2.png"} w={"200"} h={"100"} />

        <div className="page-loader-info">
          <p className="page-loader-info-title">Kagi Finance</p>
        </div>
        <div className="page-loader-indicator loader-bars">
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
        </div>
      </div>
    </>
  );
};

export { PageLoader };
