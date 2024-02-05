import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ContentLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <ThreeDots color="blue" width={"50px"} height={"50px"} />
    </div>
  );
};

export { ContentLoader };
