import React, { useState } from "react";
import { CreateTokenFormFT } from "./FT/CreateTokenForm";
import { CreateTokenFormNFT } from "./NFT/CreateTokenFormNFT";

const CreateTokenContainer = () => {
  const [currentForm, setCurrentForm] = useState("FT");

  return (
    <>
      <div className="content-grid">
        <div
          className="section-header"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="section-header-info">
            <h2 className="section-title">Create Token {currentForm} </h2>
            <p className="section-pretitle">
              Launch your own {currentForm} without knowing coding
            </p>
          </div>

          <div className="form-select">
            <label for="downloads-filter-order">Select Token To deploy</label>
            <select
              onChange={(e) => setCurrentForm(e.target.value)}
              id="downloads-filter-order"
              name="tokens_filter_order"
            >
              <option value="FT">FT</option>
              <option value="NFT">NFT</option>
            </select>
          </div>
        </div>
        {currentForm === "FT" ? (
          <CreateTokenFormFT />
        ) : (
          <CreateTokenFormNFT currentForm={currentForm} />
        )}
      </div>
    </>
  );
};

export { CreateTokenContainer };
