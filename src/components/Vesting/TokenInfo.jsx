import React from "react";

const TokenInfo = ({ nft = false, data }) => {
  if (data?.assetName)
    return (
      <>
        {!nft ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "dodgerblue",
              }}
            >
              Asset name:- {data?.assetName}
            </p>
            <p
              style={{
                color: "dodgerblue",
              }}
            >
              Balance:- {data?.balance} {data?.symbol}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "dodgerblue",
              }}
            >
              asset Name:- {data?.assetName}
            </p>
          </div>
        )}
      </>
    );
  else return null;
};

export { TokenInfo };
