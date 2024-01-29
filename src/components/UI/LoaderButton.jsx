import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ButtonWithLoading = ({ isLoading, text, ...rest }) => {
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ThreeDots color="white" width={"50px"} height={"50px"} />
        </div>
      ) : (
        <button {...rest}>{text}</button>
      )}
    </>
  );
};

export default ButtonWithLoading;
