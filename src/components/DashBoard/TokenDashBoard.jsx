import React from "react";
import { TokenCard } from "./TokenCard";
import { TokenTable } from "./TokenTable";
import { tokenData } from "./data-token";

const TokenDashBoard = () => {
  return (
    <>
      <>
        <div className="content-grid">
          <div className="section-header-info">
            <h2 className="section-title">Token Unlock Dashboard</h2>
            <p className="section-pretitle">
              Create, Lock &amp; Vest Custom Tokens, without any coding
            </p>
          </div>
          <div className="grid grid-4-4-4 centered">
            {tokenData.map((token, index) => {
              return <TokenCard key={index} {...token} />;
            })}
          </div>
          <section className="section">
            <TokenTable />
          </section>
        </div>
      </>
    </>
  );
};

export { TokenDashBoard };
