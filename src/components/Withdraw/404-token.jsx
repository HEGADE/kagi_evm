import React from "react";

const NotFound = ({ selectToken }) => {
  return (
    <>
      <div
        className="table-row medium"
        style={{
          background: "transparent",
          position: "absolute",
          width: "100%",
        }}
      >
        <div
          className="table-column"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h6>No {selectToken?.toLocaleUpperCase()} lock found</h6>
        </div>
      </div>
    </>
  );
};

export { NotFound };
